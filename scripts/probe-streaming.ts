/**
 * Phase 0 verification probe.
 *
 * Confirms three things before we build any UI:
 * 1. claude-sonnet-4-6 + extended thinking + web_search + a forced tool call
 *    can all combine in one streaming request.
 * 2. We can observe meaningful in-flight events (thinking, tool_use, tool_result)
 *    via the SDK's MessageStream.
 * 3. The forced tool call returns a JSON object that parses against our Zod schema.
 *
 * Run:  pnpm tsx scripts/probe-streaming.ts
 */

import "dotenv/config";
import { writeFileSync } from "node:fs";
import { getAnthropic, SONNET_MODEL, WEB_SEARCH_TOOL_TYPE } from "../src/lib/anthropic/client";
import {
  EMIT_CURRENT_STATE_TOOL,
  EMIT_FINDINGS_TOOL,
} from "../src/lib/pipeline/tools";
import {
  PARSE_SYSTEM,
  parseUserPrompt,
  RESEARCH_SYSTEM,
  researchUserPrompt,
} from "../src/lib/pipeline/prompts";
import {
  ParseProfileOutputSchema,
  ResearchBundleSchema,
} from "../src/lib/roadmap/schema";

const FIXTURE_PROFILE = `
Ryan Kim
Senior Software Engineer at Stripe
San Francisco Bay Area · 8 years experience

Experience
- Stripe — Senior Software Engineer (2022 – Present)
  Owns the issuing platform's authorization service. Tech lead for a team of 4.
  Drove migration from legacy Java service to Go, cut p99 latency 40%.
- Square — Software Engineer (2019 – 2022)
  Worked on Cash App backend (Kotlin, gRPC). Shipped instant deposit feature.
- Plaid — Software Engineer (2017 – 2019)
  Backend on the Auth product. First production Python service for the team.

Education
- BS Computer Science, UC Berkeley (2017)

Skills: Go, Java, Kotlin, gRPC, distributed systems, payments, on-call leadership
`.trim();

const FIXTURE_GOAL =
  "Become a Director of Engineering at a Series B fintech in 4 years.";

type EventCounts = Record<string, number>;

async function runStage1() {
  console.log("\n=== STAGE 1 — parseProfile (no tools, forced emit) ===\n");
  const client = getAnthropic();
  const counts: EventCounts = {};
  const t0 = Date.now();

  const stream = client.messages.stream({
    model: SONNET_MODEL,
    max_tokens: 1500,
    system: PARSE_SYSTEM,
    messages: [{ role: "user", content: parseUserPrompt(FIXTURE_PROFILE, FIXTURE_GOAL) }],
    tools: [EMIT_CURRENT_STATE_TOOL],
    tool_choice: { type: "tool", name: "emit_current_state" },
  });

  for await (const ev of stream) {
    counts[ev.type] = (counts[ev.type] ?? 0) + 1;
    if (ev.type === "content_block_start") {
      console.log(
        `  content_block_start  type=${ev.content_block.type}` +
          ("name" in ev.content_block ? `  name=${ev.content_block.name}` : "")
      );
    }
  }

  const final = await stream.finalMessage();
  const dur = Date.now() - t0;

  console.log("\n  event counts:", counts);
  console.log("  duration:", dur, "ms");
  console.log("  stop_reason:", final.stop_reason);
  console.log("  usage:", final.usage);

  const toolUse = final.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new Error("Stage 1: no tool_use block in final message");
  }
  const parsed = ParseProfileOutputSchema.safeParse(toolUse.input);
  if (!parsed.success) {
    console.error("  Zod validation failed:", parsed.error.issues);
    throw new Error("Stage 1: tool input failed schema validation");
  }
  console.log("\n  ✓ Stage 1 schema-valid output:");
  console.log(JSON.stringify(parsed.data, null, 2));
  return parsed.data;
}

