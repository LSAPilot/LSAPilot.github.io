import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/content/profile";

type CardProps = {
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
};

function BentoCard({ title, description, className = "", children }: CardProps) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink-raised p-7 transition-colors duration-500 hover:border-paper/20 md:p-8 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-accent-strong/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-60"
      />
      {children}
      <div className="relative mt-auto pt-8">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-muted">{description}</p>
      </div>
    </article>
  );
}

function CodeSnippet() {
  return (
    <pre
      aria-hidden="true"
      className="relative overflow-hidden rounded-2xl border border-line bg-ink/80 p-5 font-mono text-[13px] leading-6 text-paper/70 transition-transform duration-700 ease-out group-hover:scale-105"
    >
      <span className="text-accent">class</span> Developer {"{\n"}
      {"  "}String[] languages = {"{"}
      <span className="text-sky-300">&quot;Java&quot;</span>, <span className="text-sky-300">&quot;Python&quot;</span>
      {"};\n}"}
    </pre>
  );
}

function BranchGraph() {
  return (
    <svg
      viewBox="0 0 200 80"
      aria-hidden="true"
      className="relative h-20 w-full transition-transform duration-700 ease-out group-hover:scale-105"
    >
      <path d="M10 56H190" stroke="currentColor" strokeWidth="2" className="text-paper/25" />
      <path d="M50 56C70 56 70 24 90 24H130C150 24 150 56 170 56" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent" />
      {[10, 50, 170, 190].map((x) => (
        <circle key={x} cx={x} cy="56" r="6" className="fill-ink stroke-paper/60" strokeWidth="2" />
      ))}
      {[90, 130].map((x) => (
        <circle key={x} cx={x} cy="24" r="6" className="fill-accent" />
      ))}
    </svg>
  );
}

/**
 * Gapless bento with grid-flow-dense.
 * lg (4 columns): frontend 2x2 + languages 2x1 + git 1x1 + teamwork 1x1 = 8 cells = 4 x 2.
 * md (2 columns): frontend 2 + languages 2 + git 1 + teamwork 1 = three full rows.
 */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24 py-32 md:py-48">
      <Container>
        <SectionHeading
          id="skills-title"
          title="What I bring to a team."
          intro="A solid base in web and software development, plus the soft skills that make projects work."
        />

        <div className="mt-16 grid grid-flow-dense auto-rows-[minmax(17rem,auto)] gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          <BentoCard {...skills.frontend} className="md:col-span-2 lg:row-span-2">
            <div className="relative overflow-hidden rounded-2xl bg-[#ece6ff] p-6 md:p-10">
              <Image
                src="/images/coding.svg"
                alt=""
                width={787}
                height={572}
                className="mx-auto h-auto w-full max-w-md transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </BentoCard>

          <BentoCard {...skills.languages} className="md:col-span-2">
            <CodeSnippet />
          </BentoCard>

          <BentoCard {...skills.git}>
            <BranchGraph />
          </BentoCard>

          <BentoCard {...skills.teamwork} />
        </div>
      </Container>
    </section>
  );
}
