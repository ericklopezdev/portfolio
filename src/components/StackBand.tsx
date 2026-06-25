import { TechIcon } from './TechIcon';
import { ui, type Lang } from '../data/i18n';

const groups = [
  {
    index: '01',
    title: 'Languages',
    desc: {
      en: 'Core languages for backend systems, automation and data work.',
      es: 'Lenguajes base para backend systems, automation y data work.',
    },
    tools: ['Java', 'Go', 'Python', 'SQL'],
  },
  {
    index: '02',
    title: 'Backend Engineering',
    desc: {
      en: 'APIs, modular services, authentication, authorization and production-oriented service design.',
      es: 'APIs, modular services, authentication, authorization y production-oriented service design.',
    },
    tools: ['FastAPI', 'Express', 'Spring Boot', 'PostgreSQL'],
  },
  {
    index: '03',
    title: 'Containerization',
    desc: {
      en: 'Packaging, deploying and operating services across reproducible environments.',
      es: 'Packaging, deploying y operating services en reproducible environments.',
    },
    tools: ['Docker', 'Kubernetes', 'Helm', 'Linux'],
  },
  {
    index: '04',
    title: 'Cloud Infrastructure',
    desc: {
      en: 'Cloud platforms, Infrastructure as Code and repeatable delivery workflows.',
      es: 'Cloud platforms, Infrastructure as Code y repeatable delivery workflows.',
    },
    tools: ['AWS', 'Azure', 'GCP', 'Terraform', 'GitHub Actions'],
  },
  {
    index: '05',
    title: 'Observability',
    desc: {
      en: 'Logs, metrics, resource monitoring and production behavior analysis.',
      es: 'Logs, metrics, resource monitoring y production behavior analysis.',
    },
    tools: ['Prometheus', 'Grafana', 'Datadog', 'Splunk'],
  },
  {
    index: '06',
    title: 'Databases',
    desc: {
      en: 'Relational, document and vector-oriented data storage for backend and data-intensive systems.',
      es: 'Data storage relacional, documental y vector-oriented para backend y data-intensive systems.',
    },
    tools: ['PostgreSQL', 'MySQL', 'MongoDB', 'Vector Databases'],
  },
  {
    index: '07',
    title: 'Messaging',
    desc: {
      en: 'Asynchronous communication, event-driven workflows and device-to-service coordination.',
      es: 'Asynchronous communication, event-driven workflows y coordinacion device-to-service.',
    },
    tools: ['MQTT', 'Kafka', 'RabbitMQ'],
  },
];

export function StackBand({ lang }: { lang: Lang }) {
  return (
    <section id="tooling" className="container section-screen py-16">
      <div data-section-head className="mb-10 grid gap-4 md:grid-cols-[0.7fr_1.3fr] md:items-end">
        <div>
          <h2 className="font-serif text-5xl leading-tight md:text-7xl">{ui[lang].stackTitle}</h2>
        </div>
        <p className="max-w-2xl text-lg text-[var(--muted)]">
          {ui[lang].stackIntro}
        </p>
      </div>

      <div className="grid gap-4">
        {groups.map((group) => (
          <article
            key={group.title}
            data-section-item
            className="relative grid gap-6 border-t py-6 md:grid-cols-[180px_1fr_220px] md:items-start"
            style={{ borderColor: 'var(--border)' }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--faint)]">{group.index} / {group.title}</p>
            <div>
              <h3 className="font-serif text-3xl leading-tight md:text-4xl">{group.title}</h3>
              <p className="mt-4 max-w-3xl text-[var(--muted)]">{group.desc[lang]}</p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {group.tools.map((tool) => <TechIcon key={tool} name={tool} tone="mono" />)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
