"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Target,
  Flame,
  Star,
  Zap,
  Award,
} from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";

interface CompetitiveStat {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  valueColor: string;
  ringColor: string;
  glowColor: string;
}

const STAT_RING_RADIUS = 24;
const STAT_RING_CIRCUMFERENCE = 2 * Math.PI * STAT_RING_RADIUS;

const competitiveStats: CompetitiveStat[] = [
  {
    value: 2000,
    suffix: "+",
    label: "Problems Solved",
    sub: "LeetCode, CF, CSES, HackerRank",
    valueColor: "#9fb0ff",
    ringColor: "rgba(99, 102, 241, 0.9)",
    glowColor: "rgba(59,130,246,0.12)",
  },
  {
    value: 2360,
    suffix: "+",
    label: "LeetCode Rating",
    sub: "Guardian · Top 0.4% globally",
    valueColor: "#fbbf24",
    ringColor: "rgba(251, 191, 36, 0.9)",
    glowColor: "rgba(245,158,11,0.12)",
  },
  {
    value: 2131,
    suffix: "",
    label: "Codeforces Rating",
    sub: "Master · Top 0.8% globally",
    valueColor: "#fb923c",
    ringColor: "rgba(251, 146, 60, 0.88)",
    glowColor: "rgba(249,115,22,0.12)",
  },
  {
    value: 2101,
    suffix: "",
    label: "CodeChef Rating",
    sub: "5★ · Ranked 470th in India",
    valueColor: "#34d399",
    ringColor: "rgba(52, 211, 153, 0.88)",
    glowColor: "rgba(16,185,129,0.12)",
  },
];

const STAT_RING_MAX = Math.max(...competitiveStats.map((stat) => stat.value));

function formatStat(value: number, suffix: string) {
  return `${Math.round(value).toLocaleString()}${suffix}`;
}

interface Achievement {
  title: string;
  platform: string;
  highlight: string;
  description: string;
  stat: string;
  statLabel: string;
  profileUrl: string;
  accent: string;
  glowFrom: string;
  glowTo: string;
  borderAccent: string;
  icon: ReactNode;
}

const achievements: Achievement[] = [
  {
    title: "Guardian",
    platform: "LeetCode",
    highlight: "Top 0.4% Globally",
    description:
      "Achieved Guardian rank with 2360+ rating, consistently competing in weekly and biweekly contests. Solved 550+ problems across all difficulty levels.",
    stat: "2360+",
    statLabel: "Contest Rating",
    profileUrl: "https://leetcode.com/u/adityagm/",
    accent: "text-amber-400",
    glowFrom: "from-amber-500/20",
    glowTo: "to-yellow-500/5",
    borderAccent: "border-amber-500/15 hover:border-amber-500/30",
    icon: <Trophy className="h-6 w-6" />,
  },
  {
    title: "Master",
    platform: "Codeforces",
    highlight: "Top 0.8% Globally",
    description:
      "Reached Master rank (2131 rating) on Codeforces, solving complex algorithmic problems under time pressure. Ranked 45th out of 20,000+ in CF Round 1068.",
    stat: "2131",
    statLabel: "Peak Rating",
    profileUrl: "https://codeforces.com/profile/aditya2005",
    accent: "text-orange-400",
    glowFrom: "from-orange-500/20",
    glowTo: "to-red-500/5",
    borderAccent: "border-orange-500/15 hover:border-orange-500/30",
    icon: <Flame className="h-6 w-6" />,
  },
  {
    title: "5★ Coder",
    platform: "CodeChef",
    highlight: "Ranked 470th in India",
    description:
      "Achieved 5-star rating with 2101 on CodeChef, mastering competitive programming across Long Challenges, Cook-Offs, and Lunch Time contests.",
    stat: "2101",
    statLabel: "Max Rating",
    profileUrl: "https://www.codechef.com/users/adityagm",
    accent: "text-green-400",
    glowFrom: "from-green-500/20",
    glowTo: "to-emerald-500/5",
    borderAccent: "border-green-500/15 hover:border-green-500/30",
    icon: <Star className="h-6 w-6" />,
  },
  {
    title: "2000+ Problems",
    platform: "All Platforms",
    highlight: "Consistent Practice",
    description:
      "Solved over 2000 problems across LeetCode, Codeforces, CodeChef, CSES, HackerRank, and VJudge – building deep expertise in data structures and algorithms.",
    stat: "2000+",
    statLabel: "Total Solved",
    profileUrl: "https://vjudge.net/user/aditya6789",
    accent: "text-blue-400",
    glowFrom: "from-blue-500/20",
    glowTo: "to-cyan-500/5",
    borderAccent: "border-blue-500/15 hover:border-blue-500/30",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Rank #169 / 30,000+",
    platform: "LeetCode Weekly 462",
    highlight: "Top 0.005%",
    description:
      "Achieved an outstanding rank of 169 out of 30,000+ participants in LeetCode Weekly Contest 462, demonstrating elite-level speed and accuracy.",
    stat: "#169",
    statLabel: "Contest Rank",
    profileUrl: "https://leetcode.com/u/adityagm/",
    accent: "text-amber-300",
    glowFrom: "from-amber-500/20",
    glowTo: "to-amber-500/5",
    borderAccent: "border-amber-500/15 hover:border-amber-400/30",
    icon: <Target className="h-6 w-6" />,
  },
  {
    title: "Rank #45 / 20,000+",
    platform: "CF Round 1068, Div. 2",
    highlight: "Top 0.003%",
    description:
      "Ranked 45th out of 20,000+ participants in Codeforces Round 1068 (Div. 2), a peak performance that pushed the rating to Master level.",
    stat: "#45",
    statLabel: "Contest Rank",
    profileUrl: "https://codeforces.com/profile/aditya2005",
    accent: "text-orange-300",
    glowFrom: "from-orange-500/20",
    glowTo: "to-orange-500/5",
    borderAccent: "border-orange-500/15 hover:border-orange-400/30",
    icon: <Award className="h-6 w-6" />,
  },
];

