import React from "react";
import { Droplets, Pickaxe, Flame, Compass, HelpCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Pickaxe,
  Flame,
  Compass,
};

export function ResearchInterests() {
  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="py-14 md:py-22 border-b border-border-subtle bg-warm-ivory"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-sans uppercase tracking-widest text-sage-700 font-semibold mb-2">
            Academic Focus & Inquiry
          </p>
          <h2
            id="research-heading"
            className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal tracking-tight"
          >
            Research Interests
          </h2>
          <div className="w-12 h-0.5 bg-sage-500 mt-3" />
          <p className="mt-3.5 text-sm sm:text-base font-sans text-charcoal-600 leading-relaxed">
            Prospective research directions reflecting my undergraduate coursework in geology and mining, formulated to guide future MSc scholarship applications and supervised graduate inquiry.
          </p>
        </div>

        {/* 2x2 Research Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {PORTFOLIO_DATA.researchInterests.map((interest, idx) => {
            const IconComponent = ICON_MAP[interest.iconName] || Compass;
            return (
              <ScrollReveal key={idx} delayMs={idx * 70}>
                <article className="academic-card p-6 sm:p-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-sm bg-sage-100 flex items-center justify-center text-sage-800 shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-400">
                          Focus Area 0{idx + 1}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal-900 leading-snug">
                          {interest.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-sans text-charcoal-700 leading-relaxed mb-4">
                      {interest.extendedDesc}
                    </p>

                    {/* Focus Topics Chips */}
                    <div className="mb-5">
                      <p className="text-[11px] font-semibold text-charcoal-600 uppercase tracking-wider mb-2">
                        Sub-Disciplines & Topics:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {interest.focusTopics.map((topic, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs px-2.5 py-1 rounded-sm bg-warm-ivory-dark/60 text-charcoal-700 border border-border-subtle"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Prospective Research Inquiry Box */}
                  <div className="mt-2 p-3.5 rounded-sm bg-sage-50/80 border border-sage-200/90">
                    <div className="flex items-start gap-2.5 text-xs font-sans text-sage-900">
                      <HelpCircle className="w-4 h-4 text-sage-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-sage-900 mb-0.5 text-[11px] uppercase tracking-wider">
                          Target Scientific Question:
                        </span>
                        <span className="italic text-charcoal-700 leading-relaxed">
                          &ldquo;{interest.scientificInquiry}&rdquo;
                        </span>
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
