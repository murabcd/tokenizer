"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { aiModels, estimateTokens, calculatePrice } from "./config/ai-models";

const formSchema = z.object({
  text: z.string().min(1, { message: "Текстовое поле не может быть пустым" }),
  model: z.string(),
});

export default function Home() {
  const [tokenCount, setTokenCount] = useState(0);
  const [inputPrice, setInputPrice] = useState(0);
  const [outputPrice, setOutputPrice] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      model: aiModels[0].name,
    },
  });

  const calculateTokens = (values: z.infer<typeof formSchema>) => {
    const selectedModel =
      aiModels.find((model) => model.name === values.model) || aiModels[0];
    const estimatedTokens = estimateTokens(values.text);
    setTokenCount(estimatedTokens);

    const calculatedInputPrice = calculatePrice(
      estimatedTokens,
      selectedModel.inputPricePerThousandTokens
    );
    const calculatedOutputPrice = calculatePrice(
      estimatedTokens,
      selectedModel.outputPricePerThousandTokens
    );

    setInputPrice(Number(calculatedInputPrice.toFixed(2)));
    setOutputPrice(Number(calculatedOutputPrice.toFixed(2)));
  };

  const totalPrice = Number((inputPrice + outputPrice).toFixed(2));

  const handleReset = () => {
    form.reset({ text: "", model: aiModels[0].name });
    setTokenCount(0);
    setInputPrice(0);
    setOutputPrice(0);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-2">Flomni AI</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Калькулятор стоимости AI-моделей.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(calculateTokens)}
          className="w-full max-w-2xl space-y-4"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Введите ваш текст</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Введите ваш текст здесь..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Выберите модель</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите модель" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {aiModels.map((model) => (
                      <SelectItem key={model.name} value={model.name}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex-1"
            >
              Сбросить
            </Button>
            <Button type="submit" className="flex-1">
              Рассчитать
            </Button>
          </div>
        </form>
      </Form>

      {tokenCount > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded w-full max-w-2xl">
          <p>Примерное количество токенов: {tokenCount.toLocaleString()}</p>
          <p>Примерная цена входных данных: {inputPrice.toFixed(2)} ₽</p>
          <p>Примерная цена выходных данных: {outputPrice.toFixed(2)} ₽</p>
          <p>Общая примерная цена: {totalPrice} ₽</p>
        </div>
      )}
    </main>
  );
}
