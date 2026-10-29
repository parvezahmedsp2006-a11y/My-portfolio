"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { GEOLOGICAL_GALLERY, GeologicalSlide } from "@/data/galleryData";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface GeologicalBackgroundGalleryProps {
  intervalMs?: number;
  transitionDurationMs?: number;
  showCaption?: boolean;
  initialSlideIndex?: number;
}

export function GeologicalBackgroundGallery({
  intervalMs = 7500,
  transitionDurationMs = 1800,
  showCaption = true,
  initialSlideIndex = 0,
}: GeologicalBackgroundGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentIndex(initialSlideIndex);
  }, [initialSlideIndex]);

  // Read URL query param after mount to avoid hydration mismatch (?slide=0..4)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const slideParam = params.get("slide");
      if (slideParam !== null) {
        const idx = parseInt(slideParam, 10);
        if (!isNaN(idx) && idx >= 0 && idx < GEOLOGICAL_GALLERY.length) {
          setCurrentIndex(idx);
          setIsPlaying(false);
        }
      }
    } catch {
      // Ignore URL parse error
    }
  }, []);

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

  // Slide interval rotation
  useEffect(() => {
    if (prefersReducedMotion || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GEOLOGICAL_GALLERY.length);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [intervalMs, isPlaying, prefersReducedMotion]);

  const activeSlide: GeologicalSlide = GEOLOGICAL_GALLERY[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + GEOLOGICAL_GALLERY.length) % GEOLOGICAL_GALLERY.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GEOLOGICAL_GALLERY.length);
  };

  // User-friendly display category
  const displayCategory =
    activeSlide.category === "Mineralogy"
      ? "Mineral Resources"
      : activeSlide.category === "Sedimentary Strata"
      ? "Sedimentary Strata"
      : activeSlide.category === "GIS & Terrain"
      ? "GIS & Terrain"
      : activeSlide.category === "Field Geology"
      ? "Field Geology"
      : activeSlide.category;

  return (
    <div className="absolute inset-0 select-none overflow-hidden">
      {/* Real Geological Photographs with Smooth Crossfade */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {GEOLOGICAL_GALLERY.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                transitionDuration: `${transitionDurationMs}ms`,
              }}
            >
              {/* Restrained Ken Burns drift */}
              <div
                className={`w-full h-full relative ${
                  isActive && !prefersReducedMotion ? "animate-ken-burns" : ""
                }`}
              >
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  priority={index === 0}
                  className="object-cover object-center brightness-[0.72] contrast-[1.08]"
                  sizes="100vw"
                />
              </div>
            </div>
          );
        })}

        {/* 
          Cinematic Dark Editorial Gradient Overlay:
          - Left: Pure deep near-black (#060707) giving oversized typography generous negative space
          - Center: Atmospheric feathering with subtle antique-gold tint
          - Right: Revealing the genuine geological strata / minerals with natural contrast
        */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b lg:bg-gradient-to-r from-[#060707] from-0% via-[#060707]/95 via-35% via-[#060707]/75 via-50% to-[#060707]/25 to-90%" />

        {/* Top edge fade under floating navbar */}
        <div className="absolute top-0 inset-x-0 h-32 z-20 bg-gradient-to-b from-[#060707] via-[#060707]/70 to-transparent" />

        {/* Bottom edge fade seamlessly into About section */}
        <div className="absolute bottom-0 inset-x-0 h-36 z-20 bg-gradient-to-t from-[#060707] via-[#060707]/80 to-transparent" />
      </div>

      {/* Floating Slideshow Control Pill (Bottom-right corner) */}
      {showCaption && (
        <aside
          aria-label="Geological slideshow controls and current plate"
          className="absolute bottom-5 sm:bottom-7 right-4 sm:right-8 lg:right-12 z-30 pointer-events-auto"
        >
          <div className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0A0B0E]/90 backdrop-blur-md border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] text-xs font-mono text-[#9C988F] select-none">
            {/* Prev slide button */}
            <button
              type="button"
              onClick={handlePrev}
              className="p-1 text-[#9C988F] hover:text-[#F3F0E8] transition-colors rounded-full hover:bg-white/[0.08] cursor-pointer"
              aria-label="Previous slide"
              title="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Slide counter */}
            <span className="font-medium text-[#F3F0E8] text-[11px] sm:text-xs tracking-wider px-0.5">
              <span className="text-[#B99A5B] font-semibold">{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="text-white/30 mx-1">/</span>
              <span>{String(GEOLOGICAL_GALLERY.length).padStart(2, "0")}</span>
            </span>

            {/* Next slide button */}
            <button
              type="button"
              onClick={handleNext}
              className="p-1 text-[#9C988F] hover:text-[#F3F0E8] transition-colors rounded-full hover:bg-white/[0.08] cursor-pointer"
              aria-label="Next slide"
              title="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-3.5 bg-white/15" aria-hidden="true" />

            {/* Play/Pause toggle button */}
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 text-[#9C988F] hover:text-[#F3F0E8] transition-colors rounded-full hover:bg-white/[0.08] cursor-pointer"
                aria-label={isPlaying ? "Pause geological slideshow" : "Play geological slideshow"}
                title={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="w-3 h-3 text-[#B99A5B]" /> : <Play className="w-3 h-3" />}
              </button>
            )}

            <span className="w-px h-3.5 bg-white/15" aria-hidden="true" />

            {/* Active category pill with gold indicator dot */}
            <div className="flex items-center gap-1.5 pl-0.5 pr-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B99A5B] shrink-0" />
              <span className="font-sans text-[11px] sm:text-xs text-[#E6E1D3] font-medium whitespace-nowrap hidden xs:inline sm:inline">
                {displayCategory}
              </span>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
