import type { Branch } from "@/lib/roadmap/types";
import { MilestoneCard } from "./MilestoneCard";

export function BranchTrack({ branch }: { branch: Branch }) {
  return (
    <div className="relative my-8 ml-4 md:ml-12 border-l border-dashed border-stone-soft/60 pl-6 md:pl-10">
      <header className="mb-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-marker">
          Alternative path
        </p>
        <p className="mt-1 font-display text-[clamp(20px,2.4vw,26px)] leading-[1.1] text-ink/90 italic">
          {branch.label}
        </p>
        <p className="mt-2 font-body text-[15px] leading-snug text-stone max-w-[58ch]">
          {branch.rationale}
        </p>
      </header>
      <div className="relative">
        {branch.milestones.map((m, i) => (
          <MilestoneCard key={m.id} milestone={m} index={i + 1} variant="branch" />
        ))}
      </div>
    </div>
  );
}
