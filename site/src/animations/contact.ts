import { gsap, SplitText } from "@/lib/gsap";
import { CURSOR_MOTION_OK, MOTION_OK } from "@/lib/media-queries";
import { listen, type MotionSetups } from "@/lib/motion";

/** Distance (px) from the button center at which it starts to lean toward the cursor. */
const MAGNET_RADIUS = 200;
/** How far the button and, a bit less, its arrow follow the cursor (share of the distance). */
const MAGNET_PULL = { button: 0.35, arrow: 0.18 };

export const contactMotion: MotionSetups = {
  // Entrance: letters rise out of their line masks, then the button pops in.
  [MOTION_OK]: (root) => {
    const headline = root.querySelector<HTMLElement>("[data-headline]");
    const magnet = root.querySelector<HTMLElement>("[data-magnet]");
    if (!headline || !magnet) return;

    SplitText.create(headline, {
      type: "lines,chars",
      mask: "lines",
      autoSplit: true,
      // Returned so SplitText can revert and re-sync it when it re-splits (fonts, resize).
      onSplit: (self) =>
        gsap.from(self.chars, {
          yPercent: 115,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.025,
          scrollTrigger: { trigger: headline, start: "top 80%", once: true },
        }),
    });

    gsap.from(magnet, {
      scale: 0.4,
      opacity: 0,
      duration: 1.4,
      ease: "elastic.out(1, 0.55)",
      scrollTrigger: { trigger: magnet, start: "top 92%", once: true },
    });
  },

  // Cursor: the button leans toward the pointer; halo and text ring turn once on hover and back on leave.
  [CURSOR_MOTION_OK]: (root) => {
    const zone = root.querySelector<HTMLElement>("[data-magnet-zone]");
    const magnet = root.querySelector<HTMLElement>("[data-magnet]");
    const arrow = root.querySelector<HTMLElement>("[data-magnet-arrow]");
    const link = root.querySelector<HTMLElement>("[data-cta]");
    const turners = gsap.utils.toArray<HTMLElement>("[data-turn]", root);
    if (!zone || !magnet || !arrow || !link) return;

    const magnetX = gsap.quickTo(magnet, "x", { duration: 0.7, ease: "power3" });
    const magnetY = gsap.quickTo(magnet, "y", { duration: 0.7, ease: "power3" });
    const arrowX = gsap.quickTo(arrow, "x", { duration: 0.5, ease: "power3" });
    const arrowY = gsap.quickTo(arrow, "y", { duration: 0.5, ease: "power3" });

    const pull = (dx: number, dy: number) => {
      magnetX(dx * MAGNET_PULL.button);
      magnetY(dy * MAGNET_PULL.button);
      arrowX(dx * MAGNET_PULL.arrow);
      arrowY(dy * MAGNET_PULL.arrow);
    };

    // Absolute targets (0 <-> 360): a quick in-and-out simply reverses from wherever the turn is.
    // The slow CSS rotation keeps running on the inner elements underneath.
    const turnTo = (rotation: number) =>
      gsap.to(turners, { rotation, duration: 1, ease: "power2.inOut", overwrite: true });

    const stopListeningToSection = listen(root, {
      pointermove: (event) => {
        // The zone does not move, unlike the button, so its center is a stable reference.
        const rect = zone.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        if (Math.hypot(dx, dy) < MAGNET_RADIUS) pull(dx, dy);
        else pull(0, 0);
      },
      pointerleave: () => pull(0, 0),
    });
    const stopListeningToLink = listen(link, {
      pointerenter: () => turnTo(360),
      pointerleave: () => turnTo(0),
    });

    return () => {
      stopListeningToSection();
      stopListeningToLink();
    };
  },
};
