import type { Metadata } from "next";

import "./globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Flomni AI токен калькулятор",
  description: "Рассчитайте количество токенов и стоимость использования AI моделей",
  icons: {
    icon: [
      {
        url: "/flomni.svg",
      },
    ],
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
