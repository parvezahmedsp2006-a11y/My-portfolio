"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";
import { Hero3DPortrait } from "@/components/ui/Hero3DPortrait";

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

export function Hero({ initialSlideIndex: _initialSlideIndex }: HeroProps = {}) {
  // Navigation links matching reference placement (below wordmark, aligned right)
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Journey", href: "#journey" },
    { name: "Research", href: "#research" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <section
      id="hero"
      aria-label="Portfolio Introduction and Identity"
      className="relative min-h-0 lg:min-h-screen bg-[#000000] text-[#F3F0E8] flex flex-col justify-start lg:justify-between pt-6 sm:pt-11 lg:pt-14 pb-10 sm:pb-16 lg:pb-20 overflow-hidden"
    >
      {/* Top Header Region (Matching Reference Layout) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Enormous Gold Calligraphic Wordmark (Centered in Upper Region with Letter Bounce) */}
        <div className="text-center pt-1 sm:pt-4 pointer-events-none select-none">
          <LetterBounceHeading
            as="h1"
            text={PORTFOLIO_DATA.personal.name}
            className="calligraphic-wordmark text-[clamp(2.6rem,8.6vw,7.6rem)] leading-[0.94] tracking-wide inline-block pointer-events-none select-text"
            staggerMs={45}
            baseDelayMs={80}
          />
        </div>

        {/* Small, Discreet Horizontal Navigation Row (Below Wordmark, Aligned Right) */}
        <nav
          aria-label="Hero Navigation"
          className="relative z-30 pointer-events-auto flex flex-wrap justify-center sm:justify-end items-center gap-x-2.5 sm:gap-x-7 lg:gap-x-8 gap-y-1.5 sm:gap-y-2 mt-3 sm:mt-6 text-xs sm:text-[13.5px] font-sans font-medium"
        >
          {navItems.map((item, idx) => {
            const isHome = idx === 0;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative z-30 pointer-events-auto transition-colors duration-200 select-none tracking-wide cursor-pointer py-1 px-0.5 sm:py-1.5 sm:px-0.5 focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2 rounded-xs ${
                  isHome
                    ? "text-[#D4AF37]"
                    : "text-[#D4CDBC] hover:text-[#FAF8F5]"
                }`}
                aria-current={isHome ? "page" : undefined}
              >
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>

      {/* 
        Middle Spacing:
        - Compact, balanced vertical space on mobile (no huge empty black gap)
        - Expansive negative space on desktop matching editorial reference
      */}
      <div className="h-5 sm:h-8 lg:h-auto lg:flex-1 lg:min-h-[100px]" aria-hidden="true" />

      {/* 
        Lower Region: Responsive Side-by-Side Two-Column Layout
        - Left: Single Large Formal Portrait Photograph (no caption, no border)
        - Right: Elegant Word-by-Word Animated Quote
        - Pure editorial framing on both mobile and desktop
      */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-center">
          {/* Lower-Left: Single Large Portrait with 3D Motion & Ambient Warmth */}
          <div className="col-span-5 sm:col-span-5 lg:col-span-5 flex flex-col items-start justify-center">
            <Hero3DPortrait />
          </div>

          {/* Right Area: Atmospheric Negative Space with Prominently Centered Word-by-Word Quote */}
          <div className="col-span-7 sm:col-span-7 lg:col-span-7 flex flex-col justify-center items-start lg:items-center text-left lg:text-center py-2 sm:py-6 lg:py-0">
            <blockquote
              aria-label="Philosophy quote"
              className="relative z-10 w-full max-w-lg lg:max-w-xl mx-auto flex flex-col items-start lg:items-center justify-center text-left lg:text-center"
            >
              <span className="sr-only">
                “Every layer of the Earth tells a story worth discovering.”
              </span>
              <p
                aria-hidden="true"
                className="font-serif font-medium sm:font-semibold text-[15px] min-[360px]:text-[16.5px] min-[390px]:text-[18px] sm:text-2xl md:text-[28px] lg:text-[36px] xl:text-[40px] text-[#FAF8F5] leading-[1.26] sm:leading-[1.28] tracking-tight selection:bg-[#D4AF37]/30"
              >
                {QUOTE_WORDS.map((word, idx) => (
                  <span
                    key={idx}
                    className="hero-quote-word inline-block mr-[0.24em] last:mr-0"
                    style={{
                      animationDelay: `${280 + idx * 130}ms`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
