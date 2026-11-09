"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, AlertCircle, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/lib/useCountUp";

export interface PlatformHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  tourText?: string;
  tourHref?: string;
  tags?: string[];
  className?: string;
}

export default function PlatformHero({
  eyebrow = "THE CLARIPA PLATFORM",
  title = "One intelligence layer\nfor every people decision.",
  description = "Claripa sits above your existing HR systems, connects the signals they already capture, and turns them into clear, timely intelligence for leaders, HR and managers.",
  tourText = "TAKE A PRODUCT TOUR",
  tourHref = "#product-tour",
  className = "",
}: PlatformHeroProps) {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      let inView = false;
      if (dashboardRef.current) {
        const rect = dashboardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        // Triggered when dashboard is in the focal area of the viewport
        inView = rect.top < windowHeight * 0.88;
      }

      if (scrollY > 35 || inView) {
        setIsTriggered(true);
      } else if (scrollY < 15) {
        setIsTriggered(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={`w-full pt-14 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20 overflow-hidden ${className}`.trim()}>
      <div className="w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))] mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <span className="text-[#E56A1E] font-mono text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-center mb-3.5">
          {eyebrow}
        </span>

        {/* Title */}
        <h1 className="text-[#002e40] font-sora text-3xl sm:text-5xl md:text-[56px] lg:text-[60px] font-normal tracking-tight leading-[1.1] text-center whitespace-pre-line mb-3.5 sm:mb-4">
          {title}
        </h1>

        {/* Description */}
        <p className="text-[#62737a] font-sora text-sm sm:text-base md:text-lg leading-[1.2] text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          {description}
        </p>

        {/* CTA Button */}
        <Link
          href={tourHref}
          className="inline-flex min-h-[46px] sm:min-h-[48px] items-center justify-center gap-2 px-6 sm:px-7 rounded-full bg-[#1F4A59] hover:bg-[#163B47] text-white font-mono text-[11px] sm:text-base font-medium tracking-tight uppercase transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer"
        >
          {tourText}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>

        {/* Outer Rounded Frame */}
        <div
          ref={dashboardRef}
          className="w-full mt-12 sm:mt-16 md:mt-10 rounded-[28px] sm:rounded-[36px] border border-[#E2E6E8] bg-gradient-to-b from-[#FAF8F5] via-[#FAF7F2] to-[#FAF5EE] p-4 sm:p-8 md:p-12 lg:p-16 flex justify-center items-center relative"
        >
          {/* Main Dashboard Card */}
          <div className="relative w-full max-w-[880px] bg-[#F5F1EB] border border-[#ECE6DE] rounded-[22px] sm:rounded-[26px] p-4 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,46,64,0.08)]">
            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between pb-4 sm:pb-5 mb-5 sm:mb-6 border-b border-[#EAE3DA]/70">
              {/* Brand Logo */}
              <div className="relative h-6 w-24 sm:w-28 shrink-0">
                <Image
                  src="/claripa_logo.png"
                  alt="Claripa"
                  fill
                  sizes="120px"
                  className="object-contain object-left"
                  priority
                />
              </div>

              {/* Navigation Tabs */}
              <div className="hidden sm:flex items-center gap-1 p-1 rounded-full">
                <span className="bg-[#204958] text-white px-3.5 py-2 rounded-full text-xs font-medium font-sora shadow-xs cursor-default">
                  Performance
                </span>
                <span className="text-[#62737A] text-xs font-medium font-sora px-3 py-1 cursor-default hover:text-[#002e40] transition-colors">
                  Intelligence
                </span>
                <span className="text-[#62737A] text-xs font-medium font-sora px-3 py-1 cursor-default hover:text-[#002e40] transition-colors">
                  Managers
                </span>
                <span className="text-[#62737A] text-xs font-medium font-sora px-3 py-1 cursor-default hover:text-[#002e40] transition-colors">
                  Talent
                </span>
              </div>

              {/* User Avatar */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FCE8DC] text-[#C25B1A] font-sora font-semibold text-xs flex items-center justify-center shadow-xs shrink-0">
                AS
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-6">
              {/* Left Column: Workforce Signals */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <h2 className="text-[#002e40] font-sora text-base sm:text-lg font-semibold m-0">
                      Workforce signals
                    </h2>
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#8C9DA3] uppercase font-medium">
                      LAST 30 DAYS
                    </span>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {/* Health */}
                    <div className="bg-white/90 rounded-[12px] p-2.5 sm:p-3.5 border border-[#ECE5DD] flex flex-col justify-between shadow-2xs">
                      <span className="text-[#62737A] text-[10px] sm:text-[11px] font-sora font-medium leading-tight">
                        Workforce health
                      </span>
                      <strong className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-[#002e40] font-sora mt-1 sm:mt-1.5 tabular-nums">
                        <AnimatedCounter value={78} start={isTriggered} suffix="%" />
                      </strong>
                    </div>

                    {/* Flight Risk */}
                    <div className="bg-white/90 rounded-[12px] p-2.5 sm:p-3.5 border border-[#ECE5DD] flex flex-col justify-between shadow-2xs">
                      <span className="text-[#62737A] text-[10px] sm:text-[11px] font-sora font-medium leading-tight">
                        At flight risk
                      </span>
                      <div>
                        <strong className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-[#D45218] font-sora mt-1 sm:mt-1.5 block tabular-nums">
                          <AnimatedCounter value={24} start={isTriggered} />
                        </strong>
                        <span className="text-[10px] sm:text-[11px] font-mono text-[#D45218] font-medium leading-none block">
                          ↑ 5 new
                        </span>
                      </div>
                    </div>

                    {/* Goals */}
                    <div className="bg-white/90 rounded-[12px] p-2.5 sm:p-3.5 border border-[#ECE5DD] flex flex-col justify-between shadow-2xs">
                      <span className="text-[#62737A] text-[10px] sm:text-[11px] font-sora font-medium leading-tight">
                        Goals on track
                      </span>
                      <div>
                        <strong className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-[#002e40] font-sora mt-1 sm:mt-1.5 block tabular-nums">
                          <AnimatedCounter value={71} start={isTriggered} suffix="%" />
                        </strong>
                        <span className="text-[9px] sm:text-[10px] font-sora text-[#B5591C] font-medium leading-none block">
                          3 teams slipping
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orange Trend Line Chart */}
                <div className="w-full pt-4 sm:pt-6">
                  <svg
                    viewBox="0 0 450 110"
                    className="w-full h-16 sm:h-20 lg:h-24 overflow-visible"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Workforce performance trend chart"
                  >
                    <defs>
                      <linearGradient id="hero-chart-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E56A1E" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#E56A1E" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,85 C50,83 90,75 140,82 C180,88 220,70 270,72 C320,74 360,54 410,50 L450,45"
                      fill="none"
                      stroke="#E56A1E"
                      strokeWidth="2.5"
                      strokeDasharray="500"
                      style={{
                        strokeDashoffset: isTriggered ? 0 : 500,
                        transition: "stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                    <path
                      d="M0,85 C50,83 90,75 140,82 C180,88 220,70 270,72 C320,74 360,54 410,50 L450,45 L450,110 L0,110 Z"
                      fill="url(#hero-chart-fill)"
                      className="transition-opacity duration-1000 ease-out"
                      style={{ opacity: isTriggered ? 1 : 0 }}
                    />
                  </svg>
                </div>
              </div>

              {/* Right Column: Top Priorities */}
              <div className="flex flex-col justify-start">
                <h2 className="text-[#002e40] font-sora text-base sm:text-lg font-semibold mb-3 sm:mb-3.5 m-0">
                  Top priorities
                </h2>

                <div className="flex flex-col gap-2.5 sm:gap-2">
                  {/* Priority 1 */}
                  <div className="rounded-[12px] px-3.5 py-3 bg-[#FCECE8] flex items-center justify-between border border-[#F5DDD6]/60 shadow-2xs transition-transform hover:scale-[1.01]">
                    <span className="font-sora text-xs font-semibold text-[#A83822]">
                      Review at-risk engineers
                    </span>
                  </div>

                  {/* Priority 2 */}
                  <div className="rounded-[12px] px-3.5 py-3 bg-[#FBF1E2] flex items-center justify-between border border-[#F4E3CB]/60 shadow-2xs transition-transform hover:scale-[1.01]">
                    <span className="font-sora text-xs font-semibold text-[#8C5E22]">
                      Manager check-ins due
                    </span>
                    <span className="font-sora text-xs font-bold text-[#8C5E22] tabular-nums">
                      <AnimatedCounter value={6} start={isTriggered} />
                    </span>
                  </div>

                  {/* Priority 3 */}
                  <div className="rounded-[12px] px-3.5 py-3 bg-[#EDF7ED] flex items-center justify-between border border-[#DCEDDC]/60 shadow-2xs transition-transform hover:scale-[1.01]">
                    <span className="font-sora text-xs font-semibold text-[#2E6B38]">
                      Growth opportunities
                    </span>
                    <span className="font-sora text-xs font-bold text-[#2E6B38] tabular-nums">
                      <AnimatedCounter value={24} start={isTriggered} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Overlay Badge 1: Ask Claripa (Bottom Left - Pop-up on scroll) */}
            <div
              className={`absolute -bottom-6 sm:-bottom-8 lg:-bottom-10 -left-2 sm:-left-4 lg:-left-6 z-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                isTriggered
                  ? "opacity-100 scale-100 translate-x-0 translate-y-0"
                  : "opacity-0 scale-50 -translate-x-6 translate-y-8 pointer-events-none"
              }`}
              style={{ transitionDelay: isTriggered ? "280ms" : "0ms" }}
            >
              <div className="animate-float-2">
                <div className="bg-[#FFF9F4] rounded-[18px] sm:rounded-[20px] p-4 sm:p-5 border border-[#F5E6D8] shadow-[0_16px_40px_rgba(0,46,64,0.12)] max-w-[260px] sm:max-w-[290px] md:max-w-[280px] transition-transform hover:scale-[1.03]">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#0088A3]" aria-hidden="true" />
                    <span className="font-sora font-semibold text-xs sm:text-sm text-[#002e40]">
                      Ask Claripa
                    </span>
                  </div>
                  <p className="font-sora text-[11px] sm:text-xs text-[#52636A] leading-[1.3] my-2 sm:my-2.5">
                    2 people on your team show early disengagement signals. A growth conversation is recommended.
                  </p>
                  <button
                    type="button"
                    className="text-[#E56A1E] font-sora text-[11px] sm:text-xs font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer p-0 bg-transparent border-0"
                  >
                    View suggested actions →
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Overlay Badge 2: Flight Risk Detected (Top Right - Pop-up on scroll) */}
            <div
              className={`absolute top-32 sm:top-24 md:top-28 -right-2 sm:-right-4 lg:-right-6 z-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                isTriggered
                  ? "opacity-100 scale-100 translate-x-0 translate-y-0"
                  : "opacity-0 scale-50 translate-x-6 -translate-y-6 pointer-events-none"
              }`}
              style={{ transitionDelay: isTriggered ? "100ms" : "0ms" }}
            >
              <div className="animate-float-1">
                <div className="bg-white/95 backdrop-blur-md rounded-[16px] sm:rounded-[18px] p-2.5 sm:p-3 pr-4 sm:pr-5 border border-[#ECEAE6] shadow-[0_14px_36px_rgba(0,46,64,0.12)] flex items-center gap-3 transition-transform hover:scale-[1.03]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] bg-[#E56A1E] flex items-center justify-center shrink-0 shadow-xs">
                    <AlertCircle size={18} className="text-white sm:w-5 sm:h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-sora text-xs sm:text-[13px] font-semibold text-[#002e40] m-0">
                      Flight risk detected
                    </p>
                    <p className="font-sora text-[10px] sm:text-[11px] text-[#78888F] m-0 mt-0.5">
                      6 weeks before resignation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Overlay Badge 3: Ready to Step Up (Bottom Right - Pop-up on scroll) */}
            <div
              className={`absolute -bottom-4 sm:-bottom-6 right-4 sm:right-10 lg:right-14 z-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                isTriggered
                  ? "opacity-100 scale-100 translate-x-0 translate-y-0"
                  : "opacity-0 scale-50 translate-x-6 translate-y-6 pointer-events-none"
              }`}
              style={{ transitionDelay: isTriggered ? "440ms" : "0ms" }}
            >
              <div className="animate-float-3">
                <div className="bg-white/95 backdrop-blur-md rounded-[16px] sm:rounded-[18px] p-2.5 sm:p-3 pr-4 sm:pr-6 border border-[#ECEAE6] shadow-[0_14px_36px_rgba(0,46,64,0.12)] flex items-center gap-3 transition-transform hover:scale-[1.03]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                    <Image
                      src="/Claripa-queen.png"
                      alt="Ready to step up"
                      width={22}
                      height={22}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-sora text-xs sm:text-[13px] font-semibold text-[#002e40] m-0">
                      Ready to step up
                    </p>
                    <p className="font-sora text-[10px] sm:text-[11px] text-[#71846C] m-0 mt-0.5">
                      Analyst · succession-ready
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
