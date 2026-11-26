"use client";

import { useEffect, useId, useState } from "react";
import { prefersReducedMotion, useTween } from "@/hooks/useTween";
import {
  cssVars,
  SignalCardBox,
  SignalChip,
  SignalMono,
} from "./SignalPrimitives";

export default function LateSignalVisual({ go }: { go: boolean }) {
  const gradientId = useId().replace(/:/g, "");
  const [targetWeek, setTargetWeek] = useState(1);

  // Staged week progression: Week 1 -> Week 6 (Claripa flags) -> Week 12 (Exit)
  useEffect(() => {
    if (!go) return;
    if (prefersReducedMotion()) {
      const t = setTimeout(() => setTargetWeek(12), 0);
      return () => clearTimeout(t);
    }
    // Start at Week 1, transition to Week 6 when point 1 arrives, then Week 12 when point 2 arrives
    const t1 = setTimeout(() => setTargetWeek(6), 200);
    const t2 = setTimeout(() => setTargetWeek(12), 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [go]);

  const currentWeek = Math.round(
    useTween(targetWeek, {
      active: go,
      duration: targetWeek === 6 ? 900 : 1000,
      from: 1,
    })
  );

  return (
    <>
      {/* Top Box: 12-Week Engagement Signal Graph */}
      <SignalCardBox className="top-6 h-[224px] p-3.5">
        <div className="flex items-center justify-between">
          <SignalMono accent>Engagement signal</SignalMono>
          <SignalMono>12 weeks</SignalMono>
        </div>

        <svg
          className="absolute left-0 top-[34px]"
          width="262"
          height="150"
          viewBox="0 0 262 150"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F8720C" stopOpacity=".28" />
              <stop offset="1" stopColor="#F8720C" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Gradient Area under curve */}
          <path
            d="M18 30 C50 28 70 34 92 40 C114 46 126 60 150 78 C174 96 196 110 238 128 V140 H18Z"
            fill={`url(#${gradientId})`}
            className="animate-sig-fade"
            style={cssVars({ "--d": "0.5s", "--t": "2.2s" })}
          />

          {/* Baseline */}
          <path d="M18 140H244" stroke="#CBD5D7" />

          {/* Point by Point: Curve Segment 1 (Week 1 to Week 6) */}
          <path
            d="M18 30 C50 28 70 34 92 40"
            className="animate-sig-draw"
            style={cssVars({
              "--d": "0.2s",
              "--t": "0.9s",
              "--ease": "linear",
              "--len": 76,
            })}
            stroke="#F8720C"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Point by Point: Curve Segment 2 (Week 6 to Week 12) */}
          <path
            d="M92 40 C114 46 126 60 150 78 C174 96 196 110 238 128"
            className="animate-sig-draw"
            style={cssVars({
              "--d": "1.7s",
              "--t": "1.0s",
              "--ease": "linear",
              "--len": 172,
            })}
            stroke="#F8720C"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* Vertical dashed guideline at Week 6 */}
          <path
            d="M92 40V140"
            stroke="#254F5F"
            strokeOpacity=".4"
            strokeDasharray="3 4"
            className="animate-sig-fade"
            style={cssVars({ "--d": "1.15s" })}
          />

          {/* Vertical dashed guideline at Week 12 */}
          <path
            d="M238 128V140"
            stroke="#254F5F"
            strokeOpacity=".4"
            strokeDasharray="3 4"
            className="animate-sig-fade"
            style={cssVars({ "--d": "2.75s" })}
          />

          {/* Week 6 Point Marker (Drops and Pings) */}
          <g
            className="animate-sig-drop"
            style={cssVars({ "--d": "1.1s" }, { transformOrigin: "92px 40px" })}
          >
            <circle
              cx="92"
              cy="40"
              r="6"
              fill="#F8720C"
              stroke="#fff"
              strokeWidth="3"
            />
            <circle
              cx="92"
              cy="40"
              r="6"
              fill="none"
              stroke="#F8720C"
              strokeWidth="2"
              className="animate-sig-ping"
              style={cssVars({ "--d": "1.25s" })}
            />
          </g>

          {/* Week 12 Exit Point Marker (Pops) */}
          <circle
            cx="238"
            cy="128"
            r="6"
            fill="#254F5F"
            stroke="#fff"
            strokeWidth="3"
            className="animate-sig-pop"
            style={cssVars(
              { "--d": "2.7s" },
              { transformOrigin: "238px 128px" }
            )}
          />

          {/* Bracket line: 6 weeks earlier */}
          <g className="animate-sig-fade" style={cssVars({ "--d": "3.0s" })}>
            <path
              d="M96 118H234"
              className="animate-sig-draw"
              style={cssVars({ "--d": "3.0s", "--t": "0.5s", "--len": 138 })}
              stroke="#254F5F"
              strokeWidth="1.4"
            />
            <path d="M96 114v8M234 114v8" stroke="#254F5F" strokeWidth="1.4" />
          </g>
        </svg>

        {/* Chip at Week 6: "Claripa flags · wk 6" */}
        <SignalChip
          variant="orange"
          className="animate-sig-pop absolute left-[58px] top-9 shadow-[0_0_0_3px_#fff]"
          style={cssVars({ "--d": "1.2s" })}
        >
          Claripa flags · wk 6
        </SignalChip>

        {/* Chip at Week 12: "Exit · wk 12" */}
        <SignalChip
          variant="slate"
          className="animate-sig-pop absolute right-2.5 top-[98px] shadow-[0_0_0_3px_#fff]"
          style={cssVars({ "--d": "2.8s" })}
        >
          Exit · wk 12
        </SignalChip>

        {/* Measurement Label: 6 weeks earlier */}
        <span
          className="animate-sig-fade absolute left-[112px] top-[132px] bg-white px-1.5 text-[10.5px] font-semibold text-brand-teal"
          style={cssVars({ "--d": "3.2s" })}
        >
          6 weeks earlier
        </span>

        {/* Axis Labels */}
        <SignalMono className="absolute bottom-2.5 left-3.5">Wk 1</SignalMono>
        <SignalMono
          accent
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2"
        >
          Week {currentWeek}
        </SignalMono>
        <SignalMono className="absolute bottom-2.5 right-3.5">Wk 12</SignalMono>
      </SignalCardBox>

      {/* Bottom Box: Nudge Schedule 1-on-1 */}
      <SignalCardBox
        className="animate-sig-up top-[262px] flex h-[50px] items-center justify-between border-[#F6D9C2] bg-[#FFF9F4] px-3.5"
        style={cssVars({ "--d": "3.3s" })}
      >
        <span className="text-[11.5px] font-semibold text-[#B4560A]">
          Nudge: Schedule 1-on-1
        </span>
        <i
          className="animate-sig-pop grid size-6 place-items-center rounded-full bg-brand-orange text-white shadow-xs"
          style={cssVars({ "--d": "3.6s" })}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path
              d="m5 12 5 5 9-10"
              className="animate-sig-draw"
              style={cssVars({
                "--d": "3.8s",
                "--t": "0.35s",
                "--len": 21,
              })}
            />
          </svg>
        </i>
      </SignalCardBox>
    </>
  );
}
