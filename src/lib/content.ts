import { marked } from 'marked';
import { cleanText } from './text';

type Frontmatter = Record<string, string | string[]>;

export interface Project {
  slug: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  html: string;
}

export interface Experience {
  slug: string;
  title: string;
  company: string;
  date: string;
  tags: string[];
  html: string;
}

export interface Certification {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
  image?: string;
}

function parseValue(raw: string): string | string[] {
  const value = raw.trim();
  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => cleanText(item.trim().replace(/^['"]|['"]$/g, '')))
      .filter(Boolean);
  }
  return cleanText(value.replace(/^['"]|['"]$/g, ''));
}

function parseMarkdown(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const frontmatter: Frontmatter = {};
  const body = match ? match[2] : raw;

  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const idx = line.indexOf(':');
      if (idx === -1) continue;
      frontmatter[line.slice(0, idx).trim()] = parseValue(line.slice(idx + 1));
    }
  }

  return {
    frontmatter,
    html: marked.parse(cleanText(body), { async: false }) as string,
  };
}

function slugFromPath(path: string) {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? path;
}

const projectFiles = import.meta.glob('../content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const experienceFiles = import.meta.glob('../content/experience/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const certificationFiles = import.meta.glob('../content/certifications/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const asList = (value: string | string[] | undefined) => Array.isArray(value) ? value : [];
const asString = (value: string | string[] | undefined) => typeof value === 'string' ? value : '';

export const projects: Project[] = Object.entries(projectFiles)
  .map(([path, raw]) => {
    const { frontmatter, html } = parseMarkdown(raw);
    return {
      slug: slugFromPath(path),
      title: asString(frontmatter.title),
      description: asString(frontmatter.description),
      date: new Date(asString(frontmatter.date)),
      tags: asList(frontmatter.tags),
      image: asString(frontmatter.image) || undefined,
      github: asString(frontmatter.github) || undefined,
      demo: asString(frontmatter.demo) || undefined,
      html,
    };
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export const experiences: Experience[] = Object.entries(experienceFiles)
  .map(([path, raw]) => {
    const { frontmatter, html } = parseMarkdown(raw);
    return {
      slug: slugFromPath(path),
      title: asString(frontmatter.title),
      company: asString(frontmatter.company),
      date: asString(frontmatter.date),
      tags: asList(frontmatter.tags),
      html,
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

export const certifications: Certification[] = Object.entries(certificationFiles)
  .map(([path, raw]) => {
    const { frontmatter } = parseMarkdown(raw);
    return {
      slug: slugFromPath(path),
      title: asString(frontmatter.title),
      issuer: asString(frontmatter.issuer),
      date: asString(frontmatter.date),
      link: asString(frontmatter.link) || undefined,
      image: asString(frontmatter.image) || undefined,
    };
  })
  .sort((a, b) => Number(b.date) - Number(a.date));
