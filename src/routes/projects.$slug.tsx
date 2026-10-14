import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, PROJECTS, type Project } from "@/data/projects";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Yahya Iraamane` },
          { name: "description", content: loaderData.project.summary },
          { property: "og:title", content: loaderData.project.title },
          { property: "og:description", content: loaderData.project.summary },
        ]
      : [],
  }),
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center">
        <div className="label-mono text-muted-foreground">404</div>
        <h1 className="font-display text-4xl mt-3">Project not found</h1>
        <Link to="/" className="mt-6 inline-block label-mono underline">
          Back to portfolio
        </Link>
      </div>
    </div>
  ),
});

const Icon = ({ name, className = "" }: { name: string; className?: string }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{ fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24' }}
  >
    {name}
  </span>
);

// High-performance custom scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, revealClass: `transition-all duration-1000 ease-out ${hasRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}` };
}

const CONTACT = [
  { label: "Email", value: "iraamaneyahya@gmail.com", href: "mailto:iraamaneyahya@gmail.com" },
  { label: "Phone", value: "+212 771 887 838", href: "tel:+212771887838" },
  { label: "LinkedIn", value: "in/yahya-iraamane", href: "https://linkedin.com/in/yahya-iraamane" },
  { label: "GitHub", value: "github/B00ZI", href: "https://github.com/B00ZI" },
  { label: "X", value: "@yahya-iraamane", href: "https://x.com/yahya-iraamane" },
  { label: "WhatsApp", value: "+212 631 125 909", href: "https://wa.me/212631125909" },
];

function ProjectDetail() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { project } = Route.useLoaderData() as { project: Project };
  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];

  const projectImage = `/images/projects/${project.slug}.png`;

  useEffect(() => {
    setIsContactOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project.slug]);

  return (
    <div className="project-detail-page min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background overflow-x-hidden">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/70 border-b hairline border-[var(--color-hairline)]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 h-14 flex items-center justify-between">
          <Link to="/" hash="projects" className="label-mono inline-flex items-center gap-2 hover:opacity-75 transition-opacity">
            <Icon name="arrow_back" className="!text-base" /> Back to portfolio
          </Link>
          <nav className="hidden md:flex items-center gap-3 label-mono text-muted-foreground">
            <Link to="/" hash="projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/Yahya-Iraamane-Full-Stack-Developer.pdf"
              download="Yahya-Iraamane-Full-Stack-Developer.pdf"
              className="inline-flex items-center gap-2 rounded-full border hairline px-3 py-1.5 text-[0.65rem] font-mono font-medium text-foreground hover:bg-foreground hover:text-background transition-all duration-300 active:scale-95 md:px-4 md:text-xs"
            >
              <Icon name="download" className="!text-base" />
              <span className="hidden min-[380px]:inline">Download CV</span>
              <span className="min-[380px]:hidden">CV</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="project-detail-hero px-6 md:px-10 pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-3 duration-700">
            {project.tags.map((t) => (
              <span
                key={t}
                className="label-mono text-muted-foreground border hairline rounded-full px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-[-0.04em] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 fill-mode-both">
            {project.title}
          </h1>
          <p className="mt-10 max-w-2xl text-lg md:text-xl text-foreground/80 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
            {project.summary}
          </p>

          {/* Action Buttons Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400 fill-mode-both">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-foreground text-background px-6 py-3 text-sm font-mono font-medium hover:opacity-90 transition-all hover:gap-3"
              >
                Launch Live Demo <Icon name="arrow_outward" className="!text-base" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border hairline border-[var(--color-hairline)] px-6 py-3 text-sm font-mono text-foreground hover:bg-surface transition-colors"
              >
                Repository <Icon name="code" className="!text-base" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section className="px-6 md:px-10 border-y hairline border-[var(--color-hairline)] animate-in fade-in duration-1000 delay-500 fill-mode-both">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-hairline)] divide-x divide-y md:divide-y-0 hairline">
          {[
            { label: "Year", value: project.year },
            { label: "Role", value: project.role },
            { label: "Client", value: project.client },
            { label: "Status", value: project.status },
          ].map((m) => (
            <div key={m.label} className="p-6 md:p-8 bg-background first:border-l-0">
              <div className="label-mono text-muted-foreground text-xs">{m.label}</div>
              <div className="mt-2 font-medium">{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STEP 1: Context (Balanced Problem & Solution) */}
      <Block number="01" title="Context">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          <div className="space-y-10">
            {/* The Problem */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="warning" className="!text-base text-red-500" />
                <span className="label-mono text-xs tracking-widest uppercase">The Challenge</span>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 tracking-tight">
                {project.challenge}
              </p>
            </div>

            <div className="h-px bg-[var(--color-hairline)]/60" />

            {/* The Solution */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-foreground">
                <Icon name="check_circle" className="!text-base text-emerald-500" />
                <span className="label-mono text-xs tracking-widest uppercase font-semibold">
                  The Solution
                </span>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed text-foreground tracking-tight font-normal">
                {project.overview}
              </p>
            </div>
          </div>

          {/* Live project preview */}
          <div className="border hairline border-[var(--color-hairline)] p-2 bg-surface/20 rounded-lg w-full aspect-video relative overflow-hidden group lg:sticky lg:top-24">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} live site in a new tab`}
                className="relative block h-full w-full overflow-hidden rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <img
                  src={projectImage}
                  alt={`${project.title} screenshot`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-4 py-2 text-sm font-mono text-white shadow-lg backdrop-blur-sm transition-colors group-hover:bg-black/75">
                  Visit live site
                  <Icon name="arrow_outward" className="!text-base" />
                </span>
              </a>
            ) : (
              <img
                src={projectImage}
                alt={`${project.title} screenshot`}
                className="h-full w-full rounded object-cover object-top"
              />
            )}
          </div>
        </div>
      </Block>

      {/* STEP 2: Stack */}
      <Block number="02" title="Stack">
        <div className="space-y-12 max-w-5xl">
          <div className="flex flex-wrap gap-3">
            {project.stack.map((s) => (
              <span
                key={s}
                className="px-5 py-2.5 rounded-full border hairline border-[var(--color-hairline)] text-sm md:text-base font-light bg-surface/30"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="space-y-10 pl-2">
            <div className="label-mono text-xs text-muted-foreground tracking-widest uppercase">
              Tech Stack Decisions
            </div>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              {project.stackChoices?.map((choice, i) => (
                <div key={i} className="space-y-3">
                  <h5 className="font-display text-xl md:text-2xl text-foreground font-medium tracking-tight">
                    {choice.title}
                  </h5>
                  <p className="text-base text-foreground/75 leading-relaxed font-light">
                    {choice.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Block>

      {/* STEP 3: Approach */}
      <Block number="03" title="Approach">
        <ol className="grid md:grid-cols-2 gap-px bg-[var(--color-hairline)] border hairline">
          {project.approach?.map((step, i) => (
            <li key={i} className="group bg-background p-6 md:p-8 flex gap-5 transition-colors duration-300 hover:bg-surface/70">
              <span className="label-mono text-accent font-medium">0{i + 1}</span>
              <span className="text-foreground/85 leading-relaxed font-light text-sm md:text-base">
                <strong className="font-medium text-foreground block mb-1 text-base font-display tracking-tight">
                  {step.title}
                </strong>
                {step.desc}
              </span>
            </li>
          ))}
        </ol>
      </Block>

      {/* STEP 4: Outcomes */}
      <Block number="04" title="Outcomes">
        <div className="grid md:grid-cols-3 gap-px bg-[var(--color-hairline)] border hairline">
          {project.outcomes.map((o) => (
            <div key={o.label} className="group bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-surface/70">
              <div className="font-display text-4xl md:text-6xl tracking-tight font-medium text-foreground">
                {o.value}
              </div>
              <div className="label-mono text-muted-foreground mt-4">{o.label}</div>
            </div>
          ))}
        </div>
      </Block>

      {/* Prev / Next navigation */}
      <section className="px-6 md:px-10 py-16 border-t hairline border-[var(--color-hairline)]">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-px bg-[var(--color-hairline)] border hairline">
          <Link
            to="/projects/$slug"
            params={{ slug: prev.slug }}
            className="group bg-background p-8 md:p-10 flex flex-col gap-3 hover:bg-surface transition-colors"
          >
            <span className="label-mono text-muted-foreground inline-flex items-center gap-2">
              <Icon
                name="arrow_back"
                className="!text-base group-hover:-translate-x-1 transition-transform duration-300"
              />{" "}
              Previous
            </span>
            <span className="font-display text-2xl md:text-3xl leading-tight font-light">
              {prev.title}
            </span>
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group bg-background p-8 md:p-10 flex flex-col gap-3 md:items-end md:text-right hover:bg-surface transition-colors"
          >
            <span className="label-mono text-muted-foreground inline-flex items-center gap-2">
              Next{" "}
              <Icon
                name="arrow_forward"
                className="!text-base group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
            <span className="font-display text-2xl md:text-3xl leading-tight font-light">
              {next.title}
            </span>
          </Link>
        </div>
      </section>

      {/* CTA Section with Click-to-Toggle Reveal */}
      <section className="px-6 md:px-10 py-24 md:py-36 border-t hairline border-[var(--color-hairline)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl md:text-7xl leading-[0.95] tracking-tight max-w-4xl font-light">
            Have a project like this in mind?{" "}
            <span className="italic text-muted-foreground">Let's build it.</span>
          </h2>

          <button
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all hover:gap-4 shadow-sm"
          >
            {isContactOpen ? "Hide contact options" : "Start a conversation"}
            <Icon name={isContactOpen ? "expand_less" : "expand_more"} className="!text-base" />
          </button>

          {/* Smooth Accordion Wrapper */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isContactOpen ? "max-h-[800px] opacity-100 mt-14" : "max-h-0 opacity-0 mt-0"
            }`}
          >
             <div className=" grid md:grid-cols-2 gap-px bg-[var(--color-hairline)] border-y hairline">
          {CONTACT.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group bg-background flex items-center justify-between p-6 md:p-8 hover:bg-surface transition-all duration-300"
            >
              <div>
                <div className="label-mono text-muted-foreground text-xs tracking-wider uppercase">{c.label}</div>
                <div className="mt-2 text-lg md:text-xl font-medium tracking-tight text-foreground/90 group-hover:text-foreground">{c.value}</div>
              </div>
              <div className="h-10 w-10 rounded-full border border-transparent group-hover:border-[var(--color-hairline)] flex items-center justify-center transition-all duration-300 bg-surface/0 group-hover:bg-background">
                <Icon name="arrow_outward" className="text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all !text-lg" />
              </div>
            </a>
          ))}
        </div>
          </div>
        </div>
      </section>

      {/* Footer - Left untouched exactly as requested */}
      <footer className="px-6 border-t  hairline  md:px-10 pt-20 pb-32 md:pb-6">
        <div className="mx-auto max-w-7xl">
          <div className="font-display text-[12vw] md:text-[8rem] leading-[0.85] tracking-[-0.05em]">
            IRAAMANE<span className="text-accent">.</span>
          </div>
          <div className="mt-10 pt-6 border-t hairline flex flex-col md:flex-row md:justify-between gap-3 label-mono text-muted-foreground">
            <span>© 2026 Yahya Iraamane — bozi</span>
            <span>Full stack developer  · Marrakesh · Morocco</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Animation-aware block component
function Block({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  const { ref, revealClass } = useScrollReveal();

  return (
    <section
      data-section-number={number}
      className="project-detail-section px-6 md:px-10 py-20 md:py-28 border-t hairline border-[var(--color-hairline)]"
    >
      <div ref={ref} className={`mx-auto max-w-7xl ${revealClass}`}>
        <div className="label-mono text-muted-foreground mb-10 flex items-center gap-4">
          <span>{number}</span>
          <span className="h-px w-12 bg-[var(--color-hairline)]" />
          <span className="tracking-wider uppercase text-xs">{title}</span>
        </div>
        {children}
      </div>
    </section>
  );
}