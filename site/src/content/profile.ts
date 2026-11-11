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
  href: string;
  linkLabel: string;
  image: ImageAsset;
};

export type Skill = {
  title: string;
  description: string;
};

export type Milestone = {
  marker: string;
  title: string;
  description: string;
};

export type NavLink = {
  label: string;
  href: string;
};

const images = {
  p5js: {
    src: "/images/p5js-portfolio.webp",
    alt: "Generative p5.js artwork of colorful lines bursting from a dark center",
    width: 499,
    height: 501,
  },
  noethen: {
    src: "/images/noethen-esports.webp",
    alt: "Landing page of the Noethen eSports website with a neon arcade background",
    width: 1600,
    height: 809,
  },
} satisfies Record<string, ImageAsset>;

export const profile = {
  name: "Lorenz Pilot",
  role: "Aspiring web designer and software developer",
  study: "Studying Code and Context at TH Köln",
  githubUrl: "https://github.com/LSAPilot",
  /** Leave empty to hide the mail button and point the contact CTA at GitHub. */
  email: "",
  images,
};

export const navLinks: NavLink[] = [
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const techStack: string[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "Java",
  "Python",
  "Git",
  "p5.js",
  "Agile",
  "Design",
];

export const skills = {
  frontend: {
    title: "Frontend foundations",
    description:
      "HTML, CSS and some JavaScript. I build responsive layouts and enjoy getting the small details of an interface right.",
  },
  languages: {
    title: "Java and Python",
    description: "Good knowledge in Java and some experience in Python.",
  },
  git: {
    title: "Git",
    description: "A good understanding of Git and working on shared code.",
  },
  teamwork: {
    title: "Teams and product",
    description:
      "Agile methods, good communication, some design experience and start-up know-how from university.",
  },
} satisfies Record<string, Skill>;

export const aboutStatement =
  "Just having fun learning and trying new things in web and software development, next to my studies at TH Köln.";

export const projects: Project[] = [
  {
    title: "Noethen eSports",
    summary:
      "The website of the Noethen eSports team with games, gallery and team pages. A hobby project I design, build and keep improving.",
    tags: ["Web design", "Frontend", "Hobby project"],
    href: "http://noethenesports.de/",
    linkLabel: "Visit website",
    image: images.noethen,
  },
  {
    title: "Generative design portfolio",
    summary:
      "Creative coding sketches built with p5.js for my design portfolio in the winter semester 2021/22.",
    tags: ["p5.js", "JavaScript", "Creative coding"],
    href: "https://lpilot.pages.coco.study/startercode-gestaltungsportfolio-ws202122/",
    linkLabel: "View sketches",
    image: images.p5js,
  },
];

export const milestones: Milestone[] = [
  {
    marker: "2019",
    title: "Graduated from school",
    description: "Finished school and set out to find the field that really fits me.",
  },
  {
    marker: "Detour",
    title: "Tried economics",
    description:
      "I tried out different fields of work, economics among them. It was not really for me.",
  },
  {
    marker: "TH Köln",
    title: "Code and Context",
    description:
      "Studying Code and Context, with a mix of software development, design and start-up thinking.",
  },
  {
    marker: "Now",
    title: "Building for the web",
    description:
      "Learning new things in web and software development and shipping side projects like Noethen eSports.",
  },
];

export const contact = {
  heading: { before: "Let's build something", middle: "worth", after: "showing." },
  text: "Feel free to contact me anytime if you have questions or if you are interested in some of my work.",
};
