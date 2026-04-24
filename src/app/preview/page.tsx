/**
 * Dev-only preview of the visualization against the fixture roadmap.
 * Lets us iterate on cards/spine/typography without needing the DB or API.
 * Visit:  http://localhost:3000/preview
 */
import Link from "next/link";
import { FIXTURE_ROADMAP } from "@/lib/roadmap/__fixtures__/roadmap.fixture";
import { RoadmapView } from "@/components/roadmap/RoadmapView";

export const dynamic = "force-static";

export default function PreviewPage() {
  return (
    <>
      <div className="bg-paper">
        <nav className="mx-auto max-w-3xl px-6 py-4 md:px-10 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone hover:text-ink"
          >
            ← Form
          </Link>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone-soft">
            Preview · fixture roadmap
          </p>
        </nav>
      </div>
      <RoadmapView roadmap={FIXTURE_ROADMAP} />
    </>
  );
}
