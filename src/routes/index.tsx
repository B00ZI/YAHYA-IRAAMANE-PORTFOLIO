import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24' }}
  >
    {name}
  </span>
);

const NAV = [
  { id: "about", label: "About", icon: "person" },
  { id: "education", label: "Education", icon: "school" },
  { id: "projects", label: "Projects", icon: "folder_open" },
  { id: "contact", label: "Contact", icon: "mail" },
];

const TECH = ["Next.js", "React", "TypeScript", "Python", "Laravel", "Node.js", "PostgreSQL", "MySQL"];

const EDUCATION = [
  {
    school: "ESET",
    status: "Graduated",
    title: "Specialized Technician in Computer Science",
    desc: "Core focus on software engineering, database management, and networking fundamentals.",
  },
  {
    school: "Online Resources",
    status: "2023 — Present",
    title: "Self-Taught Web Developer",
    desc: "Deep dive into modern frontend frameworks, responsive design patterns, and full-stack architecture through project-based learning.",
  },
  {
    school: "Almoohdin High School",
    status: "Secondary Education",
    title: "Baccalaureate in Physics & Chemistry",
    desc: "Emphasis on analytical thinking and mathematical problem-solving.",
  },
];

const PROJECTS = [
  {
    tags: ["Laravel", "Vue.js"],
    title: "School Management SaaS Platform",
    summary: "A multi-tenant school administration system handling student data, attendance, and fee management.",
    bullets: [
      "Architected multi-tenant database structure for data isolation.",
      "Integrated secure payment gateway for automated tuition collection.",
    ],
  },
  {
    tags: ["React", "Node.js", "OpenAI"],
    title: "Client Scope & AI Change Order System",
    summary: "Intelligent system for project management that automates change request processing using AI.",
    bullets: [
      "Automated scope-creep detection via natural language processing.",
      "Real-time cost estimation for project adjustments.",
    ],
  },
  {
    tags: ["TypeScript", "Python"],
    title: "AI-to-Kanban Workflow Tool",
    summary: "Converts unstructured meeting notes and audio into actionable Kanban board tasks.",
    bullets: [
      "Speech-to-text integration with task categorization.",
      "Automated priority assignment based on semantic analysis.",
    ],
  },
  {
    tags: ["PHP", "MySQL", "TMDB API"],
    title: "Movie Management App",
    summary: "A personal media catalog tool for tracking watched content and receiving recommendations.",
    bullets: [
      "Integrated TMDB API for rich metadata fetching.",
      "Custom watchlist and user rating system.",
    ],
  },
];

const CONTACT = [
  { label: "Email", value: "iraamaneyahya@gmail.com", href: "mailto:iraamaneyahya@gmail.com" },
  { label: "LinkedIn", value: "in/yahya-iraamane", href: "https://linkedin.com/in/yahya-iraamane" },
  { label: "X", value: "@yahya-iraamane", href: "https://x.com/yahya-iraamane" },
  { label: "GitHub", value: "github/iraamane", href: "https://github.com/iraamane" },
  { label: "WhatsApp", value: "+212 600 000000", href: "https://wa.me/212600000000" },
];

