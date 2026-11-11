"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

export interface ExtensionCardData {
  category: string;
  title: string;
  description: string;
  checklist: string[];
  flowHeader?: string;
  flowRow1: { label: string; isPrimary?: boolean }[];
  flowRow2: { label: string; isHighlight?: boolean }[];
  progress: { label: string; value: string; width?: string; isOrange?: boolean }[];
}

const defaultCards: ExtensionCardData[] = [
  {
    category: "Core HR",
    title: "People",
    description:
      "Maintain employee information and organizational structures to establish the foundation for goal alignment, performance management, and employee accountability.",
    checklist: [
      "Employee information management",
      "Organizational and reporting structures",
      "Employee data import through a predefined Excel format",
    ],
    flowHeader: "PERFORMANCE FLOW",
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
    title: "Performance",
    description:
      "Connect strategy to execution across company, team, and individual levels. Support performance reviews with 360° feedback, behavioural competencies, and AI-assisted performance insights.",
    checklist: [
      "AI-assisted OKR creation",
      "Configurable performance reviews",
      "Performance ratings and calibrations",
    ],
    flowHeader: "PERFORMANCE FLOW",
    flowRow1: [
      { label: "OKRs", isPrimary: true },
      { label: "Check-ins" },
      { label: "Peer 360°" },
    ],
    flowRow2: [
      { label: "Feedback" },
      { label: "Calibration" },
      { label: "Ratings", isHighlight: true },
    ],
    progress: [
      { label: "Ship platform v2", value: "80%", width: "w-[80%]" },
      { label: "Improve client retention", value: "62%", width: "w-[62%]" },
      { label: "Reduce release defects", value: "38%", width: "w-[38%]", isOrange: true },
    ],
  },
  {
    category: "Task Execution",
    title: "Task",
    description:
      "Turn strategic priorities into daily execution. Track task completion, align day-to-day deliverables with broader OKRs, and unblock team execution with AI nudges.",
    checklist: [
      "Daily task tracking linked to OKRs",
      "AI check-ins and performance nudges",
      "Automated blockers identification",
    ],
    flowHeader: "PERFORMANCE FLOW",
    flowRow1: [
      { label: "Planning", isPrimary: true },
      { label: "In Progress" },
      { label: "Contributions" },
    ],
    flowRow2: [
      { label: "AI Nudges" },
      { label: "Reviews" },
      { label: "Completed", isHighlight: true },
    ],
    progress: [
      { label: "Sprint deliverables", value: "85%", width: "w-[85%]" },
      { label: "Cross-team alignment", value: "72%", width: "w-[72%]" },
      { label: "Unresolved blockers", value: "28%", width: "w-[28%]", isOrange: true },
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
      <div className="flex items-center justify-between text-[11px] mb-1.5">
        <span className="font-sora text-[#35464E] font-normal">{label}</span>
        <span
          className={`font-mono font-normal tabular-nums ${
            isOrange ? "text-[#E56A1E]" : "text-[#62737A]"
          }`}
        >
          {current}%
        </span>
      </div>
      <div className="h-[5px] w-full bg-[#E9EEF0] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-800 ease-out ${
            isOrange ? "bg-[#EA5E1B]" : "bg-[#1B4251]"
          }`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}

export default function ConnectedModules({
  eyebrow = "HOW IT FITS TOGETHER",
  title = "Three Connected Modules.\nOne Clearer View of Performance.",
  description = "Claripa brings people information, performance management, and task execution together in one \nplatform. By connecting organizational goals with individual contributions and performance insights, \nClaripa helps leaders, HR teams, and managers work towards shared priorities.",
  cards = defaultCards,
  className = "",
}: ConnectedModulesProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);

  // Auto-advance automatically every 6 seconds
  useEffect(() => {
    if (cards.length <= 1) return;
    const timer = setTimeout(() => {
      setActiveCardIndex((prev) => (prev + 1) % cards.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [cards.length, activeCardIndex]);

  // Active pill: warm peach filled with crisp orange border
  // Inactive pill: crisp white with subtle cool border
  const getPillClass = (index: number) => {
    if (activeCardIndex === index) {
      return "bg-[#FCE0C8] border-[#F48A3B] text-[#1A2024] shadow-[0_3px_12px_rgba(244,138,59,0.16)] scale-105";
    }
    return "bg-white border-[#E5E8EA] text-[#1A2024] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#F48A3B]/50 hover:scale-105";
  };

  return (
    <section
      id="connected-modules"
      aria-label="Three Connected Modules. One Clearer View of Performance."
      className={`w-full bg-[#F7F6F3] py-16 sm:py-20 md:py-24 overflow-hidden ${className}`.trim()}
    >
      <div className="flex flex-col items-center px-[5%]">
        {/* Top Header matching reference screenshot 100% */}
        <div className="text-center  mb-10 sm:mb-14">
          {/* Eyebrow Pill Tag */}
          <p className="inline-flex items-center justify-center gap-2 font-mono text-xs sm:text-base font-medium uppercase tracking-tight text-[#F06A25] mb-4">
            <span
              aria-hidden="true"
              className="inline-block w-2 h-2 rounded-full bg-[#F06A25] shadow-[0_0_8px_2px_rgba(240,106,37,0.55)]"
            />
            {eyebrow}
          </p>

          {/* Main Title */}
          <BlurText
            as="h2"
            delay={20}
            text={title}
            className="text-[#002E40] font-sora text-3xl sm:text-4xl md:text-[44px] lg:text-[46px] font-normal tracking-[-0.03em] leading-[1.14] m-0 mb-4"
          />

          {/* Subtitle / Description */}
          <BlurText
            as="p"
            delay={20}
            text={description}
            className="text-[#62737A] font-sora text-sm sm:text-lg leading-[1.3] max-w-5xl whitespace-pre-line mx-auto m-0"
          />
        </div>

        {/* ----------------- 3-Module Orbit System (2 Concentric Dashed Rings) ----------------- */}
        <div className="relative w-[310px] h-[310px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] flex items-center justify-center select-none my-2 sm:my-4">
          {/* Central Warm Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] h-[72%] rounded-full bg-[radial-gradient(circle_at_54%_52%,rgba(244,132,52,0.22)_0%,rgba(244,132,52,0.08)_46%,transparent_72%)] pointer-events-none"
          />

          {/* Outer Rotating Dashed Ring (Clean, No Pills) */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] h-[88%] pointer-events-none"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible"
              style={{
                animation: "orbit-spin-ccw 56s linear infinite",
                transformOrigin: "center center",
              }}
            >
              <circle
                cx="50"
                cy="50"
                r="49.5"
                fill="none"
                stroke="#CFD4D6"
                strokeWidth="0.32"
                strokeDasharray="1.8 1.8"
              />
            </svg>
          </div>

          {/* Inner Dashed Circle Track */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56%] h-[56%] pointer-events-none"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible"
              style={{
                animation: "orbit-spin-cw 28s linear infinite",
                transformOrigin: "center center",
                animationPlayState: isOrbitPaused ? "paused" : "running",
              }}
            >
              <circle
                cx="50"
                cy="50"
                r="49.5"
                fill="none"
                stroke="#CFD4D6"
                strokeWidth="0.48"
                strokeDasharray="2.8 2.8"
              />
            </svg>
          </div>

          {/* Center Black Squircle Badge with Claripa Queen */}
          <div className="relative z-10 w-20 h-20 sm:w-[92px] sm:h-[92px] rounded-[22px] sm:rounded-[24px] bg-[#161412] flex items-center justify-center shadow-[0_10px_28px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-105">
            <div className="relative w-7 h-11 sm:w-8 sm:h-12">
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

          {/* Rotating Inner Orbit Layer Carrying All 3 Module Pills (People, Performance, Task) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56%] h-[56%] pointer-events-none z-20">
            <div
              className="relative w-full h-full"
              style={{
                animation: "orbit-spin-cw 28s linear infinite",
                transformOrigin: "center center",
                animationPlayState: isOrbitPaused ? "paused" : "running",
              }}
            >
              {/* Performance Pill (top-right ~36deg on inner ring) */}
              <div className="absolute top-[9.5%] left-[79.4%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div
                  style={{
                    animation: "orbit-spin-ccw 28s linear infinite",
                    transformOrigin: "center center",
                    animationPlayState: isOrbitPaused ? "paused" : "running",
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setIsOrbitPaused(true)}
                    onMouseLeave={() => setIsOrbitPaused(false)}
                    onClick={() => setActiveCardIndex(1)}
                    className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-[13px] font-medium tracking-normal transition-all duration-300 cursor-pointer whitespace-nowrap ${getPillClass(
                      1
                    )}`}
                  >
                    Performance
                  </button>
                </div>
              </div>

              {/* People Pill (9 o'clock / left on inner ring) */}
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div
                  style={{
                    animation: "orbit-spin-ccw 28s linear infinite",
                    transformOrigin: "center center",
                    animationPlayState: isOrbitPaused ? "paused" : "running",
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setIsOrbitPaused(true)}
                    onMouseLeave={() => setIsOrbitPaused(false)}
                    onClick={() => setActiveCardIndex(0)}
                    className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-[13px] font-medium tracking-normal transition-all duration-300 cursor-pointer whitespace-nowrap ${getPillClass(
                      0
                    )}`}
                  >
                    People
                  </button>
                </div>
              </div>

              {/* Task Pill (bottom-right ~146deg on inner ring) */}
              <div className="absolute top-[91.5%] left-[78%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div
                  style={{
                    animation: "orbit-spin-ccw 28s linear infinite",
                    transformOrigin: "center center",
                    animationPlayState: isOrbitPaused ? "paused" : "running",
                  }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setIsOrbitPaused(true)}
                    onMouseLeave={() => setIsOrbitPaused(false)}
                    onClick={() => setActiveCardIndex(2)}
                    className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-[13px] font-medium tracking-normal transition-all duration-300 cursor-pointer whitespace-nowrap ${getPillClass(
                      2
                    )}`}
                  >
                    Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- Carousel Cards Section (Connected with Pills) ----------------- */}
        <div className="w-full max-w-[920px] mx-auto mt-6 sm:mt-10 overflow-visible px-2 sm:px-0">
          {/* Card Carousel Slider Track */}
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] gap-6 items-stretch"
            style={{
              transform: `translateX(calc(-${activeCardIndex * 100}% - ${activeCardIndex * 24}px))`,
            }}
          >
            {cards.map((card, cardIdx) => {
              const isCurrent = cardIdx === activeCardIndex;
              return (
                <div
                  key={card.title}
                  onClick={() => setActiveCardIndex(cardIdx)}
                  className={`w-full shrink-0 bg-[#FAF9F7] rounded-[22px] sm:rounded-[26px] border border-[#ECE8E2]/90 px-6 py-7 sm:px-10 sm:py-9 shadow-[0_14px_40px_rgba(0,30,45,0.05)] flex flex-col justify-between transition-opacity duration-500 ${
                    isCurrent ? "opacity-100" : "opacity-90 cursor-pointer hover:opacity-100"
                  }`}
                >
                  {/* Top Category Tag */}
                  <span className="font-mono text-xs sm:text-[13px] text-[#F06A25] font-normal mb-7 sm:mb-9 block">
                    {card.category}
                  </span>

                  {/* Main 2-Column Body */}
                  <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.96fr] gap-7 md:gap-10 items-end">
                    {/* Left Column: Title, Description, Checklist */}
                    <div className="flex flex-col pb-1">
                      <h3 className="text-[#143747] font-sora text-2xl sm:text-[26px] font-medium leading-[1.2] tracking-tight mb-3 m-0">
                        {card.title}
                      </h3>

                      <p className="text-[#5A6A72] font-sora text-[13px] sm:text-sm leading-[1.5] mb-6 sm:mb-7 m-0 max-w-[400px]">
                        {card.description}
                      </p>

                      {/* Checklist with soft peach circles matching screenshot */}
                      <ul className="space-y-2.5 m-0 p-0 list-none">
                        {card.checklist.map((item) => (
                          <li key={item} className="flex items-center gap-2.5">
                            <span
                              aria-hidden="true"
                              className="w-4 h-4 rounded-full bg-[#FDE8D8] flex items-center justify-center shrink-0"
                            >
                              <Check
                                size={10}
                                strokeWidth={3}
                                className="text-[#F06A25]"
                              />
                            </span>
                            <span className="font-sora text-xs sm:text-[13px] text-[#1F3944] font-normal leading-normal">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Column: Performance Flow Preview Box */}
                    <div className="bg-white rounded-[18px] border border-[#EDEAE4] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                      <span className="font-mono text-[9.5px] sm:text-[10px] tracking-[0.06em] text-[#6D7C82] uppercase font-medium mb-3.5 block">
                        {card.flowHeader || "PERFORMANCE FLOW"}
                      </span>

                      {/* Flow Steps: Row 1 */}
                      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                        {card.flowRow1.map((step) => (
                          <div key={step.label} className="inline-flex items-center gap-1.5">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-sora font-medium ${
                                step.isPrimary
                                  ? "bg-[#1B4251] text-white"
                                  : "bg-[#EEF3F5] text-[#1D3E4C]"
                              }`}
                            >
                              {step.label}
                            </span>
                            <ArrowRight size={11} className="text-[#9BAAAF] shrink-0" aria-hidden="true" />
                          </div>
                        ))}
                      </div>

                      {/* Flow Steps: Row 2 */}
                      <div className="flex items-center gap-1.5 mb-5 flex-wrap">
                        {card.flowRow2.map((step, stepIdx) => (
                          <div key={step.label} className="inline-flex items-center gap-1.5">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-sora font-medium ${
                                step.isHighlight
                                  ? "bg-[#FCE0C8] text-[#B85217]"
                                  : "bg-[#EEF3F5] text-[#1D3E4C]"
                              }`}
                            >
                              {step.label}
                            </span>
                            {stepIdx < card.flowRow2.length - 1 && (
                              <ArrowRight size={11} className="text-[#9BAAAF] shrink-0" aria-hidden="true" />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Progress Bars with Counting Animation */}
                      <div className="space-y-3 pt-1">
                        {card.progress.map((prog, pIdx) => (
                          <AnimatedProgressItem
                            key={`${prog.label}-${activeCardIndex}`}
                            label={prog.label}
                            valueStr={prog.value}
                            isOrange={prog.isOrange}
                            activeKey={activeCardIndex}
                            delay={pIdx * 120}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3 Pagination Capsule Bars matching Image 100% */}
          <div
            className="flex items-center justify-center gap-2.5 mt-7 sm:mt-9"
            role="tablist"
            aria-label="Module cards navigation"
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
                  className={`h-[3.5px] rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? "w-12 sm:w-14 bg-[#E56A1E]" : "w-12 sm:w-14 bg-[#CFD5D8] hover:bg-[#B4BEC2]"
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
