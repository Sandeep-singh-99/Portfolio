import { PineconeStore } from "@langchain/pinecone";
import { pinecone, indexName } from "./pinecone";
import { embeddings } from "./embeddings";

export const getVectorStore = async () => {
  const pineconeIndex = pinecone.Index(indexName);
  
  return await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });
};
