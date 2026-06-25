import { BrainCircuit } from 'lucide-react';
import { getTech } from '../data/tech';

export function TechIcon({ name, size = 'md', tone = 'brand', framed = true }: { name: string; size?: 'md' | 'hero' | 'lg'; tone?: 'brand' | 'mono'; framed?: boolean }) {
  const tech = getTech(name);
  const isLarge = size === 'lg';
  const isHero = size === 'hero';
  const boxSize = isLarge ? 'h-14 w-14' : isHero ? 'h-11 w-11' : 'h-9 w-9';
  const iconSize = isLarge ? 26 : isHero ? 22 : 17;
  const color = tone === 'mono' ? 'var(--muted)' : tech?.hexDark ?? tech?.hex ?? 'var(--muted)';

  return (
    <span
      className={`group relative inline-grid place-items-center transition duration-300 hover:-translate-y-1 hover:scale-110 ${framed ? 'rounded-lg border hover:border-[var(--strong)] hover:bg-[var(--panel-2)]' : ''} ${boxSize}`}
      style={{ borderColor: framed ? 'var(--border)' : 'transparent', color }}
    >
      {tech ? (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" aria-hidden="true">
          <path d={tech.path} fill="currentColor" />
        </svg>
      ) : (
        <BrainCircuit size={iconSize} />
      )}
      {framed && (
        <span
          className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 scale-95 whitespace-nowrap rounded-md border px-2 py-1 font-mono text-[11px] opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100"
          style={{ borderColor: 'var(--border)', background: 'var(--panel)', color: 'var(--text)' }}
        >
          {tech?.label ?? name}
        </span>
      )}
    </span>
  );
}
