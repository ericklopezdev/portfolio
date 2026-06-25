import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CertificationsSection } from '../components/CertificationsSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { FeaturedProjectsCarousel } from '../components/FeaturedProjectsCarousel';
import { SpecialtyScroll } from '../components/SpecialtyScroll';
import { StackBand } from '../components/StackBand';
import { TechIcon } from '../components/TechIcon';
import { ui, type Lang } from '../data/i18n';
import { site } from '../data/site';
import type { Certification, Experience, Project } from '../lib/content';

gsap.registerPlugin(ScrollTrigger);

const heroTools = [
  'Java', 'Go', 'Python', 'SQL', 'Docker', 'Kubernetes', 'Terraform',
  'AWS', 'Azure', 'GCP', 'Prometheus', 'Grafana', 'Datadog',
];

export function HomePage({ projects, experiences, certifications, lang }: { projects: Project[]; experiences: Experience[]; certifications: Certification[]; lang: Lang }) {
  const root = useRef<HTMLDivElement>(null);
  const [toolTip, setToolTip] = useState<{ name: string; x: number; y: number } | null>(null);

  const showToolTip = (name: string, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    setToolTip({
      name,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-name-char]', {
        opacity: 0,
        y: 18,
        filter: 'blur(6px)',
        duration: 0.65,
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

      gsap.utils.toArray<HTMLElement>('.section-screen').slice(1).forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0.72, y: 48, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              end: 'top 42%',
              scrub: 0.45,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-section-head]').forEach((head) => {
        gsap.fromTo(
          head.children,
          { opacity: 0, y: 34, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: head,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-section-item]').forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -34 : 34, y: 18, filter: 'blur(7px)' },
          {
            opacity: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.68,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        );
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
          <p data-hero className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">Backend / Cloud Infrastructure / Distributed Systems / Operations</p>
          <h1 className="font-serif text-[clamp(3rem,8.2vw,7.2rem)] leading-[0.88] tracking-normal" aria-label={site.fullName}>
            <span data-name-char className="inline-block max-w-full whitespace-nowrap align-bottom">{site.fullName}</span>
          </h1>
          <p data-hero className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
            {ui[lang].heroBio}
          </p>
          
          <div data-hero className="mt-8 max-w-xl overflow-hidden py-1">
            <div className="tool-marquee flex w-max gap-2">
              {[...heroTools, ...heroTools].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  onMouseEnter={(event) => showToolTip(item, event.currentTarget)}
                  onMouseMove={(event) => showToolTip(item, event.currentTarget)}
                  onMouseLeave={() => setToolTip(null)}
                  onFocus={(event) => showToolTip(item, event.currentTarget)}
                  onBlur={() => setToolTip(null)}
                >
                  <TechIcon name={item} size="hero" tone="mono" framed={false} />
                </span>
              ))}
            </div>
          </div>
          {toolTip && (
            <span
              className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-full rounded-md border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] shadow-lg"
              style={{ left: toolTip.x, top: toolTip.y, borderColor: 'var(--border)', background: 'var(--panel)', color: 'var(--text)' }}
            >
              {toolTip.name}
            </span>
          )}
          <div data-hero className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#proyectos" className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-3 font-medium text-white transition hover:-translate-y-0.5">
              {ui[lang].viewProjects} <ArrowRight size={18} />
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-lg border px-4 py-3 font-medium text-[var(--text)] transition hover:bg-[var(--panel-2)]" style={{ borderColor: 'var(--border)' }}>
              <Mail size={18} /> {ui[lang].contact}
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
        <SpecialtyScroll lang={lang} />
      </div>

      <ExperienceSection experiences={experiences} lang={lang} />

      <div id="proyectos">
        <FeaturedProjectsCarousel
          projects={projects}
          limit={projects.length}
          pageMode
          showViewAll={false}
          eyebrow="Work"
          title={ui[lang].projectsTitle}
          intro={ui[lang].projectIntro}
          lang={lang}
        />
      </div>

      <CertificationsSection certifications={certifications} lang={lang} />

      <StackBand lang={lang} />
    </div>
  );
}
