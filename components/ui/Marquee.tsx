const items = [
  "Next.js", "·", "Python", "·", "Node.js", "·", "AWS", "·",
  "React", "·", "Kotlin", "·", "GPT API", "·", "AI Developer", "·",
  "3× 미래인재 1등", "·", "8+ 수상", "·", "11+ 프로젝트", "·",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/5 py-4 bg-white/[0.02]">
      <div className="marquee-track flex gap-8 w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`text-xs font-mono whitespace-nowrap flex-shrink-0 ${
              item === "·" ? "text-white/15" : "text-white/30 hover:text-white/60 transition-colors"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
