import Link from "next/link";
import { Question, Tea } from "@/types";
import questionsData from "@/data/questions.json" assert { type: "json" };
import teasData from "@/data/teas.json" assert { type: "json" };

const questions = questionsData as unknown as Question[];
const teas = teasData as unknown as Tea[];

const heroStats = [
  { label: "총 문항", value: `${questions.length} Q`, sub: "MBTI 8 · 에너지 4 · 시간 1" },
  { label: "티 라인업", value: `${teas.length}종`, sub: "볼앤티 레시피북 v1.0.0" },
  { label: "타깃 KPI", value: "완료율 75%+", sub: "결과 공유 30%+" },
];


export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-12 md:px-6">
      <section className="rounded-[48px] bg-ink px-6 py-10 text-white shadow-[0_30px_80px_rgba(27,43,82,0.45)] md:px-12 md:py-14">
        <p className="text-xs uppercase tracking-[0.5em] text-lemon md:text-sm">
          Ball&Tea Retro Pop Lab
        </p>
        <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
          MBTI + 에너지 매칭 테스트로
          <br />
          하루의 102% 에너지를 세팅하세요.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
          13문항 A/B 테스트로 MBTI 4축 · 활동/정적 · Center(Head/Heart/Gut) ·
          아침/저녁 루틴을 한 번에 파악하고, 바로 실천 가능한 티 루틴을
          추천합니다.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 md:gap-4">
          <Link
            href="/test"
            className="rounded-full bg-lemon px-7 py-3.5 text-base font-bold text-ink transition hover:translate-y-0.5 hover:opacity-90 md:px-8 md:py-4 md:text-lg"
          >
            테스트 시작하기
          </Link>
          <Link
            href="/recommend"
            className="rounded-full border-2 border-white/60 px-7 py-3.5 text-base font-bold text-white transition hover:bg-white hover:text-ink md:px-8 md:py-4 md:text-lg"
          >
            맞춤 추천 보기
          </Link>
          <a
            href="/docs/ballntea_requirements.md"
            className="rounded-full border-2 border-white/60 px-7 py-3.5 text-base font-bold text-white transition hover:bg-white hover:text-ink md:px-8 md:py-4 md:text-lg"
          >
            요구사항 전문
          </a>
        </div>
        <div className="mt-10 grid gap-3 text-sm uppercase tracking-[0.2em] md:grid-cols-3 md:gap-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-white/10 px-5 py-4 md:px-6">
              <p className="text-xs text-lemon md:text-sm">{stat.label}</p>
              <p className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {stat.value}
              </p>
              <p className="text-xs text-white/70">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
