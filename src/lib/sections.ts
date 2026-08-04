type Section = {
  id: "hero" | "about" | "projects" | "contact";
  label: string;
  inNav: boolean;
};

export const SECTIONS = [
  { id: "hero", label: "Welcome", inNav: false },
  { id: "about", label: "About", inNav: true },
  { id: "projects", label: "Projects", inNav: true },
  { id: "contact", label: "Contact", inNav: true },
] as const satisfies readonly Section[];

export type SectionId = (typeof SECTIONS)[number]["id"];

export const NAV_SECTIONS = SECTIONS.filter((section) => section.inNav);
export const SECTION_IDS = SECTIONS.map((section) => section.id);
