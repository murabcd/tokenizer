"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { APIModel } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface ModelSelectorProps {
	onModelChange: (model: APIModel) => void;
}

export function ModelSelector({ onModelChange }: ModelSelectorProps) {
	const [open, setOpen] = React.useState(false);
	const [selectedModel, setSelectedModel] = React.useState<APIModel | null>(
		null,
	);
	const [models, setModels] = React.useState<APIModel[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	// Store onModelChange in a ref to avoid infinite re-renders
	const onModelChangeRef = React.useRef(onModelChange);
	onModelChangeRef.current = onModelChange;

	// Fetch models from API
	React.useEffect(() => {
		const fetchModels = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/models");
				const result = await response.json();

				if (result.success && result.data) {
					setModels(result.data);
					// Set the first model as default if available
					if (result.data.length > 0) {
						setSelectedModel(result.data[0]);
						onModelChangeRef.current(result.data[0]);
					}
				} else {
					setError("Failed to fetch models");
				}
			} catch (err) {
				setError("Error loading models");
				console.error("Error fetching models:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchModels();
	}, []);

	// Group models by provider
	const groupedModels = React.useMemo(() => {
		const groups: Record<string, APIModel[]> = {};
		models.forEach((model) => {
			if (!groups[model.provider]) {
				groups[model.provider] = [];
			}
			groups[model.provider].push(model);
		});
		return groups;
	}, [models]);

	const handleModelSelect = (model: APIModel) => {
		setSelectedModel(model);
		setOpen(false);
		onModelChangeRef.current(model);
	};

	if (loading) {
		return (
			<div className="flex items-center space-x-2">
				<span className="text-sm font-medium">Model:</span>
				<Button variant="outline" disabled className="justify-between">
					Loading models...
				</Button>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center space-x-2">
				<span className="text-sm font-medium">Model:</span>
				<Button variant="outline" disabled className="justify-between">
					Error loading models
				</Button>
			</div>
		);
	}

	return (
		<div className="flex items-center space-x-2">
			<span className="text-sm font-medium">Model:</span>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						aria-expanded={open}
						aria-label="Select a model"
						className="justify-between"
					>
						{selectedModel ? selectedModel.name : "Select a model..."}
						<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" sideOffset={4} className="w-[400px] p-0">
					<Command loop>
						<CommandList className="h-[var(--cmdk-list-height)] max-h-[300px] overflow-auto">
							<CommandInput placeholder="Search models..." />
							<CommandEmpty>No models found.</CommandEmpty>
							{Object.entries(groupedModels).map(
								([provider, providerModels]) => (
									<CommandGroup key={provider} heading={provider}>
										{providerModels.map((model) => (
											<ModelItem
												key={model.id}
												model={model}
												isSelected={selectedModel?.id === model.id}
												onSelect={() => handleModelSelect(model)}
											/>
										))}
									</CommandGroup>
								),
							)}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}

interface ModelItemProps {
	model: APIModel;
	isSelected: boolean;
	onSelect: () => void;
}

function ModelItem({ model, isSelected, onSelect }: ModelItemProps) {
	const formatCost = (cost?: number) => {
		if (!cost) return "N/A";
		return `$${(cost * 1000).toFixed(2)}/1K tokens`;
	};

	return (
		<HoverCard openDelay={300}>
			<HoverCardTrigger asChild>
				<CommandItem
					key={model.id}
					onSelect={onSelect}
					className="data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
				>
					{model.name}
					<Check
						className={cn(
							"ml-auto h-4 w-4",
							isSelected ? "opacity-100" : "opacity-0",
						)}
					/>
				</CommandItem>
			</HoverCardTrigger>
			<HoverCardContent
				side="left"
				align="start"
				className="w-[300px] text-sm"
				sideOffset={10}
			>
				<div className="grid gap-2">
					<h4 className="font-medium">{model.name}</h4>
					<p className="text-xs text-muted-foreground">
						Provider: {model.provider}
					</p>
					{model.cost && (
						<div className="text-xs">
							<p>Input: {formatCost(model.cost.input)}</p>
							<p>Output: {formatCost(model.cost.output)}</p>
						</div>
					)}
					{model.limit?.context && (
						<p className="text-xs">
							Context: {model.limit.context.toLocaleString()} tokens
						</p>
					)}
					<div className="flex flex-wrap gap-1">
						{model.tool_call && (
							<span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">
								Tool Call
							</span>
						)}
						{model.reasoning && (
							<span className="text-xs bg-green-100 text-green-800 px-1 rounded">
								Reasoning
							</span>
						)}
						{model.attachment && (
							<span className="text-xs bg-purple-100 text-purple-800 px-1 rounded">
								Attachment
							</span>
						)}
						{model.open_weights && (
							<span className="text-xs bg-orange-100 text-orange-800 px-1 rounded">
								Open Weights
							</span>
						)}
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
