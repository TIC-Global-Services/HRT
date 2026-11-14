"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/lib/useCountUp";
import BlurText from "@/reuseable/BlurText";

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
  description = "Claripa sits above your existing HR systems, connects the signals they already capture, and \nturns them into clear, timely intelligence for leaders, HR and managers.",
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
      <div className="px-[5%] flex flex-col items-center">
        {/* Eyebrow */}
        <span className="text-[#E56A1E] font-mono text-xs sm:text-base font-medium tracking-tight uppercase text-center mb-3.5">
          {eyebrow}
        </span>

        {/* Title */}
        <BlurText
          as="h1"
          delay={20}
          trigger="load"
          text={title}
          className="text-[#002E40] font-sora text-[28px] sm:text-5xl md:text-[56px] lg:text-[60px] font-normal tracking-tight leading-[1.1] text-center mb-3.5 sm:mb-4"
        />

        {/* Description */}
        <BlurText
          as="p"
          delay={20}
          trigger="load"
          text={description}
          className="text-[#62737a] font-sora text-sm sm:text-base md:text-lg leading-[1.2] text-center max-w-4xl mx-auto mb-6 sm:mb-8 whitespace-pre-line"
        />

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
          className="w-full mt-12 sm:mt-16 md:mt-10 rounded-[26px] sm:rounded-[34px] border border-[#DFDCD7] bg-white bg-[radial-gradient(ellipse_62%_90%_at_92%_68%,rgba(249,192,155,0.28)_0%,rgba(252,226,208,0.16)_48%,rgba(255,255,255,0.98)_100%)] px-5 py-7 sm:px-12 sm:py-10 md:px-20 md:py-11 lg:px-28 lg:py-12 flex justify-center items-center relative"
        >
          {/* Main Dashboard Card */}
          <div className="relative w-full max-w-[790px] bg-gradient-to-b from-[#FAF8F5] via-[#F7F4EE] to-[#F3EFE8] border border-[#EFECE6] rounded-[20px] sm:rounded-[24px] px-4 py-4 sm:px-7 sm:py-5 md:px-8 md:py-10 shadow-[0_14px_40px_rgba(0,30,45,0.05)]">
            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between pb-1 mb-4 sm:mb-5">
              {/* Brand Logo */}
              <div className="relative h-4 sm:h-5 w-20 sm:w-14 shrink-0">
                <Image
                  src="/claripa_logo.png"
                  alt="Claripa"
                  fill
                  sizes="100px"
                  className="object-cover object-left"
                  priority
                />
              </div>

              {/* Navigation Tabs */}
              <div className="hidden sm:flex items-center gap-2 md:gap-4 rounded-full">
                <span className="bg-[#1B4251] text-white px-3.5 py-1 rounded-full text-[11px] font-medium font-sora shadow-2xs cursor-default">
                  Performance
                </span>
                <span className="text-[#5A6B72] text-[11px] font-normal font-sora px-2 py-1 cursor-default hover:text-[#002e40] transition-colors">
                  Intelligence
                </span>
                <span className="text-[#5A6B72] text-[11px] font-normal font-sora px-2 py-1 cursor-default hover:text-[#002e40] transition-colors">
                  Managers
                </span>
                <span className="text-[#5A6B72] text-[11px] font-normal font-sora px-2 py-1 cursor-default hover:text-[#002e40] transition-colors">
                  Talent
                </span>
              </div>

              {/* User Avatar */}
              <div className="w-7 h-7 rounded-full bg-[#FCE5D4] text-[#D26B35] font-sora font-medium text-[10px] flex items-center justify-center shrink-0">
                AS
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.58fr_1fr] gap-5 sm:gap-6 items-start">
              {/* Left Column: Workforce Signals */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[#0F313F] font-sora text-sm sm:text-[17px] font-medium m-0">
                      Workforce signals
                    </h2>
                    <span className="font-mono text-[9px] tracking-[0.06em] text-[#7D8C92] uppercase font-medium">
                      LAST 30 DAYS
                    </span>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {/* Health */}
                    <div className="bg-white rounded-[10px] p-2.5 sm:p-3 border border-[#EFECE6]/90 min-h-[78px] sm:min-h-[84px] flex flex-col justify-start">
                      <span className="text-[#6F7F86] text-[9.5px] sm:text-[10px] font-sora font-normal leading-tight">
                        Workforce health
                      </span>
                      <strong className="text-[20px] sm:text-[24px] font-normal text-[#133A4B] font-sora mt-1.5 leading-none tabular-nums">
                        <AnimatedCounter value={78} start={isTriggered} suffix="%" />
                      </strong>
                    </div>

                    {/* Flight Risk */}
                    <div className="bg-white rounded-[10px] p-2.5 sm:p-3 border border-[#EFECE6]/90 min-h-[78px] sm:min-h-[84px] flex flex-col justify-start">
                      <span className="text-[#6F7F86] text-[9.5px] sm:text-[10px] font-sora font-normal leading-tight">
                        At flight risk
                      </span>
                      <div className="mt-1.5">
                        <strong className="text-[20px] sm:text-[24px] font-normal text-[#D65924] font-sora block leading-none tabular-nums">
                          <AnimatedCounter value={24} start={isTriggered} />
                        </strong>
                        <span className="text-[9px] sm:text-[9.5px] font-sora text-[#9A421C] font-medium leading-none block mt-1.5">
                          ↑ 5 new
                        </span>
                      </div>
                    </div>

                    {/* Goals */}
                    <div className="bg-white rounded-[10px] p-2.5 sm:p-3 border border-[#EFECE6]/90 min-h-[78px] sm:min-h-[84px] flex flex-col justify-start">
                      <span className="text-[#6F7F86] text-[9.5px] sm:text-[10px] font-sora font-normal leading-tight">
                        Goals on track
                      </span>
                      <div className="mt-1.5">
                        <strong className="text-[20px] sm:text-[24px] font-normal text-[#133A4B] font-sora block leading-none tabular-nums">
                          <AnimatedCounter value={71} start={isTriggered} suffix="%" />
                        </strong>
                        <span className="text-[9px] sm:text-[9.5px] font-sora text-[#9A421C] font-medium leading-none block mt-1.5">
                          3 teams slipping
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Orange Trend Line Chart */}
                <div className="w-full pt-2 sm:pt-3">
                  <svg
                    viewBox="0 0 460 95"
                    className="w-full h-14 sm:h-16 lg:h-[74px] overflow-visible"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Workforce performance trend chart"
                  >
                    <defs>
                      <linearGradient id="hero-chart-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E86F2C" stopOpacity="0.34" />
                        <stop offset="100%" stopColor="#E86F2C" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,78 L45,84 L90,64 L135,71 L180,68 L215,72 L260,55 L300,61 L360,37 L390,34 L435,16 L460,16"
                      fill="none"
                      stroke="#D96025"
                      strokeWidth="1.75"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeDasharray="600"
                      style={{
                        strokeDashoffset: isTriggered ? 0 : 600,
                        transition: "stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                    <path
                      d="M0,78 L45,84 L90,64 L135,71 L180,68 L215,72 L260,55 L300,61 L360,37 L390,34 L435,16 L460,16 L460,95 L0,95 Z"
                      fill="url(#hero-chart-fill)"
                      className="transition-opacity duration-1000 ease-out"
                      style={{ opacity: isTriggered ? 1 : 0 }}
                    />
                  </svg>
                </div>
              </div>

              {/* Right Column: Top Priorities */}
              <div className="relative flex flex-col justify-start pb-8 sm:pb-6 lg:pb-0">
                <h2 className="text-[#0F313F] font-sora text-sm sm:text-[15px] font-medium mb-3 m-0">
                  Top priorities
                </h2>

                <div className="flex flex-col gap-2">
                  {/* Priority 1 + Floating Badge 2: Flight Risk Detected */}
                  <div className="relative">
                    <div className="rounded-[8px] px-3.5 py-2.5 bg-[#FDE2DF] flex items-center justify-between transition-transform hover:scale-[1.01]">
                      <span className="font-sora text-[11px] font-medium text-[#8E2A1E]">
                        Review at-risk engineers
                      </span>
                    </div>

                    <div
                      className={`absolute -top-[20%]  md:top-1/2 md:-translate-y-[36%] -right-8 sm:-right-8 lg:-right-34 z-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                        isTriggered
                          ? "opacity-100 scale-100 translate-x-0"
                          : "opacity-0 scale-75 translate-x-6 pointer-events-none"
                      }`}
                      style={{ transitionDelay: isTriggered ? "100ms" : "0ms" }}
                    >
                      <div className="animate-float-1">
                        <div className="bg-white/95 backdrop-blur-md rounded-[12px] sm:rounded-[14px] p-2 sm:p-2.5 pr-4 sm:pr-5 border border-[#F0ECE6] shadow-[0_12px_30px_rgba(0,25,40,0.09)] flex items-center gap-2.5 whitespace-nowrap transition-transform hover:scale-[1.03]">
                          <div
                            aria-hidden="true"
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-[8px] sm:rounded-[9px] bg-[#F1641E] shrink-0 shadow-xs"
                          />
                          <div>
                            <p className="font-sora text-[11px] sm:text-xs font-semibold text-[#002E40] leading-tight m-0">
                              Flight risk detected
                            </p>
                            <p className="font-sora text-[9.5px] sm:text-[10.5px] text-[#66777E] leading-tight m-0 mt-0.5">
                              6 weeks before resignation
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Priority 2 */}
                  <div className="rounded-[8px] px-3.5 py-2.5 bg-[#FBE5CE] flex items-center justify-between transition-transform hover:scale-[1.01]">
                    <span className="font-sora text-[11px] font-medium text-[#7C4410]">
                      Manager check-ins due
                    </span>
                    <span className="font-sora text-[11px] font-medium text-[#7C4410] tabular-nums">
                      <AnimatedCounter value={6} start={isTriggered} />
                    </span>
                  </div>

                  {/* Priority 3 + Floating Badge 3: Ready to Step Up */}
                  <div className="relative">
                    <div className="rounded-[8px] px-3.5 py-2.5 bg-[#D6E7D1] flex items-center justify-between transition-transform hover:scale-[1.01]">
                      <span className="font-sora text-[11px] font-medium text-[#2A532E]">
                        Growth opportunities
                      </span>
                      <span className="font-sora text-[11px] font-medium text-[#2A532E] tabular-nums">
                        <AnimatedCounter value={24} start={isTriggered} />
                      </span>
                    </div>

                    <div
                      className={`absolute top-[calc(100%-1px)] -right-10 sm:right-2 lg:right-0 z-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                        isTriggered
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-75 translate-y-4 pointer-events-none"
                      }`}
                      style={{ transitionDelay: isTriggered ? "440ms" : "0ms" }}
                    >
                      <div className="animate-float-3">
                        <div className="bg-white/95 backdrop-blur-md rounded-[12px] sm:rounded-[14px] px-3 py-2 sm:py-2 pr-4 sm:pr-1 border border-[#F0ECE6] shadow-[0_12px_30px_rgba(0,25,40,0.09)] flex items-center gap-2.5 whitespace-nowrap transition-transform hover:scale-[1.03]">
                          <div className="w-6 h-6 flex items-center justify-center shrink-0">
                            <Image
                              src="/Claripa-queen.png"
                              alt="Ready to step up"
                              width={18}
                              height={18}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-sora text-[11px] sm:text-xs font-semibold text-[#002E40] leading-tight m-0">
                              Ready to step up
                            </p>
                            <p className="font-sora text-[9.5px] sm:text-[10.5px] text-[#5C6D64] leading-tight m-0 mt-0.5">
                              Analyst · succession-ready
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Overlay Badge 1: Ask Claripa (Bottom Left - Pop-up on scroll) */}
            <div
              className={`mt-5 lg:mt-0 lg:absolute lg:bottom-4 lg:-left-14 xl:-left-16 z-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                isTriggered
                  ? "opacity-100 scale-100 translate-x-0 translate-y-0"
                  : "opacity-0 scale-75 -translate-x-6 translate-y-6 pointer-events-none"
              }`}
              style={{ transitionDelay: isTriggered ? "280ms" : "0ms" }}
            >
              <div className="animate-float-2">
                <div className="bg-[#FDF2EB] rounded-[14px] sm:rounded-[16px] p-3.5 sm:p-4 border border-[#F5E4D9]/80 shadow-[0_14px_34px_rgba(0,30,45,0.10)] max-w-[235px] sm:max-w-[248px] transition-transform hover:scale-[1.03]">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#168BA3]" aria-hidden="true" />
                    <span className="font-sora font-semibold text-xs text-[#002E40]">
                      Ask Claripa
                    </span>
                  </div>
                  <p className="font-sora text-[10px] sm:text-[11px] text-[#4C5D64] leading-[1.35] my-2">
                    2 people on your team show early disengagement signals. A growth conversation is recommended.
                  </p>
                  <button
                    type="button"
                    className="text-[#D95823] font-sora text-[10px] sm:text-[11px] font-medium inline-flex items-center gap-1 hover:underline cursor-pointer p-0 bg-transparent border-0"
                  >
                    View suggested actions →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
