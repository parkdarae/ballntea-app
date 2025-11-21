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
    <section className="retro-card flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate">
            진행률
          </p>
          <p className="text-4xl font-bold text-ink">
            {percent}
            <span className="text-lg font-medium text-slate">%</span>
          </p>
        </div>
        <span className="rounded-full bg-pop px-4 py-2 text-sm font-semibold text-white">
          {currentIndex + 1} / {total}
        </span>
      </div>
      <div className="h-3 w-full rounded-full bg-stone/60">
        <div
          className="h-full rounded-full bg-ink transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
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
  <div className="rounded-3xl border border-slate/20 px-4 py-3">
    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="mt-2 h-2 rounded-full bg-stone">
      <div
        className="h-full rounded-full bg-pop transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

