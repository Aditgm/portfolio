"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  Brain,
  Braces,
  Boxes,
  Bot,
  ChartCandlestick,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  KeyRound,
  Layers3,
  Search,
  ShieldCheck,
  type LucideIcon,
  Server,
  Sparkles,
  Trophy,
  Workflow,
} from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";

type SkillLogo = {
  mark: string;
  label: string;
  tone: string;
};

type SkillMetric = {
  label: string;
  value: number;
  tone: string;
};

type SkillCard = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  iconTone: string;
  accentLine: string;
  shellTone: string;
  layout: string;
  hero?: boolean;
  logos: SkillLogo[];
  metrics: SkillMetric[];
  details: string[];
};

type SkillLogoVisual = {
  glow: string;
  iconClassName?: string;
  imageSrc?: string;
  icon?: LucideIcon;
};

const skillLogoVisuals: Record<string, SkillLogoVisual> = {
  "Next.js": {
    imageSrc: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
    glow: "rgba(255,255,255,0.28)",
  },
  TypeScript: {
    imageSrc: "https://cdn.simpleicons.org/typescript/3178C6",
    glow: "rgba(49,120,198,0.42)",
  },
  Python: {
    imageSrc: "https://cdn.simpleicons.org/python/3776AB",
    glow: "rgba(55,118,171,0.4)",
  },
  OpenAI: {
    imageSrc: "https://cdn.simpleicons.org/openai/FFFFFF",
    glow: "rgba(255,255,255,0.28)",
  },
  RAG: {
    icon: Search,
    glow: "rgba(16,185,129,0.34)",
    iconClassName: "text-emerald-300",
  },
  Llama: {
    icon: Bot,
    glow: "rgba(129,140,248,0.38)",
    iconClassName: "text-indigo-300",
  },
  Gemini: {
    imageSrc: "https://cdn.simpleicons.org/googlegemini/8B5CF6",
    glow: "rgba(139,92,246,0.38)",
  },
  Pinecone: {
    icon: Database,
    glow: "rgba(20,184,166,0.36)",
    iconClassName: "text-teal-300",
  },
  MongoDB: {
    imageSrc: "https://cdn.simpleicons.org/mongodb/47A248",
    glow: "rgba(71,162,72,0.38)",
  },
  "Node.js": {
    imageSrc: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
    glow: "rgba(95,160,78,0.38)",
  },
  Express: {
    imageSrc: "https://cdn.simpleicons.org/express/FFFFFF",
    glow: "rgba(255,255,255,0.22)",
  },
  Azure: {
    imageSrc: "https://cdn.simpleicons.org/microsoftazure/0078D4",
    glow: "rgba(0,120,212,0.38)",
  },
  FastAPI: {
    imageSrc: "https://cdn.simpleicons.org/fastapi/009688",
    glow: "rgba(0,150,136,0.38)",
  },
  Docker: {
    imageSrc: "https://cdn.simpleicons.org/docker/2496ED",
    glow: "rgba(36,150,237,0.38)",
  },
  React: {
    imageSrc: "https://cdn.simpleicons.org/react/61DAFB",
    glow: "rgba(97,218,251,0.4)",
  },
  Tailwind: {
    imageSrc: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    glow: "rgba(6,182,212,0.38)",
  },
  Motion: {
    icon: Sparkles,
    glow: "rgba(45,212,191,0.36)",
    iconClassName: "text-teal-200",
  },
  GSAP: {
    imageSrc: "https://cdn.simpleicons.org/greensock/88CE02",
    glow: "rgba(136,206,2,0.36)",
  },
  Framer: {
    imageSrc: "https://cdn.simpleicons.org/framer/0055FF",
    glow: "rgba(0,85,255,0.34)",
  },
  R3F: {
    icon: Boxes,
    glow: "rgba(125,211,252,0.34)",
    iconClassName: "text-sky-300",
  },
  "Socket.io": {
    imageSrc: "https://cdn.simpleicons.org/socketdotio/FFFFFF",
    glow: "rgba(255,255,255,0.24)",
  },
  RBAC: {
    icon: ShieldCheck,
    glow: "rgba(16,185,129,0.34)",
    iconClassName: "text-emerald-300",
  },
  OAuth: {
    icon: KeyRound,
    glow: "rgba(250,204,21,0.34)",
    iconClassName: "text-amber-300",
  },
  JWT: {
    icon: KeyRound,
    glow: "rgba(59,130,246,0.34)",
    iconClassName: "text-sky-300",
  },
  REST: {
    icon: Workflow,
    glow: "rgba(249,115,22,0.34)",
    iconClassName: "text-orange-300",
  },
  Webhooks: {
    icon: Workflow,
    glow: "rgba(45,212,191,0.34)",
    iconClassName: "text-cyan-300",
  },
  Validation: {
    icon: ShieldCheck,
    glow: "rgba(16,185,129,0.34)",
    iconClassName: "text-emerald-300",
  },
  Pandas: {
    imageSrc: "https://cdn.simpleicons.org/pandas/150458",
    glow: "rgba(99,102,241,0.36)",
  },
  Postgres: {
    imageSrc: "https://cdn.simpleicons.org/postgresql/4169E1",
    glow: "rgba(65,105,225,0.36)",
  },
  Plotly: {
    imageSrc: "https://cdn.simpleicons.org/plotly/3F4F75",
    glow: "rgba(99,102,241,0.34)",
  },
  yFinance: {
    icon: ChartCandlestick,
    glow: "rgba(245,158,11,0.34)",
    iconClassName: "text-amber-300",
  },
  SQL: {
    icon: Database,
    glow: "rgba(148,163,184,0.32)",
    iconClassName: "text-slate-300",
  },
  Indexing: {
    icon: Search,
    glow: "rgba(45,212,191,0.32)",
    iconClassName: "text-cyan-300",
  },
  ETL: {
    icon: Workflow,
    glow: "rgba(251,191,36,0.32)",
    iconClassName: "text-amber-300",
  },
  Telemetry: {
    icon: ChartCandlestick,
    glow: "rgba(96,165,250,0.32)",
    iconClassName: "text-sky-300",
  },
  DSA: {
    icon: Braces,
    glow: "rgba(56,189,248,0.32)",
    iconClassName: "text-sky-300",
  },
  Graphs: {
    icon: GitBranch,
    glow: "rgba(99,102,241,0.32)",
    iconClassName: "text-indigo-300",
  },
  Math: {
    icon: Cpu,
    glow: "rgba(45,212,191,0.3)",
    iconClassName: "text-cyan-300",
  },
  Codeforces: {
    imageSrc: "https://cdn.simpleicons.org/codeforces/1F8ACB",
    glow: "rgba(31,138,203,0.34)",
  },
  LeetCode: {
    imageSrc: "https://cdn.simpleicons.org/leetcode/FFA116",
    glow: "rgba(255,161,22,0.36)",
  },
  CodeChef: {
    imageSrc: "https://cdn.simpleicons.org/codechef/5B4638",
    glow: "rgba(91,70,56,0.34)",
  },
  CSES: {
    icon: Code2,
    glow: "rgba(129,140,248,0.32)",
    iconClassName: "text-indigo-300",
  },
  VJudge: {
    icon: Trophy,
    glow: "rgba(168,85,247,0.32)",
    iconClassName: "text-violet-300",
  },
  GitHub: {
    imageSrc: "https://cdn.simpleicons.org/github/FFFFFF",
    glow: "rgba(255,255,255,0.24)",
  },
  Vercel: {
    imageSrc: "https://cdn.simpleicons.org/vercel/FFFFFF",
    glow: "rgba(255,255,255,0.24)",
  },
  Render: {
    imageSrc: "https://cdn.simpleicons.org/render/46E3B7",
    glow: "rgba(70,227,183,0.34)",
  },
  Streamlit: {
    imageSrc: "https://cdn.simpleicons.org/streamlit/FF4B4B",
    glow: "rgba(255,75,75,0.36)",
  },
  Git: {
    imageSrc: "https://cdn.simpleicons.org/git/F05032",
    glow: "rgba(240,80,50,0.36)",
  },
  "CI/CD": {
    icon: GitBranch,
    glow: "rgba(99,102,241,0.32)",
    iconClassName: "text-indigo-300",
  },
  Testing: {
    icon: Code2,
    glow: "rgba(245,158,11,0.32)",
    iconClassName: "text-amber-300",
  },
  Automation: {
    icon: Cpu,
    glow: "rgba(45,212,191,0.32)",
    iconClassName: "text-teal-300",
  },
  Linux: {
    icon: Server,
    glow: "rgba(148,163,184,0.32)",
    iconClassName: "text-slate-300",
  },
};

