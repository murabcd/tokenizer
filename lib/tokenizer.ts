// Client-side tokenization using API route
export async function estimateTokens(text: string): Promise<number> {
	if (!text.trim()) {
		return 0;
	}

	try {
		const response = await fetch("/api/tokenize", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data.tokenCount;
	} catch (error) {
		console.warn("Failed to get accurate token count:", error);
		// Fallback to simple estimation
		return estimateTokensSync(text);
	}
}

export async function encodeText(text: string): Promise<number[]> {
	if (!text.trim()) {
		return [];
	}

	try {
		const response = await fetch("/api/tokenize", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data.tokens;
	} catch (error) {
		console.warn("Failed to encode text:", error);
		return [];
	}
}

export async function decodeTokens(tokens: number[]): Promise<string> {
	if (!tokens.length) {
		return "";
	}

	try {
		const response = await fetch("/api/tokenize", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tokens }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data.decodedText;
	} catch (error) {
		console.warn("Failed to decode tokens:", error);
		return "";
	}
}

export function calculatePrice(
	tokens: number,
	pricePerThousandTokens: number,
): number {
	return (tokens / 1000) * pricePerThousandTokens;
}

// Synchronous fallback for cases where async is not preferred
export function estimateTokensSync(text: string): number {
	// Simple estimation: ~4 characters per token for English text
	return Math.ceil(text.length / 4);
}
