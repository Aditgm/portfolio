"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Binary, Github, Mail, Trophy } from "lucide-react";
import MagneticButton from "./MagneticButton";

const asciiName = [
  "      _    ____ ___ _______   ___    _   ____      _       ",
  "     / \\  |  _ \\_ _|_   _\ \ / / \  | | |  _ \\    / \\      ",
  "    / _ \\ | | | || |  | |  \\ V / _ \\ | | | |_) |  / _ \\     ",
  "   / ___ \\| |_| || |  | |   | | / ___ \\| | |  _ <  / ___ \\    ",
  "  /_/   \\_\\____/|___| |_|   |_|/_/   \\_\\_| |_| \\_\\/_/   \\_\\   ",
];

const rolePhrases = [
  "Full-Stack Developer",
  "AI Engineer",
  "Competitive Programmer",
  "Building Products That Ship",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Aditgm",
    icon: Github,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/adityagm/",
    icon: Binary,
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/aditya2005",
    icon: Trophy,
  },
];

function useTypewriter(phrases: string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) {
      return;
    }

    const currentPhrase = phrases[phraseIndex % phrases.length];

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentPhrase.slice(0, text.length + 1);
          setText(next);

          if (next === currentPhrase) {
            setIsDeleting(true);
          }
        } else {
          const next = currentPhrase.slice(0, text.length - 1);
          setText(next);

          if (next.length === 0) {
            setIsDeleting(false);
            setPhraseIndex((value) => (value + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 50 : text === currentPhrase ? 1250 : 95
    );

    return () => window.clearTimeout(timeout);
  }, [isDeleting, phraseIndex, phrases, text]);

  return text;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indicatorRef = useRef<HTMLButtonElement>(null);

  const typewriterText = useTypewriter(rolePhrases);

  const heroQuote = useMemo(
    () => "Designing reliable systems where algorithms, product, and execution converge.",
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chars = "01<>[]{}()$#@%&*+=-:/\\\\";
    const fontSize = 14;

    let animationFrame = 0;
    let columns = 0;
    let drops: number[] = [];

    const setupCanvas = () => {
      const devicePixelRatio = Math.max(1, window.devicePixelRatio || 1);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      context.font = `${fontSize}px var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace`;

      columns = Math.max(1, Math.floor(width / fontSize));
      drops = new Array(columns)
        .fill(0)
        .map(() => Math.floor((Math.random() * height) / fontSize));

      context.fillStyle = "#020612";
      context.fillRect(0, 0, width, height);
    };

    const drawStatic = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(2, 6, 18, 0.96)";
      context.fillRect(0, 0, width, height);

      context.fillStyle = "rgba(122, 227, 215, 0.25)";
      for (let row = 0; row < 12; row += 1) {
        for (let col = 0; col < columns; col += 2) {
          const char = chars[(row + col) % chars.length];
          context.fillText(char, col * fontSize, row * (fontSize + 6) + 24);
        }
      }
    };

    const drawRain = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.fillStyle = "rgba(2, 6, 18, 0.11)";
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < columns; index += 1) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = index * fontSize;
        const y = drops[index] * fontSize;

        const glow = 0.48 + Math.random() * 0.5;
        context.fillStyle = `rgba(122, 227, 215, ${glow.toFixed(2)})`;
        context.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[index] = 0;
        }

        drops[index] += 1;
      }

      animationFrame = window.requestAnimationFrame(drawRain);
    };

    setupCanvas();

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      drawRain();
    }

    const onResize = () => {
      setupCanvas();
      if (prefersReducedMotion) {
        drawStatic();
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="terminal-hero-section relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 pb-24 pt-24 md:px-10"
    >
      <div className="terminal-hero-bg absolute inset-0" />
      <canvas ref={canvasRef} className="terminal-rain-canvas" aria-hidden="true" />
      <div className="terminal-scanlines absolute inset-0" />
      <div className="terminal-vignette absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        <div className="terminal-shell mx-auto max-w-5xl rounded-2xl p-6 sm:p-8 md:p-10">
          <p className="terminal-prompt mb-4 text-left text-xs uppercase tracking-[0.22em] sm:text-sm">
            $ init --profile aditya_raj --mode production
          </p>

          <div className="flex flex-col items-center gap-5">
            <h1 className="terminal-name-plain text-center text-[clamp(2.1rem,8.5vw,4.8rem)] font-black uppercase leading-[0.92] tracking-[0.08em] text-[#defff8]">
              Aditya Raj
            </h1>

            <pre
              aria-hidden="true"
              className="terminal-ascii w-full overflow-x-auto pb-1 text-left text-[0.42rem] leading-[1.08] sm:text-[0.58rem] md:text-[0.74rem]"
            >
              {asciiName.join("\n")}
            </pre>
            <p className="sr-only">Aditya Raj</p>

            <p className="terminal-typewriter text-lg text-[#d7fdf7] sm:text-xl md:text-2xl">
              {typewriterText}
              <span className="terminal-caret" aria-hidden="true">
                _
              </span>
            </p>

            <p className="mx-auto max-w-3xl text-sm text-slate-300 sm:text-base">{heroQuote}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton intensity={0.26} range={120}>
              <a
                href="#projects"
                className="terminal-primary-btn inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em]"
              >
                View Projects
                <ArrowUpRight size={16} />
              </a>
            </MagneticButton>

            <MagneticButton intensity={0.24} range={110}>
              <a
                href="#contact"
                className="terminal-ghost-btn inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em]"
              >
                Get in Touch
                <Mail size={16} />
              </a>
            </MagneticButton>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <MagneticButton key={link.label} intensity={0.2} range={95}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-icon-btn inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-slate-200"
                  >
                    <Icon size={14} />
                    {link.label}
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
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#8ecbc3] transition-colors hover:text-[#d8fff8]"
      >
        <span>Scroll</span>
        <span className="flex h-10 w-7 items-start justify-center rounded-full border border-[#2d6f66] bg-[#06211d]/70 p-1.5">
          <ArrowDown size={13} />
        </span>
      </button>
    </section>
  );
}
