import { NextRequest } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { retrieveContext } from "../../../../lib/vectorStore";
import { saveMessage, getChatHistory } from "../../../../lib/memory";
import { systemPromptTemplate } from "../../../../lib/prompt";

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

    // 🔥 TRUE RAG (ONLY retrieval, no DB dump)
    const retrievedContext = await retrieveContext(cleanMessage);

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