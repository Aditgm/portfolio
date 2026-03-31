"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  color: string;
  glowColor: string;
}

const stats: Stat[] = [
  {
    value: 2000,
    suffix: "+",
    label: "Problems Solved",
    sub: "LeetCode, CF, CSES, HackerRank",
    color: "text-blue-400",
    glowColor: "rgba(59,130,246,0.12)",
  },
  {
    value: 2360,
    suffix: "+",
    label: "LeetCode Rating",
    sub: "Guardian · Top 0.4% globally",
    color: "text-amber-400",
    glowColor: "rgba(245,158,11,0.12)",
  },
  {
    value: 2131,
    suffix: "",
    label: "Codeforces Rating",
    sub: "Master · Top 0.8% globally",
    color: "text-orange-400",
    glowColor: "rgba(249,115,22,0.12)",
  },
  {
    value: 2101,
    suffix: "",
    label: "CodeChef Rating",
    sub: "5★ · Ranked 470th in India",
    color: "text-green-400",
    glowColor: "rgba(16,185,129,0.12)",
  },
];

const contestHighlights = [
  {
    rank: "#169",
    contest: "LeetCode Weekly Contest 462",
    detail: "Ranked 169 / 30,000+",
    pct: "Top 0.005%",
    accent: "text-amber-300",
    bg: "from-amber-500/15 to-amber-500/5",
    borderAccent: "border-amber-500/10 hover:border-amber-500/30",
    glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]",
  },
  {
    rank: "#45",
    contest: "Codeforces Round 1068, Div. 2",
    detail: "Ranked 45 / 20,000+",
    pct: "Top 0.003%",
    accent: "text-orange-300",
    bg: "from-orange-500/15 to-orange-500/5",
    borderAccent: "border-orange-500/10 hover:border-orange-500/30",
    glow: "group-hover:shadow-[0_0_40px_rgba(249,115,22,0.08)]",
  },
];

