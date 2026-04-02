import { Embeddings } from "@langchain/core/embeddings";
import { HfInference } from "@huggingface/inference";

export class HuggingFaceInferenceEmbeddings extends Embeddings {
  private hf: HfInference;
  private model: string;

  constructor(fields: { apiKey: string, model: string }) {
    super({});
    this.hf = new HfInference(fields.apiKey);
    this.model = fields.model;
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const res = await this.hf.featureExtraction({
      model: this.model,
      inputs: texts,
    });
    // featureExtraction for a list of strings usually returns an array of arrays
    return res as unknown as number[][];
  }

  async embedQuery(text: string): Promise<number[]> {
    const res = await this.hf.featureExtraction({
      model: this.model,
      inputs: text,
    });
    // featureExtraction for a single string usually returns an array
    return res as unknown as number[];
  }
}

if (!process.env.HUGGINGFACE_API_KEY) {
  throw new Error("Missing HUGGINGFACE_API_KEY in environment");
}

export const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACE_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2",
});
