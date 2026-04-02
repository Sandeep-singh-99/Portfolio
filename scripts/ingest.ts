import { loadEnvConfig } from "@next/env";
import { Document } from "@langchain/core/documents";

const ingestData = async () => {
  try {
    loadEnvConfig(process.cwd());
    const { ConnectDB } = await import("../lib/db");
    const Project = (await import("../models/project.model")).default;
    const Skill = (await import("../models/skill.model")).default;
    const About = (await import("../models/about.model")).default;
    const Intro = (await import("../models/intro.model")).default;
    const { getVectorStore } = await import("../lib/vectorStore");
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

    // Format Projects
    if (projects && Array.isArray(projects)) {
        projects.forEach((proj: any) => {
          documents.push(new Document({
            pageContent: `Project Title: ${proj.title || ''}\nDescription: ${proj.description || ''}\nTech Stack: ${proj.techStack ? proj.techStack.join(", ") : ''}`,
            metadata: { type: "project", id: proj._id.toString(), title: proj.title || "Untitled" }
          }));
        });
    }

    // Format Skills
    if (skills && Array.isArray(skills)) {
        skills.forEach((skill: any) => {
          const defaultPageContent = skill.name ? `Skill: ${skill.name}` : `Skill Data: ${JSON.stringify(skill)}`;
          documents.push(new Document({
            pageContent: defaultPageContent,
            metadata: { type: "skill", id: skill._id.toString() }
          }));
        });
    }

    // Format About
    if (about) {
      documents.push(new Document({
        pageContent: `About Sandeep: ${JSON.stringify(about)}`,
        metadata: { type: "about" }
      }));
    }

    // Format Intro
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
    
    console.log("Ingestion complete!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

ingestData();
