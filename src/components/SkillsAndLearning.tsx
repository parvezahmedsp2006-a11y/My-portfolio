"use client";

import React from "react";
import { Compass, Code, BookOpen, Layers } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";

const CATEGORY_ICONS: Record<number, React.ComponentType<{ className?: string }>> = {
  0: Code,
  1: Compass,
  2: BookOpen,
};

const CATEGORY_FOOTERS: Record<number, string> = {
  0: "Demonstrated in the architecture and codebase of GeoMine Resource Hub and personal projects.",
  1: "Studied through departmental lectures, laboratory practicals, and field sessions.",
  2: "Practiced during ongoing development, testing, and technical documentation.",
};

export function SkillsAndLearning() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-24 md:py-32 border-t border-white/[0.08] bg-[#000000] scroll-mt-20 sm:scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3.5">
            <Layers className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Technical &amp; Academic Skills
            </span>
            <div className="w-10 h-px bg-white/15" aria-hidden="true" />
          </div>

          <LetterBounceHeading
            id="skills-heading"
            text="Skills & Learning"
            className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#FAF8F5] font-medium sm:font-semibold tracking-tight leading-[1.15]"
            staggerMs={42}
          />

          <div className="w-14 h-0.5 bg-[#D4AF37] mt-4" aria-hidden="true" />

          <p className="mt-4 text-[15px] sm:text-base lg:text-[17px] font-sans text-[#D4CDBC] leading-[1.65] font-normal">
            An honest overview of technologies I actively use in web development, concepts studied in my geology degree, and areas under current exploration.
          </p>
        </div>

        {/* Editorial Proficiency Legend Bar */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pb-6 mb-12 sm:mb-14 border-b border-white/[0.08] text-xs font-mono">
            <span className="text-[#D4AF37] uppercase tracking-wider font-semibold text-[11px]">
              Status Framework:
            </span>
            <div className="inline-flex items-center gap-2 text-[#FAF8F5] font-medium">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" aria-hidden="true" />
              <span>Currently Using (Active stack)</span>
            </div>
            <div className="inline-flex items-center gap-2 text-[#FAF8F5] font-medium">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#E5C378]" aria-hidden="true" />
              <span>Learning (Active study)</span>
            </div>
            <div className="inline-flex items-center gap-2 text-[#FAF8F5] font-medium">
              <span className="w-1.5 h-1.5 rotate-45 bg-white/60" aria-hidden="true" />
              <span>Familiar With (Coursework &amp; theory)</span>
            </div>
            <div className="inline-flex items-center gap-2 text-[#D4CDBC]">
              <span className="w-1.5 h-1.5 rotate-45 border border-white/40 bg-transparent" aria-hidden="true" />
              <span>Planning to Explore (Upcoming)</span>
            </div>
          </div>
        </ScrollReveal>

        {/* 3-Column Editorial Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {skills.map((skillGroup, idx) => {
            const Icon = CATEGORY_ICONS[idx] || Compass;
            const footerNote = CATEGORY_FOOTERS[idx];

            return (
              <ScrollReveal key={skillGroup.category} delayMs={idx * 90} className="h-full">
                <div className="bg-[#050505] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between h-full transition-colors duration-300 hover:border-white/[0.14] hover:bg-[#070707]">
                  <div>
                    {/* Category Title & Icon */}
                    <div className="flex items-start gap-3 pb-5 mb-5 border-b border-white/[0.06]">
                      <div className="w-8 h-8 rounded-xs bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#7E7A72] mb-1">
                          Category 0{idx + 1}
                        </span>
                        <LetterBounceHeading
                          as="h3"
                          text={skillGroup.category}
                          className="font-serif text-xl sm:text-[22px] font-medium sm:font-semibold text-[#FAF8F5] leading-snug"
                          staggerMs={38}
                        />
                      </div>
                    </div>

                    {/* Skill Items List */}
                    <ul className="space-y-4" role="list">
                      {skillGroup.items.map((item, sIdx) => {
                        let badgeClass = "text-[#9C988F] bg-white/[0.03] border-white/10";
                        if (item.level === "Currently Using") {
                          badgeClass = "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30 font-medium";
                        } else if (item.level === "Learning") {
                          badgeClass = "text-[#E5C378] bg-[#E5C378]/10 border-[#E5C378]/30 font-medium";
                        } else if (item.level === "Familiar With") {
                          badgeClass = "text-[#FAF8F5] bg-white/[0.05] border-white/15 font-medium";
                        } else if (item.level === "Planning to Explore") {
                          badgeClass = "text-[#9C988F] bg-white/[0.02] border-white/10";
                        }

                        return (
                          <li
                            key={sIdx}
                            className="pb-3.5 border-b border-white/[0.05] last:border-b-0 last:pb-0"
                          >
                            <div className="flex items-start justify-between gap-3 mb-1">
                              <span className="text-sm sm:text-[14.5px] font-sans font-medium text-[#FAF8F5] leading-snug">
                                {item.name}
                              </span>
                              <span
                                className={`text-[10.5px] font-mono px-2 py-0.5 shrink-0 border rounded-xs ${badgeClass}`}
                              >
                                {item.level}
                              </span>
                            </div>
                            <p className="text-xs sm:text-[13px] font-sans text-[#D4CDBC] leading-[1.55] font-normal">
                              {item.note}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Departmental Context Footer */}
                  <div className="mt-6 pt-3.5 border-t border-white/[0.06] text-xs font-sans text-[#9C988F] font-normal">
                    {footerNote}
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
