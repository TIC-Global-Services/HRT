"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Crown } from "lucide-react";
import { AnimatedCounter } from "@/lib/useCountUp";
import BlurText from "@/reuseable/BlurText";

export interface SolutionsHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

function RetentionPreview({ isTriggered }: { isTriggered: boolean }) {
  const barHeights = [92, 85, 75, 55, 38, 26];

  return (
    <article className="relative min-w-0 p-5 rounded-[23px] border border-[#eee6df] bg-white/85 shadow-[0_22px_42px_rgba(28,43,48,0.09)] min-h-[220px] lg:mt-9.5 pt-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_28px_50px_rgba(28,43,48,0.14)]">
      <div className="font-mono text-[9px] text-[#7d8587] tracking-wider uppercase mb-7 leading-normal">
        RETAIN KEY TALENT
      </div>
      <AlertCircle
        aria-hidden="true"
        className="absolute top-5 right-4.5 p-1.5 rounded-[9px] bg-[#ff6b0a] text-white shadow-xs"
        size={28}
      />
      <h3 className="text-base font-semibold text-[#292b2c] tracking-[-0.03em] leading-tight">
        Flight risk detected
      </h3>
      <p className="text-xs text-[#7e898c] mt-1 leading-normal">
        Senior Engineer · 6 weeks before resignation
      </p>
      <div className="flex h-[42px] items-end gap-1 mt-5" aria-hidden="true">
        {barHeights.map((h, idx) => (
          <span
            key={idx}
            className={`flex-1 rounded-t-[5px] rounded-b-[2px] transition-all duration-1000 ease-out ${
              idx < 3 ? "bg-[#285768]" : idx === 3 ? "bg-[#f4a15f]" : "bg-[#ff6b0a]"
            }`}
            style={{
              height: isTriggered ? `${h}%` : "0%",
              transitionDelay: `${idx * 80 + 200}ms`,
            }}
          />
        ))}
      </div>
      <div className="mt-1.5 text-[10px] text-[#7e898c]">
        Engagement signal, last 6 weeks
      </div>
    </article>
  );
}

function RampUpPreview({ isTriggered }: { isTriggered: boolean }) {
  return (
    <article className="min-w-0 p-5 rounded-[23px] border border-[#eee6df] bg-[#fffcf9] shadow-[0_22px_42px_rgba(28,43,48,0.09)] min-h-[224px] lg:-mt-9 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_28px_50px_rgba(28,43,48,0.14)]">
      <div className="font-mono text-[9px] text-[#7d8587] tracking-wider uppercase mb-3.5 leading-normal">
        ONBOARD &amp; RAMP UP
      </div>
      <h3 className="text-base font-semibold text-[#292b2c] tracking-[-0.03em] leading-tight">
        New-hire ramp-up
      </h3>
      <p className="text-xs text-[#7e898c] mt-0.5 mb-3 leading-normal">
        Cohort of 12 · week 3
      </p>
      <div className="flex items-center justify-between mt-2 text-[11px] text-[#45494a]">
        <span>On track</span>
        <strong className="text-[#4a9145] font-semibold tabular-nums">
          <AnimatedCounter value={9} start={isTriggered} />
        </strong>
      </div>
      <div className="h-1.25 overflow-hidden rounded-full bg-[#efedea] w-full mt-1">
        <span
          className="block h-full rounded-full bg-[#4f9a4c] transition-all duration-1000 ease-out"
          style={{
            width: isTriggered ? "76%" : "0%",
            transitionDelay: "200ms",
          }}
        />
      </div>
      <div className="flex items-center justify-between mt-2 text-[11px] text-[#45494a]">
        <span>Early friction</span>
        <strong className="text-[#e66c2c] font-semibold tabular-nums">
          <AnimatedCounter value={3} start={isTriggered} />
        </strong>
      </div>
      <div className="h-1.25 overflow-hidden rounded-full bg-[#efedea] w-full mt-1">
        <span
          className="block h-full rounded-full bg-[#ff6b0a] transition-all duration-1000 ease-out"
          style={{
            width: isTriggered ? "27%" : "0%",
            transitionDelay: "400ms",
          }}
        />
      </div>
      <div className="mt-3 text-[10px] font-semibold text-[#df641d]">
        Schedule role-clarity check-ins →
      </div>
    </article>
  );
}

