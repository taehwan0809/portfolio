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

  const prevImg = () => setImgIdx((i) => (i - 1 + imageTotal) % imageTotal);
  const nextImg = () => setImgIdx((i) => (i + 1) % imageTotal);

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

  /* ─── Shared image carousel (used in both layouts) ─── */
  const ImageCarousel = ({ className = "" }: { className?: string }) => (
    <div className={className}>
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
        <div className="mt-2 flex items-center justify-center gap-3">
          <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImg(); }}
            aria-label="이전 스크린샷"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.04] text-white/30 hover:bg-white/[0.08] hover:text-white/60 transition-all">
            <ChevronLeft size={12} />
          </button>
          <span className="font-mono text-[11px] text-white/35">{imgIdx + 1} / {imageTotal}</span>
          <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImg(); }}
            aria-label="다음 스크린샷"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.04] text-white/30 hover:bg-white/[0.08] hover:text-white/60 transition-all">
            <ChevronRight size={12} />
          </button>
        </div>
      )}
    </div>
  );

  /* ─── Shared bottom nav ─── */
  const BottomNav = () => (
    <div className="flex-shrink-0 px-5 py-4 md:py-5">
      <div className="mx-auto flex w-fit items-center gap-4 rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur-md">
        <button onClick={prevProject} aria-label="이전 프로젝트"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-white/90 transition-all md:h-11 md:w-11">
          <ChevronLeft size={17} />
        </button>
        <span className="min-w-14 text-center font-mono text-sm text-white/70">{projectIdx + 1} / {total}</span>
        <button onClick={nextProject} aria-label="다음 프로젝트"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-white/90 transition-all md:h-11 md:w-11">
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );

  return (
    <section id="projects" className="snap-section flex flex-col">
      {/* ── Top bar ── */}
      <div className="flex flex-shrink-0 items-center px-5 pb-3 pt-16 md:px-12 md:pb-5">
        <div>
          <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em]">Projects</p>
          <p className="text-white/40 text-xs font-mono mt-0.5">
            {String(projectIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE LAYOUT  (< md)
      ══════════════════════════════════════════ */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={project.id + "-mobile"}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:hidden"
        >
          {/* Image */}
          <ImageCarousel className="bg-black/20 px-4 pb-3" />

          {/* Title + meta */}
          <div className="px-4 pt-3 pb-2">
            <h2 className="text-xl font-black leading-tight tracking-tight text-white">
              {project.title}
            </h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-2.5 text-[11px] text-white/50">
              <span className="flex items-center gap-1"><Monitor size={10} />{project.platform}</span>
              <span className="flex items-center gap-1"><Users size={10} />{project.teamSize}</span>
              <span>⏱ {project.period}</span>
            </div>
            {project.role && (
              <p className="mt-1.5 text-[11px] text-indigo-300">
                <span className="text-white/35 font-mono">Role — </span>{project.role}
              </p>
            )}
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-white/10 px-4">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setMobileTab(tab)}
                className={`mr-1 py-2 px-3 text-[11px] font-medium border-b-2 transition-all ${
                  mobileTab === tab
                    ? "border-indigo-400 text-white"
                    : "border-transparent text-white/35 hover:text-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="px-4 py-3 min-h-[100px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={mobileTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.18 }}
                className="text-xs leading-relaxed text-white/70"
              >
                {tabContent[mobileTab] || <span className="text-white/25 italic">해당 정보 없음</span>}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Tags + links */}
          <div className="px-4 pb-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag text-[10px]">{tag}</span>
            ))}
          </div>
          {(project.github || project.demo) && (
            <div className="px-4 pb-4 flex gap-2.5">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 glass rounded-xl text-white/65 hover:text-white text-xs font-medium border border-white/15">
                  <Github size={12} /> GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 glass rounded-xl text-white/65 hover:text-white text-xs font-medium border border-white/15">
                  <ExternalLink size={12} /> Demo
                </a>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          DESKTOP LAYOUT  (≥ md)
      ══════════════════════════════════════════ */}
      <div className="hidden md:flex min-h-0 flex-1">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={project.id + "-desktop"}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid min-h-0 flex-1 grid-cols-[55%_45%]"
          >
            {/* Left: image */}
            <div className="flex flex-col justify-center bg-black/20 px-10 pb-10">
              <ImageCarousel />
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
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
              {(project.github || project.demo) && (
                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="flex flex-wrap items-center gap-3">
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

      {/* ── Bottom navigation (both layouts) ── */}
      <BottomNav />
    </section>
  );
}
