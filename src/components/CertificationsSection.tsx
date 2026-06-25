import { ExternalLink } from 'lucide-react';
import type { Certification } from '../lib/content';

const issuerColor: Record<string, string> = {
  AWS: '#ff9900',
  Cisco: '#00a3d7',
  'Red Hat': '#ee0000',
};

interface CertificationsSectionProps {
  certifications: Certification[];
  compact?: boolean;
}

export function CertificationsSection({ certifications, compact = false }: CertificationsSectionProps) {
  const visible = compact ? certifications.slice(0, 6) : certifications;

  return (
    <section id="certificaciones" className={`container ${compact ? 'section-screen py-16' : 'py-8'}`}>
      <div className="mb-10 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Credenciales</p>
          <h2 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">Certificaciones</h2>
        </div>
        <p className="max-w-2xl text-lg text-[var(--muted)]">
          Validaciones en cloud, redes y sistemas Linux. Las muestro como parte del sistema, no como badges decorativos.
        </p>
      </div>

      <div className="grid gap-x-8 border-t md:grid-cols-2" style={{ borderColor: 'var(--border)' }}>
        {visible.map((cert) => (
          <a
            key={cert.slug}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-4 border-b py-5 transition hover:bg-[color-mix(in_srgb,var(--panel)_46%,transparent)] md:grid-cols-[76px_1fr_auto] md:items-center"
            style={{ borderColor: 'var(--border)' }}
          >
            <span className="flex items-center gap-3 md:block">
              <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-lg border bg-[var(--panel)]" style={{ borderColor: 'var(--border)' }}>
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} className="h-full w-full object-contain p-1.5" loading="lazy" />
                ) : (
                  <ExternalLink size={22} className="text-[var(--muted)]" />
                )}
              </span>
              <span className="font-mono text-xs text-[var(--faint)] md:hidden">{cert.date}</span>
            </span>

            <span className="min-w-0">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em]" style={{ color: issuerColor[cert.issuer] ?? 'var(--accent)' }}>
                {cert.issuer}
              </span>
              <span className="mt-2 block font-serif text-2xl leading-tight text-[var(--text)] group-hover:text-[var(--accent)]">
                {cert.title}
              </span>
            </span>

            <span className="hidden items-center gap-5 md:flex">
              <span className="font-mono text-xs text-[var(--faint)]">{cert.date}</span>
              <ExternalLink size={17} className="text-[var(--muted)] group-hover:text-[var(--accent)]" />
            </span>
          </a>
        ))}
      </div>

      {compact && certifications.length > visible.length && (
        <a href="/certifications" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
          Ver todas <ExternalLink size={15} />
        </a>
      )}
    </section>
  );
}