function Portfolio() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/70 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 h-14 flex items-center justify-between">
          <a href="#top" className="label-mono">Y. Iraamane</a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`label-mono transition-colors ${active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span className="text-muted-foreground/60 mr-2">0{i + 1}</span>{n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full border hairline px-4 py-1.5 text-xs font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            <Icon name="download" className="!text-base" /> Download CV
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-32 pb-24 md:pt-44 md:pb-40 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="label-mono text-muted-foreground mb-8 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Available for select engagements — 2026
          </div>
          <h1 className="font-display text-[14vw] md:text-[10rem] leading-[0.85] tracking-[-0.05em]">
            YAHYA
            <br />
            <span className="italic font-light">Iraamane</span>
          </h1>
          <div className="mt-12 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 md:col-start-7">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Full Stack Developer. I build end-to-end web applications and SaaS products that marry bulletproof backend logic with fast, responsive user interfaces.
              </p>
              <p className="mt-6 label-mono text-muted-foreground">Based in Marrakesh, Morocco</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" number="01" title="About Me">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <h3 className="font-display text-3xl md:text-5xl leading-tight tracking-tight">
              Bridging technical complexity with intuitive design.
            </h3>
            <p className="mt-8 max-w-2xl text-foreground/75 leading-relaxed">
              I am a Full-Stack Developer with a focus on creating efficient, scalable, and user-centric web applications. My expertise spans from architecting robust backends using Laravel and PHP to building dynamic frontends with React and Vue.js. I thrive in environments that challenge me to solve complex problems through clean, maintainable code.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="label-mono text-muted-foreground mb-5">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full border hairline text-sm hover:border-foreground transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section id="education" number="02" title="Education">
        <ol className="divide-y hairline border-y hairline">
          {EDUCATION.map((e) => (
            <li key={e.title} className="group grid md:grid-cols-12 gap-6 py-8 md:py-10">
              <div className="md:col-span-4">
                <div className="label-mono text-foreground">{e.school}</div>
                <div className="text-xs text-muted-foreground mt-1">{e.status}</div>
              </div>
              <div className="md:col-span-8">
                <h4 className="font-display text-2xl md:text-3xl leading-tight">{e.title}</h4>
                <p className="mt-3 text-foreground/70 leading-relaxed max-w-xl">{e.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Projects */}
      <Section id="projects" number="03" title="Projects">
        <div className="grid md:grid-cols-2 gap-px bg-[var(--color-hairline)] border hairline">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="group bg-background p-8 md:p-10 flex flex-col gap-6 hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="label-mono text-muted-foreground">{t}</span>
                ))}
              </div>
              <h4 className="font-display text-2xl md:text-3xl leading-tight">{p.title}</h4>
              <p className="text-foreground/70 leading-relaxed">{p.summary}</p>
              <ul className="space-y-2 text-sm text-foreground/75">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="text-accent mt-1">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4">
                <button className="inline-flex items-center gap-2 label-mono group/btn">
                  Case Study
                  <Icon name="arrow_forward" className="!text-base transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" number="04" title="Contact">
        <h3 className="font-display text-4xl md:text-7xl leading-[0.95] tracking-tight max-w-4xl">
          Let's build something <span className="italic font-light">end-to-end.</span>
        </h3>
        <div className="mt-14 grid md:grid-cols-2 gap-px bg-[var(--color-hairline)] border-y hairline">
          {CONTACT.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group bg-background flex items-center justify-between p-6 md:p-8 hover:bg-surface transition-colors"
            >
              <div>
                <div className="label-mono text-muted-foreground">{c.label}</div>
                <div className="mt-2 text-lg md:text-xl font-medium">{c.value}</div>
              </div>
              <Icon name="arrow_outward" className="text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </a>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="px-6 md:px-10 pt-24 pb-32 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="font-display text-[12vw] md:text-[8rem] leading-[0.85] tracking-[-0.05em]">
            IRAAMANE<span className="text-accent">.</span>
          </div>
          <div className="mt-10 pt-6 border-t hairline flex flex-col md:flex-row md:justify-between gap-3 label-mono text-muted-foreground">
            <span>© 2026 Yahya Iraamane — All rights reserved</span>
            <span>Full stack rigor · Marrakesh, Morocco</span>
          </div>
        </div>
      </footer>

      {/* Mobile floating nav */}
      <nav className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={`flex flex-col items-center px-3 py-1.5 rounded-full transition ${active === n.id ? "bg-background/15" : "opacity-60"}`}
          >
            <Icon name={n.icon} className="!text-[20px]" />
            <span className="text-[9px] mt-0.5 tracking-wider uppercase">{n.label.slice(0, 4)}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-6 md:px-10 py-24 md:py-36 border-t hairline scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="label-mono text-muted-foreground mb-12 flex items-center gap-4">
          <span>{number}</span>
          <span className="h-px w-12 bg-[var(--color-hairline)]" />
          <span>{title}</span>
        </div>
        {children}
      </div>
    </section>
  );
}
