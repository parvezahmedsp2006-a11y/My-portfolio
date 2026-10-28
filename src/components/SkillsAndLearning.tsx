import React from "react";
import { Compass, Code, BookOpen } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function SkillsAndLearning() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-14 md:py-22 border-b border-border-subtle bg-warm-ivory"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-sans uppercase tracking-widest text-sage-700 font-semibold mb-2">
            Technical & Methodological Competencies
          </p>
          <h2
            id="skills-heading"
            className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal tracking-tight"
          >
            Skills & Learning
          </h2>
          <div className="w-12 h-0.5 bg-sage-500 mt-3" />
          <p className="mt-3.5 text-sm sm:text-base font-sans text-charcoal-600 leading-relaxed">
            Honest inventory distinguishing established field and software capabilities from skills currently in active development.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-8 text-xs font-sans text-charcoal-600 bg-surface-white/70 p-3 rounded-md border border-border-subtle">
          <span className="font-semibold text-charcoal-800">Proficiency Scale:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sage-700" />
            <span>Core Foundation (Regularly applied in fieldwork/curriculum)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sage-400" />
            <span>Proficient (Solid implementation capability)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-earth-sand border border-charcoal-300" />
            <span>Developing (Active ongoing study & refinement)</span>
          </span>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((skillGroup, idx) => {
            return (
              <ScrollReveal key={idx} delayMs={idx * 80}>
                <div className="academic-card p-6 flex flex-col justify-between h-full rounded-md">
                  <div>
                    <div className="flex items-center gap-2.5 mb-4 text-sage-800">
                      {idx === 0 && <Compass className="w-5 h-5 text-sage-700" />}
                      {idx === 1 && <Code className="w-5 h-5 text-sage-700" />}
                      {idx === 2 && <BookOpen className="w-5 h-5 text-sage-700" />}
                      <h3 className="font-serif text-lg font-medium text-charcoal-900 leading-snug">
                        {skillGroup.category}
                      </h3>
                    </div>

                    <ul className="space-y-3.5 mt-4">
                      {skillGroup.items.map((item, sIdx) => {
                        let badgeColor = "bg-earth-sand text-charcoal-700 border-charcoal-300";
                        if (item.level === "Core Foundation") {
                          badgeColor = "bg-sage-700 text-white border-transparent";
                        } else if (item.level === "Proficient") {
                          badgeColor = "bg-sage-100 text-sage-800 border-sage-300";
                        }

                        return (
                          <li
                            key={sIdx}
                            className="pb-3 border-b border-border-subtle last:border-0"
                          >
                            <div className="flex items-center justify-between text-xs sm:text-sm font-sans text-charcoal-800 mb-1">
                              <span className="font-medium">{item.name}</span>
                              <span
                                className={`text-[10px] font-sans font-medium px-2 py-0.5 rounded-full shrink-0 border ${badgeColor}`}
                              >
                                {item.level}
                              </span>
                            </div>
                            <p className="text-[11px] font-sans text-charcoal-500 leading-snug">
                              {item.note}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-border-subtle text-[11px] font-sans text-charcoal-500">
                    {idx === 0 && "Evaluated via university laboratories and geological field excursions."}
                    {idx === 1 && "Demonstrated in the architecture and codebase of GeoMine Hub."}
                    {idx === 2 && "Practiced in academic coursework, seminars, and technical documentation."}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
