import type { ReactNode } from "react";
import SectionEyebrow from "./SectionEyebrow";

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  centered?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  children,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-4 max-w-[740px] mb-[38px] ${
        centered ? "items-center text-center mx-auto" : "items-start text-left"
      }`}
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="m-0 text-[#254f5f] font-sora text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-[-0.055em] leading-[1.08]">
        {title}
      </h2>
      {description && (
        <p className="m-0 text-[#62737a] font-sora text-base leading-[1.65] max-w-[640px]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
