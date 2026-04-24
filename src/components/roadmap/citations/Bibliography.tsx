import type { Source } from "@/lib/roadmap/types";

export function Bibliography({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <section className="border-t border-rule mt-16">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-stone mb-6">
          Sources
        </p>
        <ol className="space-y-3">
          {sources.map((s, i) => (
            <li
              key={s.id}
              className="grid grid-cols-[28px_1fr] gap-x-3 font-body text-[14.5px] leading-snug"
            >
              <span className="font-mono text-[12px] text-stone-soft tabular-nums pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink underline decoration-rule decoration-1 underline-offset-4 hover:decoration-marker"
                >
                  {s.title}
                </a>
                {s.publisher && (
                  <span className="ml-2 font-mono text-[11px] text-stone uppercase tracking-[0.14em]">
                    {s.publisher}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
