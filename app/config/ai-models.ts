export const types = ["Closed-source Models", "Open-source Models"] as const;

export type ModelType = (typeof types)[number];

export interface AIModel<Type = ModelType> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
  inputPricePerThousandTokens: number;
  outputPricePerThousandTokens: number;
  category: "cloud" | "local";
}

export const aiModels: AIModel[] = [
  {
    id: "1",
    name: "GPT-3.5 Turbo",
    description:
      "A powerful and fast model from OpenAI for a wide range of tasks. Optimal balance of performance and cost.",
    type: "Closed-source Models",
    strengths:
      "Text generation, question answering, context analysis, fast request processing, multilingualism",
    inputPricePerThousandTokens: 0.55,
    outputPricePerThousandTokens: 0.99,
    category: "cloud",
  },
  {
    id: "2",
    name: "GPT-4o",
    description:
      "The most advanced model from OpenAI with improved understanding and generation. Ideal for complex tasks and creative projects.",
    type: "Closed-source Models",
    strengths:
      "Complex tasks, multilingualism, creative generation, deep analysis, understanding of nuances",
    inputPricePerThousandTokens: 1.5,
    outputPricePerThousandTokens: 3,
    category: "cloud",
  },
  {
    id: "3",
    name: "GPT-4o Mini",
    description:
      "A lightweight version of GPT-4o from OpenAI with a balance of performance and cost. Ideal for efficiently solving a wide range of tasks.",
    type: "Closed-source Models",
    strengths: "Efficiency, fast answers, wide range of tasks, multilingualism",
    inputPricePerThousandTokens: 0.13,
    outputPricePerThousandTokens: 0.53,
    category: "cloud",
  },
  {
    id: "4",
    name: "GPT-4 Turbo",
    description:
      "An improved version of GPT-4 from OpenAI with increased speed and efficiency. Ideal for complex tasks and quick results.",
    type: "Closed-source Models",
    strengths: "High performance, complex tasks, fast answers, multilingualism",
    inputPricePerThousandTokens: 3,
    outputPricePerThousandTokens: 5.9,
    category: "cloud",
  },
  {
    id: "5",
    name: "Claude Haiku",
    description:
      "A lightweight and fast model from Anthropic for simple tasks. Ideal for efficiently solving basic tasks.",
    type: "Closed-source Models",
    strengths: "Fast answers, efficiency, basic tasks, multilingualism",
    inputPricePerThousandTokens: 0.27,
    outputPricePerThousandTokens: 0.66,
    category: "cloud",
  },
  {
    id: "6",
    name: "Claude Opus 3",
    description:
      "The most powerful model from Anthropic for complex tasks. Ideal for deep analysis and expert answers.",
    type: "Closed-source Models",
    strengths: "Complex calculations, deep analysis, expert answers, multilingualism",
    inputPricePerThousandTokens: 4.9,
    outputPricePerThousandTokens: 24.7,
    category: "cloud",
  },
  {
    id: "7",
    name: "Claude Sonnet 3",
    description:
      "A model from Anthropic optimized for creative tasks. Ideal for creating unique ideas and solutions.",
    type: "Closed-source Models",
    strengths: "Creative generation, text analysis, multitasking, understanding context",
    inputPricePerThousandTokens: 0.16,
    outputPricePerThousandTokens: 8.2,
    category: "cloud",
  },
  {
    id: "8",
    name: "Claude Sonnet 3.5",
    description:
      "An updated version of Claude Sonnet with improved capabilities. Ideal for solving complex tasks and analytics.",
    type: "Closed-source Models",
    strengths:
      "Improved understanding of context, creative tasks, analytics, multilingualism",
    inputPricePerThousandTokens: 0.16,
    outputPricePerThousandTokens: 8.2,
    category: "cloud",
  },
  {
    id: "9",
    name: "Gemini 1.5 Flash",
    description:
      "A fast model from Google for operational tasks. Ideal for efficiently solving a wide range of tasks.",
    type: "Closed-source Models",
    strengths:
      "Processing speed, efficiency, wide range of applications, multilingualism",
    inputPricePerThousandTokens: 0.38,
    outputPricePerThousandTokens: 1.6,
    category: "cloud",
  },
  {
    id: "10",
    name: "Gemini 1.5 Pro",
    description:
      "An advanced model from Google for complex tasks. Ideal for deep analysis and multitasking.",
    type: "Closed-source Models",
    strengths: "Deep analysis, complex calculations, multitasking, multilingualism",
    inputPricePerThousandTokens: 3.8,
    outputPricePerThousandTokens: 11.5,
    category: "cloud",
  },
  {
    id: "11",
    name: "Yandex YaGPT-2 (Lite)",
    description:
      "A lightweight model from Yandex for Russian-language tasks. Ideal for efficiently solving basic tasks in Russian.",
    type: "Closed-source Models",
    strengths: "Russian language, fast answers, basic tasks",
    inputPricePerThousandTokens: 0.88,
    outputPricePerThousandTokens: 1.32,
    category: "cloud",
  },
  {
    id: "12",
    name: "Yandex YaGPT-3 (Pro)",
    description:
      "An advanced model from Yandex for complex Russian-language tasks. Ideal for deep understanding of the Russian language and analytics.",
    type: "Closed-source Models",
    strengths: "Deep understanding of the Russian language, complex tasks, analytics",
    inputPricePerThousandTokens: 10.1,
    outputPricePerThousandTokens: 17.2,
    category: "cloud",
  },
  {
    id: "13",
    name: "Meta LLaMA-3.1 (8b)",
    description:
      "A lightweight LLaMA model from Meta for local use. Ideal for efficiently solving basic tasks.",
    type: "Open-source Models",
    strengths: "Fast answers, efficiency, basic tasks",
    inputPricePerThousandTokens: 0.05,
    outputPricePerThousandTokens: 0.27,
    category: "local",
  },
  {
    id: "14",
    name: "Meta LLaMA-3.1 (70b)",
    description:
      "A medium LLaMA model from Meta for local use. Ideal for balancing performance and resources.",
    type: "Open-source Models",
    strengths: "Balance of performance and resources, wide range of tasks",
    inputPricePerThousandTokens: 0.71,
    outputPricePerThousandTokens: 3,
    category: "local",
  },
  {
    id: "15",
    name: "Meta LLaMA-3.1 (405b)",
    description:
      "The largest LLaMA model from Meta for local use. Ideal for high accuracy and complex tasks.",
    type: "Open-source Models",
    strengths: "High accuracy, complex tasks, deep analysis",
    inputPricePerThousandTokens: 3.1,
    outputPricePerThousandTokens: 5.2,
    category: "local",
  },
  {
    id: "16",
    name: "Mixtral 8x7B",
    description:
      "A Mixtral model for local use with 8 experts of 7B parameters each. Ideal for multitasking and a wide range of applications.",
    type: "Open-source Models",
    strengths: "Multitasking, efficiency, wide range of applications",
    inputPricePerThousandTokens: 0.66,
    outputPricePerThousandTokens: 0.99,
    category: "local",
  },
  {
    id: "17",
    name: "Mixtral 8x22B",
    description:
      "An improved Mixtral model for local use with 8 experts of 22B parameters each. Ideal for high accuracy and complex tasks.",
    type: "Open-source Models",
    strengths: "High accuracy, complex tasks, deep analysis",
    inputPricePerThousandTokens: 1.32,
    outputPricePerThousandTokens: 1.98,
    category: "local",
  },
];

// Import dynamically to avoid build errors
let encode: (text: string) => number[];
if (typeof window === "undefined") {
  // Server-side
  import("gpt-3-encoder").then((module) => {
    encode = module.encode;
  });
} else {
  // Client-side
  encode = (text: string) => {
    // Fallback to simple estimation on the client-side
    return new Array(Math.ceil(text.length / 4));
  };
}

export function estimateTokens(text: string): number {
  if (typeof encode === "function") {
    return encode(text).length;
  }
  // Fallback to simple estimation if encode is not available
  return Math.ceil(text.length / 4);
}

export function calculatePrice(tokens: number, pricePerThousandTokens: number): number {
  return (tokens / 1000) * pricePerThousandTokens;
}

if (typeof window !== "undefined") {
  (window as any).aiModels = aiModels;
  (window as any).calculatePrice = calculatePrice;
}

export { aiModels as models };
