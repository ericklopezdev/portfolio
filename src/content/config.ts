import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    github: z.string().optional(),
    demo: z.string().optional(),
  }),
});

const experience = defineCollection({
  schema: z.object({
    title: z.string(),
    company: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const certifications = defineCollection({
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    link: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { projects, experience, certifications };
