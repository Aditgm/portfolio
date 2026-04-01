"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, Github, Mail, MapPin } from "lucide-react";
import { useGSAP } from "@/hooks/useGSAP";
import { useSmoothScroll } from "./SmoothScroll";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Aditgm",
    icon: <Github size={15} />,
    hoverColor: "hover:text-white",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/adityagm/",
    hoverColor: "hover:text-amber-300",
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/aditya2005",
    hoverColor: "hover:text-orange-300",
  },
  {
    label: "CodeChef",
    href: "https://www.codechef.com/users/adityagm",
    hoverColor: "hover:text-green-300",
  },
];

function splitText(value: string) {
  return value.split("").map((character, index) => (
    <span
      key={`${character}-${index}`}
      data-footer-letter
      className="inline-block will-change-transform"
    >
      {character === " " ? "\u00A0" : character}
    </span>
  ));
}

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { createRevealAnimation, gsap, prefersReducedMotion, withContext } = useGSAP(sectionRef);
  const lenis = useSmoothScroll();
  const currentYear = new Date().getFullYear();

  const titleLetters = useMemo(() => splitText("Get In "), []);
  const accentLetters = useMemo(() => splitText("Touch"), []);

  // Throttled scroll handler using requestAnimationFrame to prevent layout thrashing.
  // Updates occur at most once per animation frame, with passive listener for scroll performance.
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    let rafId: number | null = null;

    const updateState = () => {
      setShowBackToTop(window.scrollY > 520);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(updateState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateState();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    createRevealAnimation(contactCardRef, {
      from: { autoAlpha: 0, y: 28, rotateX: 8, scale: 0.98 },
      to: { autoAlpha: 1, y: 0, rotateX: 0, scale: 1 },
      duration: 0.85,
    });
  }, [createRevealAnimation]);

  useEffect(() => {
    withContext(() => {
      if (!headerRef.current) {
        return;
      }

      const letters = headerRef.current.querySelectorAll<HTMLElement>("[data-footer-letter]");

      gsap.set(letters, {
        autoAlpha: 0,
        yPercent: 110,
        filter: "blur(5px)",
      });

      gsap.to(letters, {
        autoAlpha: 1,
        yPercent: 0,
        filter: "blur(0px)",
        duration: 0.7,
        stagger: 0.025,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 82%",
          end: prefersReducedMotion ? "top 70%" : "bottom 62%",
          scrub: prefersReducedMotion ? false : 0.3,
          once: prefersReducedMotion,
          invalidateOnRefresh: true,
        },
      });
    });
  }, [gsap, prefersReducedMotion, withContext]);

  useEffect(() => {
    if (!backToTopRef.current) {
      return;
    }

    if (showBackToTop) {
      gsap.fromTo(
        backToTopRef.current,
        {
          autoAlpha: 0,
          y: 22,
          scale: 0.86,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: prefersReducedMotion ? 0.2 : 0.7,
          ease: prefersReducedMotion ? "power2.out" : "bounce.out",
          overwrite: "auto",
        }
      );
      return;
    }

    gsap.to(backToTopRef.current, {
      autoAlpha: 0,
      y: 12,
      scale: 0.92,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [gsap, prefersReducedMotion, showBackToTop]);

  const scrollToTop = () => {
    if (prefersReducedMotion || !lenis) {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      return;
    }

    lenis.scrollTo(0, {
      duration: 1.15,
    });
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      data-cursor-theme="dark"
      className="section-container geo-divider-top relative"
    >
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-[rgba(99,102,241,0.07)] blur-[140px]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-[5%] top-[20%] h-8 w-8 rotate-45 rounded-sm border border-[rgba(99,102,241,0.16)] opacity-40"
          style={{ animation: "float-slow 12s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[10%] top-[30%] h-6 w-6 rotate-45 rounded-sm border border-[rgba(124,58,237,0.16)] opacity-30"
          style={{ animation: "float-slow 10s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute bottom-[30%] left-[15%] h-4 w-4 rounded-full border border-[rgba(45,212,191,0.16)] opacity-30"
          style={{ animation: "float 8s ease-in-out infinite 1s" }}
        />
      </div>

      <div className="section-inner flex flex-col items-center">
        <div
          ref={headerRef}
          className="mb-12 flex w-full flex-col items-center text-center md:mb-14"
        >
          <p className="section-label mb-4 justify-center after:block after:h-px after:w-8 after:bg-gradient-to-l after:from-[var(--signature)] after:to-[var(--secondary-accent)]">
            Contact
          </p>
          <h2 className="section-title text-center">
            <span>{titleLetters}</span>
            <span className="text-gradient-static">{accentLetters}</span>
          </h2>
          <p className="measure-copy mx-auto mt-6 block w-full self-center px-2 text-center text-sm leading-[1.85] text-slate-400 md:px-0 md:text-base md:leading-8">
            I&apos;m currently open to new opportunities. Whether you have a question,
            a project idea, or just want to say hi, my inbox is always open.
          </p>
        </div>

        <div
          ref={contactCardRef}
          className="card border-trace mx-auto flex w-full max-w-2xl flex-col items-center gap-8 overflow-hidden"
        >
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.34), transparent)",
            }}
          />

          <div className="flex w-full flex-col items-center gap-10 px-10 pb-10 pt-8 text-center md:px-12 md:pb-12 md:pt-10">
            <div className="flex w-full max-w-sm flex-col gap-4">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=arajsinha4@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover="true"
                className="group relative inline-flex w-full items-center justify-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-8 py-4 text-sm font-semibold text-red-100 shadow-lg shadow-red-500/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/50 hover:bg-red-500/20 hover:shadow-red-500/20"
              >
                <span className="relative flex items-center justify-center gap-3">
                  Compose in Gmail <Mail size={16} className="text-red-300" />
                </span>
              </a>

              <a
                href="https://outlook.live.com/mail/0/deeplink/compose?to=arajsinha4@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover="true"
                className="group signature-outline relative inline-flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="relative flex items-center justify-center gap-3">
                  Compose in Outlook <Mail size={16} style={{ color: "var(--signature)" }} />
                </span>
              </a>

              <div className="my-2 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Or
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <a
                href="mailto:arajsinha4@gmail.com"
                data-cursor-hover="true"
                className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
              >
                <span className="relative flex items-center justify-center gap-2">
                  Open Default Mail App <Mail size={16} className="text-slate-400" />
                </span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover="true"
                  className={`flex items-center gap-2.5 rounded-lg px-5 py-2.5 text-sm text-slate-500 transition-all duration-300 hover:bg-white/[0.04] ${link.hoverColor}`}
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>

            <span className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin size={12} />
              Dehradun, Uttarakhand, India
            </span>
          </div>
        </div>

        <div className="mt-16 flex w-full flex-col items-center justify-between gap-5 pt-8 md:flex-row">
          <div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
            style={{ marginTop: "-2rem" }}
          />

          <p className="text-xs text-slate-600">
            &copy; {currentYear} Aditya Raj. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-mono">Built with</span>
            <span className="h-3 w-px bg-slate-800" />
            <span style={{ color: "rgba(129, 140, 248, 0.78)" }}>Next.js</span>
            <span className="h-1 w-1 rotate-45 rounded-[1px] bg-slate-700" />
            <span style={{ color: "rgba(45, 212, 191, 0.78)" }}>Tailwind CSS</span>
            <span className="h-1 w-1 rotate-45 rounded-[1px] bg-slate-700" />
            <span style={{ color: "rgba(124, 58, 237, 0.78)" }}>GSAP</span>
          </p>
        </div>
      </div>

      <button
        ref={backToTopRef}
        type="button"
        aria-label="Back to top"
        data-cursor-hover="true"
        onClick={scrollToTop}
        onMouseEnter={() => {
          if (!backToTopRef.current || prefersReducedMotion) {
            return;
          }

          gsap.to(backToTopRef.current, {
            y: -4,
            scale: 1.06,
            duration: 0.22,
            ease: "power2.out",
          });
        }}
        onMouseLeave={() => {
          if (!backToTopRef.current || prefersReducedMotion) {
            return;
          }

          gsap.to(backToTopRef.current, {
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: "power2.out",
          });
        }}
        className="signature-outline fixed bottom-8 right-[6.5rem] z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#081120]/88 text-white backdrop-blur-md transition-colors hover:text-white sm:right-[7rem]"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
