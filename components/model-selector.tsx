"use client";

import * as React from "react";

import { useForm } from "react-hook-form";

import { ChevronDown, Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { aiModels } from "@/app/config/ai-models";

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
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ModelSelectorProps {
  onModelChange: (model: (typeof aiModels)[0]) => void;
}

export function ModelSelector({ onModelChange }: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState(aiModels[0]);

  const form = useForm({
    defaultValues: {
      model: aiModels[0].id,
    },
  });

  const cloudModels = aiModels.filter((model) => model.category === "cloud");
  const localModels = aiModels.filter((model) => model.category === "local");

  const handleModelSelect = (model: (typeof aiModels)[0]) => {
    setSelectedModel(model);
    setOpen(false);
    form.setValue("model", model.id);
    onModelChange(model); // Pass the entire model object
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="model">Model</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="model"
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-label="Select a model"
                  className="w-full justify-between"
                  {...field}
                >
                  {selectedModel ? selectedModel.name : "Select a model..."}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                sideOffset={4}
                className="sm:w-[580px] w-[420px] p-0"
              >
                <Command loop>
                  <CommandList className="h-[var(--cmdk-list-height)] max-h-[300px] overflow-auto">
                    <CommandInput placeholder="Search models..." />
                    <CommandEmpty>No models found.</CommandEmpty>
                    <CommandGroup heading="Closed-source Models">
                      {cloudModels.map((model) => (
                        <ModelItem
                          key={model.id}
                          model={model}
                          isSelected={selectedModel?.id === model.id}
                          onSelect={() => handleModelSelect(model)}
                        />
                      ))}
                    </CommandGroup>
                    <CommandGroup heading="Open-source Models">
                      {localModels.map((model) => (
                        <ModelItem
                          key={model.id}
                          model={model}
                          isSelected={selectedModel?.id === model.id}
                          onSelect={() => handleModelSelect(model)}
                        />
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>
              Models vary in the price of input and output tokens.
            </FormDescription>
            <FormMessage className="text-sm text-destructive" />
          </FormItem>
        )}
      />
    </Form>
  );
}

interface ModelItemProps {
  model: (typeof aiModels)[0];
  isSelected: boolean;
  onSelect: () => void;
}

function ModelItem({ model, isSelected, onSelect }: ModelItemProps) {
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
            className={cn("ml-auto h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
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
          <p className="text-xs text-muted-foreground">{model.description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
