import { FeaturedProjectsCarousel } from '../components/FeaturedProjectsCarousel';
import type { Project } from '../lib/content';

export function ProjectsPage({ projects }: { projects: Project[] }) {
  return (
    <FeaturedProjectsCarousel
      projects={projects}
      limit={projects.length}
      pageMode
      showViewAll={false}
      eyebrow="Archivo de trabajo"
      title="Proyectos"
      intro={`Una seleccion navegable de ${projects.length} productos y experimentos: CLI tools, plataformas fullstack, backend, cloud y automatizacion.`}
    />
  );
}
