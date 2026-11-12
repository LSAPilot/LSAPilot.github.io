"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Animations only run when the visitor has not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Cursor-following effects need a real pointer that can hover, so not touch devices. */
export const CURSOR_MOTION_OK = `(hover: hover) and (pointer: fine) and ${MOTION_OK}`;

/** Pinning needs room next to the pinned column, so it is desktop only. */
export const DESKTOP_MOTION_OK = `(min-width: 1024px) and ${MOTION_OK}`;

export { gsap, ScrollTrigger, SplitText, useGSAP };
