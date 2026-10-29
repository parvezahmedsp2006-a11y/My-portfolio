import React from "react";
import { Droplets, Pickaxe, Flame, Compass, HelpCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GeologicalGlobe } from "@/components/GeologicalGlobe";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";

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
      className="py-24 md:py-32 border-t border-white/[0.08] bg-[#000000] scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section Header — two-column on lg+: text left, globe right */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 mb-14 sm:mb-18">

          {/* Left: heading and description */}
          <div className="max-w-2xl lg:max-w-xl flex-1 min-w-0">
            <p className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2.5">
              Academic Focus &amp; Inquiry
            </p>
            <LetterBounceHeading
              id="research-heading"
              text="Research Interests"
              className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#FAF8F5] font-medium sm:font-semibold tracking-tight leading-[1.15]"
              staggerMs={42}
            />
            <div className="w-14 h-0.5 bg-[#D4AF37] mt-4" />
            <p className="mt-4 text-[15px] sm:text-base lg:text-[17px] font-sans text-[#D4CDBC] leading-[1.65] font-normal">
              Prospective research directions grounded in undergraduate geology and mining coursework, formulated for international MSc scholarship applications and graduate inquiry.
            </p>
          </div>

          {/* Right: decorative geological globe — desktop beside heading, mobile centred below */}
          <div
            className="flex items-center justify-center lg:justify-end lg:shrink-0"
            aria-hidden="true"
          >
            <GeologicalGlobe
              size={220}
              className="opacity-80 lg:opacity-90 w-[160px] sm:w-[200px] lg:w-[220px] h-auto"
            />
          </div>

        </div>

        {/* 2x2 Research Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PORTFOLIO_DATA.researchInterests.map((interest, idx) => {
            const IconComponent = ICON_MAP[interest.iconName] || Compass;
            return (
              <ScrollReveal key={idx} delayMs={idx * 80}>
                <article className="academic-card p-6 sm:p-8 flex flex-col justify-between h-full bg-[#0A0A0A]">
                  <div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="w-11 h-11 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block">
                          Focus Area 0{idx + 1}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-medium sm:font-semibold text-[#FAF8F5] leading-snug mt-0.5">
                          {interest.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm sm:text-[15px] font-sans text-[#D4CDBC] leading-[1.6] mb-5 font-normal">
                      {interest.extendedDesc}
                    </p>

                    {/* Focus Topics Chips */}
                    <div className="mb-6">
                      <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-2.5 font-medium">
                        Sub-Disciplines &amp; Topics:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {interest.focusTopics.map((topic, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs sm:text-[13px] px-3 py-1 rounded-full bg-white/[0.04] text-[#FAF8F5] border border-white/10 font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Prospective Research Inquiry Callout */}
                  <div className="mt-3 p-4 rounded-lg bg-[#050505] border border-white/[0.08]">
                    <div className="flex items-start gap-3 text-xs font-sans">
                      <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[#D4AF37] uppercase tracking-wider block mb-1 text-[11px] font-medium">
                          Target Scientific Question:
                        </span>
                        <span className="font-serif italic text-[#FAF8F5] text-[15px] sm:text-base leading-relaxed block font-normal">
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
