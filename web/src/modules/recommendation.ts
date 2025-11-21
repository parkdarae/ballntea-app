import { ResultPayload, Tea } from "@/types";

const TIME_BUCKETS: Record<
  ResultPayload["timePreference"]["label"],
  string[]
> = {
  아침형: ["Morning", "Afternoon"],
  저녁형: ["Afternoon", "Evening"],
};

const scoreTeaMatch = (
  tea: Tea,
  result: ResultPayload,
  isSignature: boolean,
): number => {
  let score = 0;

  if (isSignature && tea.mbtiMatch?.includes(result.mbtiType)) {
    score += 100;
  }

  const preferredBuckets = TIME_BUCKETS[result.timePreference.label];
  if (tea.timeTag.some((tag) => preferredBuckets.includes(tag))) {
    score += 4;
  }

  if (tea.energyTag?.includes(result.energyProfile.activity)) {
    score += 3;
  }

  if (tea.energyTag?.includes(result.energyProfile.center)) {
    score += 2;
  }

  if (result.energyProfile.orientation === "외향") {
    if (tea.energyTag?.some((tag) => tag.includes("외향"))) {
      score += 1;
    }
  } else if (tea.energyTag?.some((tag) => tag.includes("내향"))) {
    score += 1;
  }

  return score;
};

export const pickSignatureTea = (
  teas: Tea[],
  result: ResultPayload,
): Tea | undefined => {
  const ranked = [...teas]
    .map((tea) => ({
      tea,
      score: scoreTeaMatch(tea, result, true),
    }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.tea;
};

export const pickEnergyTeas = (
  teas: Tea[],
  result: ResultPayload,
  excludeTeaId?: string,
): Tea[] => {
  const ranked = [...teas]
    .filter((tea) => tea.teaId !== excludeTeaId)
    .map((tea) => ({
      tea,
      score: scoreTeaMatch(tea, result, false),
    }))
    .sort((a, b) => b.score - a.score);

  const unique: Tea[] = [];
  for (const entry of ranked) {
    if (unique.length >= 2) break;
    if (!unique.some((existing) => existing.teaId === entry.tea.teaId)) {
      unique.push(entry.tea);
    }
  }
  return unique;
};

