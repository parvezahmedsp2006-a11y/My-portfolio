import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutMe } from "@/components/AboutMe";
import { AcademicJourney } from "@/components/AcademicJourney";
import { ResearchInterests } from "@/components/ResearchInterests";
import { TechnicalProjects } from "@/components/TechnicalProjects";
import { SkillsAndLearning } from "@/components/SkillsAndLearning";
import { AcademicDevelopment } from "@/components/AcademicDevelopment";
import { ContactAndFooter } from "@/components/ContactAndFooter";

interface PageProps {
  searchParams?: Promise<{ slide?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const slideNum = resolvedParams?.slide ? parseInt(resolvedParams.slide, 10) : 0;
  const initialSlideIndex = !isNaN(slideNum) && slideNum >= 0 && slideNum <= 4 ? slideNum : 0;

  return (
    <div className="min-h-screen flex flex-col bg-warm-ivory selection:bg-sage-200 selection:text-charcoal-900">
      {/* 1. Responsive Navigation */}
      <Navbar />

      <main id="main-content" className="flex-1 focus:outline-none">
        {/* 2 & 3. Hero & Concise Introduction */}
        <Hero initialSlideIndex={initialSlideIndex} />

        {/* 4. About Me */}
        <AboutMe />

        {/* 5. Academic Journey */}
        <AcademicJourney />

        {/* 6. Research Interests */}
        <ResearchInterests />

        {/* 7. Technical Projects: GeoMine Resource Hub */}
        <TechnicalProjects />

        {/* 8. Skills & Learning */}
        <SkillsAndLearning />

        {/* 9. Academic Development and Future Goals */}
        <AcademicDevelopment />
      </main>

      {/* 10. Contact and Footer */}
      <ContactAndFooter />
    </div>
  );
}
