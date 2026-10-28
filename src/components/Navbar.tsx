"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon } from "@/components/ui/GithubIcon";

interface NavLinkItem {
  name: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "About", href: "#about", id: "about" },
  { name: "Journey", href: "#journey", id: "journey" },
  { name: "Research", href: "#research", id: "research" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Future Goals", href: "#goals", id: "goals" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  // Track window scroll for floating navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for reliable active section tracking
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.id);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort(
          (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
        );
        setActiveSection(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-15% 0px -60% 0px",
      threshold: [0, 0.2, 0.5],
    });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 pointer-events-none px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        {/* Floating Translucent Pill Navbar */}
        <div
          className={`rounded-full border transition-all duration-300 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 flex items-center justify-between ${
            scrolled
              ? "bg-warm-ivory/95 backdrop-blur-md border-border-subtle shadow-xs"
              : "bg-warm-ivory/85 backdrop-blur-md border-border-subtle/80 shadow-2xs"
          }`}
        >
          {/* Brand Identity / Profile Area (Matching Reference) */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 focus-visible:outline-2 focus-visible:outline-sage-600 rounded-full"
            aria-label="Parvez Ahmed Portfolio Homepage"
          >
            {/* Real Formal Portrait Circular Avatar (Matching Reference) */}
            <div className="relative w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-full overflow-hidden border border-sage-200/90 shadow-2xs shrink-0 bg-warm-ivory group-hover:border-sage-400 transition-colors">
              <Image
                src="/images/portrait/parvez-ahmed-avatar.jpg"
                alt={PORTFOLIO_DATA.personal.name}
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>

            {/* Subtle Vertical Divider between Portrait and Text */}
            <div
              className="h-6 w-px bg-border-medium/80 shrink-0"
              aria-hidden="true"
            />

            {/* Name and Department Subtitle */}
            <div className="text-left">
              <span className="font-serif text-[15px] sm:text-[17px] font-medium tracking-tight text-charcoal-900 group-hover:text-sage-900 transition-colors duration-200 leading-tight block">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="block text-[9px] sm:text-[10px] font-sans text-sage-700 tracking-widest uppercase leading-none font-semibold mt-0.5">
                GEOLOGY &amp; MINING · RU
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <nav
            ref={navContainerRef}
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-0.5 lg:gap-1"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs lg:text-[13px] font-sans rounded-full transition-all duration-200 relative flex flex-col items-center select-none ${
                    isActive
                      ? "text-sage-950 font-medium bg-sage-100/75"
                      : "text-charcoal-700 hover:text-charcoal-950 hover:bg-sage-50/60 font-normal"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{link.name}</span>

                  {/* Active Indicator Underline with Dot Accent (Matching Reference) */}
                  {isActive && (
                    <div
                      className="absolute -bottom-1 flex items-center gap-1 justify-center pointer-events-none"
                      aria-hidden="true"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sage-700 shrink-0" />
                      <span className="h-0.5 w-6 bg-sage-700 rounded-full" />
                    </div>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: GitHub Profile Pill Button */}
          <div className="flex items-center gap-2">
            <a
              href={PORTFOLIO_DATA.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-sans font-medium text-charcoal-900 bg-surface-white/90 hover:bg-sage-50 border border-border-medium/90 hover:border-sage-400 rounded-full shadow-2xs hover:shadow-xs transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-sage-600"
              aria-label="GitHub Profile (opens in new tab)"
            >
              <GithubIcon className="w-3.5 h-3.5 text-charcoal-900" />
              <span className="hidden sm:inline">GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-charcoal-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full text-charcoal-800 hover:text-charcoal-950 hover:bg-sage-100/70 focus-visible:outline-2 focus-visible:outline-sage-600 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileMenuOpen ? <X size={20} className="stroke-[2.2]" /> : <Menu size={20} className="stroke-[2.2]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Card Drawer */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out rounded-2xl bg-warm-ivory/98 backdrop-blur-md border border-border-subtle shadow-lg mt-2 ${
            mobileMenuOpen ? "max-h-[500px] opacity-100 p-3.5 visible" : "max-h-0 opacity-0 p-0 invisible"
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 min-h-[44px] flex items-center justify-between text-sm rounded-xl transition-all duration-200 ${
                    isActive
                      ? "font-semibold text-sage-950 bg-sage-100/90 border-l-3 border-sage-600 pl-3 shadow-2xs"
                      : "font-normal text-charcoal-800 hover:text-sage-950 hover:bg-sage-50/80"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="text-[10px] font-mono text-sage-700 uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </a>
              );
            })}

            <div className="pt-2 mt-2 border-t border-border-subtle/80">
              <a
                href={PORTFOLIO_DATA.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 min-h-[44px] text-sm font-medium text-sage-950 bg-sage-100 hover:bg-sage-200/90 border border-sage-300/80 rounded-xl shadow-2xs transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-sage-950" />
                <span>View GitHub Repositories</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
