"use client";

import React, { useEffect, useRef, useState } from "react";
import { GraduationCap, Code2, Globe2, MapPin, Compass } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AcademicPortrait } from "@/components/ui/AcademicPortrait";
import { WordRevealBiography } from "@/components/ui/WordRevealBiography";

export function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    // Responsive stagger calibration
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Trigger intersection reveal once when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const el = sectionRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (el) observer.unobserve(el);
    };
  }, []);

  const pillars = [
    {
      icon: GraduationCap,
      title: "Geoscience Rigor",
      description:
        "Trained in fundamental earth science principles, stratigraphic logging, mineral diagnostics, and structural geological measurements through university curriculum.",
    },
    {
      icon: Code2,
      title: "Computational Execution",
      description:
        "Author of full-stack web platforms using Next.js, TypeScript, and modern database architectures to transform disorganized departmental materials into structured portals.",
    },
    {
      icon: Globe2,
      title: "MSc Scholarship Target",
      description:
        "Actively preparing for international graduate admissions with a focus on hydrogeology, mineral & petroleum systems, and spatial geosciences.",
    },
  ];

  const infoBadges = [
    { icon: MapPin, text: PORTFOLIO_DATA.personal.location },
    { icon: GraduationCap, text: PORTFOLIO_DATA.personal.institution },
    { icon: Compass, text: "Undergraduate Earth Scientist" },
  ];

  // Base delay for info badges depending on viewport
  const badgesBaseDelay = isMobile ? 1150 : 1600;

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative py-16 sm:py-20 md:py-26 border-b border-border-subtle bg-warm-ivory overflow-hidden"
    >
      {/* Subtle Geological Contour Lines (Top-left paper texture) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <svg
          className="absolute -left-20 -top-16 w-[520px] h-[520px] text-sage-400/40 stroke-current"
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
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header: Animated Heading & Expanding Sage Underline */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          {/* Eyebrow with Compass Icon & Delicate Divider (Matching Reference) */}
          <div
            className={`inline-flex items-center gap-2 mb-3 transition-all duration-500 ease-out ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <Compass className="w-4 h-4 text-sage-600" />
            <span className="text-xs font-sans uppercase tracking-widest text-sage-700 font-semibold">
              About Me
            </span>
            <div className="w-8 sm:w-10 h-px bg-border-medium" />
          </div>

          {/* Heading with Upward Motion & Opacity Reveal */}
          <h2
            id="about-heading"
            className={`font-serif text-3xl sm:text-4xl lg:text-[42px] text-charcoal-950 font-normal tracking-tight transition-all duration-600 ease-out leading-[1.15] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            About Parvez Ahmed
          </h2>

          {/* Expanding Sage-Green Underline */}
          <div
            className={`w-12 h-0.5 bg-sage-500 mt-3.5 origin-left transition-transform duration-700 ease-out ${
              isRevealed ? "scale-x-100" : "scale-x-0"
            }`}
            style={{
              transitionDelay: isRevealed ? "180ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Profile Grid: Portrait + Biographical Word-by-Word Narrative */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14 sm:mb-16">
          {/* Left Column: Dedicated Personal Portrait Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <AcademicPortrait />
          </div>

          {/* Right Column: Editorial Biography with Word-by-Word Reveal */}
          <div className="lg:col-span-8 flex flex-col justify-between relative">
            {/* Word-by-Word Narrative */}
            <WordRevealBiography isRevealed={isRevealed} isMobile={isMobile} />

            {/* Three Information Badges with Staggered Entrance & Soft Hover Transition */}
            <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-2.5 sm:gap-3 relative z-10">
              {infoBadges.map((badge, idx) => (
                <div
                  key={badge.text}
                  style={{
                    transitionDelay: isRevealed ? `${badgesBaseDelay + idx * 80}ms` : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-surface-white/95 border border-border-medium/80 hover:border-sage-400 hover:bg-sage-50/70 shadow-2xs hover:shadow-xs transition-all duration-300 group cursor-default select-none ${
                    isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-sage-50 group-hover:bg-sage-100/90 flex items-center justify-center text-sage-700 transition-colors shrink-0">
                    <badge.icon className="w-3.5 h-3.5 text-sage-700" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-sans font-medium text-charcoal-800 group-hover:text-charcoal-950 transition-colors">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtle Geological Mountain & Compass Rose Sketch (Bottom-right beside badges) */}
            <div
              className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-6 w-56 h-56 sm:w-68 sm:h-68 pointer-events-none opacity-25 select-none overflow-hidden z-0 hidden sm:block"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-sage-600/40"
              >
                {/* Mountain peaks sketch */}
                <path
                  d="M100 280 L180 180 L230 230 L270 170 L300 210"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M130 280 L180 180 L205 280"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                <path
                  d="M205 280 L230 230 L250 280"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                <path
                  d="M245 280 L270 170 L290 280"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />

                {/* Compass Rose Ring & Star */}
                <g transform="translate(210, 160)">
                  <circle cx="0" cy="0" r="42" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 2" />
                  <circle cx="0" cy="0" r="36" stroke="currentColor" strokeWidth="1" />

                  {/* 8-pointed star */}
                  <polygon
                    points="0,-32 4,-10 24,0 4,4 0,24 -4,4 -24,0 -4,-10"
                    fill="currentColor"
                    fillOpacity="0.2"
                    stroke="currentColor"
                    strokeWidth="0.8"
                  />
                  <polygon points="0,-32 -4,-10 0,0" fill="currentColor" fillOpacity="0.5" />
                  <polygon points="24,0 4,-4 0,0" fill="currentColor" fillOpacity="0.5" />
                  <polygon points="0,24 4,4 0,0" fill="currentColor" fillOpacity="0.5" />
                  <polygon points="-24,0 -4,4 0,0" fill="currentColor" fillOpacity="0.5" />

                  {/* Cardinal Direction Labels */}
                  <text x="0" y="-36" textAnchor="middle" fontSize="10" fontFamily="serif" fill="currentColor" fontWeight="600">
                    N
                  </text>
                  <text x="0" y="44" textAnchor="middle" fontSize="9" fontFamily="serif" fill="currentColor">
                    S
                  </text>
                  <text x="44" y="3" textAnchor="middle" fontSize="9" fontFamily="serif" fill="currentColor">
                    E
                  </text>
                  <text x="-44" y="3" textAnchor="middle" fontSize="9" fontFamily="serif" fill="currentColor">
                    W
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* 3-Pillar Academic Foundation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={idx} delayMs={idx * 80}>
                <div className="academic-card p-5 sm:p-6 rounded-xl h-full flex flex-col justify-between hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-sage-100/80 text-sage-800 shrink-0 mt-0.5 shadow-2xs">
                      <Icon className="w-4.5 h-4.5 text-sage-700" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-medium text-charcoal-900 mb-1.5 leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] font-sans text-charcoal-600 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
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
