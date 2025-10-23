import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div data-theme={theme}>
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-md bg-card border hover-elevate active-elevate-2"
        data-testid="button-theme-toggle"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </button>
      {children}
    </div>
  );
}
