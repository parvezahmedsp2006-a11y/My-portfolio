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
  intervalMs = 7000,
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
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            </div>
          );
        })}

        {/* 
          Directional Split Overlay:
          - Left side (0% to ~40%): Warm ivory paper tone for typography legibility
          - Center (40% to ~62%): Soft, feathered atmospheric gradient dissolve
          - Right side (62% to 100%): Completely transparent, leaving real photographic geology deep, vivid, and unobstructed
        */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b lg:bg-gradient-to-r from-warm-ivory from-0% via-warm-ivory via-35% via-warm-ivory/80 via-48% to-transparent to-65%" />

        {/* Subtle top edge transition under floating navbar */}
        <div className="absolute top-0 inset-x-0 h-16 z-20 bg-gradient-to-b from-warm-ivory/40 to-transparent" />

        {/* Feathered bottom edge into the About section */}
        <div className="absolute bottom-0 inset-x-0 h-20 z-20 bg-gradient-to-t from-warm-ivory via-warm-ivory/50 to-transparent" />
      </div>

      {/* Sleek Floating Slideshow Control Pill (Bottom-right corner) */}
      {showCaption && (
        <aside
          aria-label="Geological slideshow controls and current plate"
          className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-30 pointer-events-auto"
        >
          <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-surface-white/92 backdrop-blur-md border border-border-subtle shadow-xs text-xs font-mono text-charcoal-700 select-none">
            {/* Prev slide button */}
            <button
              type="button"
              onClick={handlePrev}
              className="p-1 text-charcoal-600 hover:text-charcoal-950 transition-colors rounded-full hover:bg-sage-100/60 cursor-pointer"
              aria-label="Previous slide"
              title="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Slide counter */}
            <span className="font-semibold text-charcoal-900 text-[11px] sm:text-xs tracking-wider px-0.5">
              {String(currentIndex + 1).padStart(2, "0")} / {String(GEOLOGICAL_GALLERY.length).padStart(2, "0")}
            </span>

            {/* Next slide button */}
            <button
              type="button"
              onClick={handleNext}
              className="p-1 text-charcoal-600 hover:text-charcoal-950 transition-colors rounded-full hover:bg-sage-100/60 cursor-pointer"
              aria-label="Next slide"
              title="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-3.5 bg-border-subtle" aria-hidden="true" />

            {/* Play/Pause toggle button */}
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 text-charcoal-600 hover:text-charcoal-950 transition-colors rounded-full hover:bg-sage-100/60 cursor-pointer"
                aria-label={isPlaying ? "Pause geological slideshow" : "Play geological slideshow"}
                title={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
            )}

            <span className="w-px h-3.5 bg-border-subtle" aria-hidden="true" />

            {/* Active category pill with green dot */}
            <div className="flex items-center gap-1.5 pl-0.5 pr-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-600 shrink-0" />
              <span className="font-sans text-[11px] sm:text-xs text-charcoal-800 font-medium whitespace-nowrap">
                {displayCategory}
              </span>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
