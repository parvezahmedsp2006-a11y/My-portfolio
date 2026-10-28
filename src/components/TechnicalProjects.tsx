import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function TechnicalProjects() {
  const projects = PORTFOLIO_DATA.technicalProjects;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-14 md:py-22 border-b border-border-subtle bg-warm-ivory-dark/30 relative"
    >
      {/* Anchor alias to ensure #geomine links still resolve smoothly */}
      <div id="geomine" className="absolute -top-20" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-sans uppercase tracking-widest text-sage-700 font-semibold mb-2">
            Software Architecture & Engineering
          </p>
          <h2
            id="projects-heading"
            className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal tracking-tight"
          >
            Technical Projects
          </h2>
          <div className="w-12 h-0.5 bg-sage-500 mt-3" />
          <p className="mt-3.5 text-sm sm:text-base font-sans text-charcoal-600 leading-relaxed">
            Full-stack software engineering projects demonstrating system architecture, relational database design, accessible UI engineering, and automated testing.
          </p>
        </div>

        {/* Technical Projects List */}
        <div className="space-y-10">
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