const quickLinks = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/adityagm/",
    color: "text-amber-400 hover:text-amber-200",
    border: "border-amber-500/20 hover:border-amber-400/50",
    glow: "hover:shadow-[0_0_24px_rgba(245,158,11,0.18)]",
  },
  {
    name: "Codeforces",
    url: "https://codeforces.com/profile/aditya2005",
    color: "text-orange-400 hover:text-orange-200",
    border: "border-orange-500/20 hover:border-orange-400/50",
    glow: "hover:shadow-[0_0_24px_rgba(249,115,22,0.18)]",
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com/users/adityagm",
    color: "text-green-400 hover:text-green-200",
    border: "border-green-500/20 hover:border-green-400/50",
    glow: "hover:shadow-[0_0_24px_rgba(16,185,129,0.18)]",
  },
  {
    name: "VJudge",
    url: "https://vjudge.net/user/aditya6789",
    color: "text-blue-400 hover:text-blue-200",
    border: "border-blue-500/20 hover:border-blue-400/50",
    glow: "hover:shadow-[0_0_24px_rgba(59,130,246,0.18)]",
  },
];

export default function Achievements() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const statsValueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const statsRingRefs = useRef<Array<SVGCircleElement | null>>([]);
  const linksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const timerRef = useRef<number | null>(null);
  const transitionRef = useRef(false);
  const { ScrollTrigger, createRevealAnimation, gsap, prefersReducedMotion, withContext } =
    useGSAP(sectionRef);

  const total = achievements.length;
  const activeAchievement = achievements[current];

  const animateTo = useCallback(
    (nextIndex: number, nextDirection?: number) => {
      const normalizedIndex = (nextIndex + total) % total;

      if (normalizedIndex === current || transitionRef.current) {
        return;
      }

      const resolvedDirection =
        nextDirection ?? (normalizedIndex > current ? 1 : -1);

      if (!cardRef.current || prefersReducedMotion) {
        setCurrent(normalizedIndex);
        return;
      }

      transitionRef.current = true;

      gsap
        .timeline({
          onComplete: () => {
            transitionRef.current = false;
          },
        })
        .to(cardRef.current, {
          rotateY: resolvedDirection > 0 ? -82 : 82,
          z: -120,
          autoAlpha: 0.18,
          scale: 0.96,
          duration: 0.34,
          ease: "power2.inOut",
          transformOrigin: resolvedDirection > 0 ? "left center" : "right center",
          overwrite: "auto",
          onComplete: () => {
            setCurrent(normalizedIndex);
            gsap.set(cardRef.current, {
              rotateY: resolvedDirection > 0 ? 82 : -82,
              z: -120,
              autoAlpha: 0.18,
              scale: 0.96,
              transformOrigin: resolvedDirection > 0 ? "right center" : "left center",
            });
          },
        })
        .to(cardRef.current, {
          rotateY: 0,
          z: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.52,
          ease: "power3.out",
        });
    },
    [current, gsap, prefersReducedMotion, total]
  );

  const next = useCallback(() => {
    animateTo(current + 1, 1);
  }, [animateTo, current]);

  const prev = useCallback(() => {
    animateTo(current - 1, -1);
  }, [animateTo, current]);

  useEffect(() => {
    createRevealAnimation(headerRef, {
      from: { autoAlpha: 0, y: 24, rotateX: 8 },
      to: { autoAlpha: 1, y: 0, rotateX: 0 },
      duration: 0.8,
    });
  }, [createRevealAnimation]);

  useEffect(() => {
    createRevealAnimation(statsGridRef, {
      from: { autoAlpha: 0, y: 26, rotateX: 8, scale: 0.98 },
      to: { autoAlpha: 1, y: 0, rotateX: 0, scale: 1 },
      duration: 0.8,
    });
  }, [createRevealAnimation]);

  useEffect(() => {
    createRevealAnimation(carouselRef, {
      from: { autoAlpha: 0, y: 30, rotateX: 8, scale: 0.98 },
      to: { autoAlpha: 1, y: 0, rotateX: 0, scale: 1 },
      duration: 0.82,
    });
  }, [createRevealAnimation]);

  useEffect(() => {
    withContext(() => {
      const cards = statsCardRefs.current.filter((card): card is HTMLDivElement => Boolean(card));

      if (!statsGridRef.current || cards.length === 0) {
        return;
      }

      gsap.set(cards, {
        transformPerspective: 1200,
        transformOrigin: "center center",
        willChange: "transform, opacity",
      });

      gsap.fromTo(
        cards,
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
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsGridRef.current,
            start: "top 82%",
            end: prefersReducedMotion ? "top 62%" : "bottom 52%",
            scrub: prefersReducedMotion ? false : 0.7,
            once: prefersReducedMotion,
            invalidateOnRefresh: true,
          },
        }
      );

      competitiveStats.forEach((stat, index) => {
        const valueNode = statsValueRefs.current[index];
        const ringNode = statsRingRefs.current[index];
        const card = cards[index];

        if (!valueNode || !card) {
          return;
        }

        valueNode.textContent = formatStat(0, stat.suffix);

        if (ringNode) {
          ringNode.style.strokeDasharray = `${STAT_RING_CIRCUMFERENCE}`;
          ringNode.style.strokeDashoffset = `${STAT_RING_CIRCUMFERENCE}`;
        }

        const counterState = { value: 0, progress: 0 };
        const ringProgress = stat.value / STAT_RING_MAX;

        gsap.to(counterState, {
          value: stat.value,
          progress: ringProgress,
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

            if (ringNode) {
              ringNode.style.strokeDashoffset = `${STAT_RING_CIRCUMFERENCE * (1 - counterState.progress)}`;
            }
          },
          onComplete: () => {
            valueNode.textContent = formatStat(stat.value, stat.suffix);

            if (ringNode) {
              ringNode.style.strokeDashoffset = `${STAT_RING_CIRCUMFERENCE * (1 - ringProgress)}`;
            }
          },
        });
      });

      return () => {
        competitiveStats.forEach((stat, index) => {
          const valueNode = statsValueRefs.current[index];
          const ringNode = statsRingRefs.current[index];

          if (valueNode) {
            valueNode.textContent = formatStat(stat.value, stat.suffix);
          }

          if (ringNode) {
            ringNode.style.strokeDashoffset = `${STAT_RING_CIRCUMFERENCE * (1 - stat.value / STAT_RING_MAX)}`;
          }
        });
      };
    });
  }, [gsap, prefersReducedMotion, withContext]);

  useEffect(() => {
    withContext(() => {
      if (!sectionRef.current) {
        return;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom-=120",
        end: "bottom top+=120",
        onToggle: (self) => {
          setIsSectionActive(self.isActive);
        },
      });

      if (cardRef.current) {
        gsap.set(cardRef.current, {
          transformPerspective: 1800,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        });
      }

      const links = linksRef.current.filter(
        (link): link is HTMLAnchorElement => Boolean(link)
      );

      if (links.length > 0) {
        gsap.fromTo(
          links,
          {
            autoAlpha: 0,
            y: 18,
            rotateX: -8,
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 68%",
              end: prefersReducedMotion ? "top 56%" : "bottom 42%",
              scrub: prefersReducedMotion ? false : 0.45,
              once: prefersReducedMotion,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    });
  }, [ScrollTrigger, gsap, prefersReducedMotion, withContext]);

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion) {
      return;
    }

    gsap.set(cardRef.current, {
      rotateY: 0,
      z: 0,
      autoAlpha: 1,
      scale: 1,
    });
  }, [current, gsap, prefersReducedMotion]);

  useEffect(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (isPaused || !isSectionActive) {
      return;
    }

    timerRef.current = window.setInterval(() => {
      next();
    }, 2000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused, isSectionActive, next]);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="section-container geo-divider-top relative"
    >
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute left-0 top-1/3 h-[300px] w-[300px] rounded-full bg-blue-600/[0.04] blur-[100px]" />

      <div className="section-inner">
        <div ref={headerRef} className="mb-14 max-w-2xl">
          <p className="section-label mb-4">Competitive Programming</p>
          <h2 className="section-title">
            Competitive <span className="text-gradient-static">Programming</span>
          </h2>
          <p className="measure-copy mt-5 text-sm leading-7 text-slate-400 md:text-base md:leading-8">
            Ratings at a glance on top, and contest-specific deep dives below.
          </p>
        </div>

        <div ref={statsGridRef} className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {competitiveStats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(element) => {
                statsCardRefs.current[index] = element;
              }}
              className="card border-trace group relative cursor-default overflow-hidden p-10 md:p-12"
              style={{ ["--hover-glow" as string]: stat.glowColor }}
            >
              <div className="absolute right-8 top-8">
                <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
                  <circle
                    cx="28"
                    cy="28"
                    r={STAT_RING_RADIUS}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="4"
                  />
                  <circle
                    ref={(element) => {
                      statsRingRefs.current[index] = element;
                    }}
                    cx="28"
                    cy="28"
                    r={STAT_RING_RADIUS}
                    fill="none"
                    stroke={stat.ringColor}
                    strokeLinecap="round"
                    strokeWidth="4"
                    strokeDasharray={STAT_RING_CIRCUMFERENCE}
                    strokeDashoffset={STAT_RING_CIRCUMFERENCE}
                  />
                </svg>
              </div>

              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <div className="mb-7 flex items-center gap-2">
                <div className="h-2 w-2 rotate-45 rounded-[2px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 transition-all duration-300 group-hover:scale-125 group-hover:from-blue-500/70 group-hover:to-purple-500/70" />
                <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent transition-all duration-300 group-hover:from-white/[0.16]" />
              </div>

              <span
                ref={(element) => {
                  statsValueRefs.current[index] = element;
                }}
                aria-label={`${stat.label}: ${formatStat(stat.value, stat.suffix)}`}
                className="text-3xl font-extrabold tabular-nums md:text-4xl"
                style={{ color: stat.valueColor }}
              >
                {formatStat(stat.value, stat.suffix)}
              </span>
              <p className="mt-3.5 text-sm font-semibold tracking-wide text-white">{stat.label}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-10 mt-16 flex items-center gap-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Contest Deep Dives
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>

        <div
          ref={carouselRef}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl [perspective:1800px]" style={{ minHeight: 340 }}>
            <div
              ref={cardRef}
              className={`achievement-card card border-trace group relative cursor-default ${activeAchievement.borderAccent}`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${activeAchievement.glowFrom} via-transparent ${activeAchievement.glowTo}`}
              />

              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${activeAchievement.glowFrom} ${activeAchievement.glowTo} opacity-40 blur-[80px] transition-opacity duration-500 group-hover:opacity-70`}
              />

              <div className="relative z-10 flex flex-col gap-10 p-10 md:flex-row md:items-start md:gap-14 md:p-14">
                <div className="flex flex-col items-center gap-4 md:items-start">
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${activeAchievement.glowFrom} ${activeAchievement.glowTo} ${activeAchievement.accent}`}
                  >
                    {activeAchievement.icon}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${activeAchievement.glowFrom} ${activeAchievement.glowTo}`}
                      style={{ animation: "pulse-ring 2.5s ease-out infinite" }}
                    />
                  </div>

                  <div className="text-center md:text-left">
                    <p
                      className={`text-4xl font-extrabold tabular-nums ${activeAchievement.accent}`}
                    >
                      {activeAchievement.stat}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                      {activeAchievement.statLabel}
                    </p>
                  </div>
                </div>

                <div className="flex-1 space-y-5">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {activeAchievement.platform}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                      {activeAchievement.title}
                    </h3>
                  </div>

                  <span
                    className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold tracking-wide ${activeAchievement.borderAccent} ${activeAchievement.accent} bg-white/[0.02]`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {activeAchievement.highlight}
                  </span>

                  <p className="text-sm leading-7 text-slate-400 md:text-[0.95rem] md:leading-8">
                    {activeAchievement.description}
                  </p>

                  <a
                    href={activeAchievement.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/link inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${activeAchievement.accent} hover:brightness-125`}
                  >
                    View Profile
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => animateTo(index, index > current ? 1 : -1)}
                  aria-label={`Go to achievement ${index + 1}`}
                  className={`carousel-dot h-2 rounded-full transition-all duration-400 ${index === current ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500" : "w-2 bg-slate-700 hover:bg-slate-500"}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="mr-3 font-mono text-xs tabular-nums text-slate-500">
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={prev}
                aria-label="Previous achievement"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-slate-400 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next achievement"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-slate-400 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {quickLinks.map((platform, index) => (
            <a
              key={platform.name}
              ref={(element) => {
                linksRef.current[index] = element;
              }}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2.5 rounded-2xl border bg-white/[0.03] px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07] ${platform.color} ${platform.border} ${platform.glow}`}
            >
              {platform.name}
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
