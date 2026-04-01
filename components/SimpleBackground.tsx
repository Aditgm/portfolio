"use client";

import { CSSProperties, useSyncExternalStore } from "react";

type SimpleBackgroundProps = {
  className?: string;
};

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

const usePrefersReducedMotion = () => {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
};

const gradientStyles: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 0,
  pointerEvents: "none",
  background: `
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 80% 60%, rgba(45, 212, 191, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse 50% 30% at 20% 80%, rgba(124, 58, 237, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse 100% 60% at 50% 100%, rgba(2, 6, 23, 0.95) 0%, rgba(7, 20, 39, 0.9) 50%, rgba(15, 23, 42, 1) 100%)
  `,
};

const staticStyles: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 0,
  pointerEvents: "none",
  background: "linear-gradient(180deg, #020617 0%, #071427 45%, #0f172a 100%)",
};

export default function SimpleBackground({ className = "" }: SimpleBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={className} style={prefersReducedMotion ? staticStyles : gradientStyles} aria-hidden="true">
      {!prefersReducedMotion && (
        <div
          className="simple-bg-noise"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
    </div>
  );
}