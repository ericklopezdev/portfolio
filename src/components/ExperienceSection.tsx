import type { Experience } from '../lib/content';
import { formatDate } from '../lib/text';
import { TechIcon } from './TechIcon';

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experiencia" className="container section-screen py-16">
      <div className="mb-10 grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Trayectoria</p>
          <h2 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">Experiencia</h2>
        </div>
        <p className="max-w-2xl text-lg text-[var(--muted)]">
          Roles donde he trabajado backend, cloud, integraciones y sistemas para operaciones reales.
        </p>
      </div>

      <div className="border-t" style={{ borderColor: 'var(--border)' }}>
        {experiences.map((experience) => (
          <article key={experience.slug} className="grid gap-4 border-b py-6 md:grid-cols-[180px_1fr]" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="font-mono text-xs capitalize text-[var(--faint)]">{formatDate(experience.date)}</p>
              <p className="mt-2 text-sm text-[var(--accent)]">{experience.company}</p>
            </div>
            <div>
              <h3 className="font-serif text-3xl leading-tight">{experience.title}</h3>
              <div className="prose mt-4 text-sm" dangerouslySetInnerHTML={{ __html: experience.html }} />
              <div className="mt-5 flex flex-wrap gap-2">
                {experience.tags.map((tag) => <TechIcon key={tag} name={tag} />)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
