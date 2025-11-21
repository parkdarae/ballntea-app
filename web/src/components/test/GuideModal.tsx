interface GuideModalProps {
  open: boolean;
  title: string;
  description: string;
  bullets: string[];
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export const GuideModal = ({
  open,
  title,
  description,
  bullets,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}: GuideModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-[0_25px_65px_rgba(27,43,82,0.25)]">
        <p className="text-xs uppercase tracking-[0.5em] text-slate">
          Just for Today
        </p>
        <h2 className="mt-2 text-3xl font-bold text-ink">{title}</h2>
        <p className="mt-3 text-base text-slate">{description}</p>
        <ul className="mt-4 space-y-2 text-sm text-ink">
          {bullets.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-pop" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {secondaryLabel && onSecondary && (
            <button
              type="button"
              className="flex-1 rounded-full border border-ink px-4 py-3 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
              onClick={onSecondary}
            >
              {secondaryLabel}
            </button>
          )}
          <button
            type="button"
            className="flex-1 rounded-full bg-pop px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            onClick={onPrimary}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

