"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

type PreloaderProps = {
  onComplete?: () => void;
};

const PRELOADER_STORAGE_KEY = "portfolio:preloader-complete";

function LoaderMesh({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current || reducedMotion) {
      return;
    }

    meshRef.current.rotation.x += delta * 0.65;
    meshRef.current.rotation.y += delta * 0.9;
  });

  return (
    <mesh ref={meshRef} scale={1.1}>
      <torusKnotGeometry args={[0.72, 0.22, 128, 18]} />
      <meshStandardMaterial
        color="#8ea8c4"
        emissive="#4f6f7d"
        emissiveIntensity={0.32}
        roughness={0.34}
        metalness={0.28}
      />
    </mesh>
  );
}

/**
 * Preloader
 *
 * - Runs once on initial layout mount.
 * - Animates logo, counter, curtains, and a small 3D object.
 * - Prevents interaction beneath the overlay until complete.
 * - Respects reduced-motion by shortening and simplifying the sequence.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      return window.sessionStorage.getItem(PRELOADER_STORAGE_KEY) !== "true";
    } catch {
      return true;
    }
  });
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReducedMotion(mediaQuery.matches);

    syncMotionPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncMotionPreference);
      return () => mediaQuery.removeEventListener("change", syncMotionPreference);
    }

    mediaQuery.addListener(syncMotionPreference);
    return () => mediaQuery.removeListener(syncMotionPreference);
  }, []);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !mounted ||
      !rootRef.current ||
      !logoRef.current ||
      !counterRef.current ||
      !curtainTopRef.current ||
      !curtainBottomRef.current
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.style.overflow = "hidden";
    rootRef.current.focus();

    const progressState = { value: 0 };

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        try {
          window.sessionStorage.setItem(PRELOADER_STORAGE_KEY, "true");
        } catch {
          // Ignore storage errors and just continue to the app.
        }
        document.body.style.overflow = "";
        onComplete?.();
        setMounted(false);
      },
    });

    gsap.set(logoRef.current, {
      autoAlpha: 0,
      y: 18,
      scale: 0.92,
    });
    gsap.set(counterRef.current, {
      autoAlpha: 0,
      y: 14,
    });

    timeline
      .to(logoRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: prefersReducedMotion ? 0.25 : 0.55,
      })
      .to(
        counterRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: prefersReducedMotion ? 0.2 : 0.35,
        },
        "-=0.18"
      )
      .to(progressState, {
        value: 100,
        duration: prefersReducedMotion ? 0.45 : 1.35,
        ease: "power1.inOut",
        onUpdate: () => {
          setProgress(Math.round(progressState.value));
        },
      })
      .to(
        logoRef.current,
        {
          scale: prefersReducedMotion ? 1 : 1.04,
          duration: prefersReducedMotion ? 0.12 : 0.22,
          yoyo: !prefersReducedMotion,
          repeat: prefersReducedMotion ? 0 : 1,
          ease: "power1.inOut",
        },
        "-=0.45"
      )
      .to(
        [curtainTopRef.current, curtainBottomRef.current],
        {
          yPercent: (index: number) => (index === 0 ? -100 : 100),
          duration: prefersReducedMotion ? 0.4 : 0.9,
          ease: prefersReducedMotion ? "power2.inOut" : "expo.inOut",
        },
        "+=0.08"
      )
      .to(
        rootRef.current,
        {
          autoAlpha: 0,
          duration: 0.24,
          ease: "power2.out",
        },
        "-=0.16"
      );

    return () => {
      document.body.style.overflow = "";
      timeline.kill();
    };
  }, [mounted, onComplete]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Loading portfolio"
      className="preloader fixed inset-0 z-[140] overflow-hidden"
    >
      <div
        ref={curtainTopRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,#061120,#020617)]"
      />
      <div
        ref={curtainBottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,#061120,#020617)]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,152,184,0.08),transparent_45%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6">
        <div
          ref={logoRef}
          tabIndex={-1}
          className="flex flex-col items-center gap-5 text-center"
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_40px_rgba(125,152,184,0.12)]">
            <Canvas
              camera={{ position: [0, 0, 4], fov: 34 }}
              dpr={reducedMotion ? [1, 1] : [1, 1.3]}
              gl={{
                alpha: true,
                antialias: !reducedMotion,
                powerPreference: "low-power",
                stencil: false,
              }}
              onCreated={({ gl }) => {
                gl.setClearColor(0x000000, 0);
              }}
            >
              <ambientLight intensity={0.72} color="#e2eef8" />
              <pointLight position={[1.8, 2.2, 3]} intensity={4.2} color="#8ea8c4" />
              <LoaderMesh reducedMotion={reducedMotion} />
            </Canvas>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-cyan-300/80">
              Aditya Raj
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              Booting interface
            </h1>
          </div>
        </div>

        <div ref={counterRef} className="flex flex-col items-center gap-3">
          <div
            aria-live="polite"
            aria-atomic="true"
            className="font-mono text-sm uppercase tracking-[0.28em] text-slate-300"
          >
            {progress}%
          </div>
          <div className="h-px w-40 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full bg-gradient-to-r from-blue-400/80 via-cyan-300/85 to-slate-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
