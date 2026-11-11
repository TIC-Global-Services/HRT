import type { ReactNode } from "react";
import SectionEyebrow from "./SectionEyebrow";
import BlurText from "@/reuseable/BlurText";

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
      <BlurText
        as="h1"
        delay={20}
        trigger="load"
        text={title}
        className="m-0 text-[#002E40] font-sora text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-normal tracking-tight leading-[1.08] max-w-[760px]"
      />
      {description && (
        <BlurText
          as="p"
          delay={20}
          trigger="load"
          text={description}
          className={`m-0 text-[#3E4A4F] font-sora text-lg leading-[1.3] ${
            align === "center" ? "max-w-[700px]" : "max-w-[640px]"
          }`}
        />
      )}
      {children}
    </div>
  );
}
