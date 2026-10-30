"use client";

import React, { useState } from "react";
import { Compass } from "lucide-react";
import { TRAVEL_DESTINATIONS, HOME_BASE, Destination } from "@/data/travelData";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";
import { InteractiveEarthGlobe } from "@/components/travel/InteractiveEarthGlobe";
import { JourneyStatistics } from "@/components/travel/JourneyStatistics";
import { FeaturedDestinations } from "@/components/travel/FeaturedDestinations";
import { PhotographyArchive } from "@/components/travel/PhotographyArchive";
import { TravelJournalModal } from "@/components/travel/TravelJournalModal";

export function BeyondTheHorizon() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [activeJournalDest, setActiveJournalDest] = useState<Destination | null>(null);

  const handleSelectFromGlobe = (dest: Destination | null) => {
    setSelectedDestination(dest);
  };

  const handleSelectFromCard = (dest: Destination) => {
    setSelectedDestination(dest);
  };

  const handleOpenJournal = (dest: Destination) => {
    setActiveJournalDest(dest);
  };

  return (
    <section
      id="travel"
      aria-labelledby="travel-heading"
      className="relative py-24 md:py-32 border-t border-white/[0.08] bg-[#000000] scroll-mt-20 sm:scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3.5">
            <Compass className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Interactive Terrestrial &amp; Travel Experience
            </span>
            <div className="w-10 h-px bg-white/15" aria-hidden="true" />
          </div>

          <LetterBounceHeading
            id="travel-heading"
            text="Beyond the Horizon"
            className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#FAF8F5] font-medium sm:font-semibold tracking-tight leading-[1.15]"
            staggerMs={42}
          />

          <div className="w-14 h-0.5 bg-[#D4AF37] mt-4" aria-hidden="true" />

          <p className="mt-4 text-base sm:text-lg lg:text-xl font-serif italic text-[#D4AF37] leading-relaxed">
            &ldquo;Every destination has a story. Every journey leaves a memory.&rdquo;
          </p>

          <p className="mt-2 text-[14.5px] sm:text-base font-sans text-[#D4CDBC] leading-relaxed max-w-2xl font-normal">
            A personal collection of places I&apos;ve explored, landscapes I&apos;ve discovered, and memories I&apos;ve carried along the way.
          </p>
        </div>

        {/* 1. Interactive 3D Earth Globe with Location Markers & Live Coordinates */}
        <div className="my-8 sm:my-12">
          <InteractiveEarthGlobe
            destinations={TRAVEL_DESTINATIONS}
            homeBase={HOME_BASE}
            selectedDestination={selectedDestination}
            onSelectDestination={handleSelectFromGlobe}
            onOpenJournal={handleOpenJournal}
          />
        </div>

        {/* 2. Compact Verified Journey Statistics Strip */}
        <JourneyStatistics destinations={TRAVEL_DESTINATIONS} />

        {/* 3. Featured Destinations Showcase */}
        <FeaturedDestinations
          destinations={TRAVEL_DESTINATIONS}
          onSelectDestination={handleSelectFromCard}
          onOpenJournal={handleOpenJournal}
        />

        {/* 4. Travel Photography Archive & Lightbox */}
        <PhotographyArchive destinations={TRAVEL_DESTINATIONS} />
      </div>

      {/* 5. Personal Travel Journal Modal */}
      <TravelJournalModal
        destination={activeJournalDest}
        onClose={() => setActiveJournalDest(null)}
        allDestinations={TRAVEL_DESTINATIONS}
        onNavigate={(dest) => setActiveJournalDest(dest)}
      />
    </section>
  );
}
