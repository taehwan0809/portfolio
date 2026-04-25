"use client";

import { motion } from "framer-motion";
import { Trophy, BookOpen, Award } from "lucide-react";
import { awardsByYear, certificates } from "@/data/awards";

export default function Awards() {
  return (
    <section id="awards" className="py-14 md:py-24 px-4 md:px-16 lg:px-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em] mb-5"
      >
        Awards & Certificates
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[clamp(2rem,8vw,4.5rem)] font-black tracking-tight leading-tight mb-8 md:leading-none md:mb-12"
      >
        수상 &{" "}
        <span className="text-white/30">자격증</span>
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-[1fr_260px] md:gap-8 max-w-5xl">
        {/* Awards by year */}
        <div className="space-y-7">
          {awardsByYear.map((group, gi) =>
            group.items.length > 0 && (
              <motion.div
                key={group.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gi * 0.08 }}
              >
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Trophy size={11} className="text-yellow-400" />
                  {group.year}
                </p>
                <div className="glass rounded-2xl overflow-hidden border border-white/10">
                  {group.items.map((item, i) => (
                    <div
                      key={item.id}
                      className={`px-4 py-3 text-sm text-white/75 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 ${
                        i !== group.items.length - 1 ? "border-b border-white/8" : ""
                      }`}
                    >
                      <span className="text-yellow-400/60 text-xs">·</span>
                      {item.title}
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Certificates + badge */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
              <BookOpen size={11} className="text-indigo-400" />
              자격증
            </p>
            <div className="space-y-2">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                  className="glass rounded-2xl px-4 py-3 border border-indigo-400/20 hover:border-indigo-400/40 transition-all flex items-center justify-between"
                >
                  <span className="text-white/85 text-sm font-medium">{cert.title}</span>
                  <span className="text-white/40 text-[10px] font-mono">{cert.year}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Total badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass rounded-2xl px-4 py-5 border border-yellow-400/20 text-center mt-4"
          >
            <Award size={20} className="text-yellow-400 mx-auto mb-2" />
            <p className="text-4xl font-black text-white">8<span className="text-yellow-400">+</span></p>
            <p className="text-white/40 text-[10px] mt-1 uppercase tracking-widest">총 수상 경력</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
