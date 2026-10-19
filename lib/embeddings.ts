import { Embeddings } from "@langchain/core/embeddings";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiEmbeddings extends Embeddings {
  private genAI: GoogleGenerativeAI;
  private model: string;
  private dimension: number;

  constructor(fields?: { apiKey?: string; model?: string; dimension?: number }) {
    super({});
    const apiKey =
      fields?.apiKey || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing GOOGLE_API_KEY in environment");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = fields?.model || "gemini-embedding-001";
    this.dimension = fields?.dimension || 768;
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const generativeModel = this.genAI.getGenerativeModel({ model: this.model });
    const batchSize = 50;
    const allEmbeddings: number[][] = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const chunk = texts.slice(i, i + batchSize);
      const res = await generativeModel.batchEmbedContents({
        requests: chunk.map((text) => ({
          content: {
            role: "user",
            parts: [{ text: text.replace(/\n/g, " ") }],
          },
          outputDimensionality: this.dimension,
        })),
      });

      for (const item of res.embeddings) {
        allEmbeddings.push(item.values);
      }
    }

    return allEmbeddings;
  }

  async embedQuery(text: string): Promise<number[]> {
    const generativeModel = this.genAI.getGenerativeModel({ model: this.model });
    const res = await generativeModel.embedContent({
      content: {
        role: "user",
        parts: [{ text: text.replace(/\n/g, " ") }],
      },
      outputDimensionality: this.dimension,
    } as any);

    return res.embedding.values;
  }
}

// Lazy proxy object for GeminiEmbeddings to avoid module evaluation errors during build
export const embeddings = {
  embedDocuments: (texts: string[]) => new GeminiEmbeddings().embedDocuments(texts),
  embedQuery: (text: string) => new GeminiEmbeddings().embedQuery(text),
} as unknown as GeminiEmbeddings;
