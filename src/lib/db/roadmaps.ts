import { getDb } from "./client";
import type {
  CurrentState,
  NormalizedGoal,
  ResearchBundle,
  Roadmap,
} from "@/lib/roadmap/types";

export type RoadmapStatus = "pending" | "research_done" | "complete" | "failed";

export type RoadmapRow = {
  slug: string;
  status: RoadmapStatus;
  content_hash: string;
  profile_text: string | null;
  goal_text: string | null;
  current_state: CurrentState | null;
  goal: NormalizedGoal | null;
  research_bundle: ResearchBundle | null;
  roadmap_json: Roadmap | null;
  model: string | null;
  error: string | null;
  created_at: string;
  updated_at: string;
};

export async function insertPending(args: {
  slug: string;
  contentHash: string;
  profileText: string;
  goalText: string;
}): Promise<void> {
  const sql = getDb();
  await sql`
    insert into roadmaps (slug, status, content_hash, profile_text, goal_text)
    values (${args.slug}, 'pending', ${args.contentHash}, ${args.profileText}, ${args.goalText})
  `;
}

export async function checkpointParse(args: {
  slug: string;
  current_state: CurrentState;
  goal: NormalizedGoal;
}): Promise<void> {
  const sql = getDb();
  await sql`
    update roadmaps
    set current_state = ${JSON.stringify(args.current_state)}::jsonb,
        goal = ${JSON.stringify(args.goal)}::jsonb,
        updated_at = now()
    where slug = ${args.slug}
  `;
}

export async function checkpointResearch(args: {
  slug: string;
  research_bundle: ResearchBundle;
}): Promise<void> {
  const sql = getDb();
  await sql`
    update roadmaps
    set research_bundle = ${JSON.stringify(args.research_bundle)}::jsonb,
        status = 'research_done',
        updated_at = now()
    where slug = ${args.slug}
  `;
}

export async function finalize(args: {
  slug: string;
  roadmap: Roadmap;
}): Promise<void> {
  const sql = getDb();
  await sql`
    update roadmaps
    set roadmap_json = ${JSON.stringify(args.roadmap)}::jsonb,
        status = 'complete',
        model = ${args.roadmap.model},
        updated_at = now()
    where slug = ${args.slug}
  `;
}

export async function markFailed(args: {
  slug: string;
  error: string;
}): Promise<void> {
  const sql = getDb();
  await sql`
    update roadmaps
    set status = 'failed', error = ${args.error}, updated_at = now()
    where slug = ${args.slug}
  `;
}

export async function getBySlug(slug: string): Promise<RoadmapRow | null> {
  const sql = getDb();
  const rows = (await sql`
    select * from roadmaps where slug = ${slug} limit 1
  `) as unknown as RoadmapRow[];
  return rows[0] ?? null;
}

export async function findRecentByContentHash(
  contentHash: string,
  withinDays = 7
): Promise<RoadmapRow | null> {
  const sql = getDb();
  const rows = (await sql`
    select * from roadmaps
    where content_hash = ${contentHash}
      and status = 'complete'
      and created_at > now() - (${withinDays}::int * interval '1 day')
    order by created_at desc
    limit 1
  `) as unknown as RoadmapRow[];
  return rows[0] ?? null;
}
