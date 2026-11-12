/**
 * All page copy and media live here, grouped by section, so the site can be updated
 * without touching components.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** A short muted loop. The poster is shown until it plays and doubles as its description. */
export type VideoAsset = {
  src: string;
  poster: ImageAsset;
};

export type Media =
  | {
      kind: "image";
      image: ImageAsset;
      /** "contain" keeps charts uncropped on a light backdrop. Defaults to "cover". */
      fit?: "cover" | "contain";
    }
  | ({ kind: "video" } & VideoAsset);

export type Link = {
  label: string;
  href: string;
};

export type NavLink = Link & {
  /** Rendered as the highlighted call to action. */
  primary?: boolean;
};

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  /** Omit for private projects; the card then renders without a link. */
  href?: string;
  linkLabel: string;
  media: Media;
};

export type SkillCard = {
  title: string;
  /** Technologies shown as a list under the title. */
  items?: string[];
  description?: string;
};

export type AboutFact = {
  label: string;
  text: string;
};

export type Milestone = {
  /** Short label, always visible. */
  marker: string;
  /** Start year, shown once the slice is open. */
  year: string;
  title: string;
  description: string;
};

export type HeadlineLine = {
  text: string;
  /** Appended to the line and highlighted. */
  accent?: string;
};

const images = {
  heroSketch: {
    src: "/videos/hero-sketch-poster.webp",
    alt: "Generative p5.js artwork of colorful lines bursting from a dark center",
    width: 496,
    height: 496,
  },
  accessibilityPlugin: {
    src: "/videos/accessibility-plugin-poster.webp",
    alt: "The accessibility plugin showing accessibility information on a website",
    width: 918,
    height: 764,
  },
  tabooGame: {
    src: "/videos/taboo-game-poster.webp",
    alt: "A round of the Taboo browser game",
    width: 1280,
    height: 632,
  },
  jevBenchmark: {
    src: "/images/jev-benchmarking.webp",
    alt: "Bar chart comparing the accuracy of Jev (zero-shot) at 0.81 with DReqANN, ANN, DReqBiLSTM and BiLSTM",
    width: 635,
    height: 624,
  },
} satisfies Record<string, ImageAsset>;

export const profile = {
  name: "Lorenz Pilot",
  role: "Student, Web Developer and Tech Enthusiast",
  study: "Studying Media Informatics M.Sc. at TH Köln, building digital solutions next to my studies.",
  githubUrl: "https://github.com/LSAPilot",
  /** Leave empty to hide the mail button and point the contact CTA at GitHub. */
  email: "",
};

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact", primary: true },
];

export const hero = {
  greeting: "Hello, I am",
  primaryCta: { label: "View my work", href: "#work" } satisfies Link,
  secondaryCta: { label: "Get in touch", href: "#contact" } satisfies Link,
  /** Screen recording of the p5.js sketch. */
  art: {
    src: "/videos/hero-sketch.mp4",
    poster: images.heroSketch,
    caption: "Generative sketch, made with p5.js",
  },
};

/** The scrolling band below the hero. */
export const focusAreas: string[] = ["Full-Stack Development", "AI Augmented Applications", "Automations", "Research"];

const projects: Project[] = [
  {
    title: "Accessibility Plugin",
    summary:
      "Born as a practical project in my bachelor studies, extended in my thesis with plain-language translation via local open-source LLMs, tested with the people it is built for.",
    tags: ["Bachelor Thesis", "Local LLMs", "Plain Language", "User Testing", "Browser Plugin", "Team Project"],
    linkLabel: "Private repository",
    media: { kind: "video", src: "/videos/accessibility-plugin.mp4", poster: images.accessibilityPlugin },
  },
  {
    title: "Requirements Classification Experiment",
    summary:
      "An evaluation of the Jev decision model on classifying software requirements. I compared its results against the specially trained models of Rahman et al. (2024), using precision, F1 and Cohen's kappa.",
    tags: ["Python", "AI Workflows", "Scientific Work", "Requirements Engineering"],
    href: "https://github.com/LSAPilot/REclassificationExperiment",
    linkLabel: "View on GitHub",
    media: { kind: "image", image: images.jevBenchmark, fit: "contain" },
  },
  {
    title: "Taboo Game",
    summary:
      "My first real web project: the popular party game Taboo, rebuilt as a multiplayer browser game with lobbies and live gameplay over WebSockets.",
    tags: ["JavaScript", "Node.js", "WebSockets", "Multiplayer"],
    href: "https://github.com/LSAPilot/tabu-game",
    linkLabel: "View on GitHub",
    media: { kind: "video", src: "/videos/taboo-game.mp4", poster: images.tabooGame },
  },
];

export const work = {
  title: "Selected work",
  intro: "A mix of research, a team project and a multiplayer game. More are on the way.",
  moreLabel: "More on GitHub",
  projects,
};

export const skills = {
  title: "What I build with.",
  intro: "A focused stack for full-stack work, plus the know-how to build with AI.",
  cards: {
    languages: {
      title: "Programming languages",
      items: ["Java", "Spring Boot", "TypeScript", "Angular"],
    },
    databases: {
      title: "Databases",
      items: ["MongoDB", "Postgres"],
    },
    devops: {
      title: "DevOps",
      items: ["Git", "Docker"],
    },
    ai: {
      title: "AI-assisted coding",
      description: "Building faster with AI tools while keeping the code reviewed, tested and understood.",
    },
  } satisfies Record<string, SkillCard>,
};

const aboutFacts: AboutFact[] = [
  {
    label: "Work",
    text: "Working student in health software since 2023. Sole developer of a sales demo tool shown at three trade fairs, now becoming a stable tool for the sales team.",
  },
  {
    label: "Studies",
    text: "M.Sc. Media Informatics at TH Köln, focused on interactive and distributed systems.",
  },
  {
    label: "Abroad",
    text: "Software Engineering at Vilnius Tech, winter 2026/27.",
  },
  {
    label: "Languages",
    text: "German (native), English (C1).",
  },
];

export const about = {
  /** Only for screen readers; the statement is the visual heading. */
  title: "About me",
  statement: "As a tech pragmatist, I am trying to find the right solution for each problem.",
  facts: aboutFacts,
  outro: "Off the keyboard: strength training, hiking and learning new tech.",
};

const milestones: Milestone[] = [
  {
    marker: "School",
    year: "2019",
    title: "Graduated from school",
    description: "Finished school and set out to find the field that really fits me.",
  },
  {
    marker: "Bachelor of Science",
    year: "Since 2025",
    title: "Code and Context",
    description:
      "The Studyprogramm Code and Context at TH Köln: software development, design and start-up thinking. Thesis on an accessibility plugin with local LLMs.",
  },
  {
    marker: "Working student",
    year: "Since 2023",
    title: "Health software",
    description: "Full-stack development, from features to a sales demo tool shown at trade fairs.",
  },
  {
    marker: "Master of Science",
    year: "Now",
    title: "Media Informatics",
    description: "Focus on interactive and distributed systems, with a semester abroad at Vilnius Tech.",
  },
];

export const journey = {
  title: "From school to code.",
  milestones,
};

export const contact = {
  /** One entry per rendered line, so the headline always sets the same way. */
  headline: [{ text: "Let's build" }, { text: "something", accent: "worth" }, { text: "showing." }] satisfies HeadlineLine[],
  text: "Feel free to contact me anytime if you have questions or if you are interested in some of my work.",
  emailLabel: "Send me an email",
  githubLabel: "Find me on GitHub",
};
