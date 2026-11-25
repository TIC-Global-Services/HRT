import type { ReactNode } from "react";
import SectionEyebrow from "./SectionEyebrow";
import BlurText from "@/components/ui/BlurText";

export interface PageIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  align?: "left" | "center" | "responsive";
  className?: string;
}

export default function PageIntro({
  eyebrow,
  title,
  description,
  children,
  align = "left",
  className = "",
}: PageIntroProps) {
  const alignmentClass =
    align === "center"
      ? "items-center text-center mx-auto"
      : align === "responsive"
      ? "items-center text-center mx-auto lg:items-start lg:text-left lg:mx-0"
      : "items-start text-left";

  return (
    <div
      className={`flex flex-col gap-[18px] ${alignmentClass} ${className}`.trim()}
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <BlurText
        as="h1"
        delay={20}
        trigger="load"
        text={title}
        className="m-0 text-brand-navy font-sora text-3xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.035em] leading-[1.08] max-w-[760px]"
      />
      {description && (
        <BlurText
          as="p"
          delay={20}
          trigger="load"
          text={description}
          className={`m-0 text-text-muted font-sora text-sm sm:text-base md:text-lg leading-[1.3] ${
            align === "center"
              ? "max-w-[700px]"
              : align === "responsive"
              ? "max-w-[700px] lg:max-w-[640px]"
              : "max-w-[640px]"
          }`}
        />
      )}
      {children}
    </div>
  );
}
