"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, Monitor, Users } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index?: number;
}

export default function ProjectCard({ project, onClick, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(project)}
      className="group relative glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/10 flex flex-col"
    >
      {/* Thumbnail */}
      {project.images.length > 0 && (
        <div className="relative w-full aspect-video bg-black/40 overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Gradient hover bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative z-10 p-4 flex flex-col flex-1">
        {/* Title row */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white/90 text-sm leading-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight size={14} className="text-white/20 group-hover:text-indigo-400 transition-colors flex-shrink-0 ml-1 mt-0.5" />
        </div>

        {/* Description */}
        <p className="text-white/40 text-xs leading-relaxed mb-3 line-clamp-2 group-hover:text-white/60 transition-colors flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag text-[10px]">{tag}</span>
          ))}
          {project.tags.length > 3 && (
            <span className="tag text-[10px]">+{project.tags.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] text-white/25 font-mono">
            <Monitor size={10} />
            <span>{project.platform}</span>
            <span>·</span>
            <Users size={10} />
            <span>{project.teamSize}</span>
          </div>
          <div className="flex items-center gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white/25 hover:text-white/70 transition-colors">
                <Github size={12} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white/25 hover:text-white/70 transition-colors">
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
