"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, MapPin, Compass, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Destination } from "@/data/travelData";

interface TravelJournalModalProps {
  destination: Destination | null;
  onClose: () => void;
  allDestinations?: Destination[];
  onNavigate?: (dest: Destination) => void;
}

export function TravelJournalModal({
  destination,
  onClose,
  allDestinations = [],
  onNavigate,
}: TravelJournalModalProps) {
  // ESC key and scroll lock
  useEffect(() => {
    if (!destination) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [destination, onClose]);

  if (!destination) return null;

  const currentIndex = allDestinations.findIndex((d) => d.id === destination.id);
  const prevDest = currentIndex > 0 ? allDestinations[currentIndex - 1] : null;
  const nextDest =
    currentIndex >= 0 && currentIndex < allDestinations.length - 1
      ? allDestinations[currentIndex + 1]
      : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="journal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-hero-fade overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#070707] border border-white/[0.12] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.95)] overflow-y-auto flex flex-col"
      >
        {/* Modal Sticky Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#070707]/95 backdrop-blur-md border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
            <Compass className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">Personal Travel Journal</span>
          </div>

          <div className="flex items-center gap-3">
            {allDestinations.length > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={!prevDest}
                  onClick={() => prevDest && onNavigate && onNavigate(prevDest)}
                  className="p-1.5 rounded-lg text-[#9C988F] hover:text-[#FAF8F5] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.06] transition-colors"
                  aria-label="Previous destination"
                  title="Previous destination"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={!nextDest}
                  onClick={() => nextDest && onNavigate && onNavigate(nextDest)}
                  className="p-1.5 rounded-lg text-[#9C988F] hover:text-[#FAF8F5] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.06] transition-colors"
                  aria-label="Next destination"
                  title="Next destination"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9C988F] hover:text-[#FAF8F5] hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close Journal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8">
          {/* Header Metadata & Reference-3 Tape Plaque Aesthetic */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37] font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {destination.region}, {destination.country}
                </span>
                <span className="text-white/20">·</span>
                <span>
                  {destination.latitude.toFixed(4)}° N, {destination.longitude.toFixed(4)}° E
                </span>
              </div>

              <h2
                id="journal-modal-title"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF8F5] font-semibold tracking-tight"
              >
                {destination.name}
              </h2>

              <p className="font-serif italic text-base sm:text-lg text-[#D4AF37] font-normal">
                {destination.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#9C988F] shrink-0">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Visited: {destination.visitDate}</span>
            </div>
          </div>

          {/* Optional Cinematic Cover Photograph */}
          {destination.coverImage && (
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08]">
              <Image
                src={destination.coverImage}
                alt={destination.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 850px"
              />
            </div>
          )}

          {/* Story Narrative Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Field Chronicle &amp; Narrative</span>
            </h3>

            {destination.story.introduction && (
              <p className="font-serif text-lg sm:text-xl text-[#FAF8F5] leading-relaxed italic border-l-2 border-[#D4AF37]/40 pl-4 py-1">
                {destination.story.introduction}
              </p>
            )}

            <div className="space-y-4 text-[15px] sm:text-base font-sans text-[#D4CDBC] leading-[1.75] font-normal">
              {destination.story.narrative.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Key Observations & Memorable Moments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.08]">
            {destination.story.observations && destination.story.observations.length > 0 && (
              <div className="bg-[#050505] p-5 rounded-xl border border-white/[0.06] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Field Observations</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm font-sans text-[#FAF8F5]">
                  {destination.story.observations.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D4AF37] mt-1">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {destination.story.memorableMoments && destination.story.memorableMoments.length > 0 && (
              <div className="bg-[#050505] p-5 rounded-xl border border-white/[0.06] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Memorable Moments</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm font-sans text-[#FAF8F5]">
                  {destination.story.memorableMoments.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#D4AF37] mt-1">▪</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Associated Gallery Images */}
          {destination.galleryImages && destination.galleryImages.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                Associated Visuals ({destination.galleryImages.length})
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {destination.galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/[0.08] bg-black"
                  >
                    <Image src={img.url} alt={img.caption} fill className="object-cover" />
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/85 to-transparent text-[10px] font-sans text-white/90 truncate">
                      {img.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
