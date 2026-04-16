"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Briefcase, GraduationCap, Users } from "lucide-react";
import { Experience } from "@/data/experience";

const typeConfig = {
  work: {
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
    label: "경력",
  },
  education: {
    icon: GraduationCap,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/30",
    label: "교육",
  },
  activity: {
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    label: "활동",
  },
};

interface Props {
  experience: Experience | null;
  onClose: () => void;
}

export default function ExperienceModal({ experience, onClose }: Props) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    setImgIndex(0);
  }, [experience]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!experience?.images?.length) return;
      if (e.key === "ArrowRight")
        setImgIndex((i) => (i + 1) % experience.images!.length);
      if (e.key === "ArrowLeft")
        setImgIndex((i) => (i - 1 + experience.images!.length) % experience.images!.length);
    },
    [experience, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const images = experience?.images ?? [];
  const config = experience ? typeConfig[experience.type] : null;
  const Icon = config?.icon;

  return (
    <AnimatePresence>
      {experience && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, type: "spring", bounce: 0.2 }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X size={14} className="text-white/70" />
            </button>

            {/* Image carousel */}
            {images.length > 0 && (
              <div className="relative w-full aspect-video bg-black/40 rounded-t-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIndex}
                    src={images[imgIndex]}
                    alt={`${experience.title} 사진 ${imgIndex + 1}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setImgIndex((i) => (i - 1 + images.length) % images.length)
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
                    >
                      <ChevronRight size={16} className="text-white" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIndex(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            i === imgIndex ? "bg-white scale-125" : "bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Type badge */}
              {config && Icon && (
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} border ${config.border} mb-4`}
                >
                  <Icon size={12} className={config.color} />
                  <span className={`text-xs font-medium ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              )}

              {/* Title & org */}
              <h2 className="text-xl font-bold text-white mb-1">{experience.title}</h2>
              <p className="text-indigo-400 text-sm mb-1">{experience.organization}</p>
              <p className="text-white/30 text-xs font-mono mb-4">{experience.period}</p>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                {experience.description}
              </p>

              {/* Tags */}
              {experience.tags && experience.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {experience.tags.map((tag) => (
                    <span key={tag} className="tag text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
