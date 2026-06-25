import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { CertificationsSection } from '../components/CertificationsSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { FeaturedProjectsCarousel } from '../components/FeaturedProjectsCarousel';
import { SpecialtyScroll } from '../components/SpecialtyScroll';
import { StackBand } from '../components/StackBand';
import { site } from '../data/site';
import type { Certification, Experience, Project } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

const stack = ['Backend', 'Fintech', 'Sistemas distribuidos', 'Cloud Security', 'DevSecOps'];

export function HomePage({ projects, experiences, certifications }: { projects: Project[]; experiences: Experience[]; certifications: Certification[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-name-char]', {
        opacity: 0,
        yPercent: 55,
        rotateX: -72,
        transformOrigin: '50% 100%',
        stagger: 0.028,
        duration: 0.72,
        ease: 'power3.out',
      });
      gsap.from('[data-hero]', { opacity: 0, y: 22, stagger: 0.08, duration: 0.68, delay: 0.18, ease: 'power3.out' });
      gsap.from('[data-reveal]', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-work]', start: 'top 78%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section id="inicio" className="container section-screen relative overflow-hidden pb-14 pt-8">
        <div className="pointer-events-none absolute right-[-12%] top-[8%] hidden h-[68vh] w-[58vw] opacity-55 lg:block" aria-hidden="true">
          <img src="/images/hero-background.png" alt="" className="h-full w-full object-contain" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <p data-hero className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">Backend / Distributed Systems / Cloud Security</p>
          <h1 className="raster-text font-serif text-[clamp(3.6rem,10vw,8.8rem)] leading-[0.84] tracking-normal" aria-label={site.fullName}>
              {Array.from(site.fullName).map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  data-name-char
                  aria-hidden="true"
                  className="inline-block will-change-transform"
                >
                  {char === ' ' ? '\u00a0' : char}
                </span>
              ))}
            </h1>
          <p data-hero className="mt-8 max-w-3xl text-xl leading-relaxed text-[var(--muted)] md:text-2xl">
            Backend engineer enfocado en sistemas distribuidos, fintech y cloud security. Construyo servicios limpios, observables y seguros para productos que necesitan confianza.
          </p>
          <div data-hero className="mt-8 flex flex-wrap gap-2">
            {stack.map((item) => (
              <span key={item} className="rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]" style={{ borderColor: 'var(--border)' }}>
                {item}
              </span>
            ))}
          </div>
          <div data-hero className="mt-10 flex flex-wrap items-center gap-3">
            <a href="/projects" className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-3 font-medium text-white transition hover:-translate-y-0.5">
              Ver proyectos <ArrowRight size={18} />
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-lg border px-4 py-3 font-medium text-[var(--text)] transition hover:bg-[var(--panel-2)]" style={{ borderColor: 'var(--border)' }}>
              <Mail size={18} /> Contacto
            </a>
            <a href={site.socials.github} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-lg border text-[var(--muted)] hover:text-[var(--accent)]" style={{ borderColor: 'var(--border)' }} title="GitHub">
              <Github size={18} />
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-lg border text-[var(--muted)] hover:text-[var(--accent)]" style={{ borderColor: 'var(--border)' }} title="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </section>

      <div id="especialidades">
        <SpecialtyScroll />
      </div>

      <ExperienceSection experiences={experiences} />

      <div id="proyectos">
        <FeaturedProjectsCarousel
          projects={projects}
          limit={projects.length}
          pageMode
          showViewAll={false}
          eyebrow="Trabajo"
          title="Proyectos"
          intro="Explora los proyectos como un carrusel de pantalla completa: backend, automatizacion, cloud y productos fullstack."
        />
      </div>

      <CertificationsSection certifications={certifications} compact />

      <StackBand />
    </div>
  );
}
