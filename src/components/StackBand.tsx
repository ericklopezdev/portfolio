import { TechIcon } from './TechIcon';

const stack = [
  'Kubernetes', 'Docker', 'Terraform', 'AWS', 'GCP', 'Linux',
  'Go', 'Python', 'Helm', 'Kafka', 'Redis', 'PostgreSQL',
  'Prometheus', 'Grafana', 'Nginx', 'Ansible',
];

export function StackBand() {
  const loop = [...stack, ...stack];

  return (
    <section className="container py-14">
      <div className="overflow-hidden border-y py-6" style={{ borderColor: 'var(--border)' }}>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--faint)]">Stack & tooling</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight">Tools que uso para construir</h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm text-[var(--muted)] md:block">
            Backend, cloud, observabilidad, infraestructura y mensajería en una banda viva.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent" />
          <div className="tool-marquee flex w-max gap-3 py-2">
            {loop.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex translate-y-0 transition duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <TechIcon name={item} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
