export type QuestionCategory = "MBTI" | "Energy" | "TimePreference";

export type AnswerChoice = "A" | "B";

export type AnswerSheet = Record<number, AnswerChoice>;

export interface QuestionOption {
  text: string;
  score: Record<string, number>;
}

export interface Question {
  id: number;
  category: QuestionCategory;
  axis: string;
  question: string;
  optionA: QuestionOption;
  optionB: QuestionOption;
}

export interface Tea {
  teaId: string;
  name: string;
  nameEn?: string;
  timeTag: string[];
  energyTag: string[];
  mbtiMatch?: string[];
  tasteNote?: string[];
  caffeine?: string;
  copy: string;
  description?: string;
  brewingGuide?: {
    teaBag?: string;
    water?: string;
    time?: string;
    temp?: string;
  };
  assets?: string[];
}

export interface AxisSide {
  label: string;
  score: number;
}

export interface AxisBreakdown {
  axis: string;
  left: AxisSide;
  right: AxisSide;
}

export type OrientationLabel = "외향" | "내향";
export type ActivityLabel = "활동형" | "정적형";
export type CenterLabel = "Head" | "Heart" | "Gut";
export type TimeLabel = "아침형" | "저녁형";

export interface EnergyProfile {
  orientation: OrientationLabel;
  activity: ActivityLabel;
  center: CenterLabel;
  raw: {
    orientation: Record<OrientationLabel, number>;
    activity: Record<ActivityLabel, number>;
    center: Record<CenterLabel, number>;
  };
}

export interface ResultPayload {
  mbtiType: string;
  axes: AxisBreakdown[];
  energyProfile: EnergyProfile;
  timePreference: {
    label: TimeLabel;
    scores: Record<TimeLabel, number>;
  };
  answerCount: number;
}

