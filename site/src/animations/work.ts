import { ScrollTrigger } from "@/lib/gsap";
import { DESKTOP_MOTION_OK, MOTION_OK } from "@/lib/media-queries";
import type { MotionSetups } from "@/lib/motion";
import { twinkleStars } from "./stars";

/**
 * The intro column ([data-pin]) stays pinned while the project gallery ([data-pin-track]) scrolls past.
 * The ambient points in the background twinkle.
 */
export const workMotion: MotionSetups = {
  [MOTION_OK]: twinkleStars,
  [DESKTOP_MOTION_OK]: (root) => {
    const intro = root.querySelector<HTMLElement>("[data-pin]");
    const track = root.querySelector<HTMLElement>("[data-pin-track]");
    if (!intro || !track) return;

    ScrollTrigger.create({
      trigger: intro,
      start: "top 128px",
      end: () => `+=${Math.max(0, track.offsetHeight - intro.offsetHeight)}`,
      pin: true,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });
  },
};
