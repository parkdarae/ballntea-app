import Link from "next/link";
import questionsData from "@/data/questions.json";
import teasData from "@/data/teas.json";
import { Question, Tea } from "@/types";

const questions = questionsData as Question[];
const teas = teasData as Tea[];

const heroStats = [
  { label: "총 문항", value: `${questions.length} Q`, sub: "MBTI 8 · 에너지 4 · 시간 1" },
  { label: "티 라인업", value: `${teas.length}종`, sub: "볼앤티 레시피북 v1.0.0" },
  { label: "타깃 KPI", value: "완료율 75%+", sub: "결과 공유 30%+" },
];

const steps = [
  {
    title: "01. 랜딩 & 102% 메시지",
    detail: "레트로팝 포스터 → 테스트 시작 CTA → 응답 포맷 원-타임 팝업",
  },
  {
    title: "02. 실시간 스코어링",
    detail: "13문항 A/B 선택, 축별 미니 게이지, 이전 문항 수정 가능",
  },
  {
    title: "03. 결과 & 추천",
    detail: "MBTI + 에너지 + 시간대 매핑, 시그니처 티 1 + 루틴 티 2",
  },
];

const compliance = [
  "PDF 원문 대비 99% 정합성 목표 (questions.json · teas.json 실데이터 사용)",
  "이미지 및 티 카피는 `볼앤티 레시피북.pdf` / `브랜드 소개서.pdf`에서만 추출",
  "Git → Vercel 정식 배포 전 QA, 모든 기능 작업 후 수동/자동 테스트 필수",
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-16">
      <section className="rounded-[48px] bg-ink px-8 py-12 text-white shadow-[0_30px_80px_rgba(27,43,82,0.45)] md:px-16">
        <p className="text-sm uppercase tracking-[0.6em] text-lemon">
          Ball&Tea Retro Pop Lab
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
          MBTI + 에너지 매칭 테스트로
          <br />
          하루의 102% 에너지를 세팅하세요.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">
          13문항 A/B 테스트로 MBTI 4축 · 활동/정적 · Center(Head/Heart/Gut) ·
          아침/저녁 루틴을 한 번에 파악하고, 바로 실천 가능한 티 루틴을
          추천합니다.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/test"
            className="rounded-full bg-lemon px-8 py-4 text-lg font-semibold text-ink transition hover:translate-y-0.5 hover:opacity-90"
          >
            테스트 시작하기
          </Link>
          <Link
            href="/recommend"
            className="rounded-full border border-white/50 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-ink"
          >
            맞춤 추천 보기
          </Link>
          <a
            href="/docs/ballntea_requirements.md"
            className="rounded-full border border-white/50 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white hover:text-ink"
          >
            요구사항 전문
          </a>
        </div>
        <div className="mt-12 grid gap-4 text-sm uppercase tracking-[0.3em] md:grid-cols-3">
          {heroStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-white/10 px-6 py-4">
              <p className="text-lemon">{stat.label}</p>
              <p className="text-3xl font-bold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="text-xs text-white/70">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-2">
        <div className="retro-card p-8">
          <p className="text-sm uppercase tracking-[0.5em] text-slate">
            User Journey
          </p>
          <h2 className="mt-2 text-3xl font-bold text-ink">
            3단계 흐름으로 102% 에너지 세팅
          </h2>
          <div className="mt-6 space-y-5">
            {steps.map((step) => (
              <div key={step.title} className="rounded-3xl border border-stone/60 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-pop">
                  {step.title}
                </p>
                <p className="text-base text-ink">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="retro-card p-8">
          <p className="text-sm uppercase tracking-[0.5em] text-slate">
            Compliance
          </p>
          <h2 className="mt-2 text-3xl font-bold text-ink">
            데이터 정합성 & 배포 규칙
          </h2>
          <ul className="mt-5 space-y-3 text-base text-ink">
            {compliance.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-pop" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate">
            * PDF가 스캔본일 경우 OCR 품질을 검증하고, 이미지 캡처는
            `assets/images/{datasetId}-{문제번호}-{순번}.png` 규칙으로 저장해야 합니다.
          </p>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-stone/60 p-6">
          <p className="text-sm font-semibold text-pop">데이터셋</p>
          <p className="mt-2 text-2xl font-bold text-ink">questions.json</p>
          <p className="text-sm text-slate">
            PDF 원문 13문항을 줄바꿈/하이픈 보정 후 JSON 구조로 추출했습니다.
          </p>
        </div>
        <div className="rounded-3xl border border-stone/60 p-6">
          <p className="text-sm font-semibold text-pop">티 메타</p>
          <p className="mt-2 text-2xl font-bold text-ink">teas.json</p>
          <p className="text-sm text-slate">
            15종 티의 시간대, 에너지 태그, 카피를 결과 매핑 모듈에서 사용합니다.
          </p>
        </div>
        <div className="rounded-3xl border border-stone/60 p-6">
          <p className="text-sm font-semibold text-pop">운영</p>
          <p className="mt-2 text-2xl font-bold text-ink">Git → Vercel</p>
          <p className="text-sm text-slate">
            QA와 Lighthouse 80점 이상 통과 후에만 main 병합 및 배포합니다.
          </p>
        </div>
      </section>
    </main>
  );
}
