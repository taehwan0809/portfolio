export interface Award {
  id: string;
  title: string;
  organization?: string;
  year: string;
  type: "award" | "certificate";
}

export const awards: Award[] = [
  // 2024
  { id: "a1", title: "교과우수상 — 체육", year: "2024", type: "award" },
  { id: "a2", title: "AI 동고동락 은상 (2위)", year: "2024", type: "award" },
  { id: "a3", title: "교과우수상 — 영어, 통합과학, 체육, 응용 프로그래밍 화면 구현", year: "2024", type: "award" },
  { id: "a4", title: "선행상", year: "2024", type: "award" },
  // 2025
  { id: "a5", title: "미디어 콘텐츠 창작 공모전 장려상 (4위)", year: "2025", type: "award" },
  { id: "a6", title: "교과우수상 — 영어1, 운동과 건강, 데이터베이스 프로그래밍", year: "2025", type: "award" },
  { id: "a7", title: "AI 동고동락 은상 (2위)", year: "2025", type: "award" },
  { id: "a8", title: "교과우수상 — 운동과 건강", year: "2025", type: "award" },
  { id: "a9", title: "프로젝트 발표회 최우수상", year: "2025", type: "award" },
  // 2026
  { id: "a10", title: "프로젝트 발표회 최우수상", year: "2026", type: "award" },
  // Certificates
  { id: "c1", title: "ITQ 엑셀", year: "2024", type: "certificate" },
  { id: "c2", title: "AICE BASIC", year: "2025", type: "certificate" },
];

export const awardsByYear = ["2026", "2025", "2024"].map((year) => ({
  year,
  items: awards.filter((a) => a.year === year && a.type === "award"),
}));

export const certificates = awards.filter((a) => a.type === "certificate");
