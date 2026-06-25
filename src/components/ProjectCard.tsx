import { ExternalLink, Github, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import type { Project } from '../lib/content';
import { formatDate } from '../lib/text';
import { TechIcon } from './TechIcon';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="panel overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1" style={{ animationDelay: `${index * 60}ms` }}>
        <button type="button" onClick={() => setOpen(true)} className="block w-full text-left">
          <div className="relative aspect-video overflow-hidden bg-[var(--panel-2)]">
            {project.image ? (
              <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" loading="lazy" />
            ) : (
              <div className="grid h-full place-items-center font-serif text-5xl text-[var(--accent)]">{project.title[0]}</div>
            )}
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg border bg-[var(--panel)] text-[var(--text)] opacity-90" style={{ borderColor: 'var(--border)' }}>
              <Maximize2 size={17} />
            </span>
          </div>
          <div className="p-5">
            <p className="font-mono text-xs text-[var(--faint)]">{formatDate(project.date)}</p>
            <h3 className="mt-2 font-serif text-2xl leading-tight">{project.title}</h3>
            <p className="mt-3 text-sm text-[var(--muted)]">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.slice(0, 6).map((tag) => <TechIcon key={tag} name={tag} />)}
            </div>
          </div>
        </button>
      </article>

      {open && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/50 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <article className="panel grid max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-lg md:grid-cols-[360px_1fr]" onClick={(event) => event.stopPropagation()}>
            <aside className="border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--border)' }}>
              {project.image && <img src={project.image} alt={project.title} className="aspect-video w-full object-cover" />}
              <div className="p-6">
                <p className="font-mono text-xs text-[var(--faint)]">{formatDate(project.date)}</p>
                <h2 className="mt-2 font-serif text-3xl leading-tight">{project.title}</h2>
                <p className="mt-3 text-sm text-[var(--muted)]">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <TechIcon key={tag} name={tag} />)}</div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.github && <a className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-[var(--panel-2)]" style={{ borderColor: 'var(--border)' }} href={project.github} target="_blank" rel="noreferrer"><Github size={16} /> Repo</a>}
                  {project.demo && <a className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm text-white" href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Demo</a>}
                  <a className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-[var(--panel-2)]" style={{ borderColor: 'var(--border)' }} href={`/projects/${project.slug}`}>Pagina</a>
                </div>
              </div>
            </aside>
            <div className="overflow-y-auto p-6 md:p-8">
              <button className="mb-6 rounded-lg border px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--text)]" style={{ borderColor: 'var(--border)' }} onClick={() => setOpen(false)}>Cerrar</button>
              <div className="prose" dangerouslySetInnerHTML={{ __html: project.html }} />
            </div>
          </article>
        </div>
      )}
    </>
  );
}
