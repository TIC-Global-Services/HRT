"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

export interface ExtensionCardData {
  category: string;
  title: string;
  description: string;
  checklist: string[];
  flowRow1: { label: string; isPrimary?: boolean }[];
  flowRow2: { label: string; isHighlight?: boolean }[];
  progress: { label: string; value: string; width: string; isOrange?: boolean }[];
}

const defaultCards: ExtensionCardData[] = [
  {
    category: "Core HR",
    title: "A clear line from goals to growth.",
    description:
      "Bring structure to how performance is set, tracked and reviewed, so every contribution connects to what the business needs.",
    checklist: [
      "Goals to ratings, connected in one flow",
      "Continuous feedback and check-ins between",
      "Fair, evidence-based reviews built on the whole year",
    ],
    flowRow1: [
      { label: "Goals", isPrimary: true },
      { label: "KRAs" },
      { label: "Contributions" },
    ],
    flowRow2: [
      { label: "Feedback" },
      { label: "Reviews" },
      { label: "Ratings", isHighlight: true },
    ],
    progress: [
      { label: "Ship platform v2", value: "80%", width: "w-[80%]" },
      { label: "Improve client retention", value: "62%", width: "w-[62%]" },
      { label: "Reduce release defects", value: "38%", width: "w-[38%]", isOrange: true },
    ],
  },
  {
    category: "Payroll",
    title: "A clear line from goals to growth.",
    description:
      "Bring structure to how performance is set, tracked and reviewed, so every contribution connects to what the business needs.",
    checklist: [
      "Goals to ratings, connected in one flow",
      "Continuous feedback and check-ins between",
      "Fair, evidence-based reviews built on the whole year",
    ],
    flowRow1: [
      { label: "Goals", isPrimary: true },
      { label: "KRAs" },
      { label: "Contributions" },
    ],
    flowRow2: [
      { label: "Feedback" },
      { label: "Reviews" },
      { label: "Ratings", isHighlight: true },
    ],
    progress: [
      { label: "Ship platform v2", value: "80%", width: "w-[80%]" },
      { label: "Improve client retention", value: "62%", width: "w-[62%]" },
      { label: "Reduce release defects", value: "38%", width: "w-[38%]", isOrange: true },
    ],
  },
  {
    category: "Performance",
    title: "A clear line from goals to growth.",
    description:
      "Bring structure to how performance is set, tracked and reviewed, so every contribution connects to what the business needs.",
    checklist: [
      "Goals to ratings, connected in one flow",
      "Continuous feedback and check-ins between",
      "Fair, evidence-based reviews built on the whole year",
    ],
    flowRow1: [
      { label: "Goals", isPrimary: true },
      { label: "KRAs" },
      { label: "Contributions" },
    ],
    flowRow2: [
      { label: "Feedback" },
      { label: "Reviews" },
      { label: "Ratings", isHighlight: true },
    ],
    progress: [
      { label: "Ship platform v2", value: "80%", width: "w-[80%]" },
      { label: "Improve client retention", value: "62%", width: "w-[62%]" },
      { label: "Reduce release defects", value: "38%", width: "w-[38%]", isOrange: true },
    ],
  },
];

export interface ConnectedModulesProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  cards?: ExtensionCardData[];
  className?: string;
}

