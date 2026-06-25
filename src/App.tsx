import { certifications, experiences, projects } from './lib/content';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { useState } from 'react';
import type { Lang } from './data/i18n';

function currentPath() {
  return window.location.pathname.replace(/\/$/, '') || '/';
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('portfolio-lang');
    return saved === 'es' ? 'es' : 'en';
  });
  const path = currentPath();
  const projectMatch = path.match(/^\/projects\/(.+)$/);
  const project = projectMatch ? projects.find((item) => item.slug === projectMatch[1]) : undefined;

  if (path === '/projects') {
    window.location.replace('/#proyectos');
    return null;
  }

  if (path === '/experience') {
    window.location.replace('/#experiencia');
    return null;
  }

  if (path === '/certifications') {
    window.location.replace('/#certificaciones');
    return null;
  }

  return (
    <Layout path={path} lang={lang} setLang={setLang}>
      {path === '/' && <HomePage projects={projects} experiences={experiences} certifications={certifications} lang={lang} />}
      {projectMatch && <ProjectDetailPage project={project} lang={lang} />}
    </Layout>
  );
}
