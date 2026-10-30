import React from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Info,
  Layers,
  ArrowUpRight,
  Database,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { GeoMineGallery } from "@/components/ui/GeoMineGallery";
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
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
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

              {/* Live Demo button — rendered only when NEXT_PUBLIC_GEOMINE_DEMO_URL is set */}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-sans font-medium text-[#FAF8F5] bg-white/[0.04] border border-white/15 hover:border-[#D4AF37]/50 hover:bg-white/[0.08] rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                  aria-label="Launch GeoMine Resource Hub live demo (opens in new tab)"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
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

        {/* Right Column (lg:col-span-6): Screenshot Gallery & Interface Views */}
        <div className="lg:col-span-6 space-y-3.5 lg:sticky lg:top-24">
          <GeoMineGallery />
        </div>
      </div>
    </article>
  );
}
