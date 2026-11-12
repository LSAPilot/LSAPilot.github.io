import { ScrollTrigger } from "@/lib/gsap";
import { DESKTOP_MOTION_OK } from "@/lib/media-queries";
import type { MotionSetups } from "@/lib/motion";

/** The intro column ([data-pin]) stays pinned while the project gallery ([data-pin-track]) scrolls past. */
export const workMotion: MotionSetups = {
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
