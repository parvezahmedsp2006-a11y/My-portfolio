"use client";

import React from "react";
import { Layers, MapPin } from "lucide-react";

export function StratigraphicHeroGraphic() {
  return (
    <div className="relative w-full max-w-[430px] mx-auto lg:max-w-none">
      {/* 
        Editorial Scientific Plate Frame:
        Refined translucent ivory surface (backdrop-blur-md) with thin sage border
        and restrained proportions, harmonizing with the background geological photo.
      */}
      <div className="relative rounded-lg border border-sage-200/90 bg-surface-white/90 backdrop-blur-md p-3.5 sm:p-4.5 shadow-2xs hover:shadow-xs hover:border-sage-300/90 transition-all duration-300 animate-plate-float">
        {/* Plate Header Bar */}
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-sage-100 text-[11px] font-mono text-charcoal-600">
          <div className="flex items-center gap-1.5 font-medium text-charcoal-800">
            <Layers className="w-3.5 h-3.5 text-sage-700 shrink-0" />
            <span className="tracking-wider uppercase font-semibold text-[10px] sm:text-[11px]">
              FIGURE 01 • LITHOLOGIC PROFILE
            </span>
            <span className="hidden sm:inline-block text-[9.5px] font-sans px-1.5 py-0.2 rounded-xs bg-sage-100/80 text-sage-800 border border-sage-200/60">
              Sedimentary Basin
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-charcoal-500 bg-warm-ivory-dark/70 px-2 py-0.5 rounded-xs border border-border-subtle">
            <MapPin className="w-2.5 h-2.5 text-sage-600 shrink-0" />
            <span>24.36° N, 88.63° E</span>
          </div>
        </div>

        {/* Stratigraphic Column Diagram (SVG) */}
        <div className="relative rounded-sm bg-warm-ivory/55 border border-border-subtle/80 p-2 sm:p-2.5 overflow-hidden">
          <svg
            viewBox="0 0 380 215"
            className="w-full h-auto text-charcoal-800 block"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Scientific lithologic profile cross-section illustrating alluvial silt, unconfined sand aquifer, impermeable shale aquitard, and consolidated Tertiary sandstone formation"
          >
            {/* Ground Elevation & Topographic Line */}
            <path
              d="M 8 22 C 60 14, 130 32, 200 18 C 270 8, 320 24, 372 15"
              stroke="#5C8F77"
              strokeWidth="1.5"
            />
            {/* Topographic Elevation Contours */}
            <path
              d="M 8 30 C 60 22, 130 40, 200 26 C 270 16, 320 32, 372 23"
              stroke="#C2D7CC"
              strokeWidth="0.9"
              strokeDasharray="3 2.5"
            />

            {/* Depth Scale Reference Line (Left axis) */}
            <line x1="8" y1="36" x2="8" y2="204" stroke="#888B87" strokeWidth="1" strokeDasharray="1 3" />

            {/* Layer 1: Quaternary Alluvial Silt & Surface Soil (0 to -15m) */}
            <rect x="8" y="36" width="364" height="28" fill="#F1F5F3" stroke="#D8D2C5" strokeWidth="0.8" rx="1" />
            {/* Silt texture dots */}
            <circle cx="40" cy="50" r="0.9" fill="#7CA893" />
            <circle cx="80" cy="46" r="0.9" fill="#7CA893" />
            <circle cx="130" cy="53" r="0.9" fill="#7CA893" />
            <circle cx="190" cy="48" r="0.9" fill="#7CA893" />
            <circle cx="260" cy="52" r="0.9" fill="#7CA893" />
            <circle cx="310" cy="47" r="0.9" fill="#7CA893" />
            <text x="18" y="54" fontSize="9.5" fontFamily="sans-serif" fill="#141714" fontWeight="600">
              Quaternary Alluvial Silt
            </text>
            <text x="145" y="54" fontSize="8" fontFamily="sans-serif" fill="#626561">
              • Surface Soil & Fine Loam
            </text>
            <text x="330" y="54" fontSize="8.5" fontFamily="monospace" fill="#484B47">
              0 – 15m
            </text>

            {/* Layer 2: Medium-to-Coarse Sandstone Aquifer (-15m to -60m) */}
            <rect x="8" y="67" width="364" height="44" fill="#FFFFFF" stroke="#D8D2C5" strokeWidth="0.8" rx="1" />
            {/* Cross-bedding lines (sedimentological cross-stratification) */}
            <line x1="28" y1="76" x2="58" y2="98" stroke="#D6E3DC" strokeWidth="1.2" />
            <line x1="48" y1="76" x2="78" y2="98" stroke="#D6E3DC" strokeWidth="1.2" />
            <line x1="115" y1="76" x2="145" y2="98" stroke="#D6E3DC" strokeWidth="1.2" />
            <line x1="135" y1="76" x2="165" y2="98" stroke="#D6E3DC" strokeWidth="1.2" />
            <line x1="210" y1="76" x2="240" y2="98" stroke="#D6E3DC" strokeWidth="1.2" />
            <line x1="230" y1="76" x2="260" y2="98" stroke="#D6E3DC" strokeWidth="1.2" />
            <line x1="290" y1="76" x2="320" y2="98" stroke="#D6E3DC" strokeWidth="1.2" />
            {/* Water table indicator line */}
            <line x1="10" y1="74" x2="370" y2="74" stroke="#46735E" strokeWidth="0.8" strokeDasharray="4 2" />
            <polygon points="18,72 22,72 20,75" fill="#46735E" />
            <text x="18" y="89" fontSize="9.5" fontFamily="sans-serif" fill="#0A0C0A" fontWeight="600">
              Semi-Confined Clastic Aquifer
            </text>
            <text x="18" y="102" fontSize="8" fontFamily="sans-serif" fill="#375A4A">
              High Transmissivity • Regional Groundwater Storage
            </text>
            <text x="334" y="91" fontSize="8.5" fontFamily="monospace" fill="#484B47">
              -60m
            </text>

            {/* Layer 3: Impermeable Clay & Shale Aquitard (-60m to -95m) */}
            <rect x="8" y="114" width="364" height="32" fill="#EBF2EE" stroke="#D8D2C5" strokeWidth="0.8" rx="1" />
            {/* Horizontal shale laminae */}
            <line x1="18" y1="123" x2="95" y2="123" stroke="#9EC0AF" strokeWidth="1" />
            <line x1="115" y1="123" x2="195" y2="123" stroke="#9EC0AF" strokeWidth="1" />
            <line x1="215" y1="123" x2="360" y2="123" stroke="#9EC0AF" strokeWidth="1" />
            <line x1="28" y1="133" x2="140" y2="133" stroke="#9EC0AF" strokeWidth="1" />
            <line x1="160" y1="133" x2="310" y2="133" stroke="#9EC0AF" strokeWidth="1" />
            <text x="18" y="133" fontSize="9.5" fontFamily="sans-serif" fill="#141714" fontWeight="600">
              Impermeable Clay & Shale Aquitard
            </text>
            <text x="334" y="133" fontSize="8.5" fontFamily="monospace" fill="#484B47">
              -95m
            </text>

            {/* Layer 4: Deep Tertiary Sedimentary Strata (-95m+) */}
            <rect x="8" y="149" width="364" height="52" fill="#FAF7F2" stroke="#D8D2C5" strokeWidth="0.8" rx="1" />
            {/* Consolidation stipples */}
            <circle cx="45" cy="165" r="1.2" fill="#D1C7BA" />
            <circle cx="85" cy="180" r="1.2" fill="#D1C7BA" />
            <circle cx="135" cy="167" r="1.2" fill="#D1C7BA" />
            <circle cx="205" cy="177" r="1.2" fill="#D1C7BA" />
            <circle cx="275" cy="165" r="1.2" fill="#D1C7BA" />
            <circle cx="335" cy="179" r="1.2" fill="#D1C7BA" />
            <text x="18" y="169" fontSize="9.5" fontFamily="sans-serif" fill="#0A0C0A" fontWeight="600">
              Tertiary Deep Consolidated Sandstone
            </text>
            <text x="18" y="183" fontSize="8" fontFamily="sans-serif" fill="#626561">
              Regional Basin Sequence • Hydrocarbon & Deep Aquifer Potential
            </text>
            <text x="325" y="169" fontSize="8.5" fontFamily="monospace" fill="#484B47">
              -160m+
            </text>
          </svg>
        </div>

        {/* Geological Field Legend Footnote */}
        <div className="mt-2.5 pt-2 border-t border-sage-100 flex items-center justify-between text-[10.5px] font-sans text-charcoal-600">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-600 shrink-0" />
            <span className="font-medium text-charcoal-800">Bengal Basin Sequence</span>
          </div>
          <div className="flex items-center gap-2 text-[9.5px] font-mono text-charcoal-500">
            <span>Strike N18°W • Dip 8°SE</span>
            <span className="text-sage-300">•</span>
            <span className="text-sage-700 font-semibold">RU-GEO-04</span>
          </div>
        </div>
      </div>
    </div>
  );
}
