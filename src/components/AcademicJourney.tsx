"use client";

import React from "react";
import { Landmark, Calendar, CheckCircle2, Clock, BookOpen, Compass } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LetterBounceHeading } from "@/components/ui/LetterBounceHeading";

export function AcademicJourney() {
  const { coursework } = PORTFOLIO_DATA;

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative py-24 md:py-32 border-t border-white/[0.08] bg-[#000000] scroll-mt-20 sm:scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-3.5">
            <Compass className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Academic Journey &amp; Curriculum
            </span>
            <div className="w-10 h-px bg-white/15" aria-hidden="true" />
          </div>

          <LetterBounceHeading
            id="journey-heading"
            text="Academic Journey"
            className="font-serif text-3xl sm:text-4xl lg:text-[48px] text-[#FAF8F5] font-medium sm:font-semibold tracking-tight leading-[1.15]"
            staggerMs={42}
          />

          <div className="w-14 h-0.5 bg-[#D4AF37] mt-4" aria-hidden="true" />

          <p className="mt-4 text-[15px] sm:text-base lg:text-[17px] font-sans text-[#D4CDBC] leading-[1.65] font-normal">
            Four-year undergraduate degree curriculum, outlining foundational coursework, laboratory training, and ongoing academic subjects.
          </p>
        </div>

        {/* Institutional Degree Foundation Banner (Restrained Editorial Framing) */}
        <ScrollReveal>
          <div className="border border-white/[0.08] bg-[#050505] p-6 sm:p-8 mb-14 sm:mb-18 transition-colors duration-300 hover:border-white/[0.14]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-medium">
                  <Landmark className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                  <span>Undergraduate Degree Foundation</span>
                </div>
                <LetterBounceHeading
                  as="h3"
                  text="B.Sc. (Hons.) Curriculum"
                  className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-medium sm:font-semibold tracking-tight"
                  staggerMs={38}
                />
                <p className="text-[14px] sm:text-[15px] font-sans text-[#D4CDBC] font-normal max-w-2xl leading-[1.6]">
                  Undergraduate curriculum integrating geological field observation, laboratory mineralogy, and physical earth processes.
                </p>
              </div>

              <div className="flex flex-wrap lg:flex-col lg:items-end gap-3 text-xs font-mono shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/10 text-[#FAF8F5] font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                  <span>4-Year Curriculum</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" aria-hidden="true" />
                  <span className="font-semibold">Undergraduate Student</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Vertical Editorial Timeline */}
        <div className="relative">
          {/* Continuous Timeline Spine */}
          <div
            className="absolute top-4 bottom-8 w-px bg-gradient-to-b from-[#D4AF37]/50 via-white/[0.12] to-white/[0.03] left-3.5 md:left-[210px] lg:left-[240px]"
            aria-hidden="true"
          />

          <div className="space-y-12 sm:space-y-16">
            {coursework.map((group, idx) => {
              const isCompleted = group.status === "Completed Coursework";

              return (
                <ScrollReveal key={group.category} delayMs={idx * 100}>
                  <article
                    className="relative flex flex-col md:flex-row items-start group"
                    aria-labelledby={`timeline-heading-${idx}`}
                  >
                    {/* Left Column: Academic Period & Status Badge (Desktop: right-aligned; Mobile: left-aligned) */}
                    <div className="w-full md:w-[210px] lg:w-[240px] shrink-0 md:text-right pl-10 md:pl-0 md:pr-10 lg:pr-12">
                      <div className="inline-flex flex-col md:items-end">
                        <time className="font-mono text-xs sm:text-[13px] text-[#D4AF37] uppercase tracking-wider font-medium">
                          {group.academicYear}
                        </time>

                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 mt-2 transition-colors duration-200 ${
                            isCompleted
                              ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30"
                              : "bg-white/[0.03] text-[#9C988F] border border-white/10"
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" aria-hidden="true" />
                              <span>Completed</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-[#9C988F]" aria-hidden="true" />
                              <span>Current / Upcoming</span>
                            </>
                          )}
                        </span>

                        <span className="text-[11px] font-sans text-[#7E7A72] mt-2 hidden md:block font-light">
                          {isCompleted ? "Laboratory & Theory" : "In Active Progression"}
                        </span>
                      </div>
                    </div>

                    {/* Geometric Timeline Marker (Centered on Spine) */}
                    <div
                      className="absolute left-3.5 md:left-[210px] lg:left-[240px] -translate-x-1/2 top-1.5 z-10 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {isCompleted ? (
                        <div className="w-2.5 h-2.5 bg-[#D4AF37] rotate-45 ring-4 ring-[#000000] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                      ) : (
                        <div className="w-2.5 h-2.5 border-2 border-[#D4AF37] bg-[#000000] rotate-45 ring-4 ring-[#000000]" />
                      )}
                    </div>

                    {/* Right Column: Milestone Heading, Narrative Description & Modules Matrix */}
                    <div className="flex-1 min-w-0 pl-10 md:pl-10 lg:pl-12 pt-3 md:pt-0">
                      {/* Milestone Heading */}
                      <LetterBounceHeading
                        as="h3"
                        id={`timeline-heading-${idx}`}
                        text={group.category}
                        className="font-serif text-2xl sm:text-[26px] lg:text-[28px] text-[#FAF8F5] font-medium sm:font-semibold tracking-tight leading-snug group-hover:text-[#FFF4D0] transition-colors duration-200"
                        staggerMs={38}
                      />

                      {/* Supporting Narrative Description */}
                      <p className="mt-2.5 text-[15px] sm:text-base font-sans text-[#D4CDBC] leading-[1.65] font-normal max-w-2xl">
                        {group.description}
                      </p>

                      {/* Curricular Modules Box */}
                      <div className="mt-4 p-4 sm:p-5 bg-[#070707] border border-white/[0.07] transition-all duration-300 hover:border-white/[0.14] hover:bg-[#090909]">
                        <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/[0.06]">
                          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                            <span>Curricular Modules &amp; Labs</span>
                          </div>
                          <span className="text-xs font-mono text-[#9C988F]">
                            {group.topics.length} Subjects
                          </span>
                        </div>

                        {/* Compact Topics Grid */}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-[13.5px] font-sans text-[#FAF8F5]" role="list">
                          {group.topics.map((topic, tIdx) => (
                            <li
                              key={tIdx}
                              className="flex items-center gap-2 font-normal"
                            >
                              <span
                                className={`w-1.5 h-1.5 rotate-45 shrink-0 ${
                                  isCompleted ? "bg-[#D4AF37]" : "bg-white/40"
                                }`}
                                aria-hidden="true"
                              />
                              <span className="leading-snug truncate">{topic}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Optional Fields: Notable Projects, Field Trips, Awards, CGPA — only rendered if present */}
                        {((group.notableProjects && group.notableProjects.length > 0) ||
                          (group.fieldTrips && group.fieldTrips.length > 0) ||
                          (group.awards && group.awards.length > 0) ||
                          group.cgpaOrResult) && (
                          <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2 text-xs font-sans">
                            {group.cgpaOrResult && (
                              <div className="flex items-center gap-2 text-[#FAF8F5]">
                                <span className="font-mono text-[#D4AF37] uppercase tracking-wider text-[11px]">Academic Result:</span>
                                <span>{group.cgpaOrResult}</span>
                              </div>
                            )}
                            {group.notableProjects && group.notableProjects.length > 0 && (
                              <div className="space-y-1">
                                <span className="font-mono text-[#D4AF37] uppercase tracking-wider text-[11px] block">Notable Projects:</span>
                                <ul className="list-disc list-inside text-[#D4CDBC] space-y-0.5">
                                  {group.notableProjects.map((p, pIdx) => (
                                    <li key={pIdx}>{p}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {group.fieldTrips && group.fieldTrips.length > 0 && (
                              <div className="space-y-1">
                                <span className="font-mono text-[#D4AF37] uppercase tracking-wider text-[11px] block">Field Excursions:</span>
                                <ul className="list-disc list-inside text-[#D4CDBC] space-y-0.5">
                                  {group.fieldTrips.map((ft, ftIdx) => (
                                    <li key={ftIdx}>{ft}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {group.awards && group.awards.length > 0 && (
                              <div className="space-y-1">
                                <span className="font-mono text-[#D4AF37] uppercase tracking-wider text-[11px] block">Honors &amp; Awards:</span>
                                <ul className="list-disc list-inside text-[#D4CDBC] space-y-0.5">
                                  {group.awards.map((aw, awIdx) => (
                                    <li key={awIdx}>{aw}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Assessment Strip */}
                        <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-sans text-[#9C988F]">
                          <span>
                            {isCompleted
                              ? "Completed and assessed via laboratory & theory examinations."
                              : "Core curriculum currently undertaken in active semester coursework."}
                          </span>
                          <span className="font-mono text-xs text-[#7E7A72] shrink-0 font-medium">
                            Undergraduate Program
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
