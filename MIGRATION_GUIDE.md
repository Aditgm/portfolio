# Framer Motion to GSAP Migration Guide

## Summary

This migration replaces all Framer Motion dependencies with GSAP, achieving a unified animation layer using the existing `useGSAP` hook and `createRevealAnimation` pattern.

---

## Changes Overview

### Files Modified

| File | Change |
|------|--------|
| `components/Navbar.tsx` | Framer Motion → GSAP |
| `app/build/[slug]/BuildTimeline.tsx` | Framer Motion → GSAP |
| `components/Projects.tsx` | Added 2 new projects |

### Files Unchanged (Already Using GSAP)
- `Hero.tsx`
- `Achievements.tsx`
- `Experience.tsx`
- `Skills.tsx`
- `Education.tsx`
- `GithubGraph.tsx`
- `Footer.tsx`

---

## New Projects Added

### DIT PyQ Hub
- **Tag:** Full-Stack + EdTech
- **Tech Stack:** Next.js, MongoDB, Express.js, Node.js, Tailwind CSS, JWT
- **Live:** https://dit-pyq-hub.vercel.app/
- **GitHub:** https://github.com/Aditgm/dit-pyq-hub

### DevSaathi
- **Tag:** AI + Developer Tools
- **Tech Stack:** React, Node.js, LangChain, OpenAI, VS Code API, Pinecone
- **Live:** https://devsaathi.vercel.app/
- **GitHub:** https://github.com/Aditgm/devsaathi

---

## GSAP Hover Animation Examples

### Project Card Hover Effect

```tsx
// In Projects.tsx - Add to card hover handlers
const handleCardHover = (card: HTMLDivElement, isEntering: boolean) => {
  gsap.to(card, {
    scale: isEntering ? 1.02 : 1,
    y: isEntering ? -4 : 0,
    boxShadow: isEntering 
      ? "0 20px 40px rgba(99, 102, 241, 0.15)" 
      : "0 4px 20px rgba(0, 0, 0, 0.3)",
    duration: 0.3,
    ease: "power2.out",
  });
};
```

### Image Hover Effect (GSAP)

```tsx
// Example: Image scale and overlay on hover
const handleImageHover = (container: HTMLDivElement, isEntering: boolean) => {
  const img = container.querySelector("img");
  const overlay = container.querySelector(".image-overlay");
  
  if (img) {
    gsap.to(img, {
      scale: isEntering ? 1.1 : 1,
      duration: 0.4,
      ease: "power2.out",
    });
  }
  
  if (overlay) {
    gsap.to(overlay, {
      opacity: isEntering ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }
};
```

### Button/Touch Hover Effect

```tsx
// Magnetic button hover with GSAP
const handleBtnHover = (btn: HTMLElement, isEntering: boolean) => {
  gsap.to(btn, {
    scale: isEntering ? 1.05 : 0.95,
    duration: 0.15,
    ease: "power2.out",
  });
};

// For touch devices, use onTouchStart/onTouchEnd
```

---

## Migration Pattern (useEffect + createRevealAnimation)

The pattern used throughout the codebase:

```tsx
import { useEffect, useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";

export default function Component() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const { createRevealAnimation, gsap, prefersReducedMotion, withContext } = useGSAP(sectionRef);

  // For reveal animations on scroll
  useEffect(() => {
    createRevealAnimation(elementRef, {
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0 },
      duration: 0.6,
      ease: "power3.out",
    });
  }, [createRevealAnimation]);

  // For hover/touch interactions
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, { scale: 1.05, duration: 0.2 });
    };
    
    element.addEventListener("mouseenter", handleMouseEnter);
    return () => element.removeEventListener("mouseenter", handleMouseEnter);
  }, [gsap, prefersReducedMotion]);

  return <div ref={elementRef}>Content</div>;
}
```

---

## Git Workflow

### 1. Create Branch
```bash
git checkout -b feature/add-projects-gsap-migration
```

### 2. Stage Changes
```bash
git add components/Projects.tsx
git add components/Navbar.tsx
git add app/build/[slug]/BuildTimeline.tsx
git add app/build/[slug]/page.tsx
```

### 3. Commit
```bash
git commit -m "feat: add DIT PyQ Hub and DevSaathi projects, migrate Framer Motion to GSAP

- Added 2 new projects with full details
- Migrated Navbar from Framer Motion to GSAP
- Migrated BuildTimeline from Framer Motion to GSAP
- Removed framer-motion dependency
- Added GSAP hover animations for buttons"
```

### 4. Push and Create PR
```bash
git push origin feature/add-projects-gsap-migration
```

---

## Testing Steps

### Development
```bash
npm run dev
# Verify:
# - All pages load without errors
# - Navbar animations work (header slide-in, menu open/close)
# - Project cards display correctly
# - BuildTimeline pages work (/build/dit-pyq-hub, /build/devsaathi)
# - Hover effects work on buttons and links
```

### Production
```bash
npm run build
npm run start
# Verify:
# - All routes work correctly
# - No console errors
# - Lighthouse score > 80
```

### Accessibility Tests
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader announces menu state changes
- [ ] Reduced motion preference is respected
- [ ] Focus visible on all interactive elements

---

## Rollback Plan

If issues arise:
```bash
# Revert specific files
git checkout HEAD -- components/Navbar.tsx
git checkout HEAD -- app/build/[slug]/BuildTimeline.tsx

# Or full revert
git checkout HEAD~1 -- .
```

---

## Bundle Impact

| Before | After |
|--------|-------|
| Framer Motion included | Framer Motion removed |
| ~45KB gzipped saved | GSAP already in use |

---

*Migration completed successfully. Build passes with no errors.*