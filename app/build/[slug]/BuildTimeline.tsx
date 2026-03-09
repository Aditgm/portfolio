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
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: "672px", position: "relative" }}>
                {/* Central vertical line */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: 0,
                        bottom: 0,
                        width: "1px",
                        transform: "translateX(-50%)",
                        background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.3), transparent)",
                    }}
                />

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7rem", position: "relative", zIndex: 10, padding: "2rem 1rem" }}>
                    {steps.map((step, index) => (
                        <div key={step.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                            {/* Icon / Node */}
                            <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
                                style={{ position: "relative", zIndex: 20, marginBottom: "2rem" }}
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
                                style={{ width: "100%" }}
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
                                    <div
                                        style={{
                                            position: "relative",
                                            overflow: "hidden",
                                            borderRadius: "1rem",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            background: "rgba(255,255,255,0.03)",
                                            padding: "2rem 2.5rem",
                                            backdropFilter: "blur(12px)",
                                            boxShadow: "0 8px 30px rgb(0,0,0,0.5)",
                                            transition: "all 0.5s ease",
                                        }}
                                    >
                                        {/* Hover gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
                                        {/* Top accent line */}
                                        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3px", background: "linear-gradient(to right, transparent, rgba(59,130,246,0.4), transparent)", opacity: 0.6 }} />

                                        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
                                            <div className={`text-xs font-mono font-bold tracking-widest mb-4 opacity-90 ${step.color}`}>
                                                STEP // 0{step.id}
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 transition-colors hover:text-blue-200">
                                                {step.title}
                                            </h3>
                                            <p className="text-[0.95rem] md:text-base text-slate-300 leading-relaxed font-medium" style={{ maxWidth: "32rem", margin: "0 auto" }}>
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
        </div>
    );
}
