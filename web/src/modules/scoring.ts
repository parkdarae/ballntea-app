import {
  AnswerSheet,
  AxisBreakdown,
  CenterLabel,
  Question,
  ResultPayload,
  OrientationLabel,
  ActivityLabel,
  TimeLabel,
  AnswerChoice,
} from "@/types";

const MBTI_AXIS_KEYS = ["E/I", "S/N", "T/F", "J/P"] as const;

type MbtiAxisKey = (typeof MBTI_AXIS_KEYS)[number];

const MBTI_AXIS_LABELS: Record<MbtiAxisKey, { left: string; right: string }> = {
  "E/I": { left: "E", right: "I" },
  "S/N": { left: "S", right: "N" },
  "T/F": { left: "T", right: "F" },
  "J/P": { left: "J", right: "P" },
};

const getOptionScoreKey = (
  question: Question,
  answer: AnswerChoice,
): string => {
  const option = answer === "A" ? question.optionA : question.optionB;
  return Object.keys(option.score)[0] ?? "";
};

const sumScoresByKey = (
  questions: Question[],
  answers: AnswerSheet,
): Record<string, number> => {
  return questions.reduce<Record<string, number>>((acc, question) => {
    const answer = answers[question.id];
    if (!answer) return acc;
    const option = answer === "A" ? question.optionA : question.optionB;
    const key = Object.keys(option.score)[0];
    if (!key) return acc;
    acc[key] = (acc[key] ?? 0) + option.score[key];
    return acc;
  }, {});
};

const resolveTieWithRecency = (
  axisKey: string,
  axisOptions: { left: string; right: string },
  questions: Question[],
  answers: AnswerSheet,
): string => {
  const related = [
    ...questions.filter(
      (question) => question.axis.replaceAll(" ", "") === axisKey,
    ),
  ].sort((a, b) => b.id - a.id);

  for (const question of related) {
    const answer = answers[question.id];
    if (!answer) continue;
    const optionKey = getOptionScoreKey(question, answer);
    if (optionKey) {
      return optionKey;
    }
  }
  return axisOptions.left;
};

const buildAxisBreakdown = (
  questions: Question[],
  answers: AnswerSheet,
): AxisBreakdown[] => {
  return MBTI_AXIS_KEYS.map((axisKey) => {
    const axisQuestions = questions.filter(
      (question) => question.axis === axisKey,
    );
    const totals = sumScoresByKey(axisQuestions, answers);
    const labels = MBTI_AXIS_LABELS[axisKey];
    const leftScore = totals[labels.left] ?? 0;
    const rightScore = totals[labels.right] ?? 0;

    return {
      axis: axisKey,
      left: { label: labels.left, score: leftScore },
      right: { label: labels.right, score: rightScore },
    };
  });
};

const deduceMbtiType = (
  axes: AxisBreakdown[],
  questions: Question[],
  answers: AnswerSheet,
): string => {
  return axes
    .map((axis) => {
      if (axis.left.score === axis.right.score) {
        const winner = resolveTieWithRecency(
          axis.axis,
          { left: axis.left.label, right: axis.right.label },
          questions,
          answers,
        );
        return winner || axis.left.label;
      }
      return axis.left.score > axis.right.score
        ? axis.left.label
        : axis.right.label;
    })
    .join("");
};

const toOrientationLabel = (
  scoreMap: Record<string, number>,
): OrientationLabel => {
  const extro = scoreMap["외향에너지"] ?? 0;
  const intro = scoreMap["내향에너지"] ?? 0;
  if (extro === intro) {
    return extro >= intro ? "외향" : "내향";
  }
  return extro > intro ? "외향" : "내향";
};

const toActivityLabel = (
  scoreMap: Record<string, number>,
): ActivityLabel => {
  const active = scoreMap["활동형"] ?? 0;
  const calm = scoreMap["정적형"] ?? 0;
  if (active === calm) {
    return active >= calm ? "활동형" : "정적형";
  }
  return active > calm ? "활동형" : "정적형";
};

const toCenterLabel = (scoreMap: Record<string, number>): CenterLabel => {
  const head = scoreMap["Head"] ?? 0;
  const heart = scoreMap["Heart"] ?? 0;
  const gut = scoreMap["Gut"] ?? 0;
  if (head === heart && head === gut) return "Head";
  const max = Math.max(head, heart, gut);
  if (max === head) return "Head";
  if (max === heart) return "Heart";
  if (max === gut) return "Gut";
  return "Head";
};

const toTimeLabel = (scoreMap: Record<string, number>): TimeLabel => {
  const morning = scoreMap["아침형"] ?? 0;
  const evening = scoreMap["저녁형"] ?? 0;
  if (morning === evening) {
    return morning >= evening ? "아침형" : "저녁형";
  }
  return morning > evening ? "아침형" : "저녁형";
};

export const calculateResult = (
  questions: Question[],
  answers: AnswerSheet,
): ResultPayload => {
  const mbtiQuestions = questions.filter((question) => question.category === "MBTI");
  const energyQuestions = questions.filter(
    (question) => question.category === "Energy",
  );
  const timeQuestions = questions.filter(
    (question) => question.category === "TimePreference",
  );

  const axes = buildAxisBreakdown(mbtiQuestions, answers);
  const mbtiType = deduceMbtiType(axes, mbtiQuestions, answers);

  const energyScoreMap = sumScoresByKey(energyQuestions, answers);
  const timeScoreMap = sumScoresByKey(timeQuestions, answers);

  const energyProfile = {
    orientation: toOrientationLabel(energyScoreMap),
    activity: toActivityLabel(energyScoreMap),
    center: toCenterLabel(energyScoreMap),
    raw: {
      orientation: {
        외향: energyScoreMap["외향에너지"] ?? 0,
        내향: energyScoreMap["내향에너지"] ?? 0,
      },
      activity: {
        활동형: energyScoreMap["활동형"] ?? 0,
        정적형: energyScoreMap["정적형"] ?? 0,
      },
      center: {
        Head: energyScoreMap["Head"] ?? 0,
        Heart: energyScoreMap["Heart"] ?? 0,
        Gut: energyScoreMap["Gut"] ?? 0,
      },
    },
  };

  const timePreference = {
    label: toTimeLabel(timeScoreMap),
    scores: {
      아침형: timeScoreMap["아침형"] ?? 0,
      저녁형: timeScoreMap["저녁형"] ?? 0,
    },
  };

  const answerCount = Object.keys(answers).length;

  return {
    mbtiType,
    axes,
    energyProfile,
    timePreference,
    answerCount,
  };
};

