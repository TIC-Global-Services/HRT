"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  // Page 1 (Cards 1-4)
  {
    id: "hire-onboard",
    title: "Hire & Onboard",
    description:
      "Start every employee journey with deeper insights, smarter decisions, and a clearer understanding of the people who drive your organisation forward.",
    href: "/solution-hub#hire-onboard",
    patternType: "diagonal-ramp",
  },
  {
    id: "engage-retain",
    title: "Engage & Retain",
    description:
      "Spot early signs of disengagement, understand employee needs, and take proactive steps to improve satisfaction and retain valuable talent.",
    href: "/solution-hub#engage-retain",
    patternType: "pyramid-peak",
  },
  {
    id: "perform-grow",
    title: "Perform & Grow",
    description:
      "Turn performance data into actionable insights, uncover opportunities, and help employees strengthen their skills and achieve their goals.",
    href: "/solution-hub#perform-grow",
    patternType: "growth-steps",
  },
  {
    id: "enterprises",
    title: "For Enterprises",
    description:
      "Scale workforce intelligence across your organisation with connected data, actionable insights, and smarter people decisions.",
    href: "/solution-hub#enterprises",
    patternType: "enterprise-matrix",
  },

  // Page 2 (Cards 5-8)
  {
    id: "culture-alignment",
    title: "Culture & Alignment",
    description:
      "Align distributed teams with core values, clear expectations, and continuous feedback loops that strengthen morale and organisational trust.",
    href: "/solution-hub#culture-alignment",
    patternType: "radial-pulse",
  },
  {
    id: "leadership-succession",
    title: "Leadership & Succession",
    description:
      "Identify emerging leaders early, map high-impact talent pipelines, and proactively prepare your teams for key strategic transitions.",
    href: "/solution-hub#leadership-succession",
    patternType: "beacon-orbit",
  },
  {
    id: "skills-capabilities",
    title: "Skills & Capabilities",
    description:
      "Track real-time capabilities across business units, pinpoint critical competency gaps, and fuel dynamic internal mobility.",
    href: "/solution-hub#skills-capabilities",
    patternType: "network-grid",
  },
  {
    id: "compliance-wellbeing",
    title: "Compliance & Wellbeing",
    description:
      "Safeguard your workforce with automated compliance visibility, early burnout indicators, and holistic employee wellbeing insights.",
    href: "/solution-hub#compliance-wellbeing",
    patternType: "shield-balance",
  },
];

/* =========================================================================
   DOT MATRIX COMPONENT (10x10 SVG Grid with Authentic Visual Patterns)
   ========================================================================= */
interface DotMatrixProps {
  patternType: SolutionCard["patternType"];
  isActive: boolean;
}

