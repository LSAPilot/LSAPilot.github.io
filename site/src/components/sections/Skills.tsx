"use client";

import { useRef, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills, type Skill } from "@/content/profile";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

type CardProps = Skill & {
  className?: string;
  children?: ReactNode;
};

function BentoCard({ title, description, items, className = "", children }: CardProps) {
  return (
    <article
      data-card
      className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink-raised p-7 transition-colors duration-500 hover:border-paper/20 md:p-8 ${className}`}
    >
      <div
        data-glow
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-accent-strong/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-60"
      />
      {children}
      <div className="relative mt-auto pt-8">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        {description ? <p className="mt-3 max-w-md leading-relaxed text-muted">{description}</p> : null}
        {items ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {items.map((item) => (
              <li key={item} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-paper/80">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

const SEG = {
  accent: "bg-accent/80",
  strong: "bg-accent-strong/80",
  sky: "bg-sky-300/70",
  dim: "bg-paper/25",
} as const;

type Segment = [width: number, tone: keyof typeof SEG];

/** Abstract syntax-highlighted lines, no real code. Indent is in steps of 16px. */
const EDITOR_LINES: { indent: number; segments: Segment[] }[] = [
  { indent: 0, segments: [[36, "accent"], [72, "dim"], [20, "dim"]] },
  { indent: 1, segments: [[28, "sky"], [52, "dim"], [76, "strong"]] },
  { indent: 1, segments: [[48, "strong"], [24, "dim"], [60, "sky"], [16, "dim"]] },
  { indent: 2, segments: [[64, "dim"], [36, "accent"]] },
  { indent: 2, segments: [[24, "sky"], [96, "dim"]] },
  { indent: 1, segments: [[18, "dim"]] },
  { indent: 1, segments: [[44, "accent"], [56, "dim"], [32, "strong"]] },
  { indent: 2, segments: [[32, "sky"], [68, "dim"], [24, "dim"]] },
  { indent: 2, segments: [[56, "strong"], [40, "dim"]] },
  { indent: 2, segments: [[20, "accent"], [84, "dim"], [28, "sky"]] },
  { indent: 1, segments: [[18, "dim"]] },
  { indent: 0, segments: [[20, "dim"]] },
];

function CodeEditor() {
  return (
    <div
      aria-hidden="true"
      className="relative rounded-2xl border border-line bg-ink/80 p-5 transition-transform duration-700 ease-out group-hover:scale-105"
    >
      <div className="mb-4 flex items-center gap-2 font-mono text-xs">
        <span className="rounded-md bg-paper/10 px-2.5 py-1 text-paper">Java</span>
        <span className="rounded-md px-2.5 py-1 text-paper/40">TypeScript</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {EDITOR_LINES.map((line, i) => (
          <div key={i} className="flex h-5 items-center gap-2">
            <span className="w-4 shrink-0 text-right font-mono text-[11px] text-paper/25 tabular-nums">{i + 1}</span>
            <div className="flex items-center gap-1.5" style={{ marginLeft: line.indent * 16 }}>
              {line.segments.map(([width, tone], j) => (
                <span key={j} data-seg className={`block h-2.5 rounded-full ${SEG[tone]}`} style={{ width }} />
              ))}
              {i === EDITOR_LINES.length - 1 ? (
                <span className="ml-1 h-4 w-0.5 bg-accent motion-safe:animate-pulse" />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two stacked "databases" joined by a line; the discs drop in, the link draws itself. */
function DatabaseGraph() {
  const cylinders = [
    { cx: 56, stroke: "stroke-accent" },
    { cx: 184, stroke: "stroke-sky-300" },
  ];
  return (
    <svg
      data-db
      viewBox="0 0 240 100"
      aria-hidden="true"
      className="relative h-28 w-full transition-transform duration-700 ease-out group-hover:scale-105"
    >
      {cylinders.map(({ cx, stroke }) =>
        [62, 42, 22].map((y) => (
          <g key={`${cx}-${y}`} data-slice className={`fill-ink ${stroke}`} strokeWidth="2">
            <path d={`M${cx - 28} ${y}v12a28 7 0 0 0 56 0V${y}`} />
            <ellipse cx={cx} cy={y} rx="28" ry="7" />
          </g>
        )),
      )}
      <path data-dbline d="M92 50H148" pathLength={1} fill="none" stroke="currentColor" strokeWidth="2" className="text-paper/30" />
      <circle data-dbdot cx="120" cy="50" r="5" className="fill-accent [transform-box:fill-box]" />
    </svg>
  );
}

function BranchGraph() {
  return (
    <svg
      data-graph
      viewBox="0 0 200 80"
      aria-hidden="true"
      className="relative h-20 w-full transition-transform duration-700 ease-out group-hover:scale-105"
    >
      <path data-line d="M10 56H190" pathLength={1} stroke="currentColor" strokeWidth="2" className="text-paper/25" />
      <path
        data-line
        d="M50 56C70 56 70 24 90 24H130C150 24 150 56 170 56"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-accent"
      />
      {[10, 50, 170, 190].map((x) => (
        <circle key={x} data-node cx={x} cy="56" r="6" className="fill-ink stroke-paper/60 [transform-box:fill-box]" strokeWidth="2" />
      ))}
      {[90, 130].map((x) => (
        <circle key={x} data-node cx={x} cy="24" r="6" className="fill-accent [transform-box:fill-box]" />
      ))}
    </svg>
  );
}

/** Abstract "code being written" lines for the AI card; they fill in while scrolling. */
function AiBars() {
  return (
    <div aria-hidden="true" className="relative flex flex-col gap-2.5 transition-transform duration-700 ease-out group-hover:scale-105">
      <span data-bar className="block h-2 w-full rounded-full bg-accent/70" />
      <span data-bar className="block h-2 w-4/5 rounded-full bg-paper/25" />
      <span data-bar className="block h-2 w-3/5 rounded-full bg-accent-strong/70" />
    </div>
  );
}

/**
 * Gapless bento with grid-flow-dense.
 * lg (4 columns): languages 2x2 + databases 2x1 + devops 1x1 + ai 1x1 = 8 cells = 4 x 2.
 * md (2 columns): languages 2 + databases 2 + devops 1 + ai 1 = three full rows.
 */
export function Skills() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, root);
      const cardOf = (el: Element) => el.closest("[data-card]") ?? el;
      const scrub = (el: Element, start: string, end: string) => ({
        trigger: cardOf(el),
        start,
        end,
        scrub: 0.6,
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Cards rise in one after another as they enter the viewport.
        const cards = q("[data-card]");
        gsap.set(cards, { opacity: 0, y: 56, scale: 0.95 });
        ScrollTrigger.batch(cards, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out", stagger: 0.12, overwrite: true }),
        });

        // The accent glows drift slower than the cards for a little depth.
        q("[data-glow]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: -40 },
            { y: 60, ease: "none", scrollTrigger: { trigger: cardOf(el), start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        // Code editor: the syntax tokens write themselves line by line.
        const segments = q("[data-seg]");
        if (segments.length) {
          gsap.fromTo(
            segments,
            { scaleX: 0, transformOrigin: "0% 50%" },
            { scaleX: 1, ease: "none", stagger: 0.04, scrollTrigger: scrub(segments[0], "top 80%", "top 20%") },
          );
        }

        // Databases: discs drop in, then the link between them draws and its node pops.
        const db = root.querySelector<SVGElement>("[data-db]");
        if (db) {
          gsap
            .timeline({ scrollTrigger: scrub(db, "top 80%", "top 35%") })
            .fromTo(db.querySelectorAll("[data-slice]"), { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 0)
            .fromTo(db.querySelector("[data-dbline]"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0.6)
            .fromTo(db.querySelector("[data-dbdot]"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 1.4);
        }

        // Git branch graph: lines first, then the commit nodes pop in.
        const graph = root.querySelector<SVGElement>("[data-graph]");
        if (graph) {
          gsap
            .timeline({ scrollTrigger: scrub(graph, "top 80%", "top 35%") })
            .fromTo(graph.querySelectorAll("[data-line]"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, stagger: 0.4, ease: "none" }, 0)
            .fromTo(graph.querySelectorAll("[data-node]"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.4, stagger: 0.15, ease: "back.out(2)" }, 0.2);
        }

        // AI lines fill from the left, one after another.
        const bars = q("[data-bar]");
        if (bars.length) {
          gsap.fromTo(
            bars,
            { scaleX: 0, transformOrigin: "0% 50%" },
            { scaleX: 1, ease: "none", stagger: 0.25, scrollTrigger: scrub(bars[0], "top 80%", "top 30%") },
          );
        }
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} id="skills" aria-labelledby="skills-title" className="scroll-mt-24 py-32 md:py-48">
      <Container>
        <SectionHeading
          id="skills-title"
          title="What I build with."
          intro="A focused stack for full-stack work, plus the know-how to build with AI."
        />

        <div className="mt-16 grid grid-flow-dense auto-rows-[minmax(17rem,auto)] gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          <BentoCard {...skills.languages} className="md:col-span-2 lg:row-span-2">
            <CodeEditor />
          </BentoCard>

          <BentoCard {...skills.databases} className="md:col-span-2">
            <DatabaseGraph />
          </BentoCard>

          <BentoCard {...skills.devops}>
            <BranchGraph />
          </BentoCard>

          <BentoCard {...skills.ai}>
            <AiBars />
          </BentoCard>
        </div>
      </Container>
    </section>
  );
}
