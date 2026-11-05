export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted">
      <span className="text-accent">({index})</span>
      <span className="h-px w-8 bg-current opacity-40" />
      {children}
    </p>
  );
}
