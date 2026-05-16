import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Intro from "@/components/Intro";
import SectionDivider from "@/components/SectionDivider";
import Skills from "@/components/Skills";
import StatsBanner from "@/components/StatsBanner";
import WhatICanDo from "@/components/WhatICanDo";
import CaseStudies from "@/components/CaseStudies";
import Process from "@/components/Process";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <StatsBanner />
      <SectionDivider />
      <WhatICanDo />
      <SectionDivider />
      <CaseStudies />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <Experience />
      <Contact />
    </main>
  );
}
