import { useEffect, useRef, useState } from "react";

/** Avatar that turns toward the cursor. Pass `frames` (3x3 grid: up-left..down-right) for a real "face follows" effect. */
export function LookingAvatar({ src, frames, className = "", ...rest }: { src: string; frames?: string[]; className?: string; [k: `data-${string}`]: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const m = (e: MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.max(Math.hypot(dx, dy), 1);
      const s = Math.min(d / 300, 1);
      setV({ x: (dx / d) * s, y: (dy / d) * s });
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);

  const col = v.x < -0.33 ? 0 : v.x > 0.33 ? 2 : 1;
  const row = v.y < -0.33 ? 0 : v.y > 0.33 ? 2 : 1;
  const img = frames?.length === 9 ? frames[row * 3 + col] : src;

  return (
    <div ref={ref} {...rest} className={`[perspective:400px] ${className}`}>
      <div
        className="relative size-full overflow-hidden rounded-full border bg-card transition-transform duration-200 ease-out"
        style={{ transform: `rotateY(${v.x * 22}deg) rotateX(${-v.y * 22}deg)` }}
      >
        <img
          src={img}
          alt="Marlon"
          className="size-full scale-110 object-cover transition-transform duration-200 ease-out"
          style={{ transform: `translate(${v.x * 6}px, ${v.y * 6}px) scale(1.1)` }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: `radial-gradient(circle at ${50 + v.x * 40}% ${50 + v.y * 40}%, color-mix(in oklab, var(--primary) 25%, transparent), transparent 60%)` }}
        />
      </div>
    </div>
  );
}
