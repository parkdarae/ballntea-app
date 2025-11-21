import type { Metadata } from "next";
import { Noto_Sans_KR, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "볼앤티 MBTI + 에너지 매칭 테스트",
  description:
    "레트로팝 무드로 13문항 테스트를 완료하고 나의 MBTI · 에너지 루틴 · 추천 티를 확인하세요.",
  openGraph: {
    title: "볼앤티 102% 에너지 테스트",
    description:
      "MBTI와 에너지 방향을 동시에 측정해 시그니처 티를 추천합니다.",
    url: "http://localhost:3011",
    siteName: "Ball&Tea Retro Pop Lab",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${display.variable} ${body.variable} bg-cream text-ink antialiased`}
      >
        <div className="min-h-screen bg-cream text-ink">{children}</div>
      </body>
    </html>
  );
}
