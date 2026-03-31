"use client";

import { RefObject, useEffect, useId, useRef } from "react";

type HeroLiquidDistortionProps = {
  containerRef?: RefObject<HTMLElement | null>;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function HeroLiquidDistortion({ containerRef }: HeroLiquidDistortionProps) {
  const blobRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const filterId = `hero-liquid-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const blob = blobRef.current;
    const ring = ringRef.current;
    const turbulence = turbulenceRef.current;
    const displacement = displacementRef.current;

    if (!blob || !ring || !turbulence || !displacement) {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = reducedMotionQuery.matches;

    let rafId = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.38;
    let x = targetX;
    let y = targetY;
    let active = false;

    const getRect = () => {
      const rect = containerRef?.current?.getBoundingClientRect();
      if (rect) {
        return rect;
      }

      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    const setPointer = (clientX: number, clientY: number) => {
      const rect = getRect();
      const localX = clientX - rect.left;
      const localY = clientY - rect.top;

      targetX = clamp(localX, 0, rect.width);
      targetY = clamp(localY, 0, rect.height);
      active = true;
    };

    const onPointerMove = (event: PointerEvent) => {
      setPointer(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      setPointer(touch.clientX, touch.clientY);
    };

    const onPointerLeave = () => {
      const rect = getRect();
      targetX = rect.width * 0.5;
      targetY = rect.height * 0.38;
      active = false;
    };

    const tick = (time: number) => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;

      const speed = Math.min(1, Math.hypot(targetX - x, targetY - y) / 42);
      const seconds = time * 0.001;

      blob.style.left = `${x}px`;
      blob.style.top = `${y}px`;
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;

      if (prefersReducedMotion) {
        displacement.setAttribute("scale", "8");
        turbulence.setAttribute("baseFrequency", "0.004 0.008");
      } else {
        const pulse = active ? 1 : 0.62;
        const baseX = 0.0048 + speed * 0.006 + Math.sin(seconds * 0.8) * 0.0008;
        const baseY = 0.0095 + speed * 0.008 + Math.cos(seconds * 0.6) * 0.0012;

        turbulence.setAttribute("baseFrequency", `${baseX.toFixed(4)} ${baseY.toFixed(4)}`);
        displacement.setAttribute("scale", `${12 + pulse * 16 + speed * 18}`);

        blob.style.transform = `translate(-50%, -50%) scale(${1 + speed * 0.22})`;
        ring.style.transform = `translate(-50%, -50%) scale(${1 + speed * 0.35})`;
        ring.style.opacity = `${0.2 + speed * 0.4}`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const targetNode = containerRef?.current ?? window;
    targetNode.addEventListener("pointermove", onPointerMove as EventListener, { passive: true });
    targetNode.addEventListener("pointerleave", onPointerLeave as EventListener);
    targetNode.addEventListener("touchmove", onTouchMove as EventListener, { passive: true });

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      targetNode.removeEventListener("pointermove", onPointerMove as EventListener);
      targetNode.removeEventListener("pointerleave", onPointerLeave as EventListener);
      targetNode.removeEventListener("touchmove", onTouchMove as EventListener);
    };
  }, [containerRef]);

  return (
    <div className="hero-liquid-root">
      <svg aria-hidden="true" className="hero-liquid-svg-defs" focusable="false">
        <defs>
          <filter id={filterId} x="-18%" y="-18%" width="136%" height="136%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.006 0.012"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="hero-liquid-surface" />
      <div className="hero-liquid-distort-field" style={{ filter: `url(#${filterId})` }}>
        <div ref={blobRef} className="hero-liquid-blob" />
        <div ref={ringRef} className="hero-liquid-ring" />
      </div>
    </div>
  );
}
