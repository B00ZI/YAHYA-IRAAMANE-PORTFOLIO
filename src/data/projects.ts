export type Project = {
  slug: string;
  tags: string[];
  title: string;
  summary: string;
  bullets: string[];
  year: string;
  role: string;
  client: string;
  status: string;
  overview: string;
  challenge: string;
  approach: string[];
  outcomes: { label: string; value: string }[];
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "school-management-saas",
    tags: ["Laravel", "Vue.js"],
    title: "School Management SaaS Platform",
    summary:
      "A multi-tenant school administration system handling student data, attendance, and fee management.",
    bullets: [
      "Architected multi-tenant database structure for data isolation.",
      "Integrated secure payment gateway for automated tuition collection.",
    ],
    year: "2024",
    role: "Lead Full Stack Developer",
    client: "Private K-12 network",
    status: "Production · 12 schools",
    overview:
      "A SaaS platform that gives independent schools a single source of truth for students, staff, attendance, grading, and tuition. Each school operates inside an isolated tenant with its own branding, users, and data.",
    challenge:
      "Schools were stitching together spreadsheets, paper attendance sheets, and offline accounting. We needed a system that scaled across institutions without leaking data between tenants — and that non-technical staff could actually use day-to-day.",
    approach: [
      "Designed a single-database, schema-per-tenant model in PostgreSQL with row-level guards on the application layer.",
      "Built a role-based permission system covering admin, teacher, accountant, and parent personas.",
      "Integrated a local payment gateway with webhook reconciliation for automated tuition invoicing.",
      "Shipped a Vue 3 dashboard with offline-tolerant attendance capture for classrooms with weak Wi-Fi.",
    ],
    outcomes: [
      { label: "Schools onboarded", value: "12" },
      { label: "Manual admin time saved", value: "~60%" },
      { label: "Tuition collection cycle", value: "14 → 3 days" },
    ],
    stack: ["Laravel", "Vue.js", "PostgreSQL", "Redis", "Stripe-compatible Gateway"],
  },
  {
    slug: "ai-change-order-system",
    tags: ["React", "Node.js", "OpenAI"],
    title: "Client Scope & AI Change Order System",
    summary:
      "Intelligent system for project management that automates change request processing using AI.",
    bullets: [
      "Automated scope-creep detection via natural language processing.",
      "Real-time cost estimation for project adjustments.",
    ],
    year: "2024",
    role: "Full Stack Developer",
    client: "Boutique digital agency",
    status: "In production",
    overview:
      "A project operations layer that sits between client conversations and the team's delivery board. When clients ask for something new, the system detects whether it's in or out of scope, drafts a change order, and estimates impact on timeline and budget.",
    challenge:
      "Agencies bled hours on undocumented scope changes. PMs were the human bottleneck — reading every Slack and email, manually pricing change orders, and chasing approvals.",
    approach: [
      "Built a Node.js ingestion pipeline that streams client messages from email and chat into a normalized event log.",
      "Used OpenAI function calling to classify each request against the signed Statement of Work.",
      "Generated structured change orders with cost, hours, and timeline deltas — sent to the client for one-click approval.",
      "React dashboard for PMs with audit trail, override controls, and revenue-at-risk reporting.",
    ],
    outcomes: [
      { label: "Scope creep recovered", value: "+18% revenue" },
      { label: "Change order turnaround", value: "3 days → 4 hours" },
      { label: "PM hours reclaimed", value: "~9 hrs/week" },
    ],
    stack: ["React", "Node.js", "OpenAI", "PostgreSQL", "Tailwind"],
  },
  {
    slug: "ai-kanban-workflow",
    tags: ["TypeScript", "Python"],
    title: "AI-to-Kanban Workflow Tool",
    summary:
      "Converts unstructured meeting notes and audio into actionable Kanban board tasks.",
    bullets: [
      "Speech-to-text integration with task categorization.",
      "Automated priority assignment based on semantic analysis.",
    ],
    year: "2023",
    role: "Solo Builder",
    client: "Self-initiated",
    status: "Public beta",
    overview:
      "A tool that turns a 45-minute kickoff call into a populated Kanban board. Upload the recording, get back assignees, priorities, and acceptance criteria — ready to push into Linear, Jira, or Trello.",
    challenge:
      "Teams leave meetings aligned but lose half the decisions in the gap between conversation and ticket. Manually translating notes into tickets is the most-skipped step in every workflow.",
    approach: [
      "Python service handles transcription with diarized speakers and timestamped segments.",
      "TypeScript orchestrator extracts tasks, owners, due dates, and dependencies via structured prompts.",
      "Heuristic + LLM hybrid for priority — keyword urgency signals combined with semantic intent.",
      "Two-way sync adapters for Linear, Jira, and Trello so the board stays live.",
    ],
    outcomes: [
      { label: "Tasks captured per meeting", value: "3× baseline" },
      { label: "Post-meeting admin time", value: "~22 → 4 min" },
      { label: "Beta teams active", value: "40+" },
    ],
    stack: ["TypeScript", "Python", "Whisper", "OpenAI", "Next.js"],
  },
  {
    slug: "movie-management-app",
    tags: ["PHP", "MySQL", "TMDB API"],
    title: "Movie Management App",
    summary:
      "A personal media catalog tool for tracking watched content and receiving recommendations.",
    bullets: [
      "Integrated TMDB API for rich metadata fetching.",
      "Custom watchlist and user rating system.",
    ],
    year: "2023",
    role: "Solo Builder",
    client: "Personal project",
    status: "Shipped",
    overview:
      "A self-hosted library for film obsessives. Track what you've watched, rate it, build themed lists, and get recommendations that learn from your taste — not from what a platform wants to promote.",
    challenge:
      "Streaming-platform watchlists are siloed, lossy, and tuned for retention rather than recall. I wanted my own catalog with honest recommendations.",
    approach: [
      "PHP backend with MySQL for the catalog, ratings, and tag taxonomy.",
      "TMDB API for posters, cast, runtime, and release metadata with local caching.",
      "Recommendation engine based on tag co-occurrence and weighted rating proximity.",
      "Clean responsive UI for adding films in two clicks from any device.",
    ],
    outcomes: [
      { label: "Films cataloged", value: "1,200+" },
      { label: "Recommendation click-through", value: "~45%" },
      { label: "Daily logging time", value: "< 30 sec" },
    ],
    stack: ["PHP", "MySQL", "TMDB API", "Vanilla JS"],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
