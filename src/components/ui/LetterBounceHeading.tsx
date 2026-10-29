"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

export interface LetterBounceHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  id?: string;
  className?: string;
  staggerMs?: number;
  baseDelayMs?: number;
  threshold?: number;
  wordClassName?: string;
}

export function LetterBounceHeading({
  text,
  as: Component = "h2",
  id,
  className = "",
  staggerMs = 42,
  baseDelayMs = 0,
  threshold = 0.1,
  wordClassName = "",
}: LetterBounceHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Group characters by word so words wrap naturally without breaking mid-word
  const { words, globalCharIndices } = useMemo(() => {
    const rawWords = text.trim().split(/\s+/);
    let charCounter = 0;
    const indices: number[][] = [];

    rawWords.forEach((word) => {
      const wordIndices: number[] = [];
      for (let i = 0; i < word.length; i++) {
        wordIndices.push(charCounter++);
      }
      indices.push(wordIndices);
    });

    return { words: rawWords, globalCharIndices: indices };
  }, [text]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsReducedMotion(true);
      setIsTriggered(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTriggered(true);
            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  // Reduced motion: render clean static heading
  if (isReducedMotion) {
    return (
      <Component id={id} className={className}>
        {text}
      </Component>
    );
  }

  return (
    <Component
      ref={containerRef as unknown as React.RefObject<HTMLHeadingElement>}
      id={id}
      className={className}
    >
      {/* Screen-reader accessible label: read in one piece without character stutter */}
      <span className="sr-only">{text}</span>

      {/* Visual letter-by-letter bounce presentation with word boundary preservation */}
      <span aria-hidden="true" className="select-text">
        {words.map((word, wIdx) => (
          <React.Fragment key={wIdx}>
            <span className={`inline-block whitespace-nowrap ${wordClassName}`}>
              {word.split("").map((char, cIdx) => {
                const charIndex = globalCharIndices[wIdx]?.[cIdx] ?? 0;
                const delay = baseDelayMs + charIndex * staggerMs;
                return (
                  <span
                    key={cIdx}
                    className={`letter-bounce-char ${isTriggered ? "is-animating" : ""}`}
                    style={{
                      animationDelay: isTriggered ? `${delay}ms` : undefined,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
            {wIdx < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </span>
    </Component>
  );
}
