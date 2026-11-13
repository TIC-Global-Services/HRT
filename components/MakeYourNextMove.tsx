"use client";

import React from "react";
import Link from "next/link";
import BlurText from "@/reuseable/BlurText";

export interface MakeYourNextMoveProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
  showStandaloneBackground?: boolean;
}

export const MakeYourNextMove: React.FC<MakeYourNextMoveProps> = ({
  eyebrow = "SEE CLARIPA IN ACTION",
  title = "Make Your Next Move.",
  subtitle = "See how Claripa helps your organisation align goals, track performance, and turn workforce information into actionable insights.",
  buttonText = "BOOK A DEMO",
  buttonHref = "/contact-us",
  className = "",
  showStandaloneBackground = false,
}) => {
  return (
    <section
      className={`relative w-full text-center px-4 sm:px-6 lg:px-8 ${
        showStandaloneBackground ? "py-20 sm:py-28 overflow-hidden bg-white" : "pt-16 sm:pt-20 lg:pt-24 pb-8"
      } ${className}`}
    >
      {/* Optional Standalone Background */}
      {showStandaloneBackground && (
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
          {/* Subtle warm center radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.22),rgba(249,115,22,0.12),transparent_70%)] blur-2xl" />
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow Pill Tag */}
        <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-3">
          <span
            aria-hidden="true"
            className="relative inline-flex items-center justify-center w-2 h-2 shrink-0"
          >
            <span className="absolute -inset-2 rounded-full bg-[#F8750C]/5 blur-[6px] pointer-events-none" />
            <span className="relative w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F8750C] shadow-[0_0_10px_2px_rgba(248,117,12,0.55)]" />
          </span>
          <span className="text-[#F8750C] text-xs sm:text-base font-medium tracking-tight uppercase font-mono">
            {eyebrow}
          </span>
        </div>

        {/* Main Heading */}
        <BlurText
          as="h2"
          delay={20}
          text={title}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-normal text-[#254F5F] tracking-tight leading-[1.12] mb-4 sm:mb-3 font-sans"
        />

        {/* Subtitle */}
        <BlurText
          as="p"
          delay={20}
          text={subtitle}
          className="text-[#3E4A4F] text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-[1.3] mb-8 sm:mb-8 font-normal"
        />

        {/* Action Button */}
        <div>
          <Link
            href={buttonHref}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1C3B47] hover:bg-[#122A33] text-white text-xs sm:text-base font-normal font-gesist tracking-tight uppercase transition-all duration-200 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MakeYourNextMove;

