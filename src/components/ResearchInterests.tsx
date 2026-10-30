import React from "react";
import {
  Droplets,
  Pickaxe,
  Flame,
  Compass,
  HelpCircle,
  BookOpen,
  FileText,
  ExternalLink,
  Sparkles,
} from "lucide-react";
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
  const { researchInterests, selectedWork, researchStatement } = PORTFOLIO_DATA;
  const verifiedWork = selectedWork.filter((item) => !item.isPlaceholder);

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="py-24 md:py-32 border-t border-white/[0.08] bg-[#000000] scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section Header — two-column on lg+: text left, globe right */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 mb-12 sm:mb-16">

          {/* Left: heading and description */}
          <div className="max-w-2xl lg:max-w-xl flex-1 min-w-0">
            <p className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2.5">
              Academic Focus &amp; Inquiry
            </p>
            <LetterBounceHeading
              id="research-heading"
              text="Research & Selected Work"
              className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#FAF8F5] font-medium sm:font-semibold tracking-tight leading-[1.15]"
              staggerMs={42}
            />
            <div className="w-14 h-0.5 bg-[#D4AF37] mt-4" />
            <p className="mt-4 text-[15px] sm:text-base lg:text-[17px] font-sans text-[#D4CDBC] leading-[1.65] font-normal">
              Key areas of inquiry explored through undergraduate studies in Geology &amp; Mining, focusing on groundwater systems, mineral resources, petroleum geology, and spatial earth observation.
            </p>
          </div>

          {/* Right: decorative geological globe */}
          <div
            className="flex items-center justify-center lg:justify-end lg:shrink-0"
            aria-hidden="true"
          >
            <GeologicalGlobe
              size={200}
              className="opacity-80 lg:opacity-90 w-[150px] sm:w-[180px] lg:w-[200px] h-auto"
            />
          </div>

        </div>

        {/* Research Statement Block */}
        <ScrollReveal delayMs={40}>
          <div className="p-6 sm:p-7 rounded-xl bg-[#070707] border border-[#D4AF37]/35 mb-12 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              <span>Research Statement</span>
            </div>
            {/* TODO: Update with user's verified personal research statement */}
            <p className="text-sm sm:text-base font-sans text-[#FAF8F5] leading-relaxed font-normal">
              {researchStatement}
            </p>
          </div>
        </ScrollReveal>

        {/* Compact 4 Focus Areas Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/[0.06]">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Core Focus Areas (4)
            </h3>
            <span className="text-xs font-mono text-[#9C988F]">Undergraduate Studies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {researchInterests.map((interest, idx) => {
              const IconComponent = ICON_MAP[interest.iconName] || Compass;
              return (
                <ScrollReveal key={idx} delayMs={idx * 60}>
                  <article className="academic-card p-5 sm:p-6 flex flex-col justify-between h-full bg-[#080808] border border-white/[0.08] hover:border-[#D4AF37]/35 transition-colors">
                    <div>
                      <div className="flex items-center gap-3 mb-3.5">
                        <div className="w-9 h-9 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block">
                            Focus Area 0{idx + 1}
                          </span>
                          <h4 className="font-serif text-lg sm:text-xl font-medium text-[#FAF8F5] leading-snug">
                            {interest.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs sm:text-[13.5px] font-sans text-[#D4CDBC] leading-[1.55] mb-4 font-normal">
                        {interest.shortDesc}
                      </p>

                      {/* Focus Topics Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {interest.focusTopics.map((topic, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.03] text-[#FAF8F5] border border-white/10 font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Prospective Research Inquiry Callout */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-start gap-2 text-xs font-sans">
                      <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <p className="font-serif italic text-[#FAF8F5] text-[13px] sm:text-[13.5px] leading-snug font-normal">
                        &ldquo;{interest.scientificInquiry}&rdquo;
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Selected Work Subsection */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/[0.06]">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                Selected Academic Work
              </h3>
              <p className="text-xs font-sans text-[#9C988F] mt-1">
                Field Reports · Laboratory Investigations · Seminars · Spatial Maps
              </p>
            </div>
            <span className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded border border-[#D4AF37]/25">
              Coursework Output
            </span>
          </div>

          {verifiedWork.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {verifiedWork.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-[#080808] border border-white/[0.08] hover:border-[#D4AF37]/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37] mb-2">
                      <span className="uppercase tracking-wider">{item.categoryLabel}</span>
                      <span className="text-[#9C988F]">{item.year}</span>
                    </div>
                    <h4 className="font-serif text-base text-[#FAF8F5] font-medium leading-snug mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs font-sans text-[#D4CDBC] leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <span className="text-[11px] font-mono text-[#9C988F] block">
                      Context: {item.courseOrContext}
                    </span>
                  </div>

                  {item.fileOrLink && (
                    <a
                      href={item.fileOrLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] hover:underline mt-4 pt-3 border-t border-white/[0.06]"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Documentation</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Clean academic empty state when no items have verified user content yet (Rule F) */
            <div className="p-7 rounded-xl bg-[#060606] border border-dashed border-white/15 text-center space-y-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37] mx-auto opacity-75" />
              <h4 className="font-serif text-base text-[#FAF8F5] font-medium">
                Undergraduate Work In Progress
              </h4>
              <p className="text-xs sm:text-[13px] font-sans text-[#9C988F] max-w-lg mx-auto leading-relaxed">
                Field reports, mineralogy lab investigations, seminar presentations, and GIS terrain models will be documented here as academic coursework progresses.
              </p>
              {/* TODO: Add genuine field trip reports, mineralogy lab observations, seminar papers, and GIS maps */}
              <span className="inline-block text-[10.5px] font-mono text-[#D4AF37]/80 bg-[#D4AF37]/10 px-2.5 py-0.5 rounded border border-[#D4AF37]/25 mt-1">
                TODO: Awaiting verified undergraduate field report and laboratory submissions
              </span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
