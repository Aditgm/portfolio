"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";

export default function GithubGraph() {
    return (
        <section className="section-container geo-divider-top relative">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
            <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-blue-600/[0.04] blur-[120px]" />
            <div className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-purple-600/[0.04] blur-[100px]" />

            <div className="section-inner">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-14 max-w-2xl"
                >
                    <div className="flex items-center gap-3 mb-4 section-label">
                        <Github size={18} />
                        <p className="m-0">Contributions</p>
                    </div>
                    <h2 className="section-title">
                        GitHub <span className="text-gradient-static">Graph</span>
                    </h2>
                    <p className="mt-5 text-sm leading-7 text-slate-400 md:text-base md:leading-8">
                        A visual representation of my open-source contributions, consistent coding habits, and project commitments.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="card border-trace mx-auto flex w-full flex-col items-center gap-8 overflow-hidden rounded-2xl bg-white/[0.02] p-6 sm:p-10"
                >
                    {/* Top gradient accent line */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                    <div className="w-full overflow-x-auto overflow-y-hidden text-sm text-slate-300 flex justify-center pb-2 [&_.react-activity-calendar\_\_count]:rounded-xl [&_.react-activity-calendar\_\_count]:border [&_.react-activity-calendar\_\_count]:border-blue-500/20 [&_.react-activity-calendar\_\_count]:bg-blue-500/10 [&_.react-activity-calendar\_\_count]:px-4 [&_.react-activity-calendar\_\_count]:py-1.5 [&_.react-activity-calendar\_\_count]:text-blue-300 [&_.react-activity-calendar\_\_count]:font-bold [&_.react-activity-calendar\_\_count]:shadow-lg [&_.react-activity-calendar\_\_count]:shadow-blue-500/10 [&_.react-activity-calendar\_\_count]:tracking-wide">
                        <div className="min-w-max px-2">
                            <GitHubCalendar
                                username="Aditgm"
                                colorScheme="dark"
                                theme={{
                                    dark: ['#1e293b', '#0369a1', '#0ea5e9', '#3b82f6', '#8b5cf6'],
                                }}
                                labels={{
                                    totalCount: '{{count}} contributions in the last year',
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
