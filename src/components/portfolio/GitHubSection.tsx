import { useQuery } from "@tanstack/react-query";
import { Star, GitFork, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Repo = {
  id: number; name: string; html_url: string; description: string | null;
  language: string | null; stargazers_count: number; forks_count: number;
  pushed_at: string; fork: boolean;
};
type User = { public_repos: number; followers: number; avatar_url: string };

const heat = ["bg-heat-0", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"];

export function GitHubSection() {
  const u = profile.github;
  const contrib = useQuery({
    queryKey: ["contrib", u],
    queryFn: async () => {
      const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${u}?y=last`);
      if (!r.ok) throw new Error("contrib");
      return (await r.json()) as { total: Record<string, number>; contributions: Day[] };
    },
    staleTime: 3600_000,
  });
  const repos = useQuery({
    queryKey: ["repos", u],
    queryFn: async () => {
      const r = await fetch(`https://api.github.com/users/${u}/repos?sort=pushed&per_page=12`);
      if (!r.ok) throw new Error("repos");
      return ((await r.json()) as Repo[]).filter((x) => !x.fork).slice(0, 6);
    },
    staleTime: 3600_000,
  });
  const user = useQuery({
    queryKey: ["ghuser", u],
    queryFn: async () => (await (await fetch(`https://api.github.com/users/${u}`)).json()) as User,
    staleTime: 3600_000,
  });

  const days = contrib.data?.contributions ?? [];
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  const total = contrib.data ? Object.values(contrib.data.total)[0] : undefined;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{total ?? "—"}</span> contributions in the last year
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>{user.data?.public_repos ?? "—"} repos</span>
            <span>{user.data?.followers ?? "—"} followers</span>
            <a data-cursor="View profile" href={`https://github.com/${u}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">@{u}</a>
          </div>
        </div>
        <div className="overflow-x-auto pb-1">
          <div className="flex gap-[3px]">
            {(weeks.length ? weeks : Array.from({ length: 53 }, () => Array(7).fill(null))).map((w, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {w.map((d: Day | null, j: number) => (
                  <div
                    key={j}
                    title={d ? `${d.count} on ${d.date}` : ""}
                    className={`size-[11px] rounded-[3px] ${d ? heat[d.level] : "bg-heat-0 animate-pulse"}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-1 text-xs text-muted-foreground">
          Less {heat.map((h) => <span key={h} className={`size-[10px] rounded-[2px] ${h}`} />)} More
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {repos.isError && <p className="text-sm text-muted-foreground">Couldn't load repositories right now.</p>}
        {(repos.data ?? Array.from({ length: 6 }, () => null)).map((r, i) =>
          r ? (
            <a key={r.id} data-cursor={`Open ${r.name}`} href={r.html_url} target="_blank" rel="noreferrer"
              className="group flex flex-col rounded-xl border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-sans text-[15px] font-medium tracking-normal">{r.name}</h3>
                <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
              </div>
              <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">{r.description ?? "No description"}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                {r.language && <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" />{r.language}</span>}
                <span className="flex items-center gap-1"><Star className="size-3" />{r.stargazers_count}</span>
                <span className="flex items-center gap-1"><GitFork className="size-3" />{r.forks_count}</span>
              </div>
            </a>
          ) : (
            <div key={i} className="h-[118px] animate-pulse rounded-xl border bg-card" />
          ),
        )}
      </div>
    </div>
  );
}
