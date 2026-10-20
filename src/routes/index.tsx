import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Command, Copy, Github, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { experience, profile, projects, stack } from "@/data/portfolio";
import { GitHubSection } from "@/components/portfolio/GitHubSection";
import { ProjectMedia } from "@/components/portfolio/ProjectMedia";
import { CommandMenu } from "@/components/portfolio/CommandMenu";
import { LookingAvatar } from "@/components/portfolio/LookingAvatar";
import { GhostCursor } from "@/components/portfolio/GhostCursor";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { CursorLabel } from "@/components/portfolio/CursorLabel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marlon R. Pinpin — Full-stack Developer, Manila" },
      { name: "description", content: "Portfolio of Marlon R. Pinpin, a full-stack developer from Manila building practical web, mobile and AI software." },
      { property: "og:title", content: "Marlon R. Pinpin — Full-stack Developer" },
      { property: "og:description", content: "Selected work, GitHub activity and experience of Marlon R. Pinpin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useManilaTime() {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    f(); const id = setInterval(f, 1000); return () => clearInterval(id);
  }, []);
  return t;
}

function Index() {
  const [open, setOpen] = useState(false);
  const time = useManilaTime();

  useEffect(() => {
    const m = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);

  const copyEmail = () => { navigator.clipboard.writeText(profile.email); toast.success("Email copied"); };

  return (
    <div className="relative min-h-screen">
      <div className="spotlight pointer-events-none fixed inset-0 z-0" />
      <CommandMenu open={open} setOpen={setOpen} />
      <CursorLabel />
      <GhostCursor />

      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <a data-cursor="Back to top" href="#top" className="font-display text-lg font-bold">mp<span className="text-primary">.</span></a>
          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            {["work", "github", "about", "experience", "contact"].map((s) => (
              <a key={s} data-cursor={`Go to ${s}`} href={`#${s}`} className="capitalize transition hover:text-foreground">{s}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
          <ThemeToggle />
          <button data-tour="Press ⌘K to jump anywhere" data-cursor="Open command menu" onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground">
            <Command className="size-3" /> K
          </button>
          </div>
        </div>
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-5xl px-5">
        {/* Hero */}
        <section className="relative py-20 sm:py-28">
          <div className="grid-bg absolute inset-0 -z-10" />
          <div className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
          <div className="reveal flex items-center gap-4">
            <div className="text-sm">
              <p className="font-medium">{profile.name}</p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <span className="ping-dot size-2 rounded-full bg-success" /> Open to opportunities
              </p>
            </div>
          </div>
          <h1 className="reveal mt-10 text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl" style={{ animationDelay: ".1s" }}>
            Building useful<br />things <span className="text-primary">for the web.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: ".2s" }}>
            I'm Marlon, a full-stack developer who works across the whole stack — from the database up to the interface — building practical software that solves real problems.
          </p>
          </div>
          <LookingAvatar data-tour="Hi, I'm Marlon 👋" src={`https://github.com/${profile.github}.png`} className="reveal mx-auto aspect-square w-56 sm:w-72 md:w-full md:max-w-sm" />
          </div>
          <div className="reveal mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: ".3s" }}>
            <a data-tour="See what I've built" data-cursor="Scroll to projects" href="#work" className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              Selected work <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </a>
            <a data-cursor="Visit my GitHub" href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm transition hover:bg-accent"><Github className="size-4" />GitHub</a>
            <button data-tour="Grab my email" data-cursor="Copy to clipboard" onClick={copyEmail} className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm transition hover:bg-accent"><Copy className="size-4" />Copy email</button>
          </div>
          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3 font-mono text-xs text-muted-foreground">
            <span>📍 {profile.location}</span>
            <span>🕒 {time} PHT</span>
            <span>🎓 BSIT · Universidad de Manila · 2027</span>
          </div>
        </section>

        {/* Work */}
        <Section id="work" title="Selected work" sub="Projects I've spent real time on — each taught me how software holds up outside a tutorial.">
          <div className="space-y-24">
            {projects.map((p, i) => (
              <article key={p.slug} id={p.slug} className="grid scroll-mt-24 gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
                <div className={i % 2 ? "md:order-2" : ""}>
                  <p className="font-mono text-xs text-muted-foreground">0{i + 1} — {p.kicker}</p>
                  <h3 className="mt-3 text-3xl font-bold sm:text-4xl">{p.title}</h3>
                  <p className="mt-4 text-muted-foreground">{p.summary}</p>
                  {p.role && <p className="mt-3 text-sm"><span className="text-primary">My part:</span> <span className="text-muted-foreground">{p.role}</span></p>}
                  {p.note && <p className="mt-3 text-sm text-muted-foreground italic">{p.note}</p>}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => <span key={s} className="rounded-md border bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground">{s}</span>)}
                  </div>
                </div>
                <div className={i % 2 ? "md:order-1" : ""}><ProjectMedia project={p} /></div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="github" title="On GitHub" sub="Live activity and recent repositories, pulled straight from my profile.">
          <GitHubSection />
        </Section>

        <Section id="about" title="About">
          <div className="grid gap-6 md:grid-cols-2">
            <p className="text-lg text-muted-foreground">I like understanding how the pieces of a system fit together, so I end up working on both sides — the interface someone actually touches and the API, database and auth underneath.</p>
            <p className="text-lg text-muted-foreground">I'm a fourth-year BSIT student at Universidad de Manila, graduating in 2027. Outside of code I'm into film and directing, which probably explains why I fuss over pacing and detail.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(stack).map(([k, v]) => (
              <div key={k} className="bg-card p-5">
                <p className="font-mono text-xs text-primary">{k}</p>
                <p className="mt-2 text-sm text-muted-foreground">{v.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="relative border-l pl-6">
            {experience.map((e) => (
              <li key={e.title} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[29px] top-1.5 size-2.5 rounded-full bg-primary" />
                <p className="font-mono text-xs text-muted-foreground">{e.when}</p>
                <h3 className="mt-1 font-sans text-lg font-medium tracking-normal">{e.title}</h3>
                <p className="mt-1 text-muted-foreground">{e.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="contact" title="Have something worth building?" sub="Open to software development roles, collaborations and interesting projects. Email is quickest.">
          <div className="flex flex-wrap gap-3">
            <a data-cursor="Send me an email" href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"><Mail className="size-4" />{profile.email}</a>
            <a data-cursor="Open LinkedIn" href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm hover:bg-accent"><Linkedin className="size-4" />LinkedIn <ArrowUpRight className="size-3" /></a>
            <a data-cursor="Visit my GitHub" href={`https://github.com/${profile.github}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm hover:bg-accent"><Github className="size-4" />GitHub <ArrowUpRight className="size-3" /></a>
          </div>
        </Section>

        <footer className="flex flex-wrap justify-between gap-2 border-t py-8 font-mono text-xs text-muted-foreground">
          <span>© 2026 {profile.name}</span>
          <span>Press <kbd className="rounded border px-1">⌘K</kbd> to navigate</span>
        </footer>
      </main>
    </div>
  );
}

function Section({ id, title, sub, children }: { id: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t py-20 sm:py-24">
      <div className="mb-12 max-w-2xl">
        <h2 className="text-3xl font-bold sm:text-5xl">{title}</h2>
        {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
      </div>
      {children}
    </section>
  );
}
