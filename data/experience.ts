export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
  type: "activity" | "education" | "work";
  images?: string[];
}

export const experiences: Experience[] = [
  {
    id: "semyeong",
    title: "세명컴퓨터고등학교 인공지능과 재학",
    organization: "세명컴퓨터고등학교",
    period: "2024.03 ~ 현재",
    description:
      "인공지능과에서 React, Java, Python, Node.js 등 다양한 기술을 학습하며 매 학기 프로젝트에 적극적으로 참여. 미래인재 발표회 3연속 1등, 각종 교내외 대회 수상.",
    tags: ["React", "Java", "Python", "Node.js", "AI"],
    type: "education",
  },
  {
    id: "nodejs-lecture",
    title: "Node.js 강의 수강",
    organization: "세명컴퓨터고등학교",
    period: "2024",
    description:
      "코딩에 별 관심이 없던 시절, 실수로 신청하게 된 Node.js 강의. 백엔드 서버 개발과 DB, Google API 활용법을 처음 접하게 되며 개발에 대한 알 수 없는 욕심이 생기기 시작한 전환점.",
    tags: ["Node.js", "DB", "Google API", "백엔드"],
    type: "education",
    images: ["/activities/nodejs/node 강의.jpg"],
  },
  {
    id: "react-lecture",
    title: "React 강의 수강",
    organization: "세명컴퓨터고등학교",
    period: "2024",
    description:
      "Node.js 강의 이후 이어서 수강한 React 강의. 프론트엔드 개발의 기초를 익히며 컴포넌트 기반 UI 개발 방식을 처음 접했다. 이후 미래인재 발표 프로젝트에 직접 활용하게 되는 핵심 기술이 됐다.",
    tags: ["React", "프론트엔드", "컴포넌트"],
    type: "education",
    images: ["/activities/react/React 강의.png"],
  },
  {
    id: "aws-lecture",
    title: "AWS 강의 수강",
    organization: "세명컴퓨터고등학교",
    period: "2025",
    description:
      "클라우드 인프라의 기초를 학습한 AWS 강의. EC2, S3 등 핵심 서비스 개념과 배포 환경 구성 방법을 익혔다. 이후 프로젝트 배포 시 직접 활용할 수 있는 인프라 역량을 쌓았다.",
    tags: ["AWS", "클라우드", "배포", "인프라"],
    type: "education",
    images: ["/activities/aws/aws 강의.png"],
  },
  {
    id: "kotlin-lecture",
    title: "Kotlin 강의 수강 (선배 멘토링)",
    organization: "세명컴퓨터고등학교 졸업생 멘토링",
    period: "2025 여름방학",
    description:
      "졸업한 선배(장우준)에게 매주 토요일 학교에서 Kotlin 강의를 수강. 퀄리티 높은 수업을 통해 새로운 언어를 익히는 동시에, 취업 준비 전략·효과적인 학습법·기술 블로그 작성법 등 실질적인 노하우를 전수받았다.",
    tags: ["Kotlin", "멘토링", "취업 준비", "블로그"],
    type: "education",
    images: ["/activities/kotlin/kotlin 강의.png"],
  },
  {
    id: "mirae-1st",
    title: "미래인재 발표회 1학년 2학기 1등",
    organization: "세명컴퓨터고등학교",
    period: "2024.09 ~ 2025.02",
    description:
      "React로 '치킨' 테마 웹사이트를 직접 제작하여 1등 수상. 지루할 수 있는 발표에서 자신의 사진을 과감하게 활용해 청중의 집중과 좋은 분위기를 이끄는 것에 성공했다. 이 경험이 이후 다양한 활동에 자신감을 심어준 출발점.",
    tags: ["React", "웹개발", "발표"],
    type: "activity",
    images: ["/activities/mirae-1st/1학년 미래인재 수상.jpg"],
  },
  {
    id: "ai-donggo",
    title: "AI 동고동락 2위 (은상) × 2회",
    organization: "세명컴퓨터고등학교",
    period: "2024, 2025",
    description:
      "담임선생님의 권유로 참가한 AI 동고동락 대회에서 2년 연속 2위 은상 수상. 미래인재 발표 경험을 살려 과감하게 영상을 직접 제작해 선배들에게 웃음을 선사. 이후 프로젝트와 각종 활동에 영상 제작 역량을 적극 활용하게 됐다.",
    tags: ["AI", "영상 제작", "발표", "2연속 은상"],
    type: "activity",
    images: [
      "/activities/ai-donggo/AI 동고동락.png",
      "/activities/ai-donggo/동고동락2.png",
    ],
  },
  {
    id: "env-ai",
    title: "환경과 AI의 융합 프로젝트 3등",
    organization: "세명컴퓨터고등학교",
    period: "2025",
    description:
      "수업 유연화 주간에 열린 교내 대회. AI로 폭염을 예측하는 프로젝트를 혼자 힘으로 만들어 인공과 대표로 선정. 2학년 전교생 앞에서 발표하여 3등 달성. 아무의 도움 없이 처음 끝낸 솔로 프로젝트로 큰 자신감을 얻었다.",
    tags: ["AI", "Python", "데이터 분석", "폭염 예측"],
    type: "activity",
    images: ["/activities/env-ai/환경과 AI의 융합 프로젝트.jpg.jpg"],
  },
  {
    id: "ktech",
    title: "K-TECH 아이디어 챌린지 참가",
    organization: "K-TECH",
    period: "2025",
    description:
      "처음으로 선배들의 도움을 받으며 팀원들과 함께 참가한 외부 대회. 방학 중에도 모두 모여 포스터와 PPT까지 직접 제작했지만 아쉽게 탈락. 이 경험을 발판 삼아 이후 활동들에 더 열정적으로 임하게 됐다.",
    tags: ["아이디어", "팀워크", "포스터"],
    type: "activity",
    images: ["/activities/ktech/K-TECH 아이디어 챌린지.jpg"],
  },
  {
    id: "ibm-lecture",
    title: "IBM 방문 & 대회 수상 노하우 특강",
    organization: "IBM Korea",
    period: "2025",
    description:
      "IBM 본사 방문 및 대회 수상 노하우 특강 참여. 실제 IT 기업 환경을 직접 체험하고, 대회에서 수상하기 위한 전략과 인사이트를 습득했다.",
    tags: ["IBM", "특강", "대회 전략"],
    type: "activity",
    images: [
      "/activities/ibm/IBM 방문.jpg",
      "/activities/ibm/대회 수상 노하우 특강.jpg",
    ],
  },
  {
    id: "mirae-2nd",
    title: "미래인재 발표회 2학년 2학기 1등",
    organization: "세명컴퓨터고등학교",
    period: "2025.09 ~ 2026.02",
    description:
      "AI 커피 원두 추천 사이트 'Dabeanchi-cafe'를 팀과 함께 제작하여 1등 수상. Grok AI를 활용한 팀 소개 영상도 직접 제작. 첫 팀 프로젝트이자 미래인재 2연속 1등으로 팀워크와 개발 자신감을 함께 키웠다.",
    tags: ["AI", "React", "팀 프로젝트", "영상 제작"],
    type: "activity",
    images: [
      "/activities/mirae-2nd/2학년 2학기 미래인재.jpg",
      "/activities/mirae-2nd/미래인재 영상 제작.png",
    ],
  },
  {
    id: "media-contest",
    title: "미디어 창작 공모전 4등 수상",
    organization: "세명컴퓨터고등학교",
    period: "2025",
    description:
      "우연히 찍게 된 숏폼 콘텐츠가 주목받으면서 공모전에 제출. 친구들을 한 명씩 깨워가며 영상을 찍어 4등 수상. 세명컴고 공식 인스타그램에도 게재되어 학교 홍보 효과까지 냈다.",
    tags: ["숏폼", "영상 제작", "콘텐츠"],
    type: "activity",
    images: ["/activities/media-contest/미디어 창작 공모전.png"],
  },
  {
    id: "mirae-3rd",
    title: "미래인재 발표회 3학년 1학기 1등",
    organization: "세명컴퓨터고등학교",
    period: "2026.03 ~ 현재",
    description:
      "앱과 GPT Apps SDK를 활용한 복약 알림 서비스 '약쏙'으로 미래인재 3연속 1등 달성. 팀원들과 돈독한 우정을 쌓으며, 실제 직장에서도 통할 팀워크와 협업 역량을 체득했다.",
    tags: ["GPT Apps SDK", "앱 개발", "팀워크"],
    type: "activity",
    images: ["/activities/mirae-3rd/3학년 미래인재 수상.jpg"],
  },
  {
    id: "promo",
    title: "인공과 홍보 활동",
    organization: "세명컴퓨터고등학교",
    period: "2024 ~ 현재",
    description:
      "선생님의 권유로 참여하게 된 인공과 홍보 사진 촬영 및 중학생 대상 학과 홍보 발표 활동. '건호의 삶'으로 나를 표현한 인공과 홍보 포스터도 직접 제작했다. 처음에는 어색했지만 이후 활동 중 사진을 찍을 때 훨씬 자연스러워지는 계기가 됐다.",
    tags: ["홍보", "포스터", "발표", "사진 촬영"],
    type: "activity",
    images: [
      "/activities/promo/홍보 사진 촬영.jpg",
      "/activities/promo/홍보 포스터.jpg",
      "/activities/promo/홍보 활동.jpg.jpg",
    ],
  },
  {
    id: "ai-hackathon",
    title: "AI 해커톤 인기상 수상",
    organization: "AI 해커톤",
    period: "2026",
    description:
      "팀원들과 함께 키오스크 '민팃'을 업그레이드한 새 웹사이트를 개발하고 발표까지 직접 진행. 많은 사람의 기억에 남도록 최선을 다해 인기상 수상, 팀원 전원 상품권 획득. 프로젝트를 설명하고 사람들을 설득하는 것이 얼마나 어렵고 재밌는 경험인지 깨달았다.",
    tags: ["해커톤", "웹개발", "키오스크", "팀 프로젝트"],
    type: "activity",
    images: ["/activities/ai-hackathon/해커톤.jpg"],
  },
];
