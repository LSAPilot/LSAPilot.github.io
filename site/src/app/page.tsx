import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      {/* First focusable element: lets keyboard users skip the navigation (WCAG 2.4.1). */}
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-paper px-5 py-3 font-medium text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Nav />
      {/* clip instead of hidden: prevents sideways scroll without creating a scroll container. */}
      <main id="main" className="w-full max-w-full overflow-x-clip">
        <Hero />
        <TechMarquee />
        <Work />
        <Skills />
        <About />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
