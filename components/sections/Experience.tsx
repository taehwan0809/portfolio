"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, GraduationCap, Users, Briefcase } from "lucide-react";
import { experiences } from "@/data/experience";

const typeConfig = {
  work:      { icon: Briefcase,      color: "text-blue-400",    bg: "bg-blue-400/10",    border: "border-blue-400/20",    label: "경력" },
  education: { icon: GraduationCap,  color: "text-violet-400",  bg: "bg-violet-400/10",  border: "border-violet-400/20",  label: "교육" },
  activity:  { icon: Users,          color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", label: "활동" },
};

export default function Experience() {
  const [idx, setIdx]       = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [dir, setDir]       = useState(1);

  const total = experiences.length;
  const exp   = experiences[idx];

  useEffect(() => { setImgIdx(0); }, [idx]);

  const prev = useCallback(() => { setDir(-1); setIdx((i) => (i - 1 + total) % total); }, [total]);
  const next = useCallback(() => { setDir(1);  setIdx((i) => (i + 1) % total); }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const section = document.getElementById("experience");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const cfg    = typeConfig[exp.type];
  const Icon   = cfg.icon;
  const images = exp.images ?? [];

  const slideVariants = {
    enter:  (d: number) => ({ x: d > 0 ? "6%" : "-6%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? "-6%" : "6%", opacity: 0 }),
  };

  return (
    <section id="experience" className="px-6 py-16 md:px-12 md:py-24">
      {/* Top bar */}
      <div className="mx-auto mb-6 flex max-w-5xl items-center justify-between">
        <div>
          <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em]">Experience</p>
          <p className="text-white/40 text-xs font-mono mt-0.5">
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full glass border border-white/10 hover:border-white/25 flex items-center justify-center transition-all"
          >
            <ChevronLeft size={15} className="text-white/60" />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full glass border border-white/10 hover:border-white/25 flex items-center justify-center transition-all"
          >
            <ChevronRight size={15} className="text-white/60" />
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={exp.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass grid h-auto overflow-hidden rounded-3xl md:h-[460px] md:grid-cols-[45%_55%]"
          >
            {/* Left: image */}
            <div className="group relative h-56 overflow-hidden bg-black/20 md:h-auto">
              {/* Preload adjacent slide images to eliminate load delay */}
              {[-1, 1].map((offset) => {
                const neighbor = experiences[(idx + offset + total) % total];
                const preloadSrc = neighbor.images?.[0];
                if (!preloadSrc) return null;
                return (
                  <img
                    key={offset}
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${preloadSrc}`}
                    className="hidden"
                    alt=""
                    aria-hidden="true"
                  />
                );
              })}

              {images.length > 0 ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imgIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${images[imgIdx]}`}
                        alt={exp.title}
                        fill
                        loading="eager"
                        className="object-cover object-center"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/25" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Image nav */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={14} className="text-white" />
                      </button>
                      <button
                        onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={14} className="text-white" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImgIdx(i)}
                            className={`rounded-full transition-all ${i === imgIdx ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className={`w-20 h-20 rounded-3xl ${cfg.bg} border ${cfg.border} flex items-center justify-center`}>
                    <Icon size={32} className={cfg.color} />
                  </div>
                  <p className="text-white/25 text-xs font-mono">{exp.organization}</p>
                </div>
              )}
            </div>

            {/* Right: info */}
            <div className="flex flex-col justify-center overflow-y-visible px-6 py-7 md:overflow-y-auto md:px-10 md:py-8">
              {/* Type badge */}
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${cfg.bg} border ${cfg.border} mb-4 self-start`}>
                <Icon size={11} className={cfg.color} />
                <span className={`text-[10px] font-medium ${cfg.color}`}>{cfg.label}</span>
              </div>

              <h2 className="mb-1.5 text-xl font-black leading-tight tracking-tight text-white md:text-2xl">
                {exp.title}
              </h2>

              <p className="text-indigo-400 text-sm mb-0.5">{exp.organization}</p>
              <p className="text-white/45 text-xs font-mono mb-4">{exp.period}</p>

              <p className="text-white/75 text-sm leading-relaxed mb-5">
                {exp.description}
              </p>

              {exp.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tag text-[10px]">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom dots */}
      <div className="flex items-center justify-center gap-1.5 mt-6">
        {experiences.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
            className={`rounded-full transition-all duration-200 ${
              i === idx ? "w-5 h-1.5 bg-indigo-400" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
