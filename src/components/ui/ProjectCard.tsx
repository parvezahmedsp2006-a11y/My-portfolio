import React from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Info,
  Layers,
  Code2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { ProjectCaseStudy } from "@/data/portfolioData";

interface ProjectCardProps {
  project: ProjectCaseStudy;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="academic-card bg-surface-white border border-border-medium rounded-md overflow-hidden">
      {/* Header Metadata Bar */}
      <div className="p-6 sm:p-8 border-b border-border-subtle bg-warm-ivory/60 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-sm bg-sage-100 text-sage-900 border border-sage-200">
              {project.category}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-sm bg-surface-white text-charcoal-700 border border-border-subtle">
              {project.status}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-sm bg-surface-white text-charcoal-700 border border-border-subtle">
              {project.timeline}
            </span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm font-sans text-charcoal-600 mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* GitHub Link */}
        {project.githubUrl && (
          <div className="shrink-0">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-charcoal-900 hover:bg-charcoal-800 rounded-sm shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-sage-600"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8 space-y-7">
        {/* Project Description */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-charcoal-600 uppercase tracking-wider">
            Project Overview
          </h4>
          <p className="text-sm sm:text-base font-sans text-charcoal-800 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Verified Contributions */}
        <div className="pt-2">
          <h4 className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-3.5 flex items-center gap-2">
            <Layers className="w-4 h-4 text-sage-700" />
            <span>Verified Engineering Contributions:</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {project.verifiedContributions.map((contrib, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-sm bg-surface-white border border-border-subtle hover:border-sage-300 transition-colors duration-150"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sage-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium block text-xs sm:text-sm text-charcoal-900 mb-0.5">
                      {contrib.title}
                    </span>
                    <p className="text-xs font-sans text-charcoal-600 leading-relaxed">
                      {contrib.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div className="pt-2">
          <h4 className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-sage-700" />
            <span>Technology Stack:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {project.technologies.map((group, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-sm bg-warm-ivory/50 border border-border-subtle"
              >
                <span className="block text-[11px] font-mono text-charcoal-500 uppercase tracking-wider mb-2 font-medium">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.stack.map((item, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-surface-white text-charcoal-800 border border-border-subtle"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Suite Evidence */}
        <div className="p-3.5 sm:p-4 rounded-sm bg-sage-50/70 border border-sage-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4.5 h-4.5 text-sage-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-sage-900 mb-0.5">
                Automated Test Verification:
              </span>
              <span className="text-charcoal-700">
                {project.testSuiteEvidence}
              </span>
            </div>
          </div>
          <div className="shrink-0 font-mono text-[11px] text-sage-900 bg-surface-white/80 px-2.5 py-1 rounded-sm border border-sage-300">
            Vitest Test Suite Passing
          </div>
        </div>

        {/* Deployment Transparency Banner */}
        <div className="p-3 rounded-sm bg-warm-ivory border border-border-subtle text-xs font-sans text-charcoal-600 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-charcoal-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-charcoal-800 mr-1.5">Deployment Transparency:</strong>
            <span>{project.statusNote}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