const skillCards: SkillCard[] = [
  {
    id: "ai-systems",
    title: "AI Product Systems",
    eyebrow: "Core Stack",
    description:
      "I design full-stack AI workflows that move from retrieval and prompting into interfaces people can actually use.",
    icon: Brain,
    iconTone: "text-indigo-200",
    accentLine: "from-[rgba(99,102,241,0.95)] via-[rgba(124,58,237,0.72)] to-[rgba(45,212,191,0.42)]",
    shellTone:
      "from-[rgba(99,102,241,0.14)] via-[rgba(11,17,32,0.58)] to-[rgba(45,212,191,0.08)]",
    layout: "md:col-span-2 lg:col-span-8 lg:row-span-2",
    hero: true,
    logos: [
      { mark: "NX", label: "Next.js", tone: "from-indigo-500/40 to-indigo-500/10" },
      { mark: "TS", label: "TypeScript", tone: "from-sky-500/35 to-sky-500/10" },
      { mark: "PY", label: "Python", tone: "from-amber-500/35 to-amber-500/10" },
      { mark: "OA", label: "OpenAI", tone: "from-slate-500/35 to-slate-500/10" },
      { mark: "RG", label: "RAG", tone: "from-emerald-500/35 to-emerald-500/10" },
      { mark: "LM", label: "Llama", tone: "from-violet-500/35 to-violet-500/10" },
      { mark: "GM", label: "Gemini", tone: "from-cyan-500/35 to-cyan-500/10" },
      { mark: "PC", label: "Pinecone", tone: "from-fuchsia-500/35 to-fuchsia-500/10" },
      { mark: "DB", label: "MongoDB", tone: "from-emerald-500/35 to-teal-500/10" },
      { mark: "NV", label: "Node.js", tone: "from-lime-500/35 to-lime-500/10" },
      { mark: "EX", label: "Express", tone: "from-slate-500/35 to-slate-500/10" },
      { mark: "AZ", label: "Azure", tone: "from-blue-500/35 to-blue-500/10" },
      { mark: "FA", label: "FastAPI", tone: "from-teal-500/35 to-emerald-500/10" },
      { mark: "DK", label: "Docker", tone: "from-cyan-500/35 to-indigo-500/10" },
    ],
    metrics: [
      { label: "LLM App Architecture", value: 92, tone: "from-indigo-400 to-violet-400" },
      { label: "RAG Pipelines", value: 89, tone: "from-cyan-400 to-teal-400" },
      { label: "API Orchestration", value: 90, tone: "from-emerald-400 to-lime-400" },
    ],
    details: [
      "Builds agentic and retrieval-backed experiences with measurable latency constraints.",
      "Combines product UI, backend wiring, prompt design, and deployment into one shipping loop.",
      "Prefers systems that feel fast, explain themselves clearly, and degrade safely.",
    ],
  },
  {
    id: "frontend-motion",
    title: "Frontend Motion",
    eyebrow: "Interface Layer",
    description:
      "Interactive interfaces with strong type-safety, layered motion, and visual hierarchy that still stay shippable.",
    icon: Sparkles,
    iconTone: "text-teal-200",
    accentLine: "from-[rgba(45,212,191,0.88)] via-[rgba(99,102,241,0.58)] to-transparent",
    shellTone:
      "from-[rgba(45,212,191,0.12)] via-[rgba(11,17,32,0.56)] to-[rgba(99,102,241,0.08)]",
    layout: "lg:col-span-4",
    logos: [
      { mark: "RC", label: "React", tone: "from-cyan-500/35 to-cyan-500/10" },
      { mark: "NX", label: "Next.js", tone: "from-indigo-500/35 to-indigo-500/10" },
      { mark: "TW", label: "Tailwind", tone: "from-teal-500/35 to-teal-500/10" },
      { mark: "MT", label: "Motion", tone: "from-teal-500/35 to-cyan-500/10" },
      { mark: "GS", label: "GSAP", tone: "from-violet-500/35 to-violet-500/10" },
      { mark: "FM", label: "Framer", tone: "from-fuchsia-500/35 to-fuchsia-500/10" },
      { mark: "R3", label: "R3F", tone: "from-sky-500/35 to-sky-500/10" },
      { mark: "GH", label: "GitHub", tone: "from-slate-500/35 to-slate-500/10" },
    ],
    metrics: [
      { label: "Interaction Design", value: 88, tone: "from-teal-400 to-cyan-400" },
      { label: "Responsive UI", value: 91, tone: "from-indigo-400 to-violet-400" },
      { label: "Performance Tuning", value: 84, tone: "from-amber-400 to-orange-400" },
    ],
    details: [
      "Uses GSAP when scroll behavior needs precision rather than generic reveal presets.",
      "Builds interfaces that stay clear on mobile and still feel cinematic on desktop.",
    ],
  },
  {
    id: "backend-systems",
    title: "Backend Systems",
    eyebrow: "Server + APIs",
    description:
      "Production-minded services, auth flows, websockets, and data plumbing built for real traffic instead of demos.",
    icon: Server,
    iconTone: "text-emerald-200",
    accentLine: "from-[rgba(34,197,94,0.85)] via-[rgba(45,212,191,0.5)] to-transparent",
    shellTone:
      "from-[rgba(16,185,129,0.12)] via-[rgba(11,17,32,0.56)] to-[rgba(45,212,191,0.06)]",
    layout: "lg:col-span-4",
    logos: [
      { mark: "ND", label: "Node.js", tone: "from-lime-500/35 to-lime-500/10" },
      { mark: "EX", label: "Express", tone: "from-slate-500/35 to-slate-500/10" },
      { mark: "WS", label: "Socket.io", tone: "from-indigo-500/35 to-indigo-500/10" },
      { mark: "RB", label: "RBAC", tone: "from-emerald-500/35 to-emerald-500/10" },
      { mark: "OA", label: "OAuth", tone: "from-cyan-500/35 to-cyan-500/10" },
      { mark: "JW", label: "JWT", tone: "from-sky-500/35 to-indigo-500/10" },
      { mark: "RT", label: "REST", tone: "from-orange-500/35 to-orange-500/10" },
      { mark: "WH", label: "Webhooks", tone: "from-cyan-500/35 to-teal-500/10" },
      { mark: "VL", label: "Validation", tone: "from-emerald-500/35 to-teal-500/10" },
    ],
    metrics: [
      { label: "API Design", value: 89, tone: "from-emerald-400 to-teal-400" },
      { label: "Realtime Systems", value: 85, tone: "from-cyan-400 to-sky-400" },
      { label: "Security Layers", value: 83, tone: "from-orange-400 to-amber-400" },
    ],
    details: [
      "Comfortable with auth, validation, rate limiting, and event-driven backends.",
      "Optimizes for maintainable endpoints and clean contracts between client and server.",
    ],
  },
  {
    id: "data-retrieval",
    title: "Data + Retrieval",
    eyebrow: "Search + Storage",
    description:
      "Vector search, semantic retrieval, analytics pipelines, and structured data flows that keep results useful under pressure.",
    icon: Database,
    iconTone: "text-violet-200",
    accentLine: "from-[rgba(124,58,237,0.9)] via-[rgba(99,102,241,0.58)] to-transparent",
    shellTone:
      "from-[rgba(124,58,237,0.12)] via-[rgba(11,17,32,0.56)] to-[rgba(99,102,241,0.08)]",
    layout: "lg:col-span-4",
    logos: [
      { mark: "MG", label: "MongoDB", tone: "from-emerald-500/35 to-teal-500/10" },
      { mark: "PN", label: "Pinecone", tone: "from-fuchsia-500/35 to-violet-500/10" },
      { mark: "PG", label: "Postgres", tone: "from-blue-500/35 to-indigo-500/10" },
      { mark: "PD", label: "Pandas", tone: "from-sky-500/35 to-indigo-500/10" },
      { mark: "PL", label: "Plotly", tone: "from-violet-500/35 to-violet-500/10" },
      { mark: "YF", label: "yFinance", tone: "from-amber-500/35 to-orange-500/10" },
      { mark: "SQ", label: "SQL", tone: "from-slate-500/35 to-slate-500/10" },
      { mark: "IX", label: "Indexing", tone: "from-cyan-500/35 to-teal-500/10" },
      { mark: "ET", label: "ETL", tone: "from-amber-500/35 to-orange-500/10" },
      { mark: "TM", label: "Telemetry", tone: "from-sky-500/35 to-blue-500/10" },
    ],
    metrics: [
      { label: "Semantic Retrieval", value: 88, tone: "from-violet-400 to-fuchsia-400" },
      { label: "Data Modeling", value: 84, tone: "from-sky-400 to-indigo-400" },
      { label: "Analytics Dashboards", value: 82, tone: "from-amber-400 to-orange-400" },
    ],
    details: [
      "Balances relevance, latency, and observability when retrieval quality matters.",
      "Enjoys turning raw data into interfaces that show signal without clutter.",
    ],
  },
  {
    id: "systems-thinking",
    title: "Systems Thinking",
    eyebrow: "Problem Solving",
    description:
      "Competitive programming habits show up in architecture: simplify the state space, reduce complexity, then optimize the bottlenecks.",
    icon: Workflow,
    iconTone: "text-sky-200",
    accentLine: "from-[rgba(56,189,248,0.86)] via-[rgba(99,102,241,0.55)] to-transparent",
    shellTone:
      "from-[rgba(56,189,248,0.12)] via-[rgba(11,17,32,0.56)] to-[rgba(99,102,241,0.06)]",
    layout: "lg:col-span-4",
    logos: [
      { mark: "DS", label: "DSA", tone: "from-sky-500/35 to-sky-500/10" },
      { mark: "GR", label: "Graphs", tone: "from-indigo-500/35 to-indigo-500/10" },
      { mark: "MA", label: "Math", tone: "from-cyan-500/35 to-cyan-500/10" },
      { mark: "CF", label: "Codeforces", tone: "from-orange-500/35 to-orange-500/10" },
      { mark: "LC", label: "LeetCode", tone: "from-amber-500/35 to-amber-500/10" },
      { mark: "CC", label: "CodeChef", tone: "from-emerald-500/35 to-emerald-500/10" },
      { mark: "CS", label: "CSES", tone: "from-indigo-500/35 to-indigo-500/10" },
      { mark: "VG", label: "VJudge", tone: "from-violet-500/35 to-violet-500/10" },
    ],
    metrics: [
      { label: "Algorithmic Rigor", value: 95, tone: "from-sky-400 to-cyan-400" },
      { label: "Debugging Speed", value: 91, tone: "from-indigo-400 to-violet-400" },
      { label: "Optimization Mindset", value: 92, tone: "from-amber-400 to-orange-400" },
    ],
    details: [
      "Comfortable reasoning about time complexity, edge cases, and failure paths quickly.",
      "Treats product implementation the same way: prove correctness, then sharpen performance.",
    ],
  },
  {
    id: "shipping-stack",
    title: "Shipping Stack",
    eyebrow: "Toolchain",
    description:
      "The supporting layer that keeps projects moving from local builds to polished deployment and collaboration.",
    icon: Layers3,
    iconTone: "text-amber-200",
    accentLine: "from-[rgba(251,191,36,0.86)] via-[rgba(45,212,191,0.42)] to-transparent",
    shellTone:
      "from-[rgba(251,191,36,0.12)] via-[rgba(11,17,32,0.56)] to-[rgba(45,212,191,0.06)]",
    layout: "lg:col-span-4",
    logos: [
      { mark: "GH", label: "GitHub", tone: "from-slate-500/35 to-slate-500/10" },
      { mark: "VR", label: "Vercel", tone: "from-indigo-500/35 to-indigo-500/10" },
      { mark: "RD", label: "Render", tone: "from-cyan-500/35 to-cyan-500/10" },
      { mark: "CI", label: "CI/CD", tone: "from-indigo-500/35 to-violet-500/10" },
      { mark: "DK", label: "Docker", tone: "from-sky-500/35 to-sky-500/10" },
      { mark: "ST", label: "Streamlit", tone: "from-rose-500/35 to-rose-500/10" },
      { mark: "TS", label: "Testing", tone: "from-amber-500/35 to-orange-500/10" },
      { mark: "AU", label: "Automation", tone: "from-teal-500/35 to-cyan-500/10" },
      { mark: "GT", label: "Git", tone: "from-orange-500/35 to-orange-500/10" },
      { mark: "LX", label: "Linux", tone: "from-slate-500/35 to-slate-500/10" },
    ],
    metrics: [
      { label: "Deployment Flow", value: 86, tone: "from-amber-400 to-orange-400" },
      { label: "Version Control", value: 90, tone: "from-slate-300 to-slate-100" },
      { label: "Tooling Depth", value: 84, tone: "from-cyan-400 to-teal-400" },
    ],
    details: [
      "Keeps the boring parts fast: repo hygiene, deployment confidence, and iteration speed.",
      "Prefers setups that let product ideas ship without dragging developer velocity down.",
    ],
  },
];

