import type { FinalGoal } from "@/lib/roadmap/types";
import { CompBandHero } from "@/components/roadmap/primitives/CompBandHero";

export function GoalCard({ goal }: { goal: FinalGoal }) {
  return (
    <section className="relative bg-wash text-paper">
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-paper/55 mb-5">
          Where you&apos;re going
        </p>
        <h2
          className="font-display tracking-tight text-paper text-[clamp(36px,5.4vw,64px)] leading-[1.02]"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 60" }}
        >
          {goal.title}
        </h2>
        <p className="mt-6 font-body text-[clamp(16px,1.6vw,19px)] leading-relaxed text-paper/85 max-w-[60ch]">
          {goal.summary}
        </p>
        <CompBandHero band={goal.comp_band} />
      </div>
    </section>
  );
}
