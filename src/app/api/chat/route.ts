import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ConnectDB } from "../../../../lib/db";
import Project from "../../../../models/project.model";
import Skill from "../../../../models/skill.model";
import About from "../../../../models/about.model";
import Intro from "../../../../models/intro.model";
import Certificate from "../../../../models/certificate.model";
import { getVectorStore } from "../../../../lib/vectorStore";
import { saveMessage, getChatHistory } from "../../../../lib/memory";
import { systemPromptTemplate } from "../../../../lib/prompt";

// ─── Helper: Build structured context from DB + Pinecone ───────────────────
async function buildRetrievedContext(message: string): Promise<string> {
  await ConnectDB();

  // Fetch lightweight DB summaries in parallel (only the fields the AI needs)
  const [projects, skills, about, intro, certificates] = await Promise.all([
    Project.find({}).select("projectName projectDesc projectTechStack githubLink liveLink").lean(),
    Skill.find({}).select("skillName skillCategory").lean(),
    About.findOne({}).select("desc").lean() as any,
    Intro.findOne({}).select("name techStack desc").lean() as any,
    Certificate.find({}).select("imageUrl").lean(),
  ]);

  // ── Format each section with explicit "None" when empty ──
  const sections: string[] = [];

  // Intro
  if (intro) {
    sections.push(
      `## Introduction\n- Name: ${intro.name}\n- Tech Stack: ${(intro as any).techStack?.join(", ") || "N/A"}\n- Bio: ${intro.desc}`
    );
  } else {
    sections.push("## Introduction\nNone");
  }

  // About
  if (about) {
    sections.push(`## About\n${about.desc}`);
  } else {
    sections.push("## About\nNone");
  }

  // Projects
  if (projects.length > 0) {
    const projectLines = projects.map((p: any) =>
      `- **${p.projectName}**: ${p.projectDesc}\n  Tech: ${p.projectTechStack?.join(", ") || "N/A"} | GitHub: ${p.githubLink || "N/A"} | Live: ${p.liveLink || "N/A"}`
    );
    sections.push(`## Projects (${projects.length} total)\n${projectLines.join("\n")}`);
  } else {
    sections.push("## Projects\nNone");
  }

  // Skills
  if (skills.length > 0) {
    const grouped: Record<string, string[]> = {};
    skills.forEach((s: any) => {
      const cat = s.skillCategory || "Other";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(s.skillName);
    });
    const skillLines = Object.entries(grouped).map(
      ([cat, names]) => `- **${cat}**: ${names.join(", ")}`
    );
    sections.push(`## Skills\n${skillLines.join("\n")}`);
  } else {
    sections.push("## Skills\nNone");
  }

  // Certificates
  if (certificates.length > 0) {
    sections.push(`## Certificates\n${certificates.length} certificate(s) available in the portfolio.`);
  } else {
    sections.push("## Certificates\nNone");
  }

  let context = sections.join("\n\n");

  // ── Augment with Pinecone RAG results (if available) ──
  try {
    const vectorStore = await getVectorStore();
    const retriever = vectorStore.asRetriever({ k: 3 });
    const docs = await retriever.invoke(message);
    if (docs.length > 0) {
      const ragContent = docs.map((doc: any) => doc.pageContent).join("\n\n");
      context += `\n\n## Additional Relevant Details (from vector search)\n${ragContent}`;
    }
  } catch (e: any) {
    // Pinecone may not be initialized yet — that's okay, we still have DB context
    console.warn("Pinecone retrieval skipped:", e.message);
  }

  return context;
}

// ─── Main POST handler ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    // Basic prompt injection protection: limit length
    const sanitizedMessage = message.trim().slice(0, 1000);

    // Save user message
    await saveMessage(sessionId, "user", sanitizedMessage);

    // Initialize Gemini
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      maxOutputTokens: 800,
      apiKey: process.env["GOOGLE_API_KEY"] || "",
    });

    // Fetch conversation history (last 10 messages)
    const history = await getChatHistory(sessionId, 10);
    const historyString = history.length > 0
      ? history.map((h) => `${h.role}: ${h.content}`).join("\n")
      : "No previous conversation.";

    // Build the full context from DB + Pinecone
    const retrievedContext = await buildRetrievedContext(sanitizedMessage);

    // Chain: prompt → model → string output
    const chain = systemPromptTemplate.pipe(model).pipe(new StringOutputParser());

    // Stream the response
    const stream = await chain.stream({
      retrieved_context: retrievedContext,
      chat_history: historyString,
      message: sanitizedMessage,
    });

    // Build a ReadableStream that also captures the full response for DB storage
    let fullResponse = "";
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            fullResponse += chunk;
            controller.enqueue(encoder.encode(chunk));
          }
          // Save completed assistant response to DB (fire-and-forget)
          saveMessage(sessionId, "assistant", fullResponse).catch(console.error);
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
