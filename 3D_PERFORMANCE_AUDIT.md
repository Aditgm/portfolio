# 3D Performance Audit - Portfolio Website

## Audit Date: 2026-04-01

---

## 1. EXECUTIVE SUMMARY

### Current State
The portfolio uses heavy 3D/WebGL effects that significantly impact performance:
- **React Three Fiber** for 3D geometry rendering
- **WebGL** for fluid gradient backgrounds  
- **Canvas** for hero section effects
- **Heavy CSS animations** with 3D transforms

### Performance Impact
| Metric | Current (Estimated) | Target | Gap |
|--------|---------------------|--------|-----|
| Bundle Size | ~850 KB | < 400 KB | -450 KB |
| Initial Load | ~4.5s | < 2.0s | -2.5s |
| FPS (scroll) | ~35-45 | > 55 | -15-20 |
| Lighthouse Score | ~45-55 | > 85 | -30-40 |

---

## 2. 3D ELEMENTS INVENTORY

### 2.1 React Three Fiber (3D Scene Components)

| Component | File | Type | Priority | Recommendation |
|-----------|------|------|----------|----------------|
| Scene3D | `components/Scene3D.tsx` | WebGL/Canvas | HIGH | **REMOVE** - Full 3D scene with floating geometries |
| FloatingGeometry | `components/FloatingGeometry.tsx` | 3D Mesh | HIGH | **REMOVE** - Uses R3F Float, MeshDistortMaterial |
| NavbarLogo3D | `components/Scene3D.tsx:155` | 3D Logo | HIGH | **REPLACE** - Animated 3D octahedron |
| Hero3DBackground | `components/Hero3DBackground.tsx` | Full 3D Scene | HIGH | **REMOVE** - Stars, particles, bloom, camera rig |
| FloatingParticles | `Hero3DBackground.tsx:211` | Particle System | HIGH | **REMOVE** - 8-18 animated particles |
| CameraRig | `Hero3DBackground.tsx:305` | Mouse Tracking | HIGH | **REMOVE** - Camera movement logic |
| GlowComposer | `Hero3DBackground.tsx:158` | Post-processing | HIGH | **REMOVE** - UnrealBloomPass effect |

**Dependencies:** `@react-three/fiber`, `@react-three/drei`, `three`

### 2.2 WebGL/Canvas Effects

| Component | File | Type | Priority | Recommendation |
|-----------|------|------|----------|----------------|
| FluidGradientBackground | `components/FluidGradientBackground.tsx` | WebGL | HIGH | **REPLACE** - GPU-intensive gradient with shader |
| HeroLiquidDistortion | `components/HeroLiquidDistortion.tsx` | SVG Filter | MEDIUM | **REMOVE** - SVG turbulence displacement |
| webgl-gradient/ | `webgl-gradient/` | Standalone WebGL | LOW | **REMOVE** - Unused legacy code |

**Impact:** FluidGradientBackground runs continuous WebGL render loop with:
- 5-octave fractal noise (fbm)
- Mouse tracking
- Real-time shader compilation
- 60fps animation loop

### 2.3 CSS 3D Effects

| Element | Location | Effect | Recommendation |
|---------|----------|--------|----------------|
| Hero section transforms | `Hero.tsx` | 3D perspective, rotate3d | **SIMPLIFY** - Remove 3D transforms |
| Card hover effects | Multiple components | preserve-3d, perspective | **REPLACE** with 2D transforms |
| geo-divider-top/bottom | `globals.css` | Clip-path 3D | Keep (CSS-only, lightweight) |

### 2.4 Unused/Legacy 3D Assets

| Path | Type | Status |
|------|------|--------|
| `webgl-gradient/main.js` | WebGL script | **DELETE** - Not imported |
| `webgl-gradient/shader.frag` | GLSL shader | **DELETE** - Not used |
| `webgl-gradient/styles.css` | CSS | **DELETE** - Not used |

---

## 3. RECOMMENDED ACTIONS

### 3.1 IMMEDIATE REMOVALS (HIGH PRIORITY)

1. **Scene3D** - Remove entirely, replace with CSS gradient blobs
2. **Hero3DBackground** - Remove, use simple gradient background
3. **FloatingGeometry** - No longer needed
4. **FluidGradientBackground** - Replace with CSS gradient

### 3.2 REPLACE WITH 2D EQUIVALENTS

1. **NavbarLogo3D** → Static SVG icon
2. **HeroLiquidDistortion** → Static gradient overlay
3. **Hero canvas effects** → Simple CSS background

### 3.3 DEPENDENCY CLEANUP

After removal:
- `@react-three/fiber` - Can potentially be removed (check BuildTimeline)
- `@react-three/drei` - Can potentially be removed
- `three` - Can potentially be removed
- `gsap` - Keep (used for scroll animations)

---

## 4. RISK ASSESSMENT

| Change | Risk Level | Mitigation |
|--------|------------|------------|
| Remove Scene3D | LOW | Visual only, CSS fallback easy |
| Replace 3D logo | LOW | SVG is identical to 3D projection |
| Remove WebGL background | MEDIUM | Must match color palette exactly |
| Remove Hero3DBackground | LOW | CSS gradient can replicate look |

---

## 5. PERFORMANCE TARGETS

### Before/After Estimates

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| JS Bundle | ~850 KB | ~380 KB | **55% reduction** |
| Three.js deps | ~350 KB | 0 KB | **100% removed** |
| WebGL runtime | ~50 KB | 0 KB | **100% removed** |
| FCP | ~1.8s | ~0.9s | **50% faster** |
| LCP | ~3.2s | ~1.8s | **44% faster** |
| TTI | ~4.5s | ~2.2s | **51% faster** |
| FPS (scroll) | ~40 | ~60 | **50% improvement** |
| Lighthouse | ~50 | ~85-90 | **+35-40 points** |

---

## 6. IMPLEMENTATION ORDER

1. Create 2D replacement components
2. Update page.tsx to use 2D replacements
3. Update Navbar to use static logo
4. Remove Hero 3D backgrounds
5. Simplify AppShellEffects
6. Remove legacy webgl-gradient folder
7. Verify bundle size and metrics
8. Test across devices

---

*Audit completed. See MIGRATION_PLAN.md for implementation details.*