import type { ReactNode } from "react";
import SectionEyebrow from "./SectionEyebrow";

export interface PageIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  align?: "left" | "center";
}

export default function PageIntro({
  eyebrow,
  title,
  description,
  children,
  align = "left",
}: PageIntroProps) {
  return (
    <div
      className={`flex flex-col gap-[18px] ${
        align === "center"
          ? "items-center text-center mx-auto"
          : "items-start text-left"
      }`}
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h1 className="m-0 text-[#002E40] font-sora text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-normal tracking-tight leading-[1.08] max-w-[760px]">
        {title}
      </h1>
      {description && (
        <p
          className={`m-0 text-[#3E4A4F] font-sora text-lg leading-[1.3] ${
            align === "center" ? "max-w-[700px]" : "max-w-[640px]"
          }`}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
