import { type NextRequest, NextResponse } from "next/server";
import { encode, decode } from "@/lib/tokenizer-server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { text, tokens } = body;

		// Handle text encoding
		if (text && typeof text === "string") {
			const encodedTokens = encode(text);
			const decodedText = decode(encodedTokens);

			return NextResponse.json({
				success: true,
				tokens: encodedTokens,
				tokenCount: encodedTokens.length,
				decodedText: decodedText,
				characterCount: text.length,
			});
		}

		// Handle token decoding
		if (tokens && Array.isArray(tokens)) {
			const decodedText = decode(tokens);

			return NextResponse.json({
				success: true,
				decodedText: decodedText,
				tokenCount: tokens.length,
			});
		}

		return NextResponse.json(
			{ error: "Either 'text' (string) or 'tokens' (array) is required" },
			{ status: 400 },
		);
	} catch (error) {
		console.error("Tokenization error:", error);
		return NextResponse.json(
			{ error: "Failed to process tokenization request" },
			{ status: 500 },
		);
	}
}
