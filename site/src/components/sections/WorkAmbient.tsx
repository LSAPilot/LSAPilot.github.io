import { Starfield, type Star } from "@/components/ui/Starfield";

/** Positions in percent of the viewport-sized layer; kept mostly to the edges and the intro column. */
const STARS: ReadonlyArray<Star> = [
  [4, 18], [9, 72], [3, 44], [26, 88], [33, 12], [41, 58],
  [52, 6], [64, 94], [78, 10], [88, 36], [95, 66], [83, 86],
];

/**
 * Quiet color behind the project gallery: two static gradients and twinkling points.
 * The layer is sticky, so it stays put while the projects scroll past, like the pinned intro.
 * The twinkle comes from animations/work.ts through the section's MotionSection.
 */
export function WorkAmbient() {
  return (
    // overflow-x-clip, not hidden: hidden would make this a scroll container and break the sticky layer.
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-x-clip">
      <div className="sticky top-0 h-svh">
        <div className="absolute top-0 -left-[20%] h-full w-[70%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent-strong)_16%,transparent),transparent)]" />
        <div className="absolute -right-[15%] bottom-0 h-[80%] w-[60%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-sky)_12%,transparent),transparent)]" />
        <Starfield stars={STARS} />
      </div>
    </div>
  );
}
