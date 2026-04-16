export interface Skill {
  name: string;
  level: number; // 1-5
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Backend",
    icon: "⚙️",
    color: "from-violet-500/20 to-purple-500/10",
    skills: [
      { name: "Node.js", level: 4 },
      { name: "Python", level: 4 },
    ],
  },
  {
    category: "Frontend",
    icon: "🎨",
    color: "from-blue-500/20 to-cyan-500/10",
    skills: [
      { name: "Next.js", level: 4 },
      { name: "JavaScript", level: 4 },
    ],
  },
  {
    category: "Cloud & Tools",
    icon: "☁️",
    color: "from-orange-500/20 to-amber-500/10",
    skills: [
      { name: "AWS", level: 3 },
      { name: "Premiere Pro", level: 4 },
    ],
  },
];
