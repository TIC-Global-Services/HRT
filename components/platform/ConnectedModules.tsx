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
  title = "Three Connected Modules.\nOne Clearer View of Performance.",
  description = "Claripa brings people information, performance management, and task execution together in one platform. By connecting organizational goals with individual contributions and performance insights, Claripa helps leaders, HR teams, and managers work towards shared priorities.",
  cards = defaultCards,
  className = "",
}: ConnectedModulesProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);

  // Auto-advance through the 3 cards every 6 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % cards.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [cards.length, isPaused]);

  // Pill highlight helper matching screenshot:
  // Active pill: warm peach/orange filled with border
  // Inactive pill: crisp white with subtle border
  const getPillClass = (index: number) => {
    if (activeCardIndex === index) {
      return "bg-[#FDE2CF] border-[#F9B98A] text-[#1E3B45] shadow-[0_4px_14px_rgba(240,106,37,0.18)] scale-105";
    }
    return "bg-white border-[#E5DFD7] text-[#002e40] shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:border-[#002e40]/30 hover:scale-102";
  };

  return (
    <section
      id="connected-modules"
      aria-label="Three Connected Modules. One Clearer View of Performance."
      className={`w-full bg-[#F7F6F3] py-16 sm:py-20 md:py-24 overflow-hidden ${className}`.trim()}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex flex-col items-center px-[5%]">
        {/* Top Header matching reference screenshot 100% */}
        <div className="text-center  mb-10 sm:mb-14">
          {/* Eyebrow Pill Tag */}
          <p className="inline-flex items-center justify-center gap-1.5 font-mono text-xs sm:text-base font-medium uppercase tracking-tight text-[#F06A25] mb-4">
            <span aria-hidden="true" className="text-[#F06A25] text-sm font-bold">
              ✱
            </span>
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
            className="text-[#62737A] font-sora text-sm sm:text-lg leading-[1.3] max-w-5xl mx-auto m-0"
          />
        </div>

        {/* ----------------- 3-Module Orbit System (2 Concentric Dashed Rings) ----------------- */}
        <div
          className="relative w-full max-w-[480px] sm:max-w-[540px] aspect-[1/0.82] sm:aspect-square flex items-center justify-center select-none my-2 sm:my-6"
          onMouseEnter={() => setIsOrbitPaused(true)}
          onMouseLeave={() => setIsOrbitPaused(false)}
        >
          {/* Central Warm Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%] h-[52%] rounded-full bg-[radial-gradient(circle,rgba(240,106,37,0.18)_0%,rgba(240,106,37,0.05)_50%,transparent_74%)] pointer-events-none"
          />

          {/* Center Black Squircle Badge with Claripa Queen */}
          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-[22px] sm:rounded-[26px] bg-[#141210] flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:scale-105 border border-white/10">
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

          {/* ----------------- RING 1: Inner Orbit (Performance) ----------------- */}
          {/* Static Dashed Circle Line */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56%] h-[56%] rounded-full border border-dashed border-[#CBD4D7] pointer-events-none"
          />

          {/* Rotating Ring 1 Wrapper for Performance Pill */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56%] h-[56%] rounded-full pointer-events-none"
            style={{
              animation: "orbit-spin-cw 38s linear infinite",
              transformOrigin: "center center",
              animationPlayState: isOrbitPaused ? "paused" : "running",
            }}
          >
            {/* Performance Pill Container */}
            <div className="absolute top-[12%] right-[12%] translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div
                style={{
                  animation: "orbit-spin-ccw 38s linear infinite",
                  animationPlayState: isOrbitPaused ? "paused" : "running",
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveCardIndex(1)}
                  className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${getPillClass(
                    1
                  )}`}
                >
                  Performance
                </button>
              </div>
            </div>
          </div>

          {/* ----------------- RING 2: Outer Orbit (People & Task) ----------------- */}
          {/* Static Dashed Circle Line */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[92%] rounded-full border border-dashed border-[#CBD4D7] pointer-events-none"
          />

          {/* Rotating Ring 2 Wrapper for People & Task Pills */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[92%] rounded-full pointer-events-none"
            style={{
              animation: "orbit-spin-cw 54s linear infinite",
              transformOrigin: "center center",
              animationPlayState: isOrbitPaused ? "paused" : "running",
            }}
          >
            {/* People Pill Container */}
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div
                style={{
                  animation: "orbit-spin-ccw 54s linear infinite",
                  animationPlayState: isOrbitPaused ? "paused" : "running",
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveCardIndex(0)}
                  className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${getPillClass(
                    0
                  )}`}
                >
                  People
                </button>
              </div>
            </div>

            {/* Task Pill Container */}
            <div className="absolute bottom-[16%] right-[16%] translate-x-1/2 translate-y-1/2 pointer-events-auto">
              <div
                style={{
                  animation: "orbit-spin-ccw 54s linear infinite",
                  animationPlayState: isOrbitPaused ? "paused" : "running",
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveCardIndex(2)}
                  className={`inline-block border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${getPillClass(
                    2
                  )}`}
                >
                  Task
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- Carousel Cards Section (Connected with Pills) ----------------- */}
        <div className="w-full max-w-[1140px] mx-auto mt-6 sm:mt-10 overflow-hidden px-2 sm:px-4">
          {/* Card Carousel Slider Track */}
          <div
            className="flex transition-transform duration-500 ease-out gap-6 items-stretch"
            style={{
              transform: `translateX(calc(-${activeCardIndex * 100}% - ${activeCardIndex * 24}px))`,
            }}
          >
            {cards.map((card) => (
              <div
                key={card.title}
                className="w-full shrink-0 bg-white rounded-[26px] sm:rounded-[32px] border border-[#ECE6DE] p-6 sm:p-9 md:p-12 shadow-[0_12px_45px_rgba(0,46,64,0.06)] grid grid-cols-1 lg:grid-cols-[1.12fr_0.98fr] gap-8 md:gap-12 items-center transition-all duration-300"
              >
                {/* Left Column: Category, Title, Description, Checklist */}
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#E56A1E] font-semibold mb-4 sm:mb-5 block">
                    {card.category}
                  </span>

                  <h3 className="text-[#002E40] font-sora text-2xl sm:text-3xl md:text-[32px] font-semibold leading-[1.2] tracking-tight mb-3.5 m-0">
                    {card.title}
                  </h3>

                  <p className="text-[#62737A] font-sora text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-7 m-0">
                    {card.description}
                  </p>

                  {/* Checklist matching reference screenshot */}
                  <ul className="space-y-3 m-0 p-0 list-none">
                    {card.checklist.map((item) => (
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
                    {card.flowHeader || "PERFORMANCE FLOW"}
                  </span>

                  {/* Flow Steps: Row 1 */}
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                    {card.flowRow1.map((step) => (
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
                    {card.flowRow2.map((step, stepIdx) => (
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
                        {stepIdx < card.flowRow2.length - 1 && (
                          <ArrowRight size={13} className="text-[#9BAAAF] shrink-0" aria-hidden="true" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Progress Bars with Counting Animation */}
                  <div className="space-y-4 pt-1">
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
            ))}
          </div>

          {/* 3 Pagination Capsule Bars matching Image 100% */}
          <div
            className="flex items-center justify-center gap-2.5 mt-8 sm:mt-10"
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
