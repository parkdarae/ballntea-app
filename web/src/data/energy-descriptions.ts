export const ENERGY_DESCRIPTIONS: Record<string, {
  label: string;
  subtitle: string;
  description: string;
}> = {
  "외향": {
    label: "외향 에너지",
    subtitle: "OUTWARD Flow",
    description: "사람이 주는 스파크가 붙는 순간, 당신의 에너지는 전조 없이 피어나요. 대화와 새로움이 들어올 때 가장 생생하게 살아있어요.",
  },
  "내향": {
    label: "내향 에너지",
    subtitle: "INWARD Flow",
    description: "고요 속에서 마음이 '제자리'를 찾는 순간, 당신의 에너지가 올라와요. 혼자만의 루틴에서 차분히 충전될 때 가장 깊은 힘이 깨어나요.",
  },
  "활동형": {
    label: "활동 에너지",
    subtitle: "ACTIVE Drive",
    description: "작은 행동 하나가 큰 흐름으로 이어지는 순간, 당신은 폭발해요. 움직임이 곧 동력이 되고, 동력이 곧 추진력이 돼요.",
  },
  "정적형": {
    label: "정적 에너지",
    subtitle: "CALM Drive",
    description: "속도가 아니라 '안정감'이 완성되는 순간, 당신은 빛나요. 서두르지 않고 당신의 리듬으로 호흡할 때 가장 견고한 집중이 만들어져요.",
  },
};

export const CENTER_DESCRIPTIONS: Record<string, {
  label: string;
  subtitle: string;
  description: string;
  traits: string[];
}> = {
  "Head": {
    label: "사고 중심",
    subtitle: "논리와 분석의 중심",
    description: "복잡한 것이 명확한 구조로 정리되는 순간, 당신은 점화돼요. 생각이 선명해질 때 판단력이 가장 날카로워져요.",
    traits: [
      "문제를 보면 '왜?'와 '어떻게?'를 먼저 물어요.",
      "감정보다 논리와 원리를 우선시해요.",
      "복잡한 정보를 구조화하고 분석하는 데 능해요.",
      "계획과 전략을 세우는 걸 선호해요.",
      "명확하게 이해하고 납득해야 행동해요.",
    ],
  },
  "Heart": {
    label: "감성 중심",
    subtitle: "감정과 공감의 중심",
    description: "마음이 울림을 느끼는 순간, 당신은 깊어져요. 감정의 흐름을 읽고 공감할 때 연결력이 가장 강력해져요.",
    traits: [
      "타인의 감정과 분위기를 민감하게 감지해요.",
      "공감과 배려가 자연스럽게 흘러나와요.",
      "관계와 조화를 중요하게 여겨요.",
      "감정적 연결을 통해 에너지를 얻어요.",
      "마음이 움직여야 진정한 동기가 생겨요.",
    ],
  },
  "Gut": {
    label: "본능 중심",
    subtitle: "본능과 직감의 중심",
    description: "직감이 '이거다' 하고 말하는 순간, 당신은 폭발해요. 생각보다 본능이 먼저 움직일 때 행동력이 가장 빨라요.",
    traits: [
      "직감적으로 상황을 파악하고 즉시 반응해요.",
      "생각보다 행동이 먼저 나올 때가 많아요.",
      "본능적인 판단이 대체로 정확해요.",
      "몸의 감각과 에너지를 중요하게 여겨요.",
      "순간의 느낌을 신뢰하고 따라가요.",
    ],
  },
};
