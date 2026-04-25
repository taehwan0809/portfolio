"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Github, ExternalLink, Monitor, Users } from "lucide-react";
import { projects } from "@/data/projects";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Projects() {
  const [projectIdx, setProjectIdx] = useState(0);
  const [imgIdx, setImgIdx]         = useState(0);
  const [dir, setDir]               = useState(1);

  const total = projects.length;
  const project = projects[projectIdx];
  const imageTotal = project.images.length;

  useEffect(() => { setImgIdx(0); }, [projectIdx]);

  const prevProject = useCallback(() => {
    setDir(-1);
    setProjectIdx((i) => (i - 1 + total) % total);
  }, [total]);

  const nextProject = useCallback(() => {
    setDir(1);
    setProjectIdx((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prevProject();
      if (e.key === "ArrowRight") nextProject();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prevProject, nextProject]);

  const prevImg = () => setImgIdx((i) => (i - 1 + imageTotal) % imageTotal);
  const nextImg = () => setImgIdx((i) => (i + 1) % imageTotal);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "8%" : "-8%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-8%" : "8%", opacity: 0 }),
  };

  return (
    <section id="projects" className="snap-section flex flex-col">
      {/* ── Top bar ── */}
      <div className="flex flex-shrink-0 items-center justify-between px-5 pb-4 pt-16 md:px-12 md:pb-5">
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
            className="flex min-h-0 flex-1 flex-col md:grid md:grid-cols-[55%_45%]"
          >
            {/* ── Image carousel ── */}
            <div className="flex flex-col bg-black/20 px-4 pb-4 md:justify-center md:px-10 md:pb-10">
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/30 md:aspect-[4/3] md:rounded-[28px]">
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
                      src={`${BASE}${project.images[imgIdx]}`}
                      alt={`${project.title} 스크린샷 ${imgIdx + 1}`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {imageTotal > 1 && (
                <div className="mt-2.5 flex items-center justify-center gap-3 md:mt-3">
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImg(); }}
                    aria-label="이전 스크린샷"
                    className="relative z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.04] text-white/30 transition-all hover:bg-white/[0.08] hover:text-white/60 md:h-8 md:w-8"
                  >
                    <ChevronLeft size={12} />
                  </button>
                  <div className="min-w-10 text-center font-mono text-[11px] text-white/35">
                    {imgIdx + 1} / {imageTotal}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImg(); }}
                    aria-label="다음 스크린샷"
                    className="relative z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.04] text-white/30 transition-all hover:bg-white/[0.08] hover:text-white/60 md:h-8 md:w-8"
                  >
                    <ChevronRight size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* ── Project info ── */}
            <div className="flex flex-col justify-between overflow-y-auto px-5 py-5 md:px-10 md:py-10">
              <div>
                <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-white/45 md:mb-4">
                  Project {String(projectIdx + 1).padStart(2, "0")}
                </p>

                <h2 className="mb-2 text-2xl font-black leading-none tracking-tight text-white md:mb-3 md:text-4xl">
                  {project.title}
                </h2>

                <div className="mb-3 flex flex-wrap gap-2.5 text-xs text-white/55 md:mb-4 md:gap-3">
                  <span className="flex items-center gap-1.5"><Monitor size={11} />{project.platform}</span>
                  <span className="flex items-center gap-1.5"><Users size={11} />{project.teamSize}</span>
                  <span>⏱ {project.period}</span>
                </div>

                {project.role && (
                  <div className="mb-3 md:mb-4">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">나의 역할 (Role)</p>
                    <p className="text-indigo-300 text-xs">{project.role}</p>
                  </div>
                )}

                <p className="mb-3 text-sm leading-relaxed text-white/75">
                  {project.longDescription}
                </p>

                {"features" in project && (project as { features?: string }).features && (
                  <div className="mb-3">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">기능 (Features)</p>
                    <p className="text-white/60 text-xs leading-relaxed">{(project as { features: string }).features}</p>
                  </div>
                )}

                {"challenge" in project && (project as { challenge?: string }).challenge && (
                  <div className="mb-4">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Troubleshooting</p>
                    <p className="text-white/60 text-xs leading-relaxed">{(project as { challenge: string }).challenge}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>

              {(project.github || project.demo) && (
                <div className="mt-5 border-t border-white/10 pt-5 md:mt-6 md:pt-6">
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
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom navigation ── */}
      <div className="flex-shrink-0 px-6 py-5 md:pb-6">
        <div className="mx-auto flex w-fit items-center gap-4 rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur-md">
          <button
            onClick={prevProject}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all hover:bg-white/90 md:h-11 md:w-11"
            aria-label="이전 프로젝트"
          >
            <ChevronLeft size={17} />
          </button>
          <div className="min-w-14 text-center font-mono text-sm text-white/70">
            {projectIdx + 1} / {total}
          </div>
          <button
            onClick={nextProject}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-all hover:bg-white/90 md:h-11 md:w-11"
            aria-label="다음 프로젝트"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
