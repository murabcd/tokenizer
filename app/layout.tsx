import type { Metadata } from "next";

import "./globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Flomni AI калькулятор",
  description: "Рассчитайте количество токенов и стоимость использования AI моделей",
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
