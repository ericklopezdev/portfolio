import { certifications, experiences, projects } from './lib/content';
import { Layout } from './components/Layout';
import { CertificationsPage } from './pages/CertificationsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';

function currentPath() {
  return window.location.pathname.replace(/\/$/, '') || '/';
}

export default function App() {
  const path = currentPath();
  const projectMatch = path.match(/^\/projects\/(.+)$/);
  const project = projectMatch ? projects.find((item) => item.slug === projectMatch[1]) : undefined;

  return (
    <Layout path={path}>
      {path === '/' && <HomePage projects={projects} experiences={experiences} certifications={certifications} />}
      {path === '/projects' && <ProjectsPage projects={projects} />}
      {path === '/experience' && <ExperiencePage experiences={experiences} />}
      {path === '/certifications' && <CertificationsPage certifications={certifications} />}
      {projectMatch && <ProjectDetailPage project={project} />}
    </Layout>
  );
}
