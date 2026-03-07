"use client";

import { motion } from "framer-motion";

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
    icon: "⚡",
    color: "text-purple-400",
    borderAccent: "from-purple-500 to-pink-500",
    skills: ["MongoDB", "Pinecone (Vector DB)", "Llama 3.3", "Google Gemini API", "RAG", "Roboflow"],
  },
  {
    cat: "Tools & Platforms",
    icon: "⚙",
    color: "text-orange-400",
    borderAccent: "from-orange-500 to-amber-500",
    skills: ["Docker", "Git/GitHub", "Render", "Socket.io", "Pandas", "Plotly"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-container geo-divider-top relative">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[350px] w-[350px] rounded-full bg-cyan-600/[0.03] blur-[100px]" />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20"
        >
          <p className="section-label mb-5 justify-center md:justify-start">Skills</p>
          <h2 className="section-title text-center md:text-left">
            Technical <span className="text-gradient-static">Toolkit</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
          {groups.map((g, i) => (
            <motion.div
              key={g.cat}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="card border-trace group overflow-hidden flex flex-col h-full"
            >
              {/* Top gradient line */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${g.borderAccent} opacity-80`} />

              <div className="flex-1 p-10 md:p-12 flex flex-col gap-10">
                {/* Header */}
                <div className="flex items-center gap-5">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                    {/* Geometric shield container */}
                    <div className={`absolute inset-0 rounded-2xl border-2 border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent transition-all duration-300 group-hover:border-white/[0.15] hover:scale-105`} />
                    <div className="absolute inset-1 rounded-xl bg-[#030711]" />
                    <span className={`relative font-mono text-lg font-bold ${g.color}`}>{g.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{g.cat}</h3>
                    <p className="mt-1 font-mono text-sm tracking-widest text-slate-500 uppercase">{g.skills.length} technologies</p>
                  </div>
                </div>

                {/* Skills grid */}
                <div className="flex flex-wrap gap-4 mt-auto pt-4">
                  {g.skills.map((s, j) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + j * 0.03 }}
                      className="group/skill relative flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.25] hover:bg-white/[0.08] hover:text-white hover:shadow-lg"
                    >
                      {/* Hover glow */}
                      <span className={`absolute inset-0 rounded-xl bg-gradient-to-r ${g.borderAccent} opacity-0 blur-md transition-opacity duration-300 group-hover/skill:opacity-[0.15]`} />
                      <span className="relative z-10">{s}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
