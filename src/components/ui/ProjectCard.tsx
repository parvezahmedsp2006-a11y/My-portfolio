import React from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Info,
  Layers,
  ArrowUpRight,
  Database,
  FileText,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { ProjectCaseStudy } from "@/data/portfolioData";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";

interface ProjectCardProps {
  project: ProjectCaseStudy;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="academic-card bg-[#050505] border border-white/[0.08] hover:border-[#D4AF37]/35 rounded-2xl p-6 sm:p-8 lg:p-10 xl:p-12 transition-all duration-300 shadow-[0_12px_48px_rgba(0,0,0,0.85)]">
      {/* Asymmetric Editorial Grid: Left Narrative/Specs, Right Large Architectural Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-start">
        {/* Left Column (lg:col-span-6): Project Narrative, Metadata, and Verified Architecture */}
        <div className="lg:col-span-6 space-y-7">
          {/* Category, Status, & Timeline Index */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
              <span className="font-mono text-[11px] text-[#D4AF37] tracking-[0.2em] uppercase font-medium bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
                01 · Featured Project
              </span>
              <span className="text-xs font-sans text-[#E6E1D3] bg-white/[0.04] px-3 py-1 rounded-full border border-white/10 font-medium">
                {project.status}
              </span>
              <span className="text-xs font-mono text-[#9C988F] bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.06]">
                {project.timeline}
              </span>
            </div>

            {/* Project Title */}
            <LetterBounceHeading
              as="h3"
              text={project.title}
              className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#FAF8F5] font-medium sm:font-semibold leading-[1.15] tracking-tight"
              staggerMs={38}
            />

            {/* Subtitle */}
            <p className="font-serif italic text-base sm:text-lg text-[#D4AF37] mt-1.5 font-normal">
              {project.subtitle}
            </p>
          </div>

          {/* Problem Statement & Overview */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-[#D4AF37] uppercase tracking-[0.2em] flex items-center gap-2 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Project Overview &amp; Context</span>
            </h4>
            <p className="text-[15px] sm:text-base font-sans text-[#FAF8F5] leading-[1.65] font-normal">
              {project.description}
            </p>
            <p className="text-sm sm:text-[14.5px] font-sans text-[#D4CDBC] leading-[1.6] border-l-2 border-[#D4AF37]/50 pl-3.5 my-2 font-normal">
              {project.problemStatement}
            </p>
          </div>

          {/* Key Architectural Highlights */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-mono text-[#D4AF37] uppercase tracking-[0.2em] flex items-center gap-2 font-medium">
              <Layers className="w-4 h-4 text-[#D4AF37]" />
              <span>Key Implemented Features</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.verifiedContributions.slice(0, 4).map((contrib, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#0A0A0A] border border-white/[0.07] hover:border-[#D4AF37]/30 transition-colors duration-200"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-serif text-[#FAF8F5] text-base font-medium block leading-snug">
                        {contrib.title}
                      </span>
                      <p className="text-xs sm:text-[13px] font-sans text-[#D4CDBC] leading-[1.55] font-normal mt-1">
                        {contrib.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack Tags */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-mono text-[#D4AF37] uppercase tracking-[0.2em] flex items-center gap-2 font-medium">
              <Database className="w-4 h-4 text-[#D4AF37]" />
              <span>Technologies Used</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.flatMap((t) => t.stack).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 rounded-sm bg-white/[0.04] text-[#FAF8F5] border border-white/10 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Automated Verification Evidence Banner */}
          <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[#D4AF37] uppercase tracking-wider block mb-0.5 text-xs font-semibold">
                  Automated Test Verification:
                </span>
                <span className="text-[#FAF8F5] font-normal text-xs sm:text-[13px]">
                  {project.testSuiteEvidence}
                </span>
              </div>
            </div>
            <span className="shrink-0 font-mono text-xs text-[#D4AF37] bg-[#D4AF37]/15 px-3 py-1 rounded-full border border-[#D4AF37]/35 font-semibold self-start sm:self-center">
              20 Vitest Suites (153 Tests)
            </span>
          </div>

          {/* Action Row & Deployment Transparency */}
          <div className="pt-2 space-y-3.5">
            <div className="flex flex-wrap items-center gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-xs sm:text-sm font-sans font-semibold text-[#000000] bg-[#D4AF37] hover:bg-[#E5C378] rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                  aria-label="View GeoMine Resource Hub repository on GitHub (opens in new tab)"
                >
                  <GithubIcon className="w-4 h-4 text-[#000000]" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-4 h-4 text-[#000000] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>

            {/* Deployment Status Disclosure */}
            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-sans text-[#D4CDBC] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="font-normal leading-relaxed text-xs sm:text-[13px]">
                <strong className="text-[#FAF8F5] font-medium mr-1.5">Project Status:</strong>
                {project.statusNote}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-6): Large Editorial Architectural Interface Preview */}
        <div className="lg:col-span-6 space-y-3.5 lg:sticky lg:top-24">
          <div className="relative group">
            {/* Ambient Background Aura */}
            <div
              className="absolute -inset-1.5 bg-gradient-to-tr from-[#D4AF37]/15 via-transparent to-[#D4AF37]/5 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition duration-700 pointer-events-none"
              aria-hidden="true"
            />

            {/* Architectural Interface Container */}
            <div className="relative rounded-xl border border-white/[0.12] bg-[#0A0A0A] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.95)] transition-all duration-300 group-hover:border-[#D4AF37]/45">
              {/* Window Bar Header */}
              <div className="px-4 py-3 bg-[#050505] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="ml-2 font-mono text-[10.5px] text-[#9C988F] tracking-wider uppercase select-none">
                    geomine.portal.internal / v1.0.0
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span>20/20 Suites (153 Tests)</span>
                </div>
              </div>

              {/* Interface Body */}
              <div className="p-4 sm:p-5 bg-gradient-to-b from-[#0A0A0A] to-[#040404] space-y-4">
                {/* Search & Academic Context Header */}
                <div className="p-3 rounded-lg bg-black/60 border border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E6E1D3]">
                    <span className="w-2 h-2 rounded-xs bg-[#D4AF37]" />
                    <span className="font-medium">B.Sc. (Hons.) Geology &amp; Mining</span>
                    <span className="text-white/20">/</span>
                    <span className="text-[#D4AF37]">Year 03 · Semester 05</span>
                  </div>
                  <div className="font-mono text-[9.5px] text-[#9C988F] bg-white/[0.04] px-2.5 py-1 rounded border border-white/5">
                    Curriculum Portal Archive
                  </div>
                </div>

                {/* 2-Column Split: Curriculum Tree & Course Card Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Left Column: 8-Semester Hierarchy Tree */}
                  <div className="sm:col-span-4 p-3 rounded-lg bg-black/45 border border-white/[0.06] space-y-2 font-mono">
                    <div className="text-[9.5px] uppercase tracking-wider text-[#9C988F]">
                      Curriculum Tree
                    </div>
                    <div className="space-y-1 text-white/50 text-[10px]">
                      <div className="px-2 py-1 rounded bg-white/[0.02]">Year 1 (Sem 1–2)</div>
                      <div className="px-2 py-1 rounded bg-white/[0.02]">Year 2 (Sem 3–4)</div>
                      <div className="px-2 py-1 rounded bg-[#D4AF37]/15 text-[#D4AF37] font-medium border border-[#D4AF37]/35 flex items-center justify-between">
                        <span>Year 3 (Sem 5–6)</span>
                        <span className="text-[8px]">●</span>
                      </div>
                      <div className="px-2 py-1 rounded bg-white/[0.02]">Year 4 (Sem 7–8)</div>
                    </div>
                  </div>

                  {/* Right Column: Active Course Resource Card Simulation */}
                  <div className="sm:col-span-8 p-3.5 rounded-lg bg-black/70 border border-white/[0.08] space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-[9.5px] text-[#D4AF37] tracking-wider uppercase block">
                          Course Module · G&amp;M 301
                        </span>
                        <h5 className="font-serif text-sm sm:text-base text-[#F3F0E8] font-normal leading-snug">
                          Hydrogeology &amp; Aquifer Dynamics
                        </h5>
                      </div>
                      <span className="font-mono text-[9px] text-[#9C988F] bg-white/[0.04] px-2 py-0.5 rounded border border-white/5 shrink-0">
                        14 Course Files
                      </span>
                    </div>

                    {/* In-Browser PDF Document Slice */}
                    <div className="p-2.5 rounded bg-[#060606] border border-white/[0.07] flex items-center justify-between text-[10.5px] font-mono text-[#E6E1D3]">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="truncate">Hydrogeology_Aquifer_Pumping.pdf</span>
                      </div>
                      <span className="text-[#D4AF37] text-[9px] uppercase tracking-wider shrink-0 ml-2">
                        In-Browser Viewer
                      </span>
                    </div>

                    {/* Architecture Feature Chips */}
                    <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-[#9C988F]">
                      <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-[#E6E1D3] block font-medium">CR Upload Workflow</span>
                        Role-scoped validation
                      </div>
                      <div className="p-2 rounded bg-white/[0.02] border border-white/5">
                        <span className="text-[#E6E1D3] block font-medium">Dual DB Architecture</span>
                        SQLite local · Postgres prod
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Architecture Footnote */}
                <div className="pt-2.5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#9C988F]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>Next.js 16 (App Router) · React 19 · Prisma</span>
                  </div>
                  <span className="text-[9.5px] text-[#D4AF37]/80">Zero-Friction Document Navigation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Preview Caption */}
          <p className="text-center sm:text-right font-mono text-[10px] tracking-[0.16em] uppercase text-[#9C988F]/70 select-none">
            [ GeoMine Application Interface Preview ]
          </p>
        </div>
      </div>
    </article>
  );
}
