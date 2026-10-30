"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Camera,
  Sparkles,
  Calendar,
} from "lucide-react";
import {
  Destination,
  FEATURED_TRAVEL_PHOTOS,
  TravelPhoto,
} from "@/data/travelData";

interface FeaturedTravelMemoriesCardProps {
  destinations: Destination[];
  selectedDestination: Destination | null;
  onSelectDestination: (dest: Destination | null) => void;
  onOpenJournal: (dest: Destination) => void;
  activeJournalDest?: Destination | null;
  className?: string;
}

// Scenic editorial gradients matching natural geological palettes
const DESTINATION_THEMES: Record<string, { gradient: string; accentColor: string }> = {
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

const DEFAULT_THEME = {
  gradient: "from-[#2a2216] via-[#483925] to-[#735b3c]",
  accentColor: "#D4AF37",
};

export function FeaturedTravelMemoriesCard({
  destinations,
  selectedDestination,
  onSelectDestination,
  onOpenJournal,
  activeJournalDest,
  className = "",
}: FeaturedTravelMemoriesCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouchInteracting, setIsTouchInteracting] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInternalChangeRef = useRef<boolean>(false);

  // 1. Resolve available photographs:
  // If destination is selected, display its photos (from FEATURED_TRAVEL_PHOTOS or destination.galleryImages).
  // If no destination is selected (general browse mode), display all FEATURED_TRAVEL_PHOTOS.
  const availablePhotos: TravelPhoto[] = useMemo(() => {
    if (selectedDestination) {
      // Direct destination photos
      const fromFeatured = FEATURED_TRAVEL_PHOTOS.filter(
        (p) =>
          p.destinationId === selectedDestination.id ||
          p.destinationId === selectedDestination.slug ||
          (p.destinationId === "dest-coxs-bazar" && selectedDestination.slug === "coxs-bazar")
      );
      if (fromFeatured.length > 0) return fromFeatured;

      if (selectedDestination.galleryImages && selectedDestination.galleryImages.length > 0) {
        return selectedDestination.galleryImages.map((img) => ({
          id: img.id,
          destinationId: selectedDestination.id,
          image: img.url,
          alt: img.caption || selectedDestination.name,
          caption: img.caption,
          featured: true,
          visitDate: img.date || selectedDestination.visitDate,
        }));
      }

      return [];
    }

    // General Browse collection when no destination is specifically filtered
    return FEATURED_TRAVEL_PHOTOS;
  }, [selectedDestination]);

  // Active theme based on current destination
  const activeTheme = useMemo(() => {
    if (selectedDestination) {
      return DESTINATION_THEMES[selectedDestination.id] || DEFAULT_THEME;
    }
    const currentPhoto = availablePhotos[currentPhotoIndex];
    if (currentPhoto) {
      return DESTINATION_THEMES[currentPhoto.destinationId] || DEFAULT_THEME;
    }
    return DEFAULT_THEME;
  }, [selectedDestination, availablePhotos, currentPhotoIndex]);

  // Current active photograph
  const currentPhoto: TravelPhoto | null = useMemo(() => {
    if (availablePhotos.length === 0) return null;
    return availablePhotos[currentPhotoIndex] || availablePhotos[0] || null;
  }, [availablePhotos, currentPhotoIndex]);

  // Associated destination for current photograph
  const activeDestination: Destination | null = useMemo(() => {
    if (selectedDestination) return selectedDestination;
    if (currentPhoto) {
      return destinations.find((d) => d.id === currentPhoto.destinationId) || null;
    }
    return destinations[0] || null;
  }, [selectedDestination, currentPhoto, destinations]);

  // Reset slide index when external destination changes
  useEffect(() => {
    if (isInternalChangeRef.current) {
      isInternalChangeRef.current = false;
      return;
    }
    setCurrentPhotoIndex(0);
  }, [selectedDestination?.id]);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Listen to document visibilitychange
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Manual slide change with automatic Globe synchronization
  const goToSlide = useCallback(
    (targetIndex: number) => {
      if (availablePhotos.length === 0) return;
      const newIndex = (targetIndex + availablePhotos.length) % availablePhotos.length;
      setCurrentPhotoIndex(newIndex);

      const nextPhoto = availablePhotos[newIndex];
      if (
        nextPhoto &&
        nextPhoto.destinationId &&
        nextPhoto.destinationId !== selectedDestination?.id &&
        nextPhoto.destinationId !== selectedDestination?.slug
      ) {
        const matchingDest = destinations.find(
          (d) => d.id === nextPhoto.destinationId || d.slug === nextPhoto.destinationId
        );
        if (matchingDest) {
          isInternalChangeRef.current = true;
          onSelectDestination(matchingDest);
        }
      }
    },
    [availablePhotos, destinations, selectedDestination?.id, selectedDestination?.slug, onSelectDestination]
  );

  const handleNext = useCallback(() => {
    goToSlide(currentPhotoIndex + 1);
  }, [goToSlide, currentPhotoIndex]);

  const handlePrev = useCallback(() => {
    goToSlide(currentPhotoIndex - 1);
  }, [goToSlide, currentPhotoIndex]);

  // Smart Autoplay Timer (every 5 seconds)
  useEffect(() => {
    // Autoplay requirements:
    // 1. At least 2 valid photographs in current collection
    // 2. Not paused by hover, focus, hidden tab, active touch, lightbox, or reduced motion
    const shouldPause =
      availablePhotos.length < 2 ||
      prefersReducedMotion ||
      isHovered ||
      isFocused ||
      !isTabVisible ||
      isTouchInteracting ||
      !!activeJournalDest;

    if (shouldPause) {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      return;
    }

    // Initialize clean 5-second interval
    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [
    availablePhotos.length,
    prefersReducedMotion,
    isHovered,
    isFocused,
    isTabVisible,
    isTouchInteracting,
    activeJournalDest,
    handleNext,
  ]);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (availablePhotos.length < 2) return;
    setIsTouchInteracting(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    setIsTouchInteracting(false);
    if (touchStartXRef.current !== null) {
      const deltaX = touchDeltaXRef.current;
      if (deltaX > 45) {
        // Swiped right -> Previous photograph
        handlePrev();
      } else if (deltaX < -45) {
        // Swiped left -> Next photograph
        handleNext();
      }
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (availablePhotos.length < 2) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const shortDisplayName = activeDestination?.name.replace(" (Chattogram)", "") || "Destination";

  return (
    <div
      data-testid="featured-travel-memories-card"
      id="featured-travel-memories"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      className={`rounded-2xl bg-[#070707] border border-white/[0.08] p-4 shadow-xl flex flex-col justify-between h-full min-h-[380px] max-h-[460px] relative transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]/50 ${className}`}
      aria-label="Featured Travel Memories"
    >
      {/* ── CARD HEADER: Section Title & Live Photo Counter ───────────────── */}
      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
            Featured Travel Memories
          </span>
        </div>

        {availablePhotos.length > 0 ? (
          <div
            className="text-[11px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/25"
            aria-live="polite"
          >
            {String(currentPhotoIndex + 1).padStart(2, "0")} /{" "}
            {String(availablePhotos.length).padStart(2, "0")}
          </div>
        ) : (
          <div className="text-[10px] font-mono text-[#8C857B] bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/10">
            Archive
          </div>
        )}
      </div>

      {/* ── CAROUSEL IMAGE OR EDITORIAL PLACEHOLDER ───────────────────────── */}
      <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden relative flex flex-col justify-between p-3 border border-white/10 shadow-inner group/photo select-none bg-[#0a0a0a]">
        {currentPhoto ? (
          <>
            {/* Active Photograph with Smooth Crossfade & Subtle Scale */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                key={currentPhoto.id}
                src={currentPhoto.image}
                alt={currentPhoto.alt || shortDisplayName}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                className="object-cover transition-all duration-700 ease-out transform scale-100 group-hover/photo:scale-105 animate-hero-fade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
            </div>

            {/* Top Row Badges: Location & Optional Visit Date */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-mono text-[#FFF4D0] border border-white/15 shadow-sm">
                <MapPin className="w-2.5 h-2.5 text-[#D4AF37]" />
                <span className="truncate max-w-[140px]">{activeDestination?.district || shortDisplayName}</span>
              </span>

              {currentPhoto.visitDate && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-mono text-[#FAF8F5] border border-white/15">
                  <Calendar className="w-2.5 h-2.5 text-[#D4AF37]" />
                  <span>{currentPhoto.visitDate}</span>
                </span>
              )}
            </div>

            {/* Manual Controls: Prev & Next Buttons (Visible when >= 2 photos) */}
            {availablePhotos.length >= 2 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/70 hover:bg-[#D4AF37] hover:text-black text-white/90 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover/photo:opacity-100 cursor-pointer shadow-md"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/70 hover:bg-[#D4AF37] hover:text-black text-white/90 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover/photo:opacity-100 cursor-pointer shadow-md"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Clickable Pagination Indicators (Pills) */}
                <div className="relative z-10 flex items-center justify-center gap-1.5 pt-1">
                  {availablePhotos.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to photograph ${idx + 1} of ${availablePhotos.length}`}
                      className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentPhotoIndex
                          ? "w-5 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                          : "w-1.5 bg-white/35 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          /* ── TASTEFUL PLACEHOLDER EMPTY STATE ────────────────────────── */
          <div
            className={`absolute inset-0 bg-gradient-to-br ${activeTheme.gradient} flex flex-col justify-between p-3.5`}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

            {/* Top Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#FFF4D0] border border-white/15">
                <MapPin className="w-2.5 h-2.5 text-[#D4AF37]" />
                <span>{activeDestination?.district || shortDisplayName}</span>
              </span>

              <span className="text-[10px] font-mono text-[#FAF8F5]/80 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                {activeDestination?.region}
              </span>
            </div>

            {/* Center Editorial Notice */}
            <div className="relative z-10 text-center py-2 space-y-1">
              <div className="w-8 h-8 mx-auto rounded-full bg-black/50 border border-white/15 flex items-center justify-center text-[#D4AF37] shadow-sm">
                <Camera className="w-4 h-4" />
              </div>
              <p className="font-serif italic text-xs sm:text-[13px] text-[#FAF8F5] font-medium leading-tight">
                Travel photos coming soon.
              </p>
              <p className="text-[10px] font-sans text-[#D4CDBC]/80 leading-tight">
                Personal photography archive in curation
              </p>
            </div>

            {/* Bottom spacer for clean visual balance */}
            <div className="relative z-10 h-1" />
          </div>
        )}
      </div>

      {/* ── DESTINATION DETAILS: Name, Region, & Caption ───────────────────── */}
      <div className="my-2.5 flex-1 flex flex-col justify-center">
        <h4 className="font-serif text-lg sm:text-xl text-[#FAF8F5] font-semibold leading-tight truncate">
          {shortDisplayName}
        </h4>
        <p className="text-[11.5px] font-sans text-[#D4AF37] mt-0.5 mb-1.5 font-medium truncate">
          {activeDestination?.district ? `${activeDestination.district}, ` : ""}
          {activeDestination?.region || "Bangladesh"}
        </p>
        <p className="text-xs font-sans text-[#B5ADA3] leading-relaxed line-clamp-2">
          {currentPhoto?.caption ||
            activeDestination?.shortDescription ||
            "Documented visited journey across Bangladesh."}
        </p>
        {activeDestination?.geologicalNote && (
          <div className="mt-1.5 p-1.5 px-2 rounded bg-white/[0.02] border border-white/[0.05] text-[10.5px] font-mono text-[#D4AF37]/90 leading-tight">
            <span className="text-[#9C988F] uppercase mr-1">Field Note:</span>
            <span>{activeDestination.geologicalNote}</span>
          </div>
        )}
      </div>

      {/* ── ACTION BUTTON: Connect to Travel Journal ───────────────────────── */}
      <button
        type="button"
        onClick={() => activeDestination && onOpenJournal(activeDestination)}
        disabled={!activeDestination}
        className="w-full py-2.5 px-4 rounded-xl border border-[#D4AF37]/70 text-[#FAF8F5] bg-[#D4AF37]/10 hover:bg-[#D4AF37] hover:text-black font-mono text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Explore Journey</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
