"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "./gsap";

/**
 * Sets up animations for one media query. Receives the scoped root element and may return
 * a cleanup (e.g. to remove event listeners). Tweens are reverted automatically.
 */
export type MotionSetup = (root: HTMLElement) => void | (() => void);

/** Media query -> setup. Each setup runs while its query matches and is reverted when it stops. */
export type MotionSetups = Record<string, MotionSetup>;

/**
 * Runs `setups` through gsap.matchMedia(), scoped to `scope`: selector text only matches inside
 * the root, and everything is reverted on unmount or when a query stops matching.
 */
export function useScopedMotion(scope: RefObject<HTMLElement | null>, setups: MotionSetups) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia(root);
      for (const [query, setup] of Object.entries(setups)) {
        mm.add(query, () => setup(root), root);
      }
      return () => mm.revert();
    },
    { scope },
  );
}

type Listeners = { [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K]) => void };

/** Adds several event listeners at once and returns one function that removes them all. */
export function listen(target: HTMLElement, listeners: Listeners): () => void {
  const entries = Object.entries(listeners) as [string, EventListener][];
  entries.forEach(([type, listener]) => target.addEventListener(type, listener));
  return () => entries.forEach(([type, listener]) => target.removeEventListener(type, listener));
}

export type Point = { x: number; y: number };

/** Pointer position relative to `element`, plus the element's size. */
export function pointerIn(event: PointerEvent, element: Element) {
  const rect = element.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top, width: rect.width, height: rect.height };
}

/**
 * Keeps `element` centered on a point with a little inertia, via gsap.quickTo() so frequent
 * pointer moves reuse one tween. The element is measured in jump(), not on creation: the
 * stylesheet may not be applied yet when the setup runs, and a size of 0 would offset it.
 */
export function createFollower(element: HTMLElement, duration: number) {
  const toX = gsap.quickTo(element, "x", { duration, ease: "power3" });
  const toY = gsap.quickTo(element, "y", { duration, ease: "power3" });
  let half = 0;

  return {
    /** Places the element on the point instantly; call it when the pointer enters. */
    jump({ x, y }: Point) {
      half = element.offsetWidth / 2;
      gsap.set(element, { x: x - half, y: y - half });
    },
    /** Glides the element to the point. */
    move({ x, y }: Point) {
      toX(x - half);
      toY(y - half);
    },
  };
}

/** quickTo for opacity fades, which every hover effect here uses. */
export function createFader(element: HTMLElement, duration = 0.6) {
  return gsap.quickTo(element, "opacity", { duration, ease: "power2.out" });
}
