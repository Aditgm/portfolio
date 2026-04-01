# Animation Layer Migration Guide

## Summary

This PR migrates the animation layer from Framer Motion to GSAP for the `Education` and `GithubGraph` components, following the existing pattern established by `Hero`, `Achievements`, `Experience`, `Projects`, `Skills`, and `Footer`.

## Motivation

### Current State
- **7 components** use GSAP with `useGSAP` hook and `createRevealAnimation` pattern
- **2 components** (`Education`, `GithubGraph`) use Framer Motion
- **1 component** (`Navbar`) uses Framer Motion (AnimatePresence for mobile menu)
- **1 component** (`BuildTimeline`) uses Framer Motion (in `/app/build` route)

### Why GSAP?
1. **Unified Animation Layer**: Single library for all scroll-triggered reveal animations
2. **Bundle Size**: Framer Motion (~45KB gzipped) vs GSAP core (~10KB) + ScrollTrigger (~7KB)
3. **Performance**: GSAP ScrollTrigger provides more efficient intersection handling
4. **Consistency**: All sections use identical reveal patterns, easing, and timing

## Changes

### Components Migrated

#### Education.tsx
- Removed: `import { motion } from "framer-motion"`
- Added: `import { useGSAP } from "@/hooks/useGSAP"`
- Replaced `motion.div` with regular `div` with refs
- Used `createRevealAnimation()` for header and card
- Added staggered reveal for course tags with `withContext()`
- Preserved exact timing: 0.6s duration, `power3.out` easing
- Preserved stagger: 0.04s delay per course item

#### GithubGraph.tsx
- Removed: `import { motion } from "framer-motion"`
- Added: `import { useGSAP } from "@/hooks/useGSAP"`
- Replaced `motion.div` with regular `div` with refs
- Used `createRevealAnimation()` for header (0.6s) and card (0.6s + 0.1s delay)
- Maintained parity with original animation timing

### Timing & Easing Parity
| Component | Original | Migrated |
|-----------|----------|----------|
| Education Header | 0.6s, ease [0.22, 1, 0.36, 1] | 0.6s, power3.out |
| Education Card | 0.6s, ease [0.22, 1, 0.36, 1] | 0.6s, power3.out |
| Course Tags | 0.04s stagger | 0.04s stagger |
| GithubGraph Header | 0.6s, ease [0.22, 1, 0.36, 1] | 0.6s, power3.out |
| GithubGraph Card | 0.6s + 0.1s delay | 0.6s + 0.1s delay |

### Accessibility
- **Reduced Motion**: Respected via `prefersReducedMotion` from `useGSAP` hook
- **Screen Readers**: ARIA regions preserved, no animation-related announcements
- **Keyboard Navigation**: Fully functional

## Navbar Assessment

### Current Usage
- `motion.header`: Initial load animation (slide down + fade in)
- `AnimatePresence`: Mobile menu open/close transitions
- `motion.button`: Hover/tap effects on menu toggle
- `motion.a`: Hover effects on resume button

### Assessment结论: **Keep as-is**

#### Rationale
1. **Animation Type**: These are UI interactions (not scroll-triggered reveals)
   - Initial load animation: One-time, not scroll-dependent
   - Mobile menu: State-based, not scroll-triggered
   - Button hover effects: Micro-interactions

2. **AnimatePresence**: GSAP doesn't have equivalent to Framer Motion's `AnimatePresence` for conditional rendering with exit animations. Would require significant refactoring.

3. **Risk/Benefit Ratio**
   - Migration effort: Medium-High
   - Bundle savings: ~2KB (negligible)
   - Consistency gain: Low (different animation types)
   - Risk: High (potential UI regressions)

4. **Performance**: Navbar animations are negligible in impact (once on load, negligible for button hovers)

### Recommendation
Keep Navbar on Framer Motion. The UI interaction animations (menu, button effects) are fundamentally different from scroll-triggered reveal animations and don't benefit from the unified GSAP layer.

## Remaining Framer Motion Usage
- `Navbar.tsx`: UI interactions (keep)
- `BuildTimeline.tsx` (in `/app/build`): Not in scope for this PR

## Testing

### Validation Plan
See `VALIDATION_PLAN.md` for:
- Unit tests for component rendering
- Visual regression checks
- Performance benchmarks
- Rollback procedures

### Quick Verification
```bash
# Run lint
npm run lint

# Build check
npm run build

# Local dev verification
npm run dev
```

## Acceptance Criteria

- [x] Education.tsx uses GSAP with `useGSAP` hook
- [x] GithubGraph.tsx uses GSAP with `useGSAP` hook
- [x] Framer Motion imports removed from both components
- [x] Animation timing matches original (0.6s duration, matching easing)
- [x] Course tags have staggered reveal (0.04s)
- [x] Reduced motion is respected
- [x] No console errors
- [x] Lint passes
- [x] Build succeeds
- [x] Navbar remains on Framer Motion with documented rationale

## Bundle Impact

| Before | After | Change |
|--------|-------|--------|
| Framer Motion used by 2 components | Framer Motion used by 2 components | No change |
| GSAP ScrollTrigger | GSAP ScrollTrigger | No change |
| Animation libs in bundle | Same | No change |

Note: Framer Motion remains in bundle due to Navbar. Full removal would require Navbar migration (not recommended in this PR).

## Related Files

- `hooks/useGSAP.ts` - Existing hook (unchanged)
- `components/Hero.tsx` - Reference GSAP implementation
- `components/Experience.tsx` - Reference GSAP with stagger
- `components/Achievements.tsx` - Reference GSAP with multiple reveals

---

**PR Type**: Refactor
**Breaking Changes**: None
**Depends On**: None
