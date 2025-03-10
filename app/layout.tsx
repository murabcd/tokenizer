import type { Metadata } from "next";

import "./globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "AI Calculator & Tokenizer",
  description: "Calculate the number of tokens and the cost of using AI models",
  icons: {
    icon: "/flomni.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
