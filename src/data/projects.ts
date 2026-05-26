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
  stackChoices: { title: string; desc: string }[];
  approach: { title: string; desc: string }[];
  outcomes: { label: string; value: string }[];
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "school-management-saas",
    tags: ["Laravel", "Next.js", "MySQL"],
    title: "School Management SaaS Platform",
    summary:
      "I built a full-stack platform to handle school data, replace messy spreadsheets, and keep student, teacher, and admin data secure.",
    bullets: [
      "Created independent dashboards for students, teachers, and admins with different access controls.",
      "Designed a database with over 10 connected tables to keep track of attendance, grades, and payments smoothly.",
    ],
    year: "2024",
    role: "Full Stack Developer",
    client: "Morocco-focused education provider",
    status: "Production",
    overview:
      "A complete web platform built for a school provider to manage daily workloads like recording attendance, organizing student profiles, and processing payments.",
    challenge:
      "The school relied heavily on slow, manual spreadsheets. They needed a secure, central system that could handle different user roles without getting messy or leaking sensitive student records.",
    stackChoices: [
      {
        title: "Why Next.js + Headless Laravel?",
        desc: "I used Laravel strictly as a backend API because it handles complex user roles and relational data out of the box. Pairing it with Next.js means the dashboard loads instantly for users without slowing down the server."
      },
      {
        title: "Why MySQL?",
        desc: "Since school data (grades, attendance, payments) is highly structured and connects together, a classic relational database was the safest choice to keep everything accurate and synchronized."
      }
    ],
    approach: [
      {
        title: "Data Isolation Middleware",
        desc: "I wrote a check that runs on every single request to make sure a school can only see its own students, blocking any accidental data leaks between accounts."
      },
      {
        title: "Custom Role System",
        desc: "Built a permission rulebook that changes what you see based on who logs in—giving full control to admins, grading tools to teachers, and read-only views to parents."
      },
      {
        title: "Relational Data Mapping",
        desc: "Linked tables carefully so when a teacher marks a student absent, it instantly updates the attendance summary and reports without breaking other logs."
      },
      {
        title: "Background Report Processing",
        desc: "Generating huge report PDFs can freeze the app. I moved this work to a background queue so users can keep clicking around while the files build."
      }
    ],
    outcomes: [
      { label: "Database Tables", value: "10+" },
      { label: "Lighthouse Score", value: "90+" },
      { label: "Core Systems", value: "Attendance, Grades, Payments" },
    ],
    stack: ["Laravel", "Next.js", "MySQL", "RESTful APIs", "TailwindCSS"],
  },
  {
    slug: "ai-change-order-system",
    tags: ["Next.js", "Laravel", "PostgreSQL"],
    title: "Client Scope & Change Order System",
    summary:
      "I built a tool that uses AI to read unstructured client messages and automatically turn them into clean project requirements and cost estimates.",
    bullets: [
      "Built an AI parsing layer that reads through a client request and guesses the needed budget and timeframe.",
      "Created a simple approve/reject system that sends out automatic confirmation emails once a proposal is accepted.",
    ],
    year: "2024",
    role: "Full Stack Developer",
    client: "Boutique digital agency",
    status: "Production",
    overview:
      "An automation tool designed for project teams to easily handle scope adjustments without wasting hours manual-drafting contract revisions.",
    challenge:
      "Clients constantly text or email new requests, and teams waste too much time manually sizing up scope changes, creating friction and slow reply times.",
    stackChoices: [
      {
        title: "Why Next.js App Router?",
        desc: "AI features take time to think and reply. Next.js let me stream AI responses to the screen in real-time while processing heavy document uploads smoothly in the background."
      },
      {
        title: "Why PostgreSQL?",
        desc: "AI models hand back messy, unstructured JSON data. Postgres gives me the perfect mix: it handles standard user accounts easily, but can also search through messy JSON blobs super fast."
      }
    ],
    approach: [
      {
        title: "Contract Text Parser",
        desc: "Wrote a utility helper that reads raw, messy text documents from the user and cleans it up into predictable data structures that the AI can actually read."
      },
      {
        title: "Async Upload Queues",
        desc: "Set up a queue worker system to process huge contract uploads in order. If a file takes a few minutes, the UI stays fully responsive."
      },
      {
        title: "AI Response Flattening",
        desc: "Created data filters to take complex nested objects from the AI and flatten them down so they layout nicely on the front-end dashboard cards."
      },
      {
        title: "Final Signature Lockout",
        desc: "Added strict conditional checks to the database to freeze documents once they are signed, ensuring nobody can edit a change order after approval."
      }
    ],
    outcomes: [
      { label: "Client Proposals", value: "Automated Workflow" },
      { label: "Lighthouse Score", value: "90+" },
      { label: "Main Feature", value: "Status & Notifications" },
    ],
    stack: ["Next.js", "Laravel", "PostgreSQL", "AI APIs", "REST APIs"],
  },
  {
    slug: "ai-kanban-workflow",
    tags: ["Next.js"],
    title: "AI-to-Kanban Workflow Tool",
    summary:
      "I built a productivity tool that takes text responses from an AI and instantly formats them into interactive, drag-and-drop Kanban task boards.",
    bullets: [
      "Wrote a JSON parsing system to slice AI text and generate clean, move-able task cards.",
      "Set up local storage persistence so users don't lose their boards or tasks when they refresh.",
    ],
    year: "2023",
    role: "Solo Builder",
    client: "Self-initiated",
    status: "Public Beta",
    overview:
      "A handy mini-app that bridges the gap between brainstorming with an AI tool and actually starting to work on tasks.",
    challenge:
      "AI models generate great to-do lists, but copying and pasting text bullet-by-bullet into a project manager is tedious and disruptive to the workflow.",
    stackChoices: [
      {
        title: "Why 100% Client-Side Next.js?",
        desc: "I wanted this tool to be incredibly fast. By skipping a traditional backend database and handling all data logic directly inside the browser, moving cards feels instant and costs nothing to host."
      },
      {
        title: "Why LocalStorage?",
        desc: "Without a remote cloud database, LocalStorage was the simplest way to save the user's board layout automatically so their cards don't disappear when they refresh the page."
      }
    ],
    approach: [
      {
        title: "Optimistic State Swaps",
        desc: "When you drop a card into a new column, the UI updates instantly before asking questions. This keeps the drag animation buttery smooth."
      },
      {
        title: "State Serialization Hooks",
        desc: "Wrote a React hook that automatically saves the exact layout of columns and cards into the browser storage every time a card changes positions."
      },
      {
        title: "In-Browser Data Shuffling",
        desc: "Used standard JavaScript array functions (like map and filter) to sort and move cards in memory, keeping everything fast without network lag."
      },
      {
        title: "Save-Action Debouncer",
        desc: "Instead of saving to the browser storage on every single pixel movement, I added a tiny delay so it only saves once the user lets go of the card."
      }
    ],
    outcomes: [
      { label: "Task Source", value: "AI JSON Outputs" },
      { label: "Board Feel", value: "Snappy & Real-time" },
      { label: "Data Saving", value: "Local Storage" },
    ],
    stack: ["Next.js", "JavaScript", "Local Storage", "TailwindCSS"],
  },
  {
    slug: "movie-management-app",
    tags: ["React.js", "Supabase"],
    title: "Movie Management App",
    summary:
      "I built a movie library application using Supabase for user accounts and an external API to let users search, filter, and save films.",
    bullets: [
      "Connected an external movie database to build a fast dashboard with search and custom genre filters.",
      "Added search debouncing to stop spamming the database, reducing unnecessary API requests by 60%.",
    ],
    year: "2023",
    role: "Solo Builder",
    client: "Personal project",
    status: "Shipped",
    overview:
      "A clean personal content log where people can sign up, create profiles, track what they watch, and discover new movies.",
    challenge:
      "Most mainstream media tracking tools feel cluttered with ads or have restrictive interfaces, so I wanted to make a clean, lightweight personal catalog.",
    stackChoices: [
      {
        title: "Why Supabase?",
        desc: "Instead of wasting time writing custom signup flows, passwords, and user tables from scratch, I let Supabase handle the boring auth stuff so I could focus on building the actual app features."
      },
      {
        title: "Why External Film APIs?",
        desc: "To keep the app lightweight and packed with real movies, I pulled data from public movie databases on the fly instead of trying to scrape and host thousands of movies myself."
      }
    ],
    approach: [
      {
        title: "Supabase Auth Guard",
        desc: "Created routing middleware to protect private profile pages, kicking out unauthenticated users and routing logged-in users straight to their lists."
      },
      {
        title: "Smart Search Debounce",
        desc: "Added a short timer to the search bar. The app waits until you finish typing before hitting the movie database, cutting out hundreds of useless API calls."
      },
      {
        title: "Background Revalidation Cache",
        desc: "Set up a caching system that displays your saved movies instantly from memory first, then quietly updates the data in the background if anything changed."
      },
      {
        title: "Lazy-Loaded Movie Posters",
        desc: "Programmed movie images to load only when they roll onto the user's screen. This saves internet bandwidth and keeps scrolling fast on mobile devices."
      }
    ],
    outcomes: [
      { label: "API Optimization", value: "~60% fewer requests" },
      { label: "User Profiles", value: "Supabase Auth" },
      { label: "App Speed", value: "Cached & Lazy-loaded" },
    ],
    stack: ["React.js", "Supabase", "External Movie API", "JavaScript"],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);