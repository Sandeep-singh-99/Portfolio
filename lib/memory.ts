import ChatMessage from "../models/chatMessage.model";
import { ConnectDB } from "./db";

export const saveMessage = async (sessionId: string, role: "user" | "assistant", content: string) => {
  await ConnectDB();
  await ChatMessage.create({ sessionId, role, content });
};

export const getChatHistory = async (sessionId: string, limit: number = 10) => {
  await ConnectDB();
  const messages = await ChatMessage.find({ sessionId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  
  // Return in chronological order
  return messages.reverse().map((msg) => ({
    role: msg.role as "user" | "assistant",
    content: msg.content as string,
  }));
};
