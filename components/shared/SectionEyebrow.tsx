import type { ReactNode } from "react";

export interface SectionEyebrowProps {
  children: ReactNode;
  showDot?: boolean;
  className?: string;
}

export default function SectionEyebrow({
  children,
  showDot = false,
  className = "",
}: SectionEyebrowProps) {
  return (
    <p
      className={`inline-flex items-center gap-2 m-0 text-brand-orange font-geist-mono text-xs sm:text-sm font-semibold tracking-tight leading-normal uppercase ${className}`.trim()}
    >
      {showDot ? (
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 flex-none rounded-full bg-brand-orange shadow-[0_0_8px_rgba(248,114,12,0.55)]"
        />
      ) : null}
      {children}
    </p>
  );
}
