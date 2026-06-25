import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { projectDescription, ui, type Lang } from '../data/i18n';
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
  lang?: Lang;
}

export function FeaturedProjectsCarousel({
  projects,
  title = 'Featured projects',
  eyebrow = 'Work',
  intro,
  limit = 5,
  showViewAll = true,
  pageMode = false,
  lang = 'en',
}: FeaturedProjectsCarouselProps) {
  const featured = useMemo(() => projects.slice(0, limit), [projects, limit]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [opening, setOpening] = useState<{ slug: string; x: number; y: number } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const progressTween = useRef<gsap.core.Tween | null>(null);

  const move = (direction: 1 | -1) => {
    setActive((current) => (current + direction + featured.length) % featured.length);
  };

  const openProject = (slug: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setOpening({ slug, x: event.clientX, y: event.clientY });
    window.setTimeout(() => {
      window.location.assign(`/projects/${slug}`);
    }, 520);
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

  useEffect(() => {
    if (!pageMode || paused || featured.length < 2) return;
    const id = window.setInterval(() => move(1), 4200);
    return () => window.clearInterval(id);
  }, [pageMode, paused, featured.length]);

  if (!featured.length) return null;

  const offsetFor = (index: number) => {
    const raw = (index - active + featured.length) % featured.length;
    return raw > featured.length / 2 ? raw - featured.length : raw;
  };

  return (
    <section className={pageMode ? 'container section-screen py-16' : 'container py-12'} data-work>
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
        <div data-section-head className="mb-8 grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-end">
          <h2 className="font-serif text-5xl leading-tight md:text-7xl">{title}</h2>
          <div>
            <p className="max-w-2xl text-lg text-[var(--muted)]">
              {intro ?? 'A navigable selection of distributed systems, cloud infrastructure labs, backend platforms and automation work.'}
            </p>
          </div>
        </div>
      )}

      {pageMode && (
        <div
          className="relative min-h-[455px] overflow-hidden"
          style={{ perspective: '1400px' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute inset-x-0 top-4 h-[460px]" style={{ transformStyle: 'preserve-3d' }}>
            {featured.map((project, index) => {
              const offset = offsetFor(index);
              const depth = Math.abs(offset);
              const isActive = offset === 0;
              const visible = depth <= 3;
              const transform = `
                translateX(calc(-50% + ${offset * 205}px))
                translateZ(${-depth * 120}px)
                rotateY(${-offset * 28}deg)
                scale(${1 - Math.min(depth, 3) * 0.08})
              `;

              return (
                <article
                  key={project.slug}
                  className="project-orbit-card panel absolute left-1/2 top-0 flex aspect-[4/5] w-[min(82vw,360px)] flex-col overflow-hidden rounded-lg transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:aspect-[16/10] md:w-[min(86vw,500px)]"
                  style={{
                    transform,
                    opacity: visible ? 1 : 0,
                    zIndex: 20 - depth,
                    pointerEvents: visible ? 'auto' : 'none',
                  }}
                >
                  <button
                    type="button"
                    onClick={(event) => isActive ? openProject(project.slug, event) : setActive(index)}
                    className="group relative h-full overflow-hidden text-left"
                    aria-label={isActive ? `Open ${project.title}` : `Focus ${project.title}`}
                  >
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading={index === active ? 'eager' : 'lazy'} />
                    ) : (
                      <span className="absolute inset-0 grid place-items-center bg-[var(--panel-2)] font-serif text-7xl text-[var(--accent)]">{project.title[0]}</span>
                    )}
                    <span className="absolute inset-0 bg-[linear-gradient(90deg,var(--bg)_0%,color-mix(in_srgb,var(--bg)_97%,transparent)_34%,color-mix(in_srgb,var(--bg)_78%,transparent)_58%,transparent_88%)]" />
                    <span className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />
                    <span className="absolute left-5 top-5 font-mono text-[11px] text-[var(--faint)]">
                      {String(index + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
                    </span>

                    <span className="relative z-10 flex h-full w-[76%] flex-col justify-end p-6">
                      <span className="font-mono text-xs capitalize text-[var(--faint)]">{formatDate(project.date)}</span>
                      <span className="mt-3 block max-w-[13ch] overflow-hidden text-ellipsis whitespace-nowrap font-serif text-3xl leading-tight text-[var(--text)] md:max-w-[16ch]">{project.title}</span>
                      <span className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">{projectDescription(project, lang)}</span>
                      <span className="mt-5 flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                          <TechIcon key={tag} name={tag} />
                        ))}
                      </span>
                      <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] opacity-80 transition group-hover:translate-x-1 group-hover:opacity-100">
                        {ui[lang].openCase} <ArrowRight size={14} />
                      </span>
                    </span>
                  </button>
                </article>
              );
            })}
          </div>

          <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-3">
            <button type="button" onClick={() => move(-1)} className="grid h-11 w-11 place-items-center rounded-lg border text-[var(--muted)] transition hover:text-[var(--accent)]" style={{ borderColor: 'var(--border)' }} aria-label="Previous project">
              <ArrowLeft size={18} />
            </button>
            <div className="flex min-w-36 items-center gap-3">
              <span className="font-mono text-xs text-[var(--faint)]">{String(active + 1).padStart(2, '0')}</span>
              <span className="h-px flex-1 bg-[var(--border)]" />
              <span className="font-mono text-xs text-[var(--faint)]">{String(featured.length).padStart(2, '0')}</span>
            </div>
            <button type="button" onClick={() => move(1)} className="grid h-11 w-11 place-items-center rounded-lg border text-[var(--muted)] transition hover:text-[var(--accent)]" style={{ borderColor: 'var(--border)' }} aria-label="Next project">
              <ArrowRight size={18} />
            </button>
          </div>

          {opening && (
            <span
              className="project-open-ripple fixed z-[80] h-8 w-8 rounded-full bg-[var(--accent)]"
              style={{ left: opening.x - 16, top: opening.y - 16 }}
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {!pageMode && (
      <div
        ref={root}
        className="panel flex flex-col overflow-hidden rounded-lg"
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
                <p data-slide-copy className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)] md:text-[0.95rem]">{projectDescription(project, lang)}</p>

                <div data-slide-copy className="mt-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 6).map((tag) => <TechIcon key={tag} name={tag} />)}
                </div>

                <div data-slide-copy className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
                  <a href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5">
                    {ui[lang].openCase} <ArrowRight size={17} />
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
      )}
    </section>
  );
}
