import { formatComp } from "@/lib/roadmap/format";
import type { CompBand } from "@/lib/roadmap/types";
import { FootnoteCluster } from "./FootnoteMarker";

export function CompBandLine({ band }: { band: CompBand | undefined }) {
  if (!band) return null;
  const text = formatComp(band);
  if (!text) return null;
  return (
    <p className="mt-4 font-mono text-[13px] text-ink/80 tabular-nums">
      <span className="text-stone uppercase tracking-[0.18em] mr-2 text-[10.5px]">
        Comp
      </span>
      {text}
      <FootnoteCluster sourceIds={band.source_ids} className="ml-1.5" />
    </p>
  );
}
