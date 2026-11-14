import type { ReactNode } from "react";

export interface SectionEyebrowProps {
  children: ReactNode;
  className?: string;
}

export default function SectionEyebrow({
  children,
  className = "",
}: SectionEyebrowProps) {
  return (
    <p
      className={`inline-flex items-center gap-2 m-0 text-[#F8750C] font-mono text-xs md:text-lg font-medium tracking-[0.02em] leading-normal uppercase ${className}`.trim()}
    >
      {/* <span
        aria-hidden="true"
        className="w-1.5 h-1.5 flex-none rounded-full bg-current shadow-[0_0_8px_rgba(248,120,12,0.45)]"
      /> */}
      {children}
    </p>
  );
}
