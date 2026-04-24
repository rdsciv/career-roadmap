import type { Pitfall } from "@/lib/roadmap/types";

export function PitfallCallout({ pitfall }: { pitfall: Pitfall }) {
  return (
    <div className="border-l-2 border-marker/70 pl-3 py-1">
      <p className="font-body italic text-[14.5px] leading-snug text-ink/85">
        {pitfall.text}
      </p>
    </div>
  );
}
