"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { StreamEvent } from "@/lib/pipeline/stream";

const STAGE_LABELS: Record<string, string> = {
  parse: "Reading your profile",
  research: "Researching your path",
  synthesis: "Writing your roadmap",
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "streaming"; stage: string; progress: string }
  | { kind: "error"; message: string }
  | { kind: "done"; slug: string };

export function GenerateForm() {
  const router = useRouter();
  const profileRef = useRef<HTMLTextAreaElement>(null);
  const goalRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const profileText = profileRef.current?.value ?? "";
    const goalText = goalRef.current?.value ?? "";

    setStatus({ kind: "submitting" });

    let res: Response;
    try {
      res = await fetch("/api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ profileText, goalText }),
      });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Network error" });
      return;
    }

    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("text/event-stream")) {
      // either cache hit (json) or error (json)
      const data = (await res.json()) as
        | { cached: true; slug: string }
        | { error: { code: string; message: string } };
      if ("cached" in data && data.cached) {
        router.push(`/r/${data.slug}`);
        return;
      }
      if ("error" in data) {
        setStatus({ kind: "error", message: data.error.message });
        return;
      }
      setStatus({ kind: "error", message: "Unexpected response" });
      return;
    }

    if (!res.body) {
      setStatus({ kind: "error", message: "Empty stream" });
      return;
    }

    setStatus({ kind: "streaming", stage: "parse", progress: "Starting…" });

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += value;
      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";
      for (const block of events) {
        const lines = block.split("\n");
        let data = "";
        for (const line of lines) {
          if (line.startsWith("data: ")) data += line.slice(6);
        }
        if (!data) continue;
        try {
          const ev = JSON.parse(data) as StreamEvent;
          handleEvent(ev);
        } catch {
          // malformed event; skip
        }
      }
    }
  }

  function handleEvent(ev: StreamEvent) {
    switch (ev.type) {
      case "stage_started":
        setStatus({
          kind: "streaming",
          stage: ev.stage,
          progress: STAGE_LABELS[ev.stage] ?? ev.stage,
        });
        break;
      case "stage_progress":
        setStatus((prev) =>
          prev.kind === "streaming"
            ? { ...prev, progress: ev.summary }
            : { kind: "streaming", stage: ev.stage, progress: ev.summary }
        );
        break;
      case "roadmap_ready":
        setStatus({ kind: "done", slug: ev.slug });
        router.push(ev.url);
        break;
      case "error":
        setStatus({ kind: "error", message: ev.message });
        break;
      default:
        break;
    }
  }

  const disabled = status.kind === "submitting" || status.kind === "streaming";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="profile" className="text-sm font-medium">
          Paste your LinkedIn profile (about + experience)
        </label>
        <textarea
          id="profile"
          name="profile"
          ref={profileRef}
          rows={12}
          required
          minLength={200}
          maxLength={12000}
          placeholder={"e.g.\nSenior Software Engineer at Stripe\nSan Francisco · 8 years experience\n\nExperience\n- Stripe — Senior Software Engineer (2022–Present)\n  ..."}
          className="block w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-mono shadow-sm placeholder:text-stone-400 focus:border-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-700 disabled:opacity-60"
          disabled={disabled}
        />
        <p className="text-xs text-stone-500">
          Stored with your roadmap. 200–12,000 characters.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="goal" className="text-sm font-medium">
          What's your career goal?
        </label>
        <textarea
          id="goal"
          name="goal"
          ref={goalRef}
          rows={3}
          required
          minLength={10}
          maxLength={500}
          placeholder='e.g. "Become Director of Engineering at a Series B fintech in 4 years"'
          className="block w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-stone-400 focus:border-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-700 disabled:opacity-60"
          disabled={disabled}
        />
        <p className="text-xs text-stone-500">Be specific — name the role and the context.</p>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={disabled} size="lg">
          {status.kind === "submitting" || status.kind === "streaming"
            ? "Generating…"
            : "Generate roadmap"}
        </Button>
        {status.kind === "streaming" && (
          <div className="text-sm text-stone-600">
            <span className="font-medium">{STAGE_LABELS[status.stage] ?? status.stage}</span>
            <span className="mx-2 text-stone-300">·</span>
            <span>{status.progress}</span>
          </div>
        )}
        {status.kind === "error" && (
          <div className="text-sm text-red-700">{status.message}</div>
        )}
        {status.kind === "done" && (
          <div className="text-sm text-stone-600">
            Done — opening <code className="font-mono">/r/{status.slug}</code>…
          </div>
        )}
      </div>
    </form>
  );
}
