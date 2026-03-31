"use client";

import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScopeElement = HTMLElement | SVGElement;
type MaybeRefTarget<T extends Element = ScopeElement> = RefObject<T | null> | T | string | null;

export type RevealAnimationOptions = {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  duration?: number;
  ease?: string;
  scrub?: boolean | number;
  trigger?: gsap.DOMTarget;
  start?: string;
  end?: string;
  once?: boolean;
  markers?: boolean;
  invalidateOnRefresh?: boolean;
  pin?: boolean;
  anticipatePin?: number;
};

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

let pluginsRegistered = false;

function registerGSAPPlugins() {
  if (typeof window === "undefined" || pluginsRegistered) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  pluginsRegistered = true;
}

function resolveTarget<T extends Element>(target: MaybeRefTarget<T>) {
  if (!target) {
    return null;
  }

  if (typeof target === "string") {
    return target;
  }

  if ("current" in target) {
    return target.current;
  }

  return target;
}

export function useGSAP<T extends ScopeElement>(scope?: RefObject<T | null>) {
  const contextRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<Array<() => void>>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    registerGSAPPlugins();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    const context = gsap.context(() => undefined, scope?.current ?? undefined);
    contextRef.current = context;

    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      cleanupRef.current.forEach((cleanup) => cleanup());
      cleanupRef.current = [];
      context.revert();
      contextRef.current = null;
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, [scope]);

  const withContext = useCallback((setup: () => void | (() => void)) => {
    if (typeof window === "undefined") {
      return;
    }

    registerGSAPPlugins();

    const runSetup = () => {
      const cleanup = setup();

      if (typeof cleanup === "function") {
        cleanupRef.current.push(cleanup);
      }
    };

    if (contextRef.current) {
      contextRef.current.add(runSetup);
      return;
    }

    runSetup();
  }, []);

  const createRevealAnimation = useCallback(
    <E extends Element>(target: MaybeRefTarget<E>, options: RevealAnimationOptions = {}) => {
      if (typeof window === "undefined") {
        return null;
      }

      registerGSAPPlugins();

      const resolvedTarget = resolveTarget(target);

      if (!resolvedTarget) {
        return null;
      }

      let animation: gsap.core.Tween | null = null;

      const setupAnimation = () => {
        const shouldScrub = prefersReducedMotion ? false : (options.scrub ?? false);
        const fromVars: gsap.TweenVars = {
          autoAlpha: 0,
          y: 36,
          rotateX: 10,
          scale: 0.98,
          transformPerspective: 1000,
          transformOrigin: "center top",
          force3D: true,
          ...options.from,
        };

        const toVars: gsap.TweenVars = {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: shouldScrub ? undefined : (options.duration ?? 0.85),
          ease: options.ease ?? "power3.out",
          force3D: true,
          overwrite: "auto",
          ...options.to,
          scrollTrigger: {
            trigger: options.trigger ?? resolvedTarget,
            start: options.start ?? "top 82%",
            end: options.end ?? (shouldScrub ? "bottom 60%" : undefined),
            scrub: shouldScrub,
            once: options.once ?? !shouldScrub,
            markers: options.markers,
            invalidateOnRefresh: options.invalidateOnRefresh ?? true,
            pin: options.pin,
            anticipatePin: options.anticipatePin,
          },
        };

        if (prefersReducedMotion) {
          fromVars.y = options.from?.y ?? 12;
          fromVars.rotateX = options.from?.rotateX ?? 0;
          fromVars.scale = options.from?.scale ?? 1;
        }

        animation = gsap.fromTo(resolvedTarget as gsap.TweenTarget, fromVars, toVars);

        return () => {
          animation?.kill();
        };
      };

      if (contextRef.current) {
        contextRef.current.add(() => {
          const cleanup = setupAnimation();

          if (cleanup) {
            cleanupRef.current.push(cleanup);
          }
        });
      } else {
        const cleanup = setupAnimation();

        if (cleanup) {
          cleanupRef.current.push(cleanup);
        }
      }

      return animation;
    },
    [prefersReducedMotion]
  );

  const refresh = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    ScrollTrigger.refresh();
  }, []);

  return {
    gsap,
    ScrollTrigger,
    prefersReducedMotion,
    withContext,
    createRevealAnimation,
    refresh,
  };
}
