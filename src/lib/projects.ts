import { getCollection } from "astro:content";

export async function getSortedProjects() {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  return projects.sort((a, b) => a.data.order - b.data.order);
}
