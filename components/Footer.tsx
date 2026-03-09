"use client";

import { motion } from "framer-motion";
import { Github, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Aditgm", icon: <Github size={15} />, hoverColor: "hover:text-white" },
  { label: "LeetCode", href: "https://leetcode.com/u/adityagm/", hoverColor: "hover:text-amber-300" },
  { label: "Codeforces", href: "https://codeforces.com/profile/aditya2005", hoverColor: "hover:text-orange-300" },
  { label: "CodeChef", href: "https://www.codechef.com/users/adityagm", hoverColor: "hover:text-green-300" },
];

export default function Footer() {
  return (
    <footer id="contact" className="section-container geo-divider-top relative">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 geo-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 bottom-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/[0.04] blur-[140px]" />

      {/* Floating geometric shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[5%] top-[20%] h-8 w-8 rotate-45 rounded-sm border border-blue-500/10 opacity-40" style={{ animation: "float-slow 12s ease-in-out infinite" }} />
        <div className="absolute right-[10%] top-[30%] h-6 w-6 rotate-45 rounded-sm border border-purple-500/10 opacity-30" style={{ animation: "float-slow 10s ease-in-out infinite 2s" }} />
        <div className="absolute left-[15%] bottom-[30%] h-4 w-4 rounded-full border border-cyan-500/10 opacity-30" style={{ animation: "float 8s ease-in-out infinite 1s" }} />
      </div>

      <div className="section-inner flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex w-full flex-col items-center text-center md:mb-14"
        >
          <p className="section-label mb-4 justify-center after:block after:h-px after:w-8 after:bg-gradient-to-l after:from-blue-500 after:to-cyan-500">Contact</p>
          <h2 className="section-title text-center">
            Get In <span className="text-gradient-static">Touch</span>
          </h2>
          <p className="mx-auto mt-6 block w-full max-w-2xl self-center px-2 text-center text-sm leading-[1.85] text-slate-400 md:px-0 md:text-base md:leading-8">
            I&apos;m currently open to new opportunities. Whether you have a question,
            a project idea, or just want to say hi — my inbox is always open.
          </p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="card border-trace mx-auto flex w-full max-w-2xl flex-col items-center gap-8 overflow-hidden"
        >
          {/* Top gradient accent */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          <div className="w-full px-10 pt-8 pb-10 md:px-12 md:pt-10 md:pb-12 flex flex-col items-center text-center gap-10">
            {/* Direct Email Links */}
            <div className="w-full max-w-sm flex flex-col gap-4">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=arajsinha4@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-8 py-4 text-sm font-semibold text-red-100 shadow-lg shadow-red-500/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500/20 hover:shadow-red-500/20 hover:border-red-500/50"
              >
                <span className="relative flex items-center justify-center gap-3">Compose in Gmail <Mail size={16} className="text-red-300" /></span>
              </a>

              <a
                href="https://outlook.live.com/mail/0/deeplink/compose?to=arajsinha4@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-center gap-3 rounded-xl border border-blue-500/30 bg-blue-500/10 px-8 py-4 text-sm font-semibold text-blue-100 shadow-lg shadow-blue-500/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500/20 hover:shadow-blue-500/20 hover:border-blue-500/50"
              >
                <span className="relative flex items-center justify-center gap-3">Compose in Outlook <Mail size={16} className="text-blue-300" /></span>
              </a>

              <div className="flex items-center gap-4 my-2">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Or</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <a
                href="mailto:arajsinha4@gmail.com"
                className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/20"
              >
                <span className="relative flex items-center justify-center gap-2">Open Default Mail App <Mail size={16} className="text-slate-400" /></span>
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 rounded-lg px-5 py-2.5 text-sm text-slate-500 transition-all duration-300 hover:bg-white/[0.04] ${link.hoverColor}`}
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>

            {/* Location */}
            <span className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin size={12} />
              Dehradun, Uttarakhand, India
            </span>
          </div>
        </motion.div>

        {/* Footer bottom */}
        <div className="mt-16 flex w-full flex-col items-center justify-between gap-5 pt-8 md:flex-row">
          {/* Geometric divider */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" style={{ marginTop: '-2rem' }} />

          <p className="text-xs text-slate-600">
            &copy; 2026 Aditya Raj. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-mono">Built with</span>
            <span className="h-3 w-px bg-slate-800" />
            <span className="text-blue-400/60">Next.js</span>
            <span className="h-1 w-1 rotate-45 rounded-[1px] bg-slate-700" />
            <span className="text-cyan-400/60">Tailwind CSS</span>
            <span className="h-1 w-1 rotate-45 rounded-[1px] bg-slate-700" />
            <span className="text-purple-400/60">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
