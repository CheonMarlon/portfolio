import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.classList.contains("light")), []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try { localStorage.setItem("theme", next ? "light" : "dark"); } catch {}
  };
  return (
    <button onClick={toggle} data-cursor={light ? "Switch to dark" : "Switch to light"} data-tour="Light or dark — your call"
      aria-label="Toggle theme" className="grid size-8 place-items-center rounded-full border text-muted-foreground transition hover:text-foreground">
      {light ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
    </button>
  );
}
