"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";

const c = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

export default function About() {
  return (
    <section id="about" className="snap-section flex flex-col justify-center px-6 md:px-16 lg:px-24">
      <motion.p {...c(0)} className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em] mb-5">
        About Me
      </motion.p>

      <motion.h2
        {...c(0.05)}
        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-10 md:mb-12"
      >
        만들고,{" "}
        <span className="text-white/40">부딪히고,</span>{" "}
        성장합니다.
      </motion.h2>

      {/* Bento grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ gridAutoRows: "160px" }}>
        {/* Bio — 2×2 */}
        <motion.div
          {...c(0.1)}
          className="col-span-2 row-span-2 glass rounded-3xl flex relative overflow-hidden"
        >
          {/* Photo */}
          <div className="relative w-[34%] flex-shrink-0 overflow-hidden bg-black/20">
            <Image
              src="/whoami.png"
              alt="박태환"
              fill
              className="object-contain object-bottom scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-between p-5 flex-1 relative">
            <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
            <p className="text-[10px] font-mono text-white/45 uppercase tracking-widest">Who I am</p>
            <div className="space-y-2.5">
              <p className="text-white/85 text-sm leading-relaxed">
                <span className="text-white font-semibold">AWS와 백엔드를 탐구</span>하며 다양한 고민들을 프로젝트로 펼치고 있는 개발자입니다.
                Node.js로 백엔드 서버를 만들고, Next.js로 사용자 친화적인 웹사이트를 풀스택으로 개발해왔습니다.
              </p>
              <p className="text-white/65 text-xs leading-relaxed">
                팀 프로젝트에서 디자인·AWS 배포·개발 등 역할을 가리지 않고 참여하며,
                주어진 일에 몰입하여 끝까지 가는 성격입니다.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {["끈기", "승부욕", "팀플레이어", "빠른 학습", "몰입"].map((k) => (
                  <span key={k} className="px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-400/25 text-indigo-300 text-[10px]">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 8+ Awards */}
        <motion.div {...c(0.12)} className="glass rounded-3xl p-5 flex flex-col justify-between">
          <p className="text-[10px] font-mono text-white/45">Awards</p>
          <div>
            <p className="text-4xl md:text-5xl font-black text-white leading-none">8<span className="text-yellow-400">+</span></p>
            <p className="text-white/50 text-[10px] mt-1">수상 경력</p>
          </div>
        </motion.div>

        {/* 11+ Projects */}
        <motion.div {...c(0.14)} className="glass rounded-3xl p-5 flex flex-col justify-between">
          <p className="text-[10px] font-mono text-white/45">Projects</p>
          <div>
            <p className="text-4xl md:text-5xl font-black text-white leading-none">10<span className="text-violet-400">+</span></p>
            <p className="text-white/50 text-[10px] mt-1">개인 & 팀</p>
          </div>
        </motion.div>

        {/* School */}
        <motion.div {...c(0.16)} className="glass rounded-3xl p-5 flex flex-col justify-between">
          <MapPin size={14} className="text-indigo-400" />
          <div>
            <p className="text-white/85 text-xs font-semibold leading-snug">세명컴퓨터고등학교</p>
            <p className="text-white/50 text-[10px] mt-0.5">인공지능과</p>
          </div>
        </motion.div>

        {/* Birth */}
        <motion.div {...c(0.18)} className="glass rounded-3xl p-5 flex flex-col justify-between">
          <Calendar size={14} className="text-indigo-400" />
          <div>
            <p className="text-white/85 text-xs font-semibold">2008. 08. 09</p>
            <p className="text-white/50 text-[10px] mt-0.5">생년월일</p>
          </div>
        </motion.div>

        {/* 3연속 1등 */}
        <motion.div
          {...c(0.2)}
          className="col-span-2 glass rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-violet-600/15" />
          <p className="text-5xl md:text-6xl font-black text-white relative z-10">3</p>
          <div className="relative z-10">
            <p className="text-white font-bold text-sm">연속 1등</p>
            <p className="text-white/50 text-[10px] mt-0.5">미래인재 발표회 — 2024·2025·2026</p>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div {...c(0.22)} className="col-span-2 glass rounded-3xl p-4 flex items-center gap-2">
          <a
            href="https://github.com/taehwan0809"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors fill-current"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            <span className="text-white/60 group-hover:text-white text-xs transition-colors">GitHub</span>
          </a>
          <a
            href="https://taehwan0809.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
          >
            <ExternalLink size={13} className="text-white/60 group-hover:text-indigo-400 transition-colors" />
            <span className="text-white/60 group-hover:text-white text-xs transition-colors">Blog</span>
          </a>
          <a
            href="tel:010-9960-2644"
            className="flex-1 flex items-center justify-center py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
          >
            <span className="text-white/50 text-[11px] font-mono">010-9960-2644</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
