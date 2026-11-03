"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { BreadcrumbBadge } from "@/reuseable/breadcrum";
import GradientBlinds from "@/reuseable/gradientBlinds";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden bg-white">
      {/* Background Hero Blinds Layer matching design */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Warm ambient radial glow centered on the top-right blinds cluster */}
        <div
          className="absolute -top-12 right-[5%] sm:right-[15%] w-[500px] sm:w-[700px] md:w-[850px] h-[450px] sm:h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(240,106,37,0.38),rgba(251,146,60,0.22),rgba(254,215,170,0.12),transparent_70%)] blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Crisp angled architectural blinds slats (instant render, exact match to design) */}
        <div
          className="absolute -top-24 right-0 sm:right-[5%] md:right-[10%] w-[450px] sm:w-[600px] md:w-[720px] h-[550px] sm:h-[700px] rotate-[18deg] origin-top-right flex justify-center gap-2 sm:gap-3.5 md:gap-5 pointer-events-none opacity-90"
          aria-hidden="true"
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="w-5 sm:w-8 md:w-11 h-full bg-gradient-to-b from-orange-500/35 via-amber-400/25 to-transparent border-x border-orange-400/20"
              style={{
                opacity: Math.max(0.1, 1 - Math.abs(i - 6) * 0.14),
              }}
            />
          ))}
        </div>

        {/* Interactive WebGL Shader Blinds Layer */}
        <div className="absolute -left-30 inset-0 pointer-events-auto">
          <GradientBlinds
            gradientColors={[
              "#FFFFFF",
              "#FFF5ED",
              "#FED7AA",
              "#FF7E2E",
              "#F06A25",
              "#FFA766",
              "#FED7AA",
              "#FFFFFF",
            ]}
            blindCount={20}
            angle={-18}
            noise={0.12}
            lightColor="#FFFFFF"
            lightMode={true}
            shine={0.5}
            relief={0.4}
            glow={0.7}
            sway={0.25}
            speed={0.8}
            hoverTilt={0.5}
            spotlightRadius={2.2}
            spotlightSoftness={0.7}
            spotlightOpacity={0.95}
            className="w-full h-full"
          />
        </div>

        {/* Soft bottom fade right above the dashboard */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"
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
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sora font-normal text-[#002E40] tracking-[-0.035em] leading-[1.08]">
            See the signals.
            <br />
            Make better people decisions.
          </h1>

          {/* 3. Subtitle matching Image 2 */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#62737A] max-w-4xl mx-auto leading-[1.2] tracking-tight font-normal">
            Claripa connects workforce data, performance signals and AI-powered
            intelligence to help HR leaders see what matters, understand
            what&apos;s next and act with confidence.
          </p>

          {/* 4. Action Buttons matching Image 2 */}
          <div className="mt-8 sm:mt-9 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center bg-[#254F5F] hover:bg-[#143B45] text-[#FBF7F3] text-xs sm:text-sm font-medium tracking-tight uppercase px-7 sm:px-8 py-3.5 rounded-full shadow-md shadow-teal-950/15 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              BOOK A DEMO
            </Link>
            <Link
              href="/platform"
              className="inline-flex items-center justify-center gap-1.5 bg-white/90 hover:bg-white border border-slate-300/80 hover:border-slate-400 text-slate-800 text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 sm:px-8 py-3.5 rounded-full shadow-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>EXPLORE PLATFORM</span>
              <ArrowUpRight className="w-4 h-4 text-slate-600" />
            </Link>
          </div>
        </div>

        {/* 5. Dashboard Preview Container with 3 Floating Indicator Cards matching Image 2 */}
        <div className="relative max-w-5xl lg:max-w-[1100px] mx-auto mt-12 sm:mt-16 md:mt-20">
          {/* Main Mockup Frame */}
          <div className="relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 md:p-3 bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(240,106,37,0.12),0_15px_35px_-10px_rgba(15,23,42,0.08)]">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-inner">
              <Image
                src="/claripa-dashboard.png"
                alt="Claripa AI Dashboard - Welcome back, Aarav"
                width={2496}
                height={1664}
                priority
                className="w-full h-auto object-cover block"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
              />
            </div>
          </div>

          {/* Floating Card 1: Left - "New hire on track" matching Image 2 */}
          <div className="absolute -left-2 sm:-left-6 lg:-left-10 top-[28%] sm:top-[32%] z-20 animate-float-slow">
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

          {/* Floating Card 2: Bottom-Left - "Ask Claripa" peach card matching Image 2 */}
          <div className="absolute -left-1 sm:-left-6 lg:-left-8 -bottom-8 sm:-bottom-10 md:-bottom-12 z-20 animate-float-delay">
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

          {/* Floating Card 3: Right - "Manager attention needed" matching Image 2 */}
          <div className="absolute -right-2 sm:-right-6 lg:-right-10 top-[45%] sm:top-[48%] z-20 animate-float-slow">
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
    </section>
  );
};

export default HeroSection;
