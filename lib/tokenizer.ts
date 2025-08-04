// Browser-compatible tokenizer functions
// The actual tokenization is handled by the API route

export function estimateTokensSync(text: string): number {
	if (!text.trim()) {
		return 0;
	}

	// Simple estimation for client-side fallback
	// This is a rough approximation - actual tokenization happens on the server
	return Math.ceil(text.length / 4);
}

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
		return estimateTokensSync(text);
	}
}
