# Project Tile Transition Fix - Implementation Guide

## Current Issues Identified

1. **Scroll Position** - Page scrolls away during modal view; returning doesn't restore original position
2. **Grid Jump** - When closing, the card jumps or disappears abruptly
3. **No Continuity** - The card doesn't maintain its identity during transition
4. **Mobile Issues** - Touch interactions don't feel smooth

---

## Root Cause Analysis

Looking at `Projects.tsx` lines 265-318, the `closeProject` function:
1. Animates modal content out
2. Sets `activeProject` to null immediately
3. Runs `Flip.from()` to animate to source card

**Problems:**
- `setActiveProject(null)` happens before animation completes
- No scroll position restoration
- `absolute: true` in Flip causes grid reflow
- No handling for different viewport sizes

---

## Solution: Improved Shared Element Transition

### Implementation (Projects.tsx improvements)

```tsx
// Add these refs for scroll management
const scrollPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
const gridPositionRef = useRef<DOMRect | null>(null);

// Modified openProject function
const openProject = useCallback(
  (project: ProjectItem) => {
    if (activeProject || isAnimating) return;

    const sourceCard = cardRefs.current[project.slug];
    if (!sourceCard) return;

    // Save scroll position before opening
    scrollPositionRef.current = {
      x: window.scrollX,
      y: window.scrollY,
    };

    // Capture source card position for smooth return
    const cardRect = sourceCard.getBoundingClientRect();
    gridPositionRef.current = {
      left: cardRect.left,
      top: cardRect.top,
      width: cardRect.width,
      height: cardRect.height,
      ...cardRect
    } as DOMRect;

    // Use GSAP Flip for morphing animation
    if (!prefersReducedMotion) {
      gsap.registerPlugin(Flip);
      
      // Get initial state of source card
      openFlipStateRef.current = {
        state: Flip.getState(sourceCard, {
          props: "x,y,scale,borderRadius,opacity",
        }),
        slug: project.slug,
      };
      
      setIsAnimating(true);
    }

    // Lock body scroll, maintain current scroll position
    document.body.style.overflow = 'hidden';
    setActiveProject(project);
  },
  [activeProject, gsap, isAnimating, prefersReducedMotion]
);

// Improved closeProject function
const closeProject = useCallback(() => {
  if (!activeProject || isAnimating) return;

  const sourceCard = cardRefs.current[activeProject.slug];
  const overlay = overlayRef.current;
  const modalCard = modalCardRef.current;
  const modalContent = modalContentRef.current;

  if (prefersReducedMotion || !sourceCard || !modalCard) {
    setActiveProject(null);
    document.body.style.overflow = '';
    return;
  }

  gsap.registerPlugin(Flip);
  setIsAnimating(true);

  // Capture modal state for flip
  const modalState = Flip.getState(modalCard, {
    props: "x,y,scale,borderRadius,opacity,position",
  });

  // 1. Fade out overlay and content first
  const timeline = gsap.timeline({
    onComplete: () => {
      setActiveProject(null);
      
      // 2. Animate from modal to source card position
      requestAnimationFrame(() => {
        // Position the modal at the source card's grid position
        if (gridPositionRef.current) {
          gsap.set(modalCard, {
            position: 'fixed',
            left: gridPositionRef.current.left,
            top: gridPositionRef.current.top,
            width: gridPositionRef.current.width,
            height: gridPositionRef.current.height,
            x: 0,
            y: 0,
            scale: 1,
          });
        }

        // Animate back to original position
        Flip.from(modalState, {
          targets: sourceCard,
          absolute: false, // Keep in grid flow
          duration: 0.45,
          ease: "power3.inOut",
          onComplete: () => {
            setIsAnimating(false);
            // Restore scroll position
            window.scrollTo(scrollPositionRef.current.x, scrollPositionRef.current.y);
            document.body.style.overflow = '';
            gridPositionRef.current = null;
          },
          // Preserve these properties during transition
          props: "x,y,scale,borderRadius,opacity,width,height,left,top",
        });
      });
    },
  });

  // Smooth fade out
  if (modalContent) {
    timeline.to(modalContent, {
      opacity: 0,
      y: 10,
      duration: 0.15,
      ease: "power2.in",
    }, 0);
  }

  if (overlay) {
    timeline.to(overlay, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    }, 0);
  }

}, [activeProject, gsap, isAnimating, prefersReducedMotion]);
```

---

## Alternative: CSS-Based Solution (Simpler)

If GSAP Flip is causing issues, use a pure CSS approach:

