import fs from "node:fs";
import path from "node:path";

const encoderPath = path.join(
	process.cwd(),
	"node_modules",
	"gpt-3-encoder",
	"encoder.json",
);

let encoder: Record<string, number> = {};

try {
	const encoderData = fs.readFileSync(encoderPath, "utf8");
	encoder = JSON.parse(encoderData);
} catch (error) {
	console.error("Failed to load encoder files:", error);
}

export function encode(text: string): number[] {
	if (!encoder || Object.keys(encoder).length === 0) {
		throw new Error("Encoder not initialized");
	}

	const tokens: number[] = [];
	let currentText = text;

	while (currentText.length > 0) {
		let found = false;

		for (let i = currentText.length; i > 0; i--) {
			const substring = currentText.slice(0, i);
			if (encoder[substring] !== undefined) {
				tokens.push(encoder[substring]);
				currentText = currentText.slice(i);
				found = true;
				break;
			}
		}

		if (!found) {
			const char = currentText[0];

			if (char === " ") {
				const spaceToken = encoder["\u0120"];
				if (spaceToken !== undefined) {
					tokens.push(spaceToken);
				} else {
					tokens.push(encoder["<|endoftext|>"] || 50256);
				}
			} else if (encoder[char] !== undefined) {
				tokens.push(encoder[char]);
			} else {
				const charCode = char.charCodeAt(0);
				if (charCode < 128) {
					const fallbackToken = encoder["<|endoftext|>"] || 50256;
					tokens.push(fallbackToken);
				} else {
					tokens.push(encoder["<|endoftext|>"] || 50256);
				}
			}
			currentText = currentText.slice(1);
		}
	}

	return tokens;
}

export function decode(tokens: number[]): string {
	if (!encoder || Object.keys(encoder).length === 0) {
		throw new Error("Encoder not initialized");
	}

	const reverseEncoder: Record<number, string> = {};
	for (const [key, value] of Object.entries(encoder)) {
		reverseEncoder[value] = key;
	}

	return tokens.map((token) => reverseEncoder[token] || "").join("");
}
