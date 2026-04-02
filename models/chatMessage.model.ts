import mongoose, { Schema, Document, models } from "mongoose";

export interface IChatMessage extends Document {
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>(
  {
    sessionId: { type: String, required: true, index: true },
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ChatMessage = models.ChatMessage || mongoose.model<IChatMessage>("ChatMessage", chatMessageSchema);

export default ChatMessage;
