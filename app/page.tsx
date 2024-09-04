"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";

import * as z from "zod";

import { aiModels, estimateTokens, calculatePrice } from "./config/ai-models";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { ModelSelector } from "@/components/model-selector";

const formSchema = z.object({
  text: z.string().min(1, { message: "Текстовое поле не может быть пустым" }),
  model: z.string(),
});

export default function Home() {
  const [tokenCount, setTokenCount] = useState(0);
  const [inputPrice, setInputPrice] = useState(0);
  const [outputPrice, setOutputPrice] = useState(0);
  const [selectedModel, setSelectedModel] = useState(aiModels[0]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      model: aiModels[0].id,
    },
  });

  const calculateTokens = (values: z.infer<typeof formSchema>) => {
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

  const handleModelChange = (model: (typeof aiModels)[0]) => {
    setSelectedModel(model);
    form.setValue("model", model.id);
    calculateTokens({ ...form.getValues(), model: model.id });
  };

  const totalPrice = Number((inputPrice + outputPrice).toFixed(2));

  const handleReset = () => {
    form.reset({ text: "", model: aiModels[0].id });
    setSelectedModel(aiModels[0]);
    setTokenCount(0);
    setInputPrice(0);
    setOutputPrice(0);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 md:p-24 relative">
      <div className="max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center flex items-center justify-center">
          Flomni AI
          <Badge className="ml-2">Beta</Badge>
        </h1>
        <div className="text-sm text-muted-foreground mb-8 text-center max-w-xl mx-auto">
          <p className="mb-2">Калькулятор стоимости LLM-моделей.</p>
          <p>
            Оцените затраты на использование AI, рассчитайте количество токенов и получите
            детальную разбивку цен для входных и выходных данных.
          </p>
        </div>
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(calculateTokens)} className="space-y-6">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Текст</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Введите ваш текст здесь..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Введите текст для подсчета токенов и расчета стоимости.
                    </FormDescription>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />
              <ModelSelector onModelChange={handleModelChange} />
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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
        </FormProvider>
        {tokenCount > 0 && (
          <div className="text-sm mt-6 p-4 bg-muted rounded-md">
            <p>Выбранная модель: {selectedModel.name}</p>
            <p>Примерное количество токенов: {tokenCount.toLocaleString()}</p>
            <p>Примерная цена входных данных: {inputPrice.toFixed(2)} ₽</p>
            <p>Примерная цена выходных данных: {outputPrice.toFixed(2)} ₽</p>
            <p>Общая примерная цена: {totalPrice} ₽</p>
          </div>
        )}
      </div>
      <div className="absolute bottom-6 right-6 flex items-center">
        <span className="text-xs text-muted-foreground mr-2">Предоставлено</span>
        <Link href="https://flomni.com/ru" target="_blank">
          <Image src="/flomni.svg" alt="Flomni Logo" width={50} height={50} />
        </Link>
      </div>
    </main>
  );
}
