import { Boxes, CloudCog, Network, ShieldCheck } from 'lucide-react';

const capabilities = [
  { title: 'Backend Systems', desc: 'REST APIs, modular services, authentication, authorization and data flows designed for maintainability.', Icon: Network },
  { title: 'Distributed Architecture', desc: 'Microservices, asynchronous processing, event-driven communication and failure-aware system design.', Icon: Boxes },
  { title: 'Cloud Infrastructure', desc: 'Kubernetes, Terraform, containers, CI/CD and reproducible environments across AWS, Azure and GCP.', Icon: CloudCog },
  { title: 'Production Operations', desc: 'Observability, logs, metrics, resource analysis and deployment troubleshooting in real environments.', Icon: ShieldCheck },
];

export function Specialization() {
  return (
    <section className="container py-12">
      <div className="mb-8 flex items-baseline gap-3">
        <h2 className="font-serif text-4xl">Focus areas</h2>
        <span className="font-mono text-xs text-[var(--faint)]">// backend + cloud systems</span>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {capabilities.map(({ title, desc, Icon }) => (
          <article key={title} className="panel rounded-lg p-5 transition hover:-translate-y-1">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]">
              <Icon size={21} />
            </span>
            <h3 className="mt-5 font-serif text-xl leading-tight">{title}</h3>
            <p className="mt-3 text-sm text-[var(--muted)]">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