// Counting animation item for module showcase progress metrics
function AnimatedProgressItem({
  label,
  valueStr,
  isOrange = false,
  activeKey,
  delay = 0,
}: {
  label: string;
  valueStr: string;
  isOrange?: boolean;
  activeKey: number;
  delay?: number;
}) {
  const target = parseInt(valueStr, 10) || 0;
  const [current, setCurrent] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Respect user's motion preferences
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const rafId = requestAnimationFrame(() => {
        setCurrent(target);
        setBarWidth(target);
      });
      return () => cancelAnimationFrame(rafId);
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;
    const duration = 1000;

    const timeoutId = setTimeout(() => {
      setBarWidth(target);

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(ease * target));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [target, activeKey, delay]);

  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="font-sora text-[#3A4A50] font-medium">{label}</span>
        <span
          className={`font-mono font-semibold tabular-nums ${
            isOrange ? "text-[#E56A1E]" : "text-[#5A6A70]"
          }`}
        >
          {current}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-[#EAEFF1] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-800 ease-out ${
            isOrange ? "bg-[#E56A1E]" : "bg-[#1D4452]"
          }`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}

export default function ConnectedModules({
  eyebrow = "HOW IT FITS TOGETHER",
  title = "Four layers.\nOne intelligence core.",
  description = "Claripa connects the systems, signals and intelligence behind your workforce, giving HR, managers and leaders one clearer foundation for better people decisions.",
  cards = defaultCards,
  className = "",
}: ConnectedModulesProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance through the 3 cards every 6 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % cards.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [cards.length, isPaused]);

  const activeCard = cards[activeCardIndex] ?? cards[0];

  // Helper to determine active pill highlight
  const getPillHighlight = (moduleName: string) => {
    if (activeCard.category.toLowerCase().includes(moduleName.toLowerCase())) {
      return "bg-[#FADFC6] border-[#F7B67E] text-[#3E3731] shadow-[0_4px_14px_rgba(248,120,12,0.18)]";
    }
    return "bg-white border-[#E5DFD7] text-[#002e40] shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:border-[#002e40]/30";
  };

  return (
    <section
      id="connected-modules"
      aria-label="Four layers. One intelligence core."
      className={`w-full bg-[#F7F6F3] py-16 sm:py-20 md:py-24 overflow-hidden ${className}`.trim()}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))] mx-auto flex flex-col items-center">
        {/* Top 2-Column Header matching Image 2 */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 sm:mb-16 w-full">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#E56A1E] mb-3">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.7)]"
              />
              {eyebrow}
            </p>
            <h2 className="text-[#002e40] font-sora text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-semibold tracking-[-0.035em] leading-[1.12] whitespace-pre-line m-0">
              {title}
            </h2>
          </div>
          <p className="text-[#62737a] font-sora text-sm sm:text-[15px] leading-relaxed max-w-[440px] md:pt-4 m-0">
            {description}
          </p>
        </div>

        {/* 4-Layer Orbit System with Rotating Pills */}
        <div className="relative w-full max-w-[580px] sm:max-w-[620px] aspect-square flex items-center justify-center select-none my-4 sm:my-8">
          {/* Central Radial Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] h-[42%] rounded-full bg-[radial-gradient(circle,rgba(248,120,12,0.22)_0%,rgba(248,120,12,0.06)_50%,transparent_72%)] pointer-events-none"
          />

          {/* Center Squircle Badge with Queen */}
          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-[22px] sm:rounded-[26px] bg-[#141210] flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:scale-105">
            <div className="relative w-8 h-12 sm:w-9 sm:h-14">
              <Image
                src="/claripa-queen-transparent.png"
                alt="Claripa Queen"
                fill
                priority
                sizes="50px"
                className="object-contain"
              />
            </div>
          </div>

          {/* ----------------- LAYER 1: Core HR (Innermost Orbit) ----------------- */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%] h-[32%] rounded-full border border-dashed border-[#CBD4D7]"
            style={{
              animation: "orbit-spin-cw 40s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {/* Core HR Pill: positioned at bottom of Ring 1 */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
              <button
                type="button"
                onClick={() => setActiveCardIndex(0)}
                className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${getPillHighlight(
                  "Core HR"
                )}`}
                style={{
                  animation: "orbit-spin-ccw 40s linear infinite",
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                Core HR
              </button>
            </div>
          </div>

          {/* ----------------- LAYER 2: Performance & Payroll (Second Orbit) ----------------- */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[54%] h-[54%] rounded-full border border-dashed border-[#CBD4D7]"
            style={{
              animation: "orbit-spin-ccw 52s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {/* Performance Pill: positioned on left */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={() => setActiveCardIndex(2)}
                className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${getPillHighlight(
                  "Performance"
                )}`}
                style={{
                  animation: "orbit-spin-cw 52s linear infinite",
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                Performance
              </button>
            </div>

            {/* Payroll Pill: positioned on right */}
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={() => setActiveCardIndex(1)}
                className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${getPillHighlight(
                  "Payroll"
                )}`}
                style={{
                  animation: "orbit-spin-cw 52s linear infinite",
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                Payroll
              </button>
            </div>
          </div>

          {/* ----------------- LAYER 3: Analytics (Third Orbit) ----------------- */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[76%] h-[76%] rounded-full border border-dashed border-[#CBD4D7]"
            style={{
              animation: "orbit-spin-cw 64s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {/* Analytics Pill: positioned upper left (~10:30) */}
            <div className="absolute top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={() => setActiveCardIndex(2)}
                className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${getPillHighlight(
                  "Analytics"
                )}`}
                style={{
                  animation: "orbit-spin-ccw 64s linear infinite",
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                Analytics
              </button>
            </div>
          </div>

          {/* ----------------- LAYER 4: Talent & Hiring + Engagement (Outermost Orbit) ----------------- */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[96%] h-[96%] rounded-full border border-dashed border-[#D2D9DB]"
            style={{
              animation: "orbit-spin-ccw 76s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {/* Talent & Hiring Pill: positioned top right (~12:30) */}
            <div className="absolute top-0 left-[62%] -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                type="button"
                onClick={() => setActiveCardIndex(0)}
                className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${getPillHighlight(
                  "Talent"
                )}`}
                style={{
                  animation: "orbit-spin-cw 76s linear infinite",
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                Talent &amp; Hiring
              </button>
            </div>

            {/* Engagement Pill: positioned bottom right (~4:30) */}
            <div className="absolute bottom-[16%] right-[10%] translate-x-1/2 translate-y-1/2 z-20">
              <button
                type="button"
                onClick={() => setActiveCardIndex(1)}
                className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${getPillHighlight(
                  "Engagement"
                )}`}
                style={{
                  animation: "orbit-spin-cw 76s linear infinite",
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                Engagement
              </button>
            </div>
          </div>
        </div>

        {/* ----------------- Extension Card Section (Connected with Pills) ----------------- */}
        <div className="w-full max-w-[960px] mx-auto mt-10 sm:mt-14 transition-all duration-300">
          <div className="bg-white rounded-[26px] sm:rounded-[32px] border border-[#ECE6DE] p-6 sm:p-9 md:p-12 shadow-[0_12px_45px_rgba(0,46,64,0.06)] grid grid-cols-1 lg:grid-cols-[1.12fr_0.98fr] gap-8 md:gap-12 items-center">
            {/* Left Column: Category, Title, Description, Checklist */}
            <div className="flex flex-col">
              <span className="font-mono text-xs uppercase tracking-wider text-[#E56A1E] font-semibold mb-4 sm:mb-5 block">
                {activeCard.category}
              </span>

              <h3 className="text-[#002e40] font-sora text-2xl sm:text-3xl md:text-[32px] font-semibold leading-[1.2] tracking-tight mb-3.5 m-0">
                {activeCard.title}
              </h3>

              <p className="text-[#62737a] font-sora text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-7 m-0">
                {activeCard.description}
              </p>

              {/* Checklist */}
              <ul className="space-y-3 m-0 p-0 list-none">
                {activeCard.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      strokeWidth={2.8}
                      className="text-[#E56A1E] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="font-sora text-xs sm:text-[13px] text-[#4A5960] font-medium leading-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Performance Flow Preview Box */}
            <div className="bg-[#FAFBFB] rounded-[22px] border border-[#E8ECEE] p-5 sm:p-6 shadow-xs">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-[#7C8D94] uppercase font-semibold mb-4 block">
                PERFORMANCE FLOW
              </span>

              {/* Flow Steps: Row 1 */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                {activeCard.flowRow1.map((step) => (
                  <div key={step.label} className="inline-flex items-center gap-1.5 sm:gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-sora font-medium ${
                        step.isPrimary
                          ? "bg-[#1D4452] text-white shadow-2xs"
                          : "bg-[#EAF0F2] text-[#1D4452]"
                      }`}
                    >
                      {step.label}
                    </span>
                    <ArrowRight size={13} className="text-[#9BAAAF] shrink-0" aria-hidden="true" />
                  </div>
                ))}
              </div>

              {/* Flow Steps: Row 2 */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-6 flex-wrap">
                {activeCard.flowRow2.map((step, idx) => (
                  <div key={step.label} className="inline-flex items-center gap-1.5 sm:gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-sora font-medium ${
                        step.isHighlight
                          ? "bg-[#FCE5D4] text-[#B85217] border border-[#FAD0B6]"
                          : "bg-[#EAF0F2] text-[#1D4452]"
                      }`}
                    >
                      {step.label}
                    </span>
                    {idx < activeCard.flowRow2.length - 1 && (
                      <ArrowRight size={13} className="text-[#9BAAAF] shrink-0" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>

              {/* Progress Bars with Counting Animation */}
              <div className="space-y-4 pt-1">
                {activeCard.progress.map((prog, idx) => (
                  <AnimatedProgressItem
                    key={`${prog.label}-${activeCardIndex}`}
                    label={prog.label}
                    valueStr={prog.value}
                    isOrange={prog.isOrange}
                    activeKey={activeCardIndex}
                    delay={idx * 120}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3 Pagination Capsule Bars matching Image 2 */}
          <div
            className="flex items-center justify-center gap-2.5 mt-7 sm:mt-8"
            role="tablist"
            aria-label="Extension cards navigation"
          >
            {cards.map((_, idx) => {
              const isActive = activeCardIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setActiveCardIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? "w-16 bg-[#E56A1E]" : "w-14 bg-[#D7DDDF] hover:bg-[#BFC8CB]"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
