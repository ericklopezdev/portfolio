import { BrainCircuit } from 'lucide-react';
import { getTech } from '../data/tech';

export function TechIcon({ name }: { name: string }) {
  const tech = getTech(name);

  return (
    <span className="group relative inline-grid h-9 w-9 place-items-center rounded-lg border transition hover:-translate-y-0.5 hover:border-[var(--strong)] hover:bg-[var(--panel-2)]" style={{ borderColor: 'var(--border)', color: tech?.hexDark ?? tech?.hex ?? 'var(--muted)' }}>
      {tech ? (
        <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
          <path d={tech.path} fill="currentColor" />
        </svg>
      ) : (
        <BrainCircuit size={17} />
      )}
      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 scale-95 whitespace-nowrap rounded-md border px-2 py-1 font-mono text-[11px] opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100" style={{ borderColor: 'var(--border)', background: 'var(--panel)', color: 'var(--text)' }}>
        {tech?.label ?? name}
      </span>
    </span>
  );
}
