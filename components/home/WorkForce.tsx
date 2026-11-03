"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock,
  Zap,
  ChevronLeft,
  ChevronRight,
  BellOff,
  CheckSquare,
  Square,
  Flame,
} from "lucide-react";

export interface FeatureCardItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  highlighted?: boolean;
}

export const workforceContent = {
  eyebrow: "PEOPLE, CONNECTED",
  headline: {
    line1: "See Workforce Signals",
    line2: "Before It’s Too Late",
  },
  description:
    "Claripa connects performance, engagement, capability and behaviour signals to help organisations make informed people decisions and act with confidence.",
  ctaButton: {
    label: "EXPLORE OUR SOLUTIONS",
    href: "/solution-hub",
  },
  cards: [
    {
      id: "disconnected-signals",
      title: "Disconnected Signals",
      href: "/solution-hub#signals",
    },
    {
      id: "reactive-decisions",
      title: "Reactive Decisions",
      href: "/solution-hub#decisions",
    },
    {
      id: "managers-without-context",
      title: "Managers Without Context",
      href: "/solution-hub#context",
    },
    {
      id: "proactive-action",
      title: "Proactive Action",
      description:
        "Claripa delivers actionable intelligence so teams can focus on what matters.",
      href: "/solution-hub#action",
      highlighted: true,
    },
  ],
};

/* =========================================================================
   CARD 1 MINI UI: DISCONNECTED SIGNALS (Automation Flow Diagram)
   ========================================================================= */
