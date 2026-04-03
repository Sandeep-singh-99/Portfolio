import mongoose from "mongoose";
import "dotenv/config";
import { Document } from "@langchain/core/documents";
import { embeddings } from "../lib/embeddings";
import About, { IAbout } from "../models/about.model";
import Project, { IProject } from "../models/project.model";
import Skill, { ISkill } from "../models/skill.model";
import Intro, { IIntro } from "../models/intro.model";
import { ConnectDB } from "../lib/db";
import { PineconeStore } from "@langchain/pinecone";
import { pinecone, indexName } from "../lib/pinecone";

// ---------------------------
// Main ingestion function
// ---------------------------
async function ingest() {
  await ConnectDB();
  console.log("Connected to MongoDB...");

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
`.trim();
    documents.push(
      new Document({
        pageContent: content,
        metadata: { type: "project", id: proj._id?.toString() || "" },
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
        pageContent: content,
        metadata: { type: "skill", id: skill._id?.toString() || "" },
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
`.trim();
    documents.push(
      new Document({
        pageContent: content,
        metadata: { type: "intro", id: intro._id?.toString() || "" },
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
        pageContent: content,
        metadata: { type: "about", id: about._id?.toString() || "" },
      })
    );
  });

  console.log(`Total documents to upsert: ${documents.length}`);

  // ---------------------------
  // Upsert to Pinecone via PineconeStore
  // This stores pageContent in the metadata "text" field
  // so PineconeStore retriever can reconstruct full documents
  // ---------------------------
  const pineconeIndex = pinecone.Index(indexName);
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });

  console.log("Upserting documents to Pinecone via PineconeStore...");
  await vectorStore.addDocuments(documents);

  console.log("Ingestion complete!");
  await mongoose.disconnect();
}

ingest().catch((err) => {
  console.error("Ingestion failed:", err);
});