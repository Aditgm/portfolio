"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";

const groups = [
  {
    cat: "Languages",
    icon: "{ }",
    color: "text-blue-400",
    borderAccent: "from-blue-500 to-cyan-500",
    skills: ["C/C++", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    cat: "Web Development",
    icon: "</>",
    color: "text-green-400",
    borderAccent: "from-green-500 to-emerald-500",
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "HTML/CSS", "Streamlit"],
  },
  {
    cat: "AI/ML & Databases",
    icon: "AI",
    color: "text-purple-400",
    borderAccent: "from-purple-500 to-pink-500",
    skills: ["MongoDB", "Pinecone (Vector DB)", "Llama 3.3", "Google Gemini API", "RAG", "Roboflow"],
  },
  {
    cat: "Tools & Platforms",
    icon: "Ops",
    color: "text-orange-400",
    borderAccent: "from-orange-500 to-amber-500",
    skills: ["Docker", "Git/GitHub", "Render", "Socket.io", "Pandas", "Plotly"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardInnerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const skillRefs = useRef<Array<Array<HTMLSpanElement | null>>>([]);
  const { createRevealAnimation, gsap, prefersReducedMotion, withContext } = useGSAP(sectionRef);

  useEffect(() => {
    createRevealAnimation(headerRef, {
      from: { autoAlpha: 0, y: 24, rotateX: 8 },
      to: { autoAlpha: 1, y: 0, rotateX: 0 },
      duration: 0.8,
    });
  }, [createRevealAnimation]);

  useEffect(() => {
    withContext(() => {
      const cards = cardRefs.current.filter(
        (card): card is HTMLDivElement => Boolean(card)
      );
      const innerCards = cardInnerRefs.current.filter(
        (card): card is HTMLDivElement => Boolean(card)
      );

      if (cards.length === 0) {
        return;
      }

      gsap.set(cards, {
        transformPerspective: 1300,
        transformOrigin: "center center",
      });

      cards.forEach((card, index) => {
        const innerCard = innerCards[index];
        const tags = (skillRefs.current[index] ?? []).filter(
          (tag): tag is HTMLSpanElement => Boolean(tag)
        );

        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            y: 40,
            rotateX: -10,
            rotateY: index % 2 === 0 ? -6 : 6,
            scale: 0.95,
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: prefersReducedMotion ? "top 68%" : "bottom 54%",
              scrub: prefersReducedMotion ? false : 0.65,
              once: prefersReducedMotion,
              invalidateOnRefresh: true,
            },
          }
        );

        if (innerCard) {
          gsap.fromTo(
            innerCard,
            {
              rotateX: index % 2 === 0 ? -2 : 2,
              rotateY: index % 2 === 0 ? 4 : -4,
            },
            {
              rotateX: index % 2 === 0 ? 2 : -2,
              rotateY: index % 2 === 0 ? -3 : 3,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: prefersReducedMotion ? false : 0.85,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (tags.length === 0) {
          return;
        }

        gsap.fromTo(
          tags,
          {
            autoAlpha: 0,
            y: 22,
            scale: 0.76,
            rotateZ: (tagIndex: number) => (tagIndex % 2 === 0 ? -5 : 5),
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateZ: 0,
            duration: 0.9,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: prefersReducedMotion ? "top 68%" : "bottom 55%",
              scrub: prefersReducedMotion ? false : 0.55,
              once: prefersReducedMotion,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });
  }, [gsap, prefersReducedMotion, withContext]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-container geo-divider-top relative"
    >
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[350px] w-[350px] rounded-full bg-cyan-600/[0.03] blur-[100px]" />

      <div className="section-inner">
        <div ref={headerRef} className="mb-14 md:mb-20">
          <p className="section-label mb-5 justify-center md:justify-start">Skills</p>
          <h2 className="section-title text-center md:text-left">
            Technical <span className="text-gradient-static">Toolkit</span>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
          {groups.map((group, groupIndex) => (
            <div
              key={group.cat}
              ref={(element) => {
                cardRefs.current[groupIndex] = element;
              }}
              className="h-full [perspective:1300px]"
            >
              <div
                ref={(element) => {
                  cardInnerRefs.current[groupIndex] = element;
                }}
                className="card border-trace group flex h-full flex-col overflow-hidden [transform-style:preserve-3d]"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${group.borderAccent} opacity-80`} />

                <div className="flex flex-1 flex-col gap-10 p-10 md:p-12">
                  <div className="flex items-center gap-5">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent transition-all duration-300 group-hover:scale-105 group-hover:border-white/[0.15]" />
                      <div className="absolute inset-1 rounded-xl bg-[#030711]" />
                      <span className={`relative font-mono text-lg font-bold ${group.color}`}>
                        {group.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-wide text-white">
                        {group.cat}
                      </h3>
                      <p className="mt-1 font-mono text-sm uppercase tracking-widest text-slate-500">
                        {group.skills.length} technologies
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-4 pt-4">
                    {group.skills.map((skill, skillIndex) => {
                      return (
                        <span
                          key={skill}
                          ref={(element) => {
                            if (!skillRefs.current[groupIndex]) {
                              skillRefs.current[groupIndex] = [];
                            }
                            skillRefs.current[groupIndex][skillIndex] = element;
                          }}
                          className="group/skill relative flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.25] hover:bg-white/[0.08] hover:text-white hover:shadow-lg"
                        >
                          <span
                            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${group.borderAccent} opacity-0 blur-md transition-opacity duration-300 group-hover/skill:opacity-[0.15]`}
                          />
                          <span className="relative z-10">{skill}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
