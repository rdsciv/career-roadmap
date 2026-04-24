import { notFound } from "next/navigation";
import Link from "next/link";
import { getBySlug } from "@/lib/db/roadmaps";
import { RoadmapView } from "@/components/roadmap/RoadmapView";

export const dynamic = "force-dynamic";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const row = await getBySlug(slug);
  if (!row) notFound();

  if (row.status === "complete" && row.roadmap_json) {
    return (
      <>
        <div className="bg-paper">
          <nav className="mx-auto max-w-3xl px-6 py-4 md:px-10">
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone hover:text-ink"
            >
              ← New roadmap
            </Link>
          </nav>
        </div>
        <RoadmapView roadmap={row.roadmap_json} />
      </>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-6">
        <Link href="/" className="text-sm text-stone hover:text-ink">
          ← New roadmap
        </Link>
      </div>
      <header className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone mb-2">
          Roadmap · {row.slug} · {row.status}
        </p>
        <h1 className="font-display text-3xl tracking-tight text-ink">
          {row.goal?.target_role
            ? `Path to ${row.goal.target_role}`
            : "Roadmap"}
        </h1>
      </header>

      {row.status === "failed" && (
        <div className="rounded border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-medium">Generation failed</p>
          <p className="mt-1">{row.error}</p>
        </div>
      )}

      {row.status === "research_done" && (
        <div className="space-y-4">
          <div className="rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            Research finished but synthesis didn&apos;t. (Resume flow ships in a
            later phase.)
          </div>
          {row.research_bundle && (
            <pre className="overflow-x-auto rounded bg-stone-50 p-4 text-xs leading-snug">
              {JSON.stringify(row.research_bundle, null, 2)}
            </pre>
          )}
        </div>
      )}

      {row.status === "pending" && (
        <div className="rounded border border-rule bg-paper-raised p-4 text-sm text-stone">
          Still generating. Refresh in a minute.
        </div>
      )}
    </main>
  );
}
