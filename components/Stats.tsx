"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  color: string;
  glowColor: string;
}

const stats: Stat[] = [
  { value: 2000, suffix: "+", label: "Problems Solved", sub: "LeetCode, CF, CSES, HackerRank", color: "text-blue-400", glowColor: "rgba(59,130,246,0.12)" },
  { value: 2360, suffix: "+", label: "LeetCode Rating", sub: "Guardian · Top 0.4% globally", color: "text-amber-400", glowColor: "rgba(245,158,11,0.12)" },
  { value: 2131, suffix: "", label: "Codeforces Rating", sub: "Master · Top 0.8% globally", color: "text-orange-400", glowColor: "rgba(249,115,22,0.12)" },
  { value: 2101, suffix: "", label: "CodeChef Rating", sub: "5★ · Ranked 470th in India", color: "text-green-400", glowColor: "rgba(16,185,129,0.12)" },
];

function Counter({ value, suffix, color, active }: { value: number; suffix: string; color: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = value / 50;
    const id = setInterval(() => {
      cur += step;
      if (cur >= value) { setCount(value); clearInterval(id); }
      else setCount(Math.floor(cur));
    }, 30);
    return () => clearInterval(id);
  }, [active, value]);
  return <span className={`text-3xl font-extrabold tabular-nums md:text-4xl ${color}`}>{count.toLocaleString()}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="section-container geo-divider-top relative">
      {/* Geometric background */}
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-60" />
      <div className="pointer-events-none absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-blue-600/[0.04] blur-[100px]" />

      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p className="section-label mb-4">By the Numbers</p>
          <h2 className="section-title">
            Competitive <span className="text-gradient-static">Programming</span>
          </h2>
          <p className="mt-6 text-sm leading-7 text-slate-400 md:text-base md:leading-8">
            Consistently ranked among the top competitive programmers globally across all major platforms.
          </p>
        </motion.div>

        {/* Stat cards — 4 columns */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
              className="card border-trace group relative overflow-hidden p-10 md:p-12 cursor-default"
              style={{
                ["--hover-glow" as string]: s.glowColor,
              }}
            >
              {/* Shimmer sweep on hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Geometric accent dot */}
              <div className="mb-7 flex items-center gap-2">
                <div className="h-2 w-2 rotate-45 rounded-[2px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 transition-all duration-300 group-hover:from-blue-500/70 group-hover:to-purple-500/70 group-hover:scale-125" />
                <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent transition-all duration-300 group-hover:from-white/[0.16]" />
              </div>

              <Counter value={s.value} suffix={s.suffix} color={s.color} active={inView} />
              <p className="mt-3.5 text-sm font-semibold text-white tracking-wide">{s.label}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500 group-hover:text-slate-400 transition-colors duration-300">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider with label */}
        <div className="mt-16 mb-10 flex items-center gap-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Contest Highlights
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>

        {/* Contest highlights */}
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {[
            { rank: "#169", contest: "LeetCode Weekly Contest 462", detail: "Ranked 169 / 30,000+", pct: "Top 0.005%", accent: "text-amber-300", bg: "from-amber-500/15 to-amber-500/5", borderAccent: "border-amber-500/10 hover:border-amber-500/30", glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]" },
            { rank: "#45", contest: "Codeforces Round 1068, Div. 2", detail: "Ranked 45 / 20,000+", pct: "Top 0.003%", accent: "text-orange-300", bg: "from-orange-500/15 to-orange-500/5", borderAccent: "border-orange-500/10 hover:border-orange-500/30", glow: "group-hover:shadow-[0_0_40px_rgba(249,115,22,0.08)]" },
          ].map((c, i) => (
            <motion.div
              key={c.rank}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.22, ease: "easeOut" } }}
              className={`card group relative overflow-hidden flex items-start gap-8 p-10 md:p-12 transition-shadow duration-500 ${c.borderAccent} ${c.glow}`}
            >
              {/* Shimmer */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Rank badge — diamond shaped */}
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                <div className={`absolute inset-0 rotate-45 rounded-xl bg-gradient-to-br ${c.bg} transition-all duration-400 group-hover:scale-115 group-hover:rotate-[50deg]`} />
                <span className={`relative z-10 text-sm font-bold ${c.accent}`}>{c.rank}</span>
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-white tracking-wide">{c.contest}</p>
                <p className="mt-2 text-xs leading-6 text-slate-400">
                  {c.detail} — <span className={`font-bold ${c.accent}`}>{c.pct}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
