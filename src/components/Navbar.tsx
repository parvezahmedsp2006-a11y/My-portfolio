"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavLinkItem {
  name: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "Home", href: "#", id: "hero" },
  { name: "About", href: "#about", id: "about" },
  { name: "Journey", href: "#journey", id: "journey" },
  { name: "Research", href: "#research", id: "research" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Travel", href: "#travel", id: "travel" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);

  // Track scroll position to show sticky navigation after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 180);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // High-performance document scroll progress indicator
  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const winHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const maxScroll = docHeight - winHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
      if (progressTrackRef.current) {
        progressTrackRef.current.setAttribute("aria-valuenow", Math.round(progress * 100).toString());
      }
    };

    const handleScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateProgress();
        rafId = null;
      });
    };

    // Calculate immediately on mount
    updateProgress();

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    window.addEventListener("orientationchange", handleScrollOrResize, { passive: true });

    // Handle dynamic DOM height updates (e.g., dynamic content, images loading)
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && document.body) {
      resizeObserver = new ResizeObserver(() => {
        handleScrollOrResize();
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("orientationchange", handleScrollOrResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // IntersectionObserver for reliable active section tracking
  useEffect(() => {
    const sectionIds = ["hero", "about", "journey", "research", "projects", "skills", "goals", "travel", "contact"];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort(
          (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
        );
        const topId = visibleEntries[0].target.id;
        setActiveSection(topId === "hero" ? "hero" : topId);
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
    <>
      {/* Sticky Top Header Container */}
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        {/* Navigation Bar Content (fades in smoothly when scrolled down past hero) */}
        <div
          className={`transition-all duration-300 bg-[#000000]/95 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.8)] ${
            scrolled
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-12 h-16 sm:h-18 flex items-center justify-between">
            {/* Brand Wordmark (Small script in sticky state) */}
            <Link
              href="#"
              className="calligraphic-wordmark text-2xl sm:text-3xl leading-none select-none hover:opacity-85 transition-opacity"
              aria-label="Parvez Ahmed Homepage"
            >
              Parvez Ahmed
            </Link>

            {/* Desktop Navigation Links */}
            <nav aria-label="Sticky Navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = (link.id === "hero" && activeSection === "hero") || activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-xs sm:text-[13.5px] font-sans tracking-wide transition-colors duration-200 select-none font-medium ${
                      isActive
                        ? "text-[#D4AF37]"
                        : "text-[#D4CDBC] hover:text-[#FAF8F5]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-sm text-[#D4AF37] hover:text-[#FFF4D0] focus-visible:outline-2 focus-visible:outline-[#D4AF37] transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Progress Indicator (Directly underneath the navbar) */}
        <div
          id="scroll-progress"
          ref={progressTrackRef}
          data-scroll-progress-track="true"
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          className="fixed inset-x-0 top-16 sm:top-18 pointer-events-none h-[2px] sm:h-[2.5px] bg-[#1c1812] overflow-hidden"
        >
          <div
            ref={progressBarRef}
            data-scroll-progress-bar="true"
            className="h-full w-full bg-gradient-to-r from-[#B89635] via-[#D4AF37] to-[#F3E5AB] origin-left will-change-transform shadow-[0_0_8px_rgba(212,175,55,0.4)]"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        </div>
      </header>

      {/* Mobile Dropdown Drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-16 sm:top-18 z-40 md:hidden overflow-hidden transition-all duration-300 ease-out bg-[#000000]/98 border-b border-white/[0.08] backdrop-blur-xl ${
          mobileMenuOpen ? "max-h-[400px] opacity-100 py-6 px-6 visible" : "max-h-0 opacity-0 p-0 invisible pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="space-y-3 max-w-sm mx-auto text-left">
          {NAV_LINKS.map((link) => {
            const isActive = (link.id === "hero" && activeSection === "hero") || activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm tracking-wide transition-colors ${
                  isActive ? "text-[#D4AF37] font-medium" : "text-[#9C988F] hover:text-[#F3F0E8]"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
