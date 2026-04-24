/**
 * Pure formatters shared by the web view and the PDF render tree.
 * Anything visual goes here — both layers consume the same Roadmap JSON.
 */
import type { CompBand, Milestone } from "./types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatTimeframe(t: Milestone["timeframe"]): string {
  if (t.min_months === t.max_months) return monthLabel(t.min_months);
  return `${monthLabel(t.min_months)}–${monthLabel(t.max_months, true)}`;
}

function monthLabel(months: number, short = false): string {
  if (months === 0) return short ? "0 mo" : "now";
  if (months < 12) return short ? `${months} mo` : `${months} months`;
  const years = months / 12;
  if (Number.isInteger(years)) return short ? `${years} yr` : `${years} years`;
  return short ? `${years.toFixed(1)} yr` : `${years.toFixed(1)} years`;
}

export function formatComp(band: CompBand | undefined): string | null {
  if (!band) return null;
  const base = `${shortUsd(band.base_min_usd)}–${shortUsd(band.base_max_usd)} base`;
  const total =
    band.total_min_usd != null && band.total_max_usd != null
      ? ` · ${shortUsd(band.total_min_usd)}–${shortUsd(band.total_max_usd)} total`
      : "";
  return `${base}${total} · ${band.year}`;
}

function shortUsd(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return usd.format(n);
}

export function pickVisibleSkills<T>(skills: T[], max = 5): { visible: T[]; rest: number } {
  if (skills.length <= max) return { visible: skills, rest: 0 };
  return { visible: skills.slice(0, max), rest: skills.length - max };
}

export function readingTimeMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
