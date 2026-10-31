"use client";

import React from "react";
import { ArrowDown, FileDown } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";
import { Hero3DPortrait } from "@/components/ui/Hero3DPortrait";
import { GeologicalHeroBackground } from "@/components/ui/GeologicalHeroBackground";

interface HeroProps {
  initialSlideIndex?: number;
}

const QUOTE_WORDS = [
  "“Every",
  "layer",
  "of",
  "the",
  "Earth",
  "tells",
  "a",
  "story",
  "worth",
  "discovering.”",
];

export function Hero({ initialSlideIndex }: HeroProps = {}) {
  return (
    <section
      id="hero"
      aria-label="Portfolio Introduction and Identity"
      className="relative min-h-0 lg:min-h-screen bg-[#000000] text-[#F3F0E8] flex flex-col justify-center pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12 lg:pb-24 overflow-hidden"
    >
      {/* 
        AUTHENTIC GEOLOGICAL VISUAL IDENTITY — FOUR-SCENE AUTOMATIC SLIDESHOW
        1. Topographic Contours (Detailed elevation contour patterns)
        2. Mountain Landscape (Dark geological mountain silhouettes with gold lighting)
        3. Geological Strata (Layered sedimentary formations & chevron bedding)
        4. Mineral Texture (Metamorphic rock face with golden quartz veins)
        Enhanced with permanent vector elevation contours, layered mountain silhouettes, and strata.
        Transitions smoothly every 6 seconds with a 1.4s crossfade.
      */}
      <GeologicalHeroBackground initialSceneIndex={initialSlideIndex} />

      {/* Main Two-Column Balanced Hero Composition (Design 3: Minimal Cinematic Split) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 xl:gap-16 items-center">
          {/* 
            LEFT COLUMN — PORTRAIT (Design 3: Minimal Cinematic Split)
            - Mobile: Compact 72-74% width, max 240-250px, balanced margins, 0 extra vertical dead space
            - Desktop: Refined 390-420px column card with restrained 3D tilt & sunset radiance
            - Original orange-background illustration preserved 100% intact
          */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative order-1">
            <div className="relative flex items-center justify-center w-full">
              <Hero3DPortrait preload={true} className="z-10" />
            </div>
          </div>

          {/* 
            RIGHT COLUMN — PERSONAL INTRODUCTION (Editorial Academic Stack)
            Hierarchy:
            1. Compact academic badge (Inter, single line on mobile, no overflow)
            2. Main Name in Newsreader serif (fluid clamp, 36-44px on mobile, single line)
            3. Academic introduction (Inter, 15.5-18px, 1.6 leading, balanced)
            4. Philosophy quote in Newsreader italic (animated word-by-word)
            5. Action buttons (View Research & Projects + Download CV, touch-friendly min-h-[44px])
          */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10 order-2 mt-0">
            {/* 1. Compact Academic Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/[0.08] text-[#D4AF37] font-sans text-[10.5px] min-[360px]:text-[11px] sm:text-xs tracking-wider uppercase font-medium backdrop-blur-xs shadow-[0_2px_10px_rgba(0,0,0,0.5)] whitespace-nowrap">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse shrink-0"
                aria-hidden="true"
              />
              <span>Geology &amp; Mining Undergraduate</span>
            </div>

            {/* 2. Main Name Heading in Newsreader Serif */}
            <div className="mt-2 sm:mt-3.5 select-none w-full">
              <LetterBounceHeading
                as="h1"
                text={PORTFOLIO_DATA.personal.name}
                className="font-serif text-[clamp(2.15rem,7.5vw,2.75rem)] sm:text-5xl lg:text-[4rem] xl:text-[4.75rem] text-[#FAF8F5] font-medium sm:font-semibold tracking-tight leading-[1.06] inline-block pointer-events-none select-text drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] whitespace-nowrap"
                staggerMs={42}
                baseDelayMs={80}
              />
            </div>

            {/* 3. Academic Introduction */}
            <p className="mt-2.5 sm:mt-3.5 text-[15px] sm:text-[16.5px] lg:text-[18px] font-sans text-[#D4CDBC] max-w-xl leading-[1.6] font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              {PORTFOLIO_DATA.personal.academicIntro}
            </p>

            {/* 4. Philosophy Quote (Newsreader Italic with Word-by-Word Animation) */}
            <blockquote
              aria-label="Academic philosophy quote"
              className="relative mt-3 sm:mt-4 max-w-xl border-l-2 border-[#D4AF37]/60 pl-3 sm:pl-4 py-0.5 sm:py-1 text-left backdrop-blur-2xs"
            >
              <span className="sr-only">
                “Every layer of the Earth tells a story worth discovering.”
              </span>
              <p
                aria-hidden="true"
                className="font-serif italic font-normal text-[17px] sm:text-lg lg:text-xl text-[#FAF8F5]/90 leading-snug sm:leading-relaxed selection:bg-[#D4AF37]/30 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
              >
                {QUOTE_WORDS.map((word, idx) => (
                  <span
                    key={idx}
                    className="hero-quote-word inline-block mr-[0.24em] last:mr-0"
                    style={{
                      animationDelay: `${320 + idx * 110}ms`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </blockquote>

            {/* 5. Hero CTA Action Buttons */}
            <div className="flex flex-col min-[420px]:flex-row items-stretch min-[420px]:items-center justify-start gap-2.5 sm:gap-3.5 mt-4 sm:mt-6 w-full min-[420px]:w-auto">
              <a
                href="#research"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 min-h-[44px] rounded-full text-xs sm:text-sm font-sans font-semibold bg-[#D4AF37] text-black hover:bg-[#E5C378] transition-all duration-200 shadow-[0_4px_16px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              >
                <span>View Research &amp; Projects</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              </a>

              {PORTFOLIO_DATA.personal.cvAvailable ? (
                <a
                  href={PORTFOLIO_DATA.personal.cvUrl}
                  download
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 min-h-[44px] rounded-full text-xs sm:text-sm font-sans font-medium border border-white/20 bg-white/[0.04] text-[#FAF8F5] hover:bg-white/[0.08] hover:border-[#D4AF37]/60 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                >
                  <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" aria-hidden="true" />
                  <span>Download CV</span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Academic CV being prepared — coming soon"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 min-h-[44px] rounded-full text-xs sm:text-sm font-sans font-medium border border-white/10 bg-white/[0.02] text-[#9C988F] opacity-75 cursor-not-allowed"
                  aria-label="Download CV (CV coming soon)"
                >
                  <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9C988F]" aria-hidden="true" />
                  <span>Download CV (Coming Soon)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
