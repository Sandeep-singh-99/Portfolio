import { NextRequest } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { retrieveContext } from "../../../../lib/vectorStore";
import { saveMessage, getChatHistory } from "../../../../lib/memory";
import { systemPromptTemplate } from "../../../../lib/prompt";
import { detectIntent } from "../../../../lib/intent";

// ─── Main POST handler ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();

    if (!message || !sessionId) {
      return new Response("Invalid request", { status: 400 });
    }

    const cleanMessage = message.trim().slice(0, 1000);

    // Save user message in MongoDB chat memory
    await saveMessage(sessionId, "user", cleanMessage);

    // Fetch conversation memory from MongoDB
    const history = await getChatHistory(sessionId);

    // Detect user query intent (hybrid keyword + LLM classification)
    const intent = await detectIntent(cleanMessage);
    console.log(`[RAG Router] Query: "${cleanMessage}" | Intent: "${intent}"`);

    // Determine metadata filter and retrieval size based on intent
    let filter: Record<string, any> | undefined = undefined;
    let k = 3;

    const isListOrCountQuery = cleanMessage.includes("all") || 
                               cleanMessage.includes("list") || 
                               cleanMessage.includes("how many") || 
                               cleanMessage.includes("total") ||
                               cleanMessage.includes("count") ||
                               cleanMessage.includes("summary");

    switch (intent) {
      case "project":
        filter = { type: "project" };
        k = isListOrCountQuery ? 8 : 3;
        break;
      case "skill":
        filter = { type: "skill" };
        k = isListOrCountQuery ? 8 : 3;
        break;
      case "contact":
        filter = { type: "contact" };
        k = 1; // Retrieve single compiled contact info document
        break;
      case "intro":
        filter = { type: "intro" };
        k = 1; // Retrieve introduction document
        break;
      case "about":
        filter = { type: "about" };
        k = 1; // Retrieve biography document
        break;
      case "general":
      default:
        filter = undefined; // Search all document types
        k = 3;
        break;
    }

    // Retrieve context dynamically from Pinecone with metadata filter
    const retrievedContext = await retrieveContext(cleanMessage, { filter, k });

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

          // Save assistant message to MongoDB memory
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
  } catch (error: any) {
    console.error("[Chat API Error]:", error);
    const errMsg = error?.message || "";
    if (errMsg.includes("PINECONE_API_KEY") || errMsg.includes("HUGGINGFACE_API_KEY") || errMsg.includes("GOOGLE_API_KEY")) {
      return new Response(`Configuration Error: ${errMsg}. Please ensure it is set in your .env file.`, { status: 500 });
    }
    return new Response(`Server Error: ${errMsg}`, { status: 500 });
  }
}