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
    <section className="retro-card flex flex-col gap-8 p-8">
      <div className="mb-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-ink md:text-6xl">
          Ball<span className="text-pop">&</span>Tea
        </h1>
        <p className="mt-1 text-sm uppercase tracking-[0.6em] text-lemon">
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
        <section className="rounded-3xl border border-pop/20 bg-gradient-to-br from-lemon/10 to-mint/10 p-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-pop px-4 py-1 text-sm font-bold uppercase tracking-[0.2em] text-white">
              {result.mbtiType}
            </span>
            <h3 className="text-xl font-bold text-ink">{mbtiDesc.title}</h3>
          </div>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-ink">
            {mbtiDesc.traits.map((trait, index) => (
              <li key={index} className="flex gap-3">
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

      <section className="space-y-4">
        <div>
          <h3 className="text-sm uppercase tracking-[0.4em] text-slate">
            🌈 에너지 방향성
          </h3>
          <p className="mt-2 text-base leading-relaxed text-ink">
            당신의 에너지 흐름에 맞춘 볼앤티 한 잔이 하루의 리듬을 정확하게 세팅해 줘요. 
            지금 필요한 집중, 안정, 활력을 티 한 모금으로 깨워보세요.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
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

      <section className="grid gap-4 md:grid-cols-2">
        {result.axes.map((axis) => (
          <AxisCard key={axis.axis} axis={axis} />
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <QuickBadge
          label="외향/내향"
          value={result.energyProfile.orientation}
          detail={`외향 ${result.energyProfile.raw.orientation["외향"]} vs 내향 ${result.energyProfile.raw.orientation["내향"]}`}
        />
        <QuickBadge
          label="활동/정적"
          value={result.energyProfile.activity}
          detail={`활동 ${result.energyProfile.raw.activity["활동형"]} · 정적 ${result.energyProfile.raw.activity["정적형"]}`}
        />
        <QuickBadge
          label="센터"
          value={result.energyProfile.center === "Head" ? "사고중심" : result.energyProfile.center === "Heart" ? "감성중심" : "본능중심"}
          detail={`사고 ${result.energyProfile.raw.center.Head} · 감성 ${result.energyProfile.raw.center.Heart} · 본능 ${result.energyProfile.raw.center.Gut}`}
        />
      </section>

      <section className="rounded-3xl bg-ink px-6 py-5 text-white">
        <p className="text-sm uppercase tracking-[0.4em] text-lemon">
          Just for Today
        </p>
        <p className="mt-2 text-lg leading-relaxed">
          {justForToday || `오늘은 ${result.timePreference.label} 루틴에 맞춰 ${result.energyProfile.center} 센터 감각을 활성화하세요.`}
        </p>
      </section>
    </section>
  );
};

const AxisCard = ({
  axis,
}: {
  axis: ResultPayload["axes"][number];
}) => {
  const total = axis.left.score + axis.right.score || 1;
  const leftPercent = Math.round((axis.left.score / total) * 100);
  const rightPercent = 100 - leftPercent;

  return (
    <div className="rounded-3xl border border-stone/60 p-4">
      <div className="flex items-center justify-between text-sm font-semibold text-slate">
        <span>{axis.axis}</span>
        <span>
          {axis.left.label} {axis.left.score} / {axis.right.label}{" "}
          {axis.right.score}
        </span>
      </div>
      <div className="mt-3 flex gap-2 text-lg font-bold text-ink">
        <span>{axis.left.label}</span>
        <span className="text-slate">vs</span>
        <span>{axis.right.label}</span>
      </div>
      <div className="mt-4 h-3 rounded-full bg-stone">
        <div
          className="h-full rounded-full bg-ink"
          style={{ width: `${leftPercent}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate">
        <span>{leftPercent}%</span>
        <span>{rightPercent}%</span>
      </div>
    </div>
  );
};

const QuickBadge = ({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) => (
  <div className="rounded-3xl border border-slate/20 bg-white/80 px-5 py-4">
    <p className="text-xs uppercase tracking-[0.4em] text-slate">{label}</p>
    <p className="text-2xl font-bold text-ink">{value}</p>
    <p className="text-sm text-slate">{detail}</p>
  </div>
);

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
  <div className="rounded-3xl border border-mint/30 bg-gradient-to-br from-mint/5 to-lemon/5 p-5">
    <div className="flex items-center gap-2">
      <span className="text-2xl">🌈</span>
      <div>
        <p className="text-sm font-bold text-ink">{label}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-slate">{subtitle}</p>
      </div>
    </div>
    <p className="mt-3 text-base leading-relaxed text-ink">{description}</p>
    {traits && traits.length > 0 && (
      <ul className="mt-3 space-y-1.5 text-sm text-ink">
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
    <article className="flex flex-col gap-3 rounded-3xl border border-slate/15 bg-white/90 p-5 shadow-[0_12px_30px_rgba(27,43,82,0.08)]">
      <span className="w-fit rounded-full bg-lemon/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-ink">
        {badge}
      </span>
      <div>
        <p className="text-sm font-semibold text-slate">{highlight}</p>
        <h3 className="text-2xl font-bold text-ink">{tea.name}</h3>
        <p className="text-sm text-slate">
          {tea.copy} · 카페인 {tea.caffeine ?? "정보 없음"}
        </p>
      </div>
      {tea.tasteNote && (
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate">
          {tea.tasteNote.map((note) => (
            <span
              key={note}
              className="rounded-full bg-stone/70 px-3 py-1 text-ink"
            >
              #{note}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

