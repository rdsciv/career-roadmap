import { getAnthropic, SONNET_MODEL, WEB_SEARCH_TOOL_TYPE } from "@/lib/anthropic/client";
import {
  EMIT_CURRENT_STATE_TOOL,
  EMIT_FINDINGS_TOOL,
  EMIT_ROADMAP_TOOL,
} from "@/lib/pipeline/tools";
import {
  PARSE_SYSTEM,
  parseUserPrompt,
  RESEARCH_SYSTEM,
  researchUserPrompt,
  SYNTHESIS_SYSTEM,
  synthesisUserPrompt,
} from "@/lib/pipeline/prompts";
import {
  ParseProfileOutputSchema,
  ResearchBundleSchema,
  RoadmapSchema,
} from "@/lib/roadmap/schema";
import type {
  CurrentState,
  NormalizedGoal,
  ResearchBundle,
  Roadmap,
} from "@/lib/roadmap/types";
import type { StreamEmit } from "@/lib/pipeline/stream";

export class StageError extends Error {
  constructor(
    public stage: "parse" | "research" | "synthesis",
    public code: string,
    message: string,
    public recoverable = false
  ) {
    super(message);
  }
}

export async function parseProfile(
  profileText: string,
  goalText: string,
  emit: StreamEmit,
  signal?: AbortSignal
): Promise<{ current_state: CurrentState; goal: NormalizedGoal }> {
  const client = getAnthropic();
  const started = new Date();
  emit({ type: "stage_started", stage: "parse", startedAt: started.toISOString() });

  const stream = client.messages.stream(
    {
      model: SONNET_MODEL,
      max_tokens: 1500,
      system: PARSE_SYSTEM,
      messages: [{ role: "user", content: parseUserPrompt(profileText, goalText) }],
      tools: [EMIT_CURRENT_STATE_TOOL],
      tool_choice: { type: "tool", name: "emit_current_state" },
    },
    { signal }
  );

  for await (const _ev of stream) {
    // Stage 1 is fast; emit a single tool_use heartbeat
    if (_ev.type === "content_block_start" && _ev.content_block.type === "tool_use") {
      emit({
        type: "stage_progress",
        stage: "parse",
        kind: "tool_use",
        summary: "Parsing profile…",
      });
    }
  }

  const final = await stream.finalMessage();
  const toolUse = final.content.find((b) => b.type === "tool_use");
  if (!toolUse || toolUse.type !== "tool_use") {
    throw new StageError("parse", "NO_TOOL_USE", "Stage 1 returned no tool_use block");
  }
  const parsed = ParseProfileOutputSchema.safeParse(toolUse.input);
  if (!parsed.success) {
    throw new StageError(
      "parse",
      "SCHEMA_INVALID",
      `Stage 1 output failed schema: ${parsed.error.issues.slice(0, 3).map((i) => i.message).join("; ")}`
    );
  }

  if (parsed.data.goal.quality === "vague") {
    throw new StageError(
      "parse",
      "VAGUE_GOAL",
      "Your goal is too vague to generate a useful roadmap. Try something like: “Become a senior PM at a Series B fintech in 3 years.”",
      false
    );
  }
  if (parsed.data.goal.quality === "impossible") {
    throw new StageError(
      "parse",
      "IMPOSSIBLE_GOAL",
      "That goal looks unreachable in a realistic timeframe. Try a closer-term milestone.",
      false
    );
  }

  emit({
    type: "stage_completed",
    stage: "parse",
    durationMs: Date.now() - started.getTime(),
    output: {
      stage: "parse",
      current_state: parsed.data.current_state,
      goal: parsed.data.goal,
    },
  });

  return parsed.data;
}

export async function research(
  current: CurrentState,
  goal: NormalizedGoal,
  emit: StreamEmit,
  signal?: AbortSignal
): Promise<ResearchBundle> {
  const client = getAnthropic();
  const started = new Date();
  emit({ type: "stage_started", stage: "research", startedAt: started.toISOString() });

  const stream = client.messages.stream(
    {
      model: SONNET_MODEL,
      max_tokens: 12000,
      thinking: { type: "enabled", budget_tokens: 6000 },
      system: RESEARCH_SYSTEM,
      messages: [{ role: "user", content: researchUserPrompt(current, goal) }],
      tools: [
        { type: WEB_SEARCH_TOOL_TYPE, name: "web_search", max_uses: 6 },
        EMIT_FINDINGS_TOOL,
      ],
    },
    { signal }
  );

  let thinkingEmitted = false;
  let lastQuery = "";

  for await (const ev of stream) {
    if (ev.type === "content_block_start") {
      const cb = ev.content_block;
      if (cb.type === "thinking" && !thinkingEmitted) {
        thinkingEmitted = true;
        emit({ type: "stage_progress", stage: "research", kind: "thinking", summary: "Thinking about your path…" });
      } else if (cb.type === "server_tool_use" && cb.name === "web_search") {
        // query not yet in input; emit on input_json finalize via inputJson handler
      } else if (cb.type === "web_search_tool_result") {
        emit({
          type: "stage_progress",
          stage: "research",
          kind: "tool_result",
          summary: lastQuery ? `Read results for “${lastQuery}”` : "Read search results",
        });
      }
    }
  }

  // After stream done, harvest queries from final message
  const final = await stream.finalMessage();
  for (const b of final.content) {
    if (b.type === "server_tool_use" && b.name === "web_search") {
      const q = (b.input as { query?: string }).query;
      if (q && q !== lastQuery) {
        lastQuery = q;
        emit({
          type: "stage_progress",
          stage: "research",
          kind: "tool_use",
          summary: `Searched: ${q}`,
        });
      }
    }
  }

  const emitBlock = final.content.find(
    (b) => b.type === "tool_use" && b.name === "emit_findings"
  );
  if (!emitBlock || emitBlock.type !== "tool_use") {
    throw new StageError(
      "research",
      "NO_EMIT",
      "Research completed without emitting findings. Try again."
    );
  }

  const parsed = ResearchBundleSchema.safeParse(emitBlock.input);
  if (!parsed.success) {
    throw new StageError(
      "research",
      "SCHEMA_INVALID",
      `Research output failed schema: ${parsed.error.issues.slice(0, 3).map((i) => i.message).join("; ")}`
    );
  }

  emit({
    type: "stage_completed",
    stage: "research",
    durationMs: Date.now() - started.getTime(),
    output: {
      stage: "research",
      findings: parsed.data.findings.length,
      branches: parsed.data.branches_detected.length,
      sources: parsed.data.sources.length,
    },
  });

  return parsed.data;
}

