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
  const inView = useInView(hostRef, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
    once: false,
  });
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

  // Trigger strictly when scrolled into view
  useEffect(() => {
    if (!inView) {
      const resetTimer = setTimeout(() => setGo(false), 0);
      return () => clearTimeout(resetTimer);
    }

    // Staggered start when scrolling into this section
    const startDelay = index * 180;
    const startTimer = setTimeout(() => {
      setCycle((c) => c + 1);
      setGo(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [inView, index]);

  // Auto-looping cycle while in view (pauses when hovered so user can inspect)
  useEffect(() => {
    if (!go || !inView || isHovered) return;

    const timer = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, CYCLE_DURATION_MS);

    return () => clearInterval(timer);
  }, [go, inView, isHovered]);

  return (
    <div
      ref={hostRef}
      className="relative flex w-full justify-center overflow-visible font-sora text-brand-teal select-none"
      style={{ height: Math.round(STAGE_HEIGHT * scale) }}
    >
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
          {go && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
