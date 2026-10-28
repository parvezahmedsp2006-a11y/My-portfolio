"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface AcademicPortraitProps {
  className?: string;
}

export function AcademicPortrait({ className = "" }: AcademicPortraitProps) {
  const [imageSrc, setImageSrc] = useState<string>(
    "/images/portrait/parvez-ahmed-formal-portrait.png"
  );

  return (
    <div className={`relative w-full max-w-[320px] mx-auto lg:max-w-none group ${className}`}>
      {/* Editorial Double-Border Portrait Frame with Soft Shadow & Subtle Lift */}
      <div className="bg-surface-white p-3.5 sm:p-4 rounded-2xl border border-border-subtle/90 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        {/* Photographic Canvas with Rounded Inner Corners and Restrained Zoom */}
        <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-warm-ivory border border-border-subtle/60">
          <Image
            src={imageSrc}
            alt={PORTFOLIO_DATA.personal.portraitAlt}
            fill
            className="object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            sizes="(max-width: 768px) 280px, 320px"
            onError={() => {
              setImageSrc("/images/portrait/portrait-placeholder.svg");
            }}
          />

          {/* Subtle Corner Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-charcoal-950/15 via-transparent to-transparent" />
        </div>

        {/* Editorial Caption Bar */}
        <div className="mt-3.5 pt-3 border-t border-border-subtle/70 flex items-center justify-between text-left">
          <div>
            <span className="font-serif text-[15px] sm:text-base font-medium text-charcoal-900 block leading-tight">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="text-[11px] sm:text-xs font-sans text-charcoal-500 block leading-tight mt-1 font-normal">
              B.Sc. (Hons.) Candidate • RU
            </span>
          </div>
          <div
            className="w-8 h-8 rounded-full bg-sage-50/90 border border-sage-200/90 flex items-center justify-center text-sage-800 shrink-0 shadow-2xs"
            aria-hidden="true"
          >
            <GraduationCap className="w-4 h-4 text-sage-700" />
          </div>
        </div>
      </div>

      {/* Subtle Handwritten Academic Tagline from Reference Mockup */}
      <div className="mt-3.5 text-left pl-2 flex items-center gap-1.5 select-none" aria-hidden="true">
        <span className="font-serif italic text-sage-700/80 text-[13px] sm:text-sm tracking-wide -rotate-2 inline-block">
          Geology shapes a better tomorrow
        </span>
      </div>
    </div>
  );
}
