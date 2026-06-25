import { TechIcon } from '../components/TechIcon';
import { SectionHeader } from '../components/SectionHeader';
import type { Experience } from '../lib/content';
import { formatDate } from '../lib/text';

export function ExperiencePage({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="container py-8">
      <SectionHeader
        eyebrow="Trayectoria"
        title="Experiencia"
        intro="Roles de ingenieria donde he construido backends, pipelines de datos e infraestructura cloud para empresas y negocios locales."
      />
      <ol className="relative max-w-3xl border-l pl-8" style={{ borderColor: 'var(--border)' }}>
        {experiences.map((experience) => (
          <li key={experience.slug} className="relative pb-12 last:pb-0">
            <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 bg-[var(--bg)]" style={{ borderColor: 'var(--accent)' }} />
            <p className="font-mono text-xs capitalize text-[var(--faint)]">{formatDate(experience.date)}</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight">{experience.title}</h2>
            <p className="mt-1 font-semibold text-[var(--accent)]">{experience.company}</p>
            <div className="prose mt-4 text-sm" dangerouslySetInnerHTML={{ __html: experience.html }} />
            <div className="mt-5 flex flex-wrap gap-2">
              {experience.tags.map((tag) => <TechIcon key={tag} name={tag} />)}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
