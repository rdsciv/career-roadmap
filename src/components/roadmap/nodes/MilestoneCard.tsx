"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Milestone } from "@/lib/roadmap/types";
import { TimeframePill } from "@/components/roadmap/primitives/TimeframePill";
import { SkillChip, SkillOverflow } from "@/components/roadmap/primitives/SkillChip";
import { CompBandLine } from "@/components/roadmap/primitives/CompBandLine";
import { ActionItem } from "@/components/roadmap/primitives/ActionItem";
import { PitfallCallout } from "@/components/roadmap/primitives/PitfallCallout";
import { pickVisibleSkills } from "@/lib/roadmap/format";
import { useSourceLookup } from "@/components/roadmap/citations/SourceContext";

export function MilestoneCard({
  milestone,
  index,
  variant = "primary",
}: {
  milestone: Milestone;
  index: number;
  variant?: "primary" | "branch";
}) {
  const [open, setOpen] = useState(false);
  const skills = pickVisibleSkills(milestone.required_skills, 5);
  const isBranch = variant === "branch";
  const lookup = useSourceLookup();
  const cited = Array.from(
    new Set([
      ...milestone.source_ids,
      ...(milestone.comp_band?.source_ids ?? []),
      ...(milestone.pitfalls?.flatMap((p) => p.source_ids) ?? []),
      ...(milestone.actions.flatMap((a) => a.source_ids ?? [])),
    ])
  )
    .map((id) => lookup(id))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -20% 0px" }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className={
        "relative " +
        (isBranch
          ? "pl-8 pr-2 py-6"
          : "pl-12 md:pl-16 pr-4 py-10 md:py-14")
      }
    >
      {/* spine connector dot */}
      <span
        aria-hidden
        className={
          "absolute top-12 rounded-full bg-ink ring-[6px] ring-paper " +
          (isBranch
            ? "left-[-7px] size-3 bg-stone ring-[5px]"
            : "left-[-9px] size-4")
        }
      />

      <TimeframePill timeframe={milestone.timeframe} index={index} variant={variant} />

      <h2
        className={
          "mt-3 font-display tracking-tight text-ink " +
          (isBranch
            ? "text-[clamp(20px,2.4vw,26px)] leading-[1.08] font-normal"
            : "text-[clamp(26px,3.4vw,38px)] leading-[1.04] font-normal")
        }
        style={{ fontVariationSettings: "'opsz' 96, 'SOFT' 100" }}
      >
        {milestone.title}
      </h2>

      <p
        className={
          "mt-3 font-body text-stone-900/85 max-w-[64ch] " +
          (isBranch ? "text-[15.5px] leading-snug" : "text-[18px] leading-relaxed")
        }
      >
        {milestone.summary}
      </p>

      {skills.visible.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {skills.visible.map((s) => (
            <SkillChip key={s}>{s}</SkillChip>
          ))}
          {skills.rest > 0 && <SkillOverflow count={skills.rest} />}
        </div>
      )}

      <CompBandLine band={milestone.comp_band} />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-stone hover:text-ink transition-colors"
        aria-expanded={open}
      >
        {open ? "Hide details" : "Actions, pitfalls, sources"}
        <ChevronDown
          className={"size-3 transition-transform " + (open ? "rotate-180" : "")}
        />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-6 grid gap-8 md:grid-cols-[1fr_280px] max-w-[64ch]">
            <div className="space-y-6">
              {milestone.actions.length > 0 && (
                <section>
                  <SectionLabel>Actions</SectionLabel>
                  <ul className="mt-2">
                    {milestone.actions.map((a, i) => (
                      <ActionItem key={i} action={a} />
                    ))}
                  </ul>
                </section>
              )}

              {milestone.pitfalls && milestone.pitfalls.length > 0 && (
                <section>
                  <SectionLabel>Pitfalls</SectionLabel>
                  <div className="mt-3 space-y-3">
                    {milestone.pitfalls.map((p, i) => (
                      <PitfallCallout key={i} pitfall={p} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              {milestone.suggested_roles.length > 0 && (
                <section>
                  <SectionLabel>Suggested roles</SectionLabel>
                  <ul className="mt-2 space-y-1 font-body text-[14.5px] leading-snug text-ink/90">
                    {milestone.suggested_roles.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </section>
              )}

              {milestone.suggested_companies && milestone.suggested_companies.length > 0 && (
                <section>
                  <SectionLabel>Sample companies</SectionLabel>
                  <p className="mt-2 font-body text-[14px] leading-snug text-stone">
                    {milestone.suggested_companies.join(" · ")}
                  </p>
                </section>
              )}

              {cited.length > 0 && (
                <section>
                  <SectionLabel>Sources</SectionLabel>
                  <ul className="mt-2 space-y-1.5">
                    {cited.map((s) => (
                      <li key={s.id}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-body text-[13.5px] leading-snug text-stone hover:text-ink underline decoration-rule decoration-1 underline-offset-[3px] hover:decoration-marker"
                        >
                          {s.title}
                          {s.publisher && (
                            <span className="block text-[11px] text-stone-soft font-mono uppercase tracking-[0.12em]">
                              {s.publisher}
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-stone">
      {children}
    </p>
  );
}
