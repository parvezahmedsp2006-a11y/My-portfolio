"use client";

import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Copy,
  Check,
  ArrowUp,
  Compass,
  ArrowUpRight,
  FileDown,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { OrcidIcon } from "@/components/ui/OrcidIcon";
import { ResearchGateIcon } from "@/components/ui/ResearchGateIcon";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";

export function ContactAndFooter() {
  const [copied, setCopied] = useState(false);
  const { personal } = PORTFOLIO_DATA;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-[#000000] border-t border-white/[0.08] scroll-mt-20 sm:scroll-mt-24 overflow-hidden"
    >
      {/* Contact Section Container */}
      <div className="py-24 md:py-32 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 border-b border-white/[0.08] relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3.5">
            <Compass className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Get in Touch
            </span>
            <div className="w-10 h-px bg-white/15" aria-hidden="true" />
          </div>

          <LetterBounceHeading
            id="contact-heading"
            text="Contact & Collaboration"
            className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#FAF8F5] font-medium sm:font-semibold tracking-tight leading-[1.15]"
            staggerMs={42}
          />

          <div className="w-14 h-0.5 bg-[#D4AF37] mt-4" aria-hidden="true" />

          <p className="mt-4 text-[15px] sm:text-base lg:text-[17px] font-sans text-[#D4CDBC] leading-[1.65] font-normal">
            I am always open to conversations about web development, academic studies in geology, practical digital tools, or collaborative opportunities.
          </p>
        </div>

        {/* Editorial Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Location & Academic Profile */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="bg-[#050505] border border-white/[0.08] p-6 sm:p-7 space-y-5 transition-colors duration-300 hover:border-white/[0.14]">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-medium">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                  <span>Location &amp; Availability</span>
                </div>

                <div className="space-y-2">
                  <LetterBounceHeading
                    as="h3"
                    text={personal.location}
                    className="font-serif text-2xl text-[#FAF8F5] font-medium sm:font-semibold leading-snug"
                    staggerMs={38}
                  />
                  <p className="text-sm sm:text-[14.5px] font-sans text-[#D4CDBC] font-normal leading-relaxed">
                    Undergraduate Student &amp; Web Developer
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2.5 text-sm font-sans text-[#FAF8F5]">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" aria-hidden="true" />
                  <span>Open to discussions &amp; collaborations</span>
                </div>

                <p className="pt-2 text-xs sm:text-[13px] font-sans text-[#9C988F] leading-relaxed font-normal">
                  Always open to conversations about web development, technology, and practical digital projects.
                </p>

                {/* Quick Social & Academic Connect Bar */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#9C988F]">
                    Profiles
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded border border-white/10 bg-white/[0.02] text-[#D4CDBC] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                      aria-label="Visit my LinkedIn profile (opens in new tab)"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                    {personal.orcidUrl && (
                      <a
                        href={personal.orcidUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded border border-white/10 bg-white/[0.02] text-[#D4CDBC] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                        aria-label="Visit my ORCID record (opens in new tab)"
                      >
                        <OrcidIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {personal.researchGateUrl && (
                      <a
                        href={personal.researchGateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded border border-white/10 bg-white/[0.02] text-[#D4CDBC] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                        aria-label="Visit my ResearchGate profile (opens in new tab)"
                      >
                        <ResearchGateIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={personal.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded border border-white/10 bg-white/[0.02] text-[#D4CDBC] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                      aria-label="Visit my GitHub profile (opens in new tab)"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Direct Contact & Codebase Channels */}
          <div className="lg:col-span-7 space-y-6">
            {/* Direct Email Channel Card */}
            <ScrollReveal delayMs={80}>
              <div className="bg-[#050505] border border-white/[0.08] p-6 sm:p-7 transition-colors duration-300 hover:border-[#D4AF37]/40">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-[15px] sm:text-base font-mono text-[#FAF8F5] font-medium hover:text-[#D4AF37] transition-colors break-all"
                    >
                      {personal.email}
                    </a>
                    <p className="text-xs sm:text-[13px] font-sans text-[#D4CDBC] font-normal leading-relaxed pt-1">
                      Direct channel for inquiries about web development, academic studies, or project collaborations.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center justify-center min-h-[36px] gap-1.5 px-3 py-1.5 text-xs font-sans font-medium border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-[#E6E1D3] transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37] cursor-pointer"
                      aria-label="Copy email address to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#9C988F]" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${personal.email}`}
                      className="inline-flex items-center justify-center min-h-[36px] gap-1.5 px-3.5 py-1.5 text-xs font-sans font-semibold bg-[#D4AF37] text-[#000000] hover:bg-[#E5C378] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Send Mail</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* GitHub Verified Channel Card */}
            <ScrollReveal delayMs={160}>
              <div className="bg-[#050505] border border-white/[0.08] p-6 sm:p-7 transition-colors duration-300 hover:border-white/[0.14]">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                      GitHub &amp; Code Repositories
                    </span>
                    <span className="text-[15px] sm:text-base font-mono text-[#FAF8F5] font-medium">
                      {personal.githubUsername}
                    </span>
                    <p className="text-xs sm:text-[13px] font-sans text-[#D4CDBC] font-normal leading-relaxed pt-1">
                      Public repositories, test suites, and source code for GeoMine Resource Hub and personal projects.
                    </p>
                  </div>

                  <a
                    href={personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[44px] gap-1.5 px-3.5 py-1.5 text-xs font-sans font-medium border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#D4AF37]/50 text-[#FAF8F5] transition-colors shrink-0 pt-2 sm:pt-0"
                    aria-label="Visit GitHub Profile (opens in new tab)"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-[#FAF8F5]" />
                    <span>Visit Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Academic Curriculum Vitae Channel Card */}
            <ScrollReveal delayMs={200}>
              <div className="bg-[#050505] border border-white/[0.08] p-6 sm:p-7 transition-colors duration-300 hover:border-white/[0.14]">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                      Curriculum Vitae
                    </span>
                    <span className="text-[15px] sm:text-base font-serif text-[#FAF8F5] font-medium">
                      Academic &amp; Research CV
                    </span>
                    <p className="text-xs sm:text-[13px] font-sans text-[#D4CDBC] font-normal leading-relaxed pt-1">
                      Comprehensive record of undergraduate coursework, laboratory training, field studies, and technical development.
                    </p>
                  </div>

                  <div className="shrink-0 pt-2 sm:pt-0">
                    {personal.cvAvailable ? (
                      <a
                        href={personal.cvUrl}
                        download
                        className="inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2 text-xs font-sans font-medium border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37] hover:text-black text-[#FAF8F5] transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                        aria-label="Download Academic Curriculum Vitae (PDF)"
                      >
                        <FileDown className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                        <span>Download CV</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        title="Academic CV being prepared — coming soon"
                        className="inline-flex items-center justify-center min-h-[44px] gap-2 px-4 py-2 text-xs font-sans font-medium border border-white/10 bg-white/[0.02] text-[#9C988F] opacity-75 cursor-not-allowed"
                        aria-label="Download CV (CV coming soon)"
                      >
                        <FileDown className="w-3.5 h-3.5 text-[#9C988F]" aria-hidden="true" />
                        <span>CV Coming Soon</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Academic & Professional Profiles Card */}
            <ScrollReveal delayMs={260}>
              <div className="bg-[#050505] border border-white/[0.08] p-6 sm:p-7 transition-colors duration-300 hover:border-white/[0.14]">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="block text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                      Academic &amp; Professional Profiles
                    </span>
                    <span className="text-[15px] sm:text-base font-serif text-[#FAF8F5] font-medium">
                      LinkedIn {personal.orcidUrl ? "· ORCID" : ""} {personal.researchGateUrl ? "· ResearchGate" : ""}
                    </span>
                    <p className="text-xs sm:text-[13px] font-sans text-[#D4CDBC] font-normal leading-relaxed pt-1">
                      Professional profile for academic inquiry, scientific discussions, and network connections.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center min-h-[44px] gap-2 px-3.5 py-2 text-xs font-sans font-medium border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#D4AF37]/50 text-[#FAF8F5] transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37] group"
                      aria-label="Visit my LinkedIn profile (opens in new tab)"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#FAF8F5] transition-colors" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                    </a>

                    {personal.orcidUrl && (
                      <a
                        href={personal.orcidUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center min-h-[44px] gap-2 px-3.5 py-2 text-xs font-sans font-medium border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#D4AF37]/50 text-[#FAF8F5] transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37] group"
                        aria-label="Visit my ORCID record (opens in new tab)"
                      >
                        <OrcidIcon className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#FAF8F5] transition-colors" />
                        <span>ORCID</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                      </a>
                    )}

                    {personal.researchGateUrl && (
                      <a
                        href={personal.researchGateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center min-h-[44px] gap-2 px-3.5 py-2 text-xs font-sans font-medium border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#D4AF37]/50 text-[#FAF8F5] transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37] group"
                        aria-label="Visit my ResearchGate profile (opens in new tab)"
                      >
                        <ResearchGateIcon className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#FAF8F5] transition-colors" />
                        <span>ResearchGate</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Semantic Editorial Footer Bar */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] font-sans text-[#9C988F]">
          <div className="flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span className="font-normal">
              &copy; {new Date().getFullYear()} {personal.name}. Personal portfolio · All rights reserved.
            </span>
          </div>

          {/* Footer Social Profiles */}
          <div className="flex items-center gap-1.5" aria-label="Social and professional profiles">
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile (opens in new tab)"
              className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#9C988F] hover:text-[#D4AF37] hover:bg-white/[0.04] rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            {personal.orcidUrl && (
              <a
                href={personal.orcidUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my ORCID record (opens in new tab)"
                className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#9C988F] hover:text-[#D4AF37] hover:bg-white/[0.04] rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              >
                <OrcidIcon className="w-4 h-4" />
              </a>
            )}
            {personal.researchGateUrl && (
              <a
                href={personal.researchGateUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my ResearchGate profile (opens in new tab)"
                className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#9C988F] hover:text-[#D4AF37] hover:bg-white/[0.04] rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              >
                <ResearchGateIcon className="w-4 h-4" />
              </a>
            )}
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile (opens in new tab)"
              className="p-2.5 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-[#9C988F] hover:text-[#D4AF37] hover:bg-white/[0.04] rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#D4CDBC] hover:text-[#D4AF37] transition-colors p-2 min-h-[44px] rounded focus-visible:outline-2 focus-visible:outline-[#D4AF37] cursor-pointer"
              aria-label="Scroll back to top of page"
            >
              <span className="font-normal">Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
