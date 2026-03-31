"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Brain, Code2, Github, Mail, Zap } from "lucide-react";
import Hero3DBackground from "./Hero3DBackground";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const achievements = [
  "Top 0.4% on LeetCode · Guardian",
  "Codeforces Master · Ranked 56 in India",
  "CodeChef · Ranked 379 in India",
];

const nameParts = [
  { word: "Aditya", accent: false },
  { word: "Raj", accent: true },
];

export default function Hero() {
  const [achievementIdx, setAchievementIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const achievementRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setAchievementIdx((index) => (index + 1) % achievements.length);
    }, 3000);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!achievementRef.current) {
      return;
    }

    gsap.fromTo(
      achievementRef.current,
      { autoAlpha: 0, y: 14, filter: "blur(6px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power3.out",
      }
    );
  }, [achievementIdx]);

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current || !backgroundLayerRef.current) {
        return;
      }

      const q = gsap.utils.selector(sectionRef);
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(q("[data-hero-letter]"), {
        yPercent: 110,
        opacity: 0,
        filter: "blur(10px)",
      });
      gsap.set(
        q(
          "[data-hero-badge], [data-hero-subtitle], [data-hero-achievement], [data-hero-quote], [data-hero-card], [data-hero-cta], [data-hero-social]"
        ),
        { autoAlpha: 0, y: 24 }
      );

      tl.to(q("[data-hero-badge]"), {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
      })
        .to(
          q("[data-hero-letter]"),
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.045,
          },
          "-=0.1"
        )
        .to(
          q("[data-hero-subtitle], [data-hero-achievement], [data-hero-quote]"),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.7"
        )
        .to(
          q("[data-hero-card]"),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
          },
          "-=0.45"
        )
        .to(
          q("[data-hero-cta], [data-hero-social]"),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
          },
          "-=0.3"
        );

      gsap.to(contentRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(backgroundLayerRef.current, {
        yPercent: -8,
        scale: 1.08,
        ease: "none",
        transformOrigin: "center center",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(indicatorRef.current, {
        y: 12,
        duration: 1.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: sectionRef }
  );

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 pb-24 pt-24 md:px-10 lg:px-12"
    >
      <div ref={backgroundLayerRef} className="absolute inset-0">
        <Hero3DBackground containerRef={sectionRef} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.16),transparent_42%),radial-gradient(circle_at_78%_62%,rgba(192,132,252,0.14),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.22),rgba(2,6,23,0.72)_62%,rgba(2,6,23,0.92))]" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[14%] top-[14%] h-64 w-64 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-[10%] top-[22%] h-80 w-80 rounded-full bg-violet-500/12 blur-[140px]" />
        <div className="absolute bottom-[8%] left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-blue-500/8 blur-[110px]" />
      </div>

      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="flex flex-col items-center gap-10">
          <a
            data-hero-badge
            href="mailto:arajsinha4@gmail.com"
            className="inline-flex items-center gap-3 rounded-full border border-blue-400/20 bg-blue-400/8 px-6 py-3 text-sm font-semibold tracking-wide text-blue-200 backdrop-blur-md transition-colors duration-300 hover:bg-blue-400/12"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"
                style={{ animation: "pulse-ring 1.5s ease-out infinite" }}
              />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-300" />
            </span>
            Open to SDE Internships &amp; New Grad Roles
          </a>

          <div className="flex flex-col items-center gap-6">
            <h1 className="text-[4rem] font-extrabold leading-[0.98] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[6.75rem]">
              <span className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                {nameParts.map((part) => (
                  <span
                    key={part.word}
                    className={`inline-flex overflow-hidden ${part.accent ? "text-gradient" : ""}`}
                  >
                    {Array.from(part.word).map((letter, index) => (
                      <span
                        key={`${part.word}-${index}`}
                        data-hero-letter
                        className="inline-block will-change-transform"
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </h1>

            <div className="flex flex-col items-center gap-3">
              <h2
                data-hero-subtitle
                className="text-2xl font-bold tracking-wide text-white sm:text-3xl"
              >
                Full-Stack Developer &amp; AI Engineer
              </h2>

              <div className="mt-1 h-8 overflow-hidden">
                <div
                  ref={achievementRef}
                  data-hero-achievement
                  className="flex flex-wrap items-center justify-center gap-2 text-center text-sm font-medium text-cyan-300 sm:gap-3 sm:text-base"
                >
                  <span className="hidden h-px w-8 bg-gradient-to-r from-transparent to-cyan-500 sm:block" />
                  <span>{achievements[achievementIdx]}</span>
                  <span className="hidden h-px w-8 bg-gradient-to-l from-transparent to-cyan-500 sm:block" />
                </div>
              </div>

              <p
                data-hero-quote
                className="mt-3 text-lg font-medium italic text-slate-300 sm:text-xl"
              >
                &quot;Building AI-powered products that ship.&quot;
              </p>
            </div>
          </div>

          <div className="mx-auto mt-6 grid max-w-[58rem] gap-4 text-left sm:grid-cols-2 md:grid-cols-3 md:gap-5">
            <div
              data-hero-card
              className="card card-geo-accent group relative flex flex-col justify-center rounded-2xl border border-white/8 bg-slate-900/40 p-6 backdrop-blur-md transition-all hover:bg-slate-800/60 sm:col-span-2 md:col-span-2 md:p-8"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="mb-4 flex items-center gap-3 text-xl font-semibold text-white">
                <Brain className="text-blue-400" size={24} /> Product &amp; AI
              </h3>
              <p className="text-base leading-[1.8] text-slate-400">
                Top <strong className="font-medium text-slate-200">0.4% competitive programmer</strong> on LeetCode who builds AI products that solve real problems. I&apos;m drawn to challenges at the intersection of <strong className="font-medium text-slate-200">LLMs and RAG systems</strong> in healthcare, law, and finance.
              </p>
            </div>

            <div
              data-hero-card
              className="card card-geo-accent group relative flex flex-col justify-center rounded-2xl border border-white/8 bg-slate-900/40 p-6 backdrop-blur-md transition-all hover:bg-slate-800/60 md:p-8"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="mb-4 flex items-center gap-3 text-xl font-semibold text-white">
                <Zap className="text-cyan-400" size={24} /> Philosophy
              </h3>
              <p className="text-base leading-[1.8] text-slate-400">
                I approach every project the way I approach competitive programming: find the <strong className="font-medium text-slate-200">most elegant solution</strong>, then make it fast.
              </p>
            </div>

            <div
              data-hero-card
              className="card card-geo-accent group relative flex flex-col justify-center rounded-2xl border border-white/8 bg-slate-900/40 p-6 backdrop-blur-md transition-all hover:bg-slate-800/60 sm:col-span-2 md:col-span-3 md:p-8"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="mb-4 flex items-center gap-3 text-xl font-semibold text-white">
                <Code2 className="text-purple-400" size={24} /> Current Focus
              </h3>
              <p className="text-base leading-[1.8] text-slate-400">
                Currently exploring <strong className="font-medium text-slate-200">LangChain and Azure</strong>, contributing to open source, and building something new with production-ready AI workflows.
              </p>
            </div>
          </div>

          <div
            data-hero-cta
            className="mt-6 flex flex-wrap items-center justify-center gap-7"
          >
            <a
              href="https://github.com/Aditgm"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-5 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-blue-600/40"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ animation: "shimmer 2s infinite" }}
              />
              <span className="relative flex items-center gap-3">
                View Projects
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl border border-white/12 bg-white/6 px-10 py-5 text-base font-bold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-white/25 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/5"
            >
              <span className="relative flex items-center gap-3">
                Get in Touch
                <Mail size={18} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>

          <div
            data-hero-social
            className="mt-2 flex flex-wrap items-center justify-center gap-8 text-[0.9rem] font-medium text-slate-500"
          >
            <a
              href="https://github.com/Aditgm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-all duration-300 hover:text-white"
            >
              <Github size={18} /> GitHub
            </a>
            <span className="hidden h-4 w-px bg-slate-700 sm:block" />
            <a
              href="https://leetcode.com/u/adityagm/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:text-amber-300"
            >
              LeetCode
            </a>
            <span className="hidden h-4 w-px bg-slate-700 sm:block" />
            <a
              href="https://codeforces.com/profile/aditya2005"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:text-orange-300"
            >
              Codeforces
            </a>
          </div>
        </div>
      </div>

      <button
        ref={indicatorRef}
        type="button"
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 transition-colors hover:text-white"
      >
        <span>Scroll</span>
        <span className="flex h-12 w-8 items-start justify-center rounded-full border border-white/12 bg-white/5 p-1.5">
          <ArrowDown size={14} className="text-cyan-300" />
        </span>
      </button>
    </section>
  );
}
