import { z } from "zod";
import type Anthropic from "@anthropic-ai/sdk";
import {
  ParseProfileOutputSchema,
  ResearchBundleSchema,
  RoadmapSchema,
} from "@/lib/roadmap/schema";

function toToolInputSchema(zodSchema: z.ZodType): Anthropic.Tool.InputSchema {
  const json = z.toJSONSchema(zodSchema, { target: "draft-7" }) as Record<
    string,
    unknown
  >;
  // Anthropic rejects the $schema field. Strip it.
  delete json.$schema;
  return json as unknown as Anthropic.Tool.InputSchema;
}

export const EMIT_CURRENT_STATE_TOOL: Anthropic.Tool = {
  name: "emit_current_state",
  description:
    "Emit the structured current state and normalized goal parsed from the LinkedIn profile and the goal text.",
  input_schema: toToolInputSchema(ParseProfileOutputSchema),
};

export const EMIT_FINDINGS_TOOL: Anthropic.Tool = {
  name: "emit_findings",
  description:
    "Emit the structured research bundle: a markdown memo, a list of evidence-backed findings, any meaningful branch hints detected, and the deduplicated list of sources cited.",
  input_schema: toToolInputSchema(ResearchBundleSchema),
};

export const EMIT_ROADMAP_TOOL: Anthropic.Tool = {
  name: "emit_roadmap",
  description:
    "Emit the personalized career roadmap as structured JSON. Strictly follow the schema. Every comp_band must reference at least one source_id from the research bundle.",
  input_schema: toToolInputSchema(RoadmapSchema),
};
