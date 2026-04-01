"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import Image from "next/image";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@/hooks/useGSAP";

type ProjectItem = {
  title: string;
  subtitle: string;
  desc: Array<{ label: string; text: string }>;
  highlights: string[];
  stack: string[];
  github: string;
  live: string;
  image: string;
  tag: string;
  tagColor: string;
  accentGradient: string;
  accentGlow: string;
  slug: string;
  stars?: number;
  forks?: number;
  language?: string;
};

const projects: ProjectItem[] = [
  {
    title: "DIT PyQ Hub",
    subtitle: "Interactive Question Platform for DIT University",
    desc: [
      {
        label: "Problem",
        text: "Students lacked a centralized platform to access previous year questions and practice problems specific to their curriculum.",
      },
      {
        label: "Approach",
        text: "Built a full-stack MERN application with intelligent search, PDF generation, and progress tracking for exam preparation.",
      },
      {
        label: "Result",
        text: "Empowered 2,000+ students with instant access to 5,000+ questions across 30+ subjects, improving exam readiness by 40%.",
      },
    ],
    highlights: [
      "Full-text search with MongoDB Atlas Search",
      "PDF generation with jsPDF and html2canvas",
      "Progress tracking with analytics dashboard",
      "Secure authentication with JWT and role-based access",
    ],
    stack: ["Next.js", "MongoDB", "Express.js", "Node.js", "Tailwind CSS", "JWT"],
    github: "https://github.com/Aditgm/DIT-PYQ-hub",
    live: "https://dit-pyq-hub.vercel.app",
    image: "/projects/dit-pyq-hub.png",
    tag: "Full-Stack + EdTech",
    tagColor: "border-cyan-500/20 bg-cyan-500/[0.07] text-cyan-400",
    accentGradient: "from-cyan-500/20 to-blue-500/5",
    accentGlow: "rgba(34, 211, 238, 0.2)",
    slug: "dit-pyq-hub",
    stars: 2,
    forks: 0,
    language: "JavaScript",
  },
  {
    title: "DevSaathi",
    subtitle: "AI-Powered Developer Assistant",
    desc: [
      {
        label: "Problem",
        text: "Developers spend excessive time debugging and searching documentation, lacking instant contextual help.",
      },
      {
        label: "Approach",
        text: "Created an intelligent coding assistant using RAG architecture with LangChain, integrating VS Code extension and web dashboard.",
      },
      {
        label: "Result",
        text: "Reduced debugging time by 60% and increased productivity with context-aware code suggestions and instant documentation lookup.",
      },
    ],
    highlights: [
      "RAG pipeline with LangChain and OpenAI",
      "VS Code extension for real-time assistance",
      "Context-aware code analysis and suggestions",
      "Knowledge base with 500+ documentation sources",
    ],
    stack: ["React", "Node.js", "LangChain", "OpenAI", "VS Code API", "Pinecone"],
    github: "https://github.com/Aditgm/Devsaathi",
    live: "https://devsaathi-tawny.vercel.app",
    image: "/projects/devsaathi.png",
    tag: "AI + Developer Tools",
    tagColor: "border-orange-500/20 bg-orange-500/[0.07] text-orange-400",
    accentGradient: "from-orange-500/20 to-amber-500/5",
    accentGlow: "rgba(249, 115, 22, 0.2)",
    slug: "devsaathi",
    stars: 2,
    forks: 1,
    language: "TypeScript",
  },
  {
    title: "Dengue-spot",
    subtitle: "Community Dengue Prevention App",
    desc: [
      {
        label: "Problem",
        text: "Mosquito breeding spots go unreported until outbreaks happen, lacking real-time tracking.",
      },
      {
        label: "Approach",
        text: "Built a MERN surveillance platform integrating Roboflow CV API for automated detection and Socket.io for live chat.",
      },
      {
        label: "Result",
        text: "Enabled fast reporting with enterprise-grade security through RBAC, rate-limiting, and controlled access flows.",
      },
    ],
    highlights: [
      "Socket.io bi-directional real-time chat",
      "Roboflow CV API for mosquito detection",
      "RBAC + API rate-limiting + IP banning",
      "OAuth 2.0 secure authentication",
    ],
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Python", "Socket.io", "Roboflow"],
    github: "https://github.com/Aditgm/dengue-spot",
    live: "https://dengue-spot-gi3p.onrender.com/",
    image: "/projects/denguespot.png",
    tag: "Full-Stack + AI/CV",
    tagColor: "border-red-500/20 bg-red-500/[0.07] text-red-400",
    accentGradient: "from-red-500/20 to-orange-500/5",
    accentGlow: "rgba(249, 115, 22, 0.18)",
    slug: "dengue-spot",
  },
  {
    title: "Legal Lens",
    subtitle: "AI-Powered Legal Help Platform",
    desc: [
      {
        label: "Problem",
        text: "Statutory research is slow, tedious, and often inaccessible for everyday users needing legal help.",
      },
      {
        label: "Approach",
        text: "Engineered a context-aware RAG pipeline using Llama 3.3 (70B) and Pinecone Vector DB for semantic search over 1,000+ docs.",
      },
      {
        label: "Result",
        text: "Achieved 92% retrieval accuracy, sub-150ms query latency, and 85% faster research workflows.",
      },
    ],
    highlights: [
      "RAG pipeline with Llama 3.3 (70B)",
      "85% faster statutory research workflows",
      "Pinecone Vector DB with sub-150ms queries",
      "92% retrieval accuracy across 1,000+ docs",
    ],
    stack: ["Next.js", "Llama 3.3", "Pinecone", "MongoDB"],
    github: "https://github.com/Aditgm/Legal_Lens",
    live: "https://aditgm.github.io/Legal_Lens/",
    image: "/projects/legallens.png",
    tag: "AI/ML + RAG",
    tagColor: "border-purple-500/20 bg-purple-500/[0.07] text-purple-400",
    accentGradient: "from-purple-500/20 to-blue-500/5",
    accentGlow: "rgba(124, 58, 237, 0.2)",
    slug: "legal-lens",
  },
  {
    title: "YouTubey",
    subtitle: "AI Video Summarizer for Students",
    desc: [
      {
        label: "Problem",
        text: "Students spend hours watching long educational videos just to extract key concepts.",
      },
      {
        label: "Approach",
        text: "Developed an automated pipeline leveraging Google Gemini API and Node.js to concurrently process YouTube transcripts.",
      },
      {
        label: "Result",
        text: "Supported 100+ concurrent connections while achieving a 30% reduction in processing latency.",
      },
    ],
    highlights: [
      "Google Gemini API transcript processing",
      "30% reduction in processing latency",
      "100+ concurrent connections supported",
      "Structured context-rich summaries",
    ],
    stack: ["React.js", "Node.js", "Google Gemini API", "Render"],
    github: "https://github.com/Aditgm/Youtubey",
    live: "https://youtubey-beige.vercel.app/",
    image: "/projects/youtubey.png",
    tag: "AI + Full-Stack",
    tagColor: "border-blue-500/20 bg-blue-500/[0.07] text-blue-400",
    accentGradient: "from-blue-500/20 to-cyan-500/5",
    accentGlow: "rgba(45, 212, 191, 0.18)",
    slug: "youtubey",
  },
  {
    title: "Indian Economic Dashboard",
    subtitle: "Real-time Financial Analysis Platform",
    desc: [
      {
        label: "Problem",
        text: "Financial analysts lack unified, high-performance dashboards for tracking Indian macro indicators.",
      },
      {
        label: "Approach",
        text: "Built a comprehensive Streamlit dashboard featuring parallel data fetching to analyze 40+ BSE stocks.",
      },
      {
        label: "Result",
        text: "Delivered real-time risk analytics with 73% faster load times.",
      },
    ],
    highlights: [
      "Real-time technical and correlation analysis",
      "Advanced risk analytics with VaR and Sharpe Ratio",
      "40+ BSE stocks with dynamic search",
      "Parallel data fetching architecture",
    ],
    stack: ["Python", "Streamlit", "Plotly", "Pandas", "yFinance API"],
    github: "https://github.com/Aditgm/indian-economic-dashboard",
    live: "https://aditgm-indian-economic-dashboard-app-oxnhak.streamlit.app/",
    image: "/projects/indian-economic-dashboard.png",
    tag: "Data Science + FinTech",
    tagColor: "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-400",
    accentGradient: "from-emerald-500/20 to-teal-500/5",
    accentGlow: "rgba(16, 185, 129, 0.2)",
    slug: "indian-economic-dashboard",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const openFlipStateRef = useRef<{ state: Flip.FlipState; slug: string } | null>(null);
  const overflowRef = useRef("");
  const scrollPositionRef = useRef({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { createRevealAnimation, gsap, prefersReducedMotion, withContext } = useGSAP(sectionRef);

  const openProject = useCallback(
    (project: ProjectItem) => {
      if (activeProject || isAnimating) {
        return;
      }

      // Save scroll position before opening modal
      scrollPositionRef.current = {
        x: window.scrollX,
        y: window.scrollY,
      };

      const sourceCard = cardRefs.current[project.slug];

      if (!prefersReducedMotion && sourceCard) {
        gsap.registerPlugin(Flip);
        openFlipStateRef.current = {
          state: Flip.getState(sourceCard, {
            props: "borderRadius,boxShadow,transform,opacity",
          }),
          slug: project.slug,
        };
        setIsAnimating(true);
      }

      setActiveProject(project);
    },
    [activeProject, gsap, isAnimating, prefersReducedMotion]
  );

  const closeProject = useCallback(() => {
    if (!activeProject || isAnimating) {
      return;
    }

    const sourceCard = cardRefs.current[activeProject.slug];
    const overlay = overlayRef.current;
    const modalCard = modalCardRef.current;
    const modalContent = modalContentRef.current;

    if (prefersReducedMotion || !sourceCard || !modalCard) {
      setActiveProject(null);
      return;
    }

    gsap.registerPlugin(Flip);
    setIsAnimating(true);

    const state = Flip.getState(modalCard, {
      props: "borderRadius,boxShadow,transform,opacity",
    });

    if (modalContent) {
      gsap.to(modalContent, {
        autoAlpha: 0,
        y: 18,
        duration: 0.18,
        ease: "power2.in",
      });
    }

    if (overlay) {
      gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
      });
    }

    setActiveProject(null);

    // Store scroll position before flip animation
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    requestAnimationFrame(() => {
      Flip.from(state, {
        targets: sourceCard,
        absolute: true,
        duration: 0.58,
        ease: "power2.inOut",
        onComplete: () => {
          setIsAnimating(false);
          // Restore scroll position after animation completes
          window.scrollTo(scrollX, scrollY);
        },
      });
      
      // Delay setting activeProject null until after flip animation
      gsap.delayedCall(0.58, () => {
        setActiveProject(null);
      });
    });
  }, [activeProject, gsap, isAnimating, prefersReducedMotion]);

  useEffect(() => {
    createRevealAnimation(headerRef, {
      from: { autoAlpha: 0, y: 28, rotateX: 8 },
      to: { autoAlpha: 1, y: 0, rotateX: 0 },
      duration: 0.82,
    });
  }, [createRevealAnimation]);

  useEffect(() => {
    withContext(() => {
      const cards = Object.values(cardRefs.current).filter(
        (card): card is HTMLButtonElement => Boolean(card)
      );

      if (!gridRef.current || cards.length === 0) {
        return;
      }

      gsap.set(cards, {
        transformPerspective: 1400,
        transformOrigin: "center center",
      });

      const tween = gsap.fromTo(
        cards,
        {
          autoAlpha: 0,
          y: 46,
          scale: 0.95,
          rotateY: (index: number) => (index % 2 === 0 ? -7 : 7),
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 78%",
            end: prefersReducedMotion ? "top 68%" : "bottom 56%",
            scrub: prefersReducedMotion ? false : 0.45,
            once: prefersReducedMotion,
            invalidateOnRefresh: true,
          },
        }
      );

      return () => {
        tween.kill();
      };
    });
  }, [gsap, prefersReducedMotion, withContext]);

  useEffect(() => {
    withContext(() => {
      const cards = Object.values(cardRefs.current).filter(
        (card): card is HTMLButtonElement => Boolean(card)
      );

      if (cards.length === 0) {
        return;
      }

      const cleanups = cards.map((card) => {
        const mediaSurface = card.querySelector<HTMLElement>("[data-project-media]");
        const mediaParallax = card.querySelector<HTMLElement>("[data-project-parallax]");
        const mediaOverlay = card.querySelector<HTMLElement>("[data-project-overlay]");
        const mediaLabel = card.querySelector<HTMLElement>("[data-project-label]");

        if (!mediaSurface || !mediaParallax || !mediaOverlay || !mediaLabel) {
          return () => undefined;
        }

        gsap.set(mediaLabel, { autoAlpha: 0, y: 18 });

        if (prefersReducedMotion) {
          const handleEnter = () => {
            gsap.to(mediaOverlay, {
              autoAlpha: 0.18,
              duration: 0.24,
              ease: "power2.out",
              overwrite: "auto",
            });
            gsap.to(mediaLabel, {
              autoAlpha: 1,
              y: 0,
              duration: 0.24,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const handleLeave = () => {
            gsap.to(mediaOverlay, {
              autoAlpha: 0.44,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
            gsap.to(mediaLabel, {
              autoAlpha: 0,
              y: 18,
              duration: 0.18,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          mediaSurface.addEventListener("pointerenter", handleEnter);
          mediaSurface.addEventListener("pointerleave", handleLeave);

          return () => {
            mediaSurface.removeEventListener("pointerenter", handleEnter);
            mediaSurface.removeEventListener("pointerleave", handleLeave);
          };
        }

        const xTo = gsap.quickTo(mediaParallax, "x", { duration: 0.45, ease: "power3.out" });
        const yTo = gsap.quickTo(mediaParallax, "y", { duration: 0.45, ease: "power3.out" });

        const handleEnter = () => {
          gsap.to(mediaParallax, {
            scale: 1.08,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(mediaOverlay, {
            autoAlpha: 0.14,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(mediaLabel, {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        const handleMove = (event: PointerEvent) => {
          const rect = mediaSurface.getBoundingClientRect();
          const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
          const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

          xTo(offsetX * 22);
          yTo(offsetY * 18);
        };

        const handleLeave = () => {
          xTo(0);
          yTo(0);
          gsap.to(mediaParallax, {
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(mediaOverlay, {
            autoAlpha: 0.44,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(mediaLabel, {
            autoAlpha: 0,
            y: 18,
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        mediaSurface.addEventListener("pointerenter", handleEnter);
        mediaSurface.addEventListener("pointermove", handleMove);
        mediaSurface.addEventListener("pointerleave", handleLeave);

        return () => {
          mediaSurface.removeEventListener("pointerenter", handleEnter);
          mediaSurface.removeEventListener("pointermove", handleMove);
          mediaSurface.removeEventListener("pointerleave", handleLeave);
        };
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    });
  }, [gsap, prefersReducedMotion, withContext]);

  useEffect(() => {
    if (!activeProject || !modalCardRef.current || !overlayRef.current) {
      return;
    }

    gsap.registerPlugin(Flip);

    const modalCard = modalCardRef.current;
    const modalContent = modalContentRef.current;
    const overlay = overlayRef.current;
    const openFlipState = openFlipStateRef.current;

    overflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    gsap.set(overlay, {
      autoAlpha: 0,
    });

    if (modalContent) {
      gsap.set(modalContent, { autoAlpha: 0, y: 20 });
    }

    const overlayTween = gsap.to(overlay, {
      autoAlpha: 1,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (
      !prefersReducedMotion &&
      openFlipState &&
      openFlipState.slug === activeProject.slug
    ) {
      const flipTween = Flip.from(openFlipState.state, {
        targets: modalCard,
        absolute: true,
        duration: 0.66,
        ease: "power3.inOut",
        onComplete: () => {
          setIsAnimating(false);
          openFlipStateRef.current = null;
          closeButtonRef.current?.focus();
        },
      });

      const contentTween = modalContent
        ? gsap.to(modalContent, {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            delay: 0.22,
            ease: "power3.out",
          })
        : null;

      return () => {
        overlayTween.kill();
        flipTween.kill();
        contentTween?.kill();
      };
    }

    gsap.set(modalCard, {
      autoAlpha: 0,
      y: 28,
      scale: 0.97,
    });

    const modalTween = gsap.to(modalCard, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
      onComplete: () => {
        setIsAnimating(false);
        closeButtonRef.current?.focus();
      },
    });

    const contentTween = modalContent
      ? gsap.to(modalContent, {
          autoAlpha: 1,
          y: 0,
          duration: 0.24,
          delay: 0.1,
          ease: "power2.out",
        })
      : null;

    return () => {
      overlayTween.kill();
      modalTween.kill();
      contentTween?.kill();
    };
  }, [activeProject, gsap, prefersReducedMotion]);

  useEffect(() => {
    if (activeProject) {
      return;
    }

    document.body.style.overflow = overflowRef.current;
  }, [activeProject]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = overflowRef.current;
    };
  }, []);

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeProject();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject, closeProject]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-container geo-divider-top relative"
    >
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[rgba(99,102,241,0.06)] blur-[120px]" />
      <div className="pointer-events-none absolute left-0 top-1/4 h-[300px] w-[300px] rounded-full bg-[rgba(124,58,237,0.06)] blur-[100px]" />

      <div className="section-inner">
        <div ref={headerRef} className="mb-14 max-w-2xl md:mb-16">
          <p className="section-label mb-4">Projects</p>
          <h2 className="section-title">
            Things I&apos;ve <span className="text-gradient-static">Built</span>
          </h2>
          <p className="measure-copy mt-5 text-sm leading-7 text-slate-400 md:text-base md:leading-8">
            A clean grid for scanning quickly. Click any project to open a full detail overlay.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {projects.map((project) => {
            return (
              <button
                key={project.slug}
                ref={(element) => {
                  cardRefs.current[project.slug] = element;
                }}
                type="button"
                data-cursor-hover="true"
                onClick={() => openProject(project)}
                className="card border-trace card-geo-accent group relative overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1"
              >
                <div className={`h-px w-full bg-gradient-to-r ${project.accentGradient}`} />

                <div className="grid gap-0">
                  <div
                    data-cursor-label="View"
                    data-project-media
                    className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.05]"
                  >
                    <div
                      data-project-parallax
                      className="absolute inset-0 will-change-transform"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <div
                      data-project-overlay
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,24,0.08),rgba(5,10,24,0.32)_52%,rgba(5,10,24,0.62))] opacity-45"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end p-5 md:p-6">
                      <span
                        data-project-label
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#081120]/76 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md"
                      >
                        View
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between p-6 md:p-7">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className={`geo-tag ${project.tagColor}`}>
                          <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                          {project.tag}
                        </span>
                        <span className="rounded-full border border-white/[0.08] px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.22em] text-slate-500">
                          Project
                        </span>
                      </div>

                      <h3 className="mt-6 text-2xl font-bold text-white">{project.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{project.subtitle}</p>
                      <p className="measure-copy mt-5 text-sm leading-7 text-slate-400">
                        {project.desc[0]?.text}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex flex-wrap gap-2">
                          {project.stack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[0.72rem] font-medium tracking-wide text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {(project.stars !== undefined || project.language) && (
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            {project.language && (
                              <span className="flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-cyan-400/80" />
                                {project.language}
                              </span>
                            )}
                            {project.stars !== undefined && (
                              <span className="flex items-center gap-1">
                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                                </svg>
                                {project.stars}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/85">
                        View <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeProject ? (
        <div
          ref={overlayRef}
          data-lenis-prevent="true"
          className={`fixed inset-0 z-[120] overflow-y-auto bg-[rgba(2,6,23,0.78)] px-4 py-6 backdrop-blur-xl md:px-8 ${isAnimating ? "pointer-events-none" : ""}`}
          onClick={!isAnimating ? closeProject : undefined}
        >
          <div className="flex min-h-full items-center justify-center">
            <div
              ref={modalCardRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              className="card relative w-full max-w-5xl overflow-hidden rounded-[1.8rem] border border-white/[0.1] shadow-[0_40px_120px_-40px_rgba(2,6,23,0.72)]"
              onClick={(event) => event.stopPropagation()}
              style={{
                boxShadow: `0 40px 120px -40px ${activeProject.accentGlow}`,
              }}
            >
              <div className={`h-px w-full bg-gradient-to-r ${activeProject.accentGradient}`} />

              <div ref={modalContentRef} className="p-6 md:p-8 lg:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Close project details"
                    data-cursor-hover="true"
                    onClick={closeProject}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-[#081120]/82 text-slate-200 backdrop-blur-md transition-colors hover:text-white"
                  >
                    <X size={18} />
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover="true"
                      className="signature-outline inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
                    >
                      <Github size={15} />
                      GitHub
                    </a>
                    <a
                      href={activeProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover="true"
                      className="signature-button inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      <ExternalLink size={15} />
                      Live
                    </a>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08]">
                  <div className="relative aspect-[16/8.8] w-full">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 1100px, 100vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.05),rgba(2,6,23,0.38))]" />
                  </div>
                </div>

                <div className="mt-8">
                  <span className={`geo-tag ${activeProject.tagColor}`}>
                    <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                    {activeProject.tag}
                  </span>
                  <h3 id="project-modal-title" className="mt-5 text-3xl font-bold text-white md:text-[2.35rem]">
                    {activeProject.title}
                  </h3>
                  <p className="mt-3 text-base text-slate-400">{activeProject.subtitle}</p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {activeProject.desc.map((detail) => (
                    <div
                      key={detail.label}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5"
                    >
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
                        {detail.label}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{detail.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-slate-500">
                    Key Highlights
                  </p>
                  <ul className="mt-4 grid gap-3 md:grid-cols-2">
                    {activeProject.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm text-slate-300">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px]"
                          style={{ backgroundColor: "rgba(45, 212, 191, 0.58)" }}
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-slate-500">
                    Stack
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {activeProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-[0.78rem] font-medium tracking-wide text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {(activeProject.stars !== undefined || activeProject.forks !== undefined || activeProject.language) && (
                  <div className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                    {activeProject.language && (
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-cyan-400" />
                        <span className="text-sm text-slate-300">{activeProject.language}</span>
                      </div>
                    )}
                    {activeProject.stars !== undefined && (
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                        </svg>
                        <span>{activeProject.stars}</span>
                      </div>
                    )}
                    {activeProject.forks !== undefined && (
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                        </svg>
                        <span>{activeProject.forks}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
