"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const courses = ["Algorithms", "Data Structures", "Machine Learning", "Deep Learning", "Computer Networks", "DBMS"];

export default function Education() {
  return (
    <section className="section-container geo-divider-top relative">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cyan-600/[0.03] blur-[100px]" />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-16"
        >
          <p className="section-label mb-4">Education</p>
          <h2 className="section-title">
            Academic <span className="text-gradient-static">Background</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="card border-trace group overflow-hidden"
        >
          {/* Top gradient accent */}
          <div className="h-px w-full bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-transparent" />

          <div className="p-8 md:p-10">
            <div className="flex items-start gap-5 md:gap-6">
              {/* Icon with geometric container */}
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                <div className="absolute inset-0 rounded-2xl border border-cyan-500/15 bg-gradient-to-br from-cyan-500/[0.08] to-transparent transition-all duration-300 group-hover:border-cyan-500/25" />
                <div
                  className="absolute inset-0 rounded-2xl border border-cyan-500/10"
                  style={{ animation: "border-dance 6s ease infinite" }}
                />
                <GraduationCap size={24} className="relative text-cyan-400" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">DIT University</h3>
                    <p className="mt-1.5 text-sm text-slate-400">B.Tech in Computer Science &amp; Engineering</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="h-1 w-1 rotate-45 rounded-[1px] bg-cyan-400/60" />
                      <span className="text-xs font-semibold text-cyan-400">AI/ML Specialization</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-slate-500">Apr 2023 – Present</p>

                    {/* GPA badge with geometric styling */}
                    <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-green-500/15 bg-green-500/[0.06] px-4 py-2">
                      <div className="relative h-8 w-8">
                        {/* Circular progress ring SVG */}
                        <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90">
                          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
                          <circle
                            cx="18" cy="18" r="15" fill="none"
                            stroke="url(#gpaGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={`${(8.41 / 10) * 94.25} 94.25`}
                          />
                          <defs>
                            <linearGradient id="gpaGradient" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="text-left">
                        <span className="text-base font-bold text-green-300">8.41</span>
                        <p className="text-[0.6rem] text-slate-500">/ 10.0 GPA</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Courses */}
                <div className="mt-7 border-t border-white/[0.04] pt-6">
                  <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-slate-500">Key Coursework</p>
                  <div className="flex flex-wrap gap-2.5">
                    {courses.map((c, i) => (
                      <motion.span
                        key={c}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-wide text-slate-300 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
                      >
                        {c}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