export async function synthesize(
  current: CurrentState,
  goal: NormalizedGoal,
  bundle: ResearchBundle,
  emit: StreamEmit,
  signal?: AbortSignal
): Promise<Roadmap> {
  const client = getAnthropic();
  const started = new Date();
  emit({ type: "stage_started", stage: "synthesis", startedAt: started.toISOString() });

  // Pre-build the source map from the bundle so we can backfill sources[] if the
  // model omits it (which happens often — synthesis only needs to emit source_ids).
  const bundleSources = new Map(bundle.sources.map((s) => [s.id, s]));

  const collectCitedIds = (toolInput: Record<string, unknown>): Set<string> => {
    const cited = new Set<string>();
    const walk = (node: unknown) => {
      if (Array.isArray(node)) {
        node.forEach(walk);
      } else if (node && typeof node === "object") {
        for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
          if (k === "source_ids" && Array.isArray(v)) {
            v.forEach((id) => typeof id === "string" && cited.add(id));
          } else {
            walk(v);
          }
        }
      }
    };
    walk(toolInput);
    return cited;
  };

  const runOnce = async (extraUserNote?: string): Promise<Roadmap> => {
    const userContent =
      synthesisUserPrompt(current, goal, bundle) +
      (extraUserNote ? `\n\nIMPORTANT — previous attempt failed validation with:\n${extraUserNote}\nFix it in this attempt.` : "");

    const stream = client.messages.stream(
      {
        model: SONNET_MODEL,
        max_tokens: 8000,
        system: SYNTHESIS_SYSTEM,
        messages: [{ role: "user", content: userContent }],
        tools: [EMIT_ROADMAP_TOOL],
        tool_choice: { type: "tool", name: "emit_roadmap" },
      },
      { signal }
    );

    for await (const ev of stream) {
      if (ev.type === "content_block_start" && ev.content_block.type === "tool_use") {
        emit({
          type: "stage_progress",
          stage: "synthesis",
          kind: "tool_use",
          summary: "Writing your roadmap…",
        });
      }
    }

    const final = await stream.finalMessage();
    const toolUse = final.content.find((b) => b.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      throw new StageError("synthesis", "NO_TOOL_USE", "Synthesis returned no tool_use block");
    }
    const toolInput = toolUse.input as Record<string, unknown>;
    // Defensive backfill: model often omits the master sources[] array because
    // synthesis only needs to cite source_ids. Reconstruct it from the bundle
    // by following every source_id referenced anywhere in the tool input.
    if (
      !Array.isArray(toolInput.sources) ||
      (toolInput.sources as unknown[]).length === 0
    ) {
      const cited = collectCitedIds(toolInput);
      toolInput.sources = Array.from(cited)
        .map((id) => bundleSources.get(id))
        .filter((s): s is NonNullable<typeof s> => s !== undefined);
    }
    if (!toolInput.version) toolInput.version = "1.0";
    if (!toolInput.branches) toolInput.branches = [];
    if (!toolInput.generated_at) toolInput.generated_at = new Date().toISOString();
    if (!toolInput.model) toolInput.model = SONNET_MODEL;
    const parsed = RoadmapSchema.safeParse(toolInput);
    if (!parsed.success) {
      throw new StageError(
        "synthesis",
        "SCHEMA_INVALID",
        parsed.error.issues.slice(0, 5).map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")
      );
    }
    return parsed.data as Roadmap;
  };

  try {
    const roadmap = await runOnce();
    emit({
      type: "stage_completed",
      stage: "synthesis",
      durationMs: Date.now() - started.getTime(),
      output: { stage: "synthesis", roadmap },
    });
    return roadmap;
  } catch (err) {
    if (err instanceof StageError && err.code === "SCHEMA_INVALID") {
      // One retry with the validation error fed back
      const roadmap = await runOnce(err.message);
      emit({
        type: "stage_completed",
        stage: "synthesis",
        durationMs: Date.now() - started.getTime(),
        output: { stage: "synthesis", roadmap },
      });
      return roadmap;
    }
    throw err;
  }
}
