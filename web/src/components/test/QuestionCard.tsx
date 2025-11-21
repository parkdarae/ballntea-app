import { AnswerChoice, Question } from "@/types";

interface QuestionCardProps {
  question: Question;
  selected?: AnswerChoice;
  onSelect: (choice: AnswerChoice) => void;
}

const choiceStyles =
  "rounded-xl border-2 border-transparent px-2.5 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mint/40 md:rounded-3xl md:px-6 md:py-5";

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
    <section className="retro-card flex flex-col gap-3 p-2.5 md:gap-5 md:p-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-slate md:text-sm md:tracking-[0.3em]">
          {question.category}
        </p>
        <h2 className="mt-0.5 text-lg font-semibold leading-snug text-ink md:mt-1 md:text-2xl">
          {question.id}. {question.question}
        </h2>
      </header>

      <div className="grid gap-2.5 md:gap-4">
        <button
          type="button"
          className={`${choiceStyles} ${
            selected === "A" ? activeStyles : inactiveStyles
          }`}
          onClick={() => onSelect("A")}
        >
          <p className={`text-xs font-bold md:text-sm ${selected === "A" ? "text-lemon" : "text-pop"}`}>
            A
          </p>
          <p className={`mt-0.5 text-sm leading-relaxed md:mt-1 md:text-base ${selected === "A" ? "text-white" : "text-ink/90"}`}>
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
          <p className={`text-xs font-bold md:text-sm ${selected === "B" ? "text-lemon" : "text-pop"}`}>
            B
          </p>
          <p className={`mt-0.5 text-sm leading-relaxed md:mt-1 md:text-base ${selected === "B" ? "text-white" : "text-ink/90"}`}>
            {question.optionB.text}
          </p>
        </button>
      </div>
    </section>
  );
};

