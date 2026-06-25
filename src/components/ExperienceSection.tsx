import type { Experience } from '../lib/content';
import { formatDate } from '../lib/text';
import { ui, type Lang } from '../data/i18n';

export function ExperienceSection({ experiences, lang }: { experiences: Experience[]; lang: Lang }) {
  return (
    <section id="experiencia" className="container section-screen py-16">
      <div data-section-head className="mb-10 grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-end">
        <div>
          <h2 className="font-serif text-5xl leading-tight md:text-7xl">{ui[lang].experienceTitle}</h2>
        </div>
        <p className="max-w-2xl text-lg text-[var(--muted)]">
          {ui[lang].experienceIntro}
        </p>
      </div>

      <div className="border-t" style={{ borderColor: 'var(--border)' }}>
        {experiences.map((experience) => (
          <article data-section-item key={experience.slug} className="grid gap-4 border-b py-6 md:grid-cols-[180px_1fr]" style={{ borderColor: 'var(--border)' }}>
            <div>
              <p className="font-mono text-xs capitalize text-[var(--faint)]">{formatDate(experience.date)}</p>
              <p className="mt-2 text-sm text-[var(--accent)]">{experience.company}</p>
            </div>
            <div>
              <h3 className="font-serif text-3xl leading-tight">{experience.title}</h3>
              <div className="prose mt-4 text-sm" dangerouslySetInnerHTML={{ __html: experience.html }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
