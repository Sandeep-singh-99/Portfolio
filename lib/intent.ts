import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

export type IntentType = "project" | "skill" | "contact" | "intro" | "about" | "general";

/**
 * Detects the intent of a user's message using a hybrid strategy:
 * 1. Rule-based checks for common keywords (zero latency, zero cost)
 * 2. LLM classification using Gemini 2.5 Flash as a fallback
 */
export async function detectIntent(query: string): Promise<IntentType> {
  const cleanQuery = query.toLowerCase().trim();

  // 1. Rule-based pre-filtering (Fast Path)
  
  // Greetings / General chit-chat
  if (
    cleanQuery === "hi" ||
    cleanQuery === "hello" ||
    cleanQuery === "hey" ||
    cleanQuery === "hola" ||
    cleanQuery === "how are you" ||
    cleanQuery === "what's up" ||
    cleanQuery === "sup"
  ) {
    return "general";
  }

  // Contact info query
  if (
    cleanQuery.includes("email") ||
    cleanQuery.includes("phone") ||
    cleanQuery.includes("contact") ||
    cleanQuery.includes("social") ||
    cleanQuery.includes("linkedin") ||
    cleanQuery.includes("github") ||
    cleanQuery.includes("twitter") ||
    cleanQuery.includes("instagram") ||
    cleanQuery.includes("reach you") ||
    cleanQuery.includes("message you") ||
    cleanQuery.includes("send message")
  ) {
    return "contact";
  }

  // Identity / Basic introduction query
  if (
    cleanQuery.includes("who are you") ||
    cleanQuery.includes("who is sandeep") ||
    cleanQuery.includes("your name") ||
    cleanQuery.includes("introduce yourself") ||
    cleanQuery.includes("what is your name")
  ) {
    return "intro";
  }

  // Detailed about / Biography query
  if (
    cleanQuery.includes("about you") ||
    cleanQuery.includes("tell me about yourself") ||
    cleanQuery.includes("your bio") ||
    cleanQuery.includes("background") ||
    cleanQuery.includes("education") ||
    cleanQuery.includes("experience")
  ) {
    return "about";
  }

  // Skills query
  if (
    (cleanQuery.includes("skill") ||
      cleanQuery.includes("tech stack") ||
      cleanQuery.includes("technologies") ||
      cleanQuery.includes("frameworks") ||
      cleanQuery.includes("languages")) &&
    !cleanQuery.includes("project")
  ) {
    return "skill";
  }

  // Projects query
  if (
    cleanQuery.includes("project") ||
    cleanQuery.includes("portfolio") ||
    cleanQuery.includes("apps") ||
    cleanQuery.includes("websites you built") ||
    cleanQuery.includes("what have you built")
  ) {
    return "project";
  }

  // 2. LLM-based categorization fallback (Slow Path)
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      temperature: 0,
      maxOutputTokens: 10,
      apiKey: process.env.GOOGLE_API_KEY!,
    });

    const response = await model.invoke([
      new SystemMessage(`
You are a classification agent for a portfolio chatbot. Your job is to classify the user's query into ONE of the following categories:
- "project": If the user is asking about projects, applications, websites built, work samples, or portfolio highlights.
- "skill": If the user is asking about skills, technical abilities, tools, programming languages, databases, frameworks, or technologies.
- "contact": If the user is asking about how to get in touch, contact info, email, social media profiles (GitHub, LinkedIn, Twitter/X, Instagram, etc.).
- "intro": If the user is asking about identity, who the person is (Sandeep Singh), name, role, biography, introduction, or general overview.
- "about": If the user is asking for a detailed biography, background, education, or professional experience.
- "general": For greetings, general chit-chat, or questions that don't fit into the categories above.

Respond ONLY with the category name: "project", "skill", "contact", "intro", "about", or "general". Do not include any explanations or punctuation.
`),
      new HumanMessage(query),
    ]);

    const result = response.content.toString().trim().toLowerCase() as IntentType;
    if (["project", "skill", "contact", "intro", "about", "general"].includes(result)) {
      return result;
    }
    return "general";
  } catch (error) {
    console.error("Error detecting intent with LLM:", error);
    return "general";
  }
}
