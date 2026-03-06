"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Mail } from "lucide-react";

const roles = [
  "Senior-Focused AI/ML Engineer",
  "Product-Oriented Full-Stack Developer",
  "Performance-Driven Problem Solver",
  "Systems Thinking Builder",
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
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 pt-32 pb-24 md:px-12 lg:px-16">
      <GeoShapes />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="flex flex-col items-center gap-8">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/[0.06] px-6 py-3 text-sm font-semibold tracking-wide text-blue-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" style={{ animation: "pulse-ring 1.5s ease-out infinite" }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
            </span>
            Open to Senior Engineering Roles
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[4rem] font-extrabold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl lg:text-[6.5rem]">
              <span className="text-white">Aditya</span>{" "}
              <span className="text-gradient block sm:inline">Raj</span>
            </h1>
          </motion.div>

          {/* Rotating role */}
          <div className="h-12 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIdx}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center gap-4"
              >
                <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-cyan-500 sm:block" />
                <p className="font-mono text-base text-cyan-300 md:text-xl font-medium tracking-wide">
                  {roles[roleIdx]}
                </p>
                <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-cyan-500 sm:block" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mx-auto max-w-2xl text-[1.05rem] leading-[1.9] text-slate-400 md:text-lg"
          >
            I design and ship production-grade systems across AI/ML and modern
            web stacks. My focus is high-impact engineering — fast iteration,
            reliable architecture, and measurable outcomes from day one.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-4 flex flex-wrap justify-center items-center gap-6"
          >
            <a
              href="https://github.com/Aditgm"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 whitespace-nowrap rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-5 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/30"
            >
              View Projects
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 whitespace-nowrap rounded-xl border border-white/[0.12] bg-white/[0.06] px-10 py-5 text-base font-bold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.25] hover:bg-white/[0.1] hover:text-white hover:shadow-lg hover:shadow-white/[0.05]"
            >
              Get in Touch
              <Mail size={18} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[0.9rem] font-medium text-slate-500"
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

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-slate-500">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-slate-700 pt-2"
        >
          <div className="h-2 w-1 rounded-full bg-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
