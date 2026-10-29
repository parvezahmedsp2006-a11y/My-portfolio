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
      "I am an undergraduate in Geology and Mining at the University of Rajshahi, studying subsurface systems, mineral formation, and quantitative methods in earth sciences.",
    startDelayDesktop: 100,
    startDelayMobile: 80,
    segments: [
      { text: "I am an undergraduate in", highlight: false },
      { text: "Geology and Mining", highlight: true },
      { text: "at the", highlight: false },
      { text: "University of Rajshahi", highlight: true, trailingPunctuation: "," },
      {
        text: "studying subsurface systems, mineral formation, and quantitative methods in earth sciences.",
        highlight: false,
      },
    ],
  },
  {
    id: "bio-p2",
    fullText:
      "Alongside field mapping and laboratory petrography, I built the GeoMine Resource Hub — a full-stack platform organizing departmental curricula into a searchable, accessible digital archive.",
    startDelayDesktop: 650,
    startDelayMobile: 440,
    segments: [
      { text: "Alongside field mapping and", highlight: false },
      { text: "laboratory petrography", highlight: true, trailingPunctuation: "," },
      { text: "I built the", highlight: false },
      { text: "GeoMine Resource Hub", highlight: true },
      {
        text: "— a full-stack platform organizing departmental curricula into a searchable, accessible digital archive.",
        highlight: false,
      },
    ],
  },
  {
    id: "bio-p3",
    fullText:
      "My goal is to graduate with strong foundations across hydrogeology, mineral systems, petroleum geology, and GIS, preparing for competitive international MSc scholarships and graduate research.",
    startDelayDesktop: 1150,
    startDelayMobile: 780,
    segments: [
      {
        text: "My goal is to graduate with strong foundations across",
        highlight: false,
      },
      { text: "hydrogeology", highlight: true, trailingPunctuation: "," },
      { text: "mineral systems", highlight: true, trailingPunctuation: "," },
      { text: "petroleum geology", highlight: true, trailingPunctuation: "," },
      { text: "and", highlight: false },
      { text: "GIS", highlight: true, trailingPunctuation: "," },
      { text: "preparing for competitive", highlight: false },
      { text: "international MSc scholarships", highlight: true },
      { text: "and graduate research.", highlight: false },
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
    <div className="space-y-6 text-[#D4CDBC] font-sans text-[15px] sm:text-base lg:text-[17px] leading-[1.65] font-normal">
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
