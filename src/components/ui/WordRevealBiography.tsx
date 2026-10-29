"use client";

import React, { useMemo } from "react";

export interface HighlightSegment {
  text: string;
  highlight: true;
  trailingPunctuation?: string;
}

export interface PlainTextSegment {
  text: string;
  highlight: false;
  trailingPunctuation?: string;
}

export type TextSegment = HighlightSegment | PlainTextSegment;

export interface ParagraphConfig {
  id: string;
  fullText: string;
  segments: TextSegment[];
  startDelayDesktop: number;
  startDelayMobile: number;
}

interface ProcessedHighlight {
  type: "highlight";
  pillDelay: number;
  words: { word: string; delay: number }[];
  trailingPunctuation: string;
}

interface ProcessedWord {
  type: "word";
  word: string;
  delay: number;
}

interface ProcessedSpace {
  type: "space";
}

type ProcessedToken = ProcessedHighlight | ProcessedWord | ProcessedSpace;

export const BIOGRAPHY_PARAGRAPHS: ParagraphConfig[] = [
  {
    id: "bio-p1",
    fullText:
      "I am an undergraduate student in the Department of Geology and Mining at the University of Rajshahi. My academic journey is centered on understanding subsurface systems, geological resource formation, and the application of spatial and quantitative methods to earth-science challenges.",
    startDelayDesktop: 100,
    startDelayMobile: 80,
    segments: [
      { text: "I am an undergraduate student in the", highlight: false },
      { text: "Department of Geology and Mining", highlight: true },
      { text: "at the", highlight: false },
      { text: "University of Rajshahi", highlight: true, trailingPunctuation: "." },
      {
        text: "My academic journey is centered on understanding subsurface systems, geological resource formation, and the application of spatial and quantitative methods to earth-science challenges.",
        highlight: false,
      },
    ],
  },
  {
    id: "bio-p2",
    fullText:
      "Alongside rigorous laboratory work and geological field exercises, I independently designed and engineered the GeoMine Resource Hub — a full-stack academic platform created to eliminate document fragmentation and organize departmental curricula into a structured, accessible digital archive.",
    startDelayDesktop: 650,
    startDelayMobile: 440,
    segments: [
      { text: "Alongside rigorous laboratory work and", highlight: false },
      { text: "geological field exercises", highlight: true, trailingPunctuation: "," },
      { text: "I independently designed and engineered the", highlight: false },
      { text: "GeoMine Resource Hub", highlight: true },
      {
        text: "— a full-stack academic platform created to eliminate document fragmentation and organize departmental curricula into a structured, accessible digital archive.",
        highlight: false,
      },
    ],
  },
  {
    id: "bio-p3",
    fullText:
      "My immediate goal is to complete my undergraduate degree with strong academic foundations across hydrogeology, mineral systems, petroleum geology, and GIS, preparing thoroughly for competitive international MSc scholarships and supervised graduate research.",
    startDelayDesktop: 1150,
    startDelayMobile: 780,
    segments: [
      {
        text: "My immediate goal is to complete my undergraduate degree with strong academic foundations across",
        highlight: false,
      },
      { text: "hydrogeology", highlight: true, trailingPunctuation: "," },
      { text: "mineral systems", highlight: true, trailingPunctuation: "," },
      { text: "petroleum geology", highlight: true, trailingPunctuation: "," },
      { text: "and", highlight: false },
      { text: "GIS", highlight: true, trailingPunctuation: "," },
      { text: "preparing thoroughly for competitive", highlight: false },
      { text: "international MSc scholarships", highlight: true },
      { text: "and supervised graduate research.", highlight: false },
    ],
  },
];

interface WordRevealBiographyProps {
  isRevealed: boolean;
  isMobile?: boolean;
}

