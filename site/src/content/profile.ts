/**
 * All page copy lives here so the site can be updated without touching components.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  /** Omit for private projects; the card then renders without a link. */
  href?: string;
  linkLabel: string;
  /** Poster for the video, or the still image when there is no video. */
  image: ImageAsset;
  /** Short muted loop shown instead of the still image. */
  video?: string;
  /** "contain" keeps charts uncropped on a light backdrop. Defaults to "cover". */
  fit?: "cover" | "contain";
};

export type Skill = {
  title: string;
  /** Technologies shown as a list under the title. */
  items?: string[];
  description?: string;
};

export type Milestone = {
  /** Short label, always visible. */
  marker: string;
  /** Start year, shown once the slice is open. */
  year: string;
  title: string;
  description: string;
};

export type NavLink = {
  label: string;
  href: string;
};

const images = {
  p5js: {
    /** Poster frame for the hero video. */
    src: "/videos/hero-sketch-poster.webp",
    alt: "Generative p5.js artwork of colorful lines bursting from a dark center",
    width: 496,
    height: 496,
  },
  noethen: {
    src: "/images/noethen-esports.webp",
    alt: "Landing page of the Noethen eSports website with a neon arcade background",
    width: 1600,
    height: 809,
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
  images,
  /** Screen recording of the p5.js sketch, shown in the hero. `images.p5js` is its poster. */
  heroVideo: "/videos/hero-sketch.mp4",
};

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const techStack: string[] = [
  "Full-Stack Development",
  "AI Augmented Applications",
  "Automations",
  "Research"
];

export const skills = {
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
} satisfies Record<string, Skill>;

export const aboutStatement =
  "As a tech pragmatist, I am trying to find the right solution for each problem.";

export type AboutFact = { label: string; text: string };

export const aboutFacts: AboutFact[] = [
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

export const aboutOutro = "Off the keyboard: strength training, hiking and learning new tech.";

export const projects: Project[] = [
  {
    title: "Accessibility Plugin",
    summary:
      "Born as a practical project in my bachelor studies, extended in my thesis with plain-language translation via local open-source LLMs, tested with the people it is built for.",
    tags: ["Bachelor Thesis", "Local LLMs", "Plain Language", "User Testing", "Browser Plugin", "Team Project"],
    linkLabel: "Private repository",
    image: images.accessibilityPlugin,
    video: "/videos/accessibility-plugin.mp4",
  },
  {
    title: "Requirements Classification Experiment",
    summary:
      "An evaluation of the Jev decision model on classifying software requirements. I compared its results against the specially trained models of Rahman et al. (2024), using precision, F1 and Cohen's kappa.",
    tags: ["Python", "AI Workflows", "Scientific Work", "Requirements Engineering"],
    href: "https://github.com/LSAPilot/REclassificationExperiment",
    linkLabel: "View on GitHub",
    image: images.jevBenchmark,
    fit: "contain",
  },
  {
    title: "Taboo Game",
    summary:
      "My first real web project: the popular party game Taboo, rebuilt as a multiplayer browser game with lobbies and live gameplay over WebSockets.",
    tags: ["JavaScript", "Node.js", "WebSockets", "Multiplayer"],
    href: "https://github.com/LSAPilot/tabu-game",
    linkLabel: "View on GitHub",
    image: images.tabooGame,
    video: "/videos/taboo-game.mp4",
  },
];

export const milestones: Milestone[] = [
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

export const contact = {
  heading: { before: "Let's build something", middle: "worth", after: "showing." },
  text: "Feel free to contact me anytime if you have questions or if you are interested in some of my work.",
};
