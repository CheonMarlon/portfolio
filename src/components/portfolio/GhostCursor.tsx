import { useCallback, useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

/** Tutorial cursor: walks through every clickable [data-cursor]/[data-tour] element, explaining each one. */
export function GhostCursor() {
  const [pos, setPos] = useState<{ x: number; y: number; label: string } | null>(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ i: 0, n: 0 });
  const timers = useRef<number[]>([]);
  const stopped = useRef(false);

  const stop = useCallback(() => {
    stopped.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(false);
  }, []);

  const start = useCallback(() => {
    stop();
    stopped.current = false;
    setRunning(true);
    const seen = new Set<string>();
    const els = [...document.querySelectorAll<HTMLElement>("[data-tour],[data-cursor]")].filter((el) => {
      const r = el.getBoundingClientRect();
      const label = el.dataset["tour"] ?? el.dataset["cursor"] ?? "";
      if (r.width === 0 || !label || seen.has(label)) return false;
      seen.add(label);
      return true;
    });
    let i = 0;
    const step = () => {
      if (stopped.current) return;
      if (i >= els.length) { window.scrollTo({ top: 0, behavior: "smooth" }); return stop(); }
      const el = els[i]!;
      setProgress({ i: i + 1, n: els.length });
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      timers.current.push(window.setTimeout(() => {
        const r = el.getBoundingClientRect();
        setPos({ x: r.left + r.width / 2, y: r.top + r.height / 2, label: el.dataset["tour"] ?? el.dataset["cursor"] ?? "" });
        el.classList.add("tour-target");
        timers.current.push(window.setTimeout(() => el.classList.remove("tour-target"), 1500));
      }, 450));
      i++;
      timers.current.push(window.setTimeout(step, 1900));
    };
    setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2, label: "" });
    timers.current.push(window.setTimeout(step, 300));
  }, [stop]);

  useEffect(() => {
    const t = window.setTimeout(start, 1200);
    const onUser = () => stop();
    window.addEventListener("wheel", onUser, { passive: true });
    window.addEventListener("touchstart", onUser, { passive: true });
    window.addEventListener("mousedown", onUser);
    window.addEventListener("keydown", onUser);
    return () => {
      clearTimeout(t); stop();
      window.removeEventListener("wheel", onUser);
      window.removeEventListener("touchstart", onUser);
      window.removeEventListener("mousedown", onUser);
      window.removeEventListener("keydown", onUser);
    };
  }, [start, stop]);

  return (
    <>
      {pos && (
        <div
          aria-hidden
          className={`pointer-events-none fixed left-0 top-0 z-50 transition-all duration-[450ms] ease-[cubic-bezier(.6,0,.2,1)] ${running ? "opacity-100" : "opacity-0"}`}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" className="fill-foreground stroke-background drop-shadow-lg" strokeWidth="1.5">
            <path d="M4 2l16 9-7 2-3 7z" />
          </svg>
          <span className={`ml-5 -mt-1 block w-max rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg transition-all duration-300 ${pos.label ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
            {pos.label}
          </span>
        </div>
      )}
      <div className="fixed bottom-4 left-4 z-50">
        {running ? (
          <button onMouseDown={(e) => e.stopPropagation()} onClick={stop}
            className="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-lg hover:text-foreground">
            <X className="size-3" /> Skip tour · {progress.i}/{progress.n}
          </button>
        ) : (
          <button data-cursor="Replay the tour" onMouseDown={(e) => e.stopPropagation()} onClick={start}
            className="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-lg hover:text-foreground">
            <Play className="size-3" /> Take the tour
          </button>
        )}
      </div>
    </>
  );
}
