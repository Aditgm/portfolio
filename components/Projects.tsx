"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github, Hammer, X } from "lucide-react";
import Image from "next/image";
import { TransitionLink } from "./TransitionLink";
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
  featured: boolean;
};

const projects: ProjectItem[] = [
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
    featured: true,
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
    featured: false,
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
    featured: false,
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
    featured: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const overflowRef = useRef("");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const { createRevealAnimation, gsap, prefersReducedMotion, withContext } = useGSAP(sectionRef);

  const openProject = useCallback(
    (project: ProjectItem) => {
      if (activeProject || isClosing) {
        return;
      }

      setActiveProject(project);
    },
    [activeProject, isClosing]
  );

  const finishClose = useCallback(() => {
    document.body.style.overflow = overflowRef.current;
    setIsClosing(false);
    setActiveProject(null);
  }, []);

  const closeProject = useCallback(() => {
    if (!activeProject || isClosing) {
      return;
    }

    const modalCard = modalCardRef.current;
    const modalBody = modalBodyRef.current;
    const overlay = overlayRef.current;
    const sourceCard = cardRefs.current[activeProject.slug];

    setIsClosing(true);

    if (prefersReducedMotion || !modalCard || !overlay || !sourceCard) {
      const tween = gsap.timeline({
        onComplete: finishClose,
      });

      if (modalBody) {
        tween.to(
          modalBody,
          {
            autoAlpha: 0,
            y: 12,
            duration: 0.16,
            ease: "power2.in",
          },
          0
        );
      }

      tween.to(
        [overlay, modalCard],
        {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        0
      );

      return;
    }

    if (modalBody) {
      gsap.to(modalBody, {
        autoAlpha: 0,
        y: 18,
        duration: 0.18,
        ease: "power2.in",
      });
    }

    const modalRect = modalCard.getBoundingClientRect();
    const sourceRect = sourceCard.getBoundingClientRect();

    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.22,
      ease: "power2.in",
    });

    gsap.to(modalCard, {
      x: sourceRect.left - modalRect.left,
      y: sourceRect.top - modalRect.top,
      scaleX: sourceRect.width / modalRect.width,
      scaleY: sourceRect.height / modalRect.height,
      transformOrigin: "top left",
      duration: 0.56,
      ease: "power2.inOut",
      onComplete: finishClose,
    });
  }, [activeProject, finishClose, gsap, isClosing, prefersReducedMotion]);

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
    return () => {
      document.body.style.overflow = overflowRef.current;
    };
  }, []);

  useEffect(() => {
    if (!activeProject || !modalCardRef.current || !overlayRef.current) {
      return;
    }

    const modalCard = modalCardRef.current;
    const modalBody = modalBodyRef.current;
    const overlay = overlayRef.current;
    const sourceCard = cardRefs.current[activeProject.slug];

    overflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timeline = gsap.timeline();

    gsap.set(overlay, {
      autoAlpha: 0,
    });

    if (prefersReducedMotion || !sourceCard) {
      gsap.set(modalCard, {
        autoAlpha: 0,
        y: 28,
        scale: 0.97,
      });

      if (modalBody) {
        gsap.set(modalBody, { autoAlpha: 0, y: 18 });
      }

      timeline
        .to(overlay, {
          autoAlpha: 1,
          duration: 0.18,
          ease: "power2.out",
        })
        .to(
          modalCard,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.32,
            ease: "power3.out",
          },
          0
        );

      if (modalBody) {
        timeline.to(
          modalBody,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.24,
            ease: "power2.out",
          },
          0.08
        );
      }

      closeButtonRef.current?.focus();

      return () => {
        timeline.kill();
      };
    }

    if (modalBody) {
      gsap.set(modalBody, { autoAlpha: 0, y: 18 });
    }

    const modalRect = modalCard.getBoundingClientRect();
    const sourceRect = sourceCard.getBoundingClientRect();
    const deltaX = sourceRect.left - modalRect.left;
    const deltaY = sourceRect.top - modalRect.top;
    const scaleX = sourceRect.width / modalRect.width;
    const scaleY = sourceRect.height / modalRect.height;

    gsap.set(modalCard, {
      x: deltaX,
      y: deltaY,
      scaleX,
      scaleY,
      transformOrigin: "top left",
    });

    timeline.to(
      overlay,
      {
        autoAlpha: 1,
        duration: 0.22,
        ease: "power2.out",
      },
      0
    );

    timeline.to(
      modalCard,
      {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        transformOrigin: "top left",
        clearProps: "transform",
        duration: 0.72,
        ease: "power3.inOut",
      },
      0
    );

    if (modalBody) {
      timeline.to(
        modalBody,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.32,
          ease: "power3.out",
        },
        0.2
      );
    }

    closeButtonRef.current?.focus();

    return () => {
      timeline.kill();
    };
  }, [activeProject, gsap, prefersReducedMotion]);

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

  const featuredProject = useMemo(
    () => projects.find((project) => project.featured)?.slug ?? null,
    []
  );

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
          <p className="mt-5 text-sm leading-7 text-slate-400 md:text-base md:leading-8">
            A tighter overview first. Open any card for the full story, deep dive, and build
            context without fighting the layout.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12"
        >
          {projects.map((project) => {
            const isFeatured = project.slug === featuredProject;

            return (
              <button
                key={project.slug}
                ref={(element) => {
                  cardRefs.current[project.slug] = element;
                }}
                type="button"
                data-cursor-hover="true"
                onClick={() => openProject(project)}
                className={`card border-trace card-geo-accent group relative overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 ${isFeatured ? "md:col-span-2 xl:col-span-7" : "xl:col-span-5"}`}
              >
                <div className={`h-px w-full bg-gradient-to-r ${project.accentGradient}`} />

                <div className={`grid gap-0 ${isFeatured ? "lg:grid-cols-[1.2fr_0.95fr]" : ""}`}>
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.05] lg:border-b-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes={
                        isFeatured
                          ? "(min-width: 1280px) 52vw, (min-width: 768px) 100vw, 100vw"
                          : "(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw"
                      }
                    />
                  </div>

                  <div className="flex flex-col justify-between p-6 md:p-7">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className={`geo-tag ${project.tagColor}`}>
                          <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                          {project.tag}
                        </span>
                        <span className="rounded-full border border-white/[0.08] px-3 py-1 text-[0.68rem] font-mono uppercase tracking-[0.22em] text-slate-500">
                          Open
                        </span>
                      </div>

                      <h3 className="mt-6 text-2xl font-bold text-white">{project.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{project.subtitle}</p>
                      <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
                        {project.desc[0]?.text}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, isFeatured ? 4 : 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[0.72rem] font-medium tracking-wide text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/85">
                        View Details <ArrowUpRight size={16} />
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
          className={`fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(2,6,23,0.78)] px-4 py-6 backdrop-blur-xl md:px-8 ${isClosing ? "pointer-events-none" : ""}`}
          onClick={closeProject}
        >
          <div
            ref={modalCardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="card relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.8rem] border border-white/[0.1] shadow-[0_40px_120px_-40px_rgba(2,6,23,0.72)]"
            onClick={(event) => event.stopPropagation()}
            style={{
              boxShadow: `0 40px 120px -40px ${activeProject.accentGlow}`,
            }}
          >
            <div className={`h-px w-full bg-gradient-to-r ${activeProject.accentGradient}`} />

            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close project details"
              data-cursor-hover="true"
              onClick={closeProject}
              className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.1] bg-[#081120]/82 text-slate-200 backdrop-blur-md transition-colors hover:text-white"
            >
              <X size={18} />
            </button>

            <div
              ref={modalBodyRef}
              data-lenis-prevent
              className="min-h-0 overflow-y-auto overscroll-contain"
            >
              <div className="grid min-h-0 lg:grid-cols-[1.15fr_0.95fr]">
                <div className="relative min-h-[20rem] border-b border-white/[0.06] lg:min-h-full lg:border-b-0 lg:border-r lg:border-r-white/[0.06]">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 56vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.18)_56%,rgba(2,6,23,0.72)_100%)]" />
                </div>

                <div className="flex min-h-0 flex-col p-6 md:p-8 lg:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className={`geo-tag ${activeProject.tagColor}`}>
                        <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                        {activeProject.tag}
                      </span>
                      <h3
                        id="project-modal-title"
                        className="mt-6 text-3xl font-bold leading-tight text-white md:text-[2.35rem]"
                      >
                        {activeProject.title}
                      </h3>
                      <p className="mt-3 text-base text-slate-400">{activeProject.subtitle}</p>
                    </div>

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

                  <div className="mt-8 space-y-5 text-sm leading-7 text-slate-300">
                    {activeProject.desc.map((detail) => (
                      <div key={detail.label}>
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-slate-500">
                          {detail.label}
                        </p>
                        <p className="mt-2 text-[0.98rem] leading-7 text-slate-300">
                          {detail.text}
                        </p>
                      </div>
                    ))}
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

                  <div className="mt-8">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-slate-500">
                      Key Highlights
                    </p>
                    <ul className="mt-4 grid gap-3">
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

                  <div className="mt-8 flex flex-wrap gap-3">
                    <TransitionLink
                      href={`/build/${activeProject.slug}`}
                      className="signature-outline inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
                    >
                      <Hammer size={15} />
                      Build Story
                    </TransitionLink>
                    <button
                      type="button"
                      onClick={closeProject}
                      className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-4 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
                    >
                      Back to Grid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
