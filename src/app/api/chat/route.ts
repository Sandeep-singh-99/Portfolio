import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ConnectDB } from "../../../../lib/db";
import Project from "../../../../models/project.model";
import Skill from "../../../../models/skill.model";
import About from "../../../../models/about.model";
import Intro from "../../../../models/intro.model";
import Certificate from "../../../../models/certificate.model";
import User from "../../../../models/user.model";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    await ConnectDB();

    // Fetch all context data in parallel
    const [projects, skills, about, intro, certificates, user] =
      await Promise.all([
        Project.find({}).lean(),
        Skill.find({}).lean(),
        About.findOne({}).lean(),
        Intro.findOne({}).lean(),
        Certificate.find({}).lean(),
        User.findOne({}).lean(),
      ]);

    // Construct the system prompt with context
    const context = `
    You are an AI portfolio assistant for Sandeep Singh. Your goal is to answer questions about Sandeep's work, skills, and experience in a professional, engaging, and helpful manner.
    
    Here is the context about Sandeep:

    **Introduction:**
    ${JSON.stringify(intro, null, 2)}

    **About Me:**
    ${JSON.stringify(about, null, 2)}

    **Skills:**
    ${JSON.stringify(skills, null, 2)}

    **Projects:**
    ${JSON.stringify(projects, null, 2)}

    **Certificates:**
    ${JSON.stringify(certificates, null, 2)}

    **Contact/User Info:**
    ${JSON.stringify(user, null, 2)}

    **Instructions:**
    - Be polite and professional.
    - If asked about specific projects, provide details like tech stack and description.
    - If asked about skills, categorize them if possible.
    - If the user asks something not in the context, politely say you don't have that information but can help with portfolio-related queries.
    - Keep responses concise but informative.
    - Use "I" to refer to the AI assistant, and "Sandeep" to refer to the portfolio owner.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: context }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Understood. I am ready to answer questions about Sandeep Singh based on the provided context.",
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
