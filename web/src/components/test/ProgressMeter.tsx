import { AnswerSheet, Question } from "@/types";

interface ProgressMeterProps {
  currentIndex: number;
  total: number;
  answers: AnswerSheet;
  questions: Question[];
}

const SECTIONS: { key: Question["category"]; label: string }[] = [
  { key: "MBTI", label: "MBTI" },
  { key: "Energy", label: "에너지" },
  { key: "TimePreference", label: "시간대" },
];

export const ProgressMeter = ({
  currentIndex,
  total,
  answers,
  questions,
}: ProgressMeterProps) => {
  const percent = Math.round(((currentIndex + 1) / total) * 100);

  const initialCategoryState: Record<Question["category"], number> = {
    MBTI: 0,
    Energy: 0,
    TimePreference: 0,
  };

  const totalByCategory = questions.reduce(
    (acc, question) => {
      acc[question.category] += 1;
      return acc;
    },
    { ...initialCategoryState },
  );

  const answeredByCategory = questions.reduce(
    (acc, question) => {
      if (answers[question.id]) {
        acc[question.category] += 1;
      }
      return acc;
    },
    { ...initialCategoryState },
  );

  const categoryProgress = SECTIONS.map(({ key, label }) => {
    const totalInCategory = totalByCategory[key];
    const answeredInCategory = answeredByCategory[key];
    const value =
      totalInCategory === 0
        ? 0
        : Math.round((answeredInCategory / totalInCategory) * 100);
    return { label, value };
  });

  return (
    <section className="retro-card flex flex-col gap-2.5 p-2.5 md:gap-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate md:tracking-[0.3em]">
            진행률
          </p>
          <p className="text-3xl font-bold text-ink md:text-4xl">
            {percent}
            <span className="text-base font-medium text-slate md:text-lg">%</span>
          </p>
        </div>
        <span className="rounded-full bg-pop px-3 py-1.5 text-xs font-semibold text-white md:px-4 md:py-2 md:text-sm">
          {currentIndex + 1} / {total}
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-stone/60 md:h-3">
        <div
          className="h-full rounded-full bg-ink transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="grid gap-1.5 sm:grid-cols-3 md:gap-2">
        {categoryProgress.map((section) => (
          <ProgressPill
            key={section.label}
            label={section.label}
            value={section.value}
          />
        ))}
      </div>
    </section>
  );
};

const ProgressPill = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-xl border border-slate/20 px-2.5 py-2 md:rounded-3xl md:px-4 md:py-3">
    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.1em] text-slate md:tracking-[0.2em]">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="mt-1.5 h-1.5 rounded-full bg-stone md:mt-2 md:h-2">
      <div
        className="h-full rounded-full bg-pop transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

