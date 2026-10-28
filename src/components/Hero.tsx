"use client";

import React from "react";
import { ArrowDown, Layers, BookOpen, ArrowRight, Building2, GraduationCap } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GeologicalBackgroundGallery } from "@/components/ui/GeologicalBackgroundGallery";

interface HeroProps {
  initialSlideIndex?: number;
}

export function Hero({ initialSlideIndex = 0 }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 border-b border-border-subtle overflow-hidden"
    >
      {/* Animated Geological Background Gallery Slideshow with Natural Photographic Dominance */}
      <GeologicalBackgroundGallery initialSlideIndex={initialSlideIndex} />

      {/* Restrained Geological Contour Lines SVG - Top Left subtle paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden z-20"
        aria-hidden="true"
      >
        <svg
          className="absolute -left-20 -top-16 w-[560px] h-[560px] text-sage-400/40 stroke-current"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 140 C110 100, 200 160, 310 120 C400 80, 460 140, 520 170"
            strokeWidth="1.2"
            strokeDasharray="4 2"
          />
          <path
            d="M10 210 C90 170, 180 230, 290 190 C390 150, 450 220, 530 250"
            strokeWidth="1.2"
          />
          <path
            d="M0 280 C80 240, 170 300, 280 250 C380 210, 440 290, 520 320"
            strokeWidth="1.2"
            strokeDasharray="6 3"
          />
          <path
            d="M0 350 C70 310, 160 370, 270 320 C370 280, 430 360, 510 390"
            strokeWidth="1.2"
          />
          <circle cx="290" cy="190" r="3.5" fill="currentColor" />
          <circle cx="180" cy="300" r="3" fill="currentColor" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-30 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Academic Persona, Narrative & Factual Overview */}
          <div className="lg:col-span-7 xl:col-span-6">
            {/* Academic Affiliation Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-sage-100/90 border border-sage-200/90 text-sage-900 text-xs font-sans font-medium mb-5 shadow-2xs animate-hero-1 max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-600 shrink-0 animate-pulse" />
              <span className="shrink-0">Undergraduate Candidate</span>
              <span className="text-sage-400 shrink-0">•</span>
              <span className="hidden sm:inline">{PORTFOLIO_DATA.personal.department}</span>
              <span className="sm:hidden">Geology &amp; Mining</span>
            </div>

            {/* Primary Headline */}
            <h1
              id="hero-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[50px] font-normal tracking-tight text-charcoal-950 leading-[1.14] sm:leading-[1.12] mb-5 animate-hero-2 break-words"
            >
              {PORTFOLIO_DATA.personal.headline}
            </h1>

            {/* Concise Supporting Text */}
            <p className="text-sm sm:text-base lg:text-[16.5px] font-sans text-charcoal-800 leading-relaxed font-normal mb-7 max-w-xl animate-hero-3">
              {PORTFOLIO_DATA.personal.subheadline}
            </p>

            {/* Verified Institutional Credential Strip with Distinct Icon Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 p-3.5 sm:p-4 rounded-2xl bg-surface-white/80 backdrop-blur-sm border border-border-subtle shadow-2xs max-w-xl animate-hero-4">
              {/* Institution */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-warm-ivory border border-border-subtle flex items-center justify-center shrink-0 text-charcoal-800 shadow-2xs">
                  <Building2 className="w-4.5 h-4.5 text-charcoal-700" />
                </div>
                <div>
                  <div className="font-semibold text-charcoal-900 text-xs sm:text-[13px] leading-tight">
                    Institution:
                  </div>
                  <div className="text-charcoal-600 text-xs leading-tight mt-0.5">
                    {PORTFOLIO_DATA.personal.institution}
                  </div>
                </div>
              </div>

              {/* Program */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-warm-ivory border border-border-subtle flex items-center justify-center shrink-0 text-charcoal-800 shadow-2xs">
                  <GraduationCap className="w-4.5 h-4.5 text-charcoal-700" />
                </div>
                <div>
                  <div className="font-semibold text-charcoal-900 text-xs sm:text-[13px] leading-tight">
                    Program:
                  </div>
                  <div className="text-charcoal-600 text-xs leading-tight mt-0.5">
                    {PORTFOLIO_DATA.personal.program}
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 animate-hero-5">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-white bg-sage-900 hover:bg-sage-950 rounded-xl shadow-xs hover:shadow-sm transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-sage-600"
              >
                <Layers className="w-4 h-4 text-sage-200" />
                <span>View Technical Projects</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#research"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-charcoal-900 bg-surface-white/85 hover:bg-warm-ivory border border-border-medium rounded-xl shadow-2xs transition-all duration-200 focus-visible:outline-2 focus-visible:outline-sage-600"
              >
                <span>Research Interests</span>
                <BookOpen className="w-4 h-4 text-charcoal-600" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-charcoal-800 hover:text-charcoal-950 transition-colors group ml-1"
              >
                <span>Contact</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Unobstructed Photographic Canvas */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6" aria-hidden="true" />
        </div>
      </div>

      {/* Hero Bottom Bar: Scroll Indicator Anchor */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-30 pt-4">
        <a
          href="#about"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-charcoal-900 text-white flex items-center justify-center hover:bg-charcoal-800 transition-colors shadow-2xs focus-visible:outline-2 focus-visible:outline-sage-600 group"
          aria-label="Scroll down to About section"
          title="Scroll down"
        >
          <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
