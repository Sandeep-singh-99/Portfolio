import { NextRequest } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ConnectDB } from "../../../../lib/db";
import Project from "../../../../models/project.model";
import Skill from "../../../../models/skill.model";
import About from "../../../../models/about.model";
import Intro from "../../../../models/intro.model";
import { retrieveContext } from "../../../../lib/vectorStore";
import { saveMessage, getChatHistory } from "../../../../lib/memory";
import { systemPromptTemplate } from "../../../../lib/prompt";

// ─── Build complete portfolio context from DB + RAG ───────────────────
async function buildPortfolioContext(query: string): Promise<string> {
  await ConnectDB();

  const [projects, skills, about, intro] = await Promise.all([
    Project.find({}).select("projectName projectDesc projectTechStack githubLink liveLink").sort({ priority: -1 }).lean(),
    Skill.find({}).select("skillName skillCategory").sort({ priority: -1 }).lean(),
    About.findOne({}).select("desc").lean() as any,
    Intro.findOne({}).select("name techStack desc").lean() as any,
  ]);

  const sections: string[] = [];

  // Intro (name, bio, etc.)
  if (intro) {
    sections.push(
      `## Introduction\n- Name: ${intro.name}\n- Tech Stack: ${intro.techStack?.join(", ") || "N/A"}\n- Bio: ${intro.desc}`
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

  // All Projects
  if (projects.length > 0) {
    const projectLines = projects.map((p: any) =>
      `- **${p.projectName}**: ${p.projectDesc}\n  Tech: ${p.projectTechStack?.join(", ") || "N/A"} | GitHub: ${p.githubLink || "N/A"} | Live: ${p.liveLink || "N/A"}`
    );
    sections.push(`## Projects (${projects.length} total)\n${projectLines.join("\n")}`);
  } else {
    sections.push("## Projects\nNone");
  }

  // All Skills grouped by category
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

  let context = sections.join("\n\n");

  // Supplement with RAG for detailed/specific queries
  try {
    const ragContext = await retrieveContext(query);
    if (ragContext && ragContext !== "No relevant data found in portfolio") {
      context += `\n\n## Additional Details (from vector search)\n${ragContext}`;
    }
  } catch (e: any) {
    console.warn("RAG retrieval skipped:", e.message);
  }

  return context;
}

// ─── Main POST handler ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || !sessionId) {
      return new Response("Invalid request", { status: 400 });
    }

    const cleanMessage = message.trim().slice(0, 1000);

    // Save user message
    await saveMessage(sessionId, "user", cleanMessage);

    // Get memory
    const history = await getChatHistory(sessionId);

    // Hybrid context: DB core data + RAG supplementary
    const retrievedContext = await buildPortfolioContext(cleanMessage);

    // Gemini model
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      maxOutputTokens: 800,
      apiKey: process.env.GOOGLE_API_KEY!,
    });

    const chain = systemPromptTemplate
      .pipe(model)
      .pipe(new StringOutputParser());

    const stream = await chain.stream({
      retrieved_context: retrievedContext,
      chat_history: history,
      message: cleanMessage,
    });

    let fullResponse = "";
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            fullResponse += chunk;
            controller.enqueue(encoder.encode(chunk));

            // smoother streaming
            await new Promise((r) => setTimeout(r, 0));
          }

          // Save assistant message
          saveMessage(sessionId, "assistant", fullResponse).catch(console.error);

          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Server Error", { status: 500 });
  }
}