create table if not exists roadmaps (
  slug              text primary key,
  status            text not null check (status in ('pending','research_done','complete','failed')),
  content_hash      text not null,
  profile_text      text,
  goal_text         text,
  current_state     jsonb,
  goal              jsonb,
  research_bundle   jsonb,
  roadmap_json      jsonb,
  model             text,
  error             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists idx_roadmaps_content_hash on roadmaps (content_hash);
create index if not exists idx_roadmaps_status on roadmaps (status);
create index if not exists idx_roadmaps_created_at on roadmaps (created_at desc);