```tsx
// Add CSS class for smooth transitions
const closeProject = useCallback(() => {
  const sourceCard = cardRefs.current[activeProject?.slug || ''];
  const modalCard = modalCardRef.current;
  
  if (!sourceCard || !modalCard || !activeProject) return;

  // Get positions
  const sourceRect = sourceCard.getBoundingClientRect();
  const modalRect = modalCard.getBoundingClientRect();

  // Calculate transform to move modal to source position
  const scaleX = sourceRect.width / modalRect.width;
  const scaleY = sourceRect.height / modalRect.height;
  const translateX = sourceRect.left - modalRect.left;
  const translateY = sourceRect.top - modalRect.top;

  // Apply transform animation
  gsap.to(modalCard, {
    scaleX,
    scaleY,
    x: translateX,
    y: translateY,
    borderRadius: '0.5rem', // Match card border radius
    duration: 0.35,
    ease: "power3.inOut",
    onComplete: () => {
      setActiveProject(null);
      gsap.set(modalCard, { clearProps: 'all' });
    }
  });
  
  // Fade overlay
  gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
}, [activeProject]);
```

---

## Mobile Optimization

```tsx
// Add responsive configuration
const getTransitionConfig = () => {
  const isMobile = window.innerWidth < 768;
  
  return {
    duration: isMobile ? 0.3 : 0.45,
    ease: "power3.inOut",
    stagger: 0,
    // On mobile, use simpler animation
    ...(isMobile && {
      duration: 0.25,
      ease: "power2.out",
    }),
  };
};

// Handle touch interactions
useEffect(() => {
  const handleTouchStart = () => {
    // Disable scroll when modal is open on mobile
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    }
  };
  
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  return () => document.removeEventListener('touchstart', handleTouchStart);
}, [activeProject]);
```

---

## Reduced Motion Accessibility

```tsx
// Respect prefers-reduced-motion
const closeProject = useCallback(() => {
  if (prefersReducedMotion) {
    // Instant transition without animation
    setActiveProject(null);
    document.body.style.overflow = '';
    return;
  }
  
  // ... normal animation logic
}, [prefersReducedMotion, /* other deps */]);

// Add to component
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handleChange = (e: MediaQueryListEvent) => {
    if (e.matches && activeProject) {
      setActiveProject(null);
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, [activeProject]);
```

---

## Testing Plan

### Manual Test Checklist

| Test | Desktop | Mobile | Pass |
|------|---------|--------|------|
| Click project card → modal opens | ☐ | ☐ | ☐ |
| Modal content visible and correct | ☐ | ☐ | ☐ |
| Close modal → card returns smoothly | ☐ | ☐ | ☐ |
| Scroll position preserved on return | ☐ | ☐ | ☐ |
| No grid jump/flicker | ☐ | ☐ | ☐ |
| Works with reduced motion enabled | ☐ | ☐ | ☐ |
| Keyboard navigation works | ☐ | ☐ | ☐ |
| Escape key closes modal | ☐ | ☐ | ☐ |

### Automated Tests

```tsx
// tests/projects-transition.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Projects from '@/components/Projects';

describe('Project Transition', () => {
  it('opens project modal on card click', async () => {
    render(<Projects />);
    
    // Find first project card
    const firstCard = screen.getAllByRole('button')[0];
    fireEvent.click(firstCard);
    
    // Check modal is visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes modal on close button click', async () => {
    render(<Projects />);
    
    // Open then close
    const firstCard = screen.getAllByRole('button')[0];
    fireEvent.click(firstCard);
    
    const closeBtn = screen.getByLabelText('Close project details');
    fireEvent.click(closeBtn);
    
    // Modal should be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('respects reduced motion preference', () => {
    // Mock reduced motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
    
    render(<Projects />);
    // Verify no GSAP animations are triggered
  });
});
```

---

## Acceptance Criteria

### Visual
- [ ] Card morphs into modal smoothly on open
- [ ] Modal returns to exact grid position on close
- [ ] No visible jump or flicker during transition
- [ ] Animation feels continuous and polished

### Functional
- [ ] Scroll position restored after closing modal
- [ ] Works on Chrome, Firefox, Safari (desktop + mobile)
- [ ] Escape key closes modal
- [ ] Click outside modal closes it

### Accessibility
- [ ] Respects `prefers-reduced-motion`
- [ ] Focus trapped in modal when open
- [ ] Screen reader announces modal state
- [ ] Keyboard navigable (Tab, Escape, Enter)

### Performance
- [ ] 60fps during transitions
- [ ] No layout shift during animation
- [ ] Images load before animation completes

---

## Quick Fix (Minimal Changes)

If you want minimal changes to fix the immediate issue, add this to closeProject:

```tsx
// In closeProject function, change:
setActiveProject(null); // Move this INSIDE onComplete

// NEW CODE:
requestAnimationFrame(() => {
  Flip.from(state, {
    targets: sourceCard,
    duration: 0.58,
    ease: "power2.inOut",
    onComplete: () => {
      setIsAnimating(false);
      // Restore scroll AFTER animation
      window.scrollTo({
        top: scrollPositionRef.current.y,
        behavior: 'auto' // instant, not smooth
      });
    },
  });
});

// Delay setActiveProject until after flip animation
gsap.delayedCall(0.58, () => setActiveProject(null));
```

This keeps the existing Flip logic but ensures scroll position is restored and the modal state change is properly sequenced.