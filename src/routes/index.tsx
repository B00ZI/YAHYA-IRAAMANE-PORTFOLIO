import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
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

// High-performance React hook for minimal scroll-reveal animations
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect(); // Stop observing once animated into view
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
  { label: "LinkedIn", value: "in/yahya-iraamane", href: "https://www.linkedin.com/in/yahya-iraamane-174784396" },
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
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background overflow-x-hidden">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/70 border-b hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 h-14 flex items-center justify-between">
          <a href="#top" className="label-mono hover:opacity-70 transition-opacity">y.Iraamane</a>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`label-mono transition-all duration-300 relative py-1 group ${
                  active === n.id ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-muted-foreground/40 mr-1.5 text-xs">0{i + 1}</span>
                {n.label}
                {/* Micro-bar underline indicator that expands on focus */}
                <span className={`absolute bottom-0 left-0 h-px bg-foreground transition-all duration-300 ${
                  active === n.id ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/Yahya-Iraamane-Full-Stack-Developer.pdf"
              download="Yahya-Iraamane-Full-Stack-Developer.pdf"
              className="hidden md:inline-flex items-center gap-2 rounded-full border hairline px-4 py-1.5 text-xs font-mono font-medium bg-background text-foreground hover:bg-foreground hover:text-background transition-all duration-300 active:scale-95"
            >
              <Icon name="download" className="!text-base" /> Download CV
            </a>
          </div>
        </div>
      </header>

      {/* Hero with smooth initial page layout entry animations */}
      <section id="top" className="relative pt-32 pb-24 md:pt-44 md:pb-40 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="label-mono text-muted-foreground mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-700">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Open to new opportunities
          </div>
          
          <h1 className="font-display text-[14vw] md:text-[10rem] leading-[0.85] tracking-[-0.05em] select-none animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 fill-mode-both">
            YAHYA
            <br />
            <span className="italic font-light text-foreground/90">Iraamane.</span>
          </h1>

          <div className="mt-12 grid md:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
            <div className="md:col-span-5 md:col-start-7">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                I’m a full-stack developer who builds web apps and SaaS platforms from the database schema up to the user interface. I mostly work with Next.js and Laravel, focusing on clean code, secure APIs, and building fast, highly responsive experiences.
              </p>
              <p className="mt-6 label-mono text-muted-foreground inline-flex items-center gap-2">
                <Icon name="location_on" className="!text-sm text-muted-foreground/60" /> Marrakesh, Morocco
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" number="01" title="About Me">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <h3 className="font-display text-3xl md:text-5xl leading-tight tracking-tight text-foreground/95">
              Turning ideas into working solutions.
            </h3>
            <p className="mt-8 max-w-2xl text-foreground/75 leading-relaxed font-light text-base md:text-lg">
              I find problems to solve from my own daily life or from what I see people talking about online. By using AI to handle the heavy lifting, I can quickly turn those ideas into real, working software.
              <br /><br />
              My tech choice depends on the project. I use Next.js for frontends, Laravel or Node.js for backend logic, and Supabase to spin up user accounts and databases quickly. I focus on finding the right tool for the problem and just building it.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="label-mono text-muted-foreground mb-5 text-xs tracking-wider uppercase">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full border hairline text-sm bg-surface/10 text-foreground/80 hover:border-foreground hover:text-foreground hover:bg-surface/40 transition-all duration-300 select-none hover:-translate-y-0.5"
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
            <li key={e.title} className="group grid md:grid-cols-12 gap-6 py-8 md:py-10 transition-all duration-300 hover:px-2">
              <div className="md:col-span-4 transition-transform duration-300 group-hover:translate-x-1">
                <div className="label-mono text-foreground font-medium text-base">{e.school}</div>
                <div className="text-xs text-muted-foreground mt-1.5 font-mono">{e.status}</div>
              </div>
              <div className="md:col-span-8">
                <h4 className="font-display text-2xl md:text-3xl leading-tight text-foreground transition-colors duration-300">{e.title}</h4>
                <p className="mt-3 text-foreground/70 leading-relaxed max-w-xl font-light text-sm md:text-base">{e.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Projects Grid Container */}
      <Section id="projects" number="03" title="Projects">
        <div className="grid md:grid-cols-2 gap-px bg-[var(--color-hairline)] border hairline">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group bg-background p-8 md:p-10 flex flex-col gap-6 hover:bg-surface transition-all duration-500 relative overflow-hidden"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="label-mono text-muted-foreground text-xs border rounded-2xl py-0.5 px-3 bg-surface/20 group-hover:border-muted-foreground/60 group-hover:text-foreground transition-colors duration-300">{t}</span>
                ))}
              </div>
              <h4 className="font-display text-2xl md:text-4xl leading-tight tracking-tight group-hover:translate-x-1 transition-transform duration-300">{p.title}</h4>
              <p className="text-foreground/70 leading-relaxed font-light text-sm md:text-base">{p.summary}</p>
              
              <ul className="space-y-2.5 text-sm text-foreground/75 border-t border-[var(--color-hairline)]/60 pt-5">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-3 items-start">
                    <span className="text-muted-foreground/50 group-hover:text-foreground transition-colors duration-300 mt-0.5 text-xs">→</span>
                    <span className="font-light">{b}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto pt-6">
                <span className="inline-flex items-center gap-2 label-mono text-xs text-muted-foreground group-hover:text-foreground font-medium transition-colors duration-300">
                  View Project Case Study
                  <Icon name="arrow_forward" className="!text-base transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Contact Panel */}
      <Section id="contact" number="04" title="Contact">
        <h3 className="font-display text-4xl md:text-7xl leading-[0.95] tracking-tight max-w-4xl font-light">
          Have an idea? <span className="italic text-muted-foreground group-hover:text-foreground transition-colors">Let's build it.</span>
        </h3>
        <div className="mt-14 grid md:grid-cols-2 gap-px bg-[var(--color-hairline)] border-y hairline">
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
      </Section>

      {/* Footer */}
       <footer className="px-6  md:px-10 pt-10 pb-32 md:pb-6">
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

      {/* Mobile sticky floating nav */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground/95 text-background rounded-full px-2.5 py-2 flex items-center gap-1 shadow-2xl backdrop-blur-md transition-all duration-300 border border-background/10">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={`flex flex-col items-center px-3 py-1.5 rounded-full transition-all duration-300 ${
              active === n.id ? "bg-background text-foreground scale-105 shadow-sm font-medium" : "opacity-60 text-background"
            }`}
          >
            <Icon name={n.icon} className="!text-[18px]" />
            <span className="text-[8px] mt-0.5 tracking-widest uppercase font-mono">{n.label.slice(0, 4)}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

// Higher-order Section wrapper containing high-performance inline scroll reveal behaviors
function Section({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  const { ref, revealClass } = useScrollReveal();

  return (
    <section id={id} className="px-6 md:px-10 py-24 md:py-36 border-t hairline scroll-mt-20">
      <div ref={ref} className={revealClass}>
        <div className="mx-auto max-w-7xl">
          <div className="label-mono text-muted-foreground mb-12 flex items-center gap-4 select-none">
            <span className="text-sm font-medium text-foreground/40 font-mono">0{number}</span>
            <span className="h-px w-10 bg-[var(--color-hairline)]" />
            <span className="text-xs tracking-widest uppercase font-semibold">{title}</span>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}