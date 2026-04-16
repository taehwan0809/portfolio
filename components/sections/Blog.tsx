"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { ArrowUpRight, Github, BookOpen } from "lucide-react";

const posts = [
  {
    title: "Spring Boot에서 Redis 캐싱 전략 적용하기",
    description:
      "@Cacheable, @CacheEvict을 활용한 캐싱 적용 방법과 TTL 설정 전략을 정리했습니다.",
    tags: ["Spring Boot", "Redis", "Performance"],
    date: "2024.11",
    readTime: "8 min",
  },
  {
    title: "JWT vs Session 인증 방식 비교 분석",
    description:
      "두 인증 방식의 장단점과 서비스 규모에 따른 선택 기준을 실제 경험 기반으로 작성했습니다.",
    tags: ["JWT", "Security", "Backend"],
    date: "2024.09",
    readTime: "12 min",
  },
  {
    title: "Docker Compose로 로컬 개발 환경 구성하기",
    description:
      "MySQL, Redis, Kafka를 Docker Compose로 한 번에 올리는 개발 환경 구성 방법을 공유합니다.",
    tags: ["Docker", "DevOps", "Tutorial"],
    date: "2024.07",
    readTime: "6 min",
  },
];

const githubStats = [
  { label: "Public Repos", value: "30+" },
  { label: "Total Stars", value: "50+" },
  { label: "Contributions", value: "500+" },
];

export default function Blog() {
  return (
    <section id="blog" className="section-padding px-6 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Blog & GitHub"
          title="글쓰기 & 오픈소스"
          description="배운 것을 기록하고 공유하는 것을 좋아합니다."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Blog posts */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-mono font-semibold text-white/30 uppercase tracking-widest">
                Recent Posts
              </p>
              <a
                href="https://taehwan0809.tistory.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                모두 보기
                <ArrowUpRight size={12} />
              </a>
            </div>

            <div className="space-y-4">
              {posts.map((post, index) => (
                <motion.a
                  key={post.title}
                  href="https://taehwan0809.tistory.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="block glass rounded-2xl p-5 hover:border-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-white/80 text-sm group-hover:text-white transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <ArrowUpRight
                      size={14}
                      className="text-white/20 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5"
                    />
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed mb-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-white/25 font-mono">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* GitHub stats */}
          <div>
            <p className="text-xs font-mono font-semibold text-white/30 uppercase tracking-widest mb-6">
              GitHub
            </p>

            <motion.a
              href="https://github.com/taehwan0809"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="block glass rounded-2xl p-6 hover:border-white/10 transition-all duration-300 group mb-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center">
                  <Github size={20} className="text-white/60" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">@taehwan0809</p>
                  <p className="text-white/30 text-xs">GitHub Profile</p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="ml-auto text-white/20 group-hover:text-indigo-400 transition-colors"
                />
              </div>

              {/* Stats */}
              <div className="space-y-3">
                {githubStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-white/40">{stat.label}</span>
                    <span className="text-sm font-semibold text-white/80">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.a>

            <motion.a
              href="https://taehwan0809.tistory.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -3 }}
              className="block glass rounded-2xl p-6 hover:border-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <BookOpen size={18} className="text-indigo-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">기술 블로그</p>
                  <p className="text-white/30 text-xs">개발 노트 & 회고</p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="ml-auto text-white/20 group-hover:text-indigo-400 transition-colors"
                />
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                배운 것을 정리하고, 문제 해결 과정을 기록합니다. 월 2~4회 꾸준히
                포스팅 중입니다.
              </p>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
