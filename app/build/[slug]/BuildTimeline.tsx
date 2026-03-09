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
        <div className="relative py-12 md:py-20 flex flex-col items-center w-full">
            {/* Central Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0 -translate-x-1/2" />

            <div className="space-y-32 w-full max-w-3xl px-4 z-10 mt-12">
                {steps.map((step) => {
                    return (
                        <div
                            key={step.id}
                            className="relative flex flex-col items-center w-full"
                        >
                            {/* Icon / Node */}
                            <div className="absolute left-1/2 -translate-x-1/2 -top-12 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#050510] border border-white/[0.1] shadow-[0_0_30px_rgba(0,0,0,0.8)] z-20 transition-transform duration-500 hover:scale-110">
                                <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-opacity-20 ${step.bg} ${step.border} ${step.color} border shadow-[0_0_20px_rgba(var(--tw-gradient-stops),0.4)] backdrop-blur-md`}
                                >
                                    {step.icon}
                                </motion.div>
                            </div>

                            {/* Content Card container */}
                            <div className="w-full mt-6 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 150, damping: 20 }}
                                >
                                    <Tilt
                                        tiltMaxAngleX={10}
                                        tiltMaxAngleY={10}
                                        glareEnable={true}
                                        glareMaxOpacity={0.2}
                                        glareColor="#ffffff"
                                        glarePosition="all"
                                        glareBorderRadius="1rem"
                                        transitionSpeed={1200}
                                        scale={1.03}
                                    >
                                        <div className="group relative card overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-10 hover:bg-white/[0.06] transition-all shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-md">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                            <div className="absolute top-0 w-full left-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />

                                            <div className="relative z-10 pt-4">
                                                <div className={`text-xs font-mono font-bold tracking-widest mb-4 opacity-90 ${step.color}`}>STEP // 0{step.id}</div>
                                                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 transition-colors group-hover:text-blue-200">{step.title}</h3>
                                                <p className="text-[0.95rem] md:text-base text-slate-300 leading-relaxed font-medium mx-auto max-w-prose">
                                                    {step.description}
                                                </p>
                                            </div>
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
