import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";

export function TechnicalProjects() {
  const projects = PORTFOLIO_DATA.technicalProjects;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 md:py-32 border-t border-white/[0.08] bg-[#000000] relative scroll-mt-20 sm:scroll-mt-24"
    >
      <div id="geomine" className="absolute -top-20" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <p className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2.5">
            Software Architecture &amp; Engineering
          </p>
          <LetterBounceHeading
            id="projects-heading"
            text="Technical Projects"
            className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#FAF8F5] font-medium sm:font-semibold tracking-tight leading-[1.15]"
            staggerMs={42}
          />
          <div className="w-14 h-0.5 bg-[#D4AF37] mt-4" />
          <p className="mt-4 text-[15px] sm:text-base lg:text-[17px] font-sans text-[#D4CDBC] leading-[1.65] font-normal">
            Full-stack software engineering demonstrating system architecture, relational database design, accessible UI engineering, and automated test coverage.
          </p>
        </div>

        {/* Technical Projects List */}
        <div className="space-y-12">
          {projects.map((project) => (
            <ScrollReveal key={project.id}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
