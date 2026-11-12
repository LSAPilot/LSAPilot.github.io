import type { ReactNode } from "react";
import { MotionSection } from "@/components/motion/MotionSection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/TagList";
import { skills, type SkillCard } from "@/content/profile";
import { cx } from "@/lib/cx";

/** Shared hover zoom of the card visuals. */
const zoomOnHover = "transition-transform duration-700 ease-out group-hover:scale-105";

type BentoCardProps = SkillCard & {
  className?: string;
  children?: ReactNode;
};

function BentoCard({ title, description, items, className, children }: BentoCardProps) {
  return (
    <article
      data-card
      className={cx(
        "group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink-raised p-7 transition-colors duration-500 hover:border-paper/20 md:p-8",
        className,
      )}
    >
      <div
        data-card-glow
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-accent-strong/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-60"
      />
      {children}
      <div className="relative mt-auto pt-8">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        {description && <p className="mt-3 max-w-md leading-relaxed text-muted">{description}</p>}
        {items && <TagList items={items} className="mt-5" />}
      </div>
    </article>
  );
}

const TOKEN_TONES = {
  accent: "bg-accent/80",
  strong: "bg-accent-strong/80",
  sky: "bg-sky-300/70",
  dim: "bg-paper/25",
} as const;

type Token = [width: number, tone: keyof typeof TOKEN_TONES];

/** Abstract syntax-highlighted lines, no real code. Indent is in steps of 16px. */
const EDITOR_LINES: { indent: number; tokens: Token[] }[] = [
  { indent: 0, tokens: [[36, "accent"], [72, "dim"], [20, "dim"]] },
  { indent: 1, tokens: [[28, "sky"], [52, "dim"], [76, "strong"]] },
  { indent: 1, tokens: [[48, "strong"], [24, "dim"], [60, "sky"], [16, "dim"]] },
  { indent: 2, tokens: [[64, "dim"], [36, "accent"]] },
  { indent: 2, tokens: [[24, "sky"], [96, "dim"]] },
  { indent: 1, tokens: [[18, "dim"]] },
  { indent: 1, tokens: [[44, "accent"], [56, "dim"], [32, "strong"]] },
  { indent: 2, tokens: [[32, "sky"], [68, "dim"], [24, "dim"]] },
  { indent: 2, tokens: [[56, "strong"], [40, "dim"]] },
  { indent: 2, tokens: [[20, "accent"], [84, "dim"], [28, "sky"]] },
  { indent: 1, tokens: [[18, "dim"]] },
  { indent: 0, tokens: [[20, "dim"]] },
];

function CodeEditor() {
  const lastLine = EDITOR_LINES.length - 1;

  return (
    <div aria-hidden="true" className={cx("relative rounded-2xl border border-line bg-ink/80 p-5", zoomOnHover)}>
      <div className="mb-4 flex items-center gap-2 font-mono text-xs">
        <span className="rounded-md bg-paper/10 px-2.5 py-1 text-paper">Java</span>
        <span className="rounded-md px-2.5 py-1 text-paper/40">TypeScript</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {EDITOR_LINES.map((line, i) => (
          <div key={i} className="flex h-5 items-center gap-2">
            <span className="w-4 shrink-0 text-right font-mono text-[11px] text-paper/25 tabular-nums">{i + 1}</span>
            <div className="flex items-center gap-1.5" style={{ marginLeft: line.indent * 16 }}>
              {line.tokens.map(([width, tone], j) => (
                <span key={j} data-token className={cx("block h-2.5 rounded-full", TOKEN_TONES[tone])} style={{ width }} />
              ))}
              {i === lastLine && <span className="ml-1 h-4 w-0.5 bg-accent motion-safe:animate-pulse" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const DB_CYLINDERS = [
  { cx: 56, stroke: "stroke-accent" },
  { cx: 184, stroke: "stroke-sky-300" },
];
/** Top edge of each disc, bottom first, so upper discs overlap lower ones. */
const DB_DISCS = [62, 42, 22];

/** Two stacked "databases" joined by a line; the discs drop in, the link draws itself. */
function DatabaseGraph() {
  return (
    <svg data-db viewBox="0 0 240 100" aria-hidden="true" className={cx("relative h-28 w-full", zoomOnHover)}>
      {DB_CYLINDERS.map(({ cx: x, stroke }) =>
        DB_DISCS.map((y) => (
          <g key={`${x}-${y}`} data-disc className={cx("fill-ink", stroke)} strokeWidth="2">
            <path d={`M${x - 28} ${y}v12a28 7 0 0 0 56 0V${y}`} />
            <ellipse cx={x} cy={y} rx="28" ry="7" />
          </g>
        )),
      )}
      <path data-draw d="M92 50H148" pathLength={1} fill="none" stroke="currentColor" strokeWidth="2" className="text-paper/30" />
      <circle data-pop cx="120" cy="50" r="5" className="fill-accent [transform-box:fill-box]" />
    </svg>
  );
}

/** A feature branch that leaves main and merges back. */
function BranchGraph() {
  return (
    <svg data-branch viewBox="0 0 200 80" aria-hidden="true" className={cx("relative h-20 w-full", zoomOnHover)}>
      <path data-draw d="M10 56H190" pathLength={1} stroke="currentColor" strokeWidth="2" className="text-paper/25" />
      <path
        data-draw
        d="M50 56C70 56 70 24 90 24H130C150 24 150 56 170 56"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-accent"
      />
      {[10, 50, 170, 190].map((x) => (
        <circle key={x} data-pop cx={x} cy="56" r="6" className="fill-ink stroke-paper/60 [transform-box:fill-box]" strokeWidth="2" />
      ))}
      {[90, 130].map((x) => (
        <circle key={x} data-pop cx={x} cy="24" r="6" className="fill-accent [transform-box:fill-box]" />
      ))}
    </svg>
  );
}

/** Abstract "code being written" lines for the AI card; they fill in while scrolling. */
function AiBars() {
  return (
    <div aria-hidden="true" className={cx("relative flex flex-col gap-2.5", zoomOnHover)}>
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
  const { languages, databases, devops, ai } = skills.cards;

  return (
    <MotionSection motion="skills" id="skills" aria-labelledby="skills-title" className="py-32 md:py-48">
      <Container>
        <SectionHeading id="skills-title" title={skills.title} intro={skills.intro} />

        <div className="mt-16 grid grid-flow-dense auto-rows-[minmax(17rem,auto)] gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          <BentoCard {...languages} className="md:col-span-2 lg:row-span-2">
            <CodeEditor />
          </BentoCard>
          <BentoCard {...databases} className="md:col-span-2">
            <DatabaseGraph />
          </BentoCard>
          <BentoCard {...devops}>
            <BranchGraph />
          </BentoCard>
          <BentoCard {...ai}>
            <AiBars />
          </BentoCard>
        </div>
      </Container>
    </MotionSection>
  );
}
