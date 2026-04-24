import Anthropic from "@anthropic-ai/sdk";

let cached: Anthropic | null = null;

export function getAnthropic(): Anthropic {
  if (cached) return cached;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }
  // Long timeout for pipeline calls that may run 1–3 minutes with web search.
  cached = new Anthropic({ apiKey, timeout: 300_000, maxRetries: 0 });
  return cached;
}

export const SONNET_MODEL = "claude-sonnet-4-6" as const;
export const OPUS_MODEL = "claude-opus-4-7" as const;

export const WEB_SEARCH_TOOL_TYPE = "web_search_20260209" as const;
