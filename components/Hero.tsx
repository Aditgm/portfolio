"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, Binary, Github, Mail, Trophy } from "lucide-react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero3DBackground = dynamic(() => import("./Hero3DBackground"), {
  ssr: false,
  loading: () => null,
});

const nameParts = [
  { word: "Aditya", accent: false },
  { word: "Raj", accent: true },
];

const heroQuoteWords = [
  "Building",
  "AI-powered",
  "products",
  "that",
  "ship.",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Aditgm",
    icon: Github,
    glow: "rgba(99, 102, 241, 0.18)",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/adityagm/",
    icon: Binary,
    glow: "rgba(45, 212, 191, 0.18)",
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/aditya2005",
    icon: Trophy,
    glow: "rgba(124, 58, 237, 0.18)",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLButtonElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    if (!nameRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice =
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const nameNode = nameRef.current;
    const letters = letterRefs.current.filter(
      (letter): letter is HTMLSpanElement => Boolean(letter)
    );

    if (letters.length === 0) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);
        const strength = Math.max(0, 1 - distance / 180);

        gsap.to(letter, {
          x: deltaX * 0.12 * strength,
          y: deltaY * 0.1 * strength,
          rotationZ: deltaX * 0.015 * strength,
          duration: 0.32,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    const handleLeave = () => {
      gsap.to(letters, {
        x: 0,
        y: 0,
        rotationZ: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.45)",
        stagger: 0.01,
        overwrite: "auto",
      });
    };

    nameNode.addEventListener("pointermove", handleMove);
    nameNode.addEventListener("pointerleave", handleLeave);

    return () => {
      nameNode.removeEventListener("pointermove", handleMove);
      nameNode.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current || !backgroundLayerRef.current) {
        return;
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const q = gsap.utils.selector(sectionRef);
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(q("[data-hero-letter]"), {
        yPercent: 110,
        opacity: 0,
        filter: "blur(10px)",
      });
      gsap.set(
        q("[data-hero-badge], [data-hero-subtitle], [data-hero-quote], [data-hero-cta], [data-hero-social]"),
        { autoAlpha: 0, y: 24 }
      );
      gsap.set(q("[data-hero-quote-word]"), {
        autoAlpha: 0.15,
        yPercent: 22,
        filter: "blur(10px)",
        clipPath: "inset(0 0 100% 0)",
      });

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
          "-=0.08"
        )
        .to(
          q("[data-hero-subtitle], [data-hero-quote]"),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.7"
        )
        .to(
          q("[data-hero-cta], [data-hero-social]"),
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
          },
          "-=0.35"
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

      gsap.to(q("[data-hero-quote-word]"), {
        autoAlpha: 1,
        yPercent: 0,
        filter: "blur(0px)",
        clipPath: "inset(0 0 0% 0)",
        duration: prefersReducedMotion ? 0.35 : 0.8,
        stagger: prefersReducedMotion ? 0.02 : 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
          end: prefersReducedMotion ? "top 52%" : "top 18%",
          scrub: prefersReducedMotion ? false : 0.45,
        },
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,152,184,0.14),transparent_42%),radial-gradient(circle_at_78%_62%,rgba(94,133,154,0.1),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.26),rgba(2,6,23,0.74)_62%,rgba(2,6,23,0.92))]" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[14%] top-[14%] h-64 w-64 rounded-full bg-[rgba(99,102,241,0.12)] blur-[120px]" />
        <div className="absolute right-[10%] top-[22%] h-80 w-80 rounded-full bg-[rgba(124,58,237,0.12)] blur-[140px]" />
        <div className="absolute bottom-[8%] left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-[rgba(45,212,191,0.08)] blur-[110px]" />
      </div>

      <div ref={contentRef} className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="flex flex-col items-center gap-10">
          <a
            data-hero-badge
            href="mailto:arajsinha4@gmail.com"
            className="signature-pill inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{
                  backgroundColor: "rgba(99, 102, 241, 0.72)",
                  animation: "pulse-ring 1.5s ease-out infinite",
                }}
              />
              <span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: "var(--signature)" }}
              />
            </span>
            Open to SDE Internships &amp; New Grad Roles
          </a>

          <div className="flex flex-col items-center gap-6">
            <div ref={nameRef} className="group relative">
              <div className="pointer-events-none absolute inset-x-[10%] bottom-[10%] h-12 rounded-full bg-[rgba(99,102,241,0.18)] blur-[44px] transition-opacity duration-500 group-hover:opacity-100" />
              <h1 className="display-title relative select-none text-[clamp(4.8rem,13vw,9.4rem)] font-black uppercase leading-[0.84] text-white">
                <span className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                  {nameParts.map((part, partIndex) => (
                    <span
                      key={part.word}
                      className={`inline-flex overflow-hidden ${part.accent ? "text-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" : ""}`}
                    >
                      {Array.from(part.word).map((letter, index) => {
                        const letterIndex =
                          nameParts
                            .slice(0, partIndex)
                            .reduce((total, item) => total + item.word.length, 0) + index;

                        return (
                          <span
                            key={`${part.word}-${index}`}
                            ref={(element) => {
                              letterRefs.current[letterIndex] = element;
                            }}
                            data-hero-letter
                            className="inline-block will-change-transform"
                          >
                            {letter}
                          </span>
                        );
                      })}
                    </span>
                  ))}
                </span>
              </h1>
            </div>

            <div className="flex flex-col items-center gap-3">
              <h2
                data-hero-subtitle
                className="text-2xl font-bold tracking-wide text-white sm:text-3xl"
              >
                Full-Stack Developer &amp; AI Engineer
              </h2>

              <p
                data-hero-quote
                className="measure-copy mt-3 text-lg font-medium italic text-slate-300 sm:text-xl"
              >
                <span className="sr-only">Building AI-powered products that ship.</span>
                <span aria-hidden="true">
                  {heroQuoteWords.map((word, index) => (
                    <span key={word} className="inline-block overflow-hidden">
                      <span data-hero-quote-word className="inline-block will-change-transform">
                        {word}
                      </span>
                      {index < heroQuoteWords.length - 1 ? <span>&nbsp;</span> : null}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>

          <div data-hero-cta className="mt-2 flex flex-wrap items-center justify-center gap-7">
            <MagneticButton intensity={0.34} range={150}>
              <a
                href="#projects"
                className="signature-button group relative inline-flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl px-10 py-5 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ animation: "shimmer 2s infinite" }}
                />
                <span className="relative flex items-center gap-3">
                  View Projects
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </MagneticButton>

            <MagneticButton intensity={0.3} range={140}>
              <a
                href="#contact"
                className="signature-outline group relative inline-flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl px-10 py-5 text-base font-bold backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-white"
              >
                <span className="relative flex items-center gap-3">
                  Get in Touch
                  <Mail size={18} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </MagneticButton>
          </div>

          <div data-hero-social className="mt-2 flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <MagneticButton key={link.label} intensity={0.22} range={110}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="group relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.06] text-slate-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:text-white"
                    style={{
                      boxShadow: `0 18px 36px -24px ${link.glow}`,
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle, ${link.glow} 0%, transparent 68%)`,
                      }}
                    />
                    <Icon
                      size={18}
                      className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                    />
                  </a>
                </MagneticButton>
              );
            })}
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
          <ArrowDown size={14} style={{ color: "var(--secondary-accent)" }} />
        </span>
      </button>
    </section>
  );
}
