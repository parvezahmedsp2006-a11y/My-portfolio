"use client";

/**
 * GeologicalGlobe — Real-time rotating 3D geological planet visualization.
 *
 * Implemented using lightweight, hardware-accelerated Canvas 2D orthographic
 * spherical projection.
 *
 * Visual Features:
 *   - Continuous, seamless 3D rotation around an axially tilted polar axis (~36s/rev)
 *   - Rotating surface dot lattice with depth-based foreshortening and directional lighting
 *   - Dynamically projected rotating longitude meridians and latitude rings
 *   - 3D topographic terrain contour loops rotating naturally across the sphere
 *   - Antique-gold, warm ivory, and muted graphite palette matching editorial aesthetic
 *   - Atmospheric highlight in upper-left and subtle spherical limb darkening
 *   - Scientific center crosshair
 *
 * Performance & Accessibility:
 *   - Delta-time based animation (consistent speed across 60Hz, 120Hz, 144Hz displays)
 *   - Device-pixel-ratio scaling for Retina displays
 *   - IntersectionObserver: pauses rendering when scrolled out of viewport
 *   - Visibility API: pauses rendering when browser tab is hidden
 *   - prefers-reduced-motion: renders a complete, stable static globe with zero loop overhead
 *   - Full cleanup of animation frames and listeners on unmount
 */

import React, { useEffect, useRef } from "react";

interface GeologicalGlobeProps {
  size?: number;
  className?: string;
}

// ─── Mathematical Constants & Projection Geometry ───────────────────────────

const BASE_SIZE = 320;
const CX = BASE_SIZE / 2;
const CY = BASE_SIZE / 2;
const R = 140; // Base sphere radius

// Earth-like axial tilt (14° ~ 0.2443 rad) toward viewer for spherical curvature
const AXIAL_TILT = (14 * Math.PI) / 180;
const COS_TILT = Math.cos(AXIAL_TILT);
const SIN_TILT = Math.sin(AXIAL_TILT);

// Directional light vector from upper-left (normalized)
const LX = -0.38;
const LY = 0.42;
const LZ = 0.82;

interface Point3D {
  x: number;
  y: number;
  z: number;
  visible: boolean;
  depth: number;
}

/** Project spherical coordinates (lat in deg, lon in deg) with rotation theta */
function project(latDeg: number, lonDeg: number, theta: number): Point3D {
  const phi = (latDeg * Math.PI) / 180;
  const lam = (lonDeg * Math.PI) / 180 + theta;

  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosLam = Math.cos(lam);
  const sinLam = Math.sin(lam);

  // Un-tilted 3D coordinates on sphere
  const x0 = R * cosPhi * sinLam;
  const y0 = R * sinPhi;
  const z0 = R * cosPhi * cosLam;

  // Apply axial tilt around X axis
  const x = x0;
  const y = y0 * COS_TILT - z0 * SIN_TILT;
  const z = y0 * SIN_TILT + z0 * COS_TILT;

  const visible = z > 0;
  const depth = Math.max(0, z / R);

  return { x, y, z, visible, depth };
}

// ─── Pre-generated Topographic Contours ───────────────────────────────────────

interface Harmonic {
  amp: number;
  freq: number;
  phase: number;
}

function generateContour(
  lat0: number,
  lon0: number,
  rBase: number,
  harmonics: Harmonic[],
  steps = 36
): { lat: number; lon: number }[] {
  const pts: { lat: number; lon: number }[] = [];
  const cosLat0 = Math.max(0.15, Math.cos((lat0 * Math.PI) / 180));
  for (let i = 0; i <= steps; i++) {
    const psi = (i / steps) * 2 * Math.PI;
    let r = rBase;
    for (const h of harmonics) {
      r += h.amp * Math.sin(h.freq * psi + h.phase);
    }
    const lat = Math.max(-80, Math.min(80, lat0 + r * Math.cos(psi)));
    const lon = lon0 + (r * Math.sin(psi)) / cosLat0;
    pts.push({ lat, lon });
  }
  return pts;
}

