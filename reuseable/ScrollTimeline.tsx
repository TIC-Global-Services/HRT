"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface ScrollTimelineItem {
  id?: string | number;
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  extra?: React.ReactNode;
}

export interface ScrollTimelineProps {
  items: ScrollTimelineItem[];
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
  lineColor?: string;
  activeLineColor?: string;
}

export default function ScrollTimeline({
  items,
  className,
  activeColor = "#F06A25",
  inactiveColor = "#254e5e",
  lineColor = "#E2E8F0",
  activeLineColor = "#F06A25",
}: ScrollTimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progressHeight, setProgressHeight] = useState<number>(0);

  const updateActiveStep = useCallback(() => {
    if (!itemRefs.current.length) return;
    const triggerPoint = window.innerHeight * 0.55;

    let current = 0;
    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= triggerPoint) {
        current = idx;
      }
    });

    // If near the bottom of the section, ensure the last item is active
    const lastEl = itemRefs.current[items.length - 1];
    if (lastEl) {
      const lastRect = lastEl.getBoundingClientRect();
      if (lastRect.top <= window.innerHeight * 0.75) {
        current = items.length - 1;
      }
    }

    setActiveIndex(current);

    const activeEl = itemRefs.current[current];
    if (activeEl) {
      setProgressHeight(activeEl.offsetTop);
    }
  }, [items.length]);

  useEffect(() => {
    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);

    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, [updateActiveStep]);

  return (
    <div className={cn("relative w-full max-w-lg mx-auto py-4 select-none", className)}>
      {/* Background Guide Line */}
      <div
        className="absolute left-[21px] sm:left-[23px] top-[24px] bottom-[30px] w-[2px] pointer-events-none"
        style={{ backgroundColor: lineColor }}
        aria-hidden="true"
      />

      {/* Active Animated Progress Line */}
      <div
        className="absolute left-[21px] sm:left-[23px] top-[24px] w-[2px] transition-all duration-500 ease-out pointer-events-none"
        style={{
          backgroundColor: activeLineColor,
          height: `${progressHeight}px`,
        }}
        aria-hidden="true"
      />

      {/* Timeline Items List */}
      <div className="flex flex-col">
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;

          return (
            <div
              key={item.id ?? idx}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              onClick={() => {
                const el = itemRefs.current[idx];
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="group relative flex items-start cursor-pointer pb-8 sm:pb-10 last:pb-2"
            >
              {/* Circle Badge Indicator */}
              <div className="relative shrink-0 flex items-center justify-center">
                <div
                  className={cn(
                    "w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-mono font-bold tracking-tight select-none z-10 transition-all duration-500",
                    isActive
                      ? "shadow-[0_0_16px_rgba(240,106,37,0.5)] scale-105"
                      : "opacity-100 hover:opacity-100"
                  )}
                  style={{
                    backgroundColor: isActive ? activeColor : inactiveColor,
                  }}
                >
                  <span
                    className={cn(
                      "font-bold uppercase",
                      typeof item.badge === "string" && item.badge.length > 4
                        ? "text-[10px] sm:text-[11px] tracking-tight"
                        : "text-[11px] sm:text-xs"
                    )}
                  >
                    {item.badge ?? idx + 1}
                  </span>
                </div>
              </div>

              {/* Content Block */}
              <div className="flex-1 pl-4 sm:pl-5 pt-1 sm:pt-1.5">
                <h3
                  className={cn(
                    "font-sora text-base sm:text-lg font-bold tracking-tight leading-snug mb-1.5 transition-colors duration-300",
                    isActive ? "text-[#002E40]" : "text-[#254F5F]/90"
                  )}
                >
                  {item.title}
                </h3>

                {item.description && (
                  <div className="font-sora text-xs sm:text-sm text-[#62737A] leading-relaxed font-normal">
                    {item.description}
                  </div>
                )}

                {item.extra && <div className="mt-2">{item.extra}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

