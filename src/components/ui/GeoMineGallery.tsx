"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FileText, Layers, UploadCloud, Eye } from "lucide-react";

export interface ScreenshotTab {
  id: "course-list" | "pdf-viewer" | "upload-flow";
  title: string;
  filename: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: ScreenshotTab[] = [
  {
    id: "course-list",
    title: "Curriculum Catalog",
    filename: "course-list.png",
    description: "8-semester hierarchical syllabus navigation and course resource index.",
    icon: Layers,
  },
  {
    id: "pdf-viewer",
    title: "In-Browser PDF Viewer",
    filename: "pdf-viewer.png",
    description: "Integrated document reader with page navigation, zoom, and direct download.",
    icon: FileText,
  },
  {
    id: "upload-flow",
    title: "Representative Upload",
    filename: "upload-flow.png",
    description: "Role-scoped material submission with administrative moderation controls.",
    icon: UploadCloud,
  },
];

export function GeoMineGallery() {
  const [activeTab, setActiveTab] = useState<ScreenshotTab["id"]>("course-list");
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];
  const hasError = imageError[currentTab.id] ?? false;

  const handleImageError = (id: string) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-3.5">
      {/* Tab Navigation Controls */}
      <div
        role="tablist"
        aria-label="GeoMine screenshot views"
        className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-lg bg-[#080808] border border-white/[0.08]"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono rounded-md transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm font-medium"
                  : "text-[#9C988F] hover:text-[#FAF8F5] hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Screenshot Frame Container */}
      <div
        role="tabpanel"
        id={`tabpanel-${currentTab.id}`}
        aria-labelledby={`tab-${currentTab.id}`}
        className="relative rounded-xl border border-white/[0.12] bg-[#0A0A0A] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.95)]"
      >
        {/* Window Bar Header */}
        <div className="px-4 py-3 bg-[#050505] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" aria-hidden="true" />
            <span className="ml-2 font-mono text-[10.5px] text-[#9C988F] tracking-wider uppercase select-none">
              geomine / {currentTab.filename}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/25">
            <Eye className="w-3 h-3 text-[#D4AF37]" aria-hidden="true" />
            <span>{currentTab.title}</span>
          </div>
        </div>

        {/* Screenshot View Area */}
        <div className="relative aspect-[16/10] w-full bg-[#080808] flex items-center justify-center p-4">
          {!hasError ? (
            <div className="relative w-full h-full rounded overflow-hidden">
              <Image
                src={`/images/geomine/${currentTab.filename}`}
                alt={`GeoMine Resource Hub interface showing ${currentTab.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-top"
                onError={() => handleImageError(currentTab.id)}
              />
            </div>
          ) : (
            /* Graceful Fallback Architectural Simulation when screenshot file is pending */
            <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 rounded border border-white/[0.06] bg-gradient-to-b from-[#0C0C0C] to-[#040404] text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                  <span className="w-2 h-2 rounded-xs bg-[#D4AF37]" />
                  <span className="font-medium">{currentTab.title}</span>
                  <span className="text-white/20">/</span>
                  <span className="text-[#9C988F]">MVP Simulation</span>
                </div>
                <p className="text-xs sm:text-[13px] font-sans text-[#D4CDBC] leading-relaxed">
                  {currentTab.description}
                </p>
              </div>

              {/* Contextual Wireframe / Simulation Block */}
              {currentTab.id === "course-list" && (
                <div className="p-3 rounded bg-black/60 border border-white/[0.06] font-mono text-[11px] space-y-1.5 text-[#FAF8F5]">
                  <div className="text-[10px] text-[#9C988F] uppercase tracking-wider">8-Semester Catalog Tree</div>
                  <div className="text-[#D4AF37]">Year 03 / Semester 05 &rarr; G&amp;M 301 Hydrogeology</div>
                  <div className="text-white/50">Year 02 / Semester 03 &rarr; G&amp;M 201 Petrology</div>
                  <div className="text-white/50">Year 01 / Semester 01 &rarr; G&amp;M 101 Physical Geology</div>
                </div>
              )}

              {currentTab.id === "pdf-viewer" && (
                <div className="p-3 rounded bg-black/60 border border-white/[0.06] font-mono text-[11px] space-y-1.5 text-[#FAF8F5]">
                  <div className="text-[10px] text-[#9C988F] uppercase tracking-wider">In-Browser Document Stream</div>
                  <div className="flex items-center justify-between text-[#D4AF37]">
                    <span>Hydrogeology_Aquifer_Pumping_Tests.pdf</span>
                    <span className="text-xs text-white/50">Page 1 / 48 · Fit Width</span>
                  </div>
                  <div className="text-white/40 text-[10px]">Client-side PDF rendering with native zoom and print controls.</div>
                </div>
              )}

              {currentTab.id === "upload-flow" && (
                <div className="p-3 rounded bg-black/60 border border-white/[0.06] font-mono text-[11px] space-y-1.5 text-[#FAF8F5]">
                  <div className="text-[10px] text-[#9C988F] uppercase tracking-wider">Course Representative Pipeline</div>
                  <div className="text-[#D4AF37]">Role: Verified Semester Representative</div>
                  <div className="text-white/50">Scoped Permissions: Semester 05 Coursework Only</div>
                  <div className="text-white/40 text-[10px]">Administrative approval required before public catalog indexing.</div>
                </div>
              )}

              {/* TODO: Add real screenshot to public/images/geomine/ */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#9C988F]">
                <span>TODO: Add /public/images/geomine/{currentTab.filename}</span>
                <span className="text-[#D4AF37]">Awaiting Screenshot File</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description Caption */}
      <p className="text-center sm:text-right font-mono text-[11px] text-[#9C988F] select-none">
        {currentTab.description}
      </p>
    </div>
  );
}
