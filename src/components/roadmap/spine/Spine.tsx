"use client";

/**
 * The vertical spine: a single SVG line behind the milestone cards, with a
 * scroll-driven "traveled" overlay. Branch curves attach as quadratic Béziers
 * toward sub-tracks rendered to the right.
 *
 * The spine is decorative — actual spine dots are rendered inside MilestoneCard
 * to stay aligned with each card's first content row.
 */
import { useEffect, useRef, useState } from "react";

export function Spine() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        // 0 when spine top hits the bottom of the viewport,
        // 1 when spine bottom hits the top.
        const total = rect.height + viewportH;
        const passed = Math.max(0, Math.min(total, viewportH - rect.top));
        setProgress(passed / total);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 h-full w-[2px]"
    >
      <div className="absolute inset-0 bg-rule" />
      <div
        className="absolute left-0 top-0 w-full bg-marker origin-top"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  );
}
