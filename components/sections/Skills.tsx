"use client";

import { motion } from "framer-motion";

const groups = [
  {
    label: "Frontend",
    items: [
      { name: "Next.js",      color: "bg-white/8 text-white/80 border-white/12" },
      { name: "JavaScript",   color: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20" },
      { name: "TypeScript",   color: "bg-blue-400/10 text-blue-300 border-blue-400/20" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", color: "bg-green-500/10 text-green-300 border-green-500/20" },
      { name: "Python",  color: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
    ],
  },
  {
    label: "Infra & DB",
    items: [
      { name: "AWS",   color: "bg-orange-400/10 text-orange-300 border-orange-400/20" },
      { name: "MySQL", color: "bg-sky-500/10 text-sky-300 border-sky-500/20" },
    ],
  },
  {
    label: "AI",
    items: [
      { name: "GPT API",  color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
      { name: "Grok AI",  color: "bg-violet-500/10 text-violet-300 border-violet-500/20" },
      { name: "Whisper",  color: "bg-rose-500/10 text-rose-300 border-rose-500/20" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git",          color: "bg-red-500/10 text-red-300 border-red-500/20" },
      { name: "Premiere Pro", color: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="snap-section flex flex-col justify-center px-6 py-20 md:px-16 md:py-0 lg:px-24">
      {/* Background number */}
      <div className="absolute right-8 bottom-8 text-[18vw] font-black text-white/[0.05] leading-none select-none pointer-events-none">
        SKILLS
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em] mb-5"
      >
        Skills
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-4xl font-black leading-none tracking-tight md:mb-14 md:text-6xl lg:text-7xl"
      >
        기술 스택
      </motion.h2>

      <div className="space-y-6">
        {groups.map((g, gi) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: gi * 0.07 }}
            className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4"
          >
            <span className="w-16 flex-shrink-0 text-[10px] font-mono uppercase tracking-widest text-white/40">
              {g.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {g.items.map((skill, si) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: gi * 0.07 + si * 0.04 }}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium sm:px-4 sm:text-sm ${skill.color}`}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