function DisconnectedSignalsMiniUI() {
  return (
    <div className="w-full h-[260px] flex flex-col items-center justify-center relative select-none">
      {/* Trigger: When a task is due */}
      <div className="bg-white rounded-xl border border-zinc-200/90 px-3.5 py-2 shadow-xs flex items-center gap-2 text-xs font-medium text-zinc-700">
        <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
        <span>When a task is due</span>
      </div>

      {/* Vertical connection line */}
      <div className="w-[1.5px] h-4 bg-zinc-300 my-0.5" />

      {/* Action button: Run automation */}
      <div className="bg-[#F06A25] text-white rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-2 shadow-sm shadow-orange-500/20">
        <Zap className="w-3.5 h-3.5 fill-white text-white shrink-0" />
        <span>Run automation</span>
      </div>

      {/* Branching stem & dashed splitter */}
      <div className="w-[1.5px] h-3 bg-orange-300 my-0.5" />
      <div className="relative w-44 sm:w-48 h-4">
        {/* Horizontal dashed line */}
        <div className="absolute top-0 left-6 right-6 border-t-2 border-dashed border-orange-300" />
        {/* Left vertical drop */}
        <div className="absolute top-0 left-6 w-[1.5px] h-3 border-l-2 border-dashed border-orange-300" />
        {/* Right vertical drop */}
        <div className="absolute top-0 right-6 w-[1.5px] h-3 border-r-2 border-dashed border-orange-300" />
      </div>

      {/* Two outcomes */}
      <div className="flex items-center justify-between w-full max-w-[240px] px-1 gap-2 mt-0.5">
        <div className="bg-[#FFF8F3] border border-orange-200/80 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-[11px] font-medium text-zinc-800 shadow-2xs">
          <Check className="w-3 h-3 text-[#F06A25] stroke-[2.5] shrink-0" />
          <span>Update status</span>
        </div>
        <div className="bg-[#FFF8F3] border border-orange-200/80 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-[11px] font-medium text-zinc-800 shadow-2xs">
          <ArrowUpRight className="w-3 h-3 text-[#F06A25] stroke-[2.5] shrink-0" />
          <span>Notify team</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CARD 2 MINI UI: REACTIVE DECISIONS (Focus Session Timer)
   ========================================================================= */
function ReactiveDecisionsMiniUI() {
  return (
    <div className="w-full h-[260px] flex items-center justify-center select-none">
      <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs w-full max-w-[260px]">
        {/* Header */}
        <div className="text-[10px] font-mono tracking-wider font-semibold text-zinc-400 uppercase">
          FOCUS SESSION
        </div>

        {/* Large bold timer */}
        <div className="text-3xl sm:text-[34px] font-mono font-bold text-zinc-900 tracking-tight my-2 tabular-nums">
          01:16:14
        </div>

        {/* Subtitle tag */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-medium">
          <span className="w-3.5 h-3.5 rounded-full border border-orange-400 flex items-center justify-center shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          </span>
          <span>Website design</span>
          <span className="text-zinc-300">•</span>
          <span className="text-emerald-600 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Focus on
          </span>
        </div>

        {/* Footer alert */}
        <div className="pt-3 mt-3 border-t border-zinc-100 flex items-center gap-2 text-[11px] text-zinc-400">
          <BellOff className="w-3 h-3 text-zinc-400 shrink-0" />
          <span className="truncate">Notifications paused until 12:00</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CARD 3 MINI UI: MANAGERS WITHOUT CONTEXT (Checklist + Progress)
   ========================================================================= */
function ManagersWithoutContextMiniUI() {
  return (
    <div className="w-full h-[260px] flex flex-col justify-center gap-2 select-none px-1">
      {/* Task 1 */}
      <div className="bg-white rounded-xl border border-zinc-200/80 px-3.5 py-2.5 flex items-center justify-between text-xs font-medium text-zinc-800 shadow-2xs">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-3.5 h-3.5 text-[#F06A25] shrink-0" />
          <span>Website refresh</span>
        </div>
        <span className="bg-emerald-50 text-emerald-600 border border-emerald-200/70 text-[10px] font-semibold px-2 py-0.5 rounded-md">
          Done
        </span>
      </div>

      {/* Task 2: Active card with subtle highlight */}
      <div className="bg-white rounded-xl border-2 border-indigo-200 px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold text-zinc-900 shadow-xs">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-3.5 h-3.5 text-[#F06A25] shrink-0" />
          <span>Product launch</span>
        </div>
        <span className="bg-emerald-50 text-emerald-600 border border-emerald-200/70 text-[10px] font-semibold px-2 py-0.5 rounded-md">
          Done
        </span>
      </div>

      {/* Task 3 */}
      <div className="bg-white rounded-xl border border-zinc-200/80 px-3.5 py-2.5 flex items-center justify-between text-xs font-medium text-zinc-600 shadow-2xs">
        <div className="flex items-center gap-2">
          <Square className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span>Q4 roadmap</span>
        </div>
        <span className="bg-orange-50 text-orange-600 border border-orange-200/70 text-[10px] font-semibold px-2 py-0.5 rounded-md">
          Planning
        </span>
      </div>

      {/* Progress footer */}
      <div className="mt-2 pt-2 px-1">
        <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1.5">
          <span>This week:</span>
        </div>
        <div className="w-full bg-zinc-200/80 rounded-full h-1.5 overflow-hidden">
          <div className="bg-[#F06A25] h-full rounded-full w-[45%]" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CARD 4 MINI UI: PROACTIVE ACTION (Vertical Orange Gradient Blinds)
   ========================================================================= */
function ProactiveActionMiniUI() {
  return (
    <div className="w-full h-[240px] relative rounded-2xl overflow-hidden flex items-end justify-center select-none">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFA366]/40 via-[#FF8A3D]/25 to-transparent" />

      {/* Stylized Architectural Gradient Blinds matching hero visual */}
      <div className="absolute inset-0 flex justify-between px-3 pt-2 gap-1.5">
        {[
          { h: "92%", op: "0.85" },
          { h: "100%", op: "0.95" },
          { h: "94%", op: "0.9" },
          { h: "88%", op: "0.8" },
          { h: "82%", op: "0.75" },
          { h: "75%", op: "0.65" },
          { h: "68%", op: "0.55" },
        ].map((blind, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-t-lg bg-gradient-to-b from-[#F06A25] via-[#FF7A29]/90 to-transparent"
            style={{
              height: blind.h,
              opacity: blind.op,
              boxShadow: "0 4px 20px rgba(240, 106, 37, 0.25)",
            }}
          />
        ))}
      </div>

      {/* Bottom fade into peach card */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FFF5ED] via-[#FFF5ED]/80 to-transparent pointer-events-none" />
    </div>
  );
}

/* =========================================================================
   MAIN WORKFORCE COMPONENT
   ========================================================================= */
export default function Workforce() {
  const { eyebrow, headline, description, ctaButton, cards } = workforceContent;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
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
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider text-[#F06A25] uppercase mb-3">
              <span className="text-base leading-none font-bold">*</span>
              <span>{eyebrow}</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-medium tracking-tight text-[#142938] leading-[1.14]">
              <span className="block">{headline.line1}</span>
              <span className="block">{headline.line2}</span>
            </h2>
          </div>

          {/* Right: Description & CTA Button */}
          <div className="flex flex-col items-start lg:items-end gap-5 max-w-lg">
            <p className="font-sans text-base sm:text-[17px] text-zinc-600 leading-relaxed lg:text-left">
              {description}
            </p>

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
            className="group relative flex flex-col justify-between rounded-[28px] border border-zinc-200/70 bg-[#F8F9FA] p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-h-[460px]"
          >
            <DisconnectedSignalsMiniUI />
            <div className="pt-4 border-t border-zinc-200/50 flex items-center justify-between mt-auto">
              <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#142938]">
                {cards[0].title}
              </h3>
              <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-[#142938] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </Link>

          {/* Card 2: Reactive Decisions */}
          <Link
            href={cards[1].href}
            className="group relative flex flex-col justify-between rounded-[28px] border border-zinc-200/70 bg-[#F8F9FA] p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-h-[460px]"
          >
            <ReactiveDecisionsMiniUI />
            <div className="pt-4 border-t border-zinc-200/50 flex items-center justify-between mt-auto">
              <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#142938]">
                {cards[1].title}
              </h3>
              <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-[#142938] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </Link>

          {/* Card 3: Managers Without Context */}
          <Link
            href={cards[2].href}
            className="group relative flex flex-col justify-between rounded-[28px] border border-zinc-200/70 bg-[#F8F9FA] p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-h-[460px]"
          >
            <ManagersWithoutContextMiniUI />
            <div className="pt-4 border-t border-zinc-200/50 flex items-center justify-between mt-auto">
              <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#142938]">
                {cards[2].title}
              </h3>
              <ArrowUpRight className="h-5 w-5 text-zinc-400 group-hover:text-[#142938] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </Link>

          {/* Card 4: Proactive Action (Signature Warm Peach Card) */}
          <Link
            href={cards[3].href}
            className="group relative flex flex-col justify-between rounded-[28px] border border-orange-200/70 bg-[#FFF5ED] p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-h-[460px] overflow-hidden"
          >
            <ProactiveActionMiniUI />
            <div className="pt-4 border-t border-orange-200/50 mt-auto">
              {cards[3].description && (
                <p className="font-sans text-xs sm:text-sm text-[#142938] leading-relaxed mb-3">
                  {cards[3].description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F06A25]">
                  {cards[3].title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-[#F06A25] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
