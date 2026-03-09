import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Raj — AI/ML Specialist & Full-Stack Developer",
  description:
    "Portfolio of Aditya Raj — Computer Science undergraduate specializing in AI/ML, Full-Stack Development, and Competitive Programming. Codeforces Master (2131), LeetCode Guardian (2360+, Top 0.4%), Amazon ML Summer School.",
  keywords: [
    "Aditya Raj",
    "AI ML Developer",
    "Full Stack Developer",
    "Competitive Programmer",
    "Codeforces Master",
    "LeetCode Guardian",
    "Next.js",
    "React",
    "Machine Learning",
  ],
  authors: [{ name: "Aditya Raj", url: "https://github.com/aditya-raj" }],
  openGraph: {
    title: "Aditya Raj — AI/ML Specialist & Full-Stack Developer",
    description:
      "Codeforces Master · LeetCode Guardian (Top 0.4%) · Amazon ML Summer School · MERN Stack · RAG/LLM",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Raj — AI/ML Specialist & Full-Stack Developer",
    description:
      "Codeforces Master · LeetCode Guardian (Top 0.4%) · Amazon ML Summer School",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { TransitionProvider } from "@/components/TransitionContext";
import { LiquidOverlay } from "@/components/LiquidOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${firaCode.variable} antialiased noise-bg`}
      >
        <TransitionProvider>
          {children}
          <LiquidOverlay />
        </TransitionProvider>
      </body>
    </html>
  );
}
