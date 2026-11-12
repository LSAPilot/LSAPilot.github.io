import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MOTION_OK } from "@/lib/media-queries";
import type { MotionSetups } from "@/lib/motion";

const cardOf = (element: Element) => element.closest("[data-card]") ?? element;

/** Scroll range for the per-card visuals: scrubbed while the card moves through the viewport. */
const scrubIn = (element: Element, start: string, end: string): ScrollTrigger.Vars => ({
  trigger: cardOf(element),
  start,
  end,
  scrub: 0.6,
});

/** Line drawing for SVG paths that carry pathLength={1}. */
const drawLine = { strokeDasharray: 1, strokeDashoffset: 1 };

/** Pop-in for SVG nodes; they need [transform-box:fill-box] so they scale around their own center. */
const popIn = { scale: 0, transformOrigin: "50% 50%" };

export const skillsMotion: MotionSetups = {
  [MOTION_OK]: (root) => {
    const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, root);

    // Cards rise in one after another as they enter the viewport.
    const cards = q("[data-card]");
    gsap.set(cards, { opacity: 0, y: 56, scale: 0.95 });
    ScrollTrigger.batch(cards, {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out", stagger: 0.12, overwrite: true }),
    });

    // The accent glows drift slower than the cards for a little depth.
    q("[data-card-glow]").forEach((glow) => {
      gsap.fromTo(
        glow,
        { y: -40 },
        { y: 60, ease: "none", scrollTrigger: { trigger: cardOf(glow), start: "top bottom", end: "bottom top", scrub: true } },
      );
    });

    // Code editor: the syntax tokens write themselves line by line.
    const tokens = q("[data-token]");
    if (tokens.length) {
      gsap.fromTo(
        tokens,
        { scaleX: 0, transformOrigin: "0% 50%" },
        { scaleX: 1, ease: "none", stagger: 0.04, scrollTrigger: scrubIn(tokens[0], "top 80%", "top 20%") },
      );
    }

    // Databases: discs drop in, then the link between them draws and its node pops.
    const db = root.querySelector("[data-db]");
    if (db) {
      gsap
        .timeline({ scrollTrigger: scrubIn(db, "top 80%", "top 35%") })
        .fromTo(db.querySelectorAll("[data-disc]"), { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 0)
        .fromTo(db.querySelectorAll("[data-draw]"), drawLine, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0.6)
        .fromTo(db.querySelectorAll("[data-pop]"), popIn, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 1.4);
    }

    // Git branch graph: lines first, then the commit nodes pop in.
    const graph = root.querySelector("[data-branch]");
    if (graph) {
      gsap
        .timeline({ scrollTrigger: scrubIn(graph, "top 80%", "top 35%") })
        .fromTo(graph.querySelectorAll("[data-draw]"), drawLine, { strokeDashoffset: 0, duration: 1, stagger: 0.4, ease: "none" }, 0)
        .fromTo(graph.querySelectorAll("[data-pop]"), popIn, { scale: 1, duration: 0.4, stagger: 0.15, ease: "back.out(2)" }, 0.2);
    }

    // AI lines fill from the left, one after another.
    const bars = q("[data-bar]");
    if (bars.length) {
      gsap.fromTo(
        bars,
        { scaleX: 0, transformOrigin: "0% 50%" },
        { scaleX: 1, ease: "none", stagger: 0.25, scrollTrigger: scrubIn(bars[0], "top 80%", "top 30%") },
      );
    }
  },
};
