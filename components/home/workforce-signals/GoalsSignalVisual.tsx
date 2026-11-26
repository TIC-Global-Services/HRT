"use client";

import { useTween } from "@/hooks/useTween";
import {
  cssVars,
  SignalCardBox,
  SignalChip,
  SignalMono,
} from "./SignalPrimitives";

const TREE_BRANCHES = [
  { d: "M131 46V62", delay: "0.35s", len: 16 },
  { d: "M131 62H66V84", delay: "0.65s", len: 87 },
  { d: "M131 62H196V84", delay: "0.65s", len: 87 },
  { d: "M66 112V130", delay: "1.35s", len: 18 },
] as const;

export default function GoalsSignalVisual({
  go,
  fixed = false,
  touched = false,
}: {
  go: boolean;
  fixed?: boolean;
  touched?: boolean;
}) {
  const alignmentPct = useTween(go ? (fixed ? 82 : 54) : 82, {
    active: go,
    duration: 900,
    delay: touched ? 0 : 2600,
    from: 82,
  });

  const broken = go && !fixed;
  const transitionDelay = touched ? "0s" : "2.2s";

  return (
    <>
      {/* Top Box: OKR Tree Hierarchy */}
      <SignalCardBox className="top-6 h-[196px]">
        <svg
          className="absolute left-0 top-0"
          width="262"
          height="196"
          viewBox="0 0 262 196"
          fill="none"
          aria-hidden="true"
        >
          {/* Static branch lines that draw progressively */}
          {TREE_BRANCHES.map(({ d, delay, len }) => (
            <path
              key={d}
              d={d}
              className="sig-draw"
              style={cssVars({ "--d": delay, "--t": "0.45s", "--len": len })}
              stroke="#254F5F"
              strokeOpacity=".35"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Active flow line pulse down the aligned tree */}
          <path
            d="M131 46V62H66V84 M66 112V130"
            stroke="#254F5F"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeDasharray="4 8"
            strokeLinecap="round"
            className="sig-moving-flow"
          />

          {/* Broken link to right goal: Animated moving dashed orange line */}
          <path
            d="M196 112V130"
            stroke="#F8720C"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
            className={broken ? "sig-moving-line" : undefined}
            style={{
              opacity: broken ? 1 : 0,
              transition: `opacity 0.4s ${transitionDelay}`,
            }}
          />

          {/* Fixed solid link (when hovered) */}
          <path
            d="M196 112V130"
            stroke="#254F5F"
            strokeOpacity=".5"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ opacity: fixed ? 1 : 0, transition: "opacity 0.4s" }}
          />
        </svg>

        {/* Step 1: Company OKR */}
        <div
          className="sig-pop absolute left-[76px] top-3.5 grid h-8 w-[110px] place-items-center rounded-2xl bg-brand-teal text-center text-[11px] font-semibold text-white shadow-xs"
          style={cssVars({ "--d": "0.1s" })}
        >
          Company OKR
        </div>

        {/* Step 2: Team OKR A */}
        <div
          className="sig-pop absolute left-[18px] top-[84px] grid h-7 w-24 place-items-center rounded-[14px] bg-[#E4ECEE] text-center text-[10.5px] font-semibold text-brand-teal"
          style={cssVars({ "--d": "0.95s" })}
        >
          Team OKR A
        </div>

        {/* Step 3: Team OKR B */}
        <div
          className="sig-pop absolute left-[148px] top-[84px] grid h-7 w-24 place-items-center rounded-[14px] bg-[#E4ECEE] text-center text-[10.5px] font-semibold text-brand-teal"
          style={cssVars({ "--d": "1.05s" })}
        >
          Team OKR B
        </div>

        {/* Step 4: Left Individual Goal (Aligned) */}
        <div
          className="sig-pop absolute left-[18px] top-[130px] grid h-[34px] w-24 place-items-center rounded-xl border border-border-warm bg-surface-warm text-center text-[10px] leading-3 text-brand-teal"
          style={cssVars({ "--d": "1.55s" })}
        >
          Individual
          <br />
          goal
        </div>

        {/* Step 5: Right Individual Goal (Drifting / Broken Link) */}
        <div
          className="sig-pop absolute left-[148px] top-[130px]"
          style={cssVars({ "--d": "1.85s" })}
        >
          <div
            className={`grid h-[34px] w-24 place-items-center rounded-xl text-center text-[10px] leading-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              broken
                ? "border-[1.5px] border-dashed border-brand-orange bg-[#FDEDE0] text-[#B4560A]"
                : "border border-border-warm bg-surface-warm text-brand-teal"
            }`}
            style={{
              transform: broken ? "translateX(5px) rotate(1.2deg)" : "none",
              transitionDelay,
            }}
          >
            Individual
            <br />
            goal
          </div>
        </div>

        {/* Alert Chip: "No link" */}
        <SignalChip
          variant="alert"
          className="absolute left-[190px] top-[114px] shadow-[0_0_0_3px_#fff]"
          style={{
            opacity: broken ? 1 : 0,
            transform: `translateX(-50%) scale(${broken ? 1 : 0.6})`,
            transition: `opacity .3s ${transitionDelay}, transform .4s cubic-bezier(.34,1.56,.64,1) ${transitionDelay}`,
          }}
        >
          No link
        </SignalChip>

        {/* Status text */}
        <span
          className="sig-fade absolute left-[18px] top-[172px] text-[10px] leading-[13px] text-text-muted"
          style={cssVars({ "--d": "1.7s" })}
        >
          Aligned
        </span>

        <span
          className="sig-fade absolute left-[148px] top-[172px] text-[10px] leading-[13px] transition-colors duration-400"
          style={cssVars(
            { "--d": "1.9s" },
            { color: fixed ? "#62737A" : "#C2410C" }
          )}
        >
          {fixed ? "Aligned" : "Drifting"}
        </span>
      </SignalCardBox>

      {/* Bottom Box: Goal Alignment Transition */}
      <SignalCardBox
        className="sig-up top-[234px] h-[78px] p-3.5"
        style={cssVars({ "--d": "2.2s" })}
      >
        <div className="flex items-baseline justify-between">
          <SignalMono>Goal alignment</SignalMono>
          <span className="text-[12px] font-semibold">
            <span
              className="font-normal text-[#9AA9AD] transition-opacity duration-300"
              style={{ opacity: fixed ? 0 : 1 }}
            >
              82% →{" "}
            </span>
            <span
              className="transition-colors duration-400"
              style={{ color: fixed ? "#254F5F" : "#F8720C" }}
            >
              {Math.round(alignmentPct)}%
            </span>
          </span>
        </div>

        {/* Alignment Track with sliding fill and 82% pin marker */}
        <div className="relative mt-3 h-2 rounded-full bg-[#E9EEEE]">
          <div
            className="h-full rounded-full transition-all duration-400"
            style={{
              width: `${alignmentPct}%`,
              backgroundColor: fixed ? "#254F5F" : "#F8720C",
            }}
          />
          <i className="absolute -top-1 left-[82%] h-4 w-0.5 rounded-full bg-brand-teal" />
        </div>
      </SignalCardBox>
    </>
  );
}
