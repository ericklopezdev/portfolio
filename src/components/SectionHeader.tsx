export function SectionHeader({ eyebrow, title, intro, count }: { eyebrow: string; title: string; intro?: string; count?: string }) {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--faint)]">{eyebrow}</p>
      <div className="mt-3 flex items-baseline gap-3">
        <h1 className="font-serif text-4xl leading-tight md:text-6xl">{title}</h1>
        {count && <span className="font-mono text-sm text-[var(--faint)]">{count}</span>}
      </div>
      {intro && <p className="mt-5 text-lg text-[var(--muted)]">{intro}</p>}
    </header>
  );
}
