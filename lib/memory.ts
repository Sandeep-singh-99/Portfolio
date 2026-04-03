import ChatMessage from "../models/chatMessage.model";
import { ConnectDB } from "./db";

export const saveMessage = async (
  sessionId: string,
  role: "user" | "assistant",
  content: string
) => {
  await ConnectDB();
  await ChatMessage.create({ sessionId, role, content });
};

export const getChatHistory = async (sessionId: string, limit = 8) => {
  await ConnectDB();

  const messages = await ChatMessage.find({ sessionId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return messages
    .reverse()
    .map(
      (m) =>
        `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`
    )
    .join("\n");
};