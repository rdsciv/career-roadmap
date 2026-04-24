import type { Roadmap } from "@/lib/roadmap/types";
import { CurrentStateCard } from "./nodes/CurrentStateCard";
import { GoalCard } from "./nodes/GoalCard";
import { MilestoneCard } from "./nodes/MilestoneCard";
import { BranchTrack } from "./nodes/BranchTrack";
import { Spine } from "./spine/Spine";
import { SourceProvider } from "./citations/SourceContext";

export function RoadmapView({ roadmap }: { roadmap: Roadmap }) {
  return (
    <SourceProvider sources={roadmap.sources}>
      <div className="bg-paper">
        <CurrentStateCard current={roadmap.current_state} />

        <div className="relative mx-auto max-w-3xl px-6 md:px-10">
          <Spine />
          <div className="relative">
            {roadmap.primary_path.map((m, i) => (
              <MilestoneFork
                key={m.id}
                milestone={m}
                index={i + 1}
                branches={roadmap.branches.filter(
                  (b) => b.forks_after_milestone_id === m.id
                )}
              />
            ))}
          </div>
        </div>

        <GoalCard goal={roadmap.final_goal} />
      </div>
    </SourceProvider>
  );
}

function MilestoneFork({
  milestone,
  index,
  branches,
}: {
  milestone: Roadmap["primary_path"][number];
  index: number;
  branches: Roadmap["branches"];
}) {
  return (
    <>
      <MilestoneCard milestone={milestone} index={index} />
      {branches.map((b) => (
        <BranchTrack key={b.id} branch={b} />
      ))}
    </>
  );
}
