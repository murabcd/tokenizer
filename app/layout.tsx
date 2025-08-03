import type { Metadata } from "next";

import "./globals.css";

import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
	title: "Tokenizer",
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
		<html lang="en" suppressHydrationWarning>
			<body className={GeistSans.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
