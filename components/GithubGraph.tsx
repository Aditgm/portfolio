"use client";

import { useRef } from "react";
import { ArrowUpRight, Flame, Github, Sparkles } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { useGSAP } from "@/hooks/useGSAP";

const totalContributions = "1,200+ contributions";
const currentStreak = "365-day streak";

const monthlyBars = [
    { week: "W1", value: 22 },
    { week: "W2", value: 31 },
    { week: "W3", value: 27 },
    { week: "W4", value: 35 },
];

const monthlyTotal = monthlyBars.reduce((sum, item) => sum + item.value, 0);
const maxMonthlyBar = Math.max(...monthlyBars.map((item) => item.value));

export default function GithubGraph() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const { createRevealAnimation } = useGSAP(sectionRef);

    useGSAP(() => {
        createRevealAnimation(headerRef, {
            from: { autoAlpha: 0, y: 20, rotateX: 8 },
            to: { autoAlpha: 1, y: 0, rotateX: 0 },
            duration: 0.6,
        });

        createRevealAnimation(cardRef, {
            from: { autoAlpha: 0, y: 24, rotateX: 8, scale: 0.98 },
            to: { autoAlpha: 1, y: 0, rotateX: 0, scale: 1 },
            duration: 0.6,
            delay: 0.1,
        });
    }, [createRevealAnimation]);

    return (
        <section ref={sectionRef} className="section-container geo-divider-top relative">
            <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
            <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-blue-600/[0.04] blur-[120px]" />
            <div className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-purple-600/[0.04] blur-[100px]" />

            <div className="section-inner">
                <div ref={headerRef} className="mb-14 max-w-2xl">
                    <div className="mb-4 flex items-center gap-3 section-label">
                        <Github size={18} />
                        <p className="m-0">Contributions</p>
                    </div>
                    <h2 className="section-title">
                        GitHub <span className="text-gradient-static">Graph</span>
                    </h2>
                    <p className="measure-copy mt-5 text-sm leading-7 text-slate-400 md:text-base md:leading-8">
                        A visual representation of open-source consistency, contribution rhythm, and sustained
                        coding habits.
                    </p>
                </div>

                <div
                    ref={cardRef}
                    className="card border-trace mx-auto flex w-full flex-col items-center gap-8 overflow-hidden rounded-2xl bg-white/[0.02] p-6 sm:p-10"
                >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                    <div className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-center sm:px-7">
                        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold tracking-wide text-slate-200 sm:text-base">
                            <span className="inline-flex items-center gap-2">
                                <Sparkles size={14} className="text-cyan-300" />
                                {totalContributions}
                            </span>
                            <span className="hidden h-1 w-1 rounded-full bg-slate-500 sm:block" />
                            <span className="inline-flex items-center gap-2">
                                <Flame size={14} className="text-orange-300" />
                                {currentStreak}
                            </span>
                        </div>
                    </div>

                    <div className="hidden w-full overflow-x-auto overflow-y-hidden pb-2 text-sm text-slate-300 md:flex md:justify-center [&_.react-activity-calendar\_\_count]:rounded-xl [&_.react-activity-calendar\_\_count]:border [&_.react-activity-calendar\_\_count]:border-blue-500/20 [&_.react-activity-calendar\_\_count]:bg-blue-500/10 [&_.react-activity-calendar\_\_count]:px-4 [&_.react-activity-calendar\_\_count]:py-1.5 [&_.react-activity-calendar\_\_count]:font-bold [&_.react-activity-calendar\_\_count]:tracking-wide [&_.react-activity-calendar\_\_count]:text-blue-300 [&_.react-activity-calendar\_\_count]:shadow-blue-500/10 [&_.react-activity-calendar\_\_count]:shadow-lg">
                        <div className="min-w-max px-2">
                            <GitHubCalendar
                                username="Aditgm"
                                colorScheme="dark"
                                theme={{
                                    dark: ["#1e293b", "#0369a1", "#0ea5e9", "#3b82f6", "#8b5cf6"],
                                }}
                                labels={{
                                    totalCount: "{{count}} contributions in the last year",
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full md:hidden">
                        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-5">
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Contributions This Month
                                </p>
                                <span className="text-sm font-bold text-cyan-300">{monthlyTotal}</span>
                            </div>

                            <div className="grid grid-cols-4 gap-3">
                                {monthlyBars.map((bar) => (
                                    <div key={bar.week} className="flex flex-col items-center gap-2">
                                        <div className="relative h-24 w-full rounded-lg border border-white/[0.06] bg-slate-950/40">
                                            <div
                                                className="absolute inset-x-1 bottom-1 rounded-md bg-gradient-to-t from-blue-500/70 to-cyan-300/75"
                                                style={{ height: `${Math.max(10, (bar.value / maxMonthlyBar) * 88)}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                            {bar.week}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-300">{bar.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://github.com/Aditgm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="signature-outline group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                    >
                        View on GitHub
                        <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
