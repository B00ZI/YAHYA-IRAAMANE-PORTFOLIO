import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/data/projects";
import { ThemeToggle } from "@/components/theme-toggle";

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

const TECH = [
  "JavaScript",
  "TypeScript",
  "PHP",
  "Python",
  "SQL",
  "React.js",
  "Next.js",
  "Laravel",
  "PostgreSQL",
  "MySQL",
];

const EDUCATION = [
      {
   school: "Self-Taught",
   status: "2023 - Present",
   title: "Full-Stack Web Development",
   desc: "Driven by a genuine interest in web development and continuous learning. Constantly exploring new technologies, refining my skills, and figuring out how things work under the hood by building real projects.",
  },
  {
    school: "ESET, Marrakesh",
    status: "10/2024 - 09/2026",
    title: "Specialized Technician in Computer Science",
    desc: "Relevant Coursework: Full-Stack Web Development, Python, Databases, Algorithms, Computer Networks.",
  },

  {
    school: "High School, Marrakesh",
    status: "10/2022 - 07/2023",
    title: "Baccalaureate in Physics & Chemistry",
    desc: "Focused on analytical problem solving, physics, and chemistry fundamentals.",
  },
];

const CONTACT = [
  { label: "Email", value: "iraamaneyahya@gmail.com", href: "mailto:iraamaneyahya@gmail.com" },
  { label: "Phone", value: "+212 771 887 838", href: "tel:+212771887838" },
  { label: "LinkedIn", value: "in/yahya-iraamane", href: "https://linkedin.com/in/yahya-iraamane" },
  { label: "GitHub", value: "github/B00ZI", href: "https://github.com/B00ZI" },
  { label: "X", value: "@yahya-iraamane", href: "https://x.com/yahya-iraamane" },
  { label: "WhatsApp", value: "+212 631 125 909", href: "https://wa.me/212631125909" },
];

function Portfolio() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
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
          <a href="#top" className="label-mono">y.Iraamane</a>
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
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/Yahya-Iraamane-CV.pdf"
              download="Yahya-Iraamane-CV.pdf"
              className="hidden md:inline-flex items-center gap-2 rounded-full border hairline px-4 py-1.5 text-xs font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              <Icon name="download" className="!text-base" /> Download CV
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative pt-32 pb-24 md:pt-44 md:pb-40 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="label-mono text-muted-foreground mb-8 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Open to new opportunities
          </div>
          <h1 className="font-display text-[14vw] md:text-[10rem] leading-[0.85] tracking-[-0.05em]">
            YAHYA
            <br />
            <span className="italic font-light">Iraamane.</span>
          </h1>
          <div className="mt-12 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 md:col-start-7">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
               I’m a full-stack developer who builds web apps and SaaS platforms from the database schema up to the user interface. I mostly work with Next.js and Laravel, focusing on clean code, secure APIs, and building fast, highly responsive experiences.
              </p>
                <p className="mt-6 label-mono text-muted-foreground">
                Marrakesh, Morocco
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" number="01" title="About Me">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <h3 className="font-display text-3xl md:text-5xl leading-tight tracking-tight">
            Turning ideas into working solutions.
            </h3>
            <p className="mt-8 max-w-2xl text-foreground/75 leading-relaxed">
            I find problems to solve from my own daily life or from what I see people talking about online. By using AI to handle the heavy lifting, I can quickly turn those ideas into real, working software.

    My tech choice depends on the project. I use Next.js for frontends, Laravel or Node.js for backend logic, and Supabase to spin up user accounts and databases quickly. I focus on finding the right tool for the problem and just building it.
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
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group bg-background p-8 md:p-10 flex flex-col gap-6 hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="label-mono text-muted-foreground border rounded-2xl p-1 px-3" >{t}</span>
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
                <span className="inline-flex items-center gap-2 label-mono">
                  View Project
                  <Icon name="arrow_forward" className="!text-base transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" number="04" title="Contact">
        <h3 className="font-display text-4xl md:text-7xl leading-[0.95] tracking-tight max-w-4xl">
          Have an idea?  <span className="italic font-light">Let's build it.</span>
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
      <footer className="px-6 md:px-10 pt-20 pb-32 md:pb-6">
        <div className="mx-auto max-w-7xl">
          <div className="font-display text-[12vw] md:text-[8rem] leading-[0.85] tracking-[-0.05em]">
            IRAAMANE<span className="text-accent">.</span>
          </div>
          <div className="mt-10 pt-6 border-t hairline flex flex-col md:flex-row md:justify-between gap-3 label-mono text-muted-foreground">
            <span>© 2026 Yahya Iraamane — All rights reserved</span>
            <span>Full stack developer  · Marrakesh · Morocco</span>
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
        <div className="label-mono  text-muted-foreground mb-12 flex items-center gap-4">
          <span className="text-lg">{number}</span>
          <span className="h-px w-12  bg-[var(--color-hairline)]" />
          <span className="text-lg">{title}</span>
        </div>
        {children}
      </div>
    </section>
  );
}
