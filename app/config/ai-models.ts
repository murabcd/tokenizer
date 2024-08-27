export interface AIModel {
  name: string;
  inputPricePerThousandTokens: number;
  outputPricePerThousandTokens: number;
}

export const aiModels: AIModel[] = [
  {
    name: "GPT-3.5 Turbo",
    inputPricePerThousandTokens: 0.55,
    outputPricePerThousandTokens: 0.99,
  },
  { name: "GPT-4o", inputPricePerThousandTokens: 1.5, outputPricePerThousandTokens: 3 },
  {
    name: "GPT-4o Mini",
    inputPricePerThousandTokens: 0.13,
    outputPricePerThousandTokens: 0.53,
  },
  {
    name: "GРТ-4 Turbo",
    inputPricePerThousandTokens: 3,
    outputPricePerThousandTokens: 5.9,
  },
  {
    name: "Claude Sonnet 3",
    inputPricePerThousandTokens: 0.16,
    outputPricePerThousandTokens: 8.2,
  },
  {
    name: "Claude Sonnet 3.5",
    inputPricePerThousandTokens: 0.16,
    outputPricePerThousandTokens: 8.2,
  },
  {
    name: "Claude Opus 3",
    inputPricePerThousandTokens: 4.9,
    outputPricePerThousandTokens: 24.7,
  },
  {
    name: "Claude Haiku",
    inputPricePerThousandTokens: 0.27,
    outputPricePerThousandTokens: 0.66,
  },
  {
    name: "Gemini 1.5 Flash",
    inputPricePerThousandTokens: 0.38,
    outputPricePerThousandTokens: 1.6,
  },
  {
    name: "Gemini 1.5 Pro",
    inputPricePerThousandTokens: 3.8,
    outputPricePerThousandTokens: 11.5,
  },
  {
    name: "Яндекс YaGPT-2 (Lite)",
    inputPricePerThousandTokens: 0.88,
    outputPricePerThousandTokens: 1.32,
  },
  {
    name: "Яндекс YaGPT-3 (Pro)",
    inputPricePerThousandTokens: 10.1,
    outputPricePerThousandTokens: 17.2,
  },
  {
    name: "Meta LLaMA-3.1 (405b)",
    inputPricePerThousandTokens: 3.1,
    outputPricePerThousandTokens: 5.2,
  },
  {
    name: "Meta LLaMA-3.1 (70b)",
    inputPricePerThousandTokens: 0.71,
    outputPricePerThousandTokens: 3,
  },
  {
    name: "Meta LLaMA-3.1 (8b)",
    inputPricePerThousandTokens: 0.05,
    outputPricePerThousandTokens: 0.27,
  },
  {
    name: "Mixtral 8x7B",
    inputPricePerThousandTokens: 0.66,
    outputPricePerThousandTokens: 0.99,
  },
  {
    name: "Mixtral 8x22B",
    inputPricePerThousandTokens: 1.32,
    outputPricePerThousandTokens: 1.98,
  },
];

export function estimateTokens(text: string): number {
  // This is a rough estimation based on GPT-3 tokenization rules
  // It's not as accurate as gpt-3-encoder but works in the browser
  const words = text.trim().split(/\s+/);
  let tokenCount = 0;

  for (const word of words) {
    tokenCount += Math.ceil(word.length / 4); // Assume average 4 characters per token
  }

  return Math.max(1, tokenCount); // Ensure at least 1 token
}

export function calculatePrice(tokens: number, pricePerThousandTokens: number): number {
  return (tokens / 1000) * pricePerThousandTokens;
}

console.log("aiModels loaded:", aiModels);

if (typeof window !== "undefined") {
  (window as any).aiModels = aiModels;
  (window as any).calculatePrice = calculatePrice;
}
