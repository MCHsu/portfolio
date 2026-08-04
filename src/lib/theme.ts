export type Theme = "light" | "dark";

export const currentTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

export const toggleTheme = () =>
  applyTheme(currentTheme() === "dark" ? "light" : "dark");
