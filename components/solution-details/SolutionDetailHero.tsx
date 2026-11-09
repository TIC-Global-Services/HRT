"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Play, Sparkles } from "lucide-react";

export interface SolutionDetailHeroProps {
  breadcrumb?: string;
  title?: string;
  description?: string;
  talkText?: string;
  talkHref?: string;
  overviewText?: string;
  overviewHref?: string;
  bannerSrc?: string;
}

export default function SolutionDetailHero({
  breadcrumb = "HOME / SOLUTIONS / SOLUTION DETAIL",
  title = "Align every goal with the bigger picture.",
  description = "Connect organizational objectives with team priorities and individual contributions. Claripa helps you create aligned goals, track performance and identify gaps before they impact business outcomes.",
  talkText = "BOOK A DEMO",
  talkHref = "/contact-us",
  overviewText = "WATCH OVERVIEW",
  overviewHref = "#the-solution",
}: SolutionDetailHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      let inView = false;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        inView = rect.top < windowHeight * 0.88;
      }

      if (scrollY > 30 || inView) {
        setIsTriggered(true);
      } else if (scrollY < 10) {
        setIsTriggered(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-6 pb-14 sm:pt-10 sm:pb-20 bg-[#F7F6F3]">
      <div className="px-[5%]">
        {/* Top Breadcrumb */}
        <div className="mb-8 sm:mb-12">
          <p className="font-mono text-xs uppercase tracking-wider text-[#62737A] m-0">
            {breadcrumb}
          </p>
        </div>

        {/* Centered Heading & Lead Text */}
        <div className="max-w-4xl mx-auto text-center mb-9 sm:mb-12">
          <h1 className="font-sora text-[#002E40] text-4xl sm:text-5xl lg:text-[58px] font-normal tracking-[-0.04em] leading-[1.08] mb-5">
            {title}
          </h1>

          <p className="font-sora text-[#62737A] text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-2xl mx-auto mb-8">
            {description}
          </p>

          {/* Centered Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href={talkHref}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#1C3B47] text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#122A33] transition-all hover:-translate-y-0.5 shadow-sm"
            >
              {talkText}
            </Link>

            <a
              href={overviewHref}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white border border-[#ECE9E3] text-[#002E40] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#F7F6F3] transition-all hover:-translate-y-0.5 shadow-sm group"
            >
              <span className="w-5 h-5 rounded-full border border-[#002E40] flex items-center justify-center text-[#002E40] group-hover:border-[#F8780C] group-hover:text-[#F8780C] transition-colors">
                <Play size={9} className="fill-current ml-0.5" />
              </span>
              {overviewText}
            </a>
          </div>
        </div>

        {/* Outer Banner Card Container with Right-Side Warm Glow and Centered Mockup */}
        <div
          ref={containerRef}
          className={`relative w-full h-[450px] sm:h-[490px] lg:h-[515px] rounded-[28px] sm:rounded-[36px] border border-[#ECE9E3] bg-white overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.02)] pt-8 sm:pt-12 px-4 sm:px-8 flex flex-col items-center justify-start transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
            isTriggered
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-6"
          }`}
        >
          {/* Right-Side Ambient Warm Peach/Orange Glow matching the reference image */}
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-[48%] bg-gradient-to-l from-[#FFE7D5]/70 via-[#FFF3E8]/40 to-transparent pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -right-16 top-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#FFBA86]/25 rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -top-20 right-10 w-72 h-72 bg-[#FFEADB]/40 rounded-full blur-2xl pointer-events-none"
          />

          {/* Centered Inner Dashboard Card Container */}
          <div className="relative z-10 w-full max-w-[560px] sm:max-w-[600px] mx-auto shrink-0">
            {/* Single Floating Pop-Up Card: Flagged 6 weeks early (overlapping top-left of title and row 1) */}
            <div
              className={`absolute -left-4 sm:-left-8 lg:-left-10 top-11 sm:top-13 z-30 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                isTriggered
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-75 -translate-y-4 pointer-events-none"
              }`}
              style={{ transitionDelay: isTriggered ? "180ms" : "0ms" }}
            >
              <div className="animate-float-1">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 pr-4 sm:pr-5 border border-slate-100/90 shadow-[0_16px_36px_rgba(0,46,64,0.12)] flex items-center gap-2.5 sm:gap-3 transition-transform hover:scale-[1.03]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F06A25] text-white flex items-center justify-center shrink-0 shadow-sm font-bold text-base leading-none">
                    !
                  </div>
                  <div className="text-left">
                    <div className="text-xs sm:text-[13px] font-bold text-[#002E40] leading-tight whitespace-nowrap font-sora">
                      Flagged 6 weeks early
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-medium text-[#71828A] mt-0.5 whitespace-nowrap">
                      before any resignation
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inner Dashboard Card */}
            <div className="w-full rounded-t-[24px] sm:rounded-t-[28px] rounded-b-[18px] border border-[#ECE7E0] bg-white shadow-[0_12px_44px_rgba(0,46,64,0.06)] p-4 sm:p-6 lg:p-7">
              {/* Header: Eyebrow + Badge */}
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <p className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-[#71828A] m-0 font-medium">
                  RETENTION WATCH · ENGINEERING
                </p>

                <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#D45218] bg-[#FCEEE6] border border-[#FADCCB] px-3 py-1 rounded-full whitespace-nowrap">
                  6 NEED ATTENTION
                </span>
              </div>

              {/* Main Cohort Title */}
              <h2 className="font-sora text-xl sm:text-[22px] font-semibold text-[#002E40] tracking-tight mb-3.5 sm:mb-4">
                Flight risk: 3–5 yr cohort
              </h2>

              {/* Employee Rows */}
              <div className="space-y-2 sm:space-y-2.5">
                {/* Row 1: High Risk (Highlighted) */}
                <div className="rounded-2xl p-3 sm:p-3.5 bg-[#FFF4ED] border border-[#FCE4D6] flex items-center justify-between gap-3 sm:gap-4 transition-all hover:border-[#FAD2BD]">
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFE4D4] border border-[#FCD4BE] flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-[#D45218]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="font-sora text-xs sm:text-sm font-semibold text-[#002E40] truncate">
                        Senior Engineer · Platform
                      </div>
                      <div className="font-sora text-[11px] sm:text-xs text-[#71828A] truncate mt-0.5">
                        No 1:1 in 5 weeks · growth stalled
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-end">
                    <div className="w-24 sm:w-32 md:w-36 h-1.5 sm:h-2 bg-[#F6DDD0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E85D1B] rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isTriggered ? "90%" : "0%",
                          transitionDelay: isTriggered ? "200ms" : "0ms",
                        }}
                      />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-[#D45218] mt-1">
                      High
                    </span>
                  </div>
                </div>

                {/* Row 2: Medium Risk (PK) */}
                <div className="rounded-2xl p-3 sm:p-3.5 bg-white border border-[#ECE7E0] flex items-center justify-between gap-3 sm:gap-4 transition-all hover:border-[#DDD7CF]">
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EBF1F5] text-[#254F5F] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      PK
                    </div>
                    <div className="min-w-0">
                      <div className="font-sora text-xs sm:text-sm font-semibold text-[#002E40] truncate">
                        Tech Lead · Payments
                      </div>
                      <div className="font-sora text-[11px] sm:text-xs text-[#71828A] truncate mt-0.5">
                        Feedback volume down 40%
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-end">
                    <div className="w-24 sm:w-32 md:w-36 h-1.5 sm:h-2 bg-[#EFECE8] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F07A38] rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isTriggered ? "55%" : "0%",
                          transitionDelay: isTriggered ? "350ms" : "0ms",
                        }}
                      />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-[#B5591C] mt-1">
                      Medium
                    </span>
                  </div>
                </div>

                {/* Row 3: Medium Risk (SN) */}
                <div className="rounded-2xl p-3 sm:p-3.5 bg-white border border-[#ECE7E0] flex items-center justify-between gap-3 sm:gap-4 transition-all hover:border-[#DDD7CF]">
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EBF1F5] text-[#254F5F] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      SN
                    </div>
                    <div className="min-w-0">
                      <div className="font-sora text-xs sm:text-sm font-semibold text-[#002E40] truncate">
                        Engineer II · Data
                      </div>
                      <div className="font-sora text-[11px] sm:text-xs text-[#71828A] truncate mt-0.5">
                        Pay below band for role
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-end">
                    <div className="w-24 sm:w-32 md:w-36 h-1.5 sm:h-2 bg-[#EFECE8] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F07A38] rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isTriggered ? "50%" : "0%",
                          transitionDelay: isTriggered ? "500ms" : "0ms",
                        }}
                      />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-[#B5591C] mt-1">
                      Medium
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Section: Suggested Next Step */}
              <div className="mt-3 sm:mt-3.5 rounded-2xl p-3.5 sm:p-4 bg-[#FFF6EF] border border-[#FADECB] flex items-start gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-transparent text-[#0088A3] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={18} className="text-[#0088A3]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-[9px] sm:text-[10px] font-semibold text-[#52636A] uppercase tracking-wider mb-0.5">
                    SUGGESTED NEXT STEP
                  </p>
                  <p className="font-sora text-xs sm:text-[13px] text-[#002E40] leading-relaxed m-0">
                    Book a growth conversation with your Senior Engineer this week, and share the Team Lead path.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
