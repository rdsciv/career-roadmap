export function SkillChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-rule px-2.5 py-0.5 font-mono text-[11.5px] tracking-tight text-stone">
      {children}
    </span>
  );
}

export function SkillOverflow({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center font-mono text-[11.5px] text-stone-soft">
      +{count} more
    </span>
  );
}
