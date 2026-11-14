"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurText from "@/reuseable/BlurText";

export interface SolutionCard {
  id: string;
  title: string;
  description: string;
  href: string;
  patternType:
  | "diagonal-ramp"
  | "pyramid-peak"
  | "growth-steps"
  | "enterprise-matrix"
  | "radial-pulse"
  | "beacon-orbit"
  | "network-grid"
  | "shield-balance";
}

// 8 total solution cards (2 pages of 4 cards each)
export const solutionsData: SolutionCard[] = [
  // Page 1 (Cards 1-4 matching uploaded design)
  {
    id: "manage-people",
    title: "Manage Your People",
    description:
      "Maintain employee information and organisational details to support performance management, goal alignment, and connected workflows.",
    href: "/solution-hub#manage-people",
    patternType: "diagonal-ramp",
  },
  {
    id: "strengthen-performance",
    title: "Strengthen Performance and Engagement",
    description:
      "Use performance reviews, regular check-ins, and performance summaries to understand progress, support meaningful conversations, and identify development needs.",
    href: "/solution-hub#strengthen-performance",
    patternType: "pyramid-peak",
  },
  {
    id: "align-goals",
    title: "Align Goals. Track Performance.",
    description:
      "Create and align OKRs, monitor progress through check-ins, manage performance reviews, and connect tasks with individual objectives to support organisational goals.",
    href: "/solution-hub#align-goals",
    patternType: "growth-steps",
  },
  {
    id: "performance-intelligence",
    title: "Performance Intelligence for Organisations",
    description:
      "Bring people, performance, and task management together in one platform to support goal alignment, performance visibility, and informed organisational decisions.",
    href: "/solution-hub#performance-intelligence",
    patternType: "enterprise-matrix",
  },

  // Page 2 (Cards 5-8)
  // {
  //   id: "culture-alignment",
  //   title: "Culture & Alignment",
  //   description:
  //     "Align distributed teams with core values, clear expectations, and continuous feedback loops that strengthen morale and organisational trust.",
  //   href: "/solution-hub#culture-alignment",
  //   patternType: "radial-pulse",
  // },
  // {
  //   id: "leadership-succession",
  //   title: "Leadership & Succession",
  //   description:
  //     "Identify emerging leaders early, map high-impact talent pipelines, and proactively prepare your teams for key strategic transitions.",
  //   href: "/solution-hub#leadership-succession",
  //   patternType: "beacon-orbit",
  // },
  // {
  //   id: "skills-capabilities",
  //   title: "Skills & Capabilities",
  //   description:
  //     "Track real-time capabilities across business units, pinpoint critical competency gaps, and fuel dynamic internal mobility.",
  //   href: "/solution-hub#skills-capabilities",
  //   patternType: "network-grid",
  // },
  // {
  //   id: "compliance-wellbeing",
  //   title: "Compliance & Wellbeing",
  //   description:
  //     "Safeguard your workforce with automated compliance visibility, early burnout indicators, and holistic employee wellbeing insights.",
  //   href: "/solution-hub#compliance-wellbeing",
  //   patternType: "shield-balance",
  // },
];

/* =========================================================================
   AUTHENTIC 10x10 DOT PATTERNS (Pixel-perfect to visual specification)
   0: Base Background Dot
   1: Soft Accent Dot (turns soft orange on hover)
   2: Vibrant Accent Dot (turns bright Claripa orange on hover)
   3: Core Contrast Dot (deep espresso-charcoal on hover, solid dark charcoal normally)
   ========================================================================= */
