import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, PROJECTS, type Project } from "@/data/projects";
import { ThemeToggle } from "@/components/theme-toggle";

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
        <Link to="/" className="mt-6 inline-block label-mono underline">Back to portfolio</Link>
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

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];

  const demoUrl = "#"; 
  const repoUrl = "https://github.com/BOOZI";
  const projectImage = `/images/projects/${project.slug}.png`; 

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/70 border-b hairline border-[var(--color-hairline)]">
        <div className="mx-auto max-w-7xl px-6 md:px-10 h-14 flex items-center justify-between">
          <Link to="/" hash="projects" className="label-mono inline-flex items-center gap-2">
            <Icon name="arrow_back" className="!text-base" /> Back to portfolio
          </Link>
          <nav className="hidden md:flex items-center gap-3 label-mono text-muted-foreground">
            <Link to="/" hash="projects" className="hover:text-foreground">Projects</Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {project.tags.map((t) => (
              <span key={t} className="label-mono text-muted-foreground border hairline rounded-full px-3 py-1">
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9] tracking-[-0.04em]">
            {project.title}
          </h1>
          <p className="mt-10 max-w-2xl text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
            {project.summary}
          </p>

          {/* Action Buttons Strip */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-foreground text-background px-6 py-3 text-sm font-mono font-medium hover:opacity-90 transition-all hover:gap-3"
            >
              Launch Live Demo <Icon name="arrow_outward" className="!text-base" />
            </a>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border hairline border-[var(--color-hairline)] px-6 py-3 text-sm font-mono text-foreground hover:bg-surface transition-colors"
            >
              Repository <Icon name="code" className="!text-base" />
            </a>
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section className="px-6 md:px-10 border-y hairline border-[var(--color-hairline)]">
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

      {/* STEP 1: Context */}
      <Block number="01" title="Context">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="label-mono text-xs text-muted-foreground tracking-widest uppercase">Overview</div>
              <p className="text-xl md:text-3xl leading-relaxed text-foreground/85 font-display tracking-tight font-light">
                {project.overview}
              </p>
            </div>
            
            <div className="space-y-4 pt-8 border-t hairline border-[var(--color-hairline)]/40">
              <div className="label-mono text-xs text-muted-foreground tracking-widest uppercase">The Challenge</div>
              <p className="text-base md:text-lg text-foreground/75 leading-relaxed font-light">
                {project.challenge}
              </p>
            </div>
          </div>
          
          <div className="border hairline border-[var(--color-hairline)] p-2 bg-surface/20 rounded-lg w-full aspect-video lg:aspect-[4/3] relative overflow-hidden group lg:sticky lg:top-24">
            <img
              src={projectImage}
              alt={`${project.title} Interface`}
              className="w-full h-full object-cover object-top rounded grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      </Block>

      {/* STEP 2: Stack (Dynamic choices pulled straight out of your project array) */}
      <Block number="02" title="Stack">
        <div className="space-y-12 max-w-5xl">
          <div className="flex flex-wrap gap-3">
            {project.stack.map((s) => (
              <span key={s} className="px-5 py-2.5 rounded-full border hairline border-[var(--color-hairline)] text-sm md:text-base font-light bg-surface/30">
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

      {/* STEP 3: Approach (Dynamic 4-item clean grid pulled straight out of your project array) */}
      <Block number="03" title="Approach">
        <ol className="grid md:grid-cols-2 gap-px bg-[var(--color-hairline)] border hairline">
          {project.approach?.map((step, i) => (
            <li key={i} className="bg-background p-6 md:p-8 flex gap-5">
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
            <div key={o.label} className="bg-background p-8 md:p-10">
              <div className="font-display text-4xl md:text-6xl tracking-tight font-medium text-foreground">{o.value}</div>
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
              <Icon name="arrow_back" className="!text-base group-hover:-translate-x-1 transition-transform" /> Previous
            </span>
            <span className="font-display text-2xl md:text-3xl leading-tight font-light">{prev.title}</span>
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group bg-background p-8 md:p-10 flex flex-col gap-3 md:items-end md:text-right hover:bg-surface transition-colors"
          >
            <span className="label-mono text-muted-foreground inline-flex items-center gap-2">
              Next <Icon name="arrow_forward" className="!text-base group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="font-display text-2xl md:text-3xl leading-tight font-light">{next.title}</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-24 md:py-36 border-t hairline border-[var(--color-hairline)]">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl md:text-7xl leading-[0.95] tracking-tight max-w-4xl font-light">
            Have a project like this in mind?
          </h2>
          <Link
            to="/"
            hash="contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
          >
            Start a conversation <Icon name="arrow_outward" className="!text-base" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-10 border-t hairline border-[var(--color-hairline)] label-mono text-muted-foreground">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:justify-between gap-3">
          <span>© 2026 Yahya Iraamane</span>
          <Link to="/" className="hover:text-foreground">Back to portfolio →</Link>
        </div>
      </footer>
    </div>
  );
}

function Block({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 border-t hairline border-[var(--color-hairline)]">
      <div className="mx-auto max-w-7xl">
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