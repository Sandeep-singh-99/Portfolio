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
  const projects = (await Project.find().sort({ priority: 1, createdAt: -1 }).lean()) as unknown as IProject[];
  projects.forEach((proj) => {
    const id = proj._id?.toString() || "";
    const summary = proj.projectSubDesc || proj.projectDesc?.replace(/<[^>]*>?/gm, "").slice(0, 300) || "No description";
    const content = `
Project: ${proj.projectName || "Untitled"}
Project Details: /project/${id}
GitHub: ${proj.githubLink || "N/A"}
Live: ${proj.liveLink || "N/A"}
Summary: ${summary}
Tech Stack: ${proj.projectTechStack?.join(", ") || "N/A"}
`.trim();
    documents.push(
      new Document({
        pageContent: content,
        metadata: { type: "project", id },
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
Introduction & Identity of Sandeep Singh (Who is Sandeep / About Me / Intro):
Name: ${intro.name}
Role / Focus: ${intro.techStack?.join(", ") || "Full Stack Developer"}
Bio / Overview: ${intro.desc}
Resume / CV File: ${intro.file}
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
    const content = `About Sandeep Singh (About Me / Biography / Background / Story / Experience):
${about.desc}`;
    documents.push(
      new Document({
        pageContent: content,
        metadata: { type: "about", id: about._id?.toString() || "" },
      })
    );
  });

  // ---------------------------
  // Contact & Social Links
  // ---------------------------
  const contactContent = `Contact & Social Links for Sandeep Singh:
- Email: sandeep.necoder@gmail.com
- GitHub Profile: https://github.com/Sandeep-singh-99
- LinkedIn Profile: https://www.linkedin.com/in/sandeep-singh-7a0219320
- Twitter / X: https://x.com/SinghNecoder
- Instagram: https://www.instagram.com/sandeep.necoder`;

  documents.push(
    new Document({
      pageContent: contactContent,
      metadata: { type: "contact", id: "contact-info" },
    })
  );

  // Projects Summary
  if (projects.length > 0) {
    const latest4 = projects.slice(0, 4);
    const latestSummaries = latest4
      .map((p) => {
        const id = p._id?.toString() || "";
        const repo = p.githubLink ? ` | GitHub: ${p.githubLink}` : "";
        const live = p.liveLink ? ` | Live: ${p.liveLink}` : "";
        return `- ${p.projectName}: Details: /project/${id}${repo}${live}`;
      })
      .join("\n");

    const allSummaries = projects
      .map((p) => {
        const id = p._id?.toString() || "";
        const repo = p.githubLink ? ` | GitHub: ${p.githubLink}` : "";
        const live = p.liveLink ? ` | Live: ${p.liveLink}` : "";
        return `- ${p.projectName}: Details: /project/${id}${repo}${live}`;
      })
      .join("\n");

    documents.push(
      new Document({
        pageContent: `Projects Overview & Summary:
Sandeep Singh has a total of ${projects.length} projects.

Latest 4 Projects:
${latestSummaries}

All Projects (${projects.length} total):
${allSummaries}

Full Projects Page: /project/all-projects`,
        metadata: { type: "project", subtype: "summary" },
      })
    );
  }

  console.log(`Total documents to upsert: ${documents.length}`);

  // ---------------------------
  // Check & ensure Pinecone Index (768 dimensions for Gemini text-embedding-004)
  // ---------------------------
  const existingIndexes = (await pinecone.listIndexes()).indexes || [];
  if (!existingIndexes.some((index) => index.name === indexName)) {
    console.log(`Index "${indexName}" not found. Creating it with 768 dimensions...`);
    await pinecone.createIndex({
      name: indexName,
      dimension: 768,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });
    console.log("Waiting for index initialization...");
    await new Promise((resolve) => setTimeout(resolve, 15000));
    console.log(`Index "${indexName}" created successfully!`);
  }

  const pineconeIndex = pinecone.Index(indexName);

  try {
    console.log("Clearing old Pinecone documents to purge outdated records...");
    await pineconeIndex.deleteAll();
    console.log("Pinecone index cleared successfully.");
  } catch (err: any) {
    console.warn("Could not clear index (might be empty):", err.message);
  }

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