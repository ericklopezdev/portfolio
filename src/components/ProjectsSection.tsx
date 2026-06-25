import { ArrowRight } from 'lucide-react';
import type { Project } from '../lib/content';
import { formatDate } from '../lib/text';
import { TechIcon } from './TechIcon';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="proyectos" className="container py-16 md:py-24">
      <div className="mb-10 grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--faint)]">Trabajo</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight md:text-6xl">Proyectos</h2>
        </div>
        <div>
          <p className="max-w-2xl text-lg text-[var(--muted)]">
            Una selección de productos, automatizaciones y plataformas. El archivo completo vive como carrusel horizontal.
          </p>
          <a href="/projects" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
            Abrir carrusel <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: 'var(--border)' }}>
        {projects.slice(0, 5).map((project) => (
          <a key={project.slug} href={`/projects/${project.slug}`} className="group grid gap-4 border-b py-6 transition md:grid-cols-[180px_1fr_auto]" style={{ borderColor: 'var(--border)' }}>
            <p className="font-mono text-xs capitalize text-[var(--faint)]">{formatDate(project.date)}</p>
            <div>
              <h3 className="font-serif text-3xl leading-tight group-hover:text-[var(--accent)]">{project.title}</h3>
              <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.slice(0, 5).map((tag) => <TechIcon key={tag} name={tag} />)}
              </div>
            </div>
            <ArrowRight size={18} className="hidden text-[var(--muted)] group-hover:text-[var(--accent)] md:block" />
          </a>
        ))}
      </div>
    </section>
  );
}
