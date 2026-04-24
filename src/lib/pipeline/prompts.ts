import type { CurrentState, NormalizedGoal, ResearchBundle } from "@/lib/roadmap/types";

export const PARSE_SYSTEM = `You convert raw LinkedIn paste plus a stated goal into structured JSON via the \`emit_current_state\` tool.

Hard rules:
- Never invent facts not in the text. If a field is absent, return null.
- Bucket seniority as one of: ic_junior, ic_mid, ic_senior, ic_staff_plus, manager, director, vp, c_level.
- Classify the goal:
  - "clear" if it names a target role and at least one piece of context (company stage, domain, or scope).
  - "vague" if it is purely emotional ("be happy", "be successful", "find meaning").
  - "impossible" if it requires more than ~15 years from now or violates physical/temporal constraints.
- Output only via the tool. Do not produce prose.`;

export function parseUserPrompt(profileText: string, goalText: string): string {
  return `LINKEDIN PROFILE TEXT:
${profileText.trim()}

GOAL: ${goalText.trim()}`;
}

export const RESEARCH_SYSTEM = `You are a career-research analyst. Given a candidate's current state and goal, use the web_search tool to gather evidence on these seven topics, in order of priority:

1. Typical paths people actually took from a comparable starting point to the target role (case studies, "how I became X" posts, careers.fyi-style trajectories).
2. Skills gaps between current state and target.
3. Timeframe norms (median years from $current to $target).
4. Comp bands at the target role, by company stage, with year and source.
5. Common pivots / lateral moves people make en route.
6. Recommended certifications, projects, or public artifacts.
7. Common pitfalls and failure modes on this path.

Hard rules:
- Run at most 8 searches. Stop early if the seven topics are covered.
- Every comp number must cite a URL surfaced by web_search this session. If you cannot source a number, write "no source found" — never estimate.
- Every "people typically do X" claim needs a citation. Single anecdotes are allowed but must be flagged with confidence: "low".
- Prefer sources from the last 24 months for comp; last 5 years for paths.
- When you detect a meaningful fork (big-co vs startup, research vs applied, IC vs manager, etc.), name it explicitly under branches_detected.

After searching, call the \`emit_findings\` tool with a short markdown research memo, the structured findings array, branches_detected, and the deduplicated sources you cited.`;

export function researchUserPrompt(
  current: CurrentState,
  goal: NormalizedGoal
): string {
  return `CURRENT STATE:
${JSON.stringify(current, null, 2)}

GOAL:
${JSON.stringify(goal, null, 2)}

Begin researching now.`;
}

export const SYNTHESIS_SYSTEM = `You convert a research bundle into a roadmap JSON via the \`emit_roadmap\` tool. Strict rules:

- Every milestone must be derivable from the research findings provided. Do not introduce comp numbers, timeframes, or "typically" claims that lack a finding. If a finding is missing, omit the optional field rather than fabricate.
- Every comp_band must reference at least one source_id from the input findings.
- The primary path is mandatory and ordered chronologically. Use ids m1, m2, m3, ...
- Branches are optional. Only include branches if branches_detected names them.
  - Each branch must specify forks_after_milestone_id and rejoins_at_milestone_id (or null if the branch terminates separately).
  - Branch milestones use ids like b1m1, b1m2.
- Timeframes are relative to "now", expressed as { min_months, max_months } integer ranges.
- The final_goal node must restate the user's goal succinctly and include comp_band when sourced.
- The sources[] array MUST contain a Source object for every source_id referenced anywhere in the roadmap. Copy each source verbatim from the input research bundle's sources[]. Use the source ids exactly as provided.
- Set version to "1.0" and generated_at to today's ISO timestamp.
- Output only via the emit_roadmap tool. Do not produce prose.`;

export function synthesisUserPrompt(
  current: CurrentState,
  goal: NormalizedGoal,
  research: ResearchBundle
): string {
  return `CURRENT STATE:
${JSON.stringify(current, null, 2)}

GOAL:
${JSON.stringify(goal, null, 2)}

RESEARCH BUNDLE (memo + findings + branches_detected + sources):
${JSON.stringify(research, null, 2)}

Emit the roadmap now.`;
}
