export type Lang = 'en' | 'es';

export const navByLang: Record<Lang, Array<{ href: string; label: string }>> = {
  en: [
    { href: '/#inicio', label: 'Home' },
    { href: '/#especialidades', label: 'Specialization' },
    { href: '/#experiencia', label: 'Experience' },
    { href: '/#proyectos', label: 'Projects' },
    { href: '/#certificaciones', label: 'Certifications' },
    { href: '/#tooling', label: 'Stack' },
  ],
  es: [
    { href: '/#inicio', label: 'Inicio' },
    { href: '/#especialidades', label: 'Specialization' },
    { href: '/#experiencia', label: 'Experiencia' },
    { href: '/#proyectos', label: 'Proyectos' },
    { href: '/#certificaciones', label: 'Certificaciones' },
    { href: '/#tooling', label: 'Stack' },
  ],
};

export const ui = {
  en: {
    heroBio: 'Ninth-semester Systems Engineering student with hands-on experience in backend development, cloud infrastructure and production systems. I approach software through systems thinking: application design, data, infrastructure, networking, reliability, performance and operations need to work as one complete system.',
    viewProjects: 'View projects',
    contact: 'Contact',
    projectIntro: 'A navigable selection of distributed systems, cloud infrastructure labs, backend platforms and automation projects.',
    focusTitle: 'Areas of Focus',
    experienceTitle: 'Experience',
    projectsTitle: 'Projects',
    certificationsTitle: 'Certifications & Training',
    stackTitle: 'Stack & Tooling',
    certificationsIntro: 'Cloud, networking and Linux credentials that support my backend, systems and infrastructure work.',
    experienceIntro: 'Roles where I worked across backend development, cloud infrastructure, deployment automation and production troubleshooting.',
    focusIntro: 'I focus on the interaction between application design, data, infrastructure, networking, reliability and operations.',
    stackIntro: 'The tools and technical areas I use to connect software design, infrastructure, data and operations.',
    openCase: 'Open case',
    backPortfolio: 'Back to portfolio',
    notFound: 'Project not found',
    repository: 'Repository',
    liveDemo: 'Live demo',
    footer: "Interested in backend, distributed systems or cloud infrastructure opportunities? Let's build reliable systems together.",
    switchLang: 'Cambiar a Espanol',
  },
  es: {
    heroBio: 'Estudiante de noveno ciclo de Systems Engineering con experiencia practica en backend development, cloud infrastructure y production systems. Trabajo con systems thinking: application design, data, infrastructure, networking, reliability, performance y operations deben funcionar como un sistema completo.',
    viewProjects: 'Ver proyectos',
    contact: 'Contacto',
    projectIntro: 'Una seleccion navegable de distributed systems, cloud infrastructure labs, backend platforms y proyectos de automation.',
    focusTitle: 'Areas de Specialization',
    experienceTitle: 'Experiencia',
    projectsTitle: 'Proyectos',
    certificationsTitle: 'Certificaciones & Training',
    stackTitle: 'Stack & Tooling',
    certificationsIntro: 'Credenciales de cloud, networking y Linux que soportan mi trabajo en backend, systems e infrastructure.',
    experienceIntro: 'Roles donde trabaje en backend development, cloud infrastructure, deployment automation y production troubleshooting.',
    focusIntro: 'Me enfoco en la interaccion entre application design, data, infrastructure, networking, reliability y operations.',
    stackIntro: 'Herramientas y areas tecnicas que uso para conectar software design, infrastructure, data y operations.',
    openCase: 'Abrir caso',
    backPortfolio: 'Volver al portfolio',
    notFound: 'Proyecto no encontrado',
    repository: 'Repositorio',
    liveDemo: 'Demo',
    footer: 'Interesado en backend, distributed systems o cloud infrastructure? Construyamos sistemas confiables.',
    switchLang: 'Switch to English',
  },
} as const;

export const projectDescriptionEs: Record<string, string> = {
  'cajamarca-sobre-ruedas': 'Sistema de inventory y sales management para un negocio local, enfocado en stock control y operational records.',
  'cloneit': 'CLI tool en Go para automatizar repository workflows mediante una interfaz interactiva de terminal.',
  'crellow': 'Task-management platform con backend services para boards, lists, cards y collaboration workflows.',
  'crowbot': 'Distributed IoT assistant que conecta ESP32 devices, Go backend services y cloud-device communication mediante MQTT.',
  'crowshare': 'Secure serverless file-sharing platform con expiring links, AWS Lambda, S3 presigned URLs, Cognito authentication e infrastructure con Terraform.',
  'fitfat-cafeteria': 'Small-business operations system con order tracking, inventory workflows y transactional data en PostgreSQL.',
  'homelab': 'Lab practico para estudiar como applications, services, networks e infrastructure interactuan como un distributed system completo.',
  'racoonsfinds': 'Commerce platform con Java y Spring Boot enfocada en catalog, account, inventory y transactional backend flows.',
};

export function projectDescription(project: { slug: string; description: string }, lang: Lang) {
  return lang === 'es' ? projectDescriptionEs[project.slug] ?? project.description : project.description;
}
