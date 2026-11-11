import { SparkIcon } from "@/components/ui/icons";
import { techStack } from "@/content/profile";

function MarqueeRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {techStack.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-8 text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-tight whitespace-nowrap text-paper/90 md:px-12">
            {item}
          </span>
          <SparkIcon className="size-5 text-accent md:size-7" />
        </li>
      ))}
    </ul>
  );
}

/** Endless typographic band of the tools I work with. Stands still for reduced motion. */
export function TechMarquee() {
  return (
    <section aria-label="Tools and technologies" className="border-y border-line py-10 md:py-14">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max motion-safe:animate-marquee">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </div>
    </section>
  );
}
