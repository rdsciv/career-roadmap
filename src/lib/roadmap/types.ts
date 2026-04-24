export type Source = {
  id: string;
  url: string;
  title: string;
  publisher?: string;
  retrieved_at: string;
};

export type CompanyStage =
  | "pre_seed"
  | "seed"
  | "series_a"
  | "series_b"
  | "series_c_plus"
  | "public"
  | "big_tech";

export type CompBand = {
  role: string;
  location?: string;
  company_stage?: CompanyStage;
  base_min_usd: number;
  base_max_usd: number;
  total_min_usd?: number;
  total_max_usd?: number;
  year: number;
  source_ids: string[];
  note?: string;
};

export type ActionType =
  | "project"
  | "cert"
  | "role_change"
  | "network"
  | "study"
  | "artifact";

export type Action = {
  title: string;
  detail?: string;
  type: ActionType;
  est_effort_hours?: number;
  source_ids?: string[];
};

export type Pitfall = {
  text: string;
  source_ids: string[];
};

export type Milestone = {
  id: string;
  title: string;
  summary: string;
  timeframe: { min_months: number; max_months: number };
  required_skills: string[];
  suggested_roles: string[];
  suggested_companies?: string[];
  actions: Action[];
  comp_band?: CompBand;
  pitfalls?: Pitfall[];
  source_ids: string[];
};

export type Branch = {
  id: string;
  label: string;
  rationale: string;
  forks_after_milestone_id: string;
  rejoins_at_milestone_id: string | null;
  milestones: Milestone[];
};

export type Seniority =
  | "ic_junior"
  | "ic_mid"
  | "ic_senior"
  | "ic_staff_plus"
  | "manager"
  | "director"
  | "vp"
  | "c_level";

export type CurrentState = {
  title: string | null;
  seniority: Seniority | null;
  years_experience: number | null;
  domains: string[];
  demonstrated_skills: string[];
};

export type GoalQuality = "clear" | "vague" | "impossible";

export type NormalizedGoal = {
  raw: string;
  normalized: string;
  target_role: string;
  target_context?: string;
  quality: GoalQuality;
};

export type FinalGoal = {
  title: string;
  summary: string;
  comp_band?: CompBand;
  source_ids: string[];
};

export type Roadmap = {
  version: "1.0";
  current_state: CurrentState;
  goal: NormalizedGoal;
  primary_path: Milestone[];
  branches: Branch[];
  final_goal: FinalGoal;
  sources: Source[];
  generated_at: string;
  model: string;
};

export type FindingCategory =
  | "path"
  | "skill"
  | "timeframe"
  | "comp"
  | "pivot"
  | "cert"
  | "pitfall";

export type Finding = {
  claim: string;
  category: FindingCategory;
  source_ids: string[];
  confidence: "high" | "medium" | "low";
};

export type BranchHint = {
  label: string;
  rationale: string;
  criterion: string;
};

export type ResearchBundle = {
  memo: string;
  findings: Finding[];
  branches_detected: BranchHint[];
  sources: Source[];
};
