"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Hammer, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Dengue-spot",
    subtitle: "Community Dengue Prevention App",
    desc: [
      { label: "Problem", text: "Mosquito breeding spots go unreported until outbreaks happen, lacking real-time tracking." },
      { label: "Approach", text: "Built a MERN surveillance platform integrating Roboflow CV API for automated detection and Socket.io for live chat." },
      { label: "Result", text: "Enabled fast reporting with enterprise-grade security (RBAC & rate-limiting)." },
    ],
    highlights: [
      "Socket.io bi-directional real-time chat",
      "Roboflow CV API for mosquito detection",
      "RBAC + API rate-limiting + IP banning",
      "OAuth 2.0 secure authentication",
    ],
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Python", "Socket.io", "Roboflow"],
    github: "https://github.com/Aditgm/dengue-spot",
    live: "https://dengue-spot-gi3p.onrender.com/",
    image: "/projects/denguespot.png",
    tag: "Full-Stack + AI/CV",
    tagColor: "border-red-500/20 bg-red-500/[0.07] text-red-400",
    accentGradient: "from-red-500/20 to-orange-500/5",
    slug: "dengue-spot",
    featured: true,
  },
  {
    title: "Legal Lens",
    subtitle: "AI-Powered Legal Help Platform",
    desc: [
      { label: "Problem", text: "Statutory research is slow, tedious, and often inaccessible for everyday users needing legal help." },
      { label: "Approach", text: "Engineered a context-aware RAG pipeline using Llama 3.3 (70B) and Pinecone Vector DB for semantic search over 1,000+ docs." },
      { label: "Result", text: "Achieved 92% retrieval accuracy, sub-150ms query latency, and 85% faster research workflows." },
    ],
    highlights: [
      "RAG pipeline with Llama 3.3 (70B)",
      "85% faster statutory research workflows",
      "Pinecone Vector DB — sub-150ms queries",
      "92% retrieval accuracy across 1,000+ docs",
    ],
    stack: ["Next.js", "Llama 3.3", "Pinecone", "MongoDB"],
    github: "https://github.com/Aditgm/Legal_Lens",
    live: "https://aditgm.github.io/Legal_Lens/",
    image: "/projects/legallens.png",
    tag: "AI/ML + RAG",
    tagColor: "border-purple-500/20 bg-purple-500/[0.07] text-purple-400",
    accentGradient: "from-purple-500/20 to-blue-500/5",
    slug: "legal-lens",
    featured: false,
  },
  {
    title: "YouTubey",
    subtitle: "AI Video Summarizer for Students",
    desc: [
      { label: "Problem", text: "Students spend hours watching long educational videos just to extract key concepts." },
      { label: "Approach", text: "Developed an automated pipeline leveraging Google Gemini API and Node.js to concurrently process YouTube transcripts." },
      { label: "Result", text: "Supported 100+ concurrent connections while achieving a 30% reduction in processing latency." },
    ],
    highlights: [
      "Google Gemini API transcript processing",
      "30% reduction in processing latency",
      "100+ concurrent connections supported",
      "Structured context-rich summaries",
    ],
    stack: ["React.js", "Node.js", "Google Gemini API", "Render"],
    github: "https://github.com/Aditgm/Youtubey",
    live: "https://youtubey-beige.vercel.app/",
    image: "/projects/youtubey.png",
    tag: "AI + Full-Stack",
    tagColor: "border-blue-500/20 bg-blue-500/[0.07] text-blue-400",
    accentGradient: "from-blue-500/20 to-cyan-500/5",
    slug: "youtubey",
    featured: false,
  },
  {
    title: "Indian Economic Dashboard",
    subtitle: "Real-time Financial Analysis Platform",
    desc: [
      { label: "Problem", text: "Financial analysts lack unified, high-performance dashboards for tracking Indian macro indicators." },
      { label: "Approach", text: "Built a comprehensive Streamlit dashboard featuring parallel data fetching to analyze 40+ BSE stocks." },
      { label: "Result", text: "Delivered real-time risk analytics with 73% faster load times." },
    ],
    highlights: [
      "Real-time technical & correlation analysis",
      "Advanced Risk Analytics (VaR, Sharpe Ratio)",
      "40+ BSE stocks with dynamic search",
      "Ultra-fast parallel data fetching architecture",
    ],
    stack: ["Python", "Streamlit", "Plotly", "Pandas", "yFinance API"],
    github: "https://github.com/Aditgm/indian-economic-dashboard",
    live: "https://aditgm-indian-economic-dashboard-app-oxnhak.streamlit.app/",
    image: "/projects/indian-economic-dashboard.png",
    tag: "Data Science & FinTech",
    tagColor: "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-400",
    accentGradient: "from-emerald-500/20 to-teal-500/5",
    slug: "indian-economic-dashboard",
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-container geo-divider-top relative">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-600/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute left-0 top-1/4 h-[300px] w-[300px] rounded-full bg-purple-600/[0.03] blur-[100px]" />

      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-2xl md:mb-16"
        >
          <p className="section-label mb-4">Projects</p>
          <h2 className="section-title">
            Things I&apos;ve <span className="text-gradient-static">Built</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-400 md:text-base md:leading-8">
            Production-grade applications combining AI/ML, real-time systems, and modern full-stack architecture.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`card card-geo-accent border-trace group flex flex-col overflow-hidden ${p.featured ? "md:col-span-2" : ""
                }`}
            >
              {/* Top gradient accent */}
              <div className={`h-px w-full bg-gradient-to-r ${p.accentGradient}`} />

              {/* Project Image */}
              {"image" in p && p.image && (
                <div className="relative h-48 w-full shrink-0 overflow-hidden border-b border-white/[0.04] sm:h-64">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              <div className={`flex flex-1 flex-col ${p.featured ? "md:flex-row" : ""}`}>
                <div className="flex-1 p-10 md:p-14">
                  {/* Top row */}
                  <div className="mb-5 flex items-start justify-between">
                    <span className={`geo-tag ${p.tagColor}`}>
                      <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                      {p.tag}
                    </span>
                    <div className="flex gap-3">
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-slate-500 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white"
                        aria-label="GitHub"
                        title="GitHub Repo"
                      >
                        <Github size={14} />
                      </a>
                      {"live" in p && p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-slate-500 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white"
                          aria-label="Live Demo"
                          title="Live Demo"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {/* Build with me button shifted to top right */}
                      <Link href={`/build/${p.slug}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-slate-500 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white group relative"
                        aria-label="Build with me"
                      >
                        <Hammer size={14} />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 rounded bg-[#050510] border border-white/10 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap z-50">
                          Build with me
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-300">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{p.subtitle}</p>

                  {/* Case Study Description */}
                  <div className="mt-6 flex flex-col gap-3 text-sm leading-[1.6] text-slate-400">
                    {p.desc.map((d, idx) => (
                      <p key={idx}>
                        <strong className="font-semibold text-slate-200">{d.label}:</strong> {d.text}
                      </p>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="mt-10 flex flex-col gap-4">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-slate-400">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] bg-cyan-400/50" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Featured project side accent */}
                {p.featured && (
                  <div className="hidden w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent md:block" />
                )}

                {/* Stats panel for featured */}
                {p.featured && (
                  <div className="flex flex-wrap items-end gap-3 border-t border-white/[0.04] p-6 md:w-64 md:flex-col md:items-start md:justify-center md:border-t-0 md:p-8">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="h-2 w-2 rounded-full bg-green-400/60" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
                      Active Development
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3 w-full">
                      <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 text-center">
                        <p className="text-lg font-bold text-white">7</p>
                        <p className="text-[0.65rem] text-slate-500">Tech Stack</p>
                      </div>
                      <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 text-center">
                        <p className="text-lg font-bold text-white">4</p>
                        <p className="text-[0.65rem] text-slate-500">Key Features</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 border-t border-white/[0.04] px-10 py-12 md:px-14">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[0.8rem] font-medium tracking-wide text-slate-300 transition-all duration-300 hover:border-white/[0.2] hover:text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section >
  );
}
