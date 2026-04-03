import mongoose from "mongoose";
import "dotenv/config";
import { Document } from "@langchain/core/documents";
import { pinecone, indexName } from "../lib/pinecone";
import { embeddings } from "../lib/embeddings";
import About, { IAbout } from "../models/about.model";
import Project, { IProject } from "../models/project.model";
import Skill, { ISkill } from "../models/skill.model";
import Intro, { IIntro } from "../models/intro.model";
import { ConnectDB } from "../lib/db";


// ---------------------------
// Pinecone initialization helper
// ---------------------------
async function initPinecone() {
  console.log("Connected to Pinecone...");
  return pinecone.Index(indexName);
}

// ---------------------------
// Main ingestion function
// ---------------------------
async function ingest() {
  await ConnectDB();
  const index = await initPinecone();

  const documents: Document[] = [];

  // ---------------------------
  // Fetch and process Projects
  // ---------------------------
  const projects = (await Project.find().sort({ priority: -1 }).lean()) as unknown as IProject[];
  projects.forEach((proj) => {
    const content = `
                  Project: ${proj.projectName || "Untitled"}
                  Description: ${proj.projectDesc || "No description"}
                  Sub Description: ${proj.projectSubDesc || "N/A"}
                  Tech Stack: ${proj.projectTechStack?.join(", ") || "N/A"}
                  GitHub: ${proj.githubLink || "N/A"}
                  Live: ${proj.liveLink || "N/A"}
                `;
    documents.push(
      new Document({
        pageContent: content.trim(),
        metadata: { type: "project", id: proj._id?.toString() },
      })
    );
  });

  // ---------------------------
  // Fetch and process Skills
  // ---------------------------
  const skills = (await Skill.find().sort({ priority: -1 }).lean()) as unknown as ISkill[];
  skills.forEach((skill) => {
    const content = `Skill: ${skill.skillName} | Category: ${skill.skillCategory}`;
    documents.push(
      new Document({
        pageContent: content.trim(),
        metadata: { type: "skill", id: skill._id?.toString() },
      })
    );
  });

  // ---------------------------
  // Fetch and process Intro
  // ---------------------------
  const intros = (await Intro.find().lean()) as unknown as IIntro[];
  intros.forEach((intro) => {
    const content = `
Intro: ${intro.name}
Description: ${intro.desc}
Tech Stack: ${intro.techStack?.join(", ") || "N/A"}
Image: ${intro.image}
File: ${intro.file}
`;
    documents.push(
      new Document({
        pageContent: content.trim(),
        metadata: { type: "intro", id: intro._id?.toString() },
      })
    );
  });

  // ---------------------------
  // Fetch and process About
  // ---------------------------
  const abouts = (await About.find().lean()) as unknown as IAbout[];
  abouts.forEach((about) => {
    const content = `About: ${about.desc}`;
    documents.push(
      new Document({
        pageContent: content.trim(),
        metadata: { type: "about", id: about._id?.toString() },
      })
    );
  });

  console.log(`Total documents to upsert: ${documents.length}`);

  // ---------------------------
  // Upsert to Pinecone
  // ---------------------------
  for (const doc of documents) {
    const vector = await embeddings.embedQuery(doc.pageContent);
    await index.upsert([
      {
        id: doc.metadata.id!,
        values: vector,
        metadata: doc.metadata,
      },
    ]);
  }

  console.log("Ingestion complete!");
  await mongoose.disconnect();
}

ingest().catch((err) => {
  console.error("Ingestion failed:", err);
});