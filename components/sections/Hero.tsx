"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const roles = ["Creative Developer", "AI × Web Developer", "Problem Solver"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="snap-section flex">
      {/* ── LEFT: text ── */}
      <div className="relative z-10 flex w-full flex-col justify-center px-6 pb-20 pt-24 md:w-[55%] md:px-16 md:py-0 lg:px-24">
        {/* Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-[140px] pointer-events-none" />

        <div className="relative z-10">
          {/* Status */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 md:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to opportunities
          </motion.span>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-3 font-black leading-none tracking-tight"
          >
            <span className="gradient-text block text-[clamp(3.25rem,18vw,7rem)]">박태환</span>
            <span className="mt-2 block text-xs font-light uppercase tracking-[0.28em] text-white/50 md:text-base md:tracking-[0.35em]">
              Park Tae Hwan
            </span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4, originX: 0 }}
            style={{ transformOrigin: "left" }}
            className="my-6 h-px w-40 bg-gradient-to-r from-indigo-500/60 to-transparent md:my-7 md:w-48"
          />

          {/* Rotating role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mb-7 h-6 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-sm md:text-base text-indigo-300"
              >
                {`// ${roles[roleIndex]}`}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mb-9 max-w-sm text-sm leading-relaxed text-white/60 md:mb-10 md:text-base"
          >
            새로운 기술로 직접 만들어보는 것을 즐깁니다.{" "}
            <span className="text-white/80">Next.js · Python · Node.js · AWS</span>를 주로 사용합니다.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="https://github.com/taehwan0809"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-all"
            >
              GitHub
            </a>
            <a
              href="https://taehwan0809.tistory.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 glass text-white/70 hover:text-white text-sm font-medium rounded-xl transition-all"
            >
              Blog
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-12 flex gap-6 border-t border-white/10 pt-7 md:mt-14 md:gap-8 md:pt-8"
          >
            {[
              { v: "10+", l: "Projects" },
              { v: "8+",  l: "Awards" },
              { v: "2+",  l: "Years" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-xl md:text-2xl font-bold text-white">{s.v}</p>
                <p className="text-[10px] text-white/50 mt-0.5 uppercase tracking-widest">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT: photo ── */}
      <div className="hidden md:block absolute right-0 top-0 w-[45%] h-full">
        <div className="absolute inset-y-0 left-0 w-40 z-10 bg-gradient-to-r from-[#312e81] to-transparent" />
        <div className="absolute inset-0 bg-black/15 z-10" />
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="w-full h-full"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/main-photo.jpg`}
            alt="박태환"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex"
      >
        <span className="text-[9px] font-mono text-white/40 tracking-[0.25em] uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
