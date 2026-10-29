"use client";

import React from "react";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

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
      className="relative min-h-screen bg-[#000000] text-[#F3F0E8] flex flex-col justify-between pt-6 sm:pt-11 lg:pt-14 pb-8 sm:pb-16 lg:pb-20 overflow-hidden"
    >
      {/* Top Header Region (Matching Reference Layout) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Enormous Gold Calligraphic Wordmark (Centered in Upper Region) */}
        <div className="text-center pt-1 sm:pt-4 pointer-events-none select-none">
          <h1 className="calligraphic-wordmark text-[clamp(2.6rem,8.6vw,7.6rem)] leading-[0.94] tracking-wide inline-block pointer-events-none select-text">
            {PORTFOLIO_DATA.personal.name}
          </h1>
        </div>

        {/* Small, Discreet Horizontal Navigation Row (Below Wordmark, Aligned Right) */}
        <nav
          aria-label="Hero Navigation"
          className="relative z-30 pointer-events-auto flex flex-wrap justify-center sm:justify-end items-center gap-x-2.5 sm:gap-x-7 lg:gap-x-8 gap-y-1.5 sm:gap-y-2 mt-3 sm:mt-6 text-[11px] sm:text-[13px] font-sans"
        >
          {navItems.map((item, idx) => {
            const isHome = idx === 0;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative z-30 pointer-events-auto transition-colors duration-200 select-none tracking-wide cursor-pointer py-1 px-0.5 sm:py-1.5 sm:px-0.5 focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:outline-offset-2 rounded-xs ${
                  isHome
                    ? "text-[#D4AF37] font-medium"
                    : "text-[#9C988F] hover:text-[#F3F0E8] font-normal"
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
        Middle Region: Expansive Uninterrupted Black Negative Space
        Matching the luxurious void between navigation and photograph in the reference
      */}
      <div className="flex-1 min-h-[30px] sm:min-h-[70px] lg:min-h-[130px]" aria-hidden="true" />

      {/* 
        Lower Region: Responsive Side-by-Side Two-Column Layout
        - Left: Single Large Formal Portrait Photograph (no caption, no border)
        - Right: Elegant Word-by-Word Animated Quote
        - Pure editorial framing on both mobile and desktop
      */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-center">
          {/* Lower-Left: Single Large Formal Portrait */}
          <div className="col-span-5 sm:col-span-5 lg:col-span-5 flex flex-col items-start justify-center">
            <div className="relative aspect-[4/5] w-full max-w-[155px] sm:max-w-[280px] lg:max-w-[390px] overflow-hidden bg-[#0A0A0A]">
              <Image
                src="/images/portrait/parvez-ahmed-formal-portrait.png"
                alt="Formal academic portrait of Parvez Ahmed in formal suit, white shirt, and black tie"
                fill
                priority
                className="object-cover object-[center_15%]"
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 280px, 390px"
              />
            </div>
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
