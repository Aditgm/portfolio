import type { Metadata } from "next";
import AppShellEffects from "@/components/AppShellEffects";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import { SmoothScrollProvider } from "@/components/SmoothScroll";
import { TransitionProvider } from "@/components/TransitionContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aditya Raj | AI/ML Specialist & Full-Stack Developer",
  metadataBase: new URL("https://adityaraj.dev"),
  description:
    "Portfolio of Aditya Raj, a computer science undergraduate specializing in AI/ML, full-stack development, and competitive programming.",
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
    title: "Aditya Raj | AI/ML Specialist & Full-Stack Developer",
    description:
      "Codeforces Master, LeetCode Guardian, Amazon ML Summer School, MERN Stack, and RAG/LLM projects.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Aditya Raj Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Raj | AI/ML Specialist & Full-Stack Developer",
    description:
      "Codeforces Master, LeetCode Guardian, and Amazon ML Summer School participant.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aditya Raj",
  url: "https://adityaraj.dev",
  image: "/og.png",
  sameAs: [
    "https://github.com/Aditgm",
    "https://leetcode.com/u/adityagm/",
    "https://codeforces.com/profile/aditya2005",
    "https://www.codechef.com/users/adityagm",
  ],
  jobTitle: "Full-Stack Developer & AI Engineer",
  description:
    "Computer Science undergraduate specializing in AI/ML, Full-Stack Development, and Competitive Programming.",
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
      <body data-cursor-theme="dark" className="antialiased noise-bg site-shell">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <ScrollProgress />
        <AppShellEffects />
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
