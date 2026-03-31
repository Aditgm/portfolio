"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { NavbarLogo3D } from "./Scene3D";

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
      className="fixed inset-x-0 top-0 z-50 flex justify-center pt-4 transition-all duration-500"
    >
      {/* Gradient line at very top */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div
        className={`w-[90%] max-w-[1200px] transition-all duration-500 rounded-2xl ${
          scrolled
            ? "border border-white/[0.08] bg-gradient-to-br from-[#0a0e1a]/90 via-[#030711]/85 to-[#0a0e1a]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_60px_rgba(59,130,246,0.08)]"
            : "border border-white/[0.03] bg-gradient-to-br from-[#0a0e1a]/40 via-[#030711]/30 to-[#0a0e1a]/40 backdrop-blur-md"
        }`}
      >
        <nav className="relative flex h-[70px] items-center justify-between px-8">
        {/* Logo */}
        <a
          href="#"
          aria-label="Aditya Raj portfolio home"
          className="group relative flex shrink-0 items-center gap-2"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/18 bg-gradient-to-br from-[#0b1325]/70 via-[#07101e]/60 to-[#0b1325]/75 transition-colors group-hover:border-blue-400/35">
            <NavbarLogo3D color="#8ea8c4" label="AR" />
            <span className="sr-only">Aditya Raj</span>
          </div>
          <span className="hidden text-[0.7rem] font-medium text-slate-500 tracking-widest uppercase sm:block transition-colors group-hover:text-slate-400">
            Portfolio
          </span>
        </a>

        {/* Desktop links — centered */}
        <ul className="hidden items-center gap-5 md:flex lg:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative px-7 py-3.5 text-sm font-medium text-slate-400 transition-all duration-300 hover:text-white hover:bg-white/[0.05] rounded-lg"
              >
                {l.label}
                {/* Hover underline */}
                <span className="absolute bottom-1.5 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-3/4 rounded-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Resume CTA */}
          <MagneticButton intensity={0.26} range={120} className="hidden md:inline-flex">
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden items-center gap-2 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/[0.08] to-blue-500/[0.04] px-6 py-2.5 text-[0.85rem] font-semibold text-blue-300 transition-all duration-300 hover:border-blue-400/60 hover:bg-gradient-to-r hover:from-blue-500/[0.14] hover:to-blue-500/[0.08] hover:shadow-[0_0_32px_rgba(59,130,246,0.25),0_0_60px_rgba(59,130,246,0.1)] md:inline-flex group"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
              Resume
            </motion.a>
          </MagneticButton>

          {/* Mobile toggle */}
          <motion.button
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all hover:border-white/[0.15] hover:bg-white/[0.06] md:hidden"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span className={`block h-px w-4 bg-slate-400 transition-all duration-300 origin-center ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-px w-4 bg-slate-400 transition-all duration-300 ${open ? "opacity-0 scale-0" : ""}`} />
              <span className={`block h-px w-4 bg-slate-400 transition-all duration-300 origin-center ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </motion.button>
        </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 right-0 mt-3 flex justify-center"
          >
            <div className="w-[90%] max-w-[1200px] rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0a0e1a]/95 via-[#030711]/90 to-[#0a0e1a]/95 backdrop-blur-xl">
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
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-400 transition-all hover:bg-white/[0.06] hover:text-white"
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
                    className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-blue-300 transition-all hover:bg-blue-500/[0.08]"
                  >
                    Resume ↗
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
