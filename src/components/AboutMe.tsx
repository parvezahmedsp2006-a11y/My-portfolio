"use client";

import React, { useEffect, useRef, useState } from "react";
import { GraduationCap, MapPin, Compass } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { WordRevealBiography } from "@/components/ui/WordRevealBiography";

export function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

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

  const infoMetadata = [
    { icon: MapPin, label: "Field & Study Location", text: PORTFOLIO_DATA.personal.location },
    { icon: GraduationCap, label: "Academic Institution", text: PORTFOLIO_DATA.personal.institution },
    { icon: Compass, label: "Academic Identity", text: "Undergraduate Earth Scientist" },
  ];

  const metadataDelay = isMobile ? 1100 : 1500;

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative py-24 sm:py-32 border-t border-white/[0.08] bg-[#000000] overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <div
            className={`inline-flex items-center gap-2 mb-3.5 transition-all duration-500 ease-out ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              About The Researcher
            </span>
            <div className="w-10 h-px bg-white/15" />
          </div>

          <h2
            id="about-heading"
            className={`font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#F3F0E8] font-normal tracking-tight transition-all duration-600 ease-out leading-[1.12] ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            About Parvez Ahmed
          </h2>

          <div
            className={`w-14 h-0.5 bg-[#D4AF37] mt-4 origin-left transition-transform duration-700 ease-out ${
              isRevealed ? "scale-x-100" : "scale-x-0"
            }`}
            style={{
              transitionDelay: isRevealed ? "180ms" : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Narrative & Academic Metadata (Rebalanced without photo) */}
        <div className="max-w-4xl space-y-10 sm:space-y-12">
          <WordRevealBiography isRevealed={isRevealed} isMobile={isMobile} />

          {/* Academic Metadata Strip */}
          <div
            style={{
              transitionDelay: isRevealed ? `${metadataDelay}ms` : "0ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`pt-8 sm:pt-10 border-t border-white/[0.08] transition-all duration-500 ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              {infoMetadata.map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                    <item.icon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#9C988F] uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <span className="text-xs sm:text-[13px] font-sans font-light text-[#E6E1D3] block mt-0.5">
                      {item.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
