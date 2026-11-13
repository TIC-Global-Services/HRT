"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { BreadcrumbBadge } from "@/reuseable/breadcrum";
import FlutedGlassBackground from "@/reuseable/HeroBg";
import BlurText from "@/reuseable/BlurText";

const HeroSection: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (scrollY > 35) {
        setIsScrolled(true);
      } else if (scrollY < 15) {
        setIsScrolled(false);
      }
    };

    // Check initial scroll on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden bg-white">
      {/* Background Hero Blinds Layer (Interactive WebGL2 Shader preserving exact design shape) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex justify-center">
        <div className="relative w-full max-w-[1400px] h-[550px] sm:h-[700px] md:h-[860px] lg:h-[980px] -top-6 sm:-top-10 md:-top-14">
          {/* Instant SSR/first-paint fallback */}
          <Image
            src="/hero-gradient-blinds.png"
            alt="Claripa Hero Ambient Blinds Background"
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-contain object-top pointer-events-none"
          />
          {/* Live interactive WebGL2 Shader Layer */}
          <div className="absolute inset-0">
            <FlutedGlassBackground/>
          </div>
        </div>

        {/* Soft bottom fade right above the dashboard */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Top Breadcrumb Pill Tag matching Image 2 */}
        <div className="flex justify-center mb-6">
          <BreadcrumbBadge
            label="THE FUTURE OF PEOPLE DECISIONS"
            dotColor="#F06A25"
            className="shadow-xs hover:border-slate-300"
          />
        </div>

        {/* 2. Headline matching Image 2 */}
        <div className="text-center max-w-5xl mx-auto">
          <BlurText
            as="h1"
            delay={20}
            trigger="load"
            text={"From Performance Data to People\nIntelligence"}
            className="text-4xl sm:text-5xl md:text-6xl font-sora font-normal text-[#002E40] tracking-[-0.035em] leading-[1.08]"
          />

          {/* 3. Subtitle matching Image 2 */}
          <BlurText
            as="p"
            delay={20}
            trigger="load"
            text="Claripa is an AI-powered workforce intelligence platform that transforms people data into actionable insights, helping organisations improve performance and make better people decisions."
            className="mt-5 sm:mt-6 text-sm sm:text-base font-sora md:text-lg text-[#62737A] max-w-4xl mx-auto leading-[1.2] tracking-tight font-normal"
          />

          {/* 4. Action Buttons matching Image 2 */}
          <div className="mt-6 sm:mt-6 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center bg-[#254F5F]  hover:bg-[#143B45] text-[#FBF7F3] text-xs sm:text-sm font-medium font-mono tracking-tight uppercase px-7 sm:px-8 py-3.5 rounded-full shadow-md shadow-teal-950/15 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              BOOK A DEMO
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center justify-center gap-1.5 bg-white/90 hover:bg-white border border-slate-300/80 hover:border-slate-400 text-slate-800 text-xs sm:text-sm font-semibold tracking-tight font-geist uppercase px-7 sm:px-8 py-3.5 rounded-full shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>EXPLORE PLATFORM</span>
              <ArrowUpRight className="w-4 h-4 text-slate-600" />
            </Link>
          </div>
        </div>

        {/* 5. Dashboard Preview Container with 3 Floating Indicator Cards matching Image 2 */}
        <div className="relative max-w-5xl lg:max-w-[1100px] mx-auto mt-12 sm:mt-16 md:mt-10">
          {/* Main Mockup Frame */}
          <div className="relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 md:p-0 bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(240,106,37,0.12),0_15px_35px_-10px_rgba(15,23,42,0.08)]">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-inner">
              <Image
                src="/claripa-dashboard-new.png"
                alt="Claripa AI Dashboard - Welcome back, Aarav"
                width={2496}
                height={1664}
                priority
                className="w-full h-auto object-cover block"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
              />
            </div>
          </div>

          {/* Floating Card 1: Left - "New hire on track" */}
          <div
            className={`absolute -left-2 sm:-left-6 lg:-left-10 top-[28%] sm:top-[32%] z-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
              isScrolled
                ? "opacity-100 scale-100 translate-x-0 translate-y-0"
                : "opacity-0 scale-50 -translate-x-8 translate-y-6 pointer-events-none"
            }`}
            style={{ transitionDelay: isScrolled ? "100ms" : "0ms" }}
          >
            <div className="animate-float-1">
              <div className="bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_14px_30px_rgba(0,0,0,0.09)] rounded-2xl px-3.5 py-3 md:px-4 md:py-3.5 flex items-center gap-3 transition-transform hover:scale-[1.03]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ArrowUp className="w-4 h-4 stroke-[2.75]" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                    New hire on track
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5">
                    Week 3 · Design team
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card 2: Bottom-Left - "Ask Claripa" peach card */}
          <div
            className={`absolute -left-1 sm:-left-6 lg:-left-8 -bottom-8 sm:-bottom-10 md:-bottom-12 z-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
              isScrolled
                ? "opacity-100 scale-100 translate-x-0 translate-y-0"
                : "opacity-0 scale-50 -translate-x-6 translate-y-10 pointer-events-none"
            }`}
            style={{ transitionDelay: isScrolled ? "280ms" : "0ms" }}
          >
            <div className="animate-float-2">
              <div className="bg-[#FFF6EF] border border-[#FED7AA]/80 shadow-[0_18px_36px_rgba(240,106,37,0.14)] rounded-2xl p-4 sm:p-5 max-w-[280px] sm:max-w-[340px] text-left transition-transform hover:scale-[1.02]">
                <div className="flex items-center gap-1.5 text-slate-900">
                  <Sparkles className="w-4 h-4 text-[#F06A25] fill-[#F06A25]" />
                  <span className="text-xs sm:text-[13px] font-bold tracking-tight">
                    Ask Claripa
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-normal mt-2">
                  2 people on your team show early disengagement signals. A growth
                  conversation this week is recommended.
                </p>
                <Link
                  href="/solution-details"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#EA580C] hover:text-[#C2410C] mt-2.5 transition-colors group"
                >
                  <span>View suggested actions</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Floating Card 3: Right - "Manager attention needed" */}
          <div
            className={`absolute -right-2 sm:-right-6 lg:-right-10 top-[45%] sm:top-[48%] z-20 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
              isScrolled
                ? "opacity-100 scale-100 translate-x-0 translate-y-0"
                : "opacity-0 scale-50 translate-x-8 translate-y-6 pointer-events-none"
            }`}
            style={{ transitionDelay: isScrolled ? "460ms" : "0ms" }}
          >
            <div className="animate-float-3">
              <div className="bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_14px_30px_rgba(0,0,0,0.09)] rounded-2xl px-3.5 py-3 md:px-4 md:py-3.5 flex items-center gap-3 transition-transform hover:scale-[1.03]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F06A25] text-white flex items-center justify-center shrink-0 font-black text-sm sm:text-base shadow-xs select-none">
                  !
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-snug">
                    Manager attention needed
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5">
                    Sales · sentiment dipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
