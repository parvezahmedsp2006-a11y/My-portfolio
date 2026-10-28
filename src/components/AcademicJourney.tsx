import React from "react";
import { CheckCircle2, Clock, Landmark, Calendar } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AcademicJourney() {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="py-14 md:py-22 border-b border-border-subtle bg-warm-ivory-dark/40"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-sans uppercase tracking-widest text-sage-700 font-semibold mb-2">
            Curriculum Structure & Progress
          </p>
          <h2
            id="journey-heading"
            className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal tracking-tight"
          >
            Academic Journey
          </h2>
          <div className="w-12 h-0.5 bg-sage-500 mt-3" />
          <p className="mt-3.5 text-sm sm:text-base font-sans text-charcoal-600 leading-relaxed">
            Progression through the official 4-year B.Sc. (Hons.) curriculum in Geology and Mining at the University of Rajshahi, clearly separating completed foundations from current and upcoming modules.
          </p>
        </div>

        {/* Institution & Degree Summary Card */}
        <ScrollReveal>
          <div className="academic-card p-6 sm:p-7 mb-8 bg-surface-white border-l-4 border-l-sage-600 rounded-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-sage-50 text-sage-800 text-xs font-medium mb-2">
                  <Landmark className="w-3.5 h-3.5 text-sage-700" />
                  <span>{PORTFOLIO_DATA.personal.institution}</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-charcoal-900">
                  {PORTFOLIO_DATA.personal.program}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-charcoal-600 mt-1">
                  {PORTFOLIO_DATA.personal.department}
                </p>
              </div>
              <div className="flex flex-wrap md:flex-col md:items-end gap-2 text-xs font-sans text-charcoal-500">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-warm-ivory border border-border-subtle rounded-sm">
                  <Calendar className="w-3.5 h-3.5 text-sage-600" />
                  <span>4-Year Degree Sequence</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sage-100/70 text-sage-800 rounded-sm font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage-600" />
                  <span>Active Undergraduate Candidate</span>
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Coursework Progression Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.coursework.map((group, idx) => {
            const isCompleted = group.status === "Completed Coursework";
            return (
              <ScrollReveal key={idx} delayMs={idx * 80}>
                <div className="academic-card p-6 flex flex-col justify-between h-full rounded-md">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono font-medium text-charcoal-500">
                        {group.academicYear}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-sans font-medium px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? "bg-sage-100 text-sage-800 border border-sage-200"
                            : "bg-charcoal-100 text-charcoal-700 border border-charcoal-200"
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-sage-600" />
                            <span>Completed</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-charcoal-500" />
                            <span>Current / Upcoming</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-medium text-charcoal-900 mb-2 leading-snug">
                      {group.category}
                    </h4>

                    <p className="text-xs font-sans text-charcoal-600 mb-4 leading-relaxed">
                      {group.description}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-border-subtle">
                      {group.topics.map((topic, tIdx) => (
                        <li
                          key={tIdx}
                          className="text-xs sm:text-sm font-sans text-charcoal-700 flex items-start gap-2"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                              isCompleted ? "bg-sage-600" : "bg-charcoal-400"
                            }`}
                          />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-border-subtle text-[11px] font-sans text-charcoal-500">
                    {isCompleted
                      ? "Formally completed and evaluated via departmental lab & theory exams."
                      : "Core applied curriculum currently undertaken in semester studies."}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
