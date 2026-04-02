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

    console.log("Connecting to Database...");
    await ConnectDB();
    
    console.log("Fetching data from MongoDB...");
    const [projects, skills, about, intro] = await Promise.all([
      Project.find({}).lean(),
      Skill.find({}).lean(),
      About.findOne({}).lean(),
      Intro.findOne({}).lean(),
    ]);

    const documents: Document[] = [];

    if (projects && Array.isArray(projects)) {
        projects.forEach((proj: any) => {
          documents.push(new Document({
            pageContent: `Project Title: ${proj.title || ''}\nDescription: ${proj.description || ''}\nTech Stack: ${proj.techStack ? proj.techStack.join(", ") : ''}`,
            metadata: { type: "project", id: proj._id.toString(), title: proj.title || "Untitled" }
          }));
        });
    }

    if (skills && Array.isArray(skills)) {
        skills.forEach((skill: any) => {
          const defaultPageContent = skill.name ? `Skill: ${skill.name}` : `Skill Data: ${JSON.stringify(skill)}`;
          documents.push(new Document({
            pageContent: defaultPageContent,
            metadata: { type: "skill", id: skill._id.toString() }
          }));
        });
    }

    if (about) {
      documents.push(new Document({
        pageContent: `About Sandeep: ${JSON.stringify(about)}`,
        metadata: { type: "about" }
      }));
    }

    if (intro) {
      documents.push(new Document({
        pageContent: `Introduction: ${JSON.stringify(intro)}`,
        metadata: { type: "intro" }
      }));
    }

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
