import { NextResponse } from "next/server";
import { Document } from "@langchain/core/documents";
import { ConnectDB } from "../../../../lib/db";
import Project from "../../../../models/project.model";
import Skill from "../../../../models/skill.model";
import About from "../../../../models/about.model";
import Intro from "../../../../models/intro.model";
import { getVectorStore } from "../../../../lib/vectorStore";
import { pinecone, indexName } from "../../../../lib/pinecone";

export async function GET() {
  try {
    console.log("Checking Pinecone index availability...");
    const existingIndexes = (await pinecone.listIndexes()).indexes || [];
    
    if (!existingIndexes.some((index) => index.name === indexName)) {
      console.log(`Index "${indexName}" not found. Creating it now... (this takes ~30 seconds)`);
      await pinecone.createIndex({
        name: indexName,
        dimension: 384,
        metric: "cosine",
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1",
          },
        },
      });
      // Pause slightly for the index to become fully available
      await new Promise((resolve) => setTimeout(resolve, 15000));
      console.log(`Index "${indexName}" successfully generated!`);
    }

    const pineconeIndex = pinecone.Index(indexName);
    
    // Clear index to avoid duplicates and purge outdated metadata schema
    try {
      console.log("Clearing Pinecone index...");
      await pineconeIndex.deleteAll();
      console.log("Pinecone index cleared successfully.");
    } catch (err: any) {
      console.warn("Could not clear index (index might be empty):", err.message);
    }

    console.log("Connecting to Database...");
    await ConnectDB();
    
    console.log("Fetching data from MongoDB...");
    const [projects, skills, about, intro] = await Promise.all([
      Project.find({}).lean() as Promise<any[]>,
      Skill.find({}).lean() as Promise<any[]>,
      About.findOne({}).lean() as Promise<any>,
      Intro.findOne({}).lean() as Promise<any>,
    ]);

    const documents: Document[] = [];

    // 1. Ingest Projects
    if (projects && Array.isArray(projects)) {
      projects.forEach((proj: any) => {
        const content = `Project Name: ${proj.projectName || "Untitled"}
Description: ${proj.projectDesc || ""}
Detailed/Sub Description: ${proj.projectSubDesc || ""}
Tech Stack: ${proj.projectTechStack ? proj.projectTechStack.join(", ") : "N/A"}
GitHub Link: ${proj.githubLink || "N/A"}
Live Link: ${proj.liveLink || "N/A"}`;

        documents.push(new Document({
          pageContent: content,
          metadata: { 
            type: "project", 
            id: proj._id.toString(), 
            title: proj.projectName || "Untitled" 
          }
        }));
      });

      // Projects Summary document for count and list queries
      const projectNames = projects.map((p: any) => p.projectName).join(", ");
      const summaryContent = `Projects Overview & Summary:
Sandeep Singh has a total of ${projects.length} projects.
Names of all projects: ${projectNames}.`;

      documents.push(new Document({
        pageContent: summaryContent,
        metadata: { type: "project", subtype: "summary" }
      }));
    }

    // 2. Ingest Skills
    if (skills && Array.isArray(skills)) {
      skills.forEach((skill: any) => {
        const content = `Skill: ${skill.skillName || ""}
Category: ${skill.skillCategory || "Other"}`;

        documents.push(new Document({
          pageContent: content,
          metadata: { 
            type: "skill", 
            id: skill._id.toString() 
          }
        }));
      });

      // Skills Summary document for category grouping queries
      const skillsByCategory: Record<string, string[]> = {};
      skills.forEach((s: any) => {
        const cat = s.skillCategory || "Other";
        if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
        skillsByCategory[cat].push(s.skillName);
      });

      const skillCategoriesSummary = Object.entries(skillsByCategory)
        .map(([cat, names]) => `- ${cat}: ${names.join(", ")}`)
        .join("\n");

      const summaryContent = `Skills Overview & Summary:
Sandeep Singh has a total of ${skills.length} skills.
Skills grouped by category:
${skillCategoriesSummary}`;

      documents.push(new Document({
        pageContent: summaryContent,
        metadata: { type: "skill", subtype: "summary" }
      }));
    }

    // 3. Ingest About
    if (about) {
      const content = `About Sandeep Singh:
Biography / About: ${about.desc || ""}`;

      documents.push(new Document({
        pageContent: content,
        metadata: { type: "about" }
      }));
    }

    // 4. Ingest Intro
    if (intro) {
      const content = `Introduction / Identity:
Name: ${intro.name || ""}
Professional Bio: ${intro.desc || ""}
Tech Stack Focus: ${intro.techStack ? intro.techStack.join(", ") : "N/A"}`;

      documents.push(new Document({
        pageContent: content,
        metadata: { type: "intro" }
      }));
    }

    // 5. Ingest Contact & Social Links (Static Info)
    const contactContent = `Contact & Social Links for Sandeep Singh:
- Email: sandeep.necoder@gmail.com
- GitHub Profile: https://github.com/Sandeep-singh-99
- LinkedIn Profile: https://www.linkedin.com/in/sandeep-singh-7a0219320
- Twitter / X: https://x.com/SinghNecoder
- Instagram: https://www.instagram.com/sandeep.necoder`;

    documents.push(new Document({
      pageContent: contactContent,
      metadata: { type: "contact" }
    }));

    console.log(`Generated ${documents.length} documents. Connecting to Pinecone...`);
    const vectorStore = await getVectorStore();
    
    console.log("Upserting documents to Pinecone...");
    await vectorStore.addDocuments(documents);
    
    return NextResponse.json({ success: true, count: documents.length });
  } catch (error: any) {
    console.error("Ingestion failed:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
