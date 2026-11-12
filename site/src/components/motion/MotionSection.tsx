"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { sectionMotion, type SectionMotionName } from "@/animations";
import { useScopedMotion } from "@/lib/motion";

type MotionSectionProps = ComponentPropsWithoutRef<"section"> & {
  motion: SectionMotionName;
};

/**
 * A <section> that runs one of the registered section animations on its children.
 * The section's content stays a server component; only this thin wrapper is client code.
 */
export function MotionSection({ motion, ...props }: MotionSectionProps) {
  const ref = useRef<HTMLElement>(null);
  useScopedMotion(ref, sectionMotion[motion]);
  return <section ref={ref} {...props} />;
}
