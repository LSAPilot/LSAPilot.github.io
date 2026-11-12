import { gsap } from "@/lib/gsap";
import { CURSOR_MOTION_OK } from "@/lib/media-queries";
import { createFader, createFollower, listen, pointerIn, type MotionSetups } from "@/lib/motion";

/** How far (px) and how sluggishly each [data-field] drifts; negative values move against the cursor. */
const FIELD_DRIFT = [
  { x: -90, y: -60, duration: 1.6 },
  { x: 120, y: 80, duration: 2 },
];

/**
 * Hero ambience: a spotlight ([data-spot]) trails the cursor and the color fields drift
 * with it for parallax. Listens on the hero section, since the ambient layer itself
 * does not receive pointer events.
 */
export const heroAmbientMotion: MotionSetups = {
  [CURSOR_MOTION_OK]: (root) => {
    const hero = root.closest("section");
    const spot = root.querySelector<HTMLElement>("[data-spot]");
    if (!hero || !spot) return;

    const follower = createFollower(spot, 0.7);
    const fadeSpot = createFader(spot, 0.8);
    const fields = gsap.utils.toArray<HTMLElement>("[data-field]", root).map((field, i) => {
      const { x, y, duration } = FIELD_DRIFT[i % FIELD_DRIFT.length];
      return {
        range: { x, y },
        toX: gsap.quickTo(field, "x", { duration, ease: "power3" }),
        toY: gsap.quickTo(field, "y", { duration, ease: "power3" }),
      };
    });

    let inside = false;

    return listen(hero, {
      pointermove: (event) => {
        const point = pointerIn(event, hero);
        if (!inside) {
          // First move: start under the cursor instead of flying in from the corner.
          inside = true;
          follower.jump(point);
          fadeSpot(1);
        }
        follower.move(point);

        // -0.5 .. 0.5 across the hero.
        const nx = point.x / point.width - 0.5;
        const ny = point.y / point.height - 0.5;
        fields.forEach(({ range, toX, toY }) => {
          toX(nx * range.x);
          toY(ny * range.y);
        });
      },
      pointerleave: () => {
        inside = false;
        fadeSpot(0);
        fields.forEach(({ toX, toY }) => {
          toX(0);
          toY(0);
        });
      },
    });
  },
};
