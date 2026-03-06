"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
        ? "border-b border-white/[0.06] bg-[#030711]/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
        : "bg-transparent"
        }`}
    >
      {/* Gradient line at very top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <nav className="relative mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6 md:px-12 lg:px-16">
        {/* Logo */}
        <a href="#" className="group relative flex items-center gap-2 shrink-0 md:w-60 lg:w-64">
          <div className="relative flex h-9 w-9 items-center justify-center">
            {/* Rotating geometric accent */}
            <div
              className="absolute inset-0 rounded-lg border border-blue-500/20"
              style={{ animation: "geo-rotate 12s linear infinite" }}
            />
            <div
              className="absolute inset-1 rounded-md border border-cyan-500/15"
              style={{ animation: "geo-rotate-reverse 8s linear infinite" }}
            />
            <span className="relative text-sm font-bold text-white tracking-tight">
              AR
            </span>
          </div>
          <span className="hidden text-[0.7rem] font-medium text-slate-500 tracking-widest uppercase sm:block">
            Portfolio
          </span>
        </a>

        {/* Desktop links — centered */}
        <ul className="hidden items-center gap-1 md:absolute md:left-1/2 md:flex md:-translate-x-1/2 lg:gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative px-6 py-3 text-[0.8rem] font-medium text-slate-400 transition-colors hover:text-white"
              >
                {l.label}
                {/* Hover underline */}
                <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-3/4" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 md:w-60 md:justify-end lg:w-64">
          {/* Resume CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/[0.06] px-5 py-2.5 text-[0.8rem] font-semibold text-blue-400 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] md:inline-flex"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
            Resume
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] transition-colors hover:bg-white/[0.04] md:hidden"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span className={`block h-px w-4 bg-slate-400 transition-all duration-300 origin-center ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-px w-4 bg-slate-400 transition-all duration-300 ${open ? "opacity-0 scale-0" : ""}`} />
              <span className={`block h-px w-4 bg-slate-400 transition-all duration-300 origin-center ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/[0.06] bg-[#030711]/95 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-400 transition-all hover:bg-white/[0.04] hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-blue-500/40" />
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-2 border-t border-white/[0.06] pt-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/[0.06]"
                >
                  Resume ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
