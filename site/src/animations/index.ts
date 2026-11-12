import type { MotionSetups } from "@/lib/motion";
import { aboutMotion } from "./about";
import { contactMotion } from "./contact";
import { skillsMotion } from "./skills";
import { workMotion } from "./work";

/**
 * Animations that a server-rendered section can opt into by name through <MotionSection>.
 * A name, not the setup itself, crosses the server/client boundary, since functions cannot.
 */
export const sectionMotion = {
  about: aboutMotion,
  contact: contactMotion,
  skills: skillsMotion,
  work: workMotion,
} satisfies Record<string, MotionSetups>;

export type SectionMotionName = keyof typeof sectionMotion;