function DotMatrix({ patternType, isActive }: DotMatrixProps) {
  const rows = 10;
  const cols = 10;

  const getDotState = (r: number, c: number): "base" | "accent" | "dark" => {
    switch (patternType) {
      case "diagonal-ramp": {
        // Upward diagonal staircase progression from bottom-left to top-right
        const targetCol = 9 - r;
        const diff = c - targetCol;
        if (diff === 0 || diff === 1) return "dark";
        if (diff === -1 || diff === -2) return "accent";
        return "base";
      }

      case "pyramid-peak": {
        // Centered pyramid / peak
        if (r < 3) return "base";
        const halfWidth = (r - 2) * 0.75;
        const center = 4.5;
        const dist = Math.abs(c - center);
        if (dist <= halfWidth) {
          return "dark";
        }
        return "base";
      }

      case "growth-steps": {
        // Ascending step / bar growth distribution
        const minRowForCol: Record<number, number> = {
          0: 9,
          1: 9,
          2: 8,
          3: 7,
          4: 7,
          5: 6,
          6: 5,
          7: 4,
          8: 4,
          9: 2,
        };
        const minRow = minRowForCol[c] ?? 10;
        if (r >= minRow) {
          return "dark";
        }
        return "base";
      }

      case "enterprise-matrix": {
        // Centered enterprise network / organizational diamond
        if (r < 3) return "base";
        if (r >= 7) return "dark";
        const diff = Math.abs(c - 4.5);
        if (diff <= r - 2.5) {
          return "dark";
        }
        return "base";
      }

      case "radial-pulse": {
        // Concentric pulse / culture radar
        const dist = Math.sqrt(Math.pow(r - 4.5, 2) + Math.pow(c - 4.5, 2));
        if (dist <= 1.2) return "dark";
        if (dist >= 2.2 && dist <= 3.8) return "dark";
        if (dist >= 4.2 && dist <= 4.8) return "accent";
        return "base";
      }

      case "beacon-orbit": {
        // Leadership beacon / radiating pinnacle
        if (r === 1 && (c === 4 || c === 5)) return "accent";
        if (r >= 2 && r <= 8) {
          const spread = (r - 1) * 0.55;
          if (Math.abs(c - 4.5) <= spread) {
            return (r + c) % 2 === 0 ? "dark" : "accent";
          }
        }
        if (r >= 8) return "dark";
        return "base";
      }

      case "network-grid": {
        // Interconnected competency node matrix
        const isHub =
          (r === 2 && c === 2) ||
          (r === 2 && c === 7) ||
          (r === 7 && c === 2) ||
          (r === 7 && c === 7) ||
          (r === 4 && c === 4) ||
          (r === 5 && c === 5);
        if (isHub) return "dark";
        if (r === c || r + c === 9 || r === 4 || c === 5) return "accent";
        return "base";
      }

      case "shield-balance": {
        // Protective wellbeing shield
        if (r < 2) return "base";
        if (r >= 2 && r <= 6) {
          if (c >= 2 && c <= 7) return "dark";
        }
        if (r > 6 && r <= 9) {
          const inset = r - 6;
          if (c >= 2 + inset && c <= 7 - inset) return "dark";
        }
        return "base";
      }
    }
  };

  const colors = isActive
    ? {
      base: "#FDE6D2",
      accent: "#E26D35",
      dark: "#142938",
    }
    : {
      base: "#CBD5E1",
      accent: "#1E293B",
      dark: "#0F172A",
    };

  return (
    <div className="w-[140px] h-[140px] sm:w-[155px] sm:h-[155px] shrink-0 select-none">
      <svg
        viewBox="0 0 144 144"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const state = getDotState(r, c);
            const cx = 9 + c * 14;
            const cy = 9 + r * 14;
            const isHighlighted = state !== "base";
            const fill = colors[state];

            return (
              <circle
                key={`${r}-${c}`}
                cx={cx}
                cy={cy}
                r={isHighlighted ? 3.6 : 3}
                fill={fill}
                className="transition-all duration-300 ease-out"
                style={{
                  opacity: state === "base" ? (isActive ? 0.9 : 0.65) : 1,
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
  const [activeCardId, setActiveCardId] = useState<string>("hire-onboard");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const CARDS_PER_PAGE = 4;
  const totalPages = Math.ceil(solutionsData.length / CARDS_PER_PAGE); // 2 pages

  // Slice visible cards for the active page
  const visibleCards = solutionsData.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  );

  // Switch page with smooth transition
  const switchPage = (nextPage: number) => {
    if (nextPage === currentPage) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(nextPage);
      // Highlight the first card of the new page by default
      setActiveCardId(solutionsData[nextPage * CARDS_PER_PAGE].id);
      setIsAnimating(false);
    }, 220);
  };

  // Auto-change timer: changes page every 5 seconds (pauses on user hover)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      switchPage((currentPage + 1) % totalPages);
    }, 5500);

    return () => clearInterval(interval);
  }, [currentPage, isPaused, totalPages]);

  return (
    <section
      id="solutions"
      aria-label="Built for how your organisation works"
      className="relative w-full bg-white py-20 sm:py-24 lg:py-28 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="px-[5%] max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center  mb-14 sm:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-base font-semibold tracking-tight font-geist-mono text-[#E26D35] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E26D35]" />
            <span>SOLUTIONS</span>
          </div>

          {/* Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium tracking-tight text-[#142938] leading-[1.1] mb-5">
            Built for how your
            <span className="block">organisation works</span>
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg text-slate-500 leading-[1.3] max-w-4xl">
            Claripa connects people management, performance, and task workflows to help organisations align goals, track progress, understand performance, and make informed people decisions
          </p>
        </div>

        {/* 2x2 Grid of Solution Cards (with Smooth Crossfade on Page Change) */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 transition-all duration-300 ease-out",
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
                  "group relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out border",
                  isActive
                    ? "bg-[#FFF6F0] border-[#FED7AA]/90 shadow-xl shadow-orange-500/5 ring-1 ring-orange-200/60"
                    : "bg-[#F8F8F6] border-[#ECECE8] hover:border-zinc-300/80 hover:bg-[#F5F5F2]"
                )}
              >
                {/* Content Row: Text on left, Dot Matrix Graphic on right */}
                <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
                  {/* Left Column: Title & Description */}
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "text-2xl sm:text-[26px] font-bold tracking-tight mb-3 transition-colors duration-200",
                        isActive ? "text-[#E26D35]" : "text-[#142938]"
                      )}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-sans max-w-md">
                      {card.description}
                    </p>
                  </div>

                  {/* Right Column: Dot Matrix Graphic */}
                  <DotMatrix patternType={card.patternType} isActive={isActive} />
                </div>

                {/* Footer Action: SEE HOW IT WORKS */}
                <div>
                  <Link
                    href={card.href}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider uppercase transition-colors duration-200",
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

        {/* Bottom Pagination / Auto-Change Indicators */}
        <div className="flex items-center justify-center gap-3 mt-10 sm:mt-12">
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
      </div>
    </section>
  );
}
