import { Boxes, CloudCog, Network, ShieldCheck } from 'lucide-react';

const capabilities = [
  { title: 'Sistemas Distribuidos', desc: 'Servicios desacoplados, colas de mensajes y consistencia eventual para sistemas que escalan.', Icon: Network },
  { title: 'Backend Engineering', desc: 'APIs REST y gRPC seguras, modelado de datos y arquitecturas limpias sobre Go, Java y Python.', Icon: Boxes },
  { title: 'Kubernetes & DevOps', desc: 'Contenedores, despliegues declarativos, IaC con Terraform y pipelines CI/CD reproducibles.', Icon: CloudCog },
  { title: 'Cloud Security', desc: 'IAM de minimo privilegio, secretos gestionados, hardening y enfoque DevSecOps en AWS y GCP.', Icon: ShieldCheck },
];

export function Specialization() {
  return (
    <section className="container py-12">
      <div className="mb-8 flex items-baseline gap-3">
        <h2 className="font-serif text-4xl">Especializacion</h2>
        <span className="font-mono text-xs text-[var(--faint)]">// distributed backend</span>
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
