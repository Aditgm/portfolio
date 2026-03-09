"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

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
        <div className="relative py-12 md:py-20 flex flex-col items-center">
            {/* Central Line */}
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 md:-translate-x-1/2" />

            <div className="space-y-16 w-full max-w-4xl">
                {steps.map((step, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <div
                            key={step.id}
                            className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                        >
                            {/* Icon / Node */}
                            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#050510] border border-white/[0.1] shadow-xl z-20 transition-transform duration-500 hover:scale-110">
                                <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.bg} ${step.border} ${step.color} border shadow-[0_0_15px_rgba(var(--tw-gradient-stops),0.3)]`}
                                >
                                    {step.icon}
                                </motion.div>
                            </div>

                            {/* Content Card container */}
                            <div
                                className={`w-full md:w-[45%] pt-16 md:pt-0 pl-20 md:pl-0 ${isEven ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"
                                    }`}
                            >
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -30 : 30, y: 30 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200, damping: 25 }}
                                >
                                    <Tilt
                                        tiltMaxAngleX={8}
                                        tiltMaxAngleY={8}
                                        glareEnable={true}
                                        glareMaxOpacity={0.15}
                                        glareColor="#ffffff"
                                        glarePosition="all"
                                        glareBorderRadius="1rem"
                                        transitionSpeed={1500}
                                        scale={1.02}
                                    >
                                        <div className="group relative card overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors shadow-2xl backdrop-blur-sm">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.bg.replace('/10', '/50')} to-transparent opacity-50`} />

                                            <div className={`text-xs font-mono font-bold tracking-widest mb-4 opacity-80 ${step.color}`}>STEP // 0{step.id}</div>
                                            <h3 className="text-2xl font-bold text-white mb-3 transition-colors group-hover:text-[var(--tw-prose-headings)]">{step.title}</h3>
                                            <p className="text-[0.95rem] text-slate-400 leading-relaxed font-medium">
                                                {step.description}
                                            </p>
                                        </div>
                                    </Tilt>
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
