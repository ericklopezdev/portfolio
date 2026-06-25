import {
  siDotnet, siHtml5, siCss, siGo, siGithub, siGitlab, siAngular, siTypescript,
  siExpress, siPrisma, siMongodb, siGooglecloud, siGooglegemini, siMqtt,
  siTerraform, siReact, siPython, siNodedotjs, siPostgresql, siSpringboot,
  siDocker, siLinux, siOpenjdk, siSst, siJest, siYoutube, siSpotify,
  siKubernetes, siHelm, siRedis, siRabbitmq, siApachekafka, siNginx,
  siGrafana, siPrometheus, siGithubactions, siIstio, siVault, siAnsible,
  siGraphql, siFastapi, siGit, siCloudflare, siOpentelemetry,
} from 'simple-icons';

export interface TechDef {
  label: string;
  path: string;
  hex: string;
  hexDark?: string;
}

type SI = { title: string; path: string; hex: string };

const ic = (i: SI, over: Partial<TechDef> = {}): TechDef => ({
  label: i.title,
  path: i.path,
  hex: `#${i.hex}`,
  ...over,
});

/* Custom mark for AWS-family services (Amazon logos removed from simple-icons) */
const CLOUD =
  'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z';
const aws = (label: string): TechDef => ({ label, path: CLOUD, hex: '#FF9900' });

/* Keys are normalized (lowercase, trimmed). Aliases point to the same icon. */
export const TECH: Record<string, TechDef> = {
  // Languages
  'go': ic(siGo),
  'golang': ic(siGo, { label: 'Go' }),
  'python': ic(siPython),
  'typescript': ic(siTypescript),
  'ts': ic(siTypescript, { label: 'TypeScript' }),
  'java': ic(siOpenjdk, { label: 'Java', hex: '#E76F00', hexDark: '#F89820' }),
  'html': ic(siHtml5, { label: 'HTML' }),
  'css': ic(siCss, { label: 'CSS' }),

  // Frameworks / libraries
  'react': ic(siReact),
  'angular': ic(siAngular, { hexDark: '#DD0031' }),
  'express': ic(siExpress, { hexDark: '#FFFFFF' }),
  'node.js': ic(siNodedotjs, { label: 'Node.js' }),
  'nodejs': ic(siNodedotjs, { label: 'Node.js' }),
  'springboot': ic(siSpringboot, { label: 'Spring Boot' }),
  'spring boot': ic(siSpringboot, { label: 'Spring Boot' }),
  '.net framework': ic(siDotnet, { label: '.NET' }),
  '.net': ic(siDotnet, { label: '.NET' }),
  'jest': ic(siJest),

  // Data
  'mongodb': ic(siMongodb),
  'postgres': ic(siPostgresql, { label: 'Postgres' }),
  'postgresql': ic(siPostgresql),
  'prisma': ic(siPrisma, { hexDark: '#7B85F0' }),

  // Cloud / infra
  'aws': aws('AWS'),
  'lambda': aws('Lambda'),
  'cognito': aws('Cognito'),
  'cloudfront': aws('CloudFront'),
  's3': aws('S3'),
  'google cloud': ic(siGooglecloud, { label: 'Google Cloud' }),
  'gcp': ic(siGooglecloud, { label: 'GCP' }),
  'terraform': ic(siTerraform),
  'docker': ic(siDocker),
  'linux': ic(siLinux),

  // AI / misc
  'gemini': ic(siGooglegemini),
  'mqtt': ic(siMqtt),
  'youtube': ic(siYoutube),
  'spotify': ic(siSpotify),

  // VCS
  'github': ic(siGithub, { hexDark: '#FFFFFF' }),
  'gitlab': ic(siGitlab),
  'git': ic(siGit),

  // Distributed systems / infra / DevOps
  'kubernetes': ic(siKubernetes),
  'k8s': ic(siKubernetes, { label: 'Kubernetes' }),
  'helm': ic(siHelm, { hexDark: '#7B8CF0' }),
  'redis': ic(siRedis),
  'rabbitmq': ic(siRabbitmq, { label: 'RabbitMQ' }),
  'kafka': ic(siApachekafka, { label: 'Kafka', hexDark: '#FFFFFF' }),
  'nginx': ic(siNginx),
  'grafana': ic(siGrafana),
  'prometheus': ic(siPrometheus),
  'github actions': ic(siGithubactions, { label: 'GH Actions' }),
  'githubactions': ic(siGithubactions, { label: 'GH Actions' }),
  'ci/cd': ic(siGithubactions, { label: 'CI/CD' }),
  'istio': ic(siIstio),
  'vault': ic(siVault, { hexDark: '#FFEC6E' }),
  'ansible': ic(siAnsible),
  'graphql': ic(siGraphql),
  'fastapi': ic(siFastapi, { label: 'FastAPI' }),
  'cloudflare': ic(siCloudflare),
  'opentelemetry': ic(siOpentelemetry, { label: 'OTel', hexDark: '#FFFFFF' }),
};

export function getTech(name: string): TechDef | undefined {
  return TECH[name.toLowerCase().trim()];
}
