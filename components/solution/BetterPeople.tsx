"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurText from "@/reuseable/BlurText";
import { allCaseStudies } from "@/data/caseStudies";

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

// Domain categories and dual metrics mapped from each case study in data/caseStudies.ts
const caseStudyMetricsMap: Record<
  string,
  {
    category: string;
    stats: CaseStudyStat[];
  }
> = {
  "software-services-firm-attrition-transformation": {
    category: "SOFTWARE SERVICES",
    stats: [
      {
        value: "34%",
        label: "Reduction in voluntary attrition across 3–5 yr cohort",
        highlighted: true,
      },
      {
        value: "< 3 wks",
        label: "Average time between meaningful performance check-ins",
        highlighted: false,
      },
    ],
  },
  "semiconductor-design-center-engineering-ramp-up": {
    category: "SEMICONDUCTOR ENGINEERING",
    stats: [
      {
        value: "40%",
        label: "Faster time to meaningful engineering contribution",
        highlighted: true,
      },
      {
        value: "28%",
        label: "Reduction in first-six-month new-hire attrition",
        highlighted: false,
      },
    ],
  },
  "automotive-gcc-india-performance-visibility": {
    category: "AUTOMOTIVE GCC",
    stats: [
      {
        value: "25–30%",
        label: "Improvement in cross-team goal alignment",
        highlighted: true,
      },
      {
        value: "2×",
        label: "Increase in frequency of meaningful performance conversations",
        highlighted: false,
      },
    ],
  },
};

// Generated dynamically from allCaseStudies dataset
export const caseStudiesData: CaseStudyItem[] = allCaseStudies.map((study) => {
  const metrics = caseStudyMetricsMap[study.slug] || {
    category: study.topic ? `${study.topic} · CASE STUDY` : study.category,
    stats: [
      {
        value: study.statsHighlight?.value || "—",
        label: study.statsHighlight?.label || "Measurable business outcome",
        highlighted: true,
      },
      {
        value: "100%",
        label: "Visibility into team performance signals",
        highlighted: false,
      },
    ],
  };

  return {
    id: study.id,
    category: metrics.category,
    title: study.title,
    href: `/insight/${study.slug}`,
    imageSrc: study.image,
    stats: metrics.stats,
  };
});

