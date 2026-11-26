"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import ReviewSignalVisual from "./ReviewSignalVisual";
import GoalsSignalVisual from "./GoalsSignalVisual";
import PotentialSignalVisual from "./PotentialSignalVisual";
import LateSignalVisual from "./LateSignalVisual";

export type SignalVisualKind = "review" | "goals" | "potential" | "late";

const STAGE_WIDTH = 307;
const STAGE_HEIGHT = 320;
const MAX_SCALE = 1.06;
const CYCLE_DURATION_MS = 6800; // 6.8s loop: 3.8s reveal + 2.4s hold + 0.6s reset

export function SignalVisualStage({
  kind,
  index,
  isHovered = false,
}: {
  kind: SignalVisualKind;
  index: number;
  isHovered?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const inView = useInView(hostRef, { threshold: 0.05, rootMargin: "120px 0px 120px 0px" });
  const [go, setGo] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [scale, setScale] = useState(1);

  // Responsive scale to container
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.clientWidth;
      if (width > 0) {
        setScale(Math.min(MAX_SCALE, width / STAGE_WIDTH));
      }
    };

    updateScale();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateScale);
      return () => window.removeEventListener("resize", updateScale);
    }

    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Initial trigger once in view
  useEffect(() => {
    if (!inView) return;
    const startDelay = index * 160;
    const startTimer = setTimeout(() => {
      setGo(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [inView, index]);

  // Auto-looping cycle (pauses when hovered so user can inspect)
  useEffect(() => {
    if (!go || isHovered) return;

    const timer = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, CYCLE_DURATION_MS);

    return () => clearInterval(timer);
  }, [go, isHovered]);

  return (
    <div
      ref={hostRef}
      className="relative flex w-full justify-center overflow-visible font-sora text-brand-teal select-none"
      style={{ height: Math.round(STAGE_HEIGHT * scale) }}
    >
      <style>{STAGE_CSS}</style>
      <div
        className="sig-stage relative shrink-0"
        data-go={go ? "true" : "false"}
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <div key={cycle} className="sig-vis relative h-[320px] w-[307px]">
          {kind === "review" && <ReviewSignalVisual go={go} />}
          {kind === "goals" && (
            <GoalsSignalVisual
              go={go}
              fixed={isHovered}
              touched={isHovered}
            />
          )}
          {kind === "potential" && <PotentialSignalVisual go={go} />}
          {kind === "late" && <LateSignalVisual go={go} />}
        </div>
      </div>
    </div>
  );
}

const STAGE_CSS = `
.sig-pop { animation: sigPop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0s) both; }
.sig-fade { animation: sigFade var(--t, 0.5s) ease var(--d, 0s) both; }
.sig-up { animation: sigUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s) both; }
.sig-fill { width: var(--w); animation: sigFill var(--t, 0.7s) cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s) both; }
.sig-scale-x { transform-origin: left; animation: sigScaleX var(--t, 0.6s) cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s) both; }
.sig-reveal { animation: sigReveal var(--t, 1.2s) cubic-bezier(0.4, 0, 0.2, 1) var(--d, 0s) both; }
.sig-draw { stroke-dasharray: var(--len); animation: sigDraw var(--t, 0.5s) var(--ease, ease) var(--d, 0s) both; }
.sig-shake { animation: sigShake 0.5s ease var(--d, 0s) both; }
.sig-drop { animation: sigDrop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0s) both; }
.sig-ping { transform-origin: 92px 40px; animation: sigPing 1.2s ease-out var(--d, 0s) 2 both; }
.sig-beacon { animation: sigBeacon 2.2s ease-out infinite; }
.sig-review-blinking { animation: sigReviewBlink 1.8s ease-in-out infinite; }
.sig-review-ripple { animation: sigReviewRipple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite; }
.sig-moving-line { stroke-dasharray: 4 4; animation: sigMovingDash 0.85s linear infinite; }
.sig-moving-flow { animation: sigMovingFlow 1.6s linear infinite; }
.sig-cell-hl { animation: sigFade 0.45s ease var(--i, 0s) both, sigHl 0.6s ease var(--hld, 1.5s) both; }
.sig-cell-dim { animation: sigFade 0.45s ease var(--i, 0s) both, sigDim 0.6s ease var(--dimd, 1.5s) both; }
.sig-gdot { animation: sigPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0s) both, sigFloat 3.4s ease-in-out var(--f, 0s) infinite; }

@keyframes sigPop { 0% { opacity: 0; transform: scale(0.35); } 75% { transform: scale(1.06); } 100% { opacity: 1; transform: scale(1); } }
@keyframes sigFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes sigUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes sigFill { from { width: 0; } to { width: var(--w); } }
@keyframes sigScaleX { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes sigReveal { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes sigDraw { from { stroke-dashoffset: var(--len); } to { stroke-dashoffset: 0; } }
@keyframes sigShake { 0%, 100% { transform: none; } 20% { transform: translateX(-3px); } 40% { transform: translateX(3px); } 60% { transform: translateX(-2px); } 80% { transform: translateX(2px); } }
@keyframes sigDrop { 0% { opacity: 0; transform: translateY(-16px) scale(0.6); } 70% { transform: translateY(2px) scale(1.05); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes sigPing { 0% { opacity: 0.75; transform: scale(1); } 100% { opacity: 0; transform: scale(3.2); } }
@keyframes sigBeacon { 0% { opacity: 0.75; transform: scale(1); } 100% { opacity: 0; transform: scale(2.2); } }
@keyframes sigReviewBlink { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 2px rgba(248, 114, 12, 0.35), 0 0 16px rgba(248, 114, 12, 0.5); } 50% { transform: scale(1.1); box-shadow: 0 0 0 5px rgba(248, 114, 12, 0.7), 0 0 28px rgba(248, 114, 12, 0.9); } }
@keyframes sigReviewRipple { 0% { transform: scale(0.95); opacity: 0.9; } 100% { transform: scale(2.4); opacity: 0; } }
@keyframes sigMovingDash { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -16px; } }
@keyframes sigMovingFlow { from { stroke-dashoffset: 24px; } to { stroke-dashoffset: 0; } }
@keyframes sigFloat { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(2px, -3px); } }
@keyframes sigHl { from { background-color: #e4ecee; border-color: transparent; } to { background-color: #fdede0; border-color: #f8720c; } }
@keyframes sigDim { from { opacity: 1; } to { opacity: 0.65; } }

@media (prefers-reduced-motion: reduce) {
  .sig-stage * { animation: none !important; transition: none !important; }
  .sig-draw { stroke-dasharray: none; }
  .sig-beacon, .sig-ping, .sig-review-ripple, .sig-moving-line, .sig-moving-flow { display: none; }
}
`;
