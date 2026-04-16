"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  Monitor,
} from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const prev = useCallback(() => {
    if (!project) return;
    setImgIndex((i) => (i - 1 + project.images.length) % project.images.length);
  }, [project]);

  const next = useCallback(() => {
    if (!project) return;
    setImgIndex((i) => (i + 1) % project.images.length);
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next]);

  useEffect(() => {
    if (project) {
      setImgIndex(0);
      setImgError({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto bg-[#13131a] border border-white/8 rounded-2xl shadow-2xl"
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>

              {/* Image slider */}
              {project.images.length > 0 && (
                <div className="relative w-full aspect-video bg-black/40 overflow-hidden rounded-t-2xl group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imgIndex}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0"
                    >
                      {!imgError[imgIndex] ? (
                        <Image
                          src={project.images[imgIndex]}
                          alt={`${project.title} screenshot ${imgIndex + 1}`}
                          fill
                          className="object-contain"
                          onError={() =>
                            setImgError((prev) => ({ ...prev, [imgIndex]: true }))
                          }
                          unoptimized
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-white/20 text-sm">
                          이미지를 불러올 수 없습니다
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Nav arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={18} />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {project.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImgIndex(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                              i === imgIndex
                                ? "bg-white w-4"
                                : "bg-white/30 hover:bg-white/60"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Counter */}
                      <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 text-white/60 text-xs rounded-full font-mono">
                        {imgIndex + 1} / {project.images.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-7">
                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2 pr-8">
                  {project.title}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 mb-5 pb-5 border-b border-white/6">
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Calendar size={12} />
                    {project.period}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Monitor size={12} />
                    {project.platform}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Users size={12} />
                    {project.teamSize}
                  </div>
                  {project.role && (
                    <div className="text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                      나의 역할: {project.role}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-5">
                  <h3 className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider mb-2.5">
                    프로젝트 소개
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider mb-2.5">
                    사용 기술
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/8 border border-white/8 text-white/70 hover:text-white text-sm rounded-xl transition-all"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-sm rounded-xl transition-all"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