// 5 Abstract geological topographic loops distributed across sphere
const TOPO_CONTOURS: { points: { lat: number; lon: number }[]; isGold: boolean }[] = [
  {
    points: generateContour(22, 45, 20, [
      { amp: 5, freq: 3, phase: 0.8 },
      { amp: 3, freq: 5, phase: 1.4 },
    ]),
    isGold: true,
  },
  {
    points: generateContour(-18, 125, 24, [
      { amp: 6, freq: 2, phase: 0.2 },
      { amp: 3, freq: 4, phase: 2.1 },
    ]),
    isGold: false,
  },
  {
    points: generateContour(38, 210, 18, [
      { amp: 4, freq: 3, phase: 1.2 },
      { amp: 2, freq: 6, phase: 0.4 },
    ]),
    isGold: true,
  },
  {
    points: generateContour(-32, 295, 22, [
      { amp: 5, freq: 3, phase: 2.5 },
      { amp: 2.5, freq: 4, phase: 1.1 },
    ]),
    isGold: false,
  },
  {
    points: generateContour(5, 175, 16, [
      { amp: 3.5, freq: 4, phase: 0.9 },
      { amp: 2, freq: 2, phase: 1.8 },
    ]),
    isGold: true,
  },
];

// Pre-generated grid of dot coordinates on sphere (lat from -75° to 75°, lon from 0° to 360°)
const GRID_DOTS: { lat: number; lon: number }[] = [];
for (let lat = -75; lat <= 75; lat += 12) {
  // Slightly fewer dots near poles for uniform density
  const stepLon = lat === -75 || lat === 75 ? 24 : lat === -63 || lat === 63 ? 18 : 12;
  for (let lon = 0; lon < 360; lon += stepLon) {
    GRID_DOTS.push({ lat, lon });
  }
}

// Fixed latitude values
const LATITUDES = [-60, -40, -20, 0, 20, 40, 60];

// Longitude meridian offsets (12 meridians every 30°)
const MERIDIANS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

// ─── Component ───────────────────────────────────────────────────────────────

