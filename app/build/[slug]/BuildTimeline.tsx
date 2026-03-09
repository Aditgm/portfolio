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
        <div className="relative w-full py-8 md:py-16">
            {/* Central vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0 -translate-x-1/2" />

            <div className="relative z-10 mx-auto flex flex-col items-center gap-28 w-full max-w-2xl px-4">
                {steps.map((step, index) => (
                    <div key={step.id} className="relative flex flex-col items-center w-full">
                        {/* Icon / Node */}
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
                            className="relative z-20 mb-8"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#050510] border border-white/[0.1] shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-110">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.bg} ${step.border} ${step.color} border backdrop-blur-md`}>
                                    {step.icon}
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: 0.1 + index * 0.05, type: "spring", stiffness: 150, damping: 20 }}
                            className="w-full"
                        >
                            <Tilt
                                tiltMaxAngleX={8}
                                tiltMaxAngleY={8}
                                glareEnable={true}
                                glareMaxOpacity={0.15}
                                glareColor="#ffffff"
                                glarePosition="all"
                                glareBorderRadius="1rem"
                                transitionSpeed={1200}
                                scale={1.02}
                            >
                                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-10 hover:bg-white/[0.06] transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-md hover:border-white/[0.15]">
                                    {/* Hover gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    {/* Top accent line */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-60" />

                                    <div className="relative z-10 text-center">
                                        <div className={`text-xs font-mono font-bold tracking-widest mb-4 opacity-90 ${step.color}`}>
                                            STEP // 0{step.id}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 transition-colors group-hover:text-blue-200">
                                            {step.title}
                                        </h3>
                                        <p className="text-[0.95rem] md:text-base text-slate-300 leading-relaxed font-medium max-w-lg mx-auto">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </Tilt>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
}
