"use client";

import { useEffect, useRef } from "react";
import { Github, ExternalLink, Hammer } from "lucide-react";
import Image from "next/image";
import { TransitionLink } from "./TransitionLink";
import { useGSAP } from "@/hooks/useGSAP";

const projects = [
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
        text: "Enabled fast reporting with enterprise-grade security (RBAC & rate-limiting).",
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
      "Pinecone Vector DB · sub-150ms queries",
      "92% retrieval accuracy across 1,000+ docs",
    ],
    stack: ["Next.js", "Llama 3.3", "Pinecone", "MongoDB"],
    github: "https://github.com/Aditgm/Legal_Lens",
    live: "https://aditgm.github.io/Legal_Lens/",
    image: "/projects/legallens.png",
    tag: "AI/ML + RAG",
    tagColor: "border-purple-500/20 bg-purple-500/[0.07] text-purple-400",
    accentGradient: "from-purple-500/20 to-blue-500/5",
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
      "Real-time technical & correlation analysis",
      "Advanced Risk Analytics (VaR, Sharpe Ratio)",
      "40+ BSE stocks with dynamic search",
      "Ultra-fast parallel data fetching architecture",
    ],
    stack: ["Python", "Streamlit", "Plotly", "Pandas", "yFinance API"],
    github: "https://github.com/Aditgm/indian-economic-dashboard",
    live: "https://aditgm-indian-economic-dashboard-app-oxnhak.streamlit.app/",
    image: "/projects/indian-economic-dashboard.png",
    tag: "Data Science & FinTech",
    tagColor: "border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-400",
    accentGradient: "from-emerald-500/20 to-teal-500/5",
    slug: "indian-economic-dashboard",
    featured: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const horizontalStageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const imageLayerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { createRevealAnimation, gsap, prefersReducedMotion, withContext } = useGSAP(sectionRef);

  useEffect(() => {
    createRevealAnimation(headerRef, {
      from: { autoAlpha: 0, y: 28, rotateX: 8 },
      to: { autoAlpha: 1, y: 0, rotateX: 0 },
      duration: 0.82,
    });
  }, [createRevealAnimation]);

  useEffect(() => {
    withContext(() => {
      const cards = cardRefs.current.filter(
        (card): card is HTMLElement => Boolean(card)
      );
      const imageLayers = imageLayerRefs.current.filter(
        (imageLayer): imageLayer is HTMLDivElement => Boolean(imageLayer)
      );

      if (!trackRef.current || cards.length === 0) {
        return;
      }

      gsap.set(cards, {
        transformPerspective: 1400,
        transformOrigin: "center center",
      });

      const enableHorizontal =
        typeof window !== "undefined" &&
        !prefersReducedMotion &&
        window.matchMedia("(min-width: 1024px)").matches &&
        viewportRef.current &&
        horizontalStageRef.current;

      if (!enableHorizontal || !viewportRef.current || !horizontalStageRef.current) {
        gsap.set(trackRef.current, { clearProps: "transform" });

        gsap.fromTo(
          cards,
          {
            autoAlpha: 0,
            y: 48,
            scale: 0.94,
            rotateY: (index: number) => (index % 2 === 0 ? -8 : 8),
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.95,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 82%",
              end: prefersReducedMotion ? "top 68%" : "bottom 46%",
              scrub: prefersReducedMotion ? false : 0.65,
              once: prefersReducedMotion,
              invalidateOnRefresh: true,
            },
          }
        );

        imageLayers.forEach((imageLayer, index) => {
          const card = cards[index];

          if (!card) {
            return;
          }

          gsap.fromTo(
            imageLayer,
            { yPercent: -6, scale: 1.05 },
            {
              yPercent: 6,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: prefersReducedMotion ? false : 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        return;
      }

      const getDistance = () =>
        Math.max(trackRef.current!.scrollWidth - viewportRef.current!.offsetWidth, 0);

      if (getDistance() < 48) {
        return;
      }

      const horizontalTween = gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalStageRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            autoAlpha: 0.35,
            scale: 0.82,
            y: 36,
            rotateY: index % 2 === 0 ? -10 : 10,
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            rotateY: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 88%",
              end: "center 62%",
              scrub: 0.55,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      imageLayers.forEach((imageLayer, index) => {
        const card = cards[index];

        if (!card) {
          return;
        }

        gsap.fromTo(
          imageLayer,
          {
            xPercent: -8,
            yPercent: -4,
            scale: 1.08,
          },
          {
            xPercent: 8,
            yPercent: 4,
            scale: 1.16,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: 0.75,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });
  }, [gsap, prefersReducedMotion, withContext]);

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
            Production-grade applications combining AI/ML, real-time systems, and
            modern full-stack architecture.
          </p>
        </div>

        <div ref={horizontalStageRef} className="relative">
          <div ref={viewportRef} className="overflow-visible lg:overflow-hidden">
            <div
              ref={trackRef}
              className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8"
            >
              {projects.map((project, index) => (
                <article
                  key={project.title}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className={`card card-geo-accent border-trace group flex w-full shrink-0 flex-col overflow-hidden lg:h-[min(44rem,78vh)] ${project.featured ? "lg:w-[min(56rem,88vw)]" : "lg:w-[min(42rem,74vw)]"}`}
                >
                  <div className={`h-px w-full bg-gradient-to-r ${project.accentGradient}`} />

                  <div className="relative h-48 w-full shrink-0 overflow-hidden border-b border-white/[0.04] sm:h-64 lg:h-72">
                    <div
                      ref={(element) => {
                        imageLayerRefs.current[index] = element;
                      }}
                      className="absolute inset-0 will-change-transform"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top"
                        sizes={
                          project.featured
                            ? "(min-width: 1024px) 88vw, 100vw"
                            : "(min-width: 1024px) 74vw, 100vw"
                        }
                      />
                    </div>
                  </div>

                  <div className={`min-h-0 flex flex-1 flex-col ${project.featured ? "lg:flex-row" : ""}`}>
                    <div className="flex min-h-0 flex-1 flex-col p-7 md:p-10">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <span className={`geo-tag ${project.tagColor}`}>
                          <span className="h-1 w-1 rounded-full bg-current opacity-60" />
                          {project.tag}
                        </span>
                        <div className="flex gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-slate-500 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white"
                            aria-label={`${project.title} on GitHub`}
                          >
                            <Github size={14} />
                          </a>
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-slate-500 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white"
                            aria-label={`${project.title} live demo`}
                          >
                            <ExternalLink size={14} />
                          </a>
                          <TransitionLink
                            href={`/build/${project.slug}`}
                            className="signature-outline group/build relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                            aria-label={`Build details for ${project.title}`}
                          >
                            <span
                              className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-300 group-hover/build:opacity-100"
                              style={{
                                background:
                                  "radial-gradient(circle, rgba(129, 140, 248, 0.34), transparent 68%)",
                              }}
                            />
                            <Hammer size={14} />
                          </TransitionLink>
                        </div>
                      </div>

                      <div
                        data-lenis-prevent
                        className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-color:rgba(148,163,184,0.4)_transparent] [scrollbar-width:thin]"
                      >
                        <h3 className="text-xl font-bold text-white transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">{project.subtitle}</p>

                        <p className="mt-4 text-[0.68rem] font-mono uppercase tracking-[0.22em] text-slate-500 lg:block">
                          Scroll inside card to read more
                        </p>

                        <div className="mt-6 flex flex-col gap-3 text-sm leading-[1.6] text-slate-400">
                          {project.desc.map((detail) => (
                            <p key={detail.label}>
                              <strong className="font-semibold text-slate-200">
                                {detail.label}:
                              </strong>{" "}
                              {detail.text}
                            </p>
                          ))}
                        </div>

                        <ul className="mt-6 flex flex-col gap-3">
                          {project.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-3 text-sm text-slate-400">
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px]"
                                style={{ backgroundColor: "rgba(45, 212, 191, 0.58)" }}
                              />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {project.featured ? (
                      <div className="hidden w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent lg:block" />
                    ) : null}

                    {project.featured ? (
                      <div className="flex flex-wrap items-end gap-3 border-t border-white/[0.04] p-6 lg:w-64 lg:flex-col lg:items-start lg:justify-center lg:border-t-0 lg:p-8">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <div
                            className="h-2 w-2 rounded-full bg-green-400/60"
                            style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
                          />
                          Active Development
                        </div>
                        <div className="mt-3 grid w-full grid-cols-2 gap-3">
                          <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 text-center">
                            <p className="text-lg font-bold text-white">7</p>
                            <p className="text-[0.65rem] text-slate-500">Tech Stack</p>
                          </div>
                          <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 text-center">
                            <p className="text-lg font-bold text-white">4</p>
                            <p className="text-[0.65rem] text-slate-500">Key Features</p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-3 border-t border-white/[0.04] px-7 py-8 md:px-10">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[0.8rem] font-medium tracking-wide text-slate-300 transition-all duration-300 hover:border-white/[0.2] hover:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
