import { PineconeStore } from "@langchain/pinecone";
import { pinecone, indexName } from "./pinecone";
import { embeddings } from "./embeddings";

let cachedStore: PineconeStore | null = null;

export const getVectorStore = async () => {
  if (cachedStore) return cachedStore;

  const pineconeIndex = pinecone.Index(indexName);

  cachedStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });

  return cachedStore;
};

export const retrieveContext = async (query:  string) => {
  try {
    const store = await getVectorStore();
    const retriever = store.asRetriever({k: 6});

    const docs = await retriever.invoke(query);
    
    if (!docs || docs.length === 0) {
      return "No relevant data found in portfolio"
    }

    return docs.map((doc) => doc.pageContent).join("\n\n");

  } catch (error) {
    return "No relevant data found in portfolio"
  }
}
