"use client";

import { useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";
import NavbarLogo from "./NavbarLogo";
import { useGSAP } from "@/hooks/useGSAP";

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
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const resumeBtnRef = useRef<HTMLAnchorElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const { gsap, prefersReducedMotion, withContext } = useGSAP(headerRef);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    withContext(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    });
  }, [withContext, gsap]);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, height: 0 },
        {
          opacity: 1,
          height: "auto",
          duration: 0.3,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
          stagger: 0.05,
          ease: "power3.out",
        }
      );
    } else if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        height: 0,
        duration: 0.2,
        ease: "power3.in",
      });
    }
  }, [open, gsap, withContext]);

  useEffect(() => {
    if (prefersReducedMotion || !resumeBtnRef.current) {
      return;
    }

    const btn = resumeBtnRef.current;

    const handleMouseEnter = () => {
      gsap.to(btn, {
        y: -2,
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        y: 0,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    btn.addEventListener("mouseenter", handleMouseEnter);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mouseenter", handleMouseEnter);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [gsap, prefersReducedMotion, withContext]);

  useEffect(() => {
    if (prefersReducedMotion || !menuToggleRef.current) {
      return;
    }

    const btn = menuToggleRef.current;

    const handleMouseEnter = () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const handleMouseDown = () => {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleMouseUp = () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    btn.addEventListener("mouseenter", handleMouseEnter);
    btn.addEventListener("mouseleave", handleMouseLeave);
    btn.addEventListener("mousedown", handleMouseDown);
    btn.addEventListener("mouseup", handleMouseUp);

    return () => {
      btn.removeEventListener("mouseenter", handleMouseEnter);
      btn.removeEventListener("mouseleave", handleMouseLeave);
      btn.removeEventListener("mousedown", handleMouseDown);
      btn.removeEventListener("mouseup", handleMouseUp);
    };
  }, [gsap, prefersReducedMotion, withContext]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 flex justify-center pt-4 transition-all duration-500"
    >
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.32), transparent)",
        }}
      />

      <div
        className={`w-[90%] max-w-[1200px] transition-all duration-500 rounded-2xl ${
          scrolled
            ? "border border-white/[0.08] bg-gradient-to-br from-[#11182d]/90 via-[#040816]/86 to-[#10182d]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_60px_rgba(99,102,241,0.12)]"
            : "border border-white/[0.03] bg-gradient-to-br from-[#0a0e1a]/40 via-[#030711]/30 to-[#0a0e1a]/40 backdrop-blur-md"
        }`}
      >
        <nav className="relative flex h-[70px] items-center justify-between px-8">
          <a
            href="#"
            aria-label="Aditya Raj portfolio home"
            className="group relative flex shrink-0 items-center gap-2"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(99,102,241,0.24)] bg-gradient-to-br from-[#141a32]/76 via-[#081020]/62 to-[#141a32]/76 transition-colors group-hover:border-[rgba(99,102,241,0.42)]">
              <NavbarLogo color="#8ea8c4" />
              <span className="sr-only">Aditya Raj</span>
            </div>
            <span className="hidden text-[0.7rem] font-medium text-slate-500 tracking-widest uppercase sm:block transition-colors group-hover:text-slate-400">
              Portfolio
            </span>
          </a>

          <ul className="hidden items-center gap-5 md:flex lg:gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative px-7 py-3.5 text-sm font-medium text-slate-400 transition-all duration-300 hover:text-white hover:bg-white/[0.05] rounded-lg"
                >
                  {l.label}
                  <span
                    className="absolute bottom-1.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-3/4"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--signature), var(--secondary-accent))",
                    }}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <MagneticButton intensity={0.26} range={120} className="hidden md:inline-flex">
              <a
                ref={resumeBtnRef}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="signature-outline hidden cursor-pointer items-center gap-2 rounded-2xl px-6 py-2.5 text-[0.85rem] font-semibold transition-all duration-300 md:inline-flex group"
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
            </MagneticButton>

            <button
              ref={menuToggleRef}
              onClick={() => setOpen(!open)}
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all hover:border-white/[0.15] hover:bg-white/[0.06] md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <div className="flex flex-col gap-[5px]">
                <span className={`block h-px w-4 bg-slate-400 transition-all duration-300 origin-center ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`block h-px w-4 bg-slate-400 transition-all duration-300 ${open ? "opacity-0 scale-0" : ""}`} />
                <span className={`block h-px w-4 bg-slate-400 transition-all duration-300 origin-center ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 right-0 mt-3 flex justify-center"
        >
          <div className="w-[90%] max-w-[1200px] rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0a0e1a]/95 via-[#030711]/90 to-[#0a0e1a]/95 backdrop-blur-xl">
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((l, i) => (
                <li
                  key={l.href}
                  ref={(el) => { menuItemsRef.current[i] = el; }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-400 transition-all hover:bg-white/[0.06] hover:text-white"
                  >
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ backgroundColor: "rgba(99, 102, 241, 0.56)" }}
                    />
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-white/[0.06] pt-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-white/[0.06]"
                  style={{ color: "var(--signature)" }}
                >
                  Resume ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}