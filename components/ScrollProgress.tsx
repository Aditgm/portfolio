"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !barRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      barRef.current!.style.width = `${scrollPercent}%`;
      
      // Update ARIA
      containerRef.current!.setAttribute("aria-valuenow", Math.round(scrollPercent).toString());
    };

    // Use requestAnimationFrame for smooth updates
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="scroll-progress-container" 
      role="progressbar" 
      aria-valuenow={0} 
      aria-valuemin={0} 
      aria-valuemax={100} 
      aria-label="Page scroll progress"
    >
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}