export function GeologicalGlobe({ size = 320, className = "" }: GeologicalGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const thetaRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Detect user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Device Pixel Ratio setup for sharp Retina rendering
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2.5) : 1;
    canvas.width = BASE_SIZE * dpr;
    canvas.height = BASE_SIZE * dpr;
    ctx.scale(dpr, dpr);

    // Speed: 36 seconds per full 360° revolution (calm, steady velocity)
    const ROTATION_SPEED = (2 * Math.PI) / 36000; // radians per millisecond

    // Render a single complete frame at current theta
    const renderFrame = (theta: number) => {
      ctx.clearRect(0, 0, BASE_SIZE, BASE_SIZE);

      // ── 1. Base Sphere Gradient (Near-black with subtle atmospheric volume) ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.clip();

      const bgGrad = ctx.createRadialGradient(
        CX - R * 0.25,
        CY - R * 0.3,
        R * 0.1,
        CX,
        CY,
        R
      );
      bgGrad.addColorStop(0, "#121210");
      bgGrad.addColorStop(0.65, "#080807");
      bgGrad.addColorStop(1, "#000000");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, BASE_SIZE, BASE_SIZE);

      // ── 2. Latitude Guide Rings ──
      for (const lat of LATITUDES) {
        const isEquator = lat === 0;
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 6) {
          const pt = project(lat, lon, theta);
          if (pt.visible) {
            const px = CX + pt.x;
            const py = CY - pt.y;
            if (first) {
              ctx.moveTo(px, py);
              first = false;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            first = true;
          }
        }
        ctx.lineWidth = isEquator ? 0.75 : 0.4;
        ctx.strokeStyle = isEquator ? "rgba(212, 175, 55, 0.45)" : "rgba(184, 180, 170, 0.16)";
        ctx.stroke();
      }

      // ── 3. Rotating 3D Longitude Meridians ──
      for (const mDeg of MERIDIANS) {
        const isMajor = mDeg % 90 === 0;
        ctx.beginPath();
        let first = true;
        for (let lat = -86; lat <= 86; lat += 4) {
          const pt = project(lat, mDeg, theta);
          if (pt.visible) {
            const px = CX + pt.x;
            const py = CY - pt.y;
            if (first) {
              ctx.moveTo(px, py);
              first = false;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            first = true;
          }
        }
        ctx.lineWidth = isMajor ? 0.65 : 0.4;
        ctx.strokeStyle = isMajor ? "rgba(212, 175, 55, 0.32)" : "rgba(184, 180, 170, 0.14)";
        ctx.stroke();
      }

      // ── 4. Abstract Geological Topographic Contours ──
      for (const c of TOPO_CONTOURS) {
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < c.points.length; i++) {
          const pt = project(c.points[i].lat, c.points[i].lon, theta);
          if (pt.visible) {
            const px = CX + pt.x;
            const py = CY - pt.y;
            if (!started) {
              ctx.moveTo(px, py);
              started = true;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            started = false;
          }
        }
        ctx.lineWidth = c.isGold ? 0.8 : 0.55;
        ctx.strokeStyle = c.isGold ? "rgba(212, 175, 55, 0.42)" : "rgba(230, 225, 211, 0.24)";
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // ── 5. Rotating Surface Dot Lattice ──
      for (let i = 0; i < GRID_DOTS.length; i++) {
        const pt = project(GRID_DOTS[i].lat, GRID_DOTS[i].lon, theta);
        if (!pt.visible) continue;

        // Dynamic directional lighting calculation
        const nx = pt.x / R;
        const ny = pt.y / R;
        const nz = pt.z / R;
        const diffuse = Math.max(0, nx * LX + ny * LY + nz * LZ);

        // Opacity and radius scaling with depth and lighting
        const alpha = Math.min(1, 0.16 + 0.52 * pt.depth + 0.32 * diffuse);
        const dotRadius = Math.max(0.7, 0.85 + 0.55 * pt.depth);

        ctx.beginPath();
        ctx.arc(CX + pt.x, CY - pt.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // ── 6. Gilded Atmospheric Illumination & Shimmer ──
      const goldHighlight = ctx.createRadialGradient(
        CX - R * 0.35,
        CY - R * 0.38,
        R * 0.05,
        CX,
        CY,
        R * 0.95
      );
      goldHighlight.addColorStop(0, "rgba(212, 175, 55, 0.14)");
      goldHighlight.addColorStop(0.5, "rgba(212, 175, 55, 0.03)");
      goldHighlight.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.fillStyle = goldHighlight;
      ctx.fillRect(0, 0, BASE_SIZE, BASE_SIZE);

      // ── 7. Spherical Limb Darkening (Edge Vignette) ──
      const limbGrad = ctx.createRadialGradient(CX, CY, R * 0.75, CX, CY, R);
      limbGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      limbGrad.addColorStop(0.85, "rgba(0, 0, 0, 0.45)");
      limbGrad.addColorStop(1, "rgba(0, 0, 0, 0.85)");
      ctx.fillStyle = limbGrad;
      ctx.fillRect(0, 0, BASE_SIZE, BASE_SIZE);

      ctx.restore();

      // ── 8. Outer Antique-Gold Ring ──
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.lineWidth = 0.85;
      ctx.strokeStyle = "rgba(212, 175, 55, 0.38)";
      ctx.stroke();

      // ── 9. Scientific Crosshair Center Ticks ──
      ctx.beginPath();
      ctx.moveTo(CX - 7, CY);
      ctx.lineTo(CX + 7, CY);
      ctx.moveTo(CX, CY - 7);
      ctx.lineTo(CX, CY + 7);
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "rgba(212, 175, 55, 0.42)";
      ctx.stroke();
    };

    // If reduced motion is preferred, render 1 static frame and exit
    if (prefersReducedMotion) {
      renderFrame(0);
      return;
    }

    // Animation Loop with delta time calculation
    const tick = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Only advance rotation and re-draw when canvas is visible
      if (isVisibleRef.current) {
        thetaRef.current = (thetaRef.current + delta * ROTATION_SPEED) % (Math.PI * 2);
        renderFrame(thetaRef.current);
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    // Start loop
    animFrameRef.current = requestAnimationFrame(tick);

    // ─── Visibility & Viewport Optimizations ───

    // 1. IntersectionObserver: pause when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            lastTimeRef.current = performance.now();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // 2. Page Visibility API: pause when browser tab is inactive
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden) {
        lastTimeRef.current = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      role="img"
      aria-label="Abstract decorative rotating geological globe illustration"
      className={`geo-globe-root select-none pointer-events-none relative aspect-square flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block rounded-full"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
