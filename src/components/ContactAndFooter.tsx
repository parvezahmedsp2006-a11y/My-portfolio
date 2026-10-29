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
  Landmark,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
              Inquiries &amp; Collaboration
            </span>
            <div className="w-10 h-px bg-white/15" aria-hidden="true" />
          </div>

          <h2
            id="contact-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-[#F3F0E8] font-normal tracking-tight leading-[1.15]"
          >
            Academic Dialogue &amp; Opportunities
          </h2>

          <div className="w-14 h-0.5 bg-[#D4AF37] mt-4" aria-hidden="true" />

          <p className="mt-4 text-sm sm:text-base font-sans text-[#9C988F] leading-relaxed font-light">
            I welcome communication from faculty mentors, prospective MSc research supervisors, and fellow geoscientists regarding academic research, graduate opportunities, or open academic software development.
          </p>
        </div>

        {/* Editorial Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Departmental Affiliation & Academic Base */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="bg-[#050505] border border-white/[0.08] p-6 sm:p-7 space-y-5 transition-colors duration-300 hover:border-white/[0.14]">
                <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                  <Landmark className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                  <span>Institutional Affiliation &amp; Base</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-[#F3F0E8] font-normal leading-snug">
                    {personal.institution}
                  </h3>
                  <p className="text-xs sm:text-[13px] font-sans text-[#E6E1D3] font-light leading-relaxed">
                    {personal.department}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2.5 text-xs font-sans text-[#9C988F]">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" aria-hidden="true" />
                  <span>{personal.location}</span>
                </div>

                <p className="pt-2 text-[11.5px] font-sans text-[#7E7A72] leading-relaxed font-light">
                  Active B.Sc. (Hons.) candidate connecting field geology with computational research. Available for research collaboration inquiries and academic correspondence.
                </p>
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
                    <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                      Direct Academic Email
                    </span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-sm sm:text-base font-mono text-[#F3F0E8] hover:text-[#D4AF37] transition-colors break-all"
                    >
                      {personal.email}
                    </a>
                    <p className="text-[11.5px] font-sans text-[#7E7A72] font-light leading-relaxed pt-1">
                      Direct inquiries regarding MSc scholarship opportunities, academic research, and collaboration.
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
                    <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                      Verified Source &amp; Codebase
                    </span>
                    <span className="text-sm sm:text-base font-mono text-[#F3F0E8]">
                      {personal.githubUsername}
                    </span>
                    <p className="text-[11.5px] font-sans text-[#7E7A72] font-light leading-relaxed pt-1">
                      Public repositories, test suites, and codebase for GeoMine Resource Hub and geological tooling.
                    </p>
                  </div>

                  <a
                    href={personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[36px] gap-1.5 px-3.5 py-1.5 text-xs font-sans font-medium border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-[#E6E1D3] transition-colors shrink-0 pt-2 sm:pt-0"
                    aria-label="Visit GitHub Profile (opens in new tab)"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-[#F3F0E8]" />
                    <span>Visit Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Semantic Editorial Footer Bar */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#7E7A72]">
          <div className="flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span className="font-light">
              &copy; {new Date().getFullYear()} {personal.name}. Verified academic &amp; research portfolio · {personal.department}.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#9C988F] hover:text-[#D4AF37] transition-colors p-1.5 rounded focus-visible:outline-2 focus-visible:outline-[#D4AF37] cursor-pointer"
              aria-label="Scroll back to top of page"
            >
              <span className="font-light">Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
