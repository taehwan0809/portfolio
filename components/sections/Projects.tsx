"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Github, ExternalLink, Monitor, Users } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  const [projectIdx, setProjectIdx] = useState(0);
  const [imgIdx, setImgIdx]         = useState(0);
  const [dir, setDir]               = useState(1); // slide direction

  const total = projects.length;
  const project = projects[projectIdx];

  // Reset image index when project changes
  useEffect(() => { setImgIdx(0); }, [projectIdx]);

  const prevProject = useCallback(() => {
    setDir(-1);
    setProjectIdx((i) => (i - 1 + total) % total);
  }, [total]);

  const nextProject = useCallback(() => {
    setDir(1);
    setProjectIdx((i) => (i + 1) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prevProject();
      if (e.key === "ArrowRight") nextProject();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prevProject, nextProject]);

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i - 1 + project.images.length) % project.images.length);
  };
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i + 1) % project.images.length);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "8%" : "-8%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-8%" : "8%", opacity: 0 }),
  };

  return (
    <section id="projects" className="snap-section flex flex-col">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-6 md:px-12 pt-16 pb-0 flex-shrink-0">
        <div>
          <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em]">Projects</p>
          <p className="text-white/40 text-xs font-mono mt-0.5">
            {String(projectIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevProject}
            className="w-9 h-9 rounded-full glass border border-white/10 hover:border-white/25 flex items-center justify-center transition-all"
          >
            <ChevronLeft size={15} className="text-white/60" />
          </button>
          <button
            onClick={nextProject}
            className="w-9 h-9 rounded-full glass border border-white/10 hover:border-white/25 flex items-center justify-center transition-all"
          >
            <ChevronRight size={15} className="text-white/60" />
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex min-h-0">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={project.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-1 grid md:grid-cols-[55%_45%] min-h-0"
          >
            {/* ── Left: Image carousel ── */}
            <div className="relative bg-black/30 overflow-hidden group">
              {/* Accent gradient overlay */}
              <div
                className="absolute inset-0 opacity-20 z-10 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at center, ${project.accentColor}33, transparent 70%)` }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={imgIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${project.images[imgIdx]}`}
                    alt={`${project.title} 스크린샷 ${imgIdx + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image nav arrows */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={14} className="text-white" />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={14} className="text-white" />
                  </button>

                  {/* Image dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                        className={`rounded-full transition-all duration-200 ${
                          i === imgIdx ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Image counter */}
                  <div className="absolute top-4 right-4 z-20 px-2 py-0.5 rounded-full bg-black/50 text-white/70 text-[10px] font-mono">
                    {imgIdx + 1} / {project.images.length}
                  </div>
                </>
              )}
            </div>

            {/* ── Right: Project info ── */}
            <div className="flex flex-col justify-between px-8 md:px-10 py-8 md:py-10 overflow-y-auto">
              <div>
                {/* Index */}
                <p className="text-[10px] font-mono text-white/45 uppercase tracking-widest mb-4">
                  Project {String(projectIdx + 1).padStart(2, "0")}
                </p>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none mb-3">
                  {project.title}
                </h2>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 mb-4 text-xs text-white/55">
                  <span className="flex items-center gap-1.5"><Monitor size={11} />{project.platform}</span>
                  <span className="flex items-center gap-1.5"><Users size={11} />{project.teamSize}</span>
                  <span>⏱ {project.period}</span>
                </div>
                {project.role && (
                  <p className="text-indigo-300 text-xs mb-4">나의 역할 — {project.role}</p>
                )}

                {/* Description */}
                <p className="text-white/75 text-sm leading-relaxed mb-3">
                  {project.longDescription}
                </p>

                {/* Features */}
                {"features" in project && (project as { features?: string }).features && (
                  <div className="mb-3">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">기능</p>
                    <p className="text-white/60 text-xs leading-relaxed">{(project as { features: string }).features}</p>
                  </div>
                )}

                {/* Challenge */}
                {"challenge" in project && (project as { challenge?: string }).challenge && (
                  <div className="mb-4">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">어려움 & 해결</p>
                    <p className="text-white/60 text-xs leading-relaxed">{(project as { challenge: string }).challenge}</p>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-6">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-white/70 hover:text-white text-xs font-medium transition-all border border-white/15 hover:border-white/20"
                  >
                    <Github size={13} />
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-white/70 hover:text-white text-xs font-medium transition-all border border-white/15 hover:border-white/20"
                  >
                    <ExternalLink size={13} />
                    Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom: project dots ── */}
      <div className="flex items-center justify-center gap-1.5 pb-5 flex-shrink-0">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > projectIdx ? 1 : -1); setProjectIdx(i); }}
            className={`rounded-full transition-all duration-200 ${
              i === projectIdx ? "w-5 h-1.5 bg-indigo-400" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
