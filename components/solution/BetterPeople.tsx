"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurText from "@/reuseable/BlurText";

export interface CaseStudyItem {
  id: string;
  category: string;
  title: string;
  href: string;
  imageSrc: string;
  stats: {
    value: string;
    label: string;
    highlighted?: boolean;
  }[];
}

// Exactly 2 case studies as specified
export const caseStudiesData: CaseStudyItem[] = [
  {
    id: "semiconductor-engineering",
    category: "SEMICONDUCTOR ENGINEERING",
    title: "How a Semiconductor Design \nCenter Accelerated Engineering Ramp-Up",
    href: "/case-studies/semiconductor-design-center",
    imageSrc: "/real-world-impact-1.jpg",
    stats: [
      {
        value: "28%",
        label: "Reduction in first-six-month attrition",
        highlighted: false,
      },
      {
        value: "40%",
        label: "Reduction in time to meaningful contribution",
        highlighted: true,
      },
    ],
  },
  {
    id: "enterprise-technology",
    category: "ENTERPRISE TECHNOLOGY",
    title:
      "How a Global Software Enterprise Retained Critical Engineering Talent Across 14 Hubs",
    href: "/case-studies/enterprise-technology-retention",
    imageSrc: "/real-world-impact-2.jpg",
    stats: [
      {
        value: "34%",
        label: "Increase in leadership bench depth",
        highlighted: false,
      },
      {
        value: "55%",
        label: "Reduction in unprompted key-talent flight risk",
        highlighted: true,
      },
    ],
  },
];

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
        const gap = desktop
          ? 28
          : window.innerWidth >= 640
          ? 32
          : 24;
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
      {/* Centered Header Section */}
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

        {/* Desktop CTA Pill (Hidden on Mobile & Tablet, placed at bottom on mobile/tablet like Casestudycarosal) */}
        <Link
          href="/case-studies"
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
                  "relative shrink-0 rounded-[28px] sm:rounded-[30px] lg:rounded-[24px] overflow-hidden border select-none cursor-pointer",
                  // Mobile / Tab: w-[85vw] / w-[80vw], height matches Casestudycarosal (h-[560px] sm:h-[580px])
                  // Desktop: w-[76vw] h-[520px] untouched
                  "w-[85vw] sm:w-[80vw] lg:w-[76vw]",
                  "h-[560px] sm:h-[580px] lg:h-[520px] flex flex-col md:flex-row lg:flex-row justify-end items-stretch md:items-end lg:items-stretch p-3 sm:p-4 lg:p-3",
                  "transition-all duration-300 ease-out",
                  isCardActive
                    ? "border-slate-300/80 lg:border-[#E3DDD5] shadow-2xl lg:shadow-[0_14px_40px_rgba(0,30,45,0.08)] opacity-100"
                    : "border-slate-200/70 lg:border-[#E8E4DD] opacity-75 lg:opacity-80 hover:opacity-95 lg:hover:opacity-100"
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

                {/* Inset White Content Card - Auto height on mobile/tablet to prevent cutting off */}
                <div className="relative z-10 bg-[#FAFAFA]/95 backdrop-blur-sm sm:bg-[#F9F9F7] lg:bg-[#FAF9F7] rounded-[24px] sm:rounded-[28px] lg:rounded-[20px] p-5 sm:p-8 lg:p-9 shadow-xl lg:shadow-sm border border-neutral-100/90 lg:border-[#F0ECE6] w-full sm:w-[480px] lg:w-[460px] h-auto md:h-full lg:h-full flex flex-col justify-between">
                  <div>
                    {/* Category */}
                    <div className="text-[10px] sm:text-xs lg:text-[10.5px] font-mono font-semibold lg:font-medium tracking-wider lg:tracking-[0.06em] text-slate-400 lg:text-[#78888F] uppercase mb-2 sm:mb-3 lg:mb-0">
                      {study.category}
                    </div>

                    {/* Title */}
                    <BlurText
                      as="h3"
                      delay={20}
                      text={study.title}
                      className="text-base sm:text-2xl lg:text-xl font-bold lg:font-semibold tracking-tight lg:tracking-[-0.02em] text-[#142938] lg:text-[#0F313F] font-sora leading-snug lg:leading-[1.28] mb-2 md:mb-4 lg:mb-4"
                    />

                    {/* CTA Link */}
                    <div className="mb-3 sm:mb-6 lg:mb-0">
                      <Link
                        href={study.href}
                        onClick={(e) => e.stopPropagation()}
                        className="group inline-flex items-center gap-1.5 text-[10px] md:text-base font-mono font-semibold lg:font-medium tracking-tight text-[#254F5F] hover:text-[#F06A25] uppercase transition-colors duration-200"
                      >
                        <span>READ THE FULL CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 pt-3 sm:pt-6 lg:pt-5 border-t border-slate-200/70 lg:border-t-0">
                    {study.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="flex flex-col">
                        <span
                          className={cn(
                            "text-[26px] sm:text-[42px] font-geist font-bold lg:font-sora lg:font-normal tracking-tight leading-none mb-1",
                            stat.highlighted
                              ? "text-[#F8720C] lg:text-[#F06A25]"
                              : "text-[#62737A]"
                          )}
                        >
                          {stat.value}
                        </span>
                        <span className="text-[10px] md:text-sm lg:text-[11.5px] font-sora text-[#62737A] leading-[1.2] lg:leading-[1.35]">
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

      {/* Bottom Pagination Indicators matching Casestudycarosal */}
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
                // Mobile & Tablet: h-1.5 animated pulse pills
                // Desktop: h-[3.5px] untouched
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

      {/* Bottom CTA Button (Mobile & Tablet only, matching Casestudycarosal) */}
      <div className="flex items-center justify-center mt-7 sm:mt-8 px-[5%] lg:hidden">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[#F4F4F4] hover:bg-[#E5E9ED] text-[#254F5F] text-xs font-mono font-semibold tracking-wider uppercase transition-colors duration-200 shadow-2xs border border-zinc-200/60"
        >
          <span>READ MORE SUCCESS STUDIES</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
