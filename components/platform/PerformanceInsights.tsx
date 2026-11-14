"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";

export interface PerformanceInsightRow {
  name: string;
  status: string;
  value: string;
  barWidth: string;
  barColor: string;
  statusColor: string;
}

const defaultRows: PerformanceInsightRow[] = [
  {
    name: "Engineering",
    status: "Reviews in progress",
    value: "84%",
    barWidth: "w-4/5",
    barColor: "bg-[#f8780c]",
    statusColor: "text-[#d94c0b]",
  },
  {
    name: "Customer Success",
    status: "Check-ins active",
    value: "72%",
    barWidth: "w-2/3",
    barColor: "bg-[#f7a166]",
    statusColor: "text-[#a55b00]",
  },
  {
    name: "Operations & Finance",
    status: "OKRs aligned",
    value: "91%",
    barWidth: "w-11/12",
    barColor: "bg-[#254f5f]",
    statusColor: "text-[#28733d]",
  },
];

export interface PerformanceInsightsProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  rows?: PerformanceInsightRow[];
}

// Smooth requestAnimationFrame count-up hook with cubic ease-out
function useCountUp(target: number, duration: number = 1400, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    // Respect user's motion preferences
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rafId = requestAnimationFrame(() => setCount(target));
      return () => cancelAnimationFrame(rafId);
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic: 1 - Math.pow(1 - progress, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, start]);

  return count;
}

function AnimatedPercent({
  value,
  start,
  duration = 1400,
}: {
  value: number;
  start: boolean;
  duration?: number;
}) {
  const count = useCountUp(value, duration, start);
  return <span>{count}%</span>;
}

export default function PerformanceInsights({
  eyebrow = "ANALYTICS",
  title = "Make Better Decisions with Performance Insights.",
  description = "Claripa brings performance information into a structured view, helping leaders and HR teams understand goal progress, review performance, and identify areas that may require attention.",
  rows = defaultRows,
}: PerformanceInsightsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="performance-insights-title"
      className="px-5 py-16 sm:px-[5%] md:py-24"
      id="performance-insights"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="hidden lg:block">
          <SectionHeading
            eyebrow={eyebrow}
            id="performance-insights-title"
            title={title}
            
            description={description}
          />
        </div>
        <div className="lg:hidden">
          <SectionHeading
            eyebrow={eyebrow}
            id="performance-insights-title"
            title={title}
            centered
            description={description}
          />
        </div>

        {/* Dashboard Preview Card with Counting Animations */}
        <div
          ref={containerRef}
          className="rounded-[26px] border border-[#e9e6e1] bg-white p-5 shadow-[0_24px_70px_rgba(37,79,95,0.12)] sm:p-7 transition-all"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="m-0 font-mono text-[8px] md:text-[11px] uppercase tracking-wide text-[#62737a]">
              Organizational Performance Overview
            </p>
            <span className="font-mono text-[8px] md:text-[11px] uppercase tracking-wide text-[#8C9DA3]">
              Illustrative Data
            </span>
          </div>

          {/* Metric Cards with Animated Counters */}
          <div className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#F7F6F3] p-4 transition-transform hover:scale-[1.02]">
              <p className="m-0 text-xs text-[#62737a]">OKR goal alignment</p>
              <p className="mb-0 mt-1 text-2xl font-medium text-[#d94c0b] tabular-nums">
                <AnimatedPercent value={84} start={hasAnimated} duration={1400} />
              </p>
            </div>
            <div className="rounded-2xl bg-[#F7F6F3] p-4 transition-transform hover:scale-[1.02]">
              <p className="m-0 text-xs text-[#62737a]">Task completion</p>
              <p className="mb-0 mt-1 text-2xl font-medium text-[#254f5f] tabular-nums">
                <AnimatedPercent value={76} start={hasAnimated} duration={1400} />
              </p>
            </div>
            <div className="rounded-2xl bg-[#F7F6F3] p-4 transition-transform hover:scale-[1.02]">
              <p className="m-0 text-xs text-[#62737a]">Review completion</p>
              <p className="mb-0 mt-1 text-2xl font-medium text-[#254f5f] tabular-nums">
                <AnimatedPercent value={88} start={hasAnimated} duration={1400} />
              </p>
            </div>
          </div>

          {/* Department Progress Rows with Animated Bar & Value */}
          <div className="space-y-4">
            {rows.map((row, index) => {
              const numericValue = parseInt(row.value, 10) || 0;

              return (
                <div key={row.name} className="group">
                  <div className="mb-1.5 flex items-center justify-between gap-4 text-xs md:text-sm">
                    <span className="text-[#27383d] font-medium">{row.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#002e40] tabular-nums">
                        <AnimatedPercent
                          value={numericValue}
                          start={hasAnimated}
                          duration={1200 + index * 150}
                        />
                      </span>
                      <span className="text-[#8C9DA3] text-xs">·</span>
                      <span className={`font-semibold text-[10px] md:text-xs ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </div>
                  </div>
                  <div
                    aria-label={`${row.name}: ${row.value}`}
                    className="h-2 overflow-hidden rounded-full bg-[#edf1f1]"
                    role="img"
                  >
                    <span
                      className={`block h-full rounded-full ${row.barColor} transition-all duration-1000 ease-out`}
                      style={{
                        width: hasAnimated ? `${numericValue}%` : "0%",
                        transitionDelay: `${index * 120}ms`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
