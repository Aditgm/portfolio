"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

export type MagneticButtonProps = {
  children: ReactNode;
  intensity?: number;
  range?: number;
  ease?: string;
  className?: string;
  onHover?: () => void;
  onLeave?: () => void;
};

/**
 * MagneticButton
 *
 * Usage:
 * <MagneticButton intensity={0.32} range={140}>
 *   <a href="/resume.pdf">Resume</a>
 * </MagneticButton>
 *
 * Notes:
 * - Preserves the wrapped child's native behavior and accessibility.
 * - Adds `data-magnetic` and `data-cursor-hover` for cursor integration.
 * - On reduced motion or touch devices, the wrapper degrades to a static container.
 */
export default function MagneticButton({
  children,
  intensity = 0.28,
  range = 140,
  ease = "elastic.out(1, 0.45)",
  className = "",
  onHover,
  onLeave,
}: MagneticButtonProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current || !contentRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice =
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const root = rootRef.current;
    const content = contentRef.current;

    const xTo = gsap.quickTo(content, "x", {
      duration: 0.22,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(content, "y", {
      duration: 0.22,
      ease: "power3.out",
    });

    const handleMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > range) {
        xTo(0);
        yTo(0);
        return;
      }

      const strength = (1 - distance / range) * intensity;
      xTo(deltaX * strength);
      yTo(deltaY * strength);
    };

    const handleEnter = () => {
      onHover?.();
      gsap.to(content, {
        scale: 1.015,
        duration: 0.2,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleLeave = () => {
      onLeave?.();
      gsap.to(content, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease,
        overwrite: "auto",
      });
    };

    root.addEventListener("mousemove", handleMove);
    root.addEventListener("mouseenter", handleEnter);
    root.addEventListener("mouseleave", handleLeave);

    return () => {
      root.removeEventListener("mousemove", handleMove);
      root.removeEventListener("mouseenter", handleEnter);
      root.removeEventListener("mouseleave", handleLeave);
    };
  }, [ease, intensity, onHover, onLeave, range]);

  return (
    <div
      ref={rootRef}
      data-cursor-hover="true"
      data-magnetic="true"
      className={`inline-flex ${className}`}
    >
      <div ref={contentRef} className="inline-flex will-change-transform">
        {children}
      </div>
    </div>
  );
}
