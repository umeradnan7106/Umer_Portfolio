import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Services from "@/components/sections/services";
import Work from "@/components/sections/work";
import Cta from "@/components/sections/cta";
import { hasResume } from "@/lib/resume";

export default function HomePage() {
  return (
    <>
      <Hero hasResume={hasResume()} />
      <About compact />
      <Experience />
      <Work />
      <Services />
      <Cta />
    </>
  );
}
