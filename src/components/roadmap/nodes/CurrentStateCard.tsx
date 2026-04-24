import type { CurrentState } from "@/lib/roadmap/types";
import { SkillChip } from "@/components/roadmap/primitives/SkillChip";

const SENIORITY_LABEL: Record<NonNullable<CurrentState["seniority"]>, string> = {
  ic_junior: "Junior IC",
  ic_mid: "Mid IC",
  ic_senior: "Senior IC",
  ic_staff_plus: "Staff+",
  manager: "Manager",
  director: "Director",
  vp: "VP",
  c_level: "C-level",
};

export function CurrentStateCard({ current }: { current: CurrentState }) {
  return (
    <section className="relative bg-ink text-paper">
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-paper/55 mb-5">
          Where you are today
        </p>
        <h1
          className="font-display tracking-tight text-paper text-[clamp(36px,5.4vw,64px)] leading-[1.02]"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 60" }}
        >
          {current.title ?? "Your current role"}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[12px] uppercase tracking-[0.18em] text-paper/70">
          {current.seniority && (
            <span>{SENIORITY_LABEL[current.seniority]}</span>
          )}
          {current.years_experience != null && (
            <span>· {current.years_experience} yrs experience</span>
          )}
          {current.domains.length > 0 && (
            <span className="normal-case tracking-normal text-paper/60">
              · {current.domains.join(", ")}
            </span>
          )}
        </div>

        {current.demonstrated_skills.length > 0 && (
          <div className="mt-8">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper/55 mb-3">
              Demonstrated
            </p>
            <div className="flex flex-wrap gap-1.5">
              {current.demonstrated_skills.slice(0, 14).map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full border border-paper/25 px-2.5 py-0.5 font-mono text-[11.5px] tracking-tight text-paper/85"
                >
                  {s}
                </span>
              ))}
              {current.demonstrated_skills.length > 14 && (
                <span className="font-mono text-[11.5px] text-paper/55">
                  +{current.demonstrated_skills.length - 14} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
