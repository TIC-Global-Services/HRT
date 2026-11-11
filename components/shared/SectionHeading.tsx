import type { ReactNode } from "react";
import SectionEyebrow from "./SectionEyebrow";
import BlurText from "@/reuseable/BlurText";

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
      <BlurText
        as="h2"
        delay={20}
        text={title}
        className="m-0 text-[#254f5f] font-sora text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-[-0.055em] leading-[1.08]"
      />
      {description && (
        <BlurText
          as="p"
          delay={20}
          text={description}
          className="m-0 text-[#62737a] font-sora text-base leading-[1.65] max-w-[640px]"
        />
      )}
      {children}
    </div>
  );
}
