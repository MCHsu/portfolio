import { Code, Send, User, type LucideIcon } from "lucide-react";
import { NAV_SECTIONS, type SectionId } from "@/lib/sections";
import { useActiveSection } from "@/lib/useActiveSection";

const icons: Record<SectionId, LucideIcon> = {
  hero: User,
  about: User,
  projects: Code,
  contact: Send,
};

export function MobileNav() {
  const ids = NAV_SECTIONS.map((section) => section.id);
  const activeSection = useActiveSection(ids, ids[0] ?? "about");

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-11/12 max-w-sm -translate-x-1/2 md:hidden">
      <nav className="flex items-center justify-between rounded-full border border-border/50 bg-card/95 px-8 py-3 shadow-2xl backdrop-blur-md">
        {NAV_SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          const Icon = icons[section.id];

          return (
            <a
              key={section.id}
              href={`/#${section.id}`}
              className={`flex flex-col items-center gap-1.5 transition-colors duration-300 ${
                isActive
                  ? "text-primary"
                  : "text-foreground/60 hover:text-foreground/90"
              }`}
            >
              {/* <Icon size={22} strokeWidth={isActive ? 2.5 : 2} /> */}
              <span className="text-sm font-medium tracking-wide">
                {section.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
