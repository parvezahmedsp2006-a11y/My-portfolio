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
} from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function ContactAndFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
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
    <footer id="contact" className="bg-warm-ivory border-t border-border-subtle">
      {/* Contact Section */}
      <div className="py-14 md:py-22 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-subtle">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <p className="text-xs font-sans uppercase tracking-widest text-sage-700 font-semibold">
            Inquiries & Collaboration
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal tracking-tight">
            Academic Dialogue & Opportunities
          </h2>
          <div className="w-12 h-0.5 bg-sage-500 mx-auto" />
          <p className="text-xs sm:text-sm md:text-base font-sans text-charcoal-700 leading-relaxed max-w-xl mx-auto">
            I welcome communication from faculty mentors, prospective MSc research supervisors, and fellow geoscientists regarding academic research, graduate opportunities, or open academic software development.
          </p>

          {/* Contact Card */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="academic-card p-5 sm:p-6 bg-surface-white border border-border-medium rounded-md shadow-xs text-left">
              <div className="space-y-4">
                {/* Email Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-sage-100 flex items-center justify-center text-sage-800 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-sans uppercase text-charcoal-500 tracking-wider font-semibold">
                        Direct Academic Email
                      </span>
                      <a
                        href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                        className="text-xs sm:text-sm font-medium font-sans text-charcoal-900 hover:text-sage-800 transition-colors break-all"
                      >
                        {PORTFOLIO_DATA.personal.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center justify-center min-h-[38px] gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm border border-border-medium bg-warm-ivory hover:bg-warm-ivory-dark text-charcoal-700 transition-colors focus-visible:outline-2 focus-visible:outline-sage-600"
                      aria-label="Copy email address to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-sage-700" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-charcoal-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="inline-flex items-center justify-center min-h-[38px] gap-1 px-3.5 py-1.5 text-xs font-medium rounded-sm bg-sage-800 text-white hover:bg-sage-900 transition-colors"
                    >
                      <span>Send Mail</span>
                    </a>
                  </div>
                </div>

                {/* GitHub Row */}
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-border-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-sage-100 flex items-center justify-center text-sage-800 shrink-0">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-sans uppercase text-charcoal-500 tracking-wider font-semibold">
                        GitHub Profile
                      </span>
                      <span className="text-xs sm:text-sm font-medium font-sans text-charcoal-900">
                        {PORTFOLIO_DATA.personal.githubUsername}
                      </span>
                    </div>
                  </div>

                  <a
                    href={PORTFOLIO_DATA.personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[38px] gap-1 px-3 py-1.5 text-xs font-medium rounded-sm border border-border-medium bg-warm-ivory hover:bg-warm-ivory-dark text-charcoal-800 transition-colors"
                    aria-label="Visit GitHub Profile (opens in new tab)"
                  >
                    <span>Visit Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Location Row */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-9 h-9 rounded-sm bg-sage-100 flex items-center justify-center text-sage-800 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-sans uppercase text-charcoal-500 tracking-wider font-semibold">
                      Departmental Affiliation & Base
                    </span>
                    <span className="text-xs sm:text-sm font-sans text-charcoal-800">
                      {PORTFOLIO_DATA.personal.department}, {PORTFOLIO_DATA.personal.institution},{" "}
                      {PORTFOLIO_DATA.personal.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Semantic Footer Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-charcoal-500">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-sage-600" />
            <span>
              &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. Verified academic portfolio.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-charcoal-700 hover:text-sage-800 transition-colors p-1.5 rounded-sm focus-visible:outline-2 focus-visible:outline-sage-600"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
