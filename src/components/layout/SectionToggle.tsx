import { SECTIONS } from "@/lib/sections";
import { useActiveSection } from "@/lib/useActiveSection";
import type { MouseEvent } from "react";

export function SectionToggle() {
  const ids = SECTIONS.map((section) => section.id);
  const activeSection = useActiveSection(ids, ids[0]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-1/2 left-10 z-50 hidden h-40 w-6 -translate-y-1/2 flex-col items-center justify-between md:flex">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <a
            key={section.id}
            title={section.label}
            href={`#${section.id}`}
            onClick={(event) => handleClick(event, section.id)}
            className={`h-2.5 w-2.5 cursor-pointer border-2 border-primary shadow-lg transition-all duration-300 ease-out hover:scale-[1.2] hover:opacity-80 ${
              isActive
                ? "scale-[1.3] rotate-0 bg-primary opacity-100"
                : "rotate-45 bg-transparent opacity-40"
            }`}
          />
        );
      })}
    </div>
  );
}
