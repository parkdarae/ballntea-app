import { AnswerChoice, Question } from "@/types";

interface QuestionCardProps {
  question: Question;
  selected?: AnswerChoice;
  onSelect: (choice: AnswerChoice) => void;
}

const choiceStyles =
  "rounded-3xl border-2 border-transparent px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/40 md:px-6 md:py-5";

const inactiveStyles =
  "bg-white/70 border-white hover:border-mint/30 hover:bg-white";
const activeStyles =
  "bg-ink text-white border-pop shadow-[0_15px_35px_rgba(27,43,82,0.25)]";

export const QuestionCard = ({
  question,
  selected,
  onSelect,
}: QuestionCardProps) => {
  return (
    <section className="retro-card flex flex-col gap-5 p-4 md:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate md:text-sm">
            {question.category}
          </p>
          <h2 className="text-xl font-semibold leading-snug text-ink md:text-2xl">
            {question.id}. {question.question}
          </h2>
        </div>
        <div className="rounded-full bg-lemon/30 px-4 py-1.5 text-xs font-semibold text-ink shadow-[0_8px_20px_rgba(241,95,75,0.25)] md:px-5 md:py-2 md:text-sm">
          {question.axis}
        </div>
      </header>

      <div className="grid gap-4">
        <button
          type="button"
          className={`${choiceStyles} ${
            selected === "A" ? activeStyles : inactiveStyles
          }`}
          onClick={() => onSelect("A")}
        >
          <p className={`text-sm font-bold ${selected === "A" ? "text-lemon" : "text-pop"}`}>
            A
          </p>
          <p className={`mt-1 text-base leading-relaxed ${selected === "A" ? "text-white" : "text-ink/90"} md:text-base`}>
            {question.optionA.text}
          </p>
        </button>

        <button
          type="button"
          className={`${choiceStyles} ${
            selected === "B" ? activeStyles : inactiveStyles
          }`}
          onClick={() => onSelect("B")}
        >
          <p className={`text-sm font-bold ${selected === "B" ? "text-lemon" : "text-pop"}`}>
            B
          </p>
          <p className={`mt-1 text-base leading-relaxed ${selected === "B" ? "text-white" : "text-ink/90"} md:text-base`}>
            {question.optionB.text}
          </p>
        </button>
      </div>
    </section>
  );
};

