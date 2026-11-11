"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock,
  Zap,
  ChevronLeft,
  ChevronRight,
  BellOff,
} from "lucide-react";
import FlutedGlassBackground from "@/reuseable/HeroBg";
import BlurText from "@/reuseable/BlurText";

export interface FeatureCardItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  highlighted?: boolean;
}

export const workforceContent = {
  eyebrow: "The Future of People Decisions",
  headline: {
    line1: "Spot the Signals.",
    line2: "Act with Confidence",
  },
  description:
    "Claripa connects performance, engagement, capability, and behaviour signals to help organisations identify meaningful patterns, make informed people decisions, and take timely action.",
  ctaButton: {
    label: "EXPLORE OUR SOLUTIONS",
    href: "/solution-hub",
  },
  cards: [
    {
      id: "disconnected-signals",
      title: "Disconnected Signals",
      description:
        "Workforce information is often spread across different systems and activities, making it difficult to connect performance, engagement, and capability signals into a meaningful picture.",
      href: "/solution-hub#signals",
    },
    {
      id: "reactive-decisions",
      title: "Reactive Decisions",
      description:
        "When meaningful workforce signals go unnoticed, organisations may recognise emerging issues only after they begin affecting employee performance, engagement, or team outcomes.",
      href: "/solution-hub#decisions",
    },
    {
      id: "managers-without-context",
      title: "Managers Without Context",
      description:
        "Managers need a clearer understanding of employee goals, task progress, performance patterns, and development needs to identify where support or attention may be required.",
      href: "/solution-hub#context",
    },
    {
      id: "proactive-action",
      title: "Proactive Action",
      description:
        "Claripa aims to bring relevant workforce intelligence to decision-makers, helping them recognise emerging patterns, understand potential concerns, and take timely action.",
      href: "/solution-hub#action",
      highlighted: true,
    },
  ],
};

/* =========================================================================
   CARD 1 MINI UI: DISCONNECTED SIGNALS (Automation Flow Diagram with Moving Dotted Lines)
   ========================================================================= */
function DisconnectedSignalsMiniUI() {
  return (
    <div className="w-full h-[260px] flex flex-col items-center justify-center relative select-none">
      {/* Trigger: When a task is due */}
      <div className="bg-white rounded-xl border border-zinc-200/90 px-3.5 py-2 shadow-xs flex items-center gap-2 text-xs font-medium text-zinc-700 transition-transform group-hover:scale-[1.02]">
        <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
        <span>When a task is due</span>
      </div>

      {/* Vertical connection line with continuous looping animated dotted flow & arrow */}
      <div className="relative w-6 h-6 flex items-center justify-center my-0.5">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          {/* Base light track */}
          <line
            x1="12"
            y1="0"
            x2="12"
            y2="19"
            stroke="#FDE0C8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Animated flowing dotted line */}
          <line
            x1="12"
            y1="0"
            x2="12"
            y2="19"
            stroke="#F06A25"
            strokeWidth="2.5"
            strokeDasharray="3 5"
            strokeLinecap="round"
            className="animate-dotted-flow"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-16"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>
          {/* Arrowhead pointing down into Run automation */}
          <path
            d="M8.5 14.5L12 19L15.5 14.5"
            stroke="#F06A25"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Action button: Run automation */}
      <div className="bg-[#F06A25] text-white rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-2 shadow-sm shadow-orange-500/25 transition-transform group-hover:scale-[1.02]">
        <Zap className="w-3.5 h-3.5 fill-white text-white shrink-0 animate-pulse" />
        <span>Run automation</span>
      </div>

      {/* Branching stem & SVG with continuous looping animated dotted flow and arrow heads */}
      <div className="relative w-52 sm:w-56 h-8 my-0.5 flex justify-center">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 220 32"
          fill="none"
          aria-hidden="true"
        >
          {/* Left Branch Base Track */}
          <path
            d="M 110 0 L 110 10 L 32 10 L 32 24"
            stroke="#FDE0C8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left Branch Animated Dotted Line */}
          <path
            d="M 110 0 L 110 10 L 32 10 L 32 24"
            stroke="#F06A25"
            strokeWidth="2.5"
            strokeDasharray="3 5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-dotted-flow"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-16"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>
          {/* Left Arrowhead */}
          <path
            d="M 28 19 L 32 25 L 36 19"
            stroke="#F06A25"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right Branch Base Track */}
          <path
            d="M 110 0 L 110 10 L 188 10 L 188 24"
            stroke="#FDE0C8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right Branch Animated Dotted Line */}
          <path
            d="M 110 0 L 110 10 L 188 10 L 188 24"
            stroke="#F06A25"
            strokeWidth="2.5"
            strokeDasharray="3 5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-dotted-flow"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-16"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </path>
          {/* Right Arrowhead */}
          <path
            d="M 184 19 L 188 25 L 192 19"
            stroke="#F06A25"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Two outcomes */}
      <div className="flex items-center justify-between w-full max-w-[240px] px-1 gap-2 mt-0.5">
        <div className="bg-[#FFF8F3] border border-orange-200/80 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-[11px] font-medium text-zinc-800 shadow-2xs transition-transform hover:scale-105">
          <Check className="w-3 h-3 text-[#F06A25] stroke-[2.5] shrink-0" />
          <span>Update status</span>
        </div>
        <div className="bg-[#FFF8F3] border border-orange-200/80 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-[11px] font-medium text-zinc-800 shadow-2xs transition-transform hover:scale-105">
          <ArrowUpRight className="w-3.5 h-3.5 text-[#F06A25] stroke-[2.5] shrink-0 animate-arrow-nudge" />
          <span>Notify team</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CARD 2 MINI UI: REACTIVE DECISIONS (Focus Session with Count & Progress Animation)
   ========================================================================= */
