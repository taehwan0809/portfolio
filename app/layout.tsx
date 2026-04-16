import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "박태환 | Developer",
  description: "AWS와 백엔드를 탐구하며 다양한 프로젝트를 펼치고 있는 개발자 박태환입니다.",
  keywords: ["developer", "portfolio", "박태환", "개발자", "Next.js", "Node.js"],
  openGraph: {
    title: "박태환 | Developer",
    description: "AWS와 백엔드를 탐구하며 다양한 프로젝트를 펼치고 있는 개발자",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
