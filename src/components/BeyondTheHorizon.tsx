"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, ChevronRight, Plane } from "lucide-react";
import { TRAVEL_DESTINATIONS, HOME_BASE, Destination } from "@/data/travelData";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";
import { InteractiveEarthGlobe } from "@/components/travel/InteractiveEarthGlobe";
import { JourneyStatistics } from "@/components/travel/JourneyStatistics";
import { FeaturedTravelMemoriesCard } from "@/components/travel/FeaturedTravelMemoriesCard";
import { TravelJournalModal } from "@/components/travel/TravelJournalModal";

// Scenic editorial imagery themes for destination previews matching natural geological palettes
const DESTINATION_THEMES: Record<
  string,
  { gradient: string; accentColor: string; fallbackImg?: string }
> = {
  "dest-coxs-bazar": {
    gradient: "from-[#4a2618] via-[#a35c2f] to-[#e89b4a]",
    accentColor: "#f39c12",
  },
  "dest-sreemangal": {
    gradient: "from-[#132c14] via-[#2d5a27] to-[#5a8b43]",
    accentColor: "#2ecc71",
  },
  "dest-sylhet": {
    gradient: "from-[#0f2838] via-[#1d4d68] to-[#3a7c9f]",
    accentColor: "#3498db",
  },
  "dest-chittagong": {
    gradient: "from-[#2b1f3a] via-[#4d3663] to-[#7f5896]",
    accentColor: "#9b59b6",
  },
  "dest-patenga-beach": {
    gradient: "from-[#1a3038] via-[#2f5561] to-[#568a99]",
    accentColor: "#1abc9c",
  },
  "dest-pabna": {
    gradient: "from-[#332211] via-[#5e4225] to-[#916b41]",
    accentColor: "#e67e22",
  },
  "dest-natore": {
    gradient: "from-[#2d1b1f] via-[#5c2f37] to-[#8c4854]",
    accentColor: "#e74c3c",
  },
  "dest-mymensingh": {
    gradient: "from-[#1e2a22] via-[#354f3f] to-[#597e68]",
    accentColor: "#27ae60",
  },
  "dest-cumilla": {
    gradient: "from-[#362a19] via-[#634e2c] to-[#997946]",
    accentColor: "#f1c40f",
  },
};

