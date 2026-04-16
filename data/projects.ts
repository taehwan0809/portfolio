export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string;
  challenge: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  period: string;
  platform: string;
  teamSize: string;
  role?: string;
  images: string[];
  gradient: string;
  accentColor: string;
}

const img = (folder: string, count: number, ext = "png") =>
  Array.from({ length: count }, (_, i) => `/projects/${folder}/${i + 1}.${ext}`);

export const projects: Project[] = [
  {
    id: "yakssok",
    title: "약쏙",
    description: "노인을 위한 AI 기반 건강 관리 앱 — 진료 내용 녹음·요약·복약 알림",
    longDescription:
      "'약쏙' 프로젝트는 노인을 위한 건강 관리 앱입니다. 약의 사용법과 복용해야 할 약의 일정을 알려주고, 병원에서 의사의 진료내용을 녹음하여 정리해주고, 요약도 합니다. 그리하여 주의 사항이나, 약 복용 일정 같은 중요한 이야기들을 까먹으시지 않게 정리해드리는 앱입니다.",
    features:
      "카카오 OAuth를 통해 간단히 로그인을 하고 '진료 기록' 탭에서 의사의 진료 내용을 녹음합니다. 녹음을 종료한 후, 의사의 말을 분석하고 AI가 내용을 요약해주고, 진료 내용을 노인분께서 더 알아들으시기 쉬운 말로 바꿔서 정리해줍니다. 복용 일정 기능으로 약을 까먹으시지 않고 잘 드실 수 있도록 도와줍니다. 보호자에게 사용자의 건강 상태를 문자로 전송하는 기능도 있습니다.",
    challenge:
      "이번이 앱 제작에 대한 첫 경험이었기 때문에, 테스트를 하는 방법부터 백엔드를 어떻게 연결할 지까지 다양한 문제를 겪었습니다. 하지만 생성형 AI와 적극적인 소통을 하며 배우고 활용하면서 프로젝트를 천천히 제작하였습니다. 시간이 오래 걸리긴 했지만 만족스러운 첫 앱 개발이 되었습니다.",
    tags: ["Flutter", "Node.js", "AWS RDS", "S3", "Kakao OAuth", "AI"],
    featured: true,
    period: "12일",
    platform: "앱",
    teamSize: "3명",
    role: "프론트와 백엔드를 중간에서 방향을 잡고, 프론트 보조",
    images: img("yakssok", 18),
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "#10b981",
  },
  {
    id: "teoltteol",
    title: "털털이",
    description: "실패를 털털 털어내는 커뮤니티 + Groq AI 채팅 웹 서비스",
    longDescription:
      "'털털이' 프로젝트는 실패를 털털 털어내기 위한 프로젝트입니다. 항상 프로젝트들 진행할 때 무언가를 이루거나 목표를 달성하기 위한 프로젝트만 진행하는데, 그 반대인 실패를 하거나 목표를 이루지 못한 사람들을 위한 프로젝트는 없다는 것에 영감을 얻고 진행했습니다. 실패를 했을 때 아무렇지 않게 털어내고 경험 삼아 나아갈 수 있게 하기 위한 프로젝트입니다.",
    features:
      "털어내고 싶은 오늘의 이야기들을 커뮤니티를 통해 사람들과 공유할 수 있으며, 게시글을 많이 달 수록 씨앗에서 나무까지 식물이 자라는 '털털정원' 기능이 있습니다. 또한 실제 사람과 대화는 하고 싶지만 이야기하기 부담스러운 사람을 위한 AI채팅 기능이 있습니다. 취향에 맞는 성격의 AI를 고르고 채팅을 하며 상담할 수 있습니다. 회원가입 기능은 구글 OAuth로 더 간편히 가입할 수 있습니다.",
    challenge:
      "AI와 채팅 기능을 제작할 때 Gemini 무료 API를 사용하였으나 Gemini 에러가 지속적으로 발생했습니다. API를 새로 발급해도 에러는 고쳐지지 않았고, 결국 나이 제한 때문에 계속해서 에러가 뜬다는 것을 알았습니다. 그래서 Gemini 대신 빠른 속도를 갖고 가격도 무료인 Groq AI의 API를 발급 받아서 AI 채팅 기능을 구현하는 것에 성공했습니다.",
    tags: ["Node.js", "Next.js", "AWS RDS", "S3", "Groq AI", "Google OAuth"],
    featured: true,
    period: "5일",
    platform: "Web",
    teamSize: "1명",
    images: img("teoltteol", 12),
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    accentColor: "#8b5cf6",
  },
  {
    id: "dreamtalk",
    title: "DreamTalk",
    description: "진로를 정하지 못한 학생들을 위한 직업별 커뮤니티 사이트",
    longDescription:
      "진로를 아직 정하지 못하고 걱정이 많은 학생들을 위한 프로젝트입니다. 자신이 원하는 직업을 갖고 계시는 사람들과 커뮤니티를 통해 소통하고, 진로를 정하지 못 하더라도 자신과 같은 상황에 처한 사람들과 함께 소통하며 고민을 해결할 수 있게 도와주는 커뮤니티 사이트입니다.",
    features:
      "회원가입을 하고 커뮤니티 탭에 들어가서, 자신이 원하는/계획하고 있는 직업에 맞는 카테고리를 들어갈 수 있습니다. 해당 카테고리에서 글을 올리고 댓글을 통해 자신과 공감할 수 있는 사람들과 소통하고 고민을 해결할 수 있습니다.",
    challenge:
      "처음으로 AI에 의존하지 않고 디자인부터 기능까지 완전히 스스로 연구하며 개발했기 때문에 어떤 식으로 만들어야 하고, 상상한 기능들을 어떻게 실현해야 할 지 고민이 막막했습니다. 다양한 코딩 유튜브 채널과 블로그들을 찾아보며, 라이브러리와 템플릿들을 적극 활용하여 상상하던 기능들을 스스로 구현하는 것에 성공했습니다.",
    tags: ["Node.js", "EJS", "AWS EC2", "RDS", "S3", "ELB"],
    featured: true,
    period: "14일",
    platform: "Web",
    teamSize: "1명",
    images: img("dreamtalk", 6),
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    accentColor: "#3b82f6",
  },
  {
    id: "daeumsunseo",
    title: "다음 순서는",
    description: "발표 음성을 AI로 분석해 피드백과 예상 질문을 제공하는 발표 연습 도우미",
    longDescription:
      "'다음 순서는'은 아직 발표에 자신이 없는 모든 사람들을 위한 프로젝트입니다. 우리가 살아가면서 발표를 해야하는 순간은 무조건 오게 되는데, 그 순간에 사용자가 준비한 것을 마음껏 뽐낼 수 있게 도와주는 것이 목표입니다. 사용자의 발표를 듣고, 분석하여 다양한 피드백과 예상 질문까지 던져줍니다.",
    features:
      "사용자는 발표 대본을 작성하고 목표 시간을 설정합니다. 녹음 버튼을 눌러 발표 연습을 한 후에 '분석' 버튼을 누르면 Whisper를 통해 음성을 텍스트로 바꾸고 GPT가 분석하게 됩니다. 그를 통해 사용자는 GPT의 피드백과 예상 질문 등 자신의 발표에 대한 다양한 결과를 받을 수 있습니다.",
    challenge:
      "사용자의 음성을 분석해서 나오는 결과 중 '말하기 속도'라는 부분이 있습니다. 말하는 속도의 기준이 명확하지가 않아서 기준을 세우는 것에 대해 고민을 많이 했습니다. GPT와 많은 대화를 주고 받은 끝에, 문장을 각각 두 글자로 끊어서 1분 당 얼마나 말하는 지를 기준으로 측정했습니다. 그리하여 사용자에게 더 나은 결과를 제공할 수 있게 되었습니다.",
    tags: ["Next.js", "Whisper", "GPT", "AWS RDS", "S3", "EC2", "Cognito"],
    featured: false,
    period: "4일",
    platform: "Web",
    teamSize: "1명",
    images: img("daeumsunseo", 11),
    gradient: "from-amber-500/20 to-transparent",
    accentColor: "#f59e0b",
  },
  {
    id: "dabeanchicafe",
    title: "DabeanChi Cafe",
    description: "원두를 직접 사고팔고 AI가 취향에 맞는 원두를 추천해주는 커피 커뮤니티",
    longDescription:
      "'요즘은 커피 없이 못 사는데..이왕 먹을 거 더 맛있게 먹을 방법이 없나?'라는 생각에서 비롯된 프로젝트. 원두의 종류는 많고 이름은 어렵고.. 맛도 다양하고.. 진입장벽이 높은 커피의 세계 안에 쉽게 들어갈 수 있게 해주는 프로젝트입니다.",
    features:
      "회원가입을 하여 직접 원두를 사고, 판매 게시글을 올릴 수 있습니다. 또한 댓글과 같은 사람들과의 커뮤니티 기능, 그리고 자신의 취향에 맞는 원두를 인공지능이 추천해 주는 기능들이 있습니다.",
    challenge:
      "EC2의 개념에 대해서 미리 공부를 하였으나, 인스턴스에 접속하여 DabeanChi-Cafe를 불러오고 배포하는 과정에서 Linux 명령어가 필수로 들어가는데, Linux 명령어가 익숙지 않아 명령어들을 구글에서 서치하여 이해하고 입력하는 것에 힘을 많이 쏟았습니다.",
    tags: ["FastAPI", "React", "AWS EC2", "AI (XGBoost)", "Python"],
    featured: false,
    period: "5일",
    platform: "Web",
    teamSize: "4명",
    role: "AWS EC2로 DabeanChi-Cafe 프로젝트를 도메인 주소와 연결 후 배포",
    images: img("dabeanchicafe", 7),
    gradient: "from-orange-500/20 to-transparent",
    accentColor: "#f97316",
  },
  {
    id: "yakssokgpt",
    title: "약쏙 GPT APPS ver",
    description: "약쏙의 기능을 GPT APPS로 확장 — ChatGPT에서 바로 약국 검색 & 약 정보 조회",
    longDescription:
      "'약쏙' gpt apps 버전은 '약쏙' 프로젝트에 있는 약 사용법과 주변 약국을 찾아주는 기능을 떼서 MCP로 만들고 GPT APPS로 제작한 프로젝트입니다. 요즘 많은 사람들이 GPT를 쓰기 때문에 GPT APPS라는 새로운 플랫폼으로 도전해보고 싶어서 제작하게 되었습니다. 단순 앱에서 벗어나 GPT 속에서 프로젝트를 활용할 수 있도록 미래 지향적인 방향으로 제작하였습니다.",
    features:
      "사용자가 GPT에게 지역을 얘기하고 주변 약국 위치를 물어보면 GPT가 '약쏙' 프로젝트만의 UI를 보여주며 사용자 주변 약국의 위치를 보여줍니다. 그리고 사용자가 GPT에게 어떠한 약에 대한 정보를 요청하면 UI에 맞게 약에 대한 정보도 꺼내서 보여주게 됩니다.",
    challenge:
      "GPT APPS SDK는 이제 막 나온 따끈따끈한 기술이기 때문에 정보량이 너무 없어서 제작하는 과정이 난감하긴 했지만, 유튜브나 OPEN AI 공식 사이트 문서를 생성형 AI와 함께 공유하며 정리하고 공부했습니다. 그리하여 '약쏙'의 기능을 GPT와 연결하는 것에 성공했습니다. 이는 새로운 기술에 도전하는 것에 대한 부담을 줄여주는 계기가 되었습니다.",
    tags: ["React", "Node.js", "AWS Lambda", "GPT APPS", "MCP"],
    featured: false,
    period: "4일",
    platform: "GPT APPS",
    teamSize: "3명",
    role: "Lambda에 함수 로직을 짜고 MCP 제작",
    images: img("yakssokgpt", 3),
    gradient: "from-sky-500/20 to-transparent",
    accentColor: "#0ea5e9",
  },
  {
    id: "pomoshield",
    title: "PomoShield",
    description: "포모도로 타이머로 집중 시간엔 유튜브·SNS를 차단하는 크롬 확장 프로그램",
    longDescription:
      "'PomoShield'는 웹과 앱을 벗어나서 색다른 걸 만들어 보고 싶은 마음에서 제작한 프로젝트입니다. 크롬 웹 스토어에서 해당 프로그램을 깔면 뽀모도로 타이머처럼 시간을 설정하고 정해진 시간 동안은 사용자가 인스타나, 유튜브 같은 사이트에 들어가지 못하고 작업에 몰입할 수 있게 도와줍니다.",
    features:
      "사용자가 원하는 시간을 설정할 수 있습니다. '작업 시간', '쉬는 시간', '진행 세트'를 설정하고 차단할 사이트를 사용자가 추가할 수 있습니다. 사용자가 설정한 시간에 맞게 PomoShield의 타이머가 돌아가고 차단한 사이트에 접속이 불가합니다. 하지만 쉬는 시간이 되면 다시 사이트에 접속이 가능해집니다.",
    challenge:
      "처음 프로젝트가 웹 스토어에 출시가 됐을 때 타이머가 제대로 작동을 안 하는 문제가 있었습니다. 알고보니 제 프로젝트를 제출할 때 폴더 구조를 잘못 잡아서 설정 파일을 감지하지 않아, 제대로 기능이 작동을 안 했던 것이었습니다. 폴더 구조를 간단하게 수정하고 제출을 하니, 정상 작동하였습니다.",
    tags: ["HTML", "CSS", "JavaScript", "Chrome Extension"],
    featured: false,
    period: "4일",
    platform: "크롬 확장",
    teamSize: "1명",
    images: img("pomoshield", 4),
    gradient: "from-red-500/20 to-transparent",
    accentColor: "#ef4444",
  },
  {
    id: "scenelocator",
    title: "Scene Locator",
    description: "'선재업고튀어'를 보다 탄생한 아이디어 — 드라마 장면 사진으로 촬영지를 구글맵으로 찾아주는 서비스",
    longDescription:
      "화제의 드라마를 보다가 문득, '저 아름다운 장소는 어딜까?'라고 궁금했던 적 있지 않으신가요? 이 사이트면 끝납니다. 캡쳐하고 업로드하면 어딘지 구글맵으로 보여줍니다. 다녀간 사람들과의 커뮤니티도 즐겨보세요.",
    features:
      "드라마의 한 장면을 캡쳐한 후 업로드하면 Google Maps API, Geocoding API, Vision API를 활용하여 촬영지를 찾습니다. 구글맵으로 위치가 뜨고, 거리뷰로 실제로 간 것처럼 구경도 할 수 있습니다. 촬영지를 갔다 온 사람들과의 커뮤니티도 즐길 수 있습니다.",
    challenge:
      "처음으로 API를 활용하여 프로젝트를 만들었기 때문에 구글에서 API키를 받아오는 과정조차 어려웠습니다. 너무 많은 종류의 API들 때문에 어떤 API를 가져와야 할 지도 복잡했는데 필요한 기능을 메모하며 그에 맞는 API를 검색하여 차근차근 해결했습니다.",
    tags: ["Node.js", "JavaScript", "SQLite", "Google Maps API", "Vision API"],
    featured: false,
    period: "3~5일",
    platform: "Web",
    teamSize: "1명",
    images: img("scenelocator", 4),
    gradient: "from-pink-500/20 to-transparent",
    accentColor: "#ec4899",
  },
  {
    id: "hwajangshil",
    title: "화장실아~ 바쁘니?",
    description: "초음파 센서 + AI로 화장실 혼잡도를 예측하고 LCD로 실시간 안내하는 하드웨어 프로젝트",
    longDescription:
      "누구나 겪어본 급똥 사태. 마음은 급한데 화장실에 들어가 보니 비어있는 칸은 없고.. 다급하게 다른 화장실로 이동한 적 누구나 있을 것입니다. 화장실 문 앞에 붙인 LCD 디스플레이를 통해 칸이 얼마나 남았는지, 현재 화장실 안이 사람이 많은지, 인공지능을 활용한 혼잡도 예측 기능까지. 화장실 안에 직접 들어가지 않고 문 밖에서 확인이 가능합니다.",
    features:
      "초음파 센서로 화장실 칸의 사용 여부를 감지하고, LCD 디스플레이에 실시간으로 남은 칸 수를 표시합니다. AI(인공지능)을 활용하여 시간대별 혼잡도를 예측하고, 문 밖에서 바로 다른 화장실로 이동할 수 있도록 안내합니다.",
    challenge:
      "아두이노에서 데이터를 받아 인공지능으로 예측하는 과정에서 데이터 연동이 쉽지 않았습니다. 하드웨어와 소프트웨어를 함께 다루는 것이 처음이었기 때문에 각 센서의 신호를 정확히 받아오는 과정을 반복 테스트하며 해결했습니다.",
    tags: ["Python", "Raspberry Pi", "초음파 센서", "LCD", "AI"],
    featured: false,
    period: "1주",
    platform: "하드웨어",
    teamSize: "3명",
    role: "아두이노에서 데이터를 받고 인공지능으로 예측",
    images: img("hwajangshil", 3, "jpg"),
    gradient: "from-yellow-500/20 to-transparent",
    accentColor: "#eab308",
  },
  {
    id: "pokeyom",
    title: "폭염 예측 프로젝트",
    description: "지역과 직업을 선택하면 이번 주 폭염 여부와 대처 방법을 알려주는 AI 대시보드",
    longDescription:
      "점점 더 뜨거워지는 한국.. '대프리카'(대한민국 + 아프리카)라는 신조어도 생기고 있는 요즘.. 폭염이 올 때 직업 별로 어떻게 대처해야 하고 이번 주에 언제 폭염이 오는지 예측을 해주는 프로젝트입니다.",
    features:
      "내가 살고 있는 지역을 선택하고 내 직업을 선택하면 10년 간 해당 지역의 여름 데이터를 학습하여 이번 주에는 언제 폭염이 올지, 선택한 직업에 따른 폭염 대처 방법은 무엇일지 알려주는 기능들이 있습니다.",
    challenge:
      "인공지능을 처음으로 사용했는데, 학습시키기 위한 데이터를 찾아다니는 과정이 쉽지 않았습니다. 하지만 2015년부터 올해까지의 날씨 공공데이터를 찾았고 그 데이터를 학습시키는 것에 성공하였습니다. 시간 부족으로 프론트 구현이 불가능에 가까웠는데 파이썬에 내장되어 있는 Streamlit으로 프론트를 구현하는 것에 성공하였습니다.",
    tags: ["Python", "LSTM", "Streamlit", "공공데이터"],
    featured: false,
    period: "2일",
    platform: "Web",
    teamSize: "1명",
    images: img("pokeyom", 4),
    gradient: "from-rose-500/20 to-transparent",
    accentColor: "#f43f5e",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
