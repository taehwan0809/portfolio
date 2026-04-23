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
  const imageTotal = project.images.length;

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

  const prevImg = () => {
    setImgIdx((i) => (i - 1 + imageTotal) % imageTotal);
  };
  const nextImg = () => {
    setImgIdx((i) => (i + 1) % imageTotal);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "8%" : "-8%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-8%" : "8%", opacity: 0 }),
  };

  return (
    <section id="projects" className="snap-section flex flex-col">
      {/* ── Top bar ── */}
      <div className="flex flex-shrink-0 items-center justify-between px-6 pb-5 pt-16 md:px-12">
        <div>
          <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em]">Projects</p>
          <p className="text-white/40 text-xs font-mono mt-0.5">
            {String(projectIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex min-h-0 flex-1">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={project.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid min-h-0 flex-1 md:grid-cols-[55%_45%]"
          >
            {/* ── Left: Image carousel ── */}
            <div className="flex flex-col justify-center bg-black/20 px-5 pb-6 md:px-10 md:pb-10">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-black/30 md:rounded-[28px]">
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
              </div>

              {imageTotal > 1 && (
                <div className="mt-3 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      prevImg();
                    }}
                    aria-label="이전 스크린샷 보기"
                    className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-white/30 transition-all hover:bg-white/[0.08] hover:text-white/60"
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <div className="min-w-10 text-center font-mono text-[11px] text-white/35">
                    {imgIdx + 1} / {imageTotal}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      nextImg();
                    }}
                    aria-label="다음 스크린샷 보기"
                    className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-white/30 transition-all hover:bg-white/[0.08] hover:text-white/60"
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              )}
            </div>

            {/* ── Right: Project info ── */}
            <div className="flex flex-col justify-between overflow-y-visible px-6 py-7 md:overflow-y-auto md:px-10 md:py-10">
              <div>
                {/* Index */}
                <p className="mb-3 text-[10px] font-mono uppercase tracking-widest text-white/45 md:mb-4">
                  Project {String(projectIdx + 1).padStart(2, "0")}
                </p>

                {/* Title */}
                <h2 className="mb-3 text-3xl font-black leading-none tracking-tight text-white md:text-4xl">
                  {project.title}
                </h2>

                {/* Meta */}
                <div className="mb-4 flex flex-wrap gap-3 text-xs text-white/55">
                  <span className="flex items-center gap-1.5"><Monitor size={11} />{project.platform}</span>
                  <span className="flex items-center gap-1.5"><Users size={11} />{project.teamSize}</span>
                  <span>⏱ {project.period}</span>
                </div>
                {project.role && (
                  <p className="text-indigo-300 text-xs mb-4">나의 역할 — {project.role}</p>
                )}

                {/* Description */}
                <p className="mb-3 text-sm leading-relaxed text-white/75">
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
              <div className="mt-6 border-t border-white/10 pt-6">
                <div className="flex flex-wrap items-center gap-3">
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
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex-shrink-0 px-6 pb-8 md:pb-6">
        <div className="mx-auto flex w-fit items-center gap-5 rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur-md">
          <button
            onClick={prevProject}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-all hover:bg-white/90"
            aria-label="이전 프로젝트 보기"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="min-w-16 text-center font-mono text-sm text-white/70">
            {projectIdx + 1} / {total}
          </div>
          <button
            onClick={nextProject}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-all hover:bg-white/90"
            aria-label="다음 프로젝트 보기"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
