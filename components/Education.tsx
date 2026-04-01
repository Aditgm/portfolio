"use client";

import { useEffect, useRef } from "react";
import { GraduationCap } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";

const courses = ["Algorithms", "Data Structures", "Machine Learning", "Deep Learning", "Computer Networks", "DBMS"];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const courseRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const { createRevealAnimation, gsap, prefersReducedMotion, withContext } = useGSAP(sectionRef);

  useEffect(() => {
    createRevealAnimation(headerRef, {
      from: { autoAlpha: 0, y: 20, rotateX: 8 },
      to: { autoAlpha: 1, y: 0, rotateX: 0 },
      duration: 0.6,
    });

    createRevealAnimation(cardRef, {
      from: { autoAlpha: 0, y: 24, rotateX: 8, scale: 0.98 },
      to: { autoAlpha: 1, y: 0, rotateX: 0, scale: 1 },
      duration: 0.6,
    });
  }, [createRevealAnimation]);

  useEffect(() => {
    withContext(() => {
      const courseElements = courseRefs.current.filter(
        (el): el is HTMLSpanElement => el !== null
      );

      if (courseElements.length === 0) return;

      gsap.fromTo(
        courseElements,
        {
          autoAlpha: 0,
          scale: 0.9,
          y: 8,
        },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );
    });
  }, [gsap, prefersReducedMotion, withContext]);

  return (
    <section ref={sectionRef} className="section-container geo-divider-top relative">
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-cyan-600/[0.03] blur-[100px]" />

      <div className="section-inner">
        <div ref={headerRef} className="mb-14 md:mb-16">
          <p className="section-label mb-4">Education</p>
          <h2 className="section-title">
            Academic <span className="text-gradient-static">Background</span>
          </h2>
        </div>

        <div
          ref={cardRef}
          className="card border-trace group overflow-hidden"
        >
          <div className="h-px w-full bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-transparent" />

          <div className="p-10 md:p-16">
            <div className="flex items-start gap-6 md:gap-8">
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
                    <p className="mt-2 text-sm text-slate-400">B.Tech in Computer Science & Engineering</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="h-1 w-1 rotate-45 rounded-[1px] bg-cyan-400/60" />
                      <span className="text-xs font-semibold text-cyan-400">AI/ML Specialization</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-slate-500">Apr 2023 – Present</p>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-green-500/15 bg-green-500/[0.06] px-4 py-2">
                      <div className="relative h-8 w-8">
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

                <div className="mt-12 border-t border-white/[0.04] pt-10">
                  <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-slate-500">Key Coursework</p>
                  <div className="flex flex-wrap gap-4">
                    {courses.map((c, i) => (
                      <span
                        key={c}
                        ref={(el) => { courseRefs.current[i] = el; }}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-wide text-slate-300 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
