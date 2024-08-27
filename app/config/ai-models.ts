export const types = ["Облачные модели", "Контурные модели"] as const;

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
      "Мощная и быстрая модель от OpenAI для широкого спектра задач. Оптимальное соотношение производительности и стоимости.",
    type: "Облачные модели",
    strengths:
      "Генерация текста, ответы на вопросы, анализ контекста, быстрая обработка запросов, многоязычность",
    inputPricePerThousandTokens: 0.55,
    outputPricePerThousandTokens: 0.99,
    category: "cloud",
  },
  {
    id: "2",
    name: "GPT-4o",
    description:
      "Самая продвинутая модель от OpenAI с улучшенным пониманием и генерацией. Идеальна для сложных задач и творческих проектов.",
    type: "Облачные модели",
    strengths:
      "Сложные задачи, многоязычность, творческая генерация, глубокий анализ, понимание нюансов",
    inputPricePerThousandTokens: 1.5,
    outputPricePerThousandTokens: 3,
    category: "cloud",
  },
  {
    id: "3",
    name: "GPT-4o Mini",
    description:
      "Облегченная версия GPT-4o от OpenAI с балансом производительности и стоимости. Идеальна для эффективного решения широкого спектра задач.",
    type: "Облачные модели",
    strengths: "Эффективность, быстрые ответы, широкий спектр задач, многоязычность",
    inputPricePerThousandTokens: 0.13,
    outputPricePerThousandTokens: 0.53,
    category: "cloud",
  },
  {
    id: "4",
    name: "GРТ-4 Turbo",
    description:
      "Улучшенная версия GPT-4 от OpenAI с повышенной скоростью и эффективностью. Идеальна для сложных задач и быстрого получения результатов.",
    type: "Облачные модели",
    strengths:
      "Высокая производительность, сложные задачи, быстрые ответы, многоязычность",
    inputPricePerThousandTokens: 3,
    outputPricePerThousandTokens: 5.9,
    category: "cloud",
  },
  {
    id: "5",
    name: "Claude Haiku",
    description:
      "Легкая и быстрая модель от Anthropic для простых задач. Идеальна для эффективного решения базовых задач.",
    type: "Облачные модели",
    strengths: "Быстрые ответы, эффективность, базовые задачи, многоязычность",
    inputPricePerThousandTokens: 0.27,
    outputPricePerThousandTokens: 0.66,
    category: "cloud",
  },
  {
    id: "6",
    name: "Claude Opus 3",
    description:
      "Самая мощная модель от Anthropic для сложных задач. Идеальна для глубокого анализа и экспертных ответов.",
    type: "Облачные модели",
    strengths: "Сложные вычисления, глубокий анализ, экспертные ответы, многоязычность",
    inputPricePerThousandTokens: 4.9,
    outputPricePerThousandTokens: 24.7,
    category: "cloud",
  },
  {
    id: "7",
    name: "Claude Sonnet 3",
    description:
      "Модель от Anthropic, оптимизированная для творческих задач. Идеальна для создания уникальных идей и решений.",
    type: "Облачные модели",
    strengths:
      "Творческая генерация, анализ текста, многозадачность, понимание контекста",
    inputPricePerThousandTokens: 0.16,
    outputPricePerThousandTokens: 8.2,
    category: "cloud",
  },
  {
    id: "8",
    name: "Claude Sonnet 3.5",
    description:
      "Обновленная версия Claude Sonnet с улучшенными возможностями. Идеальна для решения сложных задач и аналитики.",
    type: "Облачные модели",
    strengths:
      "Улучшенное понимание контекста, творческие задачи, аналитика, многоязычность",
    inputPricePerThousandTokens: 0.16,
    outputPricePerThousandTokens: 8.2,
    category: "cloud",
  },
  {
    id: "9",
    name: "Gemini 1.5 Flash",
    description:
      "Быстрая модель от Google для оперативных задач. Идеальна для эффективного решения широкого спектра задач.",
    type: "Облачные модели",
    strengths:
      "Скорость обработки, эффективность, широкий спектр применений, многоязычность",
    inputPricePerThousandTokens: 0.38,
    outputPricePerThousandTokens: 1.6,
    category: "cloud",
  },
  {
    id: "10",
    name: "Gemini 1.5 Pro",
    description:
      "Продвинутая модель от Google для сложных задач. Идеальна для глубокого анализа и многозадачности.",
    type: "Облачные модели",
    strengths: "Глубокий анализ, сложные вычисления, многозадачность, многоязычность",
    inputPricePerThousandTokens: 3.8,
    outputPricePerThousandTokens: 11.5,
    category: "cloud",
  },
  {
    id: "11",
    name: "Yandex YaGPT-2 (Lite)",
    description:
      "Легкая модель от Яндекс для русскоязычных задач. Идеальна для эффективного решения базовых задач на русском языке.",
    type: "Облачные модели",
    strengths: "Русский язык, быстрые ответы, базовые задачи",
    inputPricePerThousandTokens: 0.88,
    outputPricePerThousandTokens: 1.32,
    category: "cloud",
  },
  {
    id: "12",
    name: "Yandex YaGPT-3 (Pro)",
    description:
      "Продвинутая модель от Яндекс для сложных русскоязычных задач. Идеальна для глубокого понимания русского языка и аналитики.",
    type: "Облачные модели",
    strengths: "Глубокое понимание русского языка, сложные задачи, аналитика",
    inputPricePerThousandTokens: 10.1,
    outputPricePerThousandTokens: 17.2,
    category: "cloud",
  },
  {
    id: "13",
    name: "Meta LLaMA-3.1 (8b)",
    description:
      "Легкая модель LLaMA от Meta для локального использования. Идеальна для эффективного решения базовых задач.",
    type: "Контурные модели",
    strengths: "Быстрые ответы, эффективность, базовые задачи",
    inputPricePerThousandTokens: 0.05,
    outputPricePerThousandTokens: 0.27,
    category: "local",
  },
  {
    id: "14",
    name: "Meta LLaMA-3.1 (70b)",
    description:
      "Средняя модель LLaMA от Meta для локального использования. Идеальна для баланса производительности и ресурсов.",
    type: "Контурные модели",
    strengths: "Баланс производительности и ресурсов, широкий спектр задач",
    inputPricePerThousandTokens: 0.71,
    outputPricePerThousandTokens: 3,
    category: "local",
  },
  {
    id: "15",
    name: "Meta LLaMA-3.1 (405b)",
    description:
      "Крупнейшая модель LLaMA от Meta для локального использования. Идеальна для высокой точности и сложных задач.",
    type: "Контурные модели",
    strengths: "Высокая точность, сложные задачи, глубокий анализ",
    inputPricePerThousandTokens: 3.1,
    outputPricePerThousandTokens: 5.2,
    category: "local",
  },
  {
    id: "16",
    name: "Mixtral 8x7B",
    description:
      "Модель Mixtral для локального использования с 8 экспертами по 7B параметров. Идеальна для многозадачности и широкого спектра применений.",
    type: "Контурные модели",
    strengths: "Многозадачность, эффективность, широкий спектр применений",
    inputPricePerThousandTokens: 0.66,
    outputPricePerThousandTokens: 0.99,
    category: "local",
  },
  {
    id: "17",
    name: "Mixtral 8x22B",
    description:
      "Улучшенная модель Mixtral для локального использования с 8 экспертами по 22B параметров. Идеальна для высокой точности и сложных задач.",
    type: "Контурные модели",
    strengths: "Высокая точность, сложные задачи, глубокий анализ",
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
