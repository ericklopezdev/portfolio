import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { TechIcon } from '../components/TechIcon';
import { projectDescription, ui, type Lang } from '../data/i18n';
import type { Project } from '../lib/content';
import { formatDate } from '../lib/text';

export function ProjectDetailPage({ project, lang }: { project?: Project; lang: Lang }) {
  if (!project) {
    return (
      <section className="container py-8">
        <a href="/#proyectos" className="inline-flex items-center gap-2 text-[var(--accent)]"><ArrowLeft size={17} /> Portfolio</a>
        <h1 className="mt-8 font-serif text-5xl">{ui[lang].notFound}</h1>
      </section>
    );
  }

  return (
    <article className="container max-w-4xl py-8">
      <a href="/#proyectos" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]"><ArrowLeft size={17} /> {ui[lang].backPortfolio}</a>
      <header className="mt-8">
        <p className="font-mono text-xs capitalize text-[var(--faint)]">{formatDate(project.date)}</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight md:text-4xl">{project.title}</h1>
        <p className="mt-5 text-lg text-[var(--muted)]">{projectDescription(project, lang)}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {project.github && <a className="inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm hover:bg-[var(--panel-2)]" style={{ borderColor: 'var(--border)' }} href={project.github} target="_blank" rel="noreferrer"><Github size={17} /> {ui[lang].repository}</a>}
          {project.demo && <a className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-3 text-sm text-white" href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={17} /> {ui[lang].liveDemo}</a>}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">{project.tags.map((tag) => <TechIcon key={tag} name={tag} />)}</div>
      </header>
      {project.image && <img src={project.image} alt={project.title} className="mt-10 max-h-[520px] w-full rounded-lg border object-cover shadow-2xl" style={{ borderColor: 'var(--border)' }} />}
      <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: project.html }} />
    </article>
  );
}
