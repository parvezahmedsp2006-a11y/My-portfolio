"use client";

import React, { useEffect, useState, useRef } from "react";
import { Globe, BookOpen, Camera, MapPin, Home } from "lucide-react";
import { Destination, getTravelStatistics, HOME_BASE } from "@/data/travelData";

interface JourneyStatisticsProps {
  destinations: Destination[];
}

interface StatItemProps {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  unit?: string;
  isTriggered: boolean;
  isReducedMotion: boolean;
  subtext: string;
  highlight?: "gold" | "cyan";
}

function StatCard({
  label,
  value,
  icon: Icon,
  unit = "",
  isTriggered,
  isReducedMotion,
  subtext,
  highlight = "gold",
}: StatItemProps) {
  const isNumber = typeof value === "number";
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!isTriggered || !isNumber) return;
    const num = value as number;
    if (isReducedMotion || num === 0) {
      setDisplayValue(num);
      return;
    }

    const duration = 1200;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * num));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [isTriggered, isReducedMotion, value, isNumber]);

  const isCyan = highlight === "cyan";

  return (
    <div
      className={`bg-[#050505] border ${
        isCyan
          ? "border-[#38BDF8]/25 hover:border-[#38BDF8]/50"
          : "border-white/[0.08] hover:border-[#D4AF37]/35"
      } rounded-xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`text-[10.5px] font-mono uppercase tracking-[0.18em] ${
            isCyan ? "text-[#38BDF8]" : "text-[#9C988F]"
          }`}
        >
          {label}
        </span>
        <div
          className={`w-7 h-7 rounded-lg ${
            isCyan
              ? "bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8]"
              : "bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37]"
          } flex items-center justify-center shrink-0`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          {isNumber ? (
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF8F5] font-semibold tracking-tight">
              {displayValue}
            </span>
          ) : (
            <span
              className={`font-serif text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight ${
                isCyan ? "text-[#FAF8F5]" : "text-[#FAF8F5]"
              }`}
            >
              {value}
            </span>
          )}
          {unit && <span className="font-mono text-xs text-[#D4AF37]">{unit}</span>}
        </div>

        <p className="mt-1.5 text-[11px] sm:text-xs font-sans text-[#7E7A72] leading-snug line-clamp-2">
          {subtext}
        </p>
      </div>
    </div>
  );
}

export function JourneyStatistics({ destinations }: JourneyStatisticsProps) {
  const stats = getTravelStatistics(destinations);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const items = [
    {
      label: "Places Explored",
      value: stats.placesExplored,
      icon: MapPin,
      subtext: "9 Visited Destinations",
      highlight: "gold" as const,
    },
    {
      label: "Home Base",
      value: HOME_BASE.name,
      icon: Home,
      subtext: "District of Origin",
      highlight: "cyan" as const,
    },
    {
      label: "Travel Stories",
      value: stats.travelStories,
      icon: BookOpen,
      subtext: "0 Published · Stories coming soon",
      highlight: "gold" as const,
    },
    {
      label: "Photographs",
      value: stats.photographs,
      icon: Camera,
      subtext: "0 Uploaded · Photos coming soon",
      highlight: "gold" as const,
    },
    {
      label: "Regions Explored",
      value: stats.regionsExplored,
      icon: Globe,
      subtext: "Chattogram, Sylhet, Rajshahi, Mymensingh",
      highlight: "gold" as const,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 my-10 sm:my-14"
      aria-label="Verified Travel Statistics Summary"
    >
      {items.map((item, idx) => (
        <div
          key={item.label}
          className={idx === 4 ? "col-span-2 sm:col-span-1" : ""}
        >
          <StatCard
            label={item.label}
            value={item.value}
            icon={item.icon}
            subtext={item.subtext}
            highlight={item.highlight}
            isTriggered={isTriggered}
            isReducedMotion={isReducedMotion}
          />
        </div>
      ))}
    </div>
  );
}
