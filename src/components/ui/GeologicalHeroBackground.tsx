"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export interface GeologicalScene {
  id: string;
  name: string;
  category: string;
  imageSrc: string;
  alt: string;
  description: string;
  accentColor: string;
}

export const GEOLOGICAL_SCENES: GeologicalScene[] = [
  {
    id: "topographic-contours",
    name: "Topographic Contours",
    category: "Geodetic Elevation",
    imageSrc: "/images/hero-scenes/scene-1-topographic-contours.jpg",
    alt: "Topographic elevation contour map in gold and charcoal with elevation isolines",
    description: "Detailed elevation contour patterns inspired by geological topographic mapping",
    accentColor: "#D4AF37",
  },
  {
    id: "mountain-landscape",
    name: "Mountain Landscape",
    category: "Structural Geomorphology",
    imageSrc: "/images/hero-scenes/scene-2-mountain-landscape.jpg",
    alt: "Cinematic geological mountain silhouettes and badlands erosion ridges with gold crest illumination",
    description: "Dark mountain silhouettes and eroded badlands ridges with warm bronze and gold rim lighting",
    accentColor: "#B89635",
  },
  {
    id: "geological-strata",
    name: "Geological Strata",
    category: "Stratigraphy & Sedimentology",
    imageSrc: "/images/hero-scenes/scene-3-geological-strata.jpg",
    alt: "Layered sedimentary rock formations and chevron fold strata bands",
    description: "Naturally folded sedimentary rock layers and stratigraphic chevron bedding in charcoal and bronze",
    accentColor: "#9E7D3B",
  },
  {
    id: "mineral-texture",
    name: "Mineral Texture",
    category: "Mineralogy & Petrology",
    imageSrc: "/images/hero-scenes/scene-4-mineral-texture.jpg",
    alt: "Dark crystalline stone texture with golden quartz and pyrite hydrothermal mineral veins",
    description: "Metamorphic rock face with golden quartz veins, crystalline texture, and cleavage micro-fractures",
    accentColor: "#D4AF37",
  },
];

interface GeologicalHeroBackgroundProps {
  initialSceneIndex?: number;
  intervalMs?: number;
}