export default function BetterPeople() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [maxOffset, setMaxOffset] = useState<number>(0);
  const [stepWidth, setStepWidth] = useState<number>(0);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const lastIndex = caseStudiesData.length - 1;

  // Dynamically calculate exact slide offset for the peeking card track
  useEffect(() => {
    const updateOffset = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      if (firstCardRef.current) {
        const cardWidth = firstCardRef.current.offsetWidth;
        const gap = desktop ? 28 : window.innerWidth >= 640 ? 32 : 24;
        const leftPadding = window.innerWidth * 0.05;
        const rightPadding = window.innerWidth * 0.05;
        const totalContentWidth =
          leftPadding +
          cardWidth * caseStudiesData.length +
          gap * (caseStudiesData.length - 1);
        const calculatedOffset = Math.max(
          0,
          totalContentWidth - (window.innerWidth - rightPadding)
        );
        setMaxOffset(calculatedOffset);
        setStepWidth(cardWidth + gap);
      }
    };

    updateOffset();

    const ro = new ResizeObserver(updateOffset);
    if (firstCardRef.current) {
      ro.observe(firstCardRef.current);
    }

    window.addEventListener("resize", updateOffset);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  // Auto-advance every 6 seconds, pausing on hover
  useEffect(() => {
    if (isPaused || caseStudiesData.length < 2) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= lastIndex ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, lastIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 35) {
      setCurrentIndex((prev) => Math.min(prev + 1, lastIndex));
    } else if (diff < -35) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    touchStartXRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartXRef.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.clientX;
    if (diff > 35) {
      setCurrentIndex((prev) => Math.min(prev + 1, lastIndex));
    } else if (diff < -35) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    touchStartXRef.current = null;
  };

  // On mobile and tablet, each card slides directly to the left focus guide-line (5%)
  // On desktop, keep original maxOffset clamping so desktop remains 100% untouched
  const translateX = isDesktop
    ? Math.min(currentIndex * stepWidth, maxOffset)
    : currentIndex * stepWidth;

  return (
    <section
      id="impacts"
      aria-label="Real World Impacts"
      className="relative w-full bg-[#F7F6F3] py-16 sm:py-20 lg:py-24 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Centered Header Section (Untouched original design) */}
      <div className="px-[5%] mb-8 sm:mb-10 lg:mb-12 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center justify-center gap-2 text-[11px] sm:text-base font-geist-mono font-medium tracking-tight text-[#F06A25] uppercase mb-3.5">
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-1.5 rounded-full bg-[#F06A25] shadow-[0_0_8px_2px_rgba(240,106,37,0.45)]"
          />
          <span>REAL WORLD IMPACTS</span>
        </div>

        {/* Headline */}
        <BlurText
          as="h2"
          delay={20}
          text={"Better people decisions.\nMeasurable outcomes."}
          className="font-sora text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-[-0.03em] text-[#254F5F] leading-[1.14] mb-0 lg:mb-6"
        />

        {/* Desktop CTA Pill (Hidden on Mobile & Tablet) */}
        <Link
          href="/insight"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#ECE8E2] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#F06A25]/40 text-[#142938] text-base font-mono font-medium tracking-[0.04em] uppercase transition-all duration-200 hover:-translate-y-0.5"
        >
          <span>READ MORE SUCCESS STUDIES</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#62737A]" />
        </Link>
      </div>

      {/* Card Carousel Track */}
      <div
        className="w-full overflow-hidden touch-pan-y select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className="flex pl-[5%] gap-6 sm:gap-8 lg:gap-7 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {caseStudiesData.map((study, idx) => {
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
                  "h-[560px] sm:h-[580px] lg:h-[65dvh] flex flex-col md:flex-row justify-end items-stretch md:items-end p-3 sm:p-4 lg:p-3",
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

                {/* Inset White Content Card - Auto height on mobile to prevent clipping */}
                <div className="relative z-10 bg-[#FAFAFA]/95 backdrop-blur-sm sm:bg-[#F9F9F7] rounded-[24px] sm:rounded-[28px] p-5 sm:p-8 lg:p-10 shadow-xl border border-neutral-100/90 w-full sm:w-[480px] lg:w-[530px] h-auto md:h-full flex flex-col justify-between">
                  <div>
                    {/* Category */}
                    <div className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-2 sm:mb-3">
                      {study.category}
                    </div>
                  </div>
                  <div>
                    {/* Title */}
                    <BlurText
                      as="h3"
                      delay={20}
                      text={study.title}
                      className="text-base sm:text-2xl font-bold tracking-tight text-[#142938] font-sora leading-snug mb-2 md:mb-4"
                    />

                    {/* CTA Link */}
                    <div className="mb-3 sm:mb-6">
                      <Link
                        href={study.href}
                        onClick={(e) => e.stopPropagation()}
                        className="group inline-flex items-center gap-1.5 text-[10px] md:text-base font-mono font-semibold tracking-tight text-[#254F5F] hover:text-[#E26D35] uppercase transition-colors duration-200"
                      >
                        <span>READ THE FULL CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-6 border-t border-slate-200/70">
                    {study.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="flex flex-col">
                        <span
                          className={cn(
                            "text-[26px] sm:text-[42px] font-geist font-medium tracking-tight leading-none mb-1",
                            stat.highlighted
                              ? "text-[#F8720C]"
                              : "text-[#62737A]"
                          )}
                        >
                          {stat.value}
                        </span>
                        <span className="text-[10px] md:text-sm font-sora font-semibold text-[#62737A] leading-[1.2]">
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
      <div className="flex items-center justify-center gap-3 lg:gap-2.5 mt-6 sm:mt-8 lg:mt-7 px-[5%]">
        {caseStudiesData.map((_, dotIdx) => {
          const isCurrent = currentIndex === dotIdx;
          return (
            <button
              key={dotIdx}
              type="button"
              aria-label={`Go to case study ${dotIdx + 1}`}
              onClick={() => setCurrentIndex(dotIdx)}
              className={cn(
                "relative rounded-full transition-all duration-300 cursor-pointer focus:outline-none overflow-hidden",
                "h-1.5 lg:h-[3.5px]",
                isCurrent
                  ? "w-14 sm:w-16 lg:w-14 bg-[#E26D35] lg:bg-[#F06A25]"
                  : "w-10 sm:w-12 lg:w-14 bg-[#CBD5E1] lg:bg-[#CBD2D6] hover:bg-slate-400 lg:hover:bg-[#AEB8BD]"
              )}
            >
              {isCurrent && !isPaused && (
                <span className="absolute inset-0 bg-white/30 animate-pulse lg:hidden" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom CTA Button (Mobile & Tablet only) */}
      <div className="flex items-center justify-center mt-7 sm:mt-8 px-[5%] lg:hidden">
        <Link
          href="/insight"
          className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[#F4F4F4] hover:bg-[#E5E9ED] text-[#254F5F] text-xs font-mono font-semibold tracking-wider uppercase transition-colors duration-200 shadow-2xs border border-zinc-200/60"
        >
          <span>READ MORE SUCCESS STUDIES</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
