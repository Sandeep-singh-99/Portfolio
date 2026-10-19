import { NextRequest } from "next/server";
import Groq from "groq-sdk";
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
                               cleanMessage.includes("summary") ||
                               cleanMessage.includes("projects") ||
                               cleanMessage.includes("tell me about");

    switch (intent) {
      case "project":
        filter = { type: "project" };
        k = isListOrCountQuery ? 8 : 5;
        break;
      case "skill":
        filter = { type: "skill" };
        k = isListOrCountQuery ? 8 : 5;
        break;
      case "contact":
        filter = { type: "contact" };
        k = 1; // Retrieve single compiled contact info document
        break;
      case "intro":
      case "about":
        filter = { type: { $in: ["about", "intro"] } };
        k = 2; // Retrieve both identity intro and biography documents
        break;
      case "general":
      default:
        filter = undefined; // Search all document types
        k = 3;
        break;
    }

    // Retrieve context dynamically from Pinecone with metadata filter
    let retrievedContext = await retrieveContext(cleanMessage, { filter, k });

    // Fallback: If filtered retrieval returned nothing, search all portfolio documents
    if (
      filter &&
      (!retrievedContext ||
        retrievedContext.trim() === "" ||
        retrievedContext.includes("No relevant data found"))
    ) {
      console.log(`[RAG Router] Filter ${JSON.stringify(filter)} returned empty. Falling back to unfiltered search.`);
      retrievedContext = await retrieveContext(cleanMessage, { k: 4 });
    }

    // Format prompt template with retrieved context, history, and user message
    const formattedPrompt = await systemPromptTemplate.format({
      retrieved_context: retrievedContext,
      chat_history: history,
      message: cleanMessage,
    });

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("Missing GROQ_API_KEY in environment");
    }

    const groq = new Groq({ apiKey });

    const modelName = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

    const completion = await groq.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: "system",
          content:
            "You are a professional AI assistant for Sandeep Singh's portfolio website. You answer questions accurately, politely, and concisely based strictly on his portfolio details.",
        },
        {
          role: "user",
          content: formattedPrompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 1500,
      stream: true,
    });

    let fullResponse = "";
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              fullResponse += text;
              controller.enqueue(encoder.encode(text));
            }
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
    if (
      errMsg.includes("PINECONE_API_KEY") ||
      errMsg.includes("GROQ_API_KEY") ||
      errMsg.includes("GOOGLE_API_KEY")
    ) {
      return new Response(
        `Configuration Error: ${errMsg}. Please ensure it is set in your .env file.`,
        { status: 500 }
      );
    }
    return new Response(`Server Error: ${errMsg}`, { status: 500 });
  }
}