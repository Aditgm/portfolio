"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Trophy, Target, Flame, Star, Zap, Award } from "lucide-react";

/* ───── achievement data ───── */
interface Achievement {
    title: string;
    platform: string;
    highlight: string;
    description: string;
    stat: string;
    statLabel: string;
    profileUrl: string;
    accent: string;        // tailwind text color
    glowFrom: string;      // gradient from
    glowTo: string;        // gradient to
    borderAccent: string;
    icon: React.ReactNode;
}

const achievements: Achievement[] = [
    {
        title: "Guardian",
        platform: "LeetCode",
        highlight: "Top 0.4% Globally",
        description: "Achieved Guardian rank with 2360+ rating, consistently competing in weekly and biweekly contests. Solved 550+ problems across all difficulty levels.",
        stat: "2360+",
        statLabel: "Contest Rating",
        profileUrl: "https://leetcode.com/u/adityagm/",
        accent: "text-amber-400",
        glowFrom: "from-amber-500/20",
        glowTo: "to-yellow-500/5",
        borderAccent: "border-amber-500/15 hover:border-amber-500/30",
        icon: <Trophy className="h-6 w-6" />,
    },
    {
        title: "Master",
        platform: "Codeforces",
        highlight: "Top 0.8% Globally",
        description: "Reached Master rank (2131 rating) on Codeforces, solving complex algorithmic problems under time pressure. Ranked 45th out of 20,000+ in CF Round 1068.",
        stat: "2131",
        statLabel: "Peak Rating",
        profileUrl: "https://codeforces.com/profile/aditya2005",
        accent: "text-orange-400",
        glowFrom: "from-orange-500/20",
        glowTo: "to-red-500/5",
        borderAccent: "border-orange-500/15 hover:border-orange-500/30",
        icon: <Flame className="h-6 w-6" />,
    },
    {
        title: "5★ Coder",
        platform: "CodeChef",
        highlight: "Ranked 470th in India",
        description: "Achieved 5-star rating with 2101 on CodeChef, mastering competitive programming across Long Challenges, Cook-Offs, and Lunch Time contests.",
        stat: "2101",
        statLabel: "Max Rating",
        profileUrl: "https://www.codechef.com/users/adityagm",
        accent: "text-green-400",
        glowFrom: "from-green-500/20",
        glowTo: "to-emerald-500/5",
        borderAccent: "border-green-500/15 hover:border-green-500/30",
        icon: <Star className="h-6 w-6" />,
    },
    {
        title: "2000+ Problems",
        platform: "All Platforms",
        highlight: "Consistent Practice",
        description: "Solved over 2000 problems across LeetCode, Codeforces, CodeChef, CSES, HackerRank, and VJudge — building deep expertise in data structures and algorithms.",
        stat: "2000+",
        statLabel: "Total Solved",
        profileUrl: "https://vjudge.net/user/aditya6789",
        accent: "text-blue-400",
        glowFrom: "from-blue-500/20",
        glowTo: "to-cyan-500/5",
        borderAccent: "border-blue-500/15 hover:border-blue-500/30",
        icon: <Zap className="h-6 w-6" />,
    },
    {
        title: "Rank #169 / 30,000+",
        platform: "LeetCode Weekly 462",
        highlight: "Top 0.005%",
        description: "Achieved an outstanding rank of 169 out of 30,000+ participants in LeetCode Weekly Contest 462, demonstrating elite-level speed and accuracy.",
        stat: "#169",
        statLabel: "Contest Rank",
        profileUrl: "https://leetcode.com/u/adityagm/",
        accent: "text-amber-300",
        glowFrom: "from-amber-500/20",
        glowTo: "to-amber-500/5",
        borderAccent: "border-amber-500/15 hover:border-amber-400/30",
        icon: <Target className="h-6 w-6" />,
    },
    {
        title: "Rank #45 / 20,000+",
        platform: "CF Round 1068, Div. 2",
        highlight: "Top 0.003%",
        description: "Ranked 45th out of 20,000+ participants in Codeforces Round 1068 (Div. 2), a peak performance that pushed the rating to Master level.",
        stat: "#45",
        statLabel: "Contest Rank",
        profileUrl: "https://codeforces.com/profile/aditya2005",
        accent: "text-orange-300",
        glowFrom: "from-orange-500/20",
        glowTo: "to-orange-500/5",
        borderAccent: "border-orange-500/15 hover:border-orange-400/30",
        icon: <Award className="h-6 w-6" />,
    },
];

/* ───── component ───── */
export default function Achievements() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0); // -1 left, 1 right
    const [isPaused, setIsPaused] = useState(false);
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: false, margin: "-100px" });
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const total = achievements.length;

    const goTo = useCallback(
        (idx: number, dir?: number) => {
            setDirection(dir ?? (idx > current ? 1 : -1));
            setCurrent((idx + total) % total);
        },
        [current, total]
    );

    const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

    /* auto-play */
    useEffect(() => {
        if (isPaused || !inView) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }
        timerRef.current = setInterval(next, 2000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused, inView, next]);

    const a = achievements[current];

    /* Framer variants */
    const slideVariants = {
        enter: (d: number) => ({
            x: d > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.92,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (d: number) => ({
            x: d > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.92,
        }),
    };

    return (
        <section
            ref={sectionRef}
            className="section-container geo-divider-top relative"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-600/[0.04] blur-[120px]" />
            <div className="pointer-events-none absolute left-0 top-1/3 h-[300px] w-[300px] rounded-full bg-blue-600/[0.04] blur-[100px]" />

            <div className="section-inner">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-14 max-w-2xl"
                >
                    <p className="section-label mb-4">Achievements</p>
                    <h2 className="section-title">
                        Competitive{" "}
                        <span className="text-gradient-static">Programming</span>
                    </h2>
                    <p className="mt-5 text-sm leading-7 text-slate-400 md:text-base md:leading-8">
                        A showcase of milestones across the world&apos;s top competitive
                        programming platforms.
                    </p>
                </motion.div>

                {/* Carousel */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Main card area */}
                    <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: 340 }}>
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.3 },
                                    scale: { duration: 0.35 },
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.12}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -60) next();
                                    else if (info.offset.x > 60) prev();
                                }}
                                className={`achievement-card card border-trace group cursor-grab active:cursor-grabbing ${a.borderAccent}`}
                            >
                                {/* Top gradient accent line */}
                                <div
                                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${a.glowFrom} via-transparent ${a.glowTo}`}
                                />

                                {/* Ambient glow behind card */}
                                <div
                                    className={`pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br ${a.glowFrom} ${a.glowTo} opacity-40 blur-[80px] transition-opacity duration-500 group-hover:opacity-70`}
                                />

                                <div className="relative z-10 flex flex-col gap-10 p-10 md:flex-row md:items-start md:gap-14 md:p-14">
                                    {/* Left: Icon + Rating */}
                                    <div className="flex flex-col items-center gap-4 md:items-start">
                                        {/* Icon container */}
                                        <div
                                            className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${a.glowFrom} ${a.glowTo} ${a.accent}`}
                                        >
                                            {a.icon}
                                            {/* Pulse ring */}
                                            <div
                                                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${a.glowFrom} ${a.glowTo}`}
                                                style={{ animation: "pulse-ring 2.5s ease-out infinite" }}
                                            />
                                        </div>

                                        {/* Big stat */}
                                        <div className="text-center md:text-left">
                                            <p className={`text-4xl font-extrabold tabular-nums ${a.accent}`}>
                                                {a.stat}
                                            </p>
                                            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                                                {a.statLabel}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: Content */}
                                    <div className="flex-1 space-y-5">
                                        {/* Platform + Title */}
                                        <div>
                                            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                                {a.platform}
                                            </p>
                                            <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                                                {a.title}
                                            </h3>
                                        </div>

                                        {/* Highlight badge */}
                                        <span
                                            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold tracking-wide ${a.borderAccent} ${a.accent} bg-white/[0.02]`}
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                            {a.highlight}
                                        </span>

                                        {/* Description */}
                                        <p className="text-sm leading-7 text-slate-400 md:text-[0.95rem] md:leading-8">
                                            {a.description}
                                        </p>

                                        {/* Profile link */}
                                        <a
                                            href={a.profileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`group/link inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${a.accent} hover:brightness-125`}
                                        >
                                            View Profile
                                            <ArrowUpRight
                                                size={14}
                                                className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="mt-10 flex items-center justify-between">
                        {/* Dot indicators */}
                        <div className="flex items-center gap-2">
                            {achievements.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to achievement ${i + 1}`}
                                    className={`carousel-dot h-2 rounded-full transition-all duration-400 ${i === current
                                        ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                                        : "w-2 bg-slate-700 hover:bg-slate-500"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Arrow buttons */}
                        <div className="flex items-center gap-3">
                            {/* Progress indicator */}
                            <span className="mr-3 font-mono text-xs tabular-nums text-slate-500">
                                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                            </span>

                            <button
                                onClick={prev}
                                aria-label="Previous achievement"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-slate-400 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={next}
                                aria-label="Next achievement"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-slate-400 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Auto-play progress bar */}
                    {!isPaused && inView && (
                        <div className="mt-4 h-px w-full overflow-hidden rounded-full bg-slate-800">
                            <motion.div
                                key={`progress-${current}`}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "linear" }}
                                className="h-full bg-gradient-to-r from-blue-500/60 to-purple-500/60"
                            />
                        </div>
                    )}
                </div>

                {/* Platform quick links */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-40 flex flex-wrap items-center justify-center gap-8"
                >
                    {[
                        { name: "LeetCode", url: "https://leetcode.com/u/adityagm/", color: "text-amber-400 hover:text-amber-200", border: "border-amber-500/20 hover:border-amber-400/50", glow: "hover:shadow-[0_0_24px_rgba(245,158,11,0.18)]" },
                        { name: "Codeforces", url: "https://codeforces.com/profile/aditya2005", color: "text-orange-400 hover:text-orange-200", border: "border-orange-500/20 hover:border-orange-400/50", glow: "hover:shadow-[0_0_24px_rgba(249,115,22,0.18)]" },
                        { name: "CodeChef", url: "https://www.codechef.com/users/adityagm", color: "text-green-400 hover:text-green-200", border: "border-green-500/20 hover:border-green-400/50", glow: "hover:shadow-[0_0_24px_rgba(16,185,129,0.18)]" },
                        { name: "VJudge", url: "https://vjudge.net/user/aditya6789", color: "text-blue-400 hover:text-blue-200", border: "border-blue-500/20 hover:border-blue-400/50", glow: "hover:shadow-[0_0_24px_rgba(59,130,246,0.18)]" },
                    ].map((p) => (
                        <motion.a
                            key={p.name}
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -3, scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className={`group inline-flex items-center gap-2.5 rounded-2xl border bg-white/[0.03] px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-white/[0.07] ${p.color} ${p.border} ${p.glow}`}
                        >
                            {p.name}
                            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
