/** A star position in percent of the surrounding box. */
export type Star = readonly [left: number, top: number];

/**
 * Small decorative points, positioned in percent of the nearest positioned ancestor.
 * Positions are fixed so server and client render the same markup; animations/stars.ts
 * makes them twinkle.
 */
export function Starfield({ stars }: { stars: ReadonlyArray<Star> }) {
  return stars.map(([left, top]) => (
    <span
      key={`${left}-${top}`}
      data-star
      className="absolute size-1 rounded-full bg-accent opacity-40"
      style={{ left: `${left}%`, top: `${top}%` }}
    />
  ));
}