const PATTERN_MATRICES: Record<SolutionCard["patternType"], number[][]> = {
  // Card 1: "Manage Your People" - Ascending diagonal staircase
  "diagonal-ramp": [
    [0, 0, 0, 0, 0, 0, 1, 2, 3, 3],
    [0, 0, 0, 0, 0, 0, 1, 2, 3, 2],
    [0, 0, 0, 0, 0, 1, 2, 3, 3, 2],
    [0, 0, 0, 0, 0, 1, 2, 3, 2, 1],
    [0, 0, 0, 0, 1, 2, 3, 2, 1, 0],
    [0, 0, 0, 1, 2, 3, 2, 1, 0, 0],
    [0, 0, 1, 2, 3, 2, 1, 0, 0, 0],
    [0, 1, 2, 3, 2, 1, 0, 0, 0, 0],
    [1, 2, 3, 2, 1, 0, 0, 0, 0, 0],
    [3, 3, 2, 1, 0, 0, 0, 0, 0, 0],
  ],

  // Card 2: "Strengthen Performance and Engagement" - Centered pyramid peak
  "pyramid-peak": [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 1, 3, 3, 1, 0, 0, 0],
    [0, 0, 1, 2, 3, 3, 2, 1, 0, 0],
    [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
    [1, 2, 3, 3, 3, 3, 3, 3, 2, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],

  // Card 3: "Align Goals. Track Performance" - Dynamic task momentum & activity matrix
  "growth-steps": [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 1, 3, 1, 2, 3, 1, 1, 0, 1],
    [1, 3, 3, 1, 3, 2, 1, 3, 1, 2],
    [3, 0, 1, 3, 1, 0, 3, 2, 1, 1],
    [3, 3, 1, 3, 3, 1, 3, 3, 2, 1],
    [2, 3, 3, 1, 3, 3, 1, 3, 3, 2],
    [1, 2, 1, 3, 2, 0, 1, 3, 2, 1],
    [1, 1, 0, 1, 2, 3, 1, 1, 1, 0],
  ],

  // Card 4: "Performance Intelligence for Organisations" - Scaled organizational intelligence arch
  "enterprise-matrix": [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 1, 3, 3, 1, 0, 0, 0],
    [0, 0, 1, 2, 3, 3, 2, 1, 0, 0],
    [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
    [1, 2, 3, 3, 3, 3, 3, 3, 2, 1],
    [2, 3, 3, 3, 3, 3, 3, 3, 3, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],

  // Page 2 - Card 5: Culture & Alignment (Radial pulse)
  "radial-pulse": [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 2, 1, 0, 0, 0],
    [0, 0, 2, 3, 0, 0, 3, 2, 0, 0],
    [0, 1, 3, 0, 2, 2, 0, 3, 1, 0],
    [0, 2, 0, 2, 3, 3, 2, 0, 2, 0],
    [0, 2, 0, 2, 3, 3, 2, 0, 2, 0],
    [0, 1, 3, 0, 2, 2, 0, 3, 1, 0],
    [0, 0, 2, 3, 0, 0, 3, 2, 0, 0],
    [0, 0, 0, 1, 2, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  // Page 2 - Card 6: Leadership & Succession (Beacon orbit)
  "beacon-orbit": [
    [0, 0, 0, 0, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 2, 3, 3, 2, 0, 0, 0],
    [0, 0, 1, 3, 3, 3, 3, 1, 0, 0],
    [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
    [1, 2, 3, 3, 1, 1, 3, 3, 2, 1],
    [2, 3, 3, 1, 0, 0, 1, 3, 3, 2],
    [3, 3, 2, 0, 0, 0, 0, 2, 3, 3],
    [3, 2, 1, 0, 0, 0, 0, 1, 2, 3],
    [3, 3, 2, 1, 0, 0, 1, 2, 3, 3],
    [3, 3, 3, 2, 1, 1, 2, 3, 3, 3],
  ],

  // Page 2 - Card 7: Skills & Capabilities (Interconnected network matrix)
  "network-grid": [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 2, 1, 0, 0, 1, 2, 3, 0],
    [0, 2, 3, 2, 1, 1, 2, 3, 2, 0],
    [0, 1, 2, 3, 2, 2, 3, 2, 1, 0],
    [0, 0, 1, 2, 3, 3, 2, 1, 0, 0],
    [0, 0, 1, 2, 3, 3, 2, 1, 0, 0],
    [0, 1, 2, 3, 2, 2, 3, 2, 1, 0],
    [0, 2, 3, 2, 1, 1, 2, 3, 2, 0],
    [0, 3, 2, 1, 0, 0, 1, 2, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  // Page 2 - Card 8: Compliance & Wellbeing (Shield / balance)
  "shield-balance": [
    [0, 0, 1, 2, 3, 3, 2, 1, 0, 0],
    [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
    [1, 2, 3, 3, 3, 3, 3, 3, 2, 1],
    [2, 3, 3, 3, 3, 3, 3, 3, 3, 2],
    [2, 3, 3, 3, 3, 3, 3, 3, 3, 2],
    [1, 2, 3, 3, 3, 3, 3, 3, 2, 1],
    [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
    [0, 0, 1, 2, 3, 3, 2, 1, 0, 0],
    [0, 0, 0, 1, 2, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ],
};

/* =========================================================================
   DOT MATRIX COMPONENT (10x10 SVG Grid with Authentic Visual Patterns)
   ========================================================================= */
interface DotMatrixProps {
  patternType: SolutionCard["patternType"];
  isActive: boolean;
}

function DotMatrix({ patternType, isActive }: DotMatrixProps) {
  const matrix = PATTERN_MATRICES[patternType] || PATTERN_MATRICES["diagonal-ramp"];

  // Colors: On hover, pattern lights up with vibrant Claripa orange dots & rich contrast
  // When idle, shows clean crisp slate & dark charcoal dots
  const colorMap = isActive
    ? {
        0: "#FDE6D2", // Level 0: soft warm peach base dots
        1: "#FDBA74", // Level 1: warm glowing light orange
        2: "#F06A25", // Level 2: vibrant Claripa orange dots
        3: "#3D1C0A", // Level 3: deep espresso-charcoal contrast dots
      }
    : {
        0: "#A2B1C2", // Level 0: crisp light slate-gray base dots
        1: "#6B7C90", // Level 1: soft slate
        2: "#475569", // Level 2: medium slate
        3: "#0F172A", // Level 3: deep dark charcoal pattern dots
      };

  return (
    <div className="w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] xl:w-[155px] xl:h-[155px] shrink-0 select-none">
      <svg
        viewBox="0 0 144 144"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {matrix.map((row, r) =>
          row.map((val, c) => {
            const cx = 9 + c * 14;
            const cy = 9 + r * 14;
            const isBase = val === 0;
            const fill = colorMap[val as 0 | 1 | 2 | 3] || colorMap[0];

            return (
              <circle
                key={`${r}-${c}`}
                cx={cx}
                cy={cy}
                r={isBase ? 3.1 : 3.5}
                fill={fill}
                className="transition-colors duration-300 ease-out"
                style={{
                  opacity: isBase ? (isActive ? 0.9 : 0.72) : 1,
                }}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

/* =========================================================================
   MAIN COMPONENT: BuiltFor (8 Cards with Auto-Rotation & Pagination)
   ========================================================================= */
export default function BuildFor() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeCardId, setActiveCardId] = useState<string>("manage-people");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Mobile slider state
  const mobileSliderRef = useRef<HTMLDivElement>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const [isMobilePaused, setIsMobilePaused] = useState<boolean>(false);

  const CARDS_PER_PAGE = 4;
  const totalPages = Math.ceil(solutionsData.length / CARDS_PER_PAGE); // 2 pages

  // Slice visible cards for the active page (Desktop / Tablet)
  const visibleCards = solutionsData.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  );

  // Switch page with smooth transition (Desktop / Tablet)
  const switchPage = useCallback((nextPage: number) => {
    setCurrentPage((curr) => {
      if (nextPage === curr) return curr;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(nextPage);
        setActiveCardId(solutionsData[nextPage * CARDS_PER_PAGE].id);
        setIsAnimating(false);
      }, 220);
      return curr;
    });
  }, [CARDS_PER_PAGE]);

  // Desktop / Tablet auto-change timer: changes page every 5.5 seconds (pauses on user hover)
  useEffect(() => {
    if (isPaused || totalPages <= 1) return;

    const interval = setInterval(() => {
      switchPage((currentPage + 1) % totalPages);
    }, 5500);

    return () => clearInterval(interval);
  }, [currentPage, isPaused, totalPages, switchPage]);

  // Mobile auto-slide timer (cycles through cards every 4.5 seconds, pauses on touch/drag)
  useEffect(() => {
    if (isMobilePaused) return;

    const interval = setInterval(() => {
      setMobileActiveIndex((prev) => {
        const next = (prev + 1) % solutionsData.length;
        if (mobileSliderRef.current) {
          const slide = mobileSliderRef.current.children[next] as HTMLElement | undefined;
          if (slide) {
            slide.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          }
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isMobilePaused]);

  // Track swipe/scroll position on mobile to update active dot
  const handleMobileScroll = useCallback(() => {
    if (!mobileSliderRef.current) return;
    const { scrollLeft, clientWidth } = mobileSliderRef.current;
    const cardEl = mobileSliderRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = cardEl ? cardEl.offsetWidth + 16 : clientWidth * 0.88;
    const currentSlide = Math.round(scrollLeft / cardWidth);
    setMobileActiveIndex(Math.min(Math.max(currentSlide, 0), solutionsData.length - 1));
  }, []);

  const goToMobileSlide = (idx: number) => {
    setMobileActiveIndex(idx);
    if (mobileSliderRef.current) {
      const slide = mobileSliderRef.current.children[idx] as HTMLElement | undefined;
      if (slide) {
        slide.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  return (
    <section
      id="solutions"
      aria-label="Built for how your organisation works"
      className="relative w-full bg-white py-20 sm:py-24 lg:py-28 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="px-[5%] md:px-[6%] xl:px-[10%]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center  mb-14 sm:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-base font-semibold tracking-tight font-geist-mono text-[#E26D35] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E26D35]" />
            <span>SOLUTIONS</span>
          </div>

          {/* Headline */}
          <BlurText
            as="h2"
            delay={20}
            text={"Built for How Your\nOrganisation Works"}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-sora lg:text-[46px] font-medium tracking-tight text-[#254F5F] leading-[1.1] mb-5"
          />

          {/* Subtitle */}
          <BlurText
            as="p"
            delay={20}
            text="Claripa connects people management, performance, and task workflows to help organisations align goals, track progress, understand performance, and make informed people decisions."
            className="font-sans text-base sm:text-lg text-slate-500 leading-[1.3] max-w-4xl"
          />
        </div>

        {/* Mobile Slider View (Auto-changing slider matching visual specification) */}
        <div className="block md:hidden">
          <div
            ref={mobileSliderRef}
            onScroll={handleMobileScroll}
            onTouchStart={() => setIsMobilePaused(true)}
            onTouchEnd={() => {
              setTimeout(() => setIsMobilePaused(false), 2000);
            }}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-2 -mx-[5%] px-[5%]"
          >
            {solutionsData.map((card, idx) => {
              const isSlideActive = mobileActiveIndex === idx;

              return (
                <div
                  key={card.id}
                  className={cn(
                    "shrink-0 w-full  snap-center rounded-[32px] p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-500 border",
                    isSlideActive
                      ? "bg-[#FFF6F0] border-[#FED7AA]/90 shadow-lg shadow-orange-500/5 ring-1 ring-orange-200/60"
                      : "bg-[#FFF9F5] border-[#FED7AA]/50"
                  )}
                >
                  {/* Dot Matrix Graphic (Centered at top) */}
                  <div className="flex items-center justify-center mb-5 mt-2">
                    <DotMatrix patternType={card.patternType} isActive={true} />
                  </div>

                  {/* Title (Centered, Orange) */}
                  <h3 className="font-heading text-base font-semibold text-[#E26D35] tracking-tight leading-[1.2] mb-3">
                    {card.title}
                  </h3>

                  {/* Description (Centered, Slate/Zinc) */}
                  <p className="font-sans text-xs sm:text-sm text-slate-600 leading-[1.2]">
                    {card.description}
                  </p>

                  {/* Action Link (Centered) */}
                  <div className="mt-auto">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-1.5 text-xs mt-1 font-mono font-semibold tracking-wider uppercase text-zinc-800 hover:text-[#E26D35] transition-colors"
                    >
                      <span>SEE HOW IT WORKS</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Pagination Indicators (4 Pills) */}
          <div className="flex items-center justify-center gap-2 mt-6" aria-hidden="true">
            {solutionsData.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                onClick={() => goToMobileSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  mobileActiveIndex === idx
                    ? "w-8 bg-[#F06A25]"
                    : "w-6 bg-[#CBD3D7] hover:bg-zinc-400"
                )}
              />
            ))}
          </div>
        </div>

        {/* 2x2 Grid of Solution Cards for Tablet & Desktop (with Smooth Crossfade on Page Change) */}
        <div
          className={cn(
            "hidden md:grid md:grid-cols-2 gap-5 lg:gap-7 transition-all duration-300 ease-out",
            isAnimating
              ? "opacity-0 translate-y-2 scale-[0.99]"
              : "opacity-100 translate-y-0 scale-100"
          )}
        >
          {visibleCards.map((card) => {
            const isActive = activeCardId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setActiveCardId(card.id)}
                onMouseEnter={() => setActiveCardId(card.id)}
                className={cn(
                  "group relative rounded-3xl p-6 lg:p-8 xl:p-10 flex flex-col justify-between items-center lg:items-stretch cursor-pointer transition-all duration-300 ease-out border",
                  isActive
                    ? "bg-[#FFF6F0] border-[#FED7AA]/90 shadow-xl shadow-orange-500/5 ring-1 ring-orange-200/60"
                    : "bg-[#F8F8F6] border-[#ECECE8] hover:border-zinc-300/80 hover:bg-[#F5F5F2]"
                )}
              >
                {/* Content Row: Stacked on tablet (md), Row on desktop (lg/xl) */}
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-5 lg:gap-6 xl:gap-8 mb-6 lg:mb-8 xl:mb-10 w-full">
                  {/* Left Column: Title & Description */}
                  <div className="flex-1 text-center lg:text-left w-full">
                    <h3
                      className={cn(
                        "font-heading text-lg sm:text-xl lg:text-[22px] xl:text-[26px] font-medium tracking-tight leading-[1.2] mb-2 sm:mb-3 transition-colors duration-200",
                        isActive ? "text-[#E26D35]" : "text-[#142938]"
                      )}
                    >
                      <BlurText delay={20} text={card.title} />
                    </h3>
                    <BlurText
                      as="p"
                      delay={20}
                      text={card.description}
                      className="text-xs sm:text-sm xl:text-base text-slate-600 leading-[1.4] xl:leading-[1.3] font-sora w-full lg:max-w-md mx-auto lg:mx-0"
                    />
                  </div>

                  {/* Right Column: Dot Matrix Graphic */}
                  <div className="shrink-0">
                    <DotMatrix patternType={card.patternType} isActive={isActive} />
                  </div>
                </div>

                {/* Footer Action: SEE HOW IT WORKS */}
                <div className="w-full flex justify-center lg:justify-start">
                  <Link
                    href={card.href}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-[10px] md:text-xs font-mono font-semibold tracking-tight uppercase transition-colors duration-200",
                      isActive
                        ? "text-zinc-900 group-hover:text-[#E26D35]"
                        : "text-zinc-700 group-hover:text-zinc-900"
                    )}
                  >
                    <span>SEE HOW IT WORKS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination / Auto-Change Indicators (Desktop / Tablet) */}
        {totalPages > 1 && (
          <div className="hidden md:flex items-center justify-center gap-3 mt-10 sm:mt-12">
            {Array.from({ length: totalPages }).map((_, pageIdx) => {
              const isCurrent = currentPage === pageIdx;
              return (
                <button
                  key={pageIdx}
                  type="button"
                  aria-label={`View page ${pageIdx + 1} of solutions`}
                  onClick={() => switchPage(pageIdx)}
                  className={cn(
                    "relative h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none overflow-hidden",
                    isCurrent
                      ? "w-14 sm:w-16 bg-[#E26D35]"
                      : "w-10 sm:w-12 bg-[#CBD5E1] hover:bg-slate-400"
                  )}
                >
                  {/* Visual pulse/progress indicator when active and not paused */}
                  {isCurrent && !isPaused && (
                    <span className="absolute inset-0 bg-white/30 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