function formatStat(value: number, suffix: string) {
  return `${Math.round(value).toLocaleString()}${suffix}`;
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const highlightsGridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const highlightRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { createRevealAnimation, gsap, prefersReducedMotion, withContext } = useGSAP(sectionRef);

  useEffect(() => {
    createRevealAnimation(headerRef, {
      from: { autoAlpha: 0, y: 24, rotateX: 8 },
      to: { autoAlpha: 1, y: 0, rotateX: 0 },
      duration: 0.8,
    });
  }, [createRevealAnimation]);

  useEffect(() => {
    createRevealAnimation(dividerRef, {
      from: { autoAlpha: 0, y: 16, scale: 0.98 },
      to: { autoAlpha: 1, y: 0, scale: 1 },
      duration: 0.65,
    });
  }, [createRevealAnimation]);

  useEffect(() => {
    withContext(() => {
      const statCards = cardRefs.current.filter(
        (card): card is HTMLDivElement => Boolean(card)
      );
      const highlightCards = highlightRefs.current.filter(
        (card): card is HTMLDivElement => Boolean(card)
      );

      if (!gridRef.current || statCards.length === 0) {
        return;
      }

      gsap.set(statCards, {
        transformPerspective: 1200,
        transformOrigin: "center center",
        willChange: "transform, opacity",
      });

      const cardRevealTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
          end: prefersReducedMotion ? "top 62%" : "bottom 52%",
          scrub: prefersReducedMotion ? false : 0.7,
          once: prefersReducedMotion,
          invalidateOnRefresh: true,
        },
      });

      cardRevealTimeline.fromTo(
        statCards,
        {
          autoAlpha: 0,
          y: 54,
          rotateX: -16,
          rotateY: (index: number) => (index % 2 === 0 ? -6 : 6),
          scale: 0.88,
        },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          stagger: 0.14,
          duration: 1,
        }
      );

      if (progressFillRef.current) {
        gsap.set(progressFillRef.current, {
          transformOrigin: "left center",
          willChange: "transform",
        });

        gsap.fromTo(
          progressFillRef.current,
          { scaleX: 0.08, autoAlpha: 0.45 },
          {
            scaleX: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              end: "bottom 42%",
              scrub: prefersReducedMotion ? false : 0.85,
              once: prefersReducedMotion,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      stats.forEach((stat, index) => {
        const valueNode = valueRefs.current[index];
        const card = statCards[index];

        if (!valueNode || !card) {
          return;
        }

        valueNode.textContent = formatStat(0, stat.suffix);

        const counterState = { value: 0 };

        gsap.to(counterState, {
          value: stat.value,
          duration: prefersReducedMotion ? 0.6 : 1.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            end: prefersReducedMotion ? "top 70%" : "top 36%",
            scrub: prefersReducedMotion ? false : 0.9,
            once: prefersReducedMotion,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            valueNode.textContent = formatStat(counterState.value, stat.suffix);
          },
          onComplete: () => {
            valueNode.textContent = formatStat(stat.value, stat.suffix);
          },
        });
      });

      if (!highlightsGridRef.current || highlightCards.length === 0) {
        return;
      }

      gsap.set(highlightCards, {
        transformPerspective: 1100,
        transformOrigin: "center top",
      });

      gsap.fromTo(
        highlightCards,
        {
          autoAlpha: 0,
          y: 28,
          rotateX: -10,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.95,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: highlightsGridRef.current,
            start: "top 84%",
            end: prefersReducedMotion ? "top 70%" : "bottom 58%",
            scrub: prefersReducedMotion ? false : 0.55,
            once: prefersReducedMotion,
            invalidateOnRefresh: true,
          },
        }
      );

      return () => {
        stats.forEach((stat, index) => {
          const valueNode = valueRefs.current[index];

          if (valueNode) {
            valueNode.textContent = formatStat(stat.value, stat.suffix);
          }
        });
      };
    });
  }, [gsap, prefersReducedMotion, withContext]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-container geo-divider-top relative"
    >
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-60" />
      <div className="pointer-events-none absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-blue-600/[0.04] blur-[100px]" />

      <div className="section-inner">
        <div ref={headerRef} className="mb-14 max-w-2xl">
          <p className="section-label mb-4">By the Numbers</p>
          <h2 className="section-title">
            Competitive <span className="text-gradient-static">Programming</span>
          </h2>
          <p className="mt-6 text-sm leading-7 text-slate-400 md:text-base md:leading-8">
            Consistently ranked among the top competitive programmers globally across
            all major platforms.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="card border-trace group relative cursor-default overflow-hidden p-10 md:p-12"
              style={{ ["--hover-glow" as string]: stat.glowColor }}
            >
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <div className="mb-7 flex items-center gap-2">
                <div className="h-2 w-2 rotate-45 rounded-[2px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 transition-all duration-300 group-hover:scale-125 group-hover:from-blue-500/70 group-hover:to-purple-500/70" />
                <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent transition-all duration-300 group-hover:from-white/[0.16]" />
              </div>

              <span
                ref={(element) => {
                  valueRefs.current[index] = element;
                }}
                aria-label={`${stat.label}: ${formatStat(stat.value, stat.suffix)}`}
                className={`text-3xl font-extrabold tabular-nums md:text-4xl ${stat.color}`}
              >
                {formatStat(stat.value, stat.suffix)}
              </span>
              <p className="mt-3.5 text-sm font-semibold tracking-wide text-white">
                {stat.label}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-full border border-white/[0.06] bg-white/[0.03]">
          <div
            ref={progressFillRef}
            className="h-1.5 rounded-full bg-[linear-gradient(90deg,rgba(96,165,250,0.85),rgba(125,152,184,0.75),rgba(56,189,248,0.75))]"
          />
        </div>

        <div ref={dividerRef} className="mb-10 mt-16 flex items-center gap-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Contest Highlights
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>

        <div ref={highlightsGridRef} className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {contestHighlights.map((contest, index) => (
            <div
              key={contest.rank}
              ref={(element) => {
                highlightRefs.current[index] = element;
              }}
              className={`card group relative flex items-start gap-8 overflow-hidden p-10 transition-shadow duration-500 md:p-12 ${contest.borderAccent} ${contest.glow}`}
            >
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                <div
                  className={`absolute inset-0 rotate-45 rounded-xl bg-gradient-to-br ${contest.bg} transition-all duration-400 group-hover:scale-115 group-hover:rotate-[50deg]`}
                />
                <span className={`relative z-10 text-sm font-bold ${contest.accent}`}>
                  {contest.rank}
                </span>
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold tracking-wide text-white">
                  {contest.contest}
                </p>
                <p className="mt-2 text-xs leading-6 text-slate-400">
                  {contest.detail} ·{" "}
                  <span className={`font-bold ${contest.accent}`}>{contest.pct}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
