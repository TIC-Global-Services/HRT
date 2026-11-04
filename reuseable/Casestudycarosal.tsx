"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ----------------------------- Types ----------------------------- */

export interface CaseStudyStat {
  value: string;
  label: string;
  highlighted?: boolean;
}

export interface CaseStudyItem {
  id: string;
  category: string;
  title: string;
  href: string;
  imageSrc: string;
  stats: CaseStudyStat[];
}

export interface CaseStudyCarouselProps {
  /** Cards to render in the carousel */
  items: CaseStudyItem[];

  /** Header copy */
  eyebrow: string;
  /** Each entry renders on its own line (first inline, the rest as block) */
  headingLines: string[];
  description: string;

  /** Header pill link */
  ctaLabel: string;
  ctaHref: string;

  /** Card link label */
  cardLinkLabel?: string;

  /** Section config */
  sectionId?: string;
  ariaLabel?: string;
  className?: string;

  /** Auto-advance interval in ms (pauses on hover) */
  autoAdvanceMs?: number;

  /** Aria label prefix for pagination dots, e.g. "Go to case study" */
  dotAriaLabelPrefix?: string;
}

/* --------------------------- Component --------------------------- */

export default function CaseStudyCarousel({
  items,
  eyebrow,
  headingLines,
  description,
  ctaLabel,
  ctaHref,
  cardLinkLabel = "READ THE FULL CASE STUDY",
  sectionId,
  ariaLabel,
  className,
  autoAdvanceMs = 6000,
  dotAriaLabelPrefix = "Go to case study",
}: CaseStudyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [maxOffset, setMaxOffset] = useState<number>(0);
  const [stepWidth, setStepWidth] = useState<number>(0);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const lastIndex = items.length - 1;

  // Dynamically calculate exact slide offset for the card track
  useEffect(() => {
    const updateOffset = () => {
      if (firstCardRef.current) {
        const cardWidth = firstCardRef.current.offsetWidth;
        const gap = window.innerWidth >= 640 ? 32 : 24;
        const leftPadding = window.innerWidth * 0.05; // 5%
        const rightPadding = window.innerWidth * 0.05; // 5%
        // Total distance from start of track to the right edge of the last card:
        const totalContentWidth =
          leftPadding + cardWidth * items.length + gap * (items.length - 1);
        // Shift needed so the last card ends with symmetrical 5% right margin:
        const calculatedOffset = Math.max(
          0,
          totalContentWidth - (window.innerWidth - rightPadding)
        );
        setMaxOffset(calculatedOffset);
        setStepWidth(cardWidth + gap);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [items.length]);

  // Auto-advance, pausing on hover
  useEffect(() => {
    if (isPaused || items.length < 2) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= lastIndex ? 0 : prev + 1));
    }, autoAdvanceMs);

    return () => clearInterval(interval);
  }, [isPaused, items.length, lastIndex, autoAdvanceMs]);

  const handlePillClick = (targetIndex: number) => {
    setCurrentIndex(targetIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setCurrentIndex((prev) => Math.min(prev + 1, lastIndex));
    } else if (diff < -50) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    touchStartXRef.current = null;
  };

  const translateX = Math.min(currentIndex * stepWidth, maxOffset);

  return (
    <section
      id={sectionId}
      aria-label={ariaLabel}
      className={cn(
        "relative w-full py-20 sm:py-24 lg:py-28 overflow-hidden",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Header Section */}
      <div className="px-[5%] mb-12 sm:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          {/* Left Column: Eyebrow, Headline, and CTA Pill */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#E26D35] uppercase mb-4 font-mono">
              <span className="text-base leading-none font-bold">*</span>
              <span>{eyebrow}</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#142938] leading-[1.14] mb-6">
              {headingLines.map((line, i) =>
                i === 0 ? (
                  <React.Fragment key={i}>{line}</React.Fragment>
                ) : (
                  <span key={i} className="block">
                    {line}
                  </span>
                )
              )}
            </h2>

            {/* Header CTA Pill */}
            <div>
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F1F3F5] hover:bg-[#E5E9ED] text-[#142938] text-xs font-mono font-semibold tracking-wider uppercase transition-colors duration-200"
              >
                <span>{ctaLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Subtitle Description */}
          <div className="lg:max-w-md lg:pt-8">
            <p className="font-sans text-base sm:text-lg text-slate-500 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Card Carousel Track */}
      <div
        className="w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex pl-[5%] gap-6 sm:gap-8 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {items.map((study, idx) => {
            const isFirst = idx === 0;
            const isCardActive = idx === currentIndex;

            return (
              <div
                key={study.id}
                ref={isFirst ? firstCardRef : undefined}
                onClick={() => {
                  if (!isCardActive) {
                    setCurrentIndex(idx);
                  }
                }}
                className={cn(
                  "relative shrink-0 rounded-[28px] sm:rounded-[30px] overflow-hidden border select-none cursor-pointer",
                  // Card width spans 76-85vw so adjacent card peeks nicely
                  "w-[85vw] sm:w-[80vw] lg:w-[76vw]",
                  "h-[500px] sm:h-[540px] lg:h-[580px] flex items-stretch justify-end p-3 sm:p-4 lg:p-2",
                  "transition-all duration-300 ease-out",
                  isCardActive
                    ? "border-slate-300/80 shadow-2xl shadow-slate-900/10 opacity-100"
                    : "border-slate-200/70 opacity-75 hover:opacity-95"
                )}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={study.imageSrc}
                    alt={study.title}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1100px"
                  />
                  {/* Dark gradient for mobile readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:hidden" />
                </div>

                {/* Inset White Content Card - Full Height */}
                <div className="relative z-10 bg-[#FAFAFA]/95 backdrop-blur-sm sm:bg-[#F9F9F7] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-xl border border-neutral-100/90 w-full sm:w-[480px] lg:w-[530px] h-full flex flex-col justify-between">
                  <div>
                    {/* Category */}
                    <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-3">
                      {study.category}
                    </div>
                  </div>
                  <div>
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#142938] font-sora leading-snug mb-4 whitespace-pre-line">
                      {study.title}
                    </h3>

                    {/* CTA Link */}
                    <div className="mb-6">
                      <Link
                        href={study.href}
                        onClick={(e) => e.stopPropagation()}
                        className="group inline-flex items-center gap-1.5 text-base font-mono font-semibold tracking-tight text-[#254F5F] hover:text-[#E26D35] uppercase transition-colors duration-200"
                      >
                        <span>{cardLinkLabel}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200/70">
                    {study.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="flex flex-col">
                        <span
                          className={cn(
                            "text-3xl sm:text-[42px] font-geist font-bold tracking-tight mb-1",
                            stat.highlighted
                              ? "text-[#F8720C]"
                              : "text-[#62737A]"
                          )}
                        >
                          {stat.value}
                        </span>
                        <span className="text-sm text-[#62737A] leading-snug">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Pagination Indicators */}
      <div className="flex items-center justify-center gap-3 mt-10 sm:mt-12 px-[5%]">
        {items.map((_, dotIdx) => {
          const isCurrent = currentIndex === dotIdx;
          return (
            <button
              key={dotIdx}
              type="button"
              aria-label={`${dotAriaLabelPrefix} ${dotIdx + 1}`}
              onClick={() => handlePillClick(dotIdx)}
              className={cn(
                "relative h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none overflow-hidden",
                isCurrent
                  ? "w-14 sm:w-16 bg-[#E26D35]"
                  : "w-10 sm:w-12 bg-[#CBD5E1] hover:bg-slate-400"
              )}
            >
              {isCurrent && !isPaused && (
                <span className="absolute inset-0 bg-white/30 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}