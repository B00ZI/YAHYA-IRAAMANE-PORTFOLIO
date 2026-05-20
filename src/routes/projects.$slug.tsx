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
        <Link to="/" className="mt-6 inline-block label-mono underline">← Back to portfolio</Link>
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/70 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 h-14 flex items-center justify-between">
          <Link to="/" className="label-mono inline-flex items-center gap-2">
            <Icon name="arrow_back" className="!text-base" /> Back to work
          </Link>
          <nav className="hidden md:flex items-center gap-3 label-mono text-muted-foreground">
            <Link to="/" hash="about" className="hover:text-foreground">About</Link>
            <span>/</span>
            <Link to="/" hash="projects" className="hover:text-foreground">Projects</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[260px]">{project.title}</span>
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
          <p className="mt-10 max-w-2xl text-lg md:text-xl text-foreground/80 leading-relaxed">
            {project.summary}
          </p>
        </div>
      </section>

      {/* Meta strip */}
      <section className="px-6 md:px-10 border-y hairline">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 hairline">
          {[
            { label: "Year", value: project.year },
            { label: "Role", value: project.role },
            { label: "Client", value: project.client },
            { label: "Status", value: project.status },
          ].map((m) => (
            <div key={m.label} className="p-6 md:p-8 first:border-l-0">
              <div className="label-mono text-muted-foreground">{m.label}</div>
              <div className="mt-2 font-medium">{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <Block number="01" title="Overview">
        <p className="text-lg md:text-2xl leading-relaxed text-foreground/85 max-w-3xl font-display tracking-tight">
          {project.overview}
        </p>
      </Block>

      {/* Challenge */}
      <Block number="02" title="The Challenge">
        <p className="max-w-3xl text-foreground/75 leading-relaxed text-lg">
          {project.challenge}
        </p>
      </Block>

      {/* Approach */}
      <Block number="03" title="Approach">
        <ol className="grid md:grid-cols-2 gap-px bg-[var(--color-hairline)] border hairline">
          {project.approach.map((a, i) => (
            <li key={i} className="bg-background p-6 md:p-8 flex gap-5">
              <span className="label-mono text-accent">0{i + 1}</span>
              <span className="text-foreground/85 leading-relaxed">{a}</span>
            </li>
          ))}
        </ol>
      </Block>

      {/* Outcomes */}
      <Block number="04" title="Outcomes">
        <div className="grid md:grid-cols-3 gap-px bg-[var(--color-hairline)] border hairline">
          {project.outcomes.map((o) => (
            <div key={o.label} className="bg-background p-8 md:p-10">
              <div className="font-display text-4xl md:text-6xl tracking-tight">{o.value}</div>
              <div className="label-mono text-muted-foreground mt-4">{o.label}</div>
            </div>
          ))}
        </div>
      </Block>

      {/* Stack */}
      <Block number="05" title="Stack">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="px-4 py-2 rounded-full border hairline text-sm hover:border-foreground transition-colors">
              {s}
            </span>
          ))}
        </div>
      </Block>

      {/* Prev / Next nav */}
      <section className="px-6 md:px-10 py-16 border-t hairline">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-px bg-[var(--color-hairline)] border hairline">
          <Link
            to="/projects/$slug"
            params={{ slug: prev.slug }}
            className="group bg-background p-8 md:p-10 flex flex-col gap-3 hover:bg-surface transition-colors"
          >
            <span className="label-mono text-muted-foreground inline-flex items-center gap-2">
              <Icon name="arrow_back" className="!text-base group-hover:-translate-x-1 transition-transform" /> Previous
            </span>
            <span className="font-display text-2xl md:text-3xl leading-tight">{prev.title}</span>
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group bg-background p-8 md:p-10 flex flex-col gap-3 md:items-end md:text-right hover:bg-surface transition-colors"
          >
            <span className="label-mono text-muted-foreground inline-flex items-center gap-2">
              Next <Icon name="arrow_forward" className="!text-base group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="font-display text-2xl md:text-3xl leading-tight">{next.title}</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-24 md:py-36 border-t hairline">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-4xl md:text-7xl leading-[0.95] tracking-tight max-w-4xl">
            Have a project like this in mind?
          </h2>
          <Link
            to="/"
            hash="contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start a conversation <Icon name="arrow_outward" className="!text-base" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-10 border-t hairline label-mono text-muted-foreground">
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
    <section className="px-6 md:px-10 py-20 md:py-28 border-t hairline">
      <div className="mx-auto max-w-7xl">
        <div className="label-mono text-muted-foreground mb-10 flex items-center gap-4">
          <span>{number}</span>
          <span className="h-px w-12 bg-[var(--color-hairline)]" />
          <span>{title}</span>
        </div>
        {children}
      </div>
    </section>
  );
}
