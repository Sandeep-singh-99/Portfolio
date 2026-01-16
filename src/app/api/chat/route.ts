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
    const context = `You are Sandeep Singh's professional portfolio assistant. Your goal is to represent Sandeep and answer questions about his work, skills, and experience with enthusiasm and expertise.
    
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

    **Social Media & Links:**
    - GitHub: https://github.com/Sandeep-singh-99
    - LinkedIn: https://www.linkedin.com/in/sandeep-singh-7a0219320
    - Email: sandeep.necoder@gmail.com
    - Twitter: https://x.com/SinghNecoder
    - Instagram: https://www.instagram.com/sandeep.necoder

    **Instructions:**
    - **Tone**: Friendly, professional, and confident. Avoid robotic or overly formal language.
    - **Directness**: Do NOT start responses with "As an AI", "I am an AI", or similar meta-statements. Jump straight into the answer.
    - **Perspective**: If the user asks about "your" skills, projects, or experience, assume they are asking about **Sandeep's**. Answer as if you are presenting his profile.
    - **Formatting**: Use Markdown (bullet points, bold text) to make answers easy to read.
    - **Unknowns**: If asked something completely unrelated to the portfolio/Sandeep, politely bring the conversation back to his professional profile.
    - **Conciseness**: Keep answers short and punchy unless asked for details.
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