const sectionMarks = [
  { icon: Code2, label: "Type-safe builds" },
  { icon: Cpu, label: "AI workflows" },
  { icon: Globe, label: "Product surfaces" },
  { icon: GitBranch, label: "Ship loops" },
  { icon: Braces, label: "Algorithmic rigor" },
];

export default function Skills() {
  const [activeCard, setActiveCard] = useState<string>(skillCards[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardInnerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const logoRefs = useRef<Array<Array<HTMLDivElement | null>>>([]);
  const barRefs = useRef<Array<Array<HTMLDivElement | null>>>([]);
  const { createRevealAnimation, gsap, prefersReducedMotion, withContext } = useGSAP(sectionRef);

  useEffect(() => {
    createRevealAnimation(headerRef, {
      from: { autoAlpha: 0, y: 24, rotateX: 8 },
      to: { autoAlpha: 1, y: 0, rotateX: 0 },
      duration: 0.8,
    });
  }, [createRevealAnimation]);

  useEffect(() => {
    withContext(() => {
      const cards = cardRefs.current.filter((card): card is HTMLDivElement => Boolean(card));
      const innerCards = cardInnerRefs.current.filter(
        (card): card is HTMLDivElement => Boolean(card)
      );

      if (cards.length === 0) {
        return;
      }

      gsap.set(cards, {
        transformPerspective: 1500,
        transformOrigin: "center center",
      });

      cards.forEach((card, index) => {
        const innerCard = innerCards[index];
        const logos = (logoRefs.current[index] ?? []).filter(
          (logo): logo is HTMLDivElement => Boolean(logo)
        );
        const bars = (barRefs.current[index] ?? []).filter(
          (bar): bar is HTMLDivElement => Boolean(bar)
        );

        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            y: 42,
            rotateX: -12,
            rotateY: index % 2 === 0 ? -7 : 7,
            scale: 0.95,
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: prefersReducedMotion ? "top 68%" : "bottom 54%",
              scrub: prefersReducedMotion ? false : 0.55,
              once: prefersReducedMotion,
              invalidateOnRefresh: true,
            },
          }
        );

        if (innerCard) {
          gsap.fromTo(
            innerCard,
            {
              rotateX: index % 2 === 0 ? -2 : 2,
              rotateY: index % 2 === 0 ? 4 : -4,
            },
            {
              rotateX: index % 2 === 0 ? 2 : -2,
              rotateY: index % 2 === 0 ? -3 : 3,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: prefersReducedMotion ? false : 0.85,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (logos.length > 0) {
          gsap.fromTo(
            logos,
            {
              autoAlpha: 0,
              y: 18,
              scale: 0.86,
              rotateZ: (logoIndex: number) => (logoIndex % 2 === 0 ? -4 : 4),
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: 0.82,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                end: prefersReducedMotion ? "top 68%" : "bottom 56%",
                scrub: prefersReducedMotion ? false : 0.45,
                once: prefersReducedMotion,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        bars.forEach((bar, barIndex) => {
          const metric = skillCards[index]?.metrics[barIndex];

          if (!metric) {
            return;
          }

          gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

          gsap.to(bar, {
            scaleX: metric.value / 100,
            duration: prefersReducedMotion ? 0.45 : 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: prefersReducedMotion ? "top 64%" : "bottom 56%",
              scrub: prefersReducedMotion ? false : 0.4,
              once: prefersReducedMotion,
              invalidateOnRefresh: true,
            },
          });
        });
      });
    });
  }, [gsap, prefersReducedMotion, withContext]);

  const toggleCard = (id: string) => {
    setActiveCard((current) => (current === id ? "" : id));
  };

  return (
    <section id="skills" ref={sectionRef} className="section-container geo-divider-top relative">
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[350px] w-[350px] rounded-full bg-cyan-600/[0.03] blur-[100px]" />

      <div className="section-inner">
        <div ref={headerRef} className="mb-14 md:mb-20">
          <p className="section-label mb-5 justify-center md:justify-start">Skills</p>
          <h2 className="section-title text-center md:text-left">
            Technical <span className="text-gradient-static">Toolkit</span>
          </h2>
          <p className="measure-copy mt-6 text-center text-sm leading-7 text-slate-400 md:text-left md:text-base md:leading-8">
            A denser map of the tools, systems, and product instincts I actually reach for
            when building AI-heavy experiences.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            {sectionMarks.map((item) => {
              const Icon = item.icon;

              return (
                <span
                  key={item.label}
                  title={item.label}
                  className="group/mark relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-slate-300 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_12px_28px_-18px_rgba(45,212,191,0.55),0_0_28px_-12px_rgba(99,102,241,0.5)]"
                >
                  <Icon size={14} style={{ color: "var(--secondary-accent)" }} />
                  <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 rounded-full border border-white/[0.08] bg-[#071120]/95 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-slate-200 opacity-0 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.85)] transition-all duration-200 group-hover/mark:translate-y-0 group-hover/mark:opacity-100">
                    {item.label}
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        <div className="grid auto-rows-[minmax(18rem,auto)] gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-7">
          {skillCards.map((card, cardIndex) => {
            const Icon = card.icon;
            const isActive = activeCard === card.id;

            return (
              <div
                key={card.id}
                ref={(element) => {
                  cardRefs.current[cardIndex] = element;
                }}
                className={`h-full [perspective:1500px] ${card.layout}`}
              >
                <div
                  ref={(element) => {
                    cardInnerRefs.current[cardIndex] = element;
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  onClick={() => toggleCard(card.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      toggleCard(card.id);
                    }
                  }}
                  className={`card border-trace group flex h-full cursor-pointer flex-col overflow-hidden bg-gradient-to-br ${card.shellTone} [transform-style:preserve-3d]`}
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${card.accentLine} opacity-90`} />

                  <div className="flex h-full flex-col gap-7 p-8 md:p-9">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#071120]/88">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent" />
                          <Icon className={`relative ${card.iconTone}`} size={22} />
                        </div>

                        <div>
                          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
                            {card.eyebrow}
                          </p>
                          <h3 className="mt-2 text-xl font-bold tracking-tight text-white md:text-[1.38rem]">
                            {card.title}
                          </h3>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                        {isActive ? "Expanded" : "Open"}
                        <ArrowUpRight
                          size={13}
                          className={`transition-transform duration-300 ${isActive ? "rotate-45" : ""}`}
                        />
                      </span>
                    </div>

                    <p className={`${card.hero ? "measure-copy text-base leading-8" : "text-sm leading-7"} text-slate-300`}>
                      {card.description}
                    </p>

                    <div
                      className={`grid gap-3 ${card.hero ? "grid-cols-4 sm:grid-cols-5 xl:grid-cols-7" : "grid-cols-3"}`}
                    >
                      {card.logos.map((logo, logoIndex) => (
                        (() => {
                          const visual = skillLogoVisuals[logo.label];

                          return (
                            <div
                              key={logo.label}
                              ref={(element) => {
                                if (!logoRefs.current[cardIndex]) {
                                  logoRefs.current[cardIndex] = [];
                                }
                                logoRefs.current[cardIndex][logoIndex] = element;
                              }}
                              title={logo.label}
                              aria-label={logo.label}
                              className="skill-logo-card relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#071120]/78"
                              style={
                                {
                                  "--skill-ripple": visual?.glow ?? "rgba(99,102,241,0.32)",
                                } as CSSProperties
                              }
                            >
                              <span className="skill-logo-ripple" aria-hidden="true" />
                              <span className="skill-logo-glow" aria-hidden="true" />
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${logo.tone} opacity-35`}
                              />
                              <div className="relative z-10 flex h-full items-center justify-center p-3">
                                <span className="skill-logo-badge inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.06] text-[0.75rem] font-black tracking-[0.18em] text-white">
                                  {visual?.imageSrc ? (
                                    <Image
                                      src={visual.imageSrc}
                                      alt={`${logo.label} logo`}
                                      width={24}
                                      height={24}
                                      unoptimized
                                      className="h-6 w-6 object-contain"
                                    />
                                  ) : visual?.icon ? (
                                    <visual.icon
                                      size={19}
                                      className={visual.iconClassName ?? "text-white"}
                                    />
                                  ) : (
                                    logo.mark
                                  )}
                                </span>
                                <span className="sr-only">
                                  {logo.label}
                                </span>
                                <span className="skill-logo-tooltip" aria-hidden="true">
                                  {logo.label}
                                </span>
                              </div>
                            </div>
                          );
                        })()
                      ))}
                    </div>

                    <div className="space-y-3.5">
                      {card.metrics.map((metric, metricIndex) => (
                        <div key={metric.label}>
                          <div className="mb-2 flex items-center justify-between gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            <span>{metric.label}</span>
                            <span className="text-slate-300">{metric.value}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                            <div
                              ref={(element) => {
                                if (!barRefs.current[cardIndex]) {
                                  barRefs.current[cardIndex] = [];
                                }
                                barRefs.current[cardIndex][metricIndex] = element;
                              }}
                              className={`h-full rounded-full bg-gradient-to-r ${metric.tone}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      className={`grid transition-all duration-500 ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"}`}
                    >
                      <div className="overflow-hidden">
                        <div className="mt-2 border-t border-white/[0.06] pt-5">
                          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
                            Expanded Focus
                          </p>
                          <ul className="mt-4 grid gap-3">
                            {card.details.map((detail) => (
                              <li key={detail} className="flex gap-3 text-sm leading-7 text-slate-300">
                                <span
                                  className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px]"
                                  style={{ backgroundColor: "rgba(45, 212, 191, 0.58)" }}
                                />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
