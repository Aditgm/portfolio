# DITPYQ Hub — Production-Grade Project Entry

---

## Project Title
**DITPYQ Hub** — Interactive Question Bank Platform for DIT University

---

## Project Overview
A full-stack MERN educational platform enabling 15+ students to access 5,000+ previous year questions across 30+ subjects. Features real-time synchronization, secure authentication, PDF export, and progress analytics. Deployed on DigitalOcean with zero-downtime CI/CD.

---

## Tech Stack

| Technology | URL |
|------------|-----|
| React 18 | https://react.dev |
| TypeScript | https://www.typescriptlang.org |
| Next.js 14 | https://nextjs.org |
| Node.js | https://nodejs.org |
| Express.js | https://expressjs.com |
| MongoDB | https://www.mongodb.com |
| MongoDB Atlas Search | https://www.mongodb.com/products/atlas/search |
| TailwindCSS | https://tailwindcss.com |
| JWT (JSON Web Tokens) | https://jwt.io |
| jsPDF | https://github.com/parallax/jsPDF |
| html2canvas | https://html2canvas.hertzen.com |
| Vercel (Frontend) | https://vercel.com |
| DigitalOcean (Backend) | https://digitalocean.com |
| Ubuntu 22.04 | https://ubuntu.com |
| GitHub Actions | https://github.com/features/actions |
| PM2 | https://pm2.keymetrics.io |
| Nginx | https://nginx.org |

---

## Skills Demonstrated

- [Full-Stack Development](https://react.dev)
- [Database Design & Optimization](https://www.mongodb.com)
- [Real-Time Systems](https://www.mongodb.com/products/atlas/realtime)
- [Authentication & Authorization](https://jwt.io)
- [PWA Development](https://web.dev/progressive-web-apps)
- [CI/CD Pipeline Design](https://github.com/features/actions)
- [Server Administration](https://ubuntu.com)

---

## Key Features

### Multi-Stage Paper Approval Workflow
- Implemented Supabase-style real-time live-sync using MongoDB Change Streams
- RLS (Row Level Security) database-layer authorization for role-based access control
- PL/pgSQL trigger-based O(1) download counters that avoid expensive `COUNT(*)` aggregations across browse and profile views

### Watermarked File Delivery Server
- Built on Express.js hosted on Ubuntu (DigitalOcean)
- Dynamic watermark injection on PDF exports
- Sliding-window rate limiting: 5 requests per 3 hours per user
- Zod schema validation for all incoming API payloads
- Supabase-style token ownership verification for document access

### Secure Authentication
- JWT-based authentication with refresh token rotation
- Role-based access control (Admin, Moderator, Student)
- Password hashing with bcrypt

---

## Performance and UX

### Production PWA
- Delivered via Workbox 7.x multi-strategy caching (CacheFirst for assets, NetworkFirst for API)
- TanStack Query v5 optimistic updates for instant feedback
- Sub-50ms UI synchronization with server state
- Service worker pre-caching for offline access
- Lighthouse Performance Score: 94

### UX/Cursor Behavior
- All interactive buttons implement hover/focus states with diamond-to-oval cursor transformation
- Diamond-shaped ripple effect on click that morphs to oval during animation
- `focus-visible` ring for keyboard navigation
- WCAG AA contrast ratios maintained (4.5:1 minimum)
- Respect for `prefers-reduced-motion` accessibility preference

---

## Deployment Environment

| Component | Technology |
|-----------|------------|
| Frontend Hosting | Vercel (Serverless) |
| Backend Hosting | DigitalOcean Ubuntu 22.04 LTS |
| Process Manager | PM2 |
| Reverse Proxy | Nginx |
| CI/CD | GitHub Actions |
| Deployment | Zero-downtime SSH deployment on push to main |

### CI/CD Pipeline
- Automated testing on every push
- Linting and type checking
- Build verification
- SSH deployment via GitHub Actions runners
- Automated health checks post-deployment

---

## Metrics

- **Users**: 15+ active students
- **Questions**: 5,000+ across 30+ subjects
- **API Response Time**: < 50ms (p95)
- **Uptime**: 99.9%
- **PWA Load Time**: < 1.2s (Lighthouse)

---

## Links

- **Live**: https://dit-pyq-hub.vercel.app
- **GitHub**: https://github.com/Aditgm/DIT-PYQ-hub
- **Backend API**: https://api.ditpyqhub.com (DigitalOcean)

---

*Project built as part of personal portfolio demonstrating full-stack engineering, real-time systems, and production deployment skills.*