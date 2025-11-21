import { ResultPayload, Tea } from "@/types";
import { MBTI_DESCRIPTIONS } from "@/data/mbti-descriptions";
import { ENERGY_DESCRIPTIONS, CENTER_DESCRIPTIONS } from "@/data/energy-descriptions";
import { MBTI_JUST_FOR_TODAY } from "@/data/mbti-just-for-today";

interface ResultSummaryProps {
  result: ResultPayload;
  signatureTea?: Tea;
  energyTeas: Tea[];
}

export const ResultSummary = ({
  result,
  signatureTea,
  energyTeas,
}: ResultSummaryProps) => {
  const mbtiDesc = MBTI_DESCRIPTIONS[result.mbtiType];
  const orientationDesc = ENERGY_DESCRIPTIONS[result.energyProfile.orientation];
  const activityDesc = ENERGY_DESCRIPTIONS[result.energyProfile.activity];
  const centerDesc = CENTER_DESCRIPTIONS[result.energyProfile.center];
  const justForToday = MBTI_JUST_FOR_TODAY[result.mbtiType];

  return (
    <section className="retro-card flex flex-col gap-6 p-4 md:gap-8 md:p-6">
      <div className="mb-2 text-center md:mb-4">
        <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl">
          Ball<span className="text-pop">&</span>Tea
        </h1>
        <p className="mt-1 text-xs uppercase tracking-[0.5em] text-lemon md:text-sm md:tracking-[0.6em]">
          TEST
        </p>
      </div>

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.5em] text-slate">
            결과 리포트
          </p>
          <h2 className="text-4xl font-bold text-ink">
            {result.mbtiType} · {result.energyProfile.orientation} ·{" "}
            {result.energyProfile.activity} · {result.energyProfile.center}
          </h2>
          <p className="mt-2 text-base text-slate">
            13문항 모두 완료 — 102% 에너지 루틴을 위한 맞춤 티 조합입니다.
          </p>
        </div>
        <div className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">
          시간대: {result.timePreference.label}
        </div>
      </header>

      {mbtiDesc && (
        <section className="rounded-3xl border border-pop/20 bg-gradient-to-br from-lemon/10 to-mint/10 p-4 md:p-6">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="rounded-full bg-pop px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white md:px-4 md:text-sm">
              {result.mbtiType}
            </span>
            <h3 className="text-lg font-bold text-ink md:text-xl">{mbtiDesc.title}</h3>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink md:mt-4 md:space-y-2 md:text-base">
            {mbtiDesc.traits.map((trait, index) => (
              <li key={index} className="flex gap-2 md:gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pop" />
                <span>{trait}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-3">
        {signatureTea && (
          <TeaCard
            tea={signatureTea}
            badge="시그니처 티"
            highlight="MBTI 시그니처 매칭"
          />
        )}
        {energyTeas.map((tea, index) => (
          <TeaCard
            key={tea.teaId}
            tea={tea}
            badge={`${index === 0 ? "AM" : "PM"} 루틴`}
            highlight="에너지 루틴 추천"
          />
        ))}
      </section>

      <section className="space-y-3 md:space-y-4">
        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-slate md:text-sm md:tracking-[0.4em]">
            🌈 에너지 방향성
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink md:text-base">
            당신의 에너지 흐름에 맞춘 볼앤티 한 잔이 하루의 리듬을 정확하게 세팅해 줘요. 
            지금 필요한 집중, 안정, 활력을 티 한 모금으로 깨워보세요.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {orientationDesc && (
            <EnergyCard
              label={orientationDesc.label}
              subtitle={orientationDesc.subtitle}
              description={orientationDesc.description}
            />
          )}
          {activityDesc && (
            <EnergyCard
              label={activityDesc.label}
              subtitle={activityDesc.subtitle}
              description={activityDesc.description}
            />
          )}
        </div>
        {centerDesc && (
          <EnergyCard
            label={centerDesc.label}
            subtitle={centerDesc.subtitle}
            description={centerDesc.description}
            traits={centerDesc.traits}
          />
        )}
      </section>

      <section className="rounded-3xl bg-ink px-4 py-4 text-white md:px-6 md:py-5">
        <p className="text-xs uppercase tracking-[0.3em] text-lemon md:text-sm md:tracking-[0.4em]">
          Just for Today
        </p>
        <p className="mt-2 text-base leading-relaxed md:text-lg">
          {justForToday || `오늘은 ${result.timePreference.label} 루틴에 맞춰 ${result.energyProfile.center} 센터 감각을 활성화하세요.`}
        </p>
      </section>
    </section>
  );
};

const EnergyCard = ({
  label,
  subtitle,
  description,
  traits,
}: {
  label: string;
  subtitle: string;
  description: string;
  traits?: string[];
}) => (
  <div className="rounded-3xl border border-mint/30 bg-gradient-to-br from-mint/5 to-lemon/5 p-4 md:p-5">
    <div className="flex items-center gap-2">
      <span className="text-xl md:text-2xl">🌈</span>
      <div>
        <p className="text-sm font-bold text-ink md:text-base">{label}</p>
        <p className="text-xs uppercase tracking-[0.15em] text-slate md:tracking-[0.2em]">{subtitle}</p>
      </div>
    </div>
    <p className="mt-2 text-sm leading-relaxed text-ink md:mt-3 md:text-base">{description}</p>
    {traits && traits.length > 0 && (
      <ul className="mt-2 space-y-1 text-xs text-ink md:mt-3 md:space-y-1.5 md:text-sm">
        {traits.map((trait, index) => (
          <li key={index} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-mint" />
            <span>{trait}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const TeaCard = ({
  tea,
  badge,
  highlight,
}: {
  tea: Tea;
  badge: string;
  highlight: string;
}) => {
  return (
    <article className="flex flex-col gap-2 rounded-3xl border border-slate/15 bg-white/90 p-4 shadow-[0_12px_30px_rgba(27,43,82,0.08)] md:gap-3 md:p-5">
      <span className="w-fit rounded-full bg-lemon/40 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink md:px-3 md:py-1 md:tracking-[0.3em]">
        {badge}
      </span>
      <div>
        <p className="text-xs font-semibold text-slate md:text-sm">{highlight}</p>
        <h3 className="text-xl font-bold text-ink md:text-2xl">{tea.name}</h3>
        <p className="text-xs text-slate md:text-sm">
          {tea.copy} · 카페인 {tea.caffeine ?? "정보 없음"}
        </p>
      </div>
      {tea.tasteNote && (
        <div className="flex flex-wrap gap-1.5 text-xs font-semibold text-slate md:gap-2">
          {tea.tasteNote.map((note) => (
            <span
              key={note}
              className="rounded-full bg-stone/70 px-2.5 py-0.5 text-ink md:px-3 md:py-1"
            >
              #{note}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

