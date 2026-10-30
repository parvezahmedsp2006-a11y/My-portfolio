"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface Hero3DPortraitProps {
  className?: string;
  preload?: boolean;
}

export function Hero3DPortrait({
  className = "",
  preload = true,
}: Hero3DPortraitProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [glow, setGlow] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check prefers-reduced-motion setting
  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
      }
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // Smooth mouse-follow tilt calculation
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isReducedMotion) return;
      // Skip on touch devices to avoid scroll interference
      if (e.pointerType === "touch") return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Restrained, natural tilt (max 6.5 degrees)
      const maxTilt = 6.5;
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      const tiltX = -normY * maxTilt;
      const tiltY = normX * maxTilt;

      setTilt({ x: tiltX, y: tiltY });
      setGlow({
        x: Math.round((x / rect.width) * 100),
        y: Math.round((y / rect.height) * 100),
      });
      setIsHovered(true);
    },
    [isReducedMotion]
  );

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <div
      className={`relative w-full max-w-[150px] min-[360px]:max-w-[165px] min-[390px]:max-w-[180px] sm:max-w-[280px] lg:max-w-[370px] xl:max-w-[390px] select-none ${className}`}
      style={{
        perspective: isReducedMotion ? "none" : "1200px",
      }}
    >
      {/* 
        Slow, Organic Floating Animation:
        Adds gentle vertical breathing motion without distracting gaming wobble.
        Automatically disabled under prefers-reduced-motion.
      */}
      <div className={isReducedMotion ? "" : "hero-portrait-floating"}>
        {/*
          3D Interactive Tilt Card:
          Smooth spring easing on hover tracking and graceful neutral return on leave.
        */}
        <div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative aspect-[3/4] w-full rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer group"
          style={{
            transform: isReducedMotion
              ? "none"
              : `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateZ(0px)`,
            transformStyle: isReducedMotion ? "flat" : "preserve-3d",
            transition: isHovered
              ? "transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease-out"
              : "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.65s ease-out",
          }}
        >
          {/* 
            Atmospheric Orange Sunset Ambient Glow:
            Radiates softly behind the portrait, echoing the warm golden-orange backdrop of the artwork.
          */}
          <div
            className="absolute -inset-3 sm:-inset-5 rounded-2xl bg-gradient-to-tr from-[#D95B1E]/30 via-[#F58220]/20 to-amber-500/10 blur-xl sm:blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
            aria-hidden="true"
          />

          {/* Secondary deep focus shadow */}
          <div
            className="absolute -inset-1 rounded-xl sm:rounded-2xl bg-[#D95B1E]/15 blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none -z-10"
            aria-hidden="true"
          />

          {/* 
            Artwork Frame:
            Preserves 100% of the original illustration, foliage silhouette, warm sunset backdrop, 
            and lighting without destructive cropping or background stripping.
          */}
          <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#F58220]/25 group-hover:border-[#F58220]/45 shadow-[0_12px_40px_rgba(0,0,0,0.85)] bg-[#0A0704] transition-colors duration-300">
            <Image
              src="/images/portrait/hero-portrait.png"
              alt="Artistic portrait illustration of Parvez Ahmed against a warm golden-orange sunset sphere and foliage silhouette"
              fill
              preload={preload}
              className="object-contain object-center"
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 280px, 390px"
            />

            {/* Subtle dynamic specular light sheen following cursor */}
            {!isReducedMotion && isHovered && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255, 200, 120, 0.14) 0%, rgba(245, 130, 32, 0.05) 35%, transparent 65%)`,
                }}
                aria-hidden="true"
              />
            )}

            {/* Subtle bottom edge vignette for grounding into black background */}
            <div
              className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
