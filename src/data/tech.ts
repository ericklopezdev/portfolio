import {
  siDotnet, siHtml5, siCss, siGo, siGithub, siGitlab, siAngular, siTypescript,
  siExpress, siPrisma, siMongodb, siGooglecloud, siGooglegemini, siMqtt,
  siTerraform, siReact, siPython, siNodedotjs, siPostgresql, siSpringboot,
  siDocker, siLinux, siOpenjdk, siSst, siJest, siYoutube, siSpotify,
  siKubernetes, siHelm, siRedis, siRabbitmq, siApachekafka, siNginx,
  siGrafana, siPrometheus, siGithubactions, siIstio, siVault, siAnsible,
  siGraphql, siFastapi, siGit, siCloudflare, siOpentelemetry,
  siMysql, siDatadog, siSplunk, siGnubash,
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
const azure = (label = 'Azure'): TechDef => ({ label, path: CLOUD, hex: '#0078D4', hexDark: '#48A7F8' });
const DATABASE =
  'M12 2C7.03 2 3 3.79 3 6v12c0 2.21 4.03 4 9 4s9-1.79 9-4V6c0-2.21-4.03-4-9-4Zm0 2c4.42 0 7 1.39 7 2s-2.58 2-7 2-7-1.39-7-2 2.58-2 7-2Zm0 16c-4.42 0-7-1.39-7-2v-2.1C6.6 16.83 9.17 17.25 12 17.25s5.4-.42 7-1.35V18c0 .61-2.58 2-7 2Zm0-4.75c-4.42 0-7-1.39-7-2v-2.1c1.6.93 4.17 1.35 7 1.35s5.4-.42 7-1.35v2.1c0 .61-2.58 2-7 2Z';

/* Keys are normalized (lowercase, trimmed). Aliases point to the same icon. */
export const TECH: Record<string, TechDef> = {
  // Languages
  'go': ic(siGo),
  'golang': ic(siGo, { label: 'Go' }),
  'python': ic(siPython),
  'typescript': ic(siTypescript),
  'ts': ic(siTypescript, { label: 'TypeScript' }),
  'bash': ic(siGnubash, { label: 'Bash', hexDark: '#FFFFFF' }),
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
  'mysql': ic(siMysql, { label: 'MySQL' }),
  'postgres': ic(siPostgresql, { label: 'Postgres' }),
  'postgresql': ic(siPostgresql),
  'sql': { label: 'SQL', path: DATABASE, hex: '#336791', hexDark: '#6EA8D9' },
  'vector databases': { label: 'Vector DBs', path: DATABASE, hex: '#7057FF', hexDark: '#A794FF' },
  'prisma': ic(siPrisma, { hexDark: '#7B85F0' }),

  // Cloud / infra
  'aws': aws('AWS'),
  'azure': azure(),
  'microsoft azure': azure(),
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
  'azure devops': azure('Azure DevOps'),
  'istio': ic(siIstio),
  'vault': ic(siVault, { hexDark: '#FFEC6E' }),
  'ansible': ic(siAnsible),
  'graphql': ic(siGraphql),
  'fastapi': ic(siFastapi, { label: 'FastAPI' }),
  'cloudflare': ic(siCloudflare),
  'opentelemetry': ic(siOpentelemetry, { label: 'OTel', hexDark: '#FFFFFF' }),
  'datadog': ic(siDatadog, { label: 'Datadog', hexDark: '#9A5DFD' }),
  'splunk': ic(siSplunk, { label: 'Splunk', hexDark: '#FFFFFF' }),
  'cloud run': ic(siGooglecloud, { label: 'Cloud Run' }),
  'rag': ic(siGooglegemini, { label: 'RAG' }),
  'iot': ic(siMqtt, { label: 'IoT' }),
  'esp32': ic(siMqtt, { label: 'ESP32' }),
  'networking': { label: 'Networking', path: CLOUD, hex: '#14B8A6' },
};

export function getTech(name: string): TechDef | undefined {
  return TECH[name.toLowerCase().trim()];
}
