"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Machine Learning Research Mentee",
    company: "Amazon ML Summer School",
    period: "Aug 2025 – Sep 2025",
    badge: "< 5% acceptance",
    badgeColor: "border-orange-500/20 bg-orange-500/[0.07] text-orange-400",
    accentColor: "from-orange-500 to-amber-500",
    bullets: [
      "Selected as one of ~3,000 participants globally out of 60,000+ applicants (acceptance rate < 5%).",
      "Studied ML fundamentals, neural networks, and practical applications through a curriculum designed by Amazon scientists.",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code (GSSOC)",
    period: "Jun 2025 – Sep 2025",
    badge: "Open Source",
    badgeColor: "border-green-500/20 bg-green-500/[0.07] text-green-400",
    accentColor: "from-green-500 to-emerald-500",
    bullets: [
      "Contributed to open-source AI projects, gaining experience with collaborative development practices and code review workflows.",
      "Developed web application features using Node.js and Python to improve user experience and performance.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-container geo-divider-top relative">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[300px] -translate-y-1/2 rounded-full bg-purple-600/[0.03] blur-[100px]" />

      <div className="section-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-16"
        >
          <p className="section-label mb-4">Experience</p>
          <h2 className="section-title">
            Where I&apos;ve <span className="text-gradient-static">Worked</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative ml-3 pl-8 md:ml-0 md:pl-12">
          {/* Timeline line with gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Diamond timeline marker */}
                <div className="absolute -left-[calc(2rem+6px)] top-6 md:-left-[calc(3rem+6px)]">
                  <div className={`h-3 w-3 rotate-45 rounded-[2px] bg-gradient-to-br ${exp.accentColor} shadow-lg`} />
                  <div className={`absolute inset-0 h-3 w-3 rotate-45 rounded-[2px] bg-gradient-to-br ${exp.accentColor} opacity-40`} style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                </div>

                {/* Card */}
                <div className="card card-geo-accent border-trace group overflow-hidden">
                  {/* Gradient top accent */}
                  <div className={`h-px w-full bg-gradient-to-r ${exp.accentColor} opacity-30`} />

                  <div className="p-8 md:p-10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-blue-300">
                          {exp.role}
                        </h3>
                        <p className="mt-1.5 text-sm text-slate-400">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2.5">
                        <span className="font-mono text-xs text-slate-500">{exp.period}</span>
                        <span className={`geo-tag ${exp.badgeColor}`}>
                          {exp.badge}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-6 flex flex-col gap-3">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-7 text-slate-400">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] bg-cyan-400/50" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
