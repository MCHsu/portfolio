import { NAV_SECTIONS, SECTION_IDS } from "@/lib/sections";
import { useActiveSection } from "@/lib/useActiveSection";
import type { MouseEvent } from "react";

interface NavLinksProps {
  variant: "desktop" | "mobile";
}

export function NavLinks({ variant }: NavLinksProps) {
  // Include hero so scroll-spy can detect "before about"; hero is not in NAV_SECTIONS UI
  const activeSection = useActiveSection(SECTION_IDS, "hero");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {NAV_SECTIONS.map((section) => {
        const isActive = activeSection === section.id;

        if (variant === "mobile") {
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(event) => handleClick(event, section.id)}
              className={`flex flex-col items-center gap-1.5 transition-colors duration-300 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <span
                className={`text-base ${isActive ? "font-bold" : "font-medium"}`}
              >
                {section.label}
              </span>
            </a>
          );
        }

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(event) => handleClick(event, section.id)}
            className={`transition-colors dark:text-white/70 dark:hover:text-white ${
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {section.label}
          </a>
        );
      })}
    </>
  );
}
