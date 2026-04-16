"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Copy, Check, ExternalLink } from "lucide-react";

const EMAIL = "dcpop28201004@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="snap-section flex flex-col items-center justify-center px-6 text-center">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span className="text-[20vw] font-black text-white/[0.04] tracking-tighter leading-none">
          CONTACT
        </span>
      </div>

      <div className="relative z-10 max-w-xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em] mb-6"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-5"
        >
          같이
          <br />
          <span className="text-white/20">만들어요.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-white/60 text-sm md:text-base mb-10"
        >
          새로운 기회, 협업 제안, 또는 그냥 안부도 환영합니다.
        </motion.p>

        {/* Email */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onClick={copy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl glass border border-white/20 hover:border-white/20 text-white/85 hover:text-white transition-all mb-8 group"
        >
          <span className="font-mono text-sm">{EMAIL}</span>
          <span className="text-white/45 group-hover:text-white/50 transition-colors">
            {copied
              ? <Check size={14} className="text-emerald-400" />
              : <Copy size={14} />
            }
          </span>
        </motion.button>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3"
        >
          <a
            href="https://github.com/taehwan0809"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/15 hover:border-white/20 text-white/60 hover:text-white text-sm font-medium transition-all"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href="https://taehwan0809.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/15 hover:border-white/20 text-white/60 hover:text-white text-sm font-medium transition-all"
          >
            <ExternalLink size={14} />
            Blog
          </a>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 mt-10 px-4 py-2 rounded-full border border-white/15 text-[10px] text-white/45"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          현재 기회 탐색 중
        </motion.div>
      </div>
    </section>
  );
}
