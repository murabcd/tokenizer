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