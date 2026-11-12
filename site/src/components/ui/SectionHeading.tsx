import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type SectionHeadingProps = {
  id?: string;
  title: ReactNode;
  intro?: string;
  className?: string;
};

export function SectionHeading({ id, title, intro, className }: SectionHeadingProps) {
  return (
    <div className={cx("max-w-4xl", className)}>
      <h2 id={id} className="text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-bold tracking-tight text-balance">
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{intro}</p>}
    </div>
  );
}
