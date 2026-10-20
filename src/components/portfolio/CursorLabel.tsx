import { useEffect, useRef, useState } from "react";

/** Floating pill that follows the cursor and shows the hovered element's data-cursor label. */
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(el?.dataset["cursor"] ?? "");
    };
    const tick = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      if (ref.current) ref.current.style.transform = `translate(${cx + 16}px, ${cy + 18}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-50">
      <span
        className={`block whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg transition-all duration-200 ${label ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
      >
        {label}
      </span>
    </div>
  );
}
