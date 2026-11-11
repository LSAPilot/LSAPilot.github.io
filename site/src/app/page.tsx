import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { AboutReveal } from "@/components/sections/AboutReveal";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Nav />
      {/* clip instead of hidden: prevents sideways scroll without creating a scroll container. */}
      <main className="w-full max-w-full overflow-x-clip">
        <Hero />
        <TechMarquee />
        <Skills />
        <Work />
        <AboutReveal />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
