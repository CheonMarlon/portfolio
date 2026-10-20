import { useState } from "react";
import { Play, ImageIcon } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ProjectMedia({ project }: { project: Project }) {
  const hasVideo = project.slug === "brgy-ai";
  const tabs = [...(hasVideo ? ["Demo"] : []), ...project.mockups.map((m) => m.caption)];
  const [active, setActive] = useState(0);
  const isVideo = hasVideo && active === 0;
  const mock = project.mockups[active - (hasVideo ? 1 : 0)];

  return (
    <div>
      <div data-cursor={isVideo ? "Watch demo" : "Preview"} className="relative aspect-[16/10] overflow-hidden rounded-2xl border bg-muted">
        {isVideo ? (
          project.video ? (
            <video src={project.video} controls playsInline className="size-full object-cover" />
          ) : (
            <Placeholder icon={<Play className="size-5" />} label="Demo video coming soon" />
          )
        ) : mock?.src ? (
          <img src={mock.src} alt={mock.caption} className="size-full object-cover object-top" loading="lazy" />
        ) : mock?.device === "phone" ? (
          <div className="flex size-full items-center justify-center">
            <div className="flex h-[85%] aspect-[9/19] items-center justify-center rounded-[1.6rem] border-4 border-accent bg-card text-center text-xs text-muted-foreground">
              <span className="px-3"><ImageIcon className="mx-auto mb-2 size-4" />{mock.caption}<br />mockup soon</span>
            </div>
          </div>
        ) : (
          <div className="flex size-full flex-col p-4">
            <div className="flex gap-1.5 pb-3">
              <span className="size-2.5 rounded-full bg-accent" /><span className="size-2.5 rounded-full bg-accent" /><span className="size-2.5 rounded-full bg-accent" />
            </div>
            <div className="flex-1 rounded-lg border bg-card">
              <Placeholder icon={<ImageIcon className="size-5" />} label={`${mock?.caption} · mockup soon`} />
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button key={t} data-cursor={i === 0 && hasVideo ? "Play demo" : "View mockup"} onClick={() => setActive(i)}
            className={`rounded-full border px-3 py-1 text-xs transition ${i === active ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {i === 0 && hasVideo ? "▶ Demo" : t}
          </button>
        ))}
      </div>
    </div>
  );
}

function Placeholder({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="grid-bg flex size-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
      <span className="grid size-11 place-items-center rounded-full border bg-background text-primary">{icon}</span>
      {label}
    </div>
  );
}
