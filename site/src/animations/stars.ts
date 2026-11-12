import { gsap } from "@/lib/gsap";

/** Lets every [data-star] inside root fade in and out on its own rhythm (see <Starfield>). */
export function twinkleStars(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-star]", root).forEach((star, i) => {
    gsap.fromTo(
      star,
      { opacity: 0.08 },
      { opacity: 0.85, duration: 2 + (i % 4) * 0.8, delay: (i * 0.37) % 3, ease: "sine.inOut", repeat: -1, yoyo: true },
    );
  });
}
