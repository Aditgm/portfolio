# Test Plan - 3D to 2D Migration

## Test Overview

This test plan validates the migration from 3D/WebGL effects to lightweight 2D alternatives.

---

## 1. MANUAL TEST CHECKLIST

### Desktop Browsers
| Test | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| Page loads without crash | ☐ | ☐ | ☐ | ☐ |
| No console errors | ☐ | ☐ | ☐ | ☐ |
| All sections render | ☐ | ☐ | ☐ | ☐ |
| Navigation works | ☐ | ☐ | ☐ | ☐ |
| Animations smooth (60fps) | ☐ | ☐ | ☐ | ☐ |
| Hover states work | ☐ | ☐ | ☐ | ☐ |
| Mobile menu works | ☐ | ☐ | ☐ | ☐ |

### Mobile Devices
| Test | iOS Safari | Android Chrome |
|------|------------|-----------------|
| Page loads | ☐ | ☐ |
| No crash | ☐ | ☐ |
| Touch navigation | ☐ | ☐ |
| Responsive layout | ☐ | ☐ |

---

## 2. VISUAL VERIFICATION

### Sections to Check
1. **Hero** - Terminal shell, ASCII art, buttons visible
2. **Navbar** - Logo, links, mobile menu
3. **Achievements** - Carousel, stats rings
4. **Experience** - Timeline, cards
5. **Projects** - Grid, hover effects
6. **Skills** - Tags, categories
7. **Education** - Card, GPA display
8. **GithubGraph** - Calendar, stats
9. **Footer** - Contact, links

### Visual Differences (Expected)
| Element | Before | After |
|---------|--------|-------|
| Background | WebGL animated gradient | CSS static gradient |
| Ambient 3D shapes | Floating 3D meshes | Static blur blobs |
| Navbar logo | Rotating 3D octahedron | Static SVG |
| Liquid overlay | R3F shader (transitions) | Removed |

---

## 3. PERFORMANCE BENCHMARKS

### Target Metrics
| Metric | Target | Threshold |
|--------|--------|-----------|
| FCP | < 1.0s | < 1.5s |
| LCP | < 2.0s | < 2.5s |
| TTI | < 2.5s | < 3.0s |
| FPS (scroll) | 60 | > 50 |
| Lighthouse | > 85 | > 75 |

### How to Measure
```bash
# Lighthouse
npx lighthouse http://localhost:3000 --view

# Chrome DevTools
1. Open DevTools > Performance
2. Record scroll from top to bottom
3. Check FPS graph

# Bundle size
npm run build
# Check .next/static folder size
```

---

## 4. ACCESSIBILITY TESTS

### Reduced Motion
1. Enable "Reduce motion" in OS settings
2. Visit page
3. Verify:
   - No floating animations
   - No gradient transitions
   - Static background only
   - Page still fully functional

### Screen Readers
1. Navigate with keyboard (Tab, Arrow keys)
2. Check all interactive elements accessible
3. Verify no content hidden from SR

---

## 5. AUTOMATED TESTS

### Unit Tests
```bash
# Run existing tests
npm test

# Add specific component tests
# tests/simple-background.test.tsx
import { render, screen } from '@testing-library/react';
import SimpleBackground from '@/components/SimpleBackground';

test('renders without crashing', () => {
  render(<SimpleBackground />);
  expect(screen.getByRole('presentation')).toBeInTheDocument();
});
```

### Visual Regression (Optional)
```bash
# Install Percy or Chromatic
npm install -D @percy/cli

# Run visual tests
percy snapshot http://localhost:3000
```

---

## 6. ROLLBACK PROCEDURE

If critical issues found:

### Step 1: Immediate Revert
```bash
# Revert all changes
git checkout HEAD~1 -- .

# Or specific files
git checkout HEAD -- app/page.tsx
git checkout HEAD -- components/Navbar.tsx
git checkout HEAD -- components/AppShellEffects.tsx
```

### Step 2: Verify
```bash
npm run build
npm run dev
```

### Step 3: Report
- Document what failed
- Capture console errors
- Note browser/OS version

---

## 7. SIGN-OFF CHECKLIST

| Check | Status | Notes |
|-------|--------|-------|
| All desktop browsers pass | ☐ | |
| All mobile browsers pass | ☐ | |
| FCP < 1.5s | ☐ | |
| LCP < 2.5s | ☐ | |
| TTI < 3s | ☐ | |
| Lighthouse > 75 | ☐ | |
| Reduced motion works | ☐ | |
| Keyboard navigation works | ☐ | |
| No console errors | ☐ | |
| Build succeeds | ☐ | |

---

*Test plan complete. Execute tests before and after deployment.*