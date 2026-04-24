import type { Action } from "@/lib/roadmap/types";

const ICONS: Record<Action["type"], string> = {
  project: "◆",
  cert: "✓",
  role_change: "→",
  network: "○",
  study: "□",
  artifact: "◇",
};

const LABELS: Record<Action["type"], string> = {
  project: "Project",
  cert: "Cert",
  role_change: "Role change",
  network: "Network",
  study: "Study",
  artifact: "Artifact",
};

export function ActionItem({ action }: { action: Action }) {
  return (
    <li className="grid grid-cols-[28px_1fr] gap-x-3 py-2.5 border-b border-rule/60 last:border-0">
      <span
        className="font-mono text-sm text-marker pt-0.5"
        aria-hidden
        title={LABELS[action.type]}
      >
        {ICONS[action.type]}
      </span>
      <div>
        <p className="font-body text-[15.5px] leading-snug text-ink">
          {action.title}
        </p>
        {action.detail && (
          <p className="mt-0.5 font-body text-[14px] leading-snug text-stone">
            {action.detail}
          </p>
        )}
        <div className="mt-1 flex gap-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-stone-soft">
          <span>{LABELS[action.type]}</span>
          {action.est_effort_hours != null && (
            <span>~{action.est_effort_hours}h</span>
          )}
        </div>
      </div>
    </li>
  );
}
