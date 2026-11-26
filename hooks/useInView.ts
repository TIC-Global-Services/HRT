"use client";

import { useEffect, useState, type RefObject } from "react";

export interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Observes when a referenced DOM element enters the viewport.
 * Defaults to triggering quickly (threshold: 0.05, rootMargin: 120px).
 */
export function useInView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { threshold = 0.05, rootMargin = "120px 0px 120px 0px", once = true }: UseInViewOptions = {}
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setIsInView(true), 0);
      return () => clearTimeout(timer);
    }

    // Check if already in viewport on mount
    try {
      const rect = element.getBoundingClientRect();
      const inViewport =
        rect.top < window.innerHeight + 120 && rect.bottom > -120;
      if (inViewport) {
        const timer = setTimeout(() => setIsInView(true), 0);
        if (once) return () => clearTimeout(timer);
      }
    } catch {
      // Ignore if getBoundingClientRect throws
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return isInView;
}
