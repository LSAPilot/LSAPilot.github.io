import { SparkIcon } from "@/components/ui/icons";
import { techStack } from "@/content/profile";

function MarqueeRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {techStack.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-5 text-[clamp(1.25rem,2.5vw,2rem)] font-semibold tracking-tight whitespace-nowrap text-paper/70 md:px-8">
            {item}
          </span>
          <SparkIcon className="size-3 text-accent/70 md:size-4" />
        </li>
      ))}
    </ul>
  );
}

/** Endless typographic band of the tools I work with. Stands still for reduced motion. */
export function TechMarquee() {
  return (
    <section aria-label="Tools and technologies" className="border-y border-line py-6 md:py-8">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max motion-safe:animate-marquee">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </div>
    </section>
  );
}
