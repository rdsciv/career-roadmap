"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useSourceLookup } from "@/components/roadmap/citations/SourceContext";
import type { Source } from "@/lib/roadmap/types";

export function FootnoteMarker({
  sourceId,
  number,
  tone = "default",
}: {
  sourceId: string;
  number: number;
  tone?: "default" | "inverse";
}) {
  const lookup = useSourceLookup();
  const source: Source | undefined = lookup(sourceId);
  const inverse = tone === "inverse";

  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        <a
          href={source?.url}
          target="_blank"
          rel="noreferrer"
          className={
            "ml-0.5 align-super font-mono text-[10px] tabular-nums no-underline transition-colors " +
            (inverse
              ? "text-paper/70 hover:text-paper"
              : "text-marker hover:text-marker-soft")
          }
          aria-label={`Source ${number}: ${source?.title ?? sourceId}`}
        >
          {number}
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 rounded-md border border-rule bg-paper-raised text-ink shadow-md">
        {source ? (
          <div className="space-y-1">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-stone">
              {source.publisher ?? "Source"}
            </p>
            <p className="font-body text-[14px] leading-snug">{source.title}</p>
            <p className="font-mono text-[10.5px] text-stone-soft truncate">
              {hostname(source.url)}
            </p>
          </div>
        ) : (
          <p className="font-mono text-[12px] text-stone">Unknown source</p>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}

export function FootnoteCluster({
  sourceIds,
  className,
  tone,
}: {
  sourceIds: string[];
  className?: string;
  tone?: "default" | "inverse";
}) {
  const lookup = useSourceLookup();
  if (!sourceIds.length) return null;
  return (
    <span className={className}>
      {sourceIds.map((id, i) => {
        const n = lookup.numberFor(id);
        return (
          <span key={id}>
            {i > 0 && (
              <span className={"mx-[1px] " + (tone === "inverse" ? "text-paper/40" : "text-stone-soft")}>,</span>
            )}
            <FootnoteMarker sourceId={id} number={n} tone={tone} />
          </span>
        );
      })}
    </span>
  );
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
