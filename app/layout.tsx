import type { Metadata } from "next";
import { Outfit, Fira_Code, Syne } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap", // Prevents FOIT - text shows immediately using fallback font
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap", // Prevents FOIT - text shows immediately using fallback font
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap", // Prevents FOIT - text shows immediately using fallback font
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
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Aditya Raj Portfolio" }],
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
import { SmoothScrollProvider } from "@/components/SmoothScroll";
import AppShellEffects from "@/components/AppShellEffects";
import Preloader from "@/components/Preloader";
import FluidGradientBackground from "@/components/FluidGradientBackground";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

// Person schema for SEO
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aditya Raj",
  url: "https://adityaraj.dev",
  image: "/og.svg",
  sameAs: [
    "https://github.com/Aditgm",
    "https://leetcode.com/u/adityagm/",
    "https://codeforces.com/profile/aditya2005",
    "https://www.codechef.com/users/adityagm",
  ],
  jobTitle: "Full-Stack Developer & AI Engineer",
  description: "Computer Science undergraduate specializing in AI/ML, Full-Stack Development, and Competitive Programming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        data-cursor-theme="dark"
        className={`${outfit.variable} ${firaCode.variable} ${syne.variable} antialiased noise-bg site-shell`}
      >
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Scroll progress indicator */}
        <ScrollProgress />
        
        <FluidGradientBackground />
        <CustomCursor enabled={true} />
        <Preloader />
        <SmoothScrollProvider>
          <TransitionProvider>
            <main id="main-content" className="relative z-10">
              {children}
            </main>
            <AppShellEffects />
          </TransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