export function GeologicalHeroBackground({
  initialSceneIndex = 0,
  intervalMs = 6000,
}: GeologicalHeroBackgroundProps) {
  const safeInitialIndex =
    initialSceneIndex >= 0 && initialSceneIndex < GEOLOGICAL_SCENES.length
      ? initialSceneIndex
      : 0;

  const [currentScene, setCurrentScene] = useState<number>(safeInitialIndex);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check prefers-reduced-motion setting
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Pause slideshow transitions when browser tab is inactive or hidden
  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleVisibilityChange = () => {
      setIsPaused(document.visibilityState === "hidden");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Automatic cyclical slideshow rotation every 6 seconds
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused || isReducedMotion) return;

    timerRef.current = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % GEOLOGICAL_SCENES.length);
    }, intervalMs);
  }, [intervalMs, isPaused, isReducedMotion]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleManualSelect = (index: number) => {
    setCurrentScene(index);
    startTimer();
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* 
        LAYER 1: Four Geological Background Scenes (1.4s Crossfade Transitions)
        1. Topographic Contours
        2. Mountain Landscape
        3. Geological Strata
        4. Mineral Texture
      */}
      <div className="absolute inset-0">
        {GEOLOGICAL_SCENES.map((scene, idx) => {
          const isActive = idx === currentScene;
          return (
            <div
              key={scene.id}
              data-scene-id={scene.id}
              data-active={isActive}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out will-change-[opacity] ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={scene.imageSrc}
                alt={scene.alt}
                fill
                priority={idx === 0 || idx === 1}
                sizes="100vw"
                className="object-cover object-center scale-[1.01] transform-gpu opacity-45"
              />
              <div
                className="absolute inset-0 bg-black/20"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

      {/* 
        LAYER 2: Recognizable Topographic Elevation Contour Lines
        - Authentic elevation contour patterns in antique-gold and muted bronze strokes
        - Placed around outer edges and negative space (upper-right, right edge, lower-left)
        - 18–25% opacity for clear geological identification without overpowering text
      */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <svg
          viewBox="0 0 1440 900"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            {/* Soft radial fade mask so contours dissolve gently near central content */}
            <radialGradient id="contourFadeMask" cx="62%" cy="48%" r="65%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="45%" stopColor="#000000" stopOpacity="0.4" />
              <stop offset="85%" stopColor="#000000" stopOpacity="1" />
            </radialGradient>
            <mask id="heroContourMask">
              <rect width="1440" height="900" fill="url(#contourFadeMask)" />
            </mask>
          </defs>

          <g mask="url(#heroContourMask)">
            {/* --- UPPER-RIGHT SUMMIT CONTOURS & ELEVATION ISOLINES --- */}
            {/* Peak 1 summit loop: 1280m */}
            <path
              d="M 1240,140 C 1260,125 1285,130 1300,148 C 1315,165 1300,185 1275,190 C 1250,195 1225,175 1225,155 C 1225,145 1232,138 1240,140 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeOpacity="0.25"
            />
            {/* Contour 1240m */}
            <path
              d="M 1215,130 C 1245,105 1305,110 1330,138 C 1355,168 1335,205 1295,215 C 1255,225 1200,200 1195,165 C 1190,145 1200,135 1215,130 Z"
              fill="none"
              stroke="#B89635"
              strokeWidth="0.8"
              strokeOpacity="0.22"
            />
            {/* Index Contour 1200m */}
            <path
              d="M 1180,118 C 1230,80 1330,85 1365,128 C 1400,170 1375,228 1320,242 C 1265,256 1170,225 1160,175 C 1152,142 1165,125 1180,118 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.3"
              strokeOpacity="0.24"
            />
            {/* Contour 1160m */}
            <path
              d="M 1145,105 C 1215,55 1355,62 1400,115 C 1445,170 1415,250 1345,268 C 1275,286 1140,248 1125,188 C 1112,140 1128,118 1145,105 Z"
              fill="none"
              stroke="#B89635"
              strokeWidth="0.8"
              strokeOpacity="0.20"
            />
            {/* Contour 1120m */}
            <path
              d="M 1105,92 C 1200,32 1380,40 1435,102 C 1485,160 1455,272 1370,295 C 1285,318 1110,272 1090,200 C 1072,138 1088,110 1105,92 Z"
              fill="none"
              stroke="#B89635"
              strokeWidth="0.8"
              strokeOpacity="0.20"
            />
            {/* Index Contour 1100m */}
            <path
              d="M 1065,80 C 1185,10 1405,18 1470,88 C 1530,150 1495,295 1395,322 C 1295,348 1080,295 1055,212 C 1032,135 1048,102 1065,80 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.3"
              strokeOpacity="0.23"
            />

            {/* Sinuous Regional Valley & Ridge Contours (Right Flank) */}
            <path
              d="M 1440,360 C 1350,340 1280,380 1220,440 C 1160,500 1180,580 1250,640 C 1320,700 1390,740 1440,780"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.1"
              strokeOpacity="0.22"
            />
            <path
              d="M 1440,395 C 1365,375 1305,410 1255,465 C 1205,520 1220,590 1280,645 C 1340,700 1400,745 1440,795"
              fill="none"
              stroke="#B89635"
              strokeWidth="0.8"
              strokeOpacity="0.19"
            />
            <path
              d="M 1440,430 C 1380,410 1330,440 1290,490 C 1250,540 1260,600 1310,650 C 1360,700 1410,750 1440,810"
              fill="none"
              stroke="#B89635"
              strokeWidth="0.8"
              strokeOpacity="0.18"
            />

            {/* --- LOWER-LEFT / BOTTOM-FLANK ELEVATION CONTOURS (Framing Portrait) --- */}
            <path
              d="M 0,620 C 80,610 160,635 220,685 C 280,735 320,810 380,850 C 440,890 510,880 580,900"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeOpacity="0.24"
            />
            <path
              d="M 0,660 C 70,650 145,670 200,715 C 255,760 295,830 350,865 C 405,900 470,890 530,900"
              fill="none"
              stroke="#B89635"
              strokeWidth="0.8"
              strokeOpacity="0.20"
            />
            <path
              d="M 0,700 C 60,690 130,705 180,745 C 230,785 270,850 320,880 C 370,910 430,900 480,900"
              fill="none"
              stroke="#B89635"
              strokeWidth="0.8"
              strokeOpacity="0.18"
            />
            <path
              d="M 0,740 C 50,730 115,740 160,775 C 205,810 245,870 290,895 C 335,920 390,910 440,900"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.1"
              strokeOpacity="0.22"
            />

            {/* --- TOP-LEFT EDGE ELEVATION CONTOURS --- */}
            <path
              d="M 0,160 C 60,175 140,160 210,125 C 280,90 350,65 420,50 C 490,35 560,40 640,30"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.1"
              strokeOpacity="0.22"
            />
            <path
              d="M 0,195 C 55,210 130,195 195,160 C 260,125 330,100 400,85 C 470,70 540,75 610,65"
              fill="none"
              stroke="#B89635"
              strokeWidth="0.8"
              strokeOpacity="0.18"
            />
            <path
              d="M 0,230 C 50,245 120,230 180,195 C 240,160 310,135 380,120 C 450,105 520,110 580,100"
              fill="none"
              stroke="#B89635"
              strokeWidth="0.8"
              strokeOpacity="0.16"
            />

            {/* Elevation Labels in Antique Gold Geist Mono */}
            <text
              x="1195"
              y="112"
              fill="#D4AF37"
              fillOpacity="0.4"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="0.1em"
            >
              1200m
            </text>
            <text
              x="1080"
              y="74"
              fill="#D4AF37"
              fillOpacity="0.35"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="0.1em"
            >
              1100m
            </text>
            <text
              x="1235"
              y="435"
              fill="#D4AF37"
              fillOpacity="0.35"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="0.1em"
            >
              950m
            </text>
          </g>
        </svg>
      </div>

      {/* 
        LAYER 3: Visible Layered Geological Mountain Silhouette & Sedimentary Rock Strata
        - Anchors the lower portion of the Hero section
        - Three distinct geological depth planes (back ridge, mid ridge, bedrock strata base)
        - Dark charcoal and earthy bronze tones with restrained antique-gold rim lighting
      */}
      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 lg:h-44 pointer-events-none z-20 overflow-hidden">
        <svg
          viewBox="0 0 1440 180"
          className="w-full h-full text-black"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="backMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1C1710" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0B0907" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="midMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14100B" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#060504" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="foreStrataGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#080705" stopOpacity="1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* 1. Distant Mountain Ridge Silhouette (Layer 1) */}
          <path
            d="M 0,180 L 0,85 Q 120,55 240,78 T 480,48 T 720,70 T 960,42 T 1200,65 T 1440,50 L 1440,180 Z"
            fill="url(#backMountainGrad)"
          />
          {/* Distant Ridge Gold Crest Rim Light */}
          <path
            d="M 0,85 Q 120,55 240,78 T 480,48 T 720,70 T 960,42 T 1200,65 T 1440,50"
            fill="none"
            stroke="rgba(212, 175, 55, 0.26)"
            strokeWidth="1.2"
          />

          {/* 2. Mid-ground Geological Crags & Mountain Ridge (Layer 2) */}
          <path
            d="M 0,180 L 0,115 C 80,105 160,82 250,96 C 340,110 430,72 530,88 C 630,104 740,65 850,82 C 960,98 1070,68 1180,85 C 1280,102 1370,82 1440,90 L 1440,180 Z"
            fill="url(#midMountainGrad)"
          />
          {/* Mid Ridge Crisp Gold Edge Illumination */}
          <path
            d="M 0,115 C 80,105 160,82 250,96 C 340,110 430,72 530,88 C 630,104 740,65 850,82 C 960,98 1070,68 1180,85 C 1280,102 1370,82 1440,90"
            fill="none"
            stroke="rgba(212, 175, 55, 0.36)"
            strokeWidth="1.4"
          />

          {/* 3. Sedimentary Strata Layer Banding (Layer 3) */}
          {/* Upper Strata Bedding Contact */}
          <path
            d="M 0,140 Q 180,128 360,135 T 720,126 T 1080,136 T 1440,128 L 1440,152 Q 1080,160 720,150 T 360,158 T 0,150 Z"
            fill="rgba(38, 30, 20, 0.5)"
          />
          <path
            d="M 0,140 Q 180,128 360,135 T 720,126 T 1080,136 T 1440,128"
            fill="none"
            stroke="rgba(212, 175, 55, 0.22)"
            strokeWidth="0.8"
            strokeDasharray="8 4"
          />

          {/* 4. Foreground Bedrock Horizon (Pure Black Baseline into GeoMarquee) */}
          <path
            d="M 0,180 L 0,150 C 140,142 280,152 420,145 C 560,138 700,148 840,140 C 980,132 1120,144 1260,138 C 1350,134 1410,138 1440,136 L 1440,180 Z"
            fill="url(#foreStrataGrad)"
          />
          <path
            d="M 0,150 C 140,142 280,152 420,145 C 560,138 700,148 840,140 C 980,132 1120,144 1260,138 C 1350,134 1410,138 1440,136"
            fill="none"
            stroke="rgba(212, 175, 55, 0.28)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* 
        LAYER 4: Ambient Warmth & Gold Radiance
      */}
      <div
        className="absolute top-1/6 right-1/10 w-[550px] lg:w-[750px] h-[550px] lg:h-[750px] rounded-full bg-[#D4AF37]/[0.08] blur-[150px] pointer-events-none z-15"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/12 w-[450px] lg:w-[650px] h-[450px] lg:h-[650px] rounded-full bg-[#F58220]/[0.06] blur-[140px] pointer-events-none z-15"
        aria-hidden="true"
      />

      {/* 
        LAYER 5: Typographic Contrast Protection (Vignette & Contrast Gradients)
        Guarantees 100% WCAG AAA text readability while keeping geological textures clearly visible in margins.
      */}
      {/* Overall vertical gradient fading to pure black at top and bottom */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-transparent to-[#000000]/90 pointer-events-none z-22"
        aria-hidden="true"
      />

      {/* Radial vignette focused behind the right-column editorial typography */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_50%,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_55%,transparent_85%)] pointer-events-none z-22"
        aria-hidden="true"
      />

      {/* Mobile-specific center contrast shade */}
      <div
        className="absolute inset-0 lg:hidden bg-[radial-gradient(circle_at_50%_62%,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_55%,transparent_85%)] pointer-events-none z-22"
        aria-hidden="true"
      />

      {/* 
        LAYER 6: Discreet Geological Scene Indicator (Bottom Right)
        Allows observing the current scene name and manual jumping.
        Hidden on very narrow mobile (<360px) to prevent any button collision.
      */}
      <div
        className="absolute bottom-3 sm:bottom-5 right-3 sm:right-6 lg:right-10 z-30 pointer-events-auto flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/65 border border-white/10 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
        aria-label="Geological background scene selector"
      >
        {/* Active Scene Category / Name */}
        <span className="text-[10.5px] sm:text-[11px] font-mono tracking-wider uppercase text-[#D4AF37] font-medium hidden min-[440px]:inline">
          {GEOLOGICAL_SCENES[currentScene].name}
        </span>
        <span
          className="text-white/20 text-xs hidden min-[440px]:inline"
          aria-hidden="true"
        >
          ·
        </span>

        {/* Scene Indicator Dots / Switchers */}
        <div
          className="flex items-center gap-1.5"
          role="tablist"
          aria-label="Background scenes"
        >
          {GEOLOGICAL_SCENES.map((scene, idx) => {
            const isActive = idx === currentScene;
            return (
              <button
                key={scene.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Switch to scene ${idx + 1}: ${scene.name}`}
                title={`Scene ${idx + 1}: ${scene.name}`}
                onClick={() => handleManualSelect(idx)}
                className={`transition-all duration-300 rounded-full focus-visible:outline-2 focus-visible:outline-[#D4AF37] cursor-pointer ${
                  isActive
                    ? "w-4 sm:w-5 h-1.5 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                    : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
