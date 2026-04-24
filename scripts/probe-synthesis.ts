/**
 * Phase 0.5: run synthesis against the saved research bundle and write a
 * fixture Roadmap to src/lib/roadmap/__fixtures__/roadmap.fixture.ts.
 *
 * Run:  pnpm tsx scripts/probe-synthesis.ts
 */
import "dotenv/config";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { synthesize } from "../src/lib/pipeline/stages";
import { ResearchBundleSchema } from "../src/lib/roadmap/schema";

const FIXTURE_CURRENT = {
  title: "Senior Software Engineer",
  seniority: "ic_senior" as const,
  years_experience: 8,
  domains: ["fintech", "payments", "backend infrastructure"],
  demonstrated_skills: [
    "Go",
    "Java",
    "Kotlin",
    "gRPC",
    "distributed systems",
    "payments",
    "on-call leadership",
    "tech lead",
  ],
};

const FIXTURE_GOAL = {
  raw: "Become a Director of Engineering at a Series B fintech in 4 years.",
  normalized:
    "Attain a Director of Engineering role at a Series B-stage fintech company within 4 years.",
  target_role: "Director of Engineering",
  target_context: "Series B fintech, 4-year timeline",
  quality: "clear" as const,
};

async function main() {
  const research = JSON.parse(
    readFileSync(join(process.cwd(), "scripts/probe-research.json"), "utf8")
  );
  const parsed = ResearchBundleSchema.safeParse(research);
  if (!parsed.success) {
    console.error("research bundle invalid:", parsed.error.issues.slice(0, 5));
    process.exit(1);
  }

  console.log("Running synthesis against saved research bundle…");
  const t0 = Date.now();
  const roadmap = await synthesize(
    FIXTURE_CURRENT,
    FIXTURE_GOAL,
    parsed.data,
    (ev) => {
      if (ev.type === "stage_started") console.log(`  · ${ev.stage} started`);
      if (ev.type === "stage_progress") console.log(`  · ${ev.stage}: ${ev.summary}`);
      if (ev.type === "stage_completed")
        console.log(`  · ${ev.stage} completed in ${ev.durationMs}ms`);
    }
  );
  console.log(`Synthesis OK (${Date.now() - t0}ms)`);
  console.log(
    `  primary_path: ${roadmap.primary_path.length} milestones, ${roadmap.branches.length} branches, ${roadmap.sources.length} sources`
  );

  const fixDir = join(process.cwd(), "src/lib/roadmap/__fixtures__");
  mkdirSync(fixDir, { recursive: true });
  const out = `// Auto-generated fixture from a real synthesis run. Used by the visualization spike.
// Regenerate via: pnpm tsx scripts/probe-synthesis.ts
import type { Roadmap } from "../types";
export const FIXTURE_ROADMAP: Roadmap = ${JSON.stringify(roadmap, null, 2)} as Roadmap;
`;
  writeFileSync(join(fixDir, "roadmap.fixture.ts"), out);
  console.log("✓ wrote src/lib/roadmap/__fixtures__/roadmap.fixture.ts");
}

main().catch((err) => {
  console.error("synth probe failed:", err);
  process.exit(1);
});