export function WordRevealBiography({
  isRevealed,
  isMobile = false,
}: WordRevealBiographyProps) {
  // Calibrated stagger delays per word: fast & comfortable
  const staggerMs = isMobile ? 11 : 16;

  // Process tokens with accurate delays
  const processedParagraphs = useMemo(() => {
    return BIOGRAPHY_PARAGRAPHS.map((pConfig) => {
      let wordIndex = 0;
      const startDelay = isMobile ? pConfig.startDelayMobile : pConfig.startDelayDesktop;
      const tokens: ProcessedToken[] = [];

      pConfig.segments.forEach((seg, sIdx) => {
        const words = seg.text.split(/\s+/).filter(Boolean);
        const pillDelay = startDelay + wordIndex * staggerMs;

        if (seg.highlight) {
          const renderedWords = words.map((w, wIdx) => {
            const d = startDelay + wordIndex * staggerMs;
            wordIndex++;
            const isLast = wIdx === words.length - 1;
            const wordText = isLast && seg.trailingPunctuation ? `${w}${seg.trailingPunctuation}` : w;
            return { word: wordText, delay: d };
          });

          tokens.push({
            type: "highlight",
            pillDelay,
            words: renderedWords,
            trailingPunctuation: "",
          });

          if (sIdx < pConfig.segments.length - 1) {
            tokens.push({ type: "space" });
          }
        } else {
          words.forEach((w, wIdx) => {
            const d = startDelay + wordIndex * staggerMs;
            wordIndex++;
            tokens.push({ type: "word", word: w, delay: d });

            if (wIdx < words.length - 1 || sIdx < pConfig.segments.length - 1) {
              tokens.push({ type: "space" });
            }
          });
        }
      });

      return {
        id: pConfig.id,
        fullText: pConfig.fullText,
        tokens,
      };
    });
  }, [isMobile, staggerMs]);

  return (
    <div className="space-y-6 text-[#9C988F] font-sans text-sm sm:text-base lg:text-[16.5px] leading-[1.85] sm:leading-[1.9] font-light">
      {processedParagraphs.map((para) => (
        <p key={para.id} className="relative">
          {/* Accessible version for screen readers: read seamlessly without word boundary interruptions */}
          <span className="sr-only">{para.fullText}</span>

          {/* Cinematic word-by-word reveal for visual presentation */}
          <span aria-hidden="true" className="select-text">
            {para.tokens.map((token, tIdx) => {
              if (token.type === "space") {
                return " ";
              }

              if (token.type === "word") {
                return (
                  <span
                    key={tIdx}
                    className={`word-token ${isRevealed ? "revealed" : ""}`}
                    style={{
                      transitionDelay: isRevealed ? `${token.delay}ms` : "0ms",
                    }}
                  >
                    {token.word}
                  </span>
                );
              }

              if (token.type === "highlight") {
                return (
                  <React.Fragment key={tIdx}>
                    <span
                      className={`inline px-1.5 py-0.5 rounded border transition-all duration-400 ease-out select-text align-baseline ${
                        isRevealed
                          ? "bg-[#D4AF37]/12 border-[#D4AF37]/30 text-[#FFF4D0] font-medium"
                          : "bg-transparent border-transparent text-[#9C988F]/40 font-normal"
                      }`}
                      style={{
                        transitionDelay: isRevealed ? `${token.pillDelay}ms` : "0ms",
                        boxDecorationBreak: "clone",
                        WebkitBoxDecorationBreak: "clone",
                      }}
                    >
                      {token.words.map((w, wIdx) => (
                        <React.Fragment key={wIdx}>
                          <span
                            className={`word-token ${isRevealed ? "revealed" : ""}`}
                            style={{
                              transitionDelay: isRevealed ? `${w.delay}ms` : "0ms",
                            }}
                          >
                            {w.word}
                          </span>
                          {wIdx < token.words.length - 1 && " "}
                        </React.Fragment>
                      ))}
                    </span>
                    {token.trailingPunctuation && (
                      <span
                        className={`word-token ${isRevealed ? "revealed" : ""}`}
                        style={{
                          transitionDelay: isRevealed
                            ? `${token.words[token.words.length - 1].delay}ms`
                            : "0ms",
                        }}
                      >
                        {token.trailingPunctuation}
                      </span>
                    )}
                  </React.Fragment>
                );
              }

              return null;
            })}
          </span>
        </p>
      ))}
    </div>
  );
}
