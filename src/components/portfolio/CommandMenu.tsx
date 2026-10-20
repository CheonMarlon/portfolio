import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { profile, projects } from "@/data/portfolio";
import { Github, Linkedin, Mail, Hash, Copy } from "lucide-react";
import { toast } from "sonner";

export function CommandMenu({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(!open); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, setOpen]);

  const go = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const ext = (url: string) => { setOpen(false); window.open(url, "_blank"); };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {["work", "github", "about", "experience", "contact"].map((s) => (
            <CommandItem key={s} onSelect={() => go(s)}><Hash />{s.charAt(0).toUpperCase() + s.slice(1)}</CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Projects">
          {projects.map((p) => <CommandItem key={p.slug} onSelect={() => go(p.slug)}><Hash />{p.title}</CommandItem>)}
        </CommandGroup>
        <CommandGroup heading="Links">
          <CommandItem onSelect={() => ext(`https://github.com/${profile.github}`)}><Github />GitHub</CommandItem>
          <CommandItem onSelect={() => ext(profile.linkedin)}><Linkedin />LinkedIn</CommandItem>
          <CommandItem onSelect={() => ext(`mailto:${profile.email}`)}><Mail />Send email</CommandItem>
          <CommandItem onSelect={() => { navigator.clipboard.writeText(profile.email); toast.success("Email copied"); setOpen(false); }}><Copy />Copy email</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
