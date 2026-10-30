"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Camera, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Destination, GalleryImage, TRAVEL_CATEGORIES, TravelCategory } from "@/data/travelData";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";

interface PhotographyArchiveProps {
  destinations: Destination[];
}

export function PhotographyArchive({ destinations }: PhotographyArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<TravelCategory>("All");
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryImage | null>(null);

  // Aggregate all gallery images from destinations
  const allImages = useMemo(() => {
    const list: GalleryImage[] = [];
    destinations.forEach((dest) => {
      if (dest.galleryImages && dest.galleryImages.length > 0) {
        dest.galleryImages.forEach((img) => {
          list.push({
            ...img,
            location: img.location || `${dest.name}, ${dest.region}`,
            date: img.date || dest.visitDate,
          });
        });
      }
    });
    return list;
  }, [destinations]);

  // Filtered by selected category
  const filteredImages = useMemo(() => {
    if (selectedCategory === "All") return allImages;
    return allImages.filter((img) => img.category === selectedCategory);
  }, [allImages, selectedCategory]);

  // Lightbox keyboard controls
  useEffect(() => {
    if (!activeLightboxImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLightboxImage(null);
      if (e.key === "ArrowLeft") {
        const curIdx = filteredImages.findIndex((img) => img.id === activeLightboxImage.id);
        if (curIdx > 0) setActiveLightboxImage(filteredImages[curIdx - 1]);
      }
      if (e.key === "ArrowRight") {
        const curIdx = filteredImages.findIndex((img) => img.id === activeLightboxImage.id);
        if (curIdx < filteredImages.length - 1) setActiveLightboxImage(filteredImages[curIdx + 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeLightboxImage, filteredImages]);

  return (
    <div className="my-16 sm:my-24">
      {/* Header & Subtitle matching Reference 4 Visual Style */}
      <div className="max-w-3xl mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 mb-2.5">
          <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            Visual Chronicle
          </span>
        </div>

        <LetterBounceHeading
          as="h3"
          text="Seeing the world through light."
          className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF8F5] font-semibold tracking-tight"
          staggerMs={36}
        />

        <p className="mt-2 text-sm sm:text-base font-sans text-[#D4CDBC] font-normal leading-relaxed">
          Curated photographic observations documenting geological horizons, riverine channels, and atmospheric twilight across exploratory journeys.
        </p>
      </div>

      {/* Category Filter Pills (Phase 5 requirement) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">
        <Filter className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mr-1 hidden sm:block" />
        {TRAVEL_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? "bg-[#D4AF37] text-black font-semibold shadow-[0_0_12px_rgba(212,175,55,0.35)]"
                  : "bg-white/[0.04] text-[#D4CDBC] hover:text-[#FAF8F5] hover:bg-white/[0.08] border border-white/10"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Images Grid or Refined Empty State */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveLightboxImage(img)}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08] hover:border-[#D4AF37]/50 cursor-pointer transition-all duration-500 shadow-md"
            >
              <Image
                src={img.url}
                alt={img.caption}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Category Pill Tag */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#D4AF37]">
                {img.category}
              </div>

              {/* Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-serif text-[#FAF8F5] font-medium leading-snug line-clamp-2">
                  {img.caption}
                </p>
                {img.location && (
                  <span className="text-[10px] font-mono text-[#9C988F] block mt-1 truncate">
                    {img.location}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-8 sm:p-14 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]">
              <Camera className="w-6 h-6" />
            </div>

            <h4 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] font-semibold tracking-tight">
              Personal Travel Photography Archive
            </h4>

            <p className="text-xs sm:text-sm font-sans text-[#D4CDBC] leading-relaxed">
              Curated photographic series capturing natural landscapes, rivers, mountains, and geological field horizons will be cataloged here once personal excursions are logged.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-[#9C988F] bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/[0.08]">
                <span>Category: {selectedCategory} · 0 Photographs Archived</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Accessible Fullscreen Lightbox Modal */}
      {activeLightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox Viewer"
          onClick={() => setActiveLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl animate-hero-fade"
        >
          <button
            type="button"
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-black/70 hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/10"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const curIdx = filteredImages.findIndex((img) => img.id === activeLightboxImage.id);
                  if (curIdx > 0) setActiveLightboxImage(filteredImages[curIdx - 1]);
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/70 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const curIdx = filteredImages.findIndex((img) => img.id === activeLightboxImage.id);
                  if (curIdx < filteredImages.length - 1) setActiveLightboxImage(filteredImages[curIdx + 1]);
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/70 hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
          >
            <div className="relative w-[85vw] max-w-4xl h-[65vh] rounded-lg overflow-hidden border border-white/10 bg-black">
              <Image
                src={activeLightboxImage.url}
                alt={activeLightboxImage.caption}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            <div className="mt-4 text-center space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                <span>{activeLightboxImage.category}</span>
                {activeLightboxImage.location && (
                  <>
                    <span className="text-white/20">·</span>
                    <span>{activeLightboxImage.location}</span>
                  </>
                )}
                {activeLightboxImage.date && (
                  <>
                    <span className="text-white/20">·</span>
                    <span>{activeLightboxImage.date}</span>
                  </>
                )}
              </div>
              <p className="text-sm font-serif text-[#FAF8F5] max-w-xl mx-auto">
                {activeLightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
