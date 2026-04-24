---
layout: default
title: Career Roadmap Generator
description: Paste a LinkedIn profile + a career goal → get a research-backed, sourced, personalized career roadmap.
---

# Career Roadmap Generator

> Paste a LinkedIn profile + a career goal → get a research-backed, sourced, personalized career roadmap.

A working prototype. The pipeline is verified end-to-end; the visual design
is a work in progress and not the final aesthetic.

[View the source on GitHub →](https://github.com/rdsciv/career-roadmap)

---

## What it does

You paste your LinkedIn profile text and a stated career goal
(e.g. *"Become a Director of Engineering at a Series B fintech in 4 years"*).
The app runs a 3-stage Claude pipeline and returns a personalized roadmap
with milestones, branching alternative paths, timeframes, comp bands, and
cited sources.

![Landing page](./screenshots/01-form.png)

*The form. Paste a profile, state a goal, hit Generate.*

---

## The roadmap view

After generation, `/r/<slug>` renders an editorial, scroll-revealed roadmap
built around a vertical spine with milestones stacked down the left, and
branching "alternative paths" where Claude found a meaningful fork.

![Preview — top of the roadmap](./screenshots/02-preview-hero.png)

Each milestone card is collapsible; expanding one reveals concrete actions,
pitfalls, suggested roles, and the specific sources the claim is based on.
A terminal *goal* card at the bottom anchors the whole thing with the
researched compensation band.

![Preview — full page including goal card](./screenshots/03-preview-full.png)

---

## How it's built

**Stack**: Next.js 16 (App Router) · TypeScript · Tailwind v4 · shadcn/ui ·
Anthropic SDK · Neon Postgres · Framer Motion · `@react-pdf/renderer` (WIP).

**The pipeline** — three server-side stages, streamed to the client via SSE:

| Stage | Model | Tools | What it does |
|---|---|---|---|
| `parseProfile` | `claude-sonnet-4-6` | — | Normalizes the LinkedIn paste into structured `CurrentState` + `NormalizedGoal` JSON. Classifies the goal as clear / vague / impossible. |
| `research` | `claude-sonnet-4-6` + extended thinking | `web_search_20260209` | Gathers evidence on typical paths, skills gaps, comp bands, pivots, certs, and pitfalls. Every comp number must cite a URL. |
| `synthesize` | `claude-sonnet-4-6` | forced tool call `emit_roadmap` | Shapes the research into a strict `Roadmap` JSON that the viz consumes. |

Each stage streams progress events back to the browser. Postgres stores a
checkpoint after research so a Stage 3 failure is resumable without re-paying
for research.

**The visualization** is a bespoke SVG spine + Framer Motion reveal anims +
DOM cards — not React Flow. The roadmap is a long-form scrollable document,
not a graph editor, so the node/edge chrome of a graph library fights more
than it helps.

---

## Status

| Phase | Status |
|---|---|
| 0 · SDK probe verification | ✅ Verified live against Claude Sonnet 4.6 |
| 1 · Vertical slice (form → SSE pipeline → raw JSON view) | ✅ Builds, streams, persists |
| 2 · Visualization spike | ✅ Builds, renders fixture |
| 3 · Branches, scroll-reveal, source hover cards | ✅ In the preview |
| 4 · Streaming UX — partial states during generation | ⏳ Not started |
| 5 · PDF export via `@react-pdf/renderer` | ⏳ Not started |
| 6 · Mobile, polish, launch | ⏳ Not started |

**Honest known issues:**

- The editorial design isn't landing yet. The visual direction ("Stripe docs
  meets Linear") needs another pass — current output reads a bit like an
  academic paper.
- Observed cost is ~$0.60–$0.70 per roadmap (higher than the planned $0.38).
  Stage 2 wall clock is ~3 min, Stage 3 adds another ~4 min on bad runs.
- The fixture Claude produced only has 3 primary milestones for a 4-year
  plan; feels thin. Prompt needs to push for 5–7.

---

## Run locally

Requirements: Node 20+, pnpm, an `ANTHROPIC_API_KEY`, and a free
[Neon](https://neon.tech) Postgres connection string.

```bash
git clone https://github.com/rdsciv/career-roadmap.git
cd career-roadmap
pnpm install

cp .env.example .env.local
# Fill in ANTHROPIC_API_KEY and DATABASE_URL

pnpm migrate
pnpm dev
# → http://localhost:3000
```

No Postgres? Visit `/preview` instead of `/`. It renders a fixture roadmap
so you can see the visualization without any backing services.

[Full README + directory map on GitHub →](https://github.com/rdsciv/career-roadmap#readme)