export function BeyondTheHorizon() {
  // Default to Cox's Bazar so the selected card is prominently visible on initial load
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(
    TRAVEL_DESTINATIONS[0] ?? null
  );
  const [activeJournalDest, setActiveJournalDest] = useState<Destination | null>(null);

  const handleSelectDestination = (dest: Destination | null) => {
    setSelectedDestination(dest);
  };

  const handleOpenJournal = (dest: Destination) => {
    setActiveJournalDest(dest);
  };

  return (
    <section
      id="travel"
      aria-labelledby="travel-heading"
      className="relative border-t border-white/[0.08] bg-[#000000] scroll-mt-16 sm:scroll-mt-20 overflow-hidden"
    >
      {/* ── TOP SECTION: Globe (Left) + Travel Journey Atlas (Right) ─────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-16 pb-6 sm:pb-8">
        <div className="flex flex-col lg:flex-row min-h-[580px] lg:min-h-[640px] xl:min-h-[680px] rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#020202] overflow-hidden shadow-2xl">
          {/* ── LEFT COLUMN: 3D Earth Globe ─────────────────────────────────────── */}
          <div className="relative w-full lg:w-[50%] xl:w-[52%] lg:flex-shrink-0 bg-[#000000] border-b lg:border-b-0 lg:border-r border-white/[0.08] flex items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-0">
            <InteractiveEarthGlobe
              destinations={TRAVEL_DESTINATIONS}
              homeBase={HOME_BASE}
              selectedDestination={selectedDestination}
              onSelectDestination={handleSelectDestination}
              onOpenJournal={handleOpenJournal}
              className="w-full h-full"
            />
          </div>

          {/* ── RIGHT COLUMN: Editorial Travel Journey Panel ────────────────────── */}
          <div className="relative w-full lg:w-[50%] xl:w-[48%] lg:flex-shrink-0 flex flex-col justify-between bg-[#000000] p-5 sm:p-7 xl:p-8">
          {/* Header Block */}
          <div className="mb-6">
            <LetterBounceHeading
              id="travel-heading"
              text="Beyond the Horizon"
              className="font-serif text-3xl sm:text-4xl xl:text-[42px] text-[#FAF8F5] font-semibold tracking-tight leading-tight"
              staggerMs={38}
            />

            <div className="flex items-center gap-3 mt-1.5 mb-3">
              <p className="font-serif italic text-lg sm:text-xl text-[#D4AF37] leading-tight">
                My Travel Journey
              </p>
              <div className="h-px bg-[#D4AF37]/50 flex-1 max-w-[80px]" aria-hidden="true" />
              <Plane className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            </div>

            <p className="text-xs sm:text-[13.5px] font-sans text-[#A8A09A] leading-relaxed max-w-xl">
              A personal record of places visited across Bangladesh, documented through photography and memories from my home base in Narsingdi.
            </p>
          </div>

          {/* Cards Area: Destination List + Upgraded Featured Travel Memories Card */}
          {/* Side-by-side on wide desktop (xl), stacked on narrower viewports */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 flex-1 items-start">
            {/* Card 1: My Destinations (9) List */}
            <div className="rounded-2xl bg-[#070707] border border-white/[0.08] p-3.5 shadow-xl flex flex-col h-full max-h-[460px]">
              <div className="flex items-center gap-2 px-2.5 pb-2.5 mb-1.5 border-b border-white/[0.06]">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                  My Destinations ({TRAVEL_DESTINATIONS.length})
                </span>
              </div>

              <div className="overflow-y-auto pr-1 space-y-1.5 flex-1 custom-scrollbar">
                {TRAVEL_DESTINATIONS.map((dest) => {
                  const isSelected = selectedDestination?.id === dest.id;
                  const shortName = dest.name.replace(" (Chattogram)", "");
                  const theme = DESTINATION_THEMES[dest.id] || {
                    gradient: "from-[#2a2216] to-[#735b3c]",
                    accentColor: "#D4AF37",
                  };

                  return (
                    <button
                      key={dest.id}
                      type="button"
                      data-destination-item={dest.id}
                      onClick={() => handleSelectDestination(dest)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all duration-200 cursor-pointer group border ${
                        isSelected
                          ? "bg-[#D4AF37]/15 border-[#D4AF37]/75 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                          : "bg-black/50 border-white/[0.04] hover:border-white/15 hover:bg-white/[0.03]"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {/* Thumbnail with authentic photograph or thematic gradient */}
                      {dest.coverImage ? (
                        <div className="relative w-9 h-9 rounded-lg flex-shrink-0 overflow-hidden border border-white/15 shadow-sm group-hover:scale-105 transition-transform bg-[#0a0a0a]">
                          <Image
                            src={dest.coverImage}
                            alt={shortName}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-mono font-bold bg-gradient-to-br ${theme.gradient} border border-white/15 shadow-sm transition-transform group-hover:scale-105`}
                        >
                          <MapPin className="w-4 h-4 text-white/90 drop-shadow" />
                        </div>
                      )}

                      {/* Name & Tagline */}
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-xs sm:text-[13px] font-serif font-medium leading-tight truncate ${
                            isSelected ? "text-[#FAF8F5] font-semibold" : "text-[#D8D0C5] group-hover:text-[#FAF8F5]"
                          }`}
                        >
                          {shortName}
                        </div>
                        <div className="text-[10.5px] font-sans text-[#8C857B] truncate mt-0.5">
                          {dest.tagline}
                        </div>
                      </div>

                      {/* Chevron */}
                      <ChevronRight
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                          isSelected
                            ? "text-[#D4AF37] translate-x-0.5"
                            : "text-[#4A4640] group-hover:text-[#9C988F]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Upgraded Featured Travel Memories Card */}
            <FeaturedTravelMemoriesCard
              destinations={TRAVEL_DESTINATIONS}
              selectedDestination={selectedDestination}
              onSelectDestination={handleSelectDestination}
              onOpenJournal={handleOpenJournal}
              activeJournalDest={activeJournalDest}
            />
          </div>

          {/* Editorial Tagline Footer */}
          <div className="pt-6 mt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#8C857B]">
              Origins: Narsingdi (Home Base)
            </span>
            <p className="font-serif italic text-sm sm:text-base text-[#D4AF37]/80 tracking-wide text-right">
              Travel · Explore · Discover
            </p>
          </div>
        </div>
      </div>
    </div>

      {/* ── LOWER SECTION: Journey Statistics ─────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-10 sm:pb-14 relative z-10 border-t border-white/[0.04]">
        {/* Journey Statistics (Preserved) */}
        <JourneyStatistics destinations={TRAVEL_DESTINATIONS} />
      </div>

      {/* Personal Travel Journal Modal */}
      <TravelJournalModal
        destination={activeJournalDest}
        onClose={() => setActiveJournalDest(null)}
        allDestinations={TRAVEL_DESTINATIONS}
        onNavigate={(dest) => setActiveJournalDest(dest)}
      />
    </section>
  );
}