function PerformancePreview({ isTriggered }: { isTriggered: boolean }) {
  return (
    <article className="min-w-0 p-5 rounded-[23px] border border-[#eee6df] bg-[#fffaf5] shadow-[0_22px_42px_rgba(28,43,48,0.09)] min-h-[217px] lg:mt-14 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_28px_50px_rgba(28,43,48,0.14)]">
      <div className="font-mono text-[9px] text-[#7d8587] tracking-wider uppercase mb-4 leading-normal">
        CONTINUOUS PERFORMANCE
      </div>
      <h3 className="text-base font-semibold text-[#292b2c] tracking-[-0.03em] leading-tight">
        Goal alignment
      </h3>
      <div className="mt-1.5 text-[40px] font-normal text-[#263638] tracking-[-0.06em] leading-tight flex items-baseline gap-2 tabular-nums">
        <AnimatedCounter value={82} start={isTriggered} suffix="%" />
        <span className="text-[11px] font-semibold text-[#4e8d42] tracking-normal inline-flex items-center">
          <AnimatedCounter value={27} start={isTriggered} prefix="↑ " suffix="%" />
        </span>
      </div>
      <svg
        aria-label="Goal alignment trending upward"
        className="w-full h-12 mt-3.5 block overflow-visible"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 220 54"
      >
        <polyline
          fill="none"
          points="0,43 38,39 76,42 115,29 154,24 190,11 220,4"
          stroke="#ff6b0a"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="300"
          style={{
            strokeDashoffset: isTriggered ? 0 : 300,
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </svg>
    </article>
  );
}

function SuccessionPreview() {
  return (
    <article className="min-w-0 p-5 rounded-[23px] border border-[#345b60] bg-[#355a5d] text-white shadow-[0_22px_42px_rgba(28,43,48,0.09)] min-h-[198px] lg:-mt-2.5 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_28px_50px_rgba(28,43,48,0.14)]">
      <div className="font-mono text-[9px] text-[#f39963] tracking-wider uppercase mb-4 leading-normal">
        GROW &amp; PLAN SUCCESSION
      </div>
      <div className="flex items-center gap-3 mt-4">
        <span className="w-11 h-11 shrink-0 rounded-[13px] bg-[#241a12] text-[#ff6b0a] flex items-center justify-center shadow-xs">
          <Crown aria-hidden="true" size={22} />
        </span>
        <div>
          <h3 className="text-base font-semibold text-white tracking-[-0.03em] leading-tight">
            Ready to step up
          </h3>
          <p className="text-xs text-[#c0cbcb] mt-0.5 leading-normal">
            Analyst → Team Lead
          </p>
        </div>
      </div>
      <p className="mt-4 p-3 rounded-[13px] bg-white/10 text-[#d3dddd] text-[11px] leading-relaxed">
        3 succession-ready people in Engineering this quarter.
      </p>
    </article>
  );
}

export default function SolutionsHero({
  eyebrow = "Solutions",
  title = "Intelligence for the people decisions that matter most.",
  description = "Losing key people, slow ramp-up, performance you can’t see in time. Claripa reads the signals your HR systems already capture and puts them in front of the people who can act.",
  ctaText = "Book a demo",
  ctaHref = "/contact-us",
}: SolutionsHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      let inView = false;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        inView = rect.top < windowHeight * 0.9;
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
    <section className="pt-10 sm:pt-12 pb-0">
      <div className="flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <p className="inline-flex items-center gap-2 text-[#ff6b0a] font-mono text-lg font-semibold tracking-wide">
          {eyebrow}
        </p>
        <BlurText
          as="h1"
          text={title}
          trigger="load"
          delay={20}
          className="max-w-[860px] my-2.5 text-[#003247] text-3xl sm:text-5xl md:text-[58px] lg:text-[62px] font-normal tracking-[-0.05em] leading-[1.02]"
        />
        <BlurText
          as="p"
          text={description}
          trigger="load"
          delay={20}
          className="max-w-[820px] text-[#71838a] text-sm sm:text-base font-normal font-sora leading-[1.2]"
        />
        <Link
          className="inline-flex min-h-[50px] items-center justify-center gap-2 mt-6 px-7 rounded-full bg-[#285768] hover:bg-[#1d4655] text-white font-mono text-xs tracking-tight uppercase transition-all duration-200 hover:-translate-y-0.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b0a] focus-visible:ring-offset-2"
          href={ctaHref}
        >
          {ctaText}
        </Link>
      </div>

      {/* 
        Examples of workforce insights: 4 preview cards with staggered pop-up spring transitions on scroll 
      */}
      <div
        ref={containerRef}
        aria-label="Examples of workforce insights"
        className="mt-9 mx-4 sm:mx-6 lg:mx-auto max-w-[1330px] min-h-[436px] flex items-center justify-center p-6 sm:p-10 lg:px-14 overflow-hidden rounded-[28px] border border-[#b7cdd2] bg-gradient-to-r from-white via-[#fffaf5] to-[#fff0e4]"
        role="group"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 w-full max-w-[1112px] items-center">
          {/* Card 1: Retention */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
              isTriggered
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-75 translate-y-8 pointer-events-none"
            }`}
            style={{ transitionDelay: isTriggered ? "100ms" : "0ms" }}
          >
            <RetentionPreview isTriggered={isTriggered} />
          </div>

          {/* Card 2: Ramp Up */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
              isTriggered
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-75 translate-y-8 pointer-events-none"
            }`}
            style={{ transitionDelay: isTriggered ? "240ms" : "0ms" }}
          >
            <RampUpPreview isTriggered={isTriggered} />
          </div>

          {/* Card 3: Performance */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
              isTriggered
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-75 translate-y-8 pointer-events-none"
            }`}
            style={{ transitionDelay: isTriggered ? "380ms" : "0ms" }}
          >
            <PerformancePreview isTriggered={isTriggered} />
          </div>

          {/* Card 4: Succession */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
              isTriggered
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-75 translate-y-8 pointer-events-none"
            }`}
            style={{ transitionDelay: isTriggered ? "520ms" : "0ms" }}
          >
            <SuccessionPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
