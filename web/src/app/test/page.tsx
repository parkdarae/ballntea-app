"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QuestionCard } from "@/components/test/QuestionCard";
import { ProgressMeter } from "@/components/test/ProgressMeter";
import { ResultSummary } from "@/components/test/ResultSummary";
import { GuideModal } from "@/components/test/GuideModal";
import {
  AnswerSheet,
  Question,
  ResultPayload,
  Tea,
  AnswerChoice,
} from "@/types";
import { calculateResult } from "@/modules/scoring";
import { pickEnergyTeas, pickSignatureTea } from "@/modules/recommendation";
import questionsData from "@/data/questions.json" assert { type: "json" };
import teasData from "@/data/teas.json" assert { type: "json" };

const STORAGE_KEY = "ballantea-progress";
const GUIDE_KEY = "ballantea-format-guide";

type StoredProgress = {
  answers: AnswerSheet;
  currentIndex: number;
  timestamp: string;
};

const questions = questionsData as unknown as Question[];
const teas = teasData as unknown as Tea[];

export default function TestPage() {
  const total = questions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerSheet>({});
  const [result, setResult] = useState<ResultPayload | null>(null);
  const [signatureTea, setSignatureTea] = useState<Tea | undefined>(undefined);
  const [energyTeas, setEnergyTeas] = useState<Tea[]>([]);
  const [formatGuideOpen, setFormatGuideOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [savedProgress, setSavedProgress] = useState<StoredProgress | null>(
    null,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const scheduleUpdate =
      typeof queueMicrotask === "function"
        ? queueMicrotask
        : (callback: () => void) => setTimeout(callback, 0);

    // URL에서 결과 복원
    const urlParams = new URLSearchParams(window.location.search);
    const resultParam = urlParams.get("result");
    if (resultParam) {
      try {
        const decoded = JSON.parse(atob(resultParam));
        scheduleUpdate(() => {
          setAnswers(decoded.answers);
          const calculated = calculateResult(questions, decoded.answers);
          setResult(calculated);
          const signature = pickSignatureTea(teas, calculated);
          setSignatureTea(signature);
          setEnergyTeas(pickEnergyTeas(teas, calculated, signature?.teaId));
        });
      } catch (error) {
        console.error("Failed to restore result from URL:", error);
      }
      return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    const seenGuide = window.localStorage.getItem(GUIDE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as StoredProgress;
        scheduleUpdate(() => {
          setSavedProgress(parsed);
          setResumeModalOpen(true);
        });
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
        if (!seenGuide) {
          scheduleUpdate(() => setFormatGuideOpen(true));
        }
      }
      return;
    }
    if (!seenGuide) {
      scheduleUpdate(() => setFormatGuideOpen(true));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (Object.keys(answers).length === 0 && currentIndex === 0) return;
    const payload: StoredProgress = {
      answers,
      currentIndex,
      timestamp: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [answers, currentIndex]);

  const currentQuestion = questions[currentIndex];
  const answeredCurrent = answers[currentQuestion?.id];

  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers],
  );

  const handleSelect = (choice: AnswerChoice) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: choice,
    }));
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const calculated = calculateResult(questions, answers);
    setResult(calculated);
    const signature = pickSignatureTea(teas, calculated);
    setSignatureTea(signature);
    setEnergyTeas(pickEnergyTeas(teas, calculated, signature?.teaId));
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setSignatureTea(undefined);
    setEnergyTeas([]);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const confirmFormatGuide = () => {
    setFormatGuideOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(GUIDE_KEY, "true");
    }
  };

  const handleResume = () => {
    if (!savedProgress) return;
    setAnswers(savedProgress.answers ?? {});
    setCurrentIndex(savedProgress.currentIndex ?? 0);
    setResumeModalOpen(false);
    setSavedProgress(null);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(GUIDE_KEY, "true");
    }
  };

  const handleFreshStart = () => {
    setResumeModalOpen(false);
    setSavedProgress(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
      const seenGuide = window.localStorage.getItem(GUIDE_KEY);
      if (!seenGuide) {
        setFormatGuideOpen(true);
      }
    }
  };

  const resumeBullets = savedProgress
    ? [
        `마지막 진행 문항: ${savedProgress.currentIndex + 1}/${total}`,
        `저장 시각: ${new Date(savedProgress.timestamp).toLocaleString(
          "ko-KR",
        )}`,
      ]
    : [];

  const allowSubmit = answeredCount === total;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:py-16">
      <div className="flex-1 space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate underline-offset-4 hover:text-ink hover:underline"
        >
          ← 랜딩으로 돌아가기
        </Link>

        <ProgressMeter
          currentIndex={currentIndex}
          total={total}
          answers={answers}
          questions={questions}
        />

        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            selected={answeredCurrent}
            onSelect={handleSelect}
          />
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:border-slate/40 disabled:text-slate"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            이전 문항
          </button>
          {currentIndex < total - 1 && (
            <button
              type="button"
              className="rounded-full bg-pop px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-pop/40"
              onClick={handleNext}
              disabled={!answeredCurrent}
            >
              다음 문항
            </button>
          )}
          {currentIndex === total - 1 && (
            <button
              type="button"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-ink/40"
              onClick={handleSubmit}
              disabled={!allowSubmit}
            >
              결과 보기
            </button>
          )}
          <button
            type="button"
            className="rounded-full px-6 py-3 text-sm font-semibold text-slate underline-offset-2 hover:underline"
            onClick={handleReset}
          >
            다시 시작
          </button>
        </div>

        <p className="text-xs text-slate">
          자동 저장 중 · {answeredCount}/{total} 문항 완료
        </p>
      </div>

      <aside className="flex-1 space-y-6">
        {result ? (
          <>
            <ResultSummary
              result={result}
              signatureTea={signatureTea}
              energyTeas={energyTeas}
            />
            <div className="retro-card p-6">
              <p className="text-sm uppercase tracking-[0.4em] text-slate">
                결과 공유하기
              </p>
              <p className="mt-2 text-base text-ink">
                아래 버튼을 클릭하면 결과를 URL로 저장할 수 있어요.
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-full bg-lemon px-6 py-3 text-sm font-semibold text-ink transition hover:opacity-90"
                onClick={() => {
                  const encoded = btoa(JSON.stringify({ answers }));
                  const url = `${window.location.origin}${window.location.pathname}?result=${encoded}`;
                  navigator.clipboard.writeText(url).then(() => {
                    alert("결과 URL이 클립보드에 복사되었습니다!");
                  });
                }}
              >
                결과 URL 복사하기
              </button>
            </div>
          </>
        ) : (
          <div className="retro-card p-8 text-center text-slate">
            <p className="text-sm uppercase tracking-[0.4em] text-slate">
              결과 대기
            </p>
          <p className="mt-4 text-lg text-ink">
            13문항을 모두 완료하면 MBTI 4축 + 에너지 3축 + 시간대 조합에 맞춘
            티 세트를 바로 확인할 수 있어요.
          </p>
          </div>
        )}
      </aside>

      <GuideModal
        open={formatGuideOpen}
        title="응답 포맷 & 102% 에너지 팁"
        description="첫 진입 1회 노출 팝업입니다. A/B 중 해당하는 선택지를 고르고, 영문·국문 모두 허용됩니다."
        bullets={[
          "중간 저장 후 복귀하면 이어서 진행 가능합니다.",
          "답변은 언제든 이전 문항으로 돌아가 수정할 수 있어요.",
          "13문항 모두 완료 후 결과 진입 시 티 추천이 확정됩니다.",
        ]}
        primaryLabel="시작하기"
        onPrimary={confirmFormatGuide}
      />

      <GuideModal
        open={resumeModalOpen}
        title="이어하기가 감지되었어요"
        description="지난 세션이 자동 저장되었습니다. 이어서 진행하거나 새로 시작할 수 있어요."
        bullets={resumeBullets}
        primaryLabel="이어 진행"
        onPrimary={handleResume}
        secondaryLabel="새로 시작"
        onSecondary={handleFreshStart}
      />
    </main>
  );
}