function ReactiveDecisionsMiniUI() {
  const [seconds, setSeconds] = useState(14);
  const [progress, setProgress] = useState(48);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev + 1) % 60);
      setProgress((prev) => (prev >= 85 ? 42 : prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedSeconds = String(seconds).padStart(2, "0");

  return (
    <div className="w-full h-[260px] flex flex-col items-center justify-center select-none">
      {/* Main Focus Session Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200/90 p-5 sm:p-6 shadow-xs w-full max-w-[270px] relative overflow-hidden flex flex-col justify-between">
        {/* Header */}
        <div className="text-[10px] font-mono tracking-wider font-semibold text-zinc-400 uppercase">
          FOCUS SESSION
        </div>

        {/* Large bold timer with live counting */}
        <div className="text-3xl sm:text-[38px] font-mono font-medium text-[#18181B] tracking-tight my-2.5 tabular-nums leading-none">
          01:16:{formattedSeconds}
        </div>

        {/* Subtitle tag row */}
        <div className="flex items-center justify-between gap-1.5 mt-1">
          <div className="flex items-center gap-1.5 text-xs text-[#F06A25] font-medium">
            <Clock className="w-4 h-4 text-[#F06A25] shrink-0" />
            <span>Website design</span>
          </div>

          <div className="bg-[#FAF5ED] px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-medium text-[#F06A25] shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Focus on</span>
          </div>
        </div>

        {/* Bottom progress bar on the card matching the reference image */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-100">
          <div
            className="h-full bg-[#F06A25] rounded-r-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Floating notification bar below the card matching reference image */}
      <div className="mt-2.5 bg-white rounded-xl border border-zinc-200/90 px-3.5 py-2.5 shadow-2xs flex items-center gap-2 text-xs text-zinc-800 font-medium w-full max-w-[270px]">
        <BellOff className="w-4 h-4 text-zinc-800 shrink-0" />
        <span className="truncate">Notifications paused until 12:00</span>
      </div>
    </div>
  );
}

/* =========================================================================
   CARD 3 MINI UI: MANAGERS WITHOUT CONTEXT (No Cards Visible Initially -> Pop One by One -> Continue)
   ========================================================================= */
function ManagersWithoutContextMiniUI() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;

    const runCycle = () => {
      // 0.0s: Initially NO cards visible, 0% progress
      setStep(0);

      // 0.8s: Card 1 pops in -> 35% progress
      t1 = setTimeout(() => {
        setStep(1);
      }, 800);

      // 1.9s: Card 2 pops in -> 68% progress
      t2 = setTimeout(() => {
        setStep(2);
      }, 1900);

      // 3.0s: Card 3 pops in -> all 3 cards visible
      t3 = setTimeout(() => {
        setStep(3);
      }, 3000);
    };

    runCycle();
    const cycleInterval = setInterval(runCycle, 7600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(cycleInterval);
    };
  }, []);

  return (
    <div className="w-full h-[260px] flex flex-col justify-center gap-2 select-none px-1">
      {/* Task 1: Website refresh (Pops in at step 1) */}
      <div
        className={`bg-white rounded-xl border border-zinc-200/80 px-3.5 py-2.5 flex items-center justify-between text-xs font-medium text-zinc-800 shadow-2xs transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          step >= 1
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-6 scale-90 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-[4px] bg-[#F06A25] flex items-center justify-center text-white shrink-0 shadow-2xs">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="line-through text-slate-500 font-medium">Website refresh</span>
        </div>
        <span className="bg-[#E6F5EC] text-[#1A824E] px-2.5 py-0.5 rounded-md text-[11px] font-medium">
          Done
        </span>
      </div>

      {/* Task 2: Product launch (Pops in at step 2 with active purple border) */}
      <div
        className={`bg-white rounded-xl border-2 border-[#A8A4F8] shadow-sm px-3.5 py-2.5 flex items-center justify-between text-xs transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          step >= 2
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-6 scale-90 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-[4px] bg-[#F06A25] flex items-center justify-center text-white shrink-0 shadow-2xs">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="line-through text-slate-500 font-medium">Product launch</span>
        </div>
        <span className="bg-[#E6F5EC] text-[#1A824E] px-2.5 py-0.5 rounded-md text-[11px] font-medium">
          Done
        </span>
      </div>

      {/* Task 3: Q4 roadmap (Pops in at step 3) */}
      <div
        className={`bg-white rounded-xl border border-zinc-200/80 px-3.5 py-2.5 flex items-center justify-between text-xs font-medium text-zinc-800 shadow-2xs transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          step >= 3
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-6 scale-90 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-[4px] border-2 border-indigo-200 bg-white shrink-0" />
          <span className="text-zinc-800 font-medium">Q4 roadmap</span>
        </div>
        <span className="bg-[#FDF2E9] text-[#D96B27] px-2.5 py-0.5 rounded-md text-[11px] font-medium">
          Planning
        </span>
      </div>

      {/* Progress footer */}
      <div className="mt-2 pt-2 px-1 flex items-center gap-3">
        <span className="text-xs text-slate-500 font-normal shrink-0">
          This week
        </span>
        <div className="flex-1 bg-[#F0EDF6] rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#F06A25] h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: step === 0 ? "0%" : step === 1 ? "35%" : "68%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CARD 4 MINI UI: PROACTIVE ACTION (Signal to Proactive Action Preview)
   ========================================================================= */
function ProactiveActionMiniUI() {
  return (
    <div className="w-full h-[260px] flex flex-col items-center justify-center relative select-none">
      {/* Resting AI Signal & Action Preview Card */}
      <div className="w-full max-w-[260px] bg-white rounded-2xl border border-zinc-200/90 p-4 shadow-xs flex flex-col gap-3 group-hover:border-orange-200/80 group-hover:bg-white/95 group-hover:shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold text-[#F06A25] uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#F06A25] fill-[#F06A25] shrink-0" />
            PROACTIVE SIGNAL
          </span>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 group-hover:bg-orange-100/60 group-hover:text-orange-600 px-2 py-0.5 rounded-full transition-colors duration-300">
            LIVE
          </span>
        </div>

        <div className="bg-[#FAF9F5] rounded-xl p-2.5 border border-[#ECE8DF] group-hover:bg-[#FFF8F3] group-hover:border-orange-200/60 transition-colors duration-300">
          <p className="text-xs font-medium text-[#142938] leading-tight">
            Workload variance detected
          </p>
          <p className="text-[11px] text-zinc-500 group-hover:text-zinc-600 mt-0.5">
            Engineering · 3 signals flagged
          </p>
        </div>

        <div className="bg-[#FFF5ED] border border-orange-200/80 rounded-xl px-3 py-2 flex items-center justify-between shadow-2xs">
          <span className="text-[11px] font-semibold text-[#F06A25]">
            Nudge: Schedule 1-on-1
          </span>
          <span className="w-5 h-5 rounded-full bg-[#F06A25] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
            ✓
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   REUSABLE CARD HOVER GRADIENT BLINDS SHADER
   ========================================================================= */
function CardHoverGradientBlinds() {
  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
      <FlutedGlassBackground
        colorA="#FFA812"
        colorB="#FF4D0A"
        background="#FFF5ED"
        mobileSlitWidth={60}
        squeeze={1.9}
        lip={0.045}
        speed={0.9}
        mouseStrength={1}
      />
      {/* Soft bottom fade to ensure typography legibility */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#FFF5ED] via-[#FFF5ED]/85 to-transparent pointer-events-none" />
    </div>
  );
}


export default function Workforce() {
  const { eyebrow, headline, description, ctaButton, cards } = workforceContent;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [, setActiveSlide] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const slideWidth = clientWidth * 0.85;
    const currentSlide = Math.round(scrollLeft / slideWidth);
    setActiveSlide(Math.min(Math.max(currentSlide, 0), cards.length - 1));
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.85;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="solutions"
      aria-label="Claripa Workforce Signals"
      className="relative w-full bg-white py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      <div className="px-[5%]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-10 sm:pb-12">
          {/* Left: Eyebrow + Headline */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-tight text-[#F06A25] uppercase mb-3">
              <span className="text-base leading-none font-bold">*</span>
              <span>{eyebrow}</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-medium tracking-tight text-[#142938] leading-[1.14]">
              <BlurText
                as="span"
                delay={20}
                text={`${headline.line1}\n${headline.line2}`}
              />
            </h2>
          </div>

          {/* Right: Description & CTA Button */}
          <div className="flex flex-col items-start lg:items-end gap-5 max-w-lg">
            <BlurText
              as="p"
              delay={20}
              text={description}
              className="font-sans text-base sm:text-[17px] text-zinc-600 leading-[1.3] lg:text-left"
            />

            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <Link
                href={ctaButton.href}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 font-mono text-xs font-semibold tracking-wider uppercase text-[#142938] shadow-2xs hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-95"
              >
                <span>{ctaButton.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

              {/* Slider Controls (Mobile & Tablet) */}
              <div className="flex items-center gap-2 xl:hidden">
                <button
                  type="button"
                  onClick={() => scrollSlider("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous card"
                  className="w-9 h-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 shadow-2xs hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollSlider("right")}
                  disabled={!canScrollRight}
                  aria-label="Next card"
                  className="w-9 h-9 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 shadow-2xs hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div
          ref={sliderRef}
          onScroll={updateScrollState}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 overflow-x-auto xl:overflow-x-visible snap-x snap-mandatory pb-4 pt-2"
        >
          {/* Card 1: Disconnected Signals */}
          <Link
            href={cards[0].href}
            className="group relative flex flex-col justify-between rounded-[28px] border border-zinc-200/70 hover:border-orange-300/80 bg-[#F7F6F3] hover:bg-[#FFF5ED] p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-500 h-[460px] overflow-hidden"
          >
            <CardHoverGradientBlinds />
            <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none group-focus-visible:opacity-0 group-focus-visible:scale-95 group-focus-visible:pointer-events-none">
              <DisconnectedSignalsMiniUI />
            </div>
            <div className="relative z-10 pt-4 border-t border-zinc-200/50 group-hover:border-orange-200/60 mt-auto shrink-0 transition-colors duration-300">
              {cards[0].description && (
                <div className="overflow-hidden max-h-0 group-hover:max-h-36 group-focus-visible:max-h-36 transition-all duration-300 ease-out">
                  <p className="font-sans text-xs sm:text-sm text-zinc-600 group-hover:text-[#142938] leading-[1.3] mb-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                    {cards[0].description}
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#142938] group-hover:text-[#F06A25] transition-colors duration-300">
                  {cards[0].title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-[#F06A25] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>
            </div>
          </Link>

          {/* Card 2: Reactive Decisions */}
          <Link
            href={cards[1].href}
            className="group relative flex flex-col justify-between rounded-[28px] border border-zinc-200/70 hover:border-orange-300/80 bg-[#F7F6F3] hover:bg-[#FFF5ED] p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-500 h-[460px] overflow-hidden"
          >
            <CardHoverGradientBlinds />
            <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none group-focus-visible:opacity-0 group-focus-visible:scale-95 group-focus-visible:pointer-events-none">
              <ReactiveDecisionsMiniUI />
            </div>
            <div className="relative z-10 pt-4 border-t border-zinc-200/50 group-hover:border-orange-200/60 mt-auto shrink-0 transition-colors duration-300">
              {cards[1].description && (
                <div className="overflow-hidden max-h-0 group-hover:max-h-36 group-focus-visible:max-h-36 transition-all duration-300 ease-out">
                  <p className="font-sans text-xs sm:text-sm text-zinc-600 group-hover:text-[#142938] leading-[1.3 mb-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                    {cards[1].description}
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#142938] group-hover:text-[#F06A25] transition-colors duration-300">
                  {cards[1].title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-[#F06A25] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>
            </div>
          </Link>

          {/* Card 3: Managers Without Context */}
          <Link
            href={cards[2].href}
            className="group relative flex flex-col justify-between rounded-[28px] border border-zinc-200/70 hover:border-orange-300/80 bg-[#F7F6F3] hover:bg-[#FFF5ED] p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-500 h-[460px] overflow-hidden"
          >
            <CardHoverGradientBlinds />
            <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none group-focus-visible:opacity-0 group-focus-visible:scale-95 group-focus-visible:pointer-events-none">
              <ManagersWithoutContextMiniUI />
            </div>
            <div className="relative z-10 pt-4 border-t border-zinc-200/50 group-hover:border-orange-200/60 mt-auto shrink-0 transition-colors duration-300">
              {cards[2].description && (
                <div className="overflow-hidden max-h-0 group-hover:max-h-36 group-focus-visible:max-h-36 transition-all duration-300 ease-out">
                  <p className="font-sans text-xs sm:text-sm text-zinc-600 group-hover:text-[#142938] leading-[1.3] mb-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                    {cards[2].description}
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#142938] group-hover:text-[#F06A25] transition-colors duration-300">
                  {cards[2].title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-[#F06A25] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>
            </div>
          </Link>

          {/* Card 4: Proactive Action (Hover State with GradientBlinds WebGL) */}
          <Link
            href={cards[3].href}
            className="group relative flex flex-col justify-between rounded-[28px] border border-zinc-200/70 hover:border-orange-300/80 bg-[#F7F6F3] hover:bg-[#FFF5ED] p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-500 h-[460px] overflow-hidden"
          >
            <CardHoverGradientBlinds />
            <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none group-focus-visible:opacity-0 group-focus-visible:scale-95 group-focus-visible:pointer-events-none">
              <ProactiveActionMiniUI />
            </div>
            <div className="relative z-10 pt-4 border-t border-zinc-200/50 group-hover:border-orange-200/60 mt-auto shrink-0 transition-colors duration-300">
              {cards[3].description && (
                <div className="overflow-hidden max-h-0 group-hover:max-h-36 group-focus-visible:max-h-36 transition-all duration-300 ease-out">
                  <p className="font-sans text-xs sm:text-sm text-zinc-600 group-hover:text-[#142938] leading-[1.3] mb-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                    {cards[3].description}
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#142938] group-hover:text-[#F06A25] transition-colors duration-300">
                  {cards[3].title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-[#F06A25] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
