import { Pinecone } from "@pinecone-database/pinecone";

const getPineconeClient = () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error("Missing PINECONE_API_KEY in environment");
  }
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

// Lazy proxy object for backwards compatibility and to avoid module evaluation errors
export const pinecone = {
  Index: (name: string) => getPineconeClient().Index(name),
  listIndexes: () => getPineconeClient().listIndexes(),
  createIndex: (options: any) => getPineconeClient().createIndex(options),
} as unknown as Pinecone;

export const indexName = process.env.PINECONE_INDEX_NAME || "portfolio-ai";

