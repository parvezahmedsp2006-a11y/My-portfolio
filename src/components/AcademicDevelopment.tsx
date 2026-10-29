"use client";

import React from "react";
import { Compass, Milestone } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";

const HORIZON_LABELS: Record<number, string> = {
  0: "Active Undergraduate Stage · University of Rajshahi",
  1: "Targeting International MSc Research Groups",
  2: "Long-Range Trajectory & Scientific Publication",
};

export function AcademicDevelopment() {
  const { futureGoals } = PORTFOLIO_DATA;

  return (
    <section
      id="goals"
      aria-labelledby="goals-heading"
      className="relative py-24 md:py-32 border-t border-white/[0.08] bg-[#000000] scroll-mt-20 sm:scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-3.5">
            <Compass className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Strategic Roadmap &amp; Scholarship Preparation
            </span>
            <div className="w-10 h-px bg-white/15" aria-hidden="true" />
          </div>

          <LetterBounceHeading
            id="goals-heading"
            text="Academic Development & Future Goals"
            className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#FAF8F5] font-medium sm:font-semibold tracking-tight leading-[1.15]"
            staggerMs={42}
          />

          <div className="w-14 h-0.5 bg-[#D4AF37] mt-4" aria-hidden="true" />

          <p className="mt-4 text-[15px] sm:text-base lg:text-[17px] font-sans text-[#D4CDBC] leading-[1.65] font-normal">
            Academic roadmap outlining near-term undergraduate milestones, international MSc scholarship targets, and long-term scientific objectives.
          </p>
        </div>

        {/* Sequential Editorial Horizon Blocks */}
        <div className="space-y-8 lg:space-y-10">
          {futureGoals.map((goal, idx) => {
            const horizonLabel = HORIZON_LABELS[idx];

            return (
              <ScrollReveal key={goal.title} delayMs={idx * 100}>
                <article
                  className="bg-[#050505] border border-white/[0.08] p-6 sm:p-8 lg:p-10 transition-colors duration-300 hover:border-white/[0.14] hover:bg-[#070707]"
                  aria-labelledby={`goal-heading-${idx}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Horizon Identifier & Goal Title */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-[0.2em] font-semibold">
                        <Milestone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                        <span>Horizon 0{idx + 1} · {goal.timeframe}</span>
                      </div>

                      <div className="inline-flex items-center gap-2 text-[11.5px] font-mono text-[#E6E1D3]">
                        <span className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" aria-hidden="true" />
                        <span>{goal.stage}</span>
                      </div>

                      <LetterBounceHeading
                        as="h3"
                        id={`goal-heading-${idx}`}
                        text={goal.title}
                        className="font-serif text-2xl sm:text-[26px] lg:text-[28px] text-[#FAF8F5] font-medium sm:font-semibold tracking-tight leading-snug pt-1"
                        staggerMs={36}
                      />

                      <p className="text-xs font-mono text-[#9C988F] tracking-wide pt-1">
                        {horizonLabel}
                      </p>
                    </div>

                    {/* Right Column: Narrative Description & Deliverables */}
                    <div className="lg:col-span-7 space-y-6 lg:pl-6 lg:border-l lg:border-white/[0.07]">
                      <p className="text-[15px] sm:text-base font-sans text-[#D4CDBC] leading-[1.65] font-normal">
                        {goal.description}
                      </p>

                      <div className="pt-4 border-t border-white/[0.06]">
                        <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] mb-3.5 font-medium">
                          Target Milestones &amp; Key Deliverables
                        </div>

                        <ul className="space-y-3" role="list">
                          {goal.keyDeliverables.map((item, dIdx) => (
                            <li
                              key={dIdx}
                              className="flex items-start gap-3 text-sm sm:text-[14.5px] font-sans text-[#FAF8F5] font-normal leading-relaxed"
                            >
                              <span
                                className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/80 shrink-0 mt-2"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
