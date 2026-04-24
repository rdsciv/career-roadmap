import type { CurrentState, NormalizedGoal, ResearchBundle, Roadmap } from "@/lib/roadmap/types";

export type StageName = "parse" | "research" | "synthesis";

export type StreamEvent =
  | { type: "run_started"; runId: string; slug: string; stages: StageName[] }
  | { type: "stage_started"; stage: StageName; startedAt: string }
  | {
      type: "stage_progress";
      stage: StageName;
      kind: "thinking" | "tool_use" | "tool_result" | "text";
      summary: string;
      detail?: string;
    }
  | {
      type: "stage_completed";
      stage: StageName;
      durationMs: number;
      output?: StageOutput;
    }
  | { type: "roadmap_ready"; slug: string; url: string }
  | {
      type: "error";
      stage?: StageName;
      code: string;
      message: string;
      recoverable: boolean;
      partial?: boolean;
    }
  | { type: "done" };

export type StageOutput =
  | { stage: "parse"; current_state: CurrentState; goal: NormalizedGoal }
  | { stage: "research"; findings: number; branches: number; sources: number }
  | { stage: "synthesis"; roadmap: Roadmap };

export type StreamEmit = (ev: StreamEvent) => void;

export function makeSseWriter(): {
  stream: ReadableStream<Uint8Array>;
  emit: StreamEmit;
  close: () => void;
} {
  const encoder = new TextEncoder();
  let controller: ReadableStreamDefaultController<Uint8Array>;
  let closed = false;

  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      controller = c;
    },
    cancel() {
      closed = true;
    },
  });

  const emit: StreamEmit = (ev) => {
    if (closed) return;
    const data = `event: ${ev.type}\ndata: ${JSON.stringify(ev)}\n\n`;
    try {
      controller.enqueue(encoder.encode(data));
    } catch {
      closed = true;
    }
  };

  const close = () => {
    if (closed) return;
    closed = true;
    try {
      controller.close();
    } catch {
      // already closed
    }
  };

  return { stream, emit, close };
}

export function researchBundleSummary(rb: ResearchBundle): {
  findings: number;
  branches: number;
  sources: number;
} {
  return {
    findings: rb.findings.length,
    branches: rb.branches_detected.length,
    sources: rb.sources.length,
  };
}
