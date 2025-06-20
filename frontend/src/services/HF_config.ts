import { InferenceClient } from "@huggingface/inference";

export const client = new InferenceClient(import.meta.env.VITE_HF_TOKEN || "");
