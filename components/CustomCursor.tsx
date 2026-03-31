"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type CustomCursorProps = {
  enabled?: boolean;
  smoothing?: number;
  hoverScale?: number;
};

/**
 * CustomCursor
 *
 * Desktop-only decorative cursor with GSAP-driven spring tracking.
 *
 * Hover integration:
 * - `data-cursor-hover="true"` enables hover morphing.
 * - `data-magnetic="true"` enables the stronger hover state used for CTAs.
 * - `data-cursor-theme="light" | "dark"` switches cursor contrast for bright/dark areas.
 *
 * Manual QA:
 * 1. Move across desktop sections and confirm smooth outer-ring lag + inner-dot tracking.
 * 2. Hover CTAs and confirm cursor enlarges and morphs without blocking clicks.
 * 3. Verify cursor hides on touch devices and when reduced motion is enabled.
 */
export default function CustomCursor({
  enabled = true,
  smoothing = 0.16,
  hoverScale = 1.08,
}: CustomCursorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !enabled ||
      !rootRef.current ||
      !outerRef.current ||
      !dotRef.current
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice =
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const root = rootRef.current;
    const outer = outerRef.current;
    const dot = dotRef.current;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const outerPosition = { x: pointer.x, y: pointer.y };
    const dotPosition = { x: pointer.x, y: pointer.y };
    const setOuterX = gsap.quickSetter(outer, "x", "px");
    const setOuterY = gsap.quickSetter(outer, "y", "px");
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    let visible = false;

    const setTheme = (theme: "light" | "dark") => {
      root.dataset.theme = theme;
    };

    const applyIdleState = () => {
      gsap.to(outer, {
        width: "var(--cursor-size)",
        height: "var(--cursor-size)",
        borderRadius: "999px",
        scale: 1,
        opacity: 1,
        duration: 0.24,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const applyHoverState = (isMagnetic: boolean) => {
      gsap.to(outer, {
        width: isMagnetic ? "calc(var(--cursor-size) * 1.34)" : "calc(var(--cursor-size) * 1.16)",
        height: isMagnetic ? "calc(var(--cursor-size) * 1.34)" : "calc(var(--cursor-size) * 1.16)",
        borderRadius: isMagnetic
          ? "calc(var(--cursor-shape-radius) + 4px)"
          : "calc(var(--cursor-shape-radius) + 10px)",
        scale: isMagnetic ? hoverScale + 0.06 : hoverScale,
        opacity: 1,
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(dot, {
        scale: isMagnetic ? 1.08 : 1.03,
        opacity: isMagnetic ? 0.92 : 0.98,
        duration: 0.16,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const updateTargetState = (event: PointerEvent) => {
      const hovered = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest<HTMLElement>("[data-cursor-hover], [data-magnetic]");

      const themeNode = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest<HTMLElement>("[data-cursor-theme]");

      setTheme((themeNode?.dataset.cursorTheme as "light" | "dark") ?? "dark");

      if (hovered) {
        const isMagnetic = hovered.dataset.magnetic === "true";
        applyHoverState(isMagnetic);
        return;
      }

      applyIdleState();
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!visible) {
        visible = true;
        gsap.to(root, {
          autoAlpha: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      updateTargetState(event);
    };

    const handlePointerDown = () => {
      gsap.to(dot, {
        scale: 0.82,
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(outer, {
        scale: 0.92,
        duration: 0.16,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handlePointerUp = () => {
      applyIdleState();
    };

    const handleLeave = () => {
      visible = false;
      gsap.to(root, {
        autoAlpha: 0,
        duration: 0.16,
        ease: "power2.out",
      });
    };

    const tick = () => {
      outerPosition.x += (pointer.x - outerPosition.x) * smoothing;
      outerPosition.y += (pointer.y - outerPosition.y) * smoothing;
      dotPosition.x += (pointer.x - dotPosition.x) * Math.min(smoothing * 1.85, 0.38);
      dotPosition.y += (pointer.y - dotPosition.y) * Math.min(smoothing * 1.85, 0.38);

      setOuterX(outerPosition.x);
      setOuterY(outerPosition.y);
      setDotX(dotPosition.x);
      setDotY(dotPosition.y);
    };

    gsap.ticker.add(tick);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave, { passive: true });
    window.addEventListener("blur", handleLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
    };
  }, [enabled, hoverScale, smoothing]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-theme="dark"
      className="custom-cursor pointer-events-none fixed inset-0 z-[120] hidden opacity-0 md:block"
    >
      <div ref={outerRef} className="custom-cursor__outer" />
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
