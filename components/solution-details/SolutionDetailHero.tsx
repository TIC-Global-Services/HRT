"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Play, Sparkles } from "lucide-react";
import BlurText from "@/reuseable/BlurText";
import type { SolutionDashboardData } from "@/data/solutions";

export interface SolutionDetailHeroProps {
  breadcrumb?: string;
  title?: string;
  description?: string;
  talkText?: string;
  talkHref?: string;
  overviewText?: string;
  overviewHref?: string;
  bannerSrc?: string;
  dashboard?: SolutionDashboardData;
}

const defaultDashboard: SolutionDashboardData = {
  floatingBadgeTitle: "24 Goals Need Attention",
  floatingBadgeSubtitle: "across aligned teams",
  eyebrow: "GOAL ALIGNMENT · ORGANIZATION-WIDE",
  attentionBadge: "24 NEED ATTENTION",
  heading: "24 Goals Need Attention",
  rows: [
    {
      initials: "01",
      title: "Organizational Goal Alignment",
      subtitle: "Company objectives vs. department targets",
      severity: "High",
      progress: 85,
      highlighted: true,
    },
    {
      initials: "DP",
      title: "Department Progress",
      subtitle: "Team OKRs trailing quarterly milestones",
      severity: "Medium",
      progress: 58,
    },
    {
      initials: "OK",
      title: "Individual OKR Tracking",
      subtitle: "Goals awaiting mid-cycle alignment check",
      severity: "Medium",
      progress: 50,
    },
  ],
  suggestedNextStep:
    "Review goals that are falling behind and realign team priorities.",
};

export default function SolutionDetailHero({
  breadcrumb = "HOME / SOLUTIONS / ALIGN GOALS AND IMPROVE PERFORMANCE",
  title = "Align every goal with the\nbigger picture.",
  description = "Connect organizational objectives with team priorities and individual contributions. Claripa helps you create aligned goals, track performance and identify gaps before they impact business outcomes.",
  talkText = "BOOK A DEMO",
  talkHref = "/contact-us",
  overviewText = "WATCH OVERVIEW",
  overviewHref = "#the-solution",
  dashboard = defaultDashboard,
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
        <div className="text-center mb-9 sm:mb-12">
          <BlurText
            as="h1"
            text={title}
            trigger="load"
            delay={20}
            className="font-sora text-[#002E40] text-4xl sm:text-5xl lg:text-[58px] font-normal tracking-tight leading-[1.08] mb-5 whitespace-pre-line"
          />

          <BlurText
            as="p"
            text={description}
            trigger="load"
            delay={20}
            className="font-sora text-[#62737A] text-sm sm:text-base lg:text-lg leading-[1.3] max-w-4xl whitespace-pre-line mx-auto mb-8"
          />

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
            {/* Single Floating Pop-Up Card (overlapping top-left of title and row 1) */}
            <div
              className={`absolute -left-4 sm:-left-8 lg:-left-10 top-11 sm:top-22 z-30 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
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
                      {dashboard.floatingBadgeTitle}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-medium text-[#71828A] mt-0.5 whitespace-nowrap">
                      {dashboard.floatingBadgeSubtitle}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inner Dashboard Card */}
            <div className="w-full rounded-t-[24px] sm:rounded-t-[28px]  border border-[#ECE7E0] bg-white shadow-[0_12px_44px_rgba(0,46,64,0.06)] p-4 sm:p-6 lg:p-7">
              {/* Header: Eyebrow + Badge */}
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <p className="font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-[#71828A] m-0 font-medium">
                  {dashboard.eyebrow}
                </p>

                <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#D45218] bg-[#FCEEE6] border border-[#FADCCB] px-3 py-1 rounded-full whitespace-nowrap">
                  {dashboard.attentionBadge}
                </span>
              </div>

              {/* Main Cohort Title */}
              <h2 className="font-sora text-xl sm:text-[22px] font-semibold text-[#002E40] tracking-tight mb-3.5 sm:mb-4">
                {dashboard.heading}
              </h2>

              {/* Signal Rows */}
              <div className="space-y-2 sm:space-y-2.5">
                {dashboard.rows.map((row, index) => {
                  const isHighlighted = row.highlighted ?? index === 0;
                  const delayMs = 200 + index * 150;

                  if (isHighlighted) {
                    return (
                      <div
                        key={row.title}
                        className="rounded-2xl p-3 sm:p-3.5 bg-[#FFF4ED] border border-[#FCE4D6] flex items-center justify-between gap-3 sm:gap-4 transition-all hover:border-[#FAD2BD]"
                      >
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
                              {row.title}
                            </div>
                            <div className="font-sora text-[11px] sm:text-xs text-[#71828A] truncate mt-0.5">
                              {row.subtitle}
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 flex flex-col items-end">
                          <div className="w-24 sm:w-32 md:w-36 h-1.5 sm:h-2 bg-[#F6DDD0] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#E85D1B] rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: isTriggered ? `${row.progress}%` : "0%",
                                transitionDelay: isTriggered ? `${delayMs}ms` : "0ms",
                              }}
                            />
                          </div>
                          <span className="text-[11px] sm:text-xs font-semibold text-[#D45218] mt-1">
                            {row.severity}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={row.title}
                      className="rounded-2xl p-3 sm:p-3.5 bg-white border border-[#ECE7E0] flex items-center justify-between gap-3 sm:gap-4 transition-all hover:border-[#DDD7CF]"
                    >
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EBF1F5] text-[#254F5F] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {row.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="font-sora text-xs sm:text-sm font-semibold text-[#002E40] truncate">
                            {row.title}
                          </div>
                          <div className="font-sora text-[11px] sm:text-xs text-[#71828A] truncate mt-0.5">
                            {row.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 flex flex-col items-end">
                        <div className="w-24 sm:w-32 md:w-36 h-1.5 sm:h-2 bg-[#EFECE8] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#F07A38] rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: isTriggered ? `${row.progress}%` : "0%",
                              transitionDelay: isTriggered ? `${delayMs}ms` : "0ms",
                            }}
                          />
                        </div>
                        <span className="text-[11px] sm:text-xs font-semibold text-[#B5591C] mt-1">
                          {row.severity}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Action Section: Suggested Next Step */}
              <div className="mt-3 sm:mt-3.5 rounded-2xl p-3.5 sm:p-4 bg-[#FFF6EF] border border-[#FADECB] flex items-start gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-transparent text-[#0088A3] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={18} className="text-[#0088A3]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-[9px] sm:text-[11px] font-semibold text-[#52636A] uppercase tracking-wider mb-0.5">
                    SUGGESTED NEXT STEP
                  </p>
                  <p className="font-sora text-xs sm:text-sm text-[#002E40] leading-relaxed m-0">
                    {dashboard.suggestedNextStep}
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
