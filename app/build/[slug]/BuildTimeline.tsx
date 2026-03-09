"use client";

import { motion } from "framer-motion";

interface Step {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bg: string;
    border: string;
}

export default function BuildTimeline({ steps }: { steps: Step[] }) {
    return (
        <div className="relative py-12">
            {/* Central Line */}
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0" />

            <div className="space-y-16">
                {steps.map((step, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <div
                            key={step.id}
                            className="relative flex flex-col md:flex-row items-start md:items-center w-full"
                        >
                            {/* Icon / Node */}
                            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050510] border border-white/[0.1] shadow-xl z-20">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.bg} ${step.border} ${step.color} border`}
                                >
                                    {step.icon}
                                </motion.div>
                            </div>

                            {/* Content Card container */}
                            <div
                                className={`w-full md:w-1/2 pt-16 md:pt-0 pl-20 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto"
                                    }`}
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -20 : 20, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="group relative card overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                                    <div className={`text-xs font-mono mb-3 ${step.color}`}>STEP {step.id}</div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
