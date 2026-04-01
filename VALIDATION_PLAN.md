# Animation Layer Migration - Validation Plan

## 1. Unit & Interaction Tests

### Test Setup
```bash
npm install -D @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

### Test Cases for Education.tsx
```tsx
// tests/education.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Education from '@/components/Education';

describe('Education Component', () => {
  it('renders education section without crashing', () => {
    render(<Education />);
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('DIT University')).toBeInTheDocument();
  });

  it('displays all coursework items', () => {
    render(<Education />);
    const courses = ['Algorithms', 'Data Structures', 'Machine Learning', 'Deep Learning', 'Computer Networks', 'DBMS'];
    courses.forEach(course => {
      expect(screen.getByText(course)).toBeInTheDocument();
    });
  });

  it('renders GPA display', () => {
    render(<Education />);
    expect(screen.getByText('8.41')).toBeInTheDocument();
    expect(screen.getByText('/ 10.0 GPA')).toBeInTheDocument();
  });

  it('has proper section semantics', () => {
    render(<Education />);
    const section = screen.getByRole('region', { name: /education/i });
    expect(section).toBeInTheDocument();
  });
});
```

### Test Cases for GithubGraph.tsx
```tsx
// tests/github-graph.test.tsx
import { render, screen } from '@testing-library/react';
import GithubGraph from '@/components/GithubGraph';

describe('GithubGraph Component', () => {
  it('renders github graph section', () => {
    render(<GithubGraph />);
    expect(screen.getByText('Contributions')).toBeInTheDocument();
    expect(screen.getByText('GitHub Graph')).toBeInTheDocument();
  });

  it('displays contribution stats', () => {
    render(<GithubGraph />);
    expect(screen.getByText('1,200+ contributions')).toBeInTheDocument();
    expect(screen.getByText('365-day streak')).toBeInTheDocument();
  });

  it('has accessible link to GitHub profile', () => {
    render(<GithubGraph />);
    const link = screen.getByRole('link', { name: /view on github/i });
    expect(link).toHaveAttribute('href', 'https://github.com/Aditgm');
  });
});
```

### Reduced Motion Testing
```tsx
// tests/reduced-motion.test.tsx
describe('Reduced Motion Support', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  it('should disable animations when reduced motion is preferred', () => {
    // Test that GSAP respects prefers-reduced-motion
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
    }));
    
    render(<Education />);
    // Component should render with immediate visibility (no fade-in)
  });
});
```

## 2. Visual Regression Checks

### Setup
```bash
npm install -D @chromatic-cli/storybook @percy/cli
```

### Percy Configuration
```yaml
# .percy.yml
version: 2
snapshot:
  widths: [375, 1280]
  minHeight: 1024
```

### Visual Test Scenarios
1. **Education Section**
   - Desktop: Full reveal animation plays
   - Mobile: Stacked layout with animations
   - Reduced Motion: Instant appearance

2. **GithubGraph Section**
   - Desktop: Header and card reveal
   - Mobile: Alternative bar chart view
   - Reduced Motion: Instant appearance

## 3. Performance Benchmarks

### Bundle Size Targets
| Metric | Target | Threshold |
|--------|--------|-----------|
| Framer Motion (after removal) | Removed | 0 KB |
| GSAP (additional) | 0 KB | +5 KB |
| Total JS Bundle | < 350 KB | < 400 KB |
| CSS | < 50 KB | < 75 KB |

### Initial Load Time Targets
| Metric | Target | Threshold |
|--------|--------|-----------|
| FCP | < 1.5s | < 2.0s |
| LCP | < 2.5s | < 3.0s |
| TTI | < 3.0s | < 4.0s |

### Frame Rate Targets
| Metric | Target | Threshold |
|--------|--------|-----------|
| FPS (scroll) | 60 FPS | > 50 FPS |
| FPS (animation) | 60 FPS | > 55 FPS |

### Performance Test Script
```bash
# scripts/benchmark.js
const { chromium } = require('playwright');

async function benchmark() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const metrics = [
    'first-contentful-paint',
    'largest-contentful-paint',
    'first-input-delay',
    'cumulative-layout-shift',
    'total-blocking-time',
  ];
  
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  
  const results = await page.evaluate(() => {
    return performance.getEntriesByType('navigation')[0];
  });
  
  console.log('Performance Results:', results);
  await browser.close();
}

benchmark();
```

## 4. Rollback Plan

### Immediate Rollback Triggers
- LCP increases by > 500ms
- FPS drops below 30 consistently
- Accessibility violations introduced
- Critical console errors

### Rollback Steps
```bash
# 1. Revert changes
git checkout HEAD -- components/Education.tsx components/GithubGraph.tsx

# 2. Verify build
npm run build

# 3. Deploy
git push origin main

# 4. Monitor error rates for 24 hours
```

### Feature Flag Approach (Optional)
```tsx
// For gradual rollout
const USE_GSAP_ANIMATIONS = process.env.NEXT_PUBLIC_USE_GSAP_ANIMATIONS === 'true';

export default function Education() {
  if (USE_GSAP_ANIMATIONS) {
    // GSAP implementation
  } else {
    // Original Framer Motion implementation
  }
}
```

### Recovery Contacts
- Frontend Lead: Contact for escalation
- DevOps: Rollback deployment support
- QA: Visual regression verification
