import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Landmark, Network, ShieldCheck, TerminalSquare } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { TechIcon } from './TechIcon';

gsap.registerPlugin(ScrollTrigger);

const specialties = [
  {
    eyebrow: '01 / Backend',
    title: 'APIs y servicios que sostienen producto',
    desc: 'Diseño servicios claros, seguros y mantenibles para productos reales: autenticacion, reglas de negocio, integraciones y persistencia.',
    stack: ['Go', 'Java', 'Python', 'Spring Boot', 'PostgreSQL', 'Redis'],
    Icon: TerminalSquare,
  },
  {
    eyebrow: '02 / Sistemas distribuidos',
    title: 'Arquitecturas desacopladas y observables',
    desc: 'Trabajo con colas, eventos, contenedores y telemetria para construir sistemas que no dependan de un unico punto fragil.',
    stack: ['Kafka', 'RabbitMQ', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana'],
    Icon: Network,
  },
  {
    eyebrow: '03 / Fintech',
    title: 'Flujos criticos con foco en confianza',
    desc: 'Me interesa el backend para dominios transaccionales: trazabilidad, validacion, auditoria, resiliencia y control de acceso.',
    stack: ['PostgreSQL', 'Java', 'Spring Boot', 'AWS', 'Vault', 'CI/CD'],
    Icon: Landmark,
  },
  {
    eyebrow: '04 / Cloud security',
    title: 'Infraestructura con criterio DevSecOps',
    desc: 'Construyo pensando en minimo privilegio, secretos gestionados, despliegues reproducibles y hardening desde la base.',
    stack: ['AWS', 'GCP', 'Terraform', 'Linux', 'Cloudflare', 'GitHub Actions'],
    Icon: ShieldCheck,
  },
];

export function SpecialtyScroll() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-specialty]');

      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: index === 0 ? 1 : 0.28, y: 28, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              end: 'top 38%',
              scrub: 0.6,
            },
          },
        );

        gsap.to(card.querySelector('[data-line]'), {
          scaleX: 1,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 76%',
            end: 'bottom 54%',
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="container section-screen py-16">
      <div className="mb-10 grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Especialidades</p>
          <h2 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">Capas de trabajo</h2>
        </div>
        <p className="max-w-2xl text-lg text-[var(--muted)]">
          Backend, seguridad e infraestructura presentados como un sistema: cada capa tiene su propio conjunto de decisiones.
        </p>
      </div>

      <div className="grid gap-4">
        {specialties.map(({ eyebrow, title, desc, stack, Icon }) => (
          <article
            key={title}
            data-specialty
            className="relative grid gap-6 border-t py-7 md:grid-cols-[180px_1fr_260px] md:items-start"
            style={{ borderColor: 'var(--border)' }}
          >
            <span data-line className="absolute left-0 top-0 h-px w-full scale-x-0 bg-[var(--accent)]" />
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg border text-[var(--accent)]" style={{ borderColor: 'var(--border)' }}>
                <Icon size={21} />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--faint)]">{eyebrow}</p>
            </div>
            <div>
              <h3 className="font-serif text-3xl leading-tight md:text-4xl">{title}</h3>
              <p className="mt-4 max-w-2xl text-[var(--muted)]">{desc}</p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {stack.map((tech) => <TechIcon key={tech} name={tech} />)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
