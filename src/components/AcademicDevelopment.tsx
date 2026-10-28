import React from "react";
import { CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AcademicDevelopment() {
  return (
    <section
      id="goals"
      aria-labelledby="goals-heading"
      className="py-14 md:py-22 border-b border-border-subtle bg-warm-ivory-dark/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-sans uppercase tracking-widest text-sage-700 font-semibold mb-2">
            Strategic Roadmap & Scholarship Preparation
          </p>
          <h2
            id="goals-heading"
            className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal tracking-tight"
          >
            Academic Development & Future Goals
          </h2>
          <div className="w-12 h-0.5 bg-sage-500 mt-3" />
          <p className="mt-3.5 text-sm sm:text-base font-sans text-charcoal-600 leading-relaxed">
            A transparent academic trajectory outlining immediate undergraduate milestones, MSc scholarship targets, and long-term scientific objectives.
          </p>
        </div>

        {/* Timeline Roadmap */}
        <div className="space-y-6">
          {PORTFOLIO_DATA.futureGoals.map((goal, idx) => (
            <ScrollReveal key={idx} delayMs={idx * 100}>
              <div className="academic-card p-6 sm:p-7 bg-surface-white border-l-4 border-l-sage-600 rounded-md flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-sm bg-sage-100 text-sage-900 border border-sage-200">
                      {goal.timeframe}
                    </span>
                    <span className="text-[11px] font-sans font-medium text-charcoal-500">
                      {goal.stage}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal-900 mt-2 leading-snug">
                    {goal.title}
                  </h3>
                </div>

                <div className="md:w-2/3 space-y-4">
                  <p className="text-xs sm:text-sm font-sans text-charcoal-700 leading-relaxed">
                    {goal.description}
                  </p>

                  <div className="pt-2 border-t border-border-subtle">
                    <h4 className="text-[11px] font-semibold text-charcoal-600 uppercase tracking-wider mb-2.5">
                      Target Deliverables & Milestones:
                    </h4>
                    <ul className="space-y-2">
                      {goal.keyDeliverables.map((item, dIdx) => (
                        <li
                          key={dIdx}
                          className="text-xs sm:text-sm font-sans text-charcoal-700 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sage-700 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
