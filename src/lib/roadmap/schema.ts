import { z } from "zod";

export const SourceSchema = z.object({
  id: z.string().min(1),
  url: z.string().url(),
  title: z.string().min(1),
  publisher: z.string().optional(),
  retrieved_at: z.string().min(1),
});

export const CompanyStageSchema = z.enum([
  "pre_seed",
  "seed",
  "series_a",
  "series_b",
  "series_c_plus",
  "public",
  "big_tech",
]);

export const CompBandSchema = z.object({
  role: z.string().min(1),
  location: z.string().optional(),
  company_stage: CompanyStageSchema.optional(),
  base_min_usd: z.number().nonnegative(),
  base_max_usd: z.number().nonnegative(),
  total_min_usd: z.number().nonnegative().optional(),
  total_max_usd: z.number().nonnegative().optional(),
  year: z.number().int().min(2000).max(2100),
  source_ids: z.array(z.string()).min(1, "comp_band must cite at least one source"),
  note: z.string().optional(),
});

export const ActionTypeSchema = z.enum([
  "project",
  "cert",
  "role_change",
  "network",
  "study",
  "artifact",
]);

export const ActionSchema = z.object({
  title: z.string().min(1),
  detail: z.string().optional(),
  type: ActionTypeSchema,
  est_effort_hours: z.number().nonnegative().optional(),
  source_ids: z.array(z.string()).optional(),
});

export const PitfallSchema = z.object({
  text: z.string().min(1),
  source_ids: z.array(z.string()),
});

export const MilestoneSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  timeframe: z.object({
    min_months: z.number().int().nonnegative(),
    max_months: z.number().int().nonnegative(),
  }),
  required_skills: z.array(z.string()),
  suggested_roles: z.array(z.string()),
  suggested_companies: z.array(z.string()).optional(),
  actions: z.array(ActionSchema),
  comp_band: CompBandSchema.optional(),
  pitfalls: z.array(PitfallSchema).optional(),
  source_ids: z.array(z.string()),
});

export const BranchSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  rationale: z.string().min(1),
  forks_after_milestone_id: z.string().min(1),
  rejoins_at_milestone_id: z.string().nullable(),
  milestones: z.array(MilestoneSchema).min(1),
});

export const SenioritySchema = z.enum([
  "ic_junior",
  "ic_mid",
  "ic_senior",
  "ic_staff_plus",
  "manager",
  "director",
  "vp",
  "c_level",
]);

export const CurrentStateSchema = z.object({
  title: z.string().nullable(),
  seniority: SenioritySchema.nullable(),
  years_experience: z.number().nullable(),
  domains: z.array(z.string()),
  demonstrated_skills: z.array(z.string()),
});

export const GoalQualitySchema = z.enum(["clear", "vague", "impossible"]);

export const NormalizedGoalSchema = z.object({
  raw: z.string(),
  normalized: z.string(),
  target_role: z.string(),
  target_context: z.string().optional(),
  quality: GoalQualitySchema,
});

export const FinalGoalSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  comp_band: CompBandSchema.optional(),
  source_ids: z.array(z.string()),
});

export const RoadmapSchema = z
  .object({
    version: z.literal("1.0"),
    current_state: CurrentStateSchema,
    goal: NormalizedGoalSchema,
    primary_path: z.array(MilestoneSchema).min(1),
    branches: z.array(BranchSchema),
    final_goal: FinalGoalSchema,
    sources: z.array(SourceSchema),
    generated_at: z.string(),
    model: z.string(),
  })
  .superRefine((roadmap, ctx) => {
    const ids = new Set(roadmap.sources.map((s) => s.id));
    const allCited = new Set<string>();
    for (const m of roadmap.primary_path) {
      m.source_ids.forEach((s) => allCited.add(s));
      m.comp_band?.source_ids.forEach((s) => allCited.add(s));
      m.pitfalls?.forEach((p) => p.source_ids.forEach((s) => allCited.add(s)));
      m.actions.forEach((a) => a.source_ids?.forEach((s) => allCited.add(s)));
    }
    for (const b of roadmap.branches) {
      for (const m of b.milestones) {
        m.source_ids.forEach((s) => allCited.add(s));
        m.comp_band?.source_ids.forEach((s) => allCited.add(s));
      }
    }
    roadmap.final_goal.source_ids.forEach((s) => allCited.add(s));
    roadmap.final_goal.comp_band?.source_ids.forEach((s) => allCited.add(s));

    for (const cited of allCited) {
      if (!ids.has(cited)) {
        ctx.addIssue({
          code: "custom",
          message: `source_id "${cited}" referenced but not in sources[]`,
        });
      }
    }
  });

export type RoadmapInput = z.infer<typeof RoadmapSchema>;

export const FindingSchema = z.object({
  claim: z.string().min(1),
  category: z.enum(["path", "skill", "timeframe", "comp", "pivot", "cert", "pitfall"]),
  source_ids: z.array(z.string()),
  confidence: z.enum(["high", "medium", "low"]),
});

export const BranchHintSchema = z.object({
  label: z.string().min(1),
  rationale: z.string().min(1),
  criterion: z.string().min(1),
});

export const ResearchBundleSchema = z.object({
  memo: z.string().min(1),
  findings: z.array(FindingSchema),
  branches_detected: z.array(BranchHintSchema),
  sources: z.array(SourceSchema),
});

export const ParseProfileOutputSchema = z.object({
  current_state: CurrentStateSchema,
  goal: NormalizedGoalSchema,
});
