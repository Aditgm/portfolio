"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Mail, Brain, Code2, MapPin, Zap } from "lucide-react";

const achievements = [
  "Top 0.4% on LeetCode · Guardian",
  "Codeforces Master · Ranked 56 in India",
  "CodeChef · Ranked 379 in India",
];

/* Floating geometric shapes */
function GeoShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large rotating hexagon */}
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-[0.03]"
        style={{ animation: "geo-rotate 60s linear infinite" }}
      >
        <svg viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 185,55 185,145 100,190 15,145 15,55" stroke="currentColor" strokeWidth="0.5" className="text-blue-400" />
          <polygon points="100,30 165,65 165,135 100,170 35,135 35,65" stroke="currentColor" strokeWidth="0.3" className="text-cyan-400" />
        </svg>
      </div>

      {/* Orbiting diamond */}
      <div
        className="absolute left-[15%] top-[25%] h-20 w-20 opacity-[0.06]"
        style={{ animation: "float-slow 14s ease-in-out infinite" }}
      >
        <div className="h-full w-full rotate-45 rounded-sm border border-blue-500/40 bg-blue-500/5" />
      </div>

      {/* Floating circle */}
      <div
        className="absolute right-[15%] bottom-[20%] h-32 w-32 opacity-[0.04]"
        style={{ animation: "float 10s ease-in-out infinite 2s" }}
      >
        <div className="h-full w-full rounded-full border border-purple-500/40" />
      </div>

      {/* Grid lines accent */}
      <div className="absolute left-0 top-0 h-full w-full opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.07] blur-[150px]"
        style={{ animation: "float 9s ease-in-out infinite" }}
      />
      <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-purple-600/[0.05] blur-[120px]"
        style={{ animation: "float 11s ease-in-out infinite 1s" }}
      />
    </div>
  );
}

export default function Hero() {
  const [achievementIdx, setAchievementIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAchievementIdx((i) => (i + 1) % achievements.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 pt-32 pb-24 md:px-12 lg:px-16">
      <GeoShapes />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="flex flex-col items-center gap-10">
          {/* Status badge */}
          <motion.a
            href="mailto:arajsinha4@gmail.com"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex cursor-pointer hover:bg-blue-500/[0.1] transition-colors duration-300 items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/[0.06] px-6 py-3 text-sm font-semibold tracking-wide text-blue-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" style={{ animation: "pulse-ring 1.5s ease-out infinite" }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
            </span>
            Open to SDE Internships &amp; New Grad Roles
          </motion.a>

          {/* Name and Titles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="text-[4rem] font-extrabold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl lg:text-[6.5rem]">
              <span className="text-white">Aditya</span>{" "}
              <span className="text-gradient block sm:inline">Raj</span>
            </h1>

            <div className="flex flex-col items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Full-Stack Developer & AI Engineer
              </h2>

              <div className="mt-1 h-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={achievementIdx}
                    initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -15, filter: "blur(3px)" }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-medium text-cyan-300"
                  >
                    <span className="hidden h-px w-8 bg-gradient-to-r from-transparent to-cyan-500 sm:block" />
                    <span className="text-center">{achievements[achievementIdx]}</span>
                    <span className="hidden h-px w-8 bg-gradient-to-l from-transparent to-cyan-500 sm:block" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="mt-3 text-lg sm:text-xl font-medium text-slate-300 italic">
                &quot;Building AI-powered products that ship.&quot;
              </p>
            </div>
          </motion.div>

          {/* Bio Bento Box */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mx-auto mt-12 grid max-w-5xl gap-y-6 gap-x-6 text-left md:gap-y-8 md:gap-x-10 sm:grid-cols-2 md:grid-cols-3"
          >
            {/* Card 1: Identity & Domains */}
            <div className="card-geo-accent group relative flex flex-col justify-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 transition-all hover:bg-white/[0.04] sm:col-span-2 md:col-span-2">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="mb-4 flex items-center gap-3 text-xl font-semibold text-white">
                <Brain className="text-blue-400" size={24} /> Product & AI
              </h3>
              <p className="text-base leading-[1.8] text-slate-400">
                Top <strong className="font-medium text-slate-200">0.4% competitive programmer</strong> on LeetCode who builds AI products that solve real problems. I&apos;m drawn to challenges at the intersection of <strong className="font-medium text-slate-200">LLMs, RAG systems</strong>, and domains that matter &mdash; healthcare, law, and finance &mdash; where good engineering can genuinely change outcomes.
              </p>
            </div>

            {/* Card 2: Philosophy */}
            <div className="card-geo-accent group relative flex flex-col justify-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 transition-all hover:bg-white/[0.04]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="mb-4 flex items-center gap-3 text-xl font-semibold text-white">
                <Zap className="text-cyan-400" size={24} /> Philosophy
              </h3>
              <p className="text-base leading-[1.8] text-slate-400">
                I approach every project the way I approach competitive programming &mdash; find the <strong className="font-medium text-slate-200">most elegant solution</strong>, then make it fast.
              </p>
            </div>

            {/* Card 3: Current Focus */}
            <div className="card-geo-accent group relative flex flex-col justify-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 transition-all hover:bg-white/[0.04] sm:col-span-2 md:col-span-3">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="mb-4 flex items-center gap-3 text-xl font-semibold text-white">
                <Code2 className="text-purple-400" size={24} /> Current Focus
              </h3>
              <p className="text-base leading-[1.8] text-slate-400">
                Currently exploring <strong className="font-medium text-slate-200">LangChain and Azure</strong>, contributing to open source, and building something new. Fuelled by algorithms and late-night problem sets.
              </p>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-8 flex flex-wrap justify-center items-center gap-7"
          >
            <a
              href="https://github.com/Aditgm"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-5 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/40"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ animation: "shimmer 2s infinite" }} />
              <span className="relative flex items-center gap-3">
                View Projects
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-sm px-10 py-5 text-base font-bold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-white/[0.25] hover:bg-white/[0.1] hover:text-white hover:shadow-lg hover:shadow-white/[0.05]"
            >
              <span className="relative flex items-center gap-3">
                Get in Touch
                <Mail size={18} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-[0.9rem] font-medium text-slate-500"
          >
            <a href="https://github.com/Aditgm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-all duration-300 hover:text-white">
              <Github size={18} /> GitHub
            </a>
            <span className="hidden h-4 w-px bg-slate-700 sm:block" />
            <a href="https://leetcode.com/u/adityagm/" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:text-amber-300">LeetCode</a>
            <span className="hidden h-4 w-px bg-slate-700 sm:block" />
            <a href="https://codeforces.com/profile/aditya2005" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:text-orange-300">Codeforces</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
