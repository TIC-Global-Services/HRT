"use client";

import { useEffect, useRef, useState } from "react";

export interface UseTweenOptions {
  active?: boolean;
  duration?: number;
  delay?: number;
  from?: number;
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Smoothly tweens a numeric value toward `target` using an ease-out cubic curve.
 * Respects the user's `prefers-reduced-motion` setting.
 */
export function useTween(
  target: number,
  { active = true, duration = 900, delay = 0, from }: UseTweenOptions = {}
): number {
  const initialValue = from ?? target;
  const [value, setValue] = useState(initialValue);
  const currentRef = useRef(initialValue);

  useEffect(() => {
    if (!active) return;

    if (prefersReducedMotion()) {
      const timer = setTimeout(() => {
        currentRef.current = target;
        setValue(target);
      }, 0);
      return () => clearTimeout(timer);
    }

    let rafId = 0;
    let startTime: number | undefined;
    const startValue = currentRef.current;

    const step = (timestamp: number) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min(1, (timestamp - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = startValue + (target - startValue) * eased;

      currentRef.current = next;
      setValue(next);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    const delayTimer = setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, active, duration, delay]);

  return value;
}

