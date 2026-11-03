"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [slideOffset, setSlideOffset] = useState<number>(0);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const totalCards = caseStudiesData.length; // 2
  const activePillIndex = currentIndex % totalCards; // 0 or 1

  // 4 items in DOM to enable seamless cyclic loop: [Card 1, Card 2, Card 1, Card 2]
  // - On Card 1 (idx 0): Card 2 peeks next
  // - On Card 2 (idx 1): Card 1 peeks next
  const loopCards = [
    caseStudiesData[0],
    caseStudiesData[1],
    caseStudiesData[0],
    caseStudiesData[1],
  ];

  // Dynamically calculate exact slide offset (card width + gap)
  useEffect(() => {
    const updateOffset = () => {
      if (firstCardRef.current) {
        const gap = window.innerWidth >= 640 ? 32 : 24;
        setSlideOffset(firstCardRef.current.offsetWidth + gap);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  // Seamless jump from index 2 back to 0 without animation
  const handleTransitionEnd = () => {
    if (currentIndex >= 2) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  // Re-enable smooth transitions on the next frame after an instant reset
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Auto-advance every 6 seconds, pausing on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePillClick = (targetIndex: number) => {
    setIsTransitioning(true);
    setCurrentIndex(targetIndex);
  };

  return (
    <section
      id="impacts"
      aria-label="Real World Impacts"
      className="relative w-full bg-white py-20 sm:py-24 lg:py-28 overflow-hidden"
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
              <span>REAL WORLD IMPACTS</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#142938] leading-[1.14] mb-6">
              Better people decisions.
              <span className="block">Measurable outcomes.</span>
            </h2>

            {/* Read More Studies Pill */}
            <div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F1F3F5] hover:bg-[#E5E9ED] text-[#142938] text-xs font-mono font-semibold tracking-wider uppercase transition-colors duration-200"
              >
                <span>READ MORE SUCCESS STUDIES</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Subtitle Description */}
          <div className="lg:max-w-md lg:pt-8">
            <p className="font-sans text-base sm:text-lg text-slate-500 leading-relaxed">
              Discover how organisations use workforce intelligence to identify
              risks earlier, improve performance visibility and make more timely
              decisions about their people.
            </p>
          </div>
        </div>
      </div>

      {/* Full-Bleed Carousel Track (Bleeds to the right edge with NO white gap) */}
      <div className="w-full overflow-hidden">
        <div
          onTransitionEnd={handleTransitionEnd}
          className={cn(
            "flex pl-[5%] gap-6 sm:gap-8",
            isTransitioning ? "transition-transform duration-600 ease-out" : ""
          )}
          style={{
            transform: `translateX(-${currentIndex * slideOffset}px)`,
          }}
        >
          {loopCards.map((study, idx) => {
            const isFirst = idx === 0;
            const isCardActive = idx === currentIndex;

            return (
              <div
                key={`${study.id}-${idx}`}
                ref={isFirst ? firstCardRef : undefined}
                onClick={() => {
                  if (!isCardActive) {
                    setIsTransitioning(true);
                    setCurrentIndex(idx);
                  }
                }}
                className={cn(
                  "relative shrink-0 rounded-[28px] sm:rounded-[30px] overflow-hidden border select-none cursor-pointer",
                  // Card width spans ~78-82vw so the adjacent card always peeks and bleeds out to the right edge
                  "w-[85vw] sm:w-[80vw] lg:w-[76vw]",
                  "h-[500px] sm:h-[540px] lg:h-[580px] flex items-stretch justify-end p-3 sm:p-4 lg:p-2",
                  isTransitioning ? "transition-all duration-300 ease-out" : "",
                  isCardActive
                    ? "border-slate-300/80 shadow-2xl shadow-slate-900/10"
                    : "border-slate-200/70 opacity-80 hover:opacity-100"
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
                        <span>READ THE FULL CASE STUDY</span>
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

      {/* Exactly 2 Bottom Pagination Indicators */}
      <div className="flex items-center justify-center gap-3 mt-10 sm:mt-12 px-[5%]">
        {caseStudiesData.map((_, dotIdx) => {
          const isCurrent = activePillIndex === dotIdx;
          return (
            <button
              key={dotIdx}
              type="button"
              aria-label={`Go to case study ${dotIdx + 1}`}
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
