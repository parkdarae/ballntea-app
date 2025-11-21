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
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-8 md:px-6 md:pt-12">
      <section className="rounded-[48px] bg-ink px-6 py-12 text-white shadow-[0_30px_80px_rgba(27,43,82,0.45)] md:px-12 md:py-16">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-lemon/80 md:text-sm">
            Ball&Tea Retro Pop Lab
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Ball<span className="text-lemon">n</span>TEA TEST
          </h1>
        </div>

        <div className="mt-10 text-center md:mt-12">
          <h2 className="text-2xl font-bold leading-snug text-white md:text-3xl lg:text-4xl">
            오늘의 에너지, 어떤 맛일까?
          </h2>
          <div className="mt-6 space-y-1.5 text-base leading-relaxed text-white/90 md:text-lg">
            <p className="font-semibold">13문항으로 알아보는</p>
            <p>MBTI 기질 × 감정 흐름 × 내면의 리듬</p>
            <p className="text-sm text-white/70 md:text-base">
              오늘 하루를 잘 쓰기 위한 가장 쉬운 체크인.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white/5 px-6 py-8 backdrop-blur-sm md:mt-12 md:px-8">
          <p className="text-center text-base leading-relaxed text-white/90 md:text-lg">
            오늘 필요한 건
          </p>
          <div className="mt-4 space-y-2 text-center text-lg font-medium md:text-xl">
            <p>🔥 불타오르는 집중인지</p>
            <p>🌿 잔잔한 회복인지</p>
            <p>☕ 리셋인지</p>
          </div>
          <p className="mt-4 text-center text-sm text-white/70 md:text-base">
            한 번에 체크해드릴게요.
          </p>
        </div>

        <div className="mt-8 text-center md:mt-10">
          <p className="text-base font-semibold leading-relaxed text-white md:text-lg">
            딱 13개의 선택으로
            <br />
            오늘 필요한 감정과 에너지의 방향을 잡아드립니다!
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 md:mt-10">
          <Link
            href="/test"
            className="w-full max-w-md rounded-full bg-gradient-to-r from-lemon to-mint px-8 py-4 text-center text-lg font-bold text-ink shadow-lg transition hover:scale-105 hover:shadow-xl md:text-xl"
          >
            ✨ 지금 바로, 내 에너지 확인하기
          </Link>
          <Link
            href="/recommend"
            className="text-sm text-white/60 underline decoration-white/30 underline-offset-4 transition hover:text-white/90 md:text-base"
          >
            맞춤 추천 먼저 보기
          </Link>
        </div>

        <div className="mt-10 grid gap-3 text-center text-sm md:mt-12 md:grid-cols-3">
          {heroStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/5 px-4 py-3 backdrop-blur-sm">
              <p className="text-xs text-lemon/80">{stat.label}</p>
              <p className="mt-1 text-xl font-bold text-white md:text-2xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs text-white/50">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
