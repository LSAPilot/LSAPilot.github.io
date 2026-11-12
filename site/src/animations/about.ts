import { gsap } from "@/lib/gsap";
import { MOTION_OK } from "@/lib/media-queries";
import type { MotionSetups } from "@/lib/motion";

/** Words of the statement brighten one after another as it scrolls through the viewport. */
export const aboutMotion: MotionSetups = {
  [MOTION_OK]: (root) => {
    const statement = root.querySelector("[data-statement]");
    if (!statement) return;

    gsap.fromTo(
      statement.querySelectorAll("[data-word]"),
      { opacity: 0.1 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: statement, start: "top 80%", end: "bottom 45%", scrub: true },
      },
    );
  },
};

/** Where each aurora field drifts to and back; paired by index with the [data-aurora] elements. */
const AURORA_DRIFT = [
  { x: 140, y: -70 },
  { x: -160, y: 90 },
  { x: 110, y: -100 },
];

/** Slow aurora fields and twinkling points that move on their own, without scroll or cursor input. */
export const aboutAmbientMotion: MotionSetups = {
  [MOTION_OK]: (root) => {
    gsap.utils.toArray<HTMLElement>("[data-aurora]", root).forEach((field, i) => {
      // Two loops with different periods, so the combined motion never visibly repeats.
      const drift = AURORA_DRIFT[i % AURORA_DRIFT.length];
      gsap.to(field, { ...drift, duration: 16 + i * 5, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.fromTo(
        field,
        { scale: 0.9, opacity: 0.55 },
        { scale: 1.25, opacity: 1, duration: 9 + i * 3, ease: "sine.inOut", repeat: -1, yoyo: true },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-star]", root).forEach((star, i) => {
      gsap.fromTo(
        star,
        { opacity: 0.08 },
        { opacity: 0.85, duration: 2 + (i % 4) * 0.8, delay: (i * 0.37) % 3, ease: "sine.inOut", repeat: -1, yoyo: true },
      );
    });
  },
};