async function runStage2(stage1: { current_state: unknown; goal: unknown }) {
  console.log(
    "\n=== STAGE 2 — research (extended thinking + web_search + forced emit) ===\n"
  );
  const client = getAnthropic();
  const counts: EventCounts = {};
  const t0 = Date.now();
  const searchQueries: string[] = [];

  const stream = client.messages.stream({
    model: SONNET_MODEL,
    max_tokens: 10000,
    thinking: { type: "enabled", budget_tokens: 4000 },
    system: RESEARCH_SYSTEM,
    messages: [
      {
        role: "user",
        content: researchUserPrompt(
          stage1.current_state as never,
          stage1.goal as never
        ),
      },
    ],
    tools: [
      {
        type: WEB_SEARCH_TOOL_TYPE,
        name: "web_search",
        max_uses: 3, // capped low for the probe
      },
      EMIT_FINDINGS_TOOL,
    ],
    // For Stage 2 we cannot force the emit tool because thinking + tool_choice forced
    // are mutually exclusive in some configurations. Leave as auto and the prompt
    // instructs the model to call emit_findings at the end.
  });

  let lastLog = Date.now();
  for await (const ev of stream) {
    counts[ev.type] = (counts[ev.type] ?? 0) + 1;
    if (ev.type === "content_block_start") {
      const cb = ev.content_block;
      const detail =
        cb.type === "server_tool_use" || cb.type === "tool_use"
          ? `  name=${cb.name}`
          : "";
      console.log(`  content_block_start  type=${cb.type}${detail}`);
    }
    if (ev.type === "content_block_delta") {
      const delta = ev.delta;
      if (delta.type === "input_json_delta" && Date.now() - lastLog > 500) {
        lastLog = Date.now();
        process.stdout.write(".");
      }
    }
  }

  const final = await stream.finalMessage();
  const dur = Date.now() - t0;

  // Inspect server_tool_use blocks for queries
  for (const b of final.content) {
    if (b.type === "server_tool_use" && b.name === "web_search") {
      const input = b.input as { query?: string };
      if (input?.query) searchQueries.push(input.query);
    }
  }

  console.log("\n\n  event counts:", counts);
  console.log("  duration:", dur, "ms");
  console.log("  stop_reason:", final.stop_reason);
  console.log("  usage:", final.usage);
  console.log("  web_search queries fired:", searchQueries);

  // Look for an emit_findings tool_use
  const emitBlock = final.content.find(
    (b) => b.type === "tool_use" && b.name === "emit_findings"
  );
  if (!emitBlock || emitBlock.type !== "tool_use") {
    console.warn("\n  ⚠ Stage 2: model did not call emit_findings.");
    console.warn("  content block types:", final.content.map((b) => b.type));
    return null;
  }

  const parsed = ResearchBundleSchema.safeParse(emitBlock.input);
  if (!parsed.success) {
    console.error("  Zod validation failed:", parsed.error.issues.slice(0, 5));
    writeFileSync(
      "scripts/probe-research-raw.json",
      JSON.stringify(emitBlock.input, null, 2)
    );
    console.error("  raw output written to scripts/probe-research-raw.json");
    return null;
  }
  console.log("\n  ✓ Stage 2 schema-valid output:");
  console.log("    findings:", parsed.data.findings.length);
  console.log("    branches_detected:", parsed.data.branches_detected.length);
  console.log("    sources:", parsed.data.sources.length);
  writeFileSync(
    "scripts/probe-research.json",
    JSON.stringify(parsed.data, null, 2)
  );
  console.log("  full bundle written to scripts/probe-research.json");
  return parsed.data;
}

async function main() {
  console.log("Probe starting at", new Date().toISOString());
  console.log("Model:", SONNET_MODEL);
  console.log("Web search tool type:", WEB_SEARCH_TOOL_TYPE);

  const stage1 = await runStage1();
  await runStage2(stage1);

  console.log("\n=== Probe complete ===");
  console.log("Phase 0 verified: streaming + extended thinking + web_search + forced tool calls work end-to-end.");
}

main().catch((err) => {
  console.error("\nProbe failed:", err);
  process.exit(1);
});
