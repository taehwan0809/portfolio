"use client";

import { Github, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-sm text-white/30">
          <span className="text-indigo-400/60">{"<"}</span>
          박태환
          <span className="text-indigo-400/60">{" />"}</span>
          <span className="ml-3">© {new Date().getFullYear()}</span>
        </div>
        <p className="text-xs text-white/20">
          Built with Next.js · Tailwind CSS · Framer Motion
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/taehwan0809"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href="mailto:taehwan0809@gmail.com"
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <Mail size={16} />
          </a>
          <a
            href="https://taehwan0809.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
