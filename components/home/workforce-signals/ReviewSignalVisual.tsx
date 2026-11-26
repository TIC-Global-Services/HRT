"use client";

import { useTween } from "@/hooks/useTween";
import {
  cssVars,
  SignalCardBox,
  SignalChip,
  SignalMono,
} from "./SignalPrimitives";

export default function ReviewSignalVisual({ go }: { go: boolean }) {
  const actualRating = useTween(go ? 2.8 : 0, {
    active: go,
    duration: 800,
    delay: 2400,
    from: 0,
  });

  return (
    <>
      {/* Top Box: Review Year Timeline */}
      <SignalCardBox className="top-[26px] h-[176px] p-3.5">
        <div className="flex items-center justify-between">
          <SignalMono>Review year · 12 months</SignalMono>
          <SignalChip variant="orange">Dec</SignalChip>
        </div>

        <div className="absolute inset-x-3.5 top-14 h-[60px]">
          {/* Dashed line stretching to Review */}
          <div
            className="sig-reveal absolute inset-x-0 top-5 h-0 border-t-2 border-dashed border-[#CBD5D7]"
            style={cssVars({ "--d": "1.1s", "--t": "0.9s" })}
          />

          {/* Solid line connecting Jan to Mar */}
          <div
            className="sig-scale-x absolute left-0 top-[19px] h-[3px] w-14 rounded-[2px] bg-brand-teal"
            style={cssVars({ "--d": "0.35s", "--t": "0.5s" })}
          />

          {/* Jan circle */}
          <i
            className="sig-pop absolute left-0 top-3.5 size-[13px] rounded-full border-[3px] border-white bg-brand-teal shadow-[0_0_0_1px_#254f5f]"
            style={cssVars({ "--d": "0.1s" })}
          />

          {/* Mar circle (pops right as connecting line arrives) */}
          <i
            className="sig-pop absolute left-[46px] top-3.5 size-[13px] rounded-full border-[3px] border-white bg-brand-teal shadow-[0_0_0_1px_#254f5f]"
            style={cssVars({ "--d": "0.8s" })}
          />

          <SignalMono className="absolute left-0 top-10">Jan</SignalMono>
          <SignalMono className="absolute left-[44px] top-10">Mar</SignalMono>

          {/* Silence label */}
          <span
            className="sig-fade absolute left-[76px] top-0.5 w-[110px] bg-white text-center text-[10px] leading-[13px] text-[#8A9A9F]"
            style={cssVars({ "--d": "1.4s" })}
          >
            8 months of silence
          </span>

          {/* Blinking Review Bubble with expanding ripples */}
          <div
            className="sig-pop sig-review-blinking absolute -right-1 top-[5px] size-[30px] rounded-full border-4 border-white bg-brand-orange shadow-[0_0_0_2px_rgba(248,114,12,0.35),0_0_18px_rgba(248,114,12,0.5)] cursor-pointer"
            style={cssVars({ "--d": "1.7s" })}
          >
            <span className="sig-review-ripple absolute -inset-1.5 rounded-full border-2 border-brand-orange" />
            <span
              className="sig-review-ripple absolute -inset-1.5 rounded-full border-2 border-brand-orange"
              style={{ animationDelay: "0.9s" }}
            />
          </div>

          <SignalMono
            accent
            className="sig-fade absolute -right-1.5 top-[42px]"
            style={cssVars({ "--d": "1.9s" })}
          >
            Review
          </SignalMono>
        </div>

        <SignalChip
          variant="slate"
          className="sig-up absolute left-3.5 top-[130px]"
          style={cssVars({ "--d": "1.5s" })}
        >
          No feedback since Mar
        </SignalChip>
      </SignalCardBox>

      {/* Bottom Box: Rating & Progress Bars */}
      <SignalCardBox
        className="sig-up top-[214px] h-[92px] p-3.5"
        style={cssVars({ "--d": "1.8s" })}
      >
        <div className="flex items-center justify-between">
          <SignalMono>Rating</SignalMono>
          <SignalChip
            variant="alert"
            className="sig-shake"
            style={cssVars({ "--d": "3.3s" })}
          >
            Surprise
          </SignalChip>
        </div>

        {/* Expected Row */}
        <div className="mt-2.5 flex items-center gap-2">
          <span className="w-[50px] text-[10px] leading-[13px] text-text-muted">
            Expected
          </span>
          <div className="h-[7px] flex-1 rounded bg-[#E9EEEE]">
            <div
              className="sig-fill h-full rounded bg-[#9DB8C0]"
              style={cssVars({ "--w": "84%", "--d": "2.1s", "--t": "0.7s" })}
            />
          </div>
          <b className="w-[22px] text-[11.5px] leading-[15px] font-semibold text-brand-teal">
            4.2
          </b>
        </div>

        {/* Actual Row */}
        <div className="mt-2 flex items-center gap-2">
          <span className="w-[50px] text-[10px] leading-[13px] text-text-muted">
            Actual
          </span>
          <div className="h-[7px] flex-1 rounded bg-[#E9EEEE]">
            <div
              className="sig-fill h-full rounded bg-brand-orange"
              style={cssVars({ "--w": "56%", "--d": "2.4s", "--t": "0.8s" })}
            />
          </div>
          <b className="w-[22px] text-[11.5px] leading-[15px] font-semibold text-brand-orange">
            {actualRating.toFixed(1)}
          </b>
        </div>
      </SignalCardBox>
    </>
  );
}
