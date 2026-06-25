import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Project } from '../lib/content';
import { formatDate } from '../lib/text';
import { TechIcon } from './TechIcon';

const DURATION = 5.5;

interface FeaturedProjectsCarouselProps {
  projects: Project[];
  title?: string;
  eyebrow?: string;
  intro?: string;
  limit?: number;
  showViewAll?: boolean;
  pageMode?: boolean;
}

export function FeaturedProjectsCarousel({
  projects,
  title = 'Proyectos destacados',
  eyebrow = 'Trabajo',
  intro,
  limit = 5,
  showViewAll = true,
  pageMode = false,
}: FeaturedProjectsCarouselProps) {
  const featured = useMemo(() => projects.slice(0, limit), [projects, limit]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const progressTween = useRef<gsap.core.Tween | null>(null);

  const move = (direction: 1 | -1) => {
    setActive((current) => (current + direction + featured.length) % featured.length);
  };

  useEffect(() => {
    if (!root.current || !progress.current || featured.length < 2) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-active-slide] [data-slide-copy]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: 'power3.out' },
      );
      gsap.fromTo(
        '[data-active-slide] img',
        { scale: 1.06 },
        { scale: 1, duration: 1.05, ease: 'power3.out' },
      );
    }, root);

    gsap.killTweensOf(progress.current);
    gsap.set(progress.current, { scaleX: 0, transformOrigin: 'left center' });
    progressTween.current = gsap.to(progress.current, {
      scaleX: 1,
      duration: DURATION,
      ease: 'none',
      onComplete: () => move(1),
    });

    return () => {
      progressTween.current?.kill();
      progressTween.current = null;
      ctx.revert();
    };
  }, [active, featured.length]);

  useEffect(() => {
    progressTween.current?.paused(paused);
  }, [paused]);

  if (!featured.length) return null;

  return (
    <section className={pageMode ? 'container py-16' : 'container py-12'} data-work>
      {!pageMode && (
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--faint)]">{eyebrow}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight md:text-6xl">{title}</h1>
            {intro && <p className="mt-4 text-lg text-[var(--muted)]">{intro}</p>}
          </div>
          {showViewAll && <a className="hidden items-center gap-2 text-sm font-medium text-[var(--accent)] md:inline-flex" href="/projects">
            Ver todo <ArrowRight size={17} />
          </a>}
        </div>
      )}

      {pageMode && (
        <div className="mb-8 grid gap-4 md:grid-cols-[190px_1fr] md:items-end">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--faint)]">Trabajo</p>
          <div>
            <h2 className="font-serif text-5xl leading-tight md:text-7xl">Proyectos</h2>
            <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
              Una selección navegable de productos, herramientas y experimentos backend.
            </p>
          </div>
        </div>
      )}

      {pageMode && (
        <div className="grid gap-2 md:hidden">
          {featured.map((project, index) => (
            <a
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="grid grid-cols-[2.5ch_1fr] gap-4 border-t py-4"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="font-mono text-xs text-[var(--faint)]">{String(index + 1).padStart(2, '0')}</span>
              <span>
                <span className="block font-serif text-2xl leading-tight text-[var(--text)]">{project.title}</span>
                <span className="mt-2 block text-sm text-[var(--muted)]">{project.description}</span>
              </span>
            </a>
          ))}
        </div>
      )}

      <div className={pageMode ? 'hidden gap-6 md:grid md:grid-cols-[190px_1fr]' : ''}>
        {pageMode && (
          <aside className="hidden border-t pt-4 md:block" style={{ borderColor: 'var(--border)' }}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--faint)]">Indice</p>
            <div className="flex flex-col gap-1">
              {featured.map((project, index) => (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => setActive(index)}
                  className="group grid grid-cols-[2ch_1fr] gap-3 py-2 text-left"
                >
                  <span className="font-mono text-xs text-[var(--faint)]">{String(index + 1).padStart(2, '0')}</span>
                  <span
                    className="truncate text-sm transition group-hover:text-[var(--accent)]"
                    style={{ color: active === index ? 'var(--accent)' : 'var(--muted)' }}
                  >
                    {project.title}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        )}

      <div
        ref={root}
        className={pageMode
          ? 'panel flex overflow-hidden rounded-lg md:aspect-video'
          : 'panel flex flex-col overflow-hidden rounded-lg'}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-1 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ transform: `translateX(-${active * 100}%)` }}>
          {featured.map((project, index) => (
            <article
              key={project.slug}
              className={`relative min-w-full overflow-hidden ${pageMode ? 'h-full' : 'md:grid md:grid-cols-[1.08fr_0.92fr]'}`}
              data-active-slide={index === active ? true : undefined}
            >
              <a href={`/projects/${project.slug}`} className={`relative block overflow-hidden bg-[var(--panel-2)] ${pageMode ? 'h-full min-h-[420px]' : 'min-h-[300px] md:min-h-[520px]'}`}>
                {project.image ? (
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover" loading={index === 0 ? 'eager' : 'lazy'} />
                ) : (
                  <span className="grid h-full place-items-center font-serif text-7xl text-[var(--accent)]">{project.title[0]}</span>
                )}
                <span className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--bg)_96%,transparent)_0%,color-mix(in_srgb,var(--bg)_82%,transparent)_42%,transparent_74%)]" />
                <span className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/35 px-3 py-1 font-serif text-sm text-white">
                    {String(index + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
                  </span>
                  <span className="rounded-full border border-white/35 px-3 py-1 font-serif text-sm capitalize text-white">
                    {formatDate(project.date)}
                  </span>
                </div>
              </a>

              <div className={`flex flex-col ${pageMode ? 'pointer-events-none absolute inset-y-0 left-0 z-10 w-full justify-center px-6 py-7 md:w-[58%] md:px-10 md:py-8' : 'min-h-[420px] p-6 md:p-9'}`}>
                {!pageMode && <p data-slide-copy className="font-mono text-xs capitalize text-[var(--faint)]">{formatDate(project.date)}</p>}
                <h3 data-slide-copy className={`max-w-xl font-serif text-3xl leading-[1.06] ${pageMode ? 'md:text-[clamp(2.2rem,3.2vw,3.6rem)]' : 'md:text-6xl'}`}>{project.title}</h3>
                <p data-slide-copy className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)] md:text-[0.95rem]">{project.description}</p>

                <div data-slide-copy className="mt-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 6).map((tag) => <TechIcon key={tag} name={tag} />)}
                </div>

                <div data-slide-copy className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
                  <a href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5">
                    Ver caso <ArrowRight size={17} />
                  </a>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-lg border text-[var(--muted)] hover:text-[var(--accent)]" style={{ borderColor: 'var(--border)' }} title="GitHub">
                      <Github size={17} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-lg border text-[var(--muted)] hover:text-[var(--accent)]" style={{ borderColor: 'var(--border)' }} title="Demo">
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>

                <div data-slide-copy className="pointer-events-auto mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-sm text-[var(--faint)]">{String(active + 1).padStart(2, '0')}</span>
                    <span className="h-px flex-1 overflow-hidden bg-[var(--border)]">
                      {index === active && <span ref={progress} className="block h-full w-full origin-left scale-x-0 bg-[var(--accent)]" />}
                    </span>
                    <span className="font-serif text-sm text-[var(--faint)]">{String(featured.length).padStart(2, '0')}</span>
                  </div>

                  <div className="flex gap-2">
                    <button type="button" onClick={() => move(-1)} className="grid h-11 w-11 place-items-center rounded-lg border text-[var(--muted)] transition hover:text-[var(--accent)]" style={{ borderColor: 'var(--border)' }} aria-label="Proyecto anterior">
                      <ArrowLeft size={18} />
                    </button>
                    <button type="button" onClick={() => move(1)} className="grid h-11 w-11 place-items-center rounded-lg border text-[var(--muted)] transition hover:text-[var(--accent)]" style={{ borderColor: 'var(--border)' }} aria-label="Proyecto siguiente">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
