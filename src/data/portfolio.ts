export const profile = {
  name: "Marlon R. Pinpin",
  github: "CheonMarlon",
  email: "marlonrimandopinpin@gmail.com",
  linkedin: "https://www.linkedin.com/in/marlon-pinpin/",
  location: "Manila, Philippines",
};

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  role?: string;
  stack: string[];
  /** Demo video URL (only BRGY-AI has one). */
  video?: string;
  /** App mockup image URLs. Add them here when ready. */
  mockups: { src?: string; caption: string; device?: "desktop" | "phone" }[];
  repo?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "brgy-ai",
    title: "BRGY-AI",
    kicker: "Capstone · Barangay 134 · Sole developer",
    summary:
      "A retrieval-augmented assistant that helps barangay officials look up legal information and draft documents for dispute resolution. Semantic retrieval over a verified knowledge base, grounded LLM answers, an admin dashboard and a resident mobile app.",
    role: "All of it — architecture, legal flow, dashboard, mobile app, PDF certificate generation and the debugging in between.",
    stack: ["Next.js", "React Native", "Node.js", "TypeScript", "Express", "Supabase", "PostgreSQL", "PDFKit", "Gemini", "Groq"],
    // video: "https://...mp4",
    mockups: [
      { caption: "Admin dashboard", device: "desktop" },
      { caption: "Bilingual knowledge base", device: "desktop" },
      { caption: "Resident mobile app", device: "phone" },
    ],
  },
  {
    slug: "dear-stranger",
    title: "Dear Stranger",
    kicker: "Web app · Sole developer",
    summary:
      "An anonymous letter-sharing platform. Write a letter or read someone else's — no account needed. Browse by discovery, pagination or shuffle, or dig through the archive.",
    stack: ["HTML", "CSS", "JavaScript", "Firebase", "Firestore", "Azure VM"],
    mockups: [
      { caption: "Home and letter discovery", device: "desktop" },
      { caption: "Writing a letter", device: "desktop" },
    ],
  },
  {
    slug: "obstellar",
    title: "OBStellar",
    kicker: "Native Android · Sole developer",
    summary:
      "An Android app for exploring the coordinates of real constellations, making astronomical data easy to read and fun to poke around in.",
    stack: ["Kotlin", "Android"],
    mockups: [
      { caption: "Constellation list", device: "phone" },
      { caption: "Coordinates view", device: "phone" },
      { caption: "Detail screen", device: "phone" },
    ],
  },
  {
    slug: "seminar-system",
    title: "Seminar Attendance & Feedback",
    kicker: "Automation · Google Workspace",
    summary:
      "Collects attendance and feedback through Google Forms, generates certificates, emails them to participants and drafts the narrative report — far less manual documentation.",
    stack: ["Apps Script", "Forms", "Sheets", "Drive", "Gmail"],
    mockups: [
      { caption: "Attendance form", device: "desktop" },
      { caption: "Generated certificate", device: "desktop" },
      { caption: "Narrative report", device: "desktop" },
    ],
  },
  {
    slug: "fili",
    title: "FILI",
    kicker: "Product concept · Jamsoric Media",
    summary:
      "A short-form drama streaming app concept focused on episode discovery, token-based access and how short-form entertainment is presented.",
    stack: ["Product design", "Figma"],
    note: "Concept and product design — not a deployed production service.",
    mockups: [
      { caption: "Episode discovery", device: "phone" },
      { caption: "Token access", device: "phone" },
    ],
  },
];

export const experience = [
  { when: "Ongoing", title: "Full-stack & academic software projects", body: "Web, backend, mobile and AI-powered projects through my BSIT program, including the BRGY-AI capstone." },
  { when: "Sep 2025", title: "Technical volunteer, IT seminar", body: "Handled the technical side of an IT seminar at Universidad de Manila." },
  { when: "Feb 2025", title: "1st Place, Battle of the Codes", body: "Lead programmer on a four-person team solving Python challenges during CET Week." },
];

export const stack: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"],
  Backend: ["Node.js", "Express", "Python", "Flask", "REST APIs", "JWT"],
  Data: ["PostgreSQL", "MySQL", "Supabase", "Firestore"],
  Mobile: ["React Native", "Expo", "Kotlin"],
  "AI": ["Gemini", "Groq", "Semantic retrieval"],
  Tools: ["Git", "GitHub", "Postman", "Figma", "Apps Script", "Azure"],
};
