"use client";

import { useCountUp } from "@/hooks/useCountUp";

export { useCountUp };

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
