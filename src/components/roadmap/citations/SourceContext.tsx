"use client";

import { createContext, useContext, useMemo } from "react";
import type { Source } from "@/lib/roadmap/types";

type SourceLookup = ((id: string) => Source | undefined) & {
  numberFor: (id: string) => number;
};

const SourceContext = createContext<SourceLookup | null>(null);

export function SourceProvider({
  sources,
  children,
}: {
  sources: Source[];
  children: React.ReactNode;
}) {
  const lookup = useMemo<SourceLookup>(() => {
    const byId = new Map<string, Source>();
    const numberById = new Map<string, number>();
    sources.forEach((s, i) => {
      byId.set(s.id, s);
      numberById.set(s.id, i + 1);
    });
    const fn = ((id: string) => byId.get(id)) as SourceLookup;
    fn.numberFor = (id: string) => numberById.get(id) ?? 0;
    return fn;
  }, [sources]);

  return <SourceContext.Provider value={lookup}>{children}</SourceContext.Provider>;
}

export function useSourceLookup(): SourceLookup {
  const ctx = useContext(SourceContext);
  if (!ctx) {
    // Safe fallback so primitives don't crash when rendered outside a Roadmap.
    const fn = (() => undefined) as unknown as SourceLookup;
    fn.numberFor = () => 0;
    return fn;
  }
  return ctx;
}
