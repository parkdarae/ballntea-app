"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import teasData from "@/data/teas.json";
import { Tea } from "@/types";

const teas = teasData as Tea[];

const energyPriority = [
  "Head",
  "Heart",
  "Gut",
  "활동형",
  "정적형",
  "외향",
  "내향",
  "아침형",
  "저녁형",
];

export default function RecommendPage() {
  const [selectedMbti, setSelectedMbti] = useState("전체");
  const [selectedEnergy, setSelectedEnergy] = useState("전체");

  const mbtiOptions = useMemo(() => {
    const matches = teas.flatMap((tea) => tea.mbtiMatch ?? []);
    const unique = Array.from(new Set(matches)).sort();
    return ["전체", ...unique];
  }, []);

  const energyOptions = useMemo(() => {
    const tags = teas.flatMap((tea) => tea.energyTag ?? []);
    const unique = Array.from(new Set(tags));
    const ordered = energyPriority.filter((tag) => unique.includes(tag));
    const leftovers = unique.filter((tag) => !energyPriority.includes(tag)).sort();
    return ["전체", ...ordered, ...leftovers];
  }, []);

  const filteredTeas = teas.filter((tea) => {
    const matchMbti =
      selectedMbti === "전체" || tea.mbtiMatch?.includes(selectedMbti);
    const matchEnergy =
      selectedEnergy === "전체" ||
      tea.energyTag?.some((tag) => tag === selectedEnergy);
    return matchMbti && matchEnergy;
  });

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate underline-offset-4 hover:text-ink hover:underline"
      >
        ← 랜딩으로 돌아가기
      </Link>

      <section className="retro-card space-y-6 rounded-[32px] p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.5em] text-lemon">
            Ball&Tea Pairing
          </p>
          <h1 className="mt-2 text-3xl font-bold text-ink">
            MBTI · 에너지 방향 맞춤 티 추천
          </h1>
          <p className="mt-3 text-base text-slate">
            13문항 테스트 결과와 동일한 데이터셋을 활용해 MBTI 유형과
            에너지 포커스(외향/내향, 활동/정적, Head/Heart/Gut)에 맞춘 티를
            미리 탐색할 수 있어요.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/test"
            className="rounded-full bg-pop px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            13문항 테스트 바로 가기
          </Link>
          <a
            href="/docs/ballntea_requirements.md"
            className="rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
          >
            데이터 출처 보기
          </a>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <FilterSelect
          label="MBTI 유형"
          value={selectedMbti}
          onChange={setSelectedMbti}
          options={mbtiOptions}
          helper="시그니처 티 매칭에 사용한 16개 유형"
        />
        <FilterSelect
          label="에너지 포커스"
          value={selectedEnergy}
          onChange={setSelectedEnergy}
          options={energyOptions}
          helper="활동성 · 센터 · 외향성 태그 기준"
        />
      </section>

      <section className="space-y-3">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate">
              추천 라인업
            </p>
            <h2 className="text-2xl font-bold text-ink">
              {selectedMbti === "전체" ? "전체 MBTI" : `${selectedMbti}`} ·{" "}
              {selectedEnergy === "전체" ? "모든 에너지 태그" : selectedEnergy}
            </h2>
          </div>
          <span className="rounded-full bg-stone px-4 py-2 text-sm font-semibold text-ink">
            {filteredTeas.length}종 추천
          </span>
        </header>

        {filteredTeas.length === 0 ? (
          <div className="retro-card p-6 text-center text-slate">
            <p className="text-base">
              선택한 조건에 맞는 티가 아직 없어요. 다른 태그를 선택해 주세요.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredTeas.map((tea) => (
              <article
                key={tea.teaId}
                className="flex flex-col gap-4 rounded-3xl border border-slate/15 bg-white/90 p-6 shadow-[0_12px_30px_rgba(27,43,82,0.08)]"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate">
                  <span className="rounded-full bg-lemon/40 px-3 py-1 text-ink">
                    {tea.timeTag.join(" · ")}
                  </span>
                  <span className="rounded-full bg-mint/30 px-3 py-1 text-ink">
                    {tea.caffeine ?? "카페인 정보"}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-ink">{tea.name}</h3>
                  <p className="text-sm text-slate">{tea.copy}</p>
                </div>
                {tea.tasteNote && (
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate">
                    {tea.tasteNote.map((note) => (
                      <span
                        key={note}
                        className="rounded-full bg-stone/70 px-3 py-1 text-ink"
                      >
                        #{note}
                      </span>
                    ))}
                  </div>
                )}
                <dl className="space-y-2 text-sm text-slate">
                  <div className="flex items-center justify-between">
                    <dt className="font-semibold text-ink">MBTI 매칭</dt>
                    <dd>{tea.mbtiMatch?.join(", ") ?? "데이터 준비 중"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="font-semibold text-ink">에너지 태그</dt>
                    <dd>{tea.energyTag?.join(", ") ?? "데이터 준비 중"}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const FilterSelect = ({
  label,
  helper,
  value,
  onChange,
  options,
}: {
  label: string;
  helper: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) => {
  return (
    <label className="retro-card flex flex-col gap-2 p-6">
      <span className="text-xs uppercase tracking-[0.3em] text-slate">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate/20 bg-white px-4 py-3 text-base font-semibold text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/40"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="text-xs text-slate">{helper}</span>
    </label>
  );
};

