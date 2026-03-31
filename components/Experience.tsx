"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";

const experiences = [
  {
    role: "Competitive Programmer",
    company: "LeetCode, Codeforces & CodeChef",
    period: "Mar 2024 – Present",
    badge: "Top 0.4% Global",
    badgeColor: "border-blue-500/20 bg-blue-500/[0.07] text-blue-400",
    accentColor: "from-blue-500 to-cyan-500",
    bullets: [
      "Achieved Guardian rank on LeetCode (Top 0.4% globally) and Master rank on Codeforces (Ranked 56 in India).",
      "Consistently solved complex algorithmic challenges under strict time constraints, mastering advanced data structures and dynamic programming.",
    ],
  },
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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
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
      const cards = cardRefs.current.filter(
        (card): card is HTMLDivElement => Boolean(card)
      );
      const markers = markerRefs.current.filter(
        (marker): marker is HTMLDivElement => Boolean(marker)
      );

      if (!timelineRef.current || cards.length === 0) {
        return;
      }

      if (lineRef.current) {
        const lineLength = lineRef.current.getTotalLength();

        gsap.set(lineRef.current, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 78%",
            end: "bottom 38%",
            scrub: prefersReducedMotion ? false : 0.85,
            once: prefersReducedMotion,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.set(cards, {
        transformPerspective: 1200,
        transformOrigin: "left center",
      });

      gsap.fromTo(
        cards,
        {
          autoAlpha: 0,
          x: -72,
          y: 28,
          rotateX: 8,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 82%",
            end: prefersReducedMotion ? "top 66%" : "bottom 46%",
            scrub: prefersReducedMotion ? false : 0.7,
            once: prefersReducedMotion,
            invalidateOnRefresh: true,
          },
        }
      );

      if (markers.length > 0) {
        gsap.fromTo(
          markers,
          {
            autoAlpha: 0.3,
            scale: 0.7,
            rotate: 45,
          },
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 45,
            duration: 0.7,
            stagger: 0.16,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              end: prefersReducedMotion ? "top 66%" : "bottom 44%",
              scrub: prefersReducedMotion ? false : 0.55,
              once: prefersReducedMotion,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    });
  }, [gsap, prefersReducedMotion, withContext]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-container geo-divider-top relative"
    >
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[300px] -translate-y-1/2 rounded-full bg-purple-600/[0.03] blur-[100px]" />

      <div className="section-inner">
        <div ref={headerRef} className="mb-14 md:mb-16">
          <p className="section-label mb-4">Experience</p>
          <h2 className="section-title">
            Where I&apos;ve <span className="text-gradient-static">Worked</span>
          </h2>
        </div>

        <div ref={timelineRef} className="relative ml-3 pl-8 md:ml-0 md:pl-12">
          <svg
            aria-hidden="true"
            className="absolute left-[-2px] top-0 h-full w-6 overflow-visible md:left-0 md:w-8"
            viewBox="0 0 32 100"
            preserveAspectRatio="none"
          >
            <line
              x1="16"
              y1="0"
              x2="16"
              y2="100"
              stroke="rgba(148,163,184,0.18)"
              strokeWidth="1.4"
            />
            <line
              ref={lineRef}
              x1="16"
              y1="0"
              x2="16"
              y2="100"
              stroke="url(#experience-timeline-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="experience-timeline-gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(96,165,250,0.95)" />
                <stop offset="52%" stopColor="rgba(129,140,248,0.8)" />
                <stop offset="100%" stopColor="rgba(103,232,249,0.12)" />
              </linearGradient>
            </defs>
          </svg>

          <div className="flex flex-col gap-12">
            {experiences.map((experience, index) => (
              <div
                key={experience.company}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="relative"
              >
                <div className="absolute -left-[calc(2rem+6px)] top-6 md:-left-[calc(3rem+6px)]">
                  <div
                    ref={(element) => {
                      markerRefs.current[index] = element;
                    }}
                    className={`h-3 w-3 rotate-45 rounded-[2px] bg-gradient-to-br ${experience.accentColor} shadow-lg`}
                  />
                  <div
                    className={`absolute inset-0 h-3 w-3 rotate-45 rounded-[2px] bg-gradient-to-br ${experience.accentColor} opacity-40`}
                    style={{ animation: "pulse-ring 2s ease-out infinite" }}
                  />
                </div>

                <div className="card card-geo-accent border-trace group overflow-hidden">
                  <div
                    className={`h-px w-full bg-gradient-to-r ${experience.accentColor} opacity-30`}
                  />

                  <div className="p-10 md:p-12">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-blue-300">
                          {experience.role}
                        </h3>
                        <p className="mt-1.5 text-sm text-slate-400">
                          {experience.company}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2.5">
                        <span className="font-mono text-xs text-slate-500">
                          {experience.period}
                        </span>
                        <span className={`geo-tag ${experience.badgeColor}`}>
                          {experience.badge}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-8 flex flex-col gap-4">
                      {experience.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm leading-7 text-slate-400"
                        >
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] bg-cyan-400/50" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
