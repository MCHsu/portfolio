import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      order: z.number().default(99),
      draft: z.boolean().default(false),
      cover: image(),
      coverAlt: z.string().optional(),
      githubUrl: z.url().optional(),
      demoUrl: z.url().optional(),
    }),
});

export const collections = {
  projects: projectsCollection,
};
