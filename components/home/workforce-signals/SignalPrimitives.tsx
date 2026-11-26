import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CssVars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Type-safe helper for passing CSS custom properties into React inline styles.
 */
export function cssVars(
  vars: Record<`--${string}`, string | number>,
  extra?: CSSProperties
): CssVars {
  return { ...extra, ...vars } as CssVars;
}

export function SignalCardBox({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "absolute left-[22px] w-[262px] rounded-2xl border border-border-warm bg-white shadow-[0_10px_26px_rgba(37,79,95,0.08)]",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export function SignalMono({
  children,
  accent = false,
  className,
  style,
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn(
        "font-geist-mono text-[9.5px] leading-3 font-medium tracking-[0.07em] uppercase",
        accent ? "text-brand-orange" : "text-[#7B8E94]",
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}

const CHIP_VARIANTS = {
  orange: "bg-[#FDEDE0] text-[#D2660A]",
  slate: "bg-[#E4ECEE] text-brand-teal",
  alert: "bg-[#FDE3DC] text-[#C2410C]",
} as const;

export function SignalChip({
  children,
  variant,
  className,
  style,
}: {
  children: ReactNode;
  variant: keyof typeof CHIP_VARIANTS;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-[6px] px-2 py-1 text-[10px] leading-3 font-semibold",
        CHIP_VARIANTS[variant],
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}
