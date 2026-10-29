"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface AcademicPortraitProps {
  className?: string;
}

export function AcademicPortrait({ className = "" }: AcademicPortraitProps) {
  const [imageSrc, setImageSrc] = useState<string>(
    "/images/portrait/parvez-ahmed-formal-portrait.png"
  );

  return (
    <div className={`relative w-full max-w-[340px] sm:max-w-[380px] mx-auto lg:max-w-none group ${className}`}>
      {/* Editorial Black Frame */}
      <div className="bg-[#050505] p-3 sm:p-4 rounded-xl border border-white/[0.09] hover:border-[#D4AF37]/40 shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all duration-300">
        {/* Photographic Canvas */}
        <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-[#0A0A0A]">
          <Image
            src={imageSrc}
            alt={PORTFOLIO_DATA.personal.portraitAlt}
            fill
            priority
            className="object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 320px, 380px"
            onError={() => {
              setImageSrc("/images/portrait/portrait-placeholder.svg");
            }}
          />
        </div>

        {/* Minimal Editorial Caption Bar */}
        <div className="mt-3.5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-left">
          <div>
            <span className="font-serif text-base text-[#F3F0E8] block leading-tight font-normal">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="text-[10.5px] font-mono text-[#D4AF37] block leading-tight mt-1 font-medium tracking-widest uppercase">
              B.Sc. (Hons.) Candidate · RU
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#9C988F]/60 tracking-wider uppercase select-none">
            Geology &amp; Mining
          </span>
        </div>
      </div>

      {/* Subtle Editorial Subtitle */}
      <div className="mt-3 text-left pl-1 select-none" aria-hidden="true">
        <span className="font-serif italic text-[#C5A059]/80 text-[13px] tracking-wide inline-block">
          Observational field geology connected with computational methods
        </span>
      </div>
    </div>
  );
}
