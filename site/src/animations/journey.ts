import { CURSOR_MOTION_OK } from "@/lib/media-queries";
import { createFader, createFollower, listen, pointerIn, type MotionSetups } from "@/lib/motion";

/** On hover a milestone's resting glow ([data-rest]) fades out and a copy ([data-glow]) follows the cursor. */
export const milestoneMotion: MotionSetups = {
  [CURSOR_MOTION_OK]: (root) => {
    const rest = root.querySelector<HTMLElement>("[data-rest]");
    const glow = root.querySelector<HTMLElement>("[data-glow]");
    if (!rest || !glow) return;

    const follower = createFollower(glow, 0.5);
    const fadeGlow = createFader(glow);
    const fadeRest = createFader(rest);

    return listen(root, {
      pointerenter: (event) => {
        follower.jump(pointerIn(event, root));
        fadeGlow(1);
        fadeRest(0.2);
      },
      pointermove: (event) => follower.move(pointerIn(event, root)),
      pointerleave: () => {
        fadeGlow(0);
        fadeRest(1);
      },
    });
  },
};
