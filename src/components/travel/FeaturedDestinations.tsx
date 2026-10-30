"use client";

import React from "react";
import Image from "next/image";
import { MapPin, ArrowRight, Compass, Sparkles } from "lucide-react";
import { Destination } from "@/data/travelData";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";

interface FeaturedDestinationsProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onOpenJournal: (dest: Destination) => void;
}

export function FeaturedDestinations({
  destinations,
  onSelectDestination,
  onOpenJournal,
}: FeaturedDestinationsProps) {
  return (
    <div className="my-16 sm:my-24">
      {/* Section Sub-Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 mb-2.5">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Curated Selection
            </span>
          </div>

          <LetterBounceHeading
            as="h3"
            text="Featured Destinations."
            className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF8F5] font-semibold tracking-tight"
            staggerMs={36}
          />

          <p className="mt-2 text-sm sm:text-base font-sans text-[#D4CDBC] max-w-xl font-normal leading-relaxed">
            Nine verified personal journeys across Bangladesh, from coastal littoral horizons to ancient Barind terraces and riverine floodplains.
          </p>
        </div>

        {destinations.length > 0 && (
          <div className="text-xs font-mono text-[#9C988F] bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 shrink-0 self-start sm:self-auto">
            {destinations.length} Verified Destinations
          </div>
        )}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {destinations.map((dest) => (
          <article
            key={dest.id}
            onClick={() => {
              onSelectDestination(dest);
              onOpenJournal(dest);
            }}
            className="group relative bg-[#050505] border border-white/[0.08] hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_16px_40px_rgba(212,175,55,0.08)] cursor-pointer flex flex-col justify-between"
          >
            {/* Cover Image Container or Luxury Editorial Placeholder */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070707] border-b border-white/[0.06]">
              {dest.coverImage ? (
                <Image
                  src={dest.coverImage}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-br from-[#0c0c0c] via-[#070707] to-black">
                  {/* Subtle decorative concentric rings */}
                  <div
                    className="absolute w-40 h-40 rounded-full border border-[#D4AF37]/10 pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute w-60 h-60 rounded-full border border-white/[0.03] pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-col items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#D4AF37]/80 tracking-widest uppercase">
                      Photographs coming soon
                    </span>
                  </div>
                </div>
              )}

              {/* Coordinates Floating Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10.5px] font-mono text-[#FAF8F5]/90">
                <span>
                  {dest.latitude.toFixed(2)}° N, {dest.longitude.toFixed(2)}° E
                </span>
              </div>

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {dest.district} · {dest.region}
                  </span>
                </div>

                <h4 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] font-semibold leading-snug group-hover:text-[#FFF4D0] transition-colors">
                  {dest.name}
                </h4>

                <p className="mt-2 text-xs sm:text-[13.5px] font-sans text-[#D4CDBC] leading-relaxed line-clamp-2">
                  {dest.shortDescription}
                </p>

                {/* Status Pill */}
                <div className="mt-3.5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono text-[#9C988F] bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/[0.08]">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>Travel story coming soon</span>
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 mt-5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#D4AF37]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDestination(dest);
                    onOpenJournal(dest);
                  }}
                  className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 font-medium hover:text-[#FFF4D0] cursor-pointer"
                >
                  <span>Explore Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-[#9C988F]">
                  {dest.galleryImages?.length || 0} Photos
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
