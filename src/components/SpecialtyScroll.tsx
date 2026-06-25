import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { ui, type Lang } from '../data/i18n';

gsap.registerPlugin(ScrollTrigger);

const specialties = [
  {
    eyebrow: '01 / Backend Engineering',
    title: 'Backend Systems',
    desc: {
      en: 'REST APIs, modular components, authentication, authorization and relational data models for production-oriented web systems.',
      es: 'REST APIs, modular components, authentication, authorization y relational data models para production-oriented web systems.',
    },
  },
  {
    eyebrow: '02 / Distributed Systems',
    title: 'Distributed Systems',
    desc: {
      en: 'Microservices, asynchronous processing, concurrency, messaging, horizontal scaling and failure-aware service boundaries.',
      es: 'Microservices, asynchronous processing, concurrency, messaging, horizontal scaling y service boundaries conscientes de fallos.',
    },
  },
  {
    eyebrow: '03 / Cloud Infrastructure',
    title: 'Cloud Infrastructure',
    desc: {
      en: 'Kubernetes operations, Helm-based configuration, Terraform provisioning, CI/CD and environment consistency across cloud platforms.',
      es: 'Kubernetes operations, configuracion con Helm, Terraform provisioning, CI/CD y consistencia de environments en cloud platforms.',
    },
  },
  {
    eyebrow: '04 / Observability',
    title: 'Production Insight',
    desc: {
      en: 'Logs, metrics, resource consumption, deployment behavior and latency analysis with a systems-thinking approach.',
      es: 'Logs, metrics, resource consumption, deployment behavior y latency analysis con enfoque de systems thinking.',
    },
  },
];

export function SpecialtyScroll({ lang }: { lang: Lang }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-specialty]');

      cards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -42 : 42;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: direction,
            y: 34,
            rotate: index % 2 === 0 ? -1.4 : 1.4,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="container section-screen py-16">
      <div className="mb-10 grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-end">
        <div>
          <h2 className="font-serif text-5xl leading-tight md:text-7xl">{ui[lang].focusTitle}</h2>
        </div>
        <p className="max-w-2xl text-lg text-[var(--muted)]">
          {ui[lang].focusIntro}
        </p>
      </div>

      <div className="grid gap-4">
        {specialties.map(({ eyebrow, title, desc }) => (
          <article
            key={title}
            data-specialty
            className="relative grid gap-6 border-t py-7 md:grid-cols-[180px_1fr] md:items-start"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--faint)]">{eyebrow}</p>
            <div>
              <h3 className="font-serif text-3xl leading-tight md:text-4xl">{title}</h3>
              <p className="mt-4 max-w-2xl text-[var(--muted)]">{desc[lang]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
