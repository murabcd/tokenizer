"use client";

import { useState, useCallback } from "react";
import { estimateTokens, estimateTokensSync } from "@/lib/tokenizer";
import type { APIModel } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ModelSelector } from "@/components/model-selector";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
	const [text, setText] = useState("");
	const [tokenCount, setTokenCount] = useState(0);
	const [characterCount, setCharacterCount] = useState(0);
	const [selectedModel, setSelectedModel] = useState<APIModel | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const updateTokenCount = useCallback(async (newText: string) => {
		// Immediately show estimated count for better UX
		const estimatedTokens = estimateTokensSync(newText);
		setTokenCount(estimatedTokens);

		// Then calculate accurate count if encoder is available
		setIsLoading(true);
		try {
			const accurateTokens = await estimateTokens(newText);
			setTokenCount(accurateTokens);
		} catch (error) {
			console.warn("Failed to get accurate token count:", error);
			// Keep the estimated count
		} finally {
			setIsLoading(false);
		}
	}, []);

	const handleTextChange = (newText: string) => {
		setText(newText);
		setCharacterCount(newText.length);
		updateTokenCount(newText);
	};

	const handleModelChange = (model: APIModel) => {
		setSelectedModel(model);
		// Recalculate tokens when model changes
		updateTokenCount(text);
	};

	const clearText = () => {
		setText("");
		setTokenCount(0);
		setCharacterCount(0);
	};

	const showExample = () => {
		const exampleText = `Many words map to one token, but some don't: indivisible.

Unicode characters like emojis may be split into many tokens containing the underlying bytes: 🤚🏾

Sequences of characters commonly found next to each other may be grouped together: 1234567890`;
		setText(exampleText);
		setCharacterCount(exampleText.length);
		updateTokenCount(exampleText);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-8 md:p-16 relative">
			<div className="max-w-3xl w-full">
				{/* Header */}
				<div className="mb-6 flex justify-between items-start">
					<div>
						<h1 className="text-2xl sm:text-3xl font-bold mb-3">Tokenizer</h1>
						<p className="text-base text-muted-foreground">
							Learn about language model tokenization.
						</p>
					</div>
					<ModeToggle />
				</div>

				{/* Introduction */}
				<div className="mb-6 space-y-3 text-sm leading-relaxed">
					<p>
						Large language models process text using <strong>tokens</strong>,
						which are common sequences of characters found in a set of text. The
						models learn to understand the statistical relationships between
						these tokens, and excel at producing the next token in a sequence of
						tokens.
					</p>
					<p>
						You can use the tool below to understand how a piece of text might
						be tokenized by a language model, and see the total count of tokens
						and estimated costs.
					</p>
				</div>

				{/* Tokenization Tool */}
				<div className="space-y-4">
					{/* Text Input */}
					<div className="space-y-2">
						<ModelSelector onModelChange={handleModelChange} />
						<Textarea
							id="text-input"
							value={text}
							onChange={(e) => handleTextChange(e.target.value)}
							placeholder="Enter your text here..."
							className="min-h-[250px] resize-none text-sm leading-relaxed"
						/>
					</div>

					{/* Control Buttons */}
					<div className="flex space-x-3">
						<Button variant="outline" size="sm" onClick={clearText}>
							Clear
						</Button>
						<Button variant="outline" size="sm" onClick={showExample}>
							Show example
						</Button>
					</div>

					{/* Token and Character Counts */}
					<div className="space-y-2">
						<Label>Results</Label>
						<div className="flex space-x-6 text-sm">
							<div>
								<span className="font-medium">Tokens:</span>{" "}
								<span className="tabular-nums">
									{tokenCount.toLocaleString()}
								</span>
								{isLoading && (
									<span className="text-xs text-muted-foreground ml-1">
										(updating...)
									</span>
								)}
							</div>
							<div>
								<span className="font-medium">Characters:</span>{" "}
								<span className="tabular-nums">
									{characterCount.toLocaleString()}
								</span>
							</div>
							{selectedModel?.cost && (
								<>
									<div>
										<span className="font-medium">Input:</span>{" "}
										<span className="tabular-nums">
											$
											{(
												(tokenCount / 1_000_000) *
												selectedModel.cost.input
											).toFixed(6)}
										</span>
									</div>
									<div>
										<span className="font-medium">Output:</span>{" "}
										<span className="tabular-nums">
											$
											{(
												(tokenCount / 1_000_000) *
												selectedModel.cost.output
											).toFixed(6)}
										</span>
									</div>
									<div>
										<span className="font-medium">Total:</span>{" "}
										<span className="tabular-nums">
											$
											{(
												(tokenCount / 1_000_000) * selectedModel.cost.input +
												(tokenCount / 1_000_000) * selectedModel.cost.output
											).toFixed(6)}
										</span>
									</div>
								</>
							)}
						</div>
					</div>

					{/* Model Capabilities */}
					{selectedModel && (
						<div className="space-y-2">
							<div className="flex flex-wrap gap-1">
								{selectedModel.tool_call && (
									<span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
										Tool Call
									</span>
								)}
								{selectedModel.reasoning && (
									<span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">
										Reasoning
									</span>
								)}
								{selectedModel.attachment && (
									<span className="text-xs bg-purple-100 text-purple-800 px-1 py-0.5 rounded">
										Attachment
									</span>
								)}
								{selectedModel.open_weights && (
									<span className="text-xs bg-orange-100 text-orange-800 px-1 py-0.5 rounded">
										Open Weights
									</span>
								)}
							</div>
						</div>
					)}
				</div>

				{/* Additional Information */}
				<div className="mt-8 space-y-3 text-sm leading-relaxed">
					<p>
						<strong>Helpful rule of thumb:</strong> one token generally
						corresponds to ~4 characters of text for common English text. This
						translates to roughly ¾ of a word (so 100 tokens ~= 75 words).
					</p>
				</div>
			</div>
		</main>
	);
}
