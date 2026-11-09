"use client";

import React, { useState, useEffect } from "react";

/**
 * Custom hook that animates a number from 0 to target using an ease-out cubic curve.
 */
export function useCountUp(
  target: number,
  duration: number = 1400,
  start: boolean = true
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic curve for smooth natural deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, start]);

  return start ? count : 0;
}

export interface AnimatedCounterProps {
  value: number;
  start?: boolean;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  start = true,
  duration = 1400,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const count = useCountUp(value, duration, start);

  return (
    <span className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
