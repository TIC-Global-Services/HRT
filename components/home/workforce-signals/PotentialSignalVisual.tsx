"use client";

import { useTween } from "@/hooks/useTween";
import {
  cssVars,
  SignalCardBox,
  SignalChip,
  SignalMono,
} from "./SignalPrimitives";

const TALENT_GRID_CELLS = [
  "#EEF3F4",
  "#E4ECEE",
  "#FDEDE0",
  "#F3F6F6",
  "#EEF3F4",
  "#E4ECEE",
  "#F7F8F8",
  "#F3F6F6",
  "#EEF3F4",
] as const;

const TALENT_DOTS: readonly [number, number][] = [
  [50, 132],
  [92, 86],
  [124, 120],
  [102, 150],
  [170, 94],
  [62, 96],
];

export default function PotentialSignalVisual({ go }: { go: boolean }) {
  const unseenMonths = Math.round(
    useTween(go ? 14 : 1, {
      active: go,
      duration: 1100,
      delay: 2100,
      from: 1,
    })
  );

  return (
    <>
      {/* Top Box: 3x3 Talent Grid */}
      <SignalCardBox className="top-6 h-[214px] p-3.5">
        <div className="flex items-center justify-between">
          <SignalMono>Talent grid</SignalMono>
          <SignalMono>Potential ↑</SignalMono>
        </div>

        {/* 3x3 Grid Cells - Revealed One by One */}
        <div className="absolute left-3.5 top-10 grid h-[150px] w-[210px] grid-cols-3 gap-1">
          {TALENT_GRID_CELLS.map((bg, i) => (
            <div
              key={i}
              className={`rounded-[7px] border-[1.5px] border-transparent ${
                i === 2 ? "sig-cell-hl" : "sig-cell-dim"
              }`}
              style={cssVars(
                {
                  "--i": `${0.1 + i * 0.08}s`,
                  "--hld": "1.5s",
                  "--dimd": "1.5s",
                },
                { background: bg }
              )}
            />
          ))}
        </div>

        {/* Talent Dots - Revealed One by One and Floating */}
        {TALENT_DOTS.map(([x, y], i) => (
          <i
            key={i}
            className="sig-gdot absolute size-[9px] rounded-full bg-[#9DB8C0]"
            style={cssVars(
              {
                "--d": `${0.85 + i * 0.09}s`,
                "--f": `${i * 0.4}s`,
              },
              { left: x, top: y }
            )}
          />
        ))}

        {/* AK Orange Avatar Badge with Continuous Beacon Ring */}
        <div
          className="sig-pop absolute left-[176px] top-[50px] grid size-[30px] place-items-center rounded-full border-[3px] border-white bg-brand-orange text-[10.5px] font-semibold text-white shadow-[0_0_0_2px_rgba(248,114,12,0.4),0_0_16px_rgba(248,114,12,0.5)]"
          style={cssVars({ "--d": "1.65s" })}
        >
          AK
          <b className="sig-beacon absolute -inset-1 rounded-full border-2 border-brand-orange" />
        </div>

        <SignalMono className="absolute bottom-2 left-3.5">
          Performance →
        </SignalMono>
      </SignalCardBox>

      {/* Bottom Box: High Potential Alert Card */}
      <SignalCardBox
        className="sig-up top-[246px] h-[62px] border-[#F6D9C2] bg-[#FFF9F4] px-3.5 py-3"
        style={cssVars({ "--d": "1.9s" })}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] leading-[15px] font-semibold text-brand-teal">
            High potential · AK
          </span>
          <SignalChip variant="orange">{unseenMonths} mo unseen</SignalChip>
        </div>
        <div className="mt-[5px] text-[10px] leading-[13px] text-text-muted">
          Skills up 3 · no stretch role assigned
        </div>
      </SignalCardBox>
    </>
  );
}
