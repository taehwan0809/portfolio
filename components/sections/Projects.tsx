"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Github, ExternalLink, Monitor, Users } from "lucide-react";
import { projects } from "@/data/projects";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
type MobileTab = "소개" | "기능" | "Troubleshooting";
const TABS: MobileTab[] = ["소개", "기능", "Troubleshooting"];

export default function Projects() {
  const [projectIdx, setProjectIdx] = useState(0);
  const [imgIdx, setImgIdx]         = useState(0);
  const [dir, setDir]               = useState(1);
  const [mobileTab, setMobileTab]   = useState<MobileTab>("소개");

  const total      = projects.length;
  const project    = projects[projectIdx];
  const imageTotal = project.images.length;

  useEffect(() => { setImgIdx(0); setMobileTab("소개"); }, [projectIdx]);

  const prevProject = useCallback(() => { setDir(-1); setProjectIdx((i) => (i - 1 + total) % total); }, [total]);
  const nextProject = useCallback(() => { setDir(1);  setProjectIdx((i) => (i + 1) % total); }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prevProject();
      if (e.key === "ArrowRight") nextProject();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prevProject, nextProject]);

  const tabContent: Record<MobileTab, string> = {
    "소개": project.longDescription,
    "기능": (project as { features?: string }).features ?? "",
    "Troubleshooting": (project as { challenge?: string }).challenge ?? "",
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "8%" : "-8%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-8%" : "8%", opacity: 0 }),
  };

  return (
    <section
      id="projects"
      className="relative flex flex-col"
      style={{ height: "100svh" }}
    >
      {/* ── Top bar ── */}
      <div className="flex flex-shrink-0 items-center px-5 pb-2 pt-16 md:px-12 md:pb-5 md:mx-0">
        <div>
          <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em]">Projects</p>
          <p className="text-white/40 text-xs font-mono mt-0.5">
            {String(projectIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE  (< md) — everything fits in one screen
      ══════════════════════════════════════════ */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={project.id + "-m"}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-4 mb-2 flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl md:hidden"
        >
          {/* ── Image (fixed proportion ~38%) ── */}
          <div className="relative flex-[0_0_38%] overflow-hidden rounded-t-3xl">
            <div className="relative h-full w-full overflow-hidden">
              {/* accent glow */}
              <div
                className="absolute inset-0 z-10 pointer-events-none opacity-25"
                style={{ background: `radial-gradient(ellipse at center, ${project.accentColor}66, transparent 70%)` }}
              />
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
                    src={`${BASE}${project.images[imgIdx]}`}
                    alt={`${project.title} ${imgIdx + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>

              {/* image prev/next — overlay buttons */}
              {imageTotal > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + imageTotal) % imageTotal); }}
                    className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm"
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % imageTotal); }}
                    className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm"
                  >
                    <ChevronRight size={13} />
                  </button>
                  <div className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 flex gap-1">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className={`rounded-full transition-all ${i === imgIdx ? "w-3.5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Info panel (fills remaining space, internal scroll) ── */}
          <div className="flex flex-1 flex-col overflow-hidden px-4 pt-1">
            {/* Title + meta */}
            <div className="flex-shrink-0 pb-2">
              <h2 className="text-lg font-black leading-tight tracking-tight text-white">
                {project.title}
              </h2>
              <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-white/45">
                <span className="flex items-center gap-1"><Monitor size={10} />{project.platform}</span>
                <span className="flex items-center gap-1"><Users size={10} />{project.teamSize}</span>
                <span>⏱ {project.period}</span>
                {project.role && (
                  <span className="text-indigo-300/80">{project.role}</span>
                )}
              </div>
            </div>

            {/* Tab bar */}
            <div className="flex flex-shrink-0 border-b border-white/10">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMobileTab(tab)}
                  className={`py-1.5 px-3 text-[11px] font-medium border-b-2 transition-all ${
                    mobileTab === tab
                      ? "border-indigo-400 text-white"
                      : "border-transparent text-white/35"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content — scrollable */}
            <div className="flex-1 overflow-y-auto py-2.5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={mobileTab}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[12px] leading-relaxed text-white/70"
                >
                  {tabContent[mobileTab] || <span className="text-white/25 italic">해당 정보 없음</span>}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Tags + links */}
            <div className="flex-shrink-0 pb-2 pt-2 border-t border-white/8">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag text-[10px]">{tag}</span>
                ))}
              </div>
              {(project.github || project.demo) && (
                <div className="flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-white/60 text-[11px] font-medium border border-white/12">
                      <Github size={11} /> GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg text-white/60 text-[11px] font-medium border border-white/12">
                      <ExternalLink size={11} /> Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          DESKTOP  (≥ md) — two-column grid
      ══════════════════════════════════════════ */}
      <div className="hidden md:flex min-h-0 flex-1">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={project.id + "-d"}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid min-h-0 flex-1 grid-cols-[55%_45%]"
          >
            {/* Left: image carousel */}
            <div className="flex flex-col justify-center bg-black/20 px-10 pb-10">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-black/30">
                <div
                  className="absolute inset-0 z-10 pointer-events-none opacity-20"
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
                <div className="mt-3 flex items-center justify-center gap-3">
                  <button onClick={() => setImgIdx((i) => (i - 1 + imageTotal) % imageTotal)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-white/30 hover:bg-white/[0.08] hover:text-white/60 transition-all">
                    <ChevronLeft size={13} />
                  </button>
                  <span className="font-mono text-[11px] text-white/35">{imgIdx + 1} / {imageTotal}</span>
                  <button onClick={() => setImgIdx((i) => (i + 1) % imageTotal)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-white/30 hover:bg-white/[0.08] hover:text-white/60 transition-all">
                    <ChevronRight size={13} />
                  </button>
                </div>
              )}
            </div>

            {/* Right: info */}
            <div className="flex flex-col justify-between overflow-y-auto px-10 py-10">
              <div>
                <p className="mb-4 text-[10px] font-mono uppercase tracking-widest text-white/45">
                  Project {String(projectIdx + 1).padStart(2, "0")}
                </p>
                <h2 className="mb-3 text-4xl font-black leading-none tracking-tight text-white">
                  {project.title}
                </h2>
                <div className="mb-4 flex flex-wrap gap-3 text-xs text-white/55">
                  <span className="flex items-center gap-1.5"><Monitor size={11} />{project.platform}</span>
                  <span className="flex items-center gap-1.5"><Users size={11} />{project.teamSize}</span>
                  <span>⏱ {project.period}</span>
                </div>
                {project.role && (
                  <div className="mb-4">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">나의 역할 (Role)</p>
                    <p className="text-indigo-300 text-xs">{project.role}</p>
                  </div>
                )}
                <p className="mb-3 text-sm leading-relaxed text-white/75">{project.longDescription}</p>
                {(project as { features?: string }).features && (
                  <div className="mb-3">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">기능 (Features)</p>
                    <p className="text-white/60 text-xs leading-relaxed">{(project as { features: string }).features}</p>
                  </div>
                )}
                {(project as { challenge?: string }).challenge && (
                  <div className="mb-4">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Troubleshooting</p>
                    <p className="text-white/60 text-xs leading-relaxed">{(project as { challenge: string }).challenge}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => <span key={tag} className="tag text-[10px]">{tag}</span>)}
                </div>
              </div>
              {(project.github || project.demo) && (
                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="flex flex-wrap gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-white/70 hover:text-white text-xs font-medium border border-white/15 hover:border-white/20 transition-all">
                        <Github size={13} /> GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-white/70 hover:text-white text-xs font-medium border border-white/15 hover:border-white/20 transition-all">
                        <ExternalLink size={13} /> Demo
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
      <div className="flex-shrink-0 px-5 py-2.5 md:py-5">
        <div className="mx-auto flex w-fit items-center gap-4 rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur-md">
          <button onClick={prevProject} aria-label="이전 프로젝트"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:bg-white/90 transition-all md:h-11 md:w-11">
            <ChevronLeft size={16} />
          </button>
          <span className="min-w-12 text-center font-mono text-sm text-white/70">{projectIdx + 1} / {total}</span>
          <button onClick={nextProject} aria-label="다음 프로젝트"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:bg-white/90 transition-all md:h-11 md:w-11">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
