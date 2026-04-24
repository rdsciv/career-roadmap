import { formatComp } from "@/lib/roadmap/format";
import type { CompBand } from "@/lib/roadmap/types";
import { FootnoteCluster } from "./FootnoteMarker";

export function CompBandHero({ band }: { band: CompBand | undefined }) {
  if (!band) return null;
  const text = formatComp(band);
  if (!text) return null;
  return (
    <div className="mt-8">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper/55 mb-2">
        Compensation at goal
      </p>
      <p className="font-mono text-[clamp(28px,5vw,52px)] leading-[1.05] text-paper tabular-nums">
        {text}
        <FootnoteCluster sourceIds={band.source_ids} className="ml-2" tone="inverse" />
      </p>
    </div>
  );
}
