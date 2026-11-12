"use client";

import { useRef, useState, type CSSProperties } from "react";
import { milestoneMotion } from "@/animations/journey";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey, type Milestone } from "@/content/profile";
import { cx } from "@/lib/cx";
import { DESKTOP } from "@/lib/media-queries";
import { useScopedMotion } from "@/lib/motion";
import { useMediaQuery } from "@/lib/use-media-query";

type Tone = {
  color: string;
  /** Where the resting glow sits inside the slice. */
  at: string;
  /** Opacity of the resting glow in percent; the hover glow is slightly stronger. */
  strength: number;
};

/** One color per slice, cycled. Both glows of a slice derive from it via CSS custom properties. */
const TONES: Tone[] = [
  { color: "var(--color-accent-strong)", at: "20% 10%", strength: 35 },
  { color: "var(--color-sky)", at: "80% 20%", strength: 25 },
  { color: "var(--color-accent)", at: "30% 90%", strength: 30 },
  { color: "var(--color-accent-strong)", at: "70% 70%", strength: 45 },
  { color: "var(--color-sky)", at: "50% 40%", strength: 30 },
];

const toneStyle = ({ color, at, strength }: Tone) =>
  ({
    "--tone": color,
    "--tone-at": at,
    "--tone-rest": `${strength}%`,
    "--tone-hover": `${strength + 5}%`,
  }) as CSSProperties;

type MilestoneSliceProps = {
  milestone: Milestone;
  tone: Tone;
  panelId: string;
  active: boolean;
  /** Only the desktop layout collapses slices; on small screens every panel is open. */
  collapsible: boolean;
  onActivate: () => void;
};

function MilestoneSlice({ milestone, tone, panelId, active, collapsible, onActivate }: MilestoneSliceProps) {
  const ref = useRef<HTMLLIElement>(null);
  useScopedMotion(ref, milestoneMotion);

  const markerClass = "relative flex w-full items-start p-7 text-left md:p-8 lg:h-full";
  const marker = (
    <span
      className={cx(
        // Wraps on small screens so long markers are not cut off (WCAG 1.4.10).
        "text-outline text-4xl leading-none font-black tracking-tight transition-colors duration-500 md:text-5xl lg:whitespace-nowrap",
        active ? "lg:text-paper lg:[-webkit-text-stroke:0]" : "lg:rotate-180 lg:[writing-mode:vertical-rl]",
      )}
    >
      {milestone.marker}
    </span>
  );

  return (
    <li
      ref={ref}
      onMouseEnter={onActivate}
      style={toneStyle(tone)}
      className={cx(
        "group relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-raised transition-[flex-grow,border-color] duration-700 ease-out motion-reduce:transition-none lg:min-w-0",
        active ? "lg:flex-[4] lg:border-paper/20" : "lg:flex-[1]",
      )}
    >
      <div
        data-rest
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_var(--tone-at),color-mix(in_srgb,var(--tone)_var(--tone-rest),transparent),transparent_60%)]"
      />
      <div
        data-glow
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 size-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--tone)_var(--tone-hover),transparent),transparent_62%)] opacity-0 will-change-transform"
      />

      {/* A real disclosure button only where the slice can actually collapse; otherwise
          aria-expanded="false" would contradict a panel that is plainly visible. */}
      {collapsible ? (
        <button
          type="button"
          aria-expanded={active}
          aria-controls={panelId}
          onFocus={onActivate}
          onClick={onActivate}
          className={cx(markerClass, "focus-visible:-outline-offset-4")}
        >
          {marker}
        </button>
      ) : (
        <div className={markerClass}>{marker}</div>
      )}

      <div
        id={panelId}
        className={cx(
          "relative px-7 pb-7 transition-[opacity,visibility] duration-500 md:px-8 md:pb-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:w-[min(28rem,100%)]",
          // invisible, not just transparent: a collapsed panel must be hidden from screen readers too.
          active ? "lg:visible lg:opacity-100 lg:delay-200" : "lg:invisible lg:opacity-0",
        )}
      >
        <p className="text-sm font-medium tracking-wide text-accent uppercase">{milestone.year}</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight">{milestone.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{milestone.description}</p>
      </div>
    </li>
  );
}

/**
 * Horizontal accordion: on desktop the active slice widens on hover or focus.
 * On small screens every slice is shown expanded in a vertical stack.
 */
export function Journey() {
  const { milestones } = journey;
  const [active, setActive] = useState(milestones.length - 1);
  const collapsible = useMediaQuery(DESKTOP);

  return (
    <section aria-labelledby="journey-title" className="pb-32 md:pb-48">
      <Container>
        <SectionHeading id="journey-title" title={journey.title} />

        <ol className="mt-16 flex flex-col gap-4 md:mt-20 lg:h-[30rem] lg:flex-row">
          {milestones.map((milestone, index) => (
            <MilestoneSlice
              key={milestone.marker}
              milestone={milestone}
              tone={TONES[index % TONES.length]}
              panelId={`milestone-${index}`}
              active={index === active}
              collapsible={collapsible}
              onActivate={() => setActive(index)}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}
