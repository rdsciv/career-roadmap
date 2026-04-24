import { formatTimeframe } from "@/lib/roadmap/format";
import type { Milestone } from "@/lib/roadmap/types";

export function TimeframePill({
  timeframe,
  index,
  variant = "primary",
}: {
  timeframe: Milestone["timeframe"];
  index?: number;
  variant?: "primary" | "branch";
}) {
  return (
    <p
      className={
        "font-mono text-[11.5px] uppercase tracking-[0.2em] " +
        (variant === "branch" ? "text-stone-soft" : "text-stone")
      }
    >
      {formatTimeframe(timeframe)}
      {typeof index === "number" && (
        <>
          <span className="mx-2 text-rule">·</span>
          Milestone {String(index).padStart(2, "0")}
        </>
      )}
    </p>
  );
}
