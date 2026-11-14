"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

export interface StatItem {
  number: string;
  label: string;
}

export interface AboutImpactProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  {
    number: "50+",
    label: "Years of Founders HR Expertise",
  },
  {
    number: "3+",
    label: "Years of HR Consulting Expertise",
  },
  {
    number: "30+",
    label: "Clients Served",
  },
];

interface ParsedNumber {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  hasCommas: boolean;
}

function parseStatNumber(raw: string): ParsedNumber | null {
  const trimmed = raw.trim();
  const match = trimmed.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const prefix = match[1];
  const numRaw = match[2];
  const suffix = match[3];

  const hasCommas = numRaw.includes(",");
  const cleanNum = numRaw.replace(/,/g, "");
  const target = parseFloat(cleanNum);

  if (isNaN(target)) return null;

  const decimalPart = cleanNum.split(".")[1];
  const decimals = decimalPart ? decimalPart.length : 0;

  return { prefix, target, suffix, decimals, hasCommas };
}

function formatStatNumber(value: number, parsed: ParsedNumber): string {
  const fixed = value.toFixed(parsed.decimals);
  const [intPartRaw, decPart] = fixed.split(".");

  const intPart = parsed.hasCommas
    ? intPartRaw.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : intPartRaw;

  const numStr = decPart !== undefined ? `${intPart}.${decPart}` : intPart;
  return `${parsed.prefix}${numStr}${parsed.suffix}`;
}

// Ease-out cubic curve provides smooth deceleration across all number ranges
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function StatCounter({
  value,
  start,
  delay = 0,
  duration = 1800,
}: {
  value: string;
  start: boolean;
  delay?: number;
  duration?: number;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseStatNumber(value), [value]);

  useEffect(() => {
    if (!parsed || !spanRef.current) return;

    // Respect user's motion preferences
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      spanRef.current.textContent = value;
      return;
    }

    if (!start) {
      spanRef.current.textContent = formatStatNumber(0, parsed);
      return;
    }

    let rafId: number;
    const animDuration = parsed.target <= 5 ? 1200 : duration;

    const timerId = setTimeout(() => {
      const startTime = performance.now();
      let lastRendered = -1;

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / animDuration, 1);
        const eased = easeOutCubic(progress);
        const currentNum = parsed.target * eased;

        // Round according to decimal precision to avoid unnecessary DOM writes
        const factor = Math.pow(10, parsed.decimals);
        const rounded = Math.round(currentNum * factor) / factor;

        if (rounded !== lastRendered && spanRef.current) {
          lastRendered = rounded;
          spanRef.current.textContent = formatStatNumber(rounded, parsed);
        }

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else if (spanRef.current) {
          spanRef.current.textContent = value;
        }
      };

      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timerId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [start, value, delay, duration, parsed]);

  return (
    <span ref={spanRef} className="tabular-nums">
      {value}
    </span>
  );
}

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function AboutImpact({ stats = defaultStats }: AboutImpactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      const timer = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const shouldAnimate = isHydrated ? isVisible : true;

  return (
    <section
      ref={sectionRef}
      id="about-impact"
      aria-label="Impact Stats"
      className="py-6 sm:py-10 px-[5%]"
    >
      {/* Outer White Card Container matching Image 4 */}
      <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-[#E9ECEF] p-4 sm:p-5 lg:p-4 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-4">
          {stats.map((stat, index) => (
            <article
              key={`${stat.label}-${index}`}
              style={{
                transitionDelay: shouldAnimate ? `${index * 120}ms` : "0ms",
              }}
              className={`rounded-[22px] sm:rounded-[26px] bg-[#FAF9F7] border border-[#ECE9E3] p-8 sm:p-10 text-center flex flex-col items-center justify-center transition-all duration-700 ease-out hover:-translate-y-0.5 hover:shadow-xs ${
                shouldAnimate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <strong className="block text-[#FF6B0A] font-sora font-semibold lg:font-light text-[64px] tracking-tight leading-none mb-3.5">
                <StatCounter
                  value={stat.number}
                  start={isVisible}
                  delay={index * 150}
                  duration={1800}
                />
              </strong>
              <span className="font-sora text-base font-normal lg:font-medium text-[#102A33] tracking-tight">
                {stat.label}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
