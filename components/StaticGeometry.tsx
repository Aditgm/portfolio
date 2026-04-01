"use client";

import { CSSProperties, useMemo, useSyncExternalStore } from "react";

type StaticGeometryProps = {
  id: string;
  color: string;
  position: [number, number];
  size: number;
  blur?: number;
  opacity?: number;
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

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453123;
  return x - Math.floor(x);
}

export type StaticGeometryAccent = StaticGeometryProps;

export default function StaticGeometry({
  accents = [],
  className = "",
}: {
  accents?: StaticGeometryAccent[];
  className?: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const accentElements = useMemo(() => {
    if (prefersReducedMotion || accents.length === 0) {
      return null;
    }

    return accents.map((accent, index) => {
      const delay = seededRandom(index * 7) * 4;
      const duration = 8 + seededRandom(index * 11) * 4;
      
      return (
        <div
          key={accent.id}
          className="static-geometry-blob"
          style={{
            "--blob-color": accent.color,
            "--blob-size": `${accent.size * 80}px`,
            "--blob-blur": `${accent.blur ?? 120}px`,
            "--blob-opacity": accent.opacity ?? 0.15,
            left: `calc(50% + ${accent.position[0] * 10}%)`,
            top: `calc(50% + ${accent.position[1] * 10}%)`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          } as CSSProperties}
        />
      );
    });
  }, [accents, prefersReducedMotion]);

  if (!accentElements) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {accentElements}
    </div>
  );
}