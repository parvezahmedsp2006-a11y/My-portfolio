"use client";

import React, { useEffect, useState, useRef } from "react";
import { Globe, BookOpen, Camera, MapPin } from "lucide-react";
import { Destination, getTravelStatistics } from "@/data/travelData";

interface JourneyStatisticsProps {
  destinations: Destination[];
}

interface StatItemProps {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  unit?: string;
  isTriggered: boolean;
  isReducedMotion: boolean;
  emptyLabel?: string;
}

function StatCounter({
  label,
  value,
  icon: Icon,
  unit = "",
  isTriggered,
  isReducedMotion,
  emptyLabel,
}: StatItemProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!isTriggered) return;
    if (isReducedMotion || value === 0) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [isTriggered, isReducedMotion, value]);

  return (
    <div className="bg-[#050505] border border-white/[0.08] hover:border-[#D4AF37]/35 rounded-xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9C988F]">
          {label}
        </span>
        <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] shrink-0">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-semibold tracking-tight">
            {displayValue}
          </span>
          {unit && <span className="font-mono text-xs text-[#D4AF37]">{unit}</span>}
        </div>

        <p className="mt-1 text-xs font-sans text-[#7E7A72] font-normal">
          {value === 0 ? emptyLabel || "Awaiting first recorded horizon" : "Verified personal travel record"}
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
      emptyLabel: "0 Destinations Cataloged",
    },
    {
      label: "Travel Stories",
      value: stats.travelStories,
      icon: BookOpen,
      emptyLabel: "0 Journal Chronicles",
    },
    {
      label: "Photographs",
      value: stats.photographs,
      icon: Camera,
      emptyLabel: "0 Photographs Archived",
    },
    {
      label: "Regions Explored",
      value: stats.regionsExplored,
      icon: Globe,
      emptyLabel: "0 Geographical Regions",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 my-10 sm:my-14"
      aria-label="Verified Travel Statistics Summary"
    >
      {items.map((item) => (
        <StatCounter
          key={item.label}
          label={item.label}
          value={item.value}
          icon={item.icon}
          emptyLabel={item.emptyLabel}
          isTriggered={isTriggered}
          isReducedMotion={isReducedMotion}
        />
      ))}
    </div>
  );
}
