"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Target, BarChart3, ListChecks } from "lucide-react";
import FlutedGlassBackground from "@/reuseable/HeroBg";
import BlurText from "@/reuseable/BlurText";

export interface ObjectiveFrameworkItem {
  id: string;
  title: string;
  description: string;
  icon: "target" | "chart" | "tasks";
}

export interface ObjectiveProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  features?: string[];
  ctaText?: string;
  ctaHref?: string;
  targetImageSrc?: string;
  frameworkItems?: ObjectiveFrameworkItem[];
  className?: string;
}

const defaultFeatures: string[] = [
  "Align every team to company priorities",
  "Track progress through measurable outcomes",
  "Link daily tasks to strategic goals",
];

const defaultFrameworkItems: ObjectiveFrameworkItem[] = [
  {
    id: "objective",
    title: "Objective",
    description: "A clear and meaningful goal: what we want to achieve.",
    icon: "target",
  },
  {
    id: "key-results",
    title: "Key Results",
    description: "Measurable outcomes: how we know it's achieved.",
    icon: "chart",
  },
  {
    id: "tasks",
    title: "Tasks",
    description: "Actionable activities linked to the key results.",
    icon: "tasks",
  },
];

export default function Objective({
  eyebrow = "OBJECTIVES & KEY RESULTS",
  title = "What are OKRs?",
  description = "A goal-setting framework to define what to achieve and how to measure it. Claripa keeps objectives, key results and daily tasks connected, so strategy and execution stay in step.",
  features = defaultFeatures,
  ctaText = "EXPLORE CLARIPA",
  ctaHref = "/platform",
  targetImageSrc = "/target-with-arrow.png",
  frameworkItems = defaultFrameworkItems,
  className = "",
}: ObjectiveProps) {
  const renderFrameworkIcon = (icon: ObjectiveFrameworkItem["icon"]) => {
    switch (icon) {
      case "target":
        return <Target className="w-4 h-4 text-white" />;
      case "chart":
        return <BarChart3 className="w-4 h-4 text-white" />;
      case "tasks":
        return <ListChecks className="w-4 h-4 text-white" />;
      default:
        return <Target className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section
      id="objectives"
      aria-label="Objectives and Key Results"
      className={`w-full max-w-full overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-[5%] ${className}`}
    >
      {/* Outer Card with Fluted Glass Gradient Blinds Background */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] md:rounded-[40px] bg-white border border-[#ECE8E1] shadow-[0_4px_30px_rgba(16,42,51,0.04)] overflow-hidden">
        {/* Interactive WebGL Fluted Glass Shader (HeroBg) */}
        <div className="absolute inset-0 -bottom-50 -right-50 pointer-events-none z-0 overflow-hidden">
          <FlutedGlassBackground
            colorA="#FFA812"
            colorB="#FF4D0A"
            background="#FFFFFF"
            desktopSlits={18}
            mobileSlitWidth={65}
            squeeze={1.9}
            lip={0.045}
            speed={0.65}
            mouseStrength={0.6}
          />
          {/* Subtle center fade preserving crisp typography and diagram contrast */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.85)_25%,rgba(255,255,255,0.4)_65%,transparent_100%)] pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center p-6 sm:p-10 md:p-12 lg:p-14 mt-5 lg:mt-0">
          {/* Left Column: Copy & Checklist */}
          <div className="flex flex-col items-start max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3.5 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.65)]" />
              <span className="font-mono text-xs sm:text-[13px] font-semibold text-[#E56A1E] tracking-wider uppercase">
                {eyebrow}
              </span>
            </div>

            {/* Heading */}
            <BlurText
              as="h2"
              delay={20}
              text={title}
              className="font-sora text-[28px] sm:text-4xl md:text-[42px] lg:text-[46px] font-normal tracking-tight text-[#102A33] leading-[1.2] mb-4 sm:mb-5"
            />

            {/* Description */}
            <p className="font-sora text-sm sm:text-base text-black leading-[1.2] max-w-lg mb-6 sm:mb-8 font-normal">
              {description}
            </p>

            {/* Checkpoint list */}
            <ul className="space-y-3 sm:space-y-3.5 mb-8 sm:mb-10 w-full">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#FFEDE2] text-[#E56A1E] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.75]" />
                  </span>
                  <span className="font-sora text-xs sm:text-[15px] font-medium text-[#102A33]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#102A33] hover:bg-[#183B47] text-white font-mono text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group"
            >
              <span>{ctaText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Right Column: OKR Framework Card */}
          <div className="relative rounded-[24px] sm:rounded-[28px] bg-white border border-[#E9ECEF] p-5 sm:p-7 md:p-8 shadow-[0_12px_40px_rgba(16,42,51,0.06)] w-full">
            {/* SVG Defs for Glowing Particles (Mobile & Desktop) */}
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
              <defs>
                <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#E56A1E" floodOpacity="0.75" />
                </filter>
              </defs>
            </svg>

            {/* Framework Header Tag */}
            <span className="block font-mono text-[10px] sm:text-[11px] font-semibold text-[#8FA2A8] tracking-widest uppercase mb-6 sm:mb-7 text-center md:text-left">
              OKR FRAMEWORK
            </span>

            {/* Target + Connector Tree + 3 Stacked Cards */}
            <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-0">
              {/* Target Graphic */}
              <div className="relative w-28 sm:w-36 md:w-40 lg:w-44 aspect-square shrink-0 flex items-center justify-center">
                <Image
                  src={targetImageSrc}
                  alt="Target with arrow representing strategic OKRs"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 140px, 180px"
                />
              </div>

              {/* Connector Tree SVG with Animated Moving Dots (Desktop & Tablet) */}
              <div className="hidden sm:block relative w-8 md:w-11 lg:w-12 h-[228px] shrink-0">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 44 228"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
                      <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#E56A1E" floodOpacity="0.75" />
                    </filter>
                  </defs>

                  {/* Base Track Paths (Subtle Gray Tracks) */}
                  <path
                    d="M 0 114 L 16 114 L 16 46 Q 16 34 28 34 L 44 34"
                    stroke="#DCE2E6"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <line
                    x1="0"
                    y1="114"
                    x2="44"
                    y2="114"
                    stroke="#DCE2E6"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 0 114 L 16 114 L 16 182 Q 16 194 28 194 L 44 194"
                    stroke="#DCE2E6"
                    strokeWidth="1.5"
                    fill="none"
                  />

                  {/* Flowing Dotted Lines along the 3 Paths */}
                  <path
                    d="M 0 114 L 16 114 L 16 46 Q 16 34 28 34 L 44 34"
                    stroke="#E56A1E"
                    strokeWidth="1.75"
                    strokeDasharray="3 6"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.85"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-18"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <line
                    x1="0"
                    y1="114"
                    x2="44"
                    y2="114"
                    stroke="#E56A1E"
                    strokeWidth="1.75"
                    strokeDasharray="3 6"
                    strokeLinecap="round"
                    opacity="0.85"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-18"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <path
                    d="M 0 114 L 16 114 L 16 182 Q 16 194 28 194 L 44 194"
                    stroke="#E56A1E"
                    strokeWidth="1.75"
                    strokeDasharray="3 6"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.85"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-18"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Traveling Signal Dots (Animated Particles Moving Outward) */}
                  {/* Top Branch -> Objective */}
                  <circle r="3" fill="#E56A1E" filter="url(#dot-glow)">
                    <animateMotion
                      path="M 0 114 L 16 114 L 16 46 Q 16 34 28 34 L 44 34"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="2.2" fill="#FFA812" opacity="0.85">
                    <animateMotion
                      path="M 0 114 L 16 114 L 16 46 Q 16 34 28 34 L 44 34"
                      dur="2.2s"
                      begin="1.1s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Middle Branch -> Key Results */}
                  <circle r="3" fill="#E56A1E" filter="url(#dot-glow)">
                    <animateMotion
                      path="M 0 114 L 44 114"
                      dur="1.7s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="2.2" fill="#FFA812" opacity="0.85">
                    <animateMotion
                      path="M 0 114 L 44 114"
                      dur="1.7s"
                      begin="0.85s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Bottom Branch -> Tasks */}
                  <circle r="3" fill="#E56A1E" filter="url(#dot-glow)">
                    <animateMotion
                      path="M 0 114 L 16 114 L 16 182 Q 16 194 28 194 L 44 194"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="2.2" fill="#FFA812" opacity="0.85">
                    <animateMotion
                      path="M 0 114 L 16 114 L 16 182 Q 16 194 28 194 L 44 194"
                      dur="2.2s"
                      begin="1.1s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Junction Fork Pulse Effect */}
                  <circle cx="16" cy="114" r="3.5" fill="#E56A1E" opacity="0.4">
                    <animate
                      attributeName="r"
                      values="3.5;7.5;3.5"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.5;0;0.5"
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="16" cy="114" r="3.5" fill="#E56A1E" />

                  {/* Terminal Nodes at Card Entrances */}
                  <circle cx="44" cy="34" r="2.5" fill="#E56A1E">
                    <animate
                      attributeName="r"
                      values="2.5;3.8;2.5"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.75;1;0.75"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="44" cy="114" r="2.5" fill="#E56A1E">
                    <animate
                      attributeName="r"
                      values="2.5;3.8;2.5"
                      dur="1.7s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.75;1;0.75"
                      dur="1.7s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="44" cy="194" r="2.5" fill="#E56A1E">
                    <animate
                      attributeName="r"
                      values="2.5;3.8;2.5"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.75;1;0.75"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>

              {/* Mobile Animated Flow Indicator (Target -> First Card) */}
              <div className="sm:hidden relative w-full h-8 flex justify-center items-center my-1">
                <svg className="w-8 h-8 overflow-visible" viewBox="0 0 32 32" fill="none">
                  <line x1="16" y1="0" x2="16" y2="28" stroke="#DCE2E6" strokeWidth="1.5" />
                  <line
                    x1="16"
                    y1="0"
                    x2="16"
                    y2="28"
                    stroke="#E56A1E"
                    strokeWidth="1.75"
                    strokeDasharray="3 5"
                    strokeLinecap="round"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-16"
                      dur="0.8s"
                      repeatCount="indefinite"
                    />
                  </line>
                  <circle r="3" fill="#E56A1E" filter="url(#dot-glow)">
                    <animateMotion path="M 16 0 L 16 26" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                  <circle r="2" fill="#FFA812" opacity="0.85">
                    <animateMotion path="M 16 0 L 16 26" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
                  </circle>
                  <path
                    d="M 12.5 23.5 L 16 27.5 L 19.5 23.5"
                    stroke="#E56A1E"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* 3 Stacked Cards (Objective, Key Results, Tasks) */}
              <div className="flex-1 flex flex-col sm:gap-3.5 w-full">
                {frameworkItems.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <div
                      className="group/item rounded-[16px] sm:rounded-[18px] bg-[#F6F5F2] border border-[#ECE8E1] p-3 sm:p-3.5 flex items-center gap-3 sm:gap-3.5 transition-all duration-200 hover:bg-[#EFECE5] hover:border-[#E2DDD3]"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#102A33] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        {renderFrameworkIcon(item.icon)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-sora text-xs sm:text-[13.5px] font-bold text-[#102A33] leading-tight">
                          {item.title}
                        </h4>
                        <p className="font-sora text-[11px] sm:text-xs text-[#62737A] leading-snug mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Animated moving line between cards on mobile */}
                    {idx < frameworkItems.length - 1 && (
                      <div className="sm:hidden relative w-full h-7 flex justify-center items-center my-0.5">
                        <svg className="w-8 h-7 overflow-visible" viewBox="0 0 32 28" fill="none">
                          <line x1="16" y1="0" x2="16" y2="25" stroke="#DCE2E6" strokeWidth="1.5" />
                          <line
                            x1="16"
                            y1="0"
                            x2="16"
                            y2="25"
                            stroke="#E56A1E"
                            strokeWidth="1.75"
                            strokeDasharray="3 5"
                            strokeLinecap="round"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              from="0"
                              to="-16"
                              dur="0.8s"
                              repeatCount="indefinite"
                            />
                          </line>
                          <circle r="2.8" fill="#E56A1E" filter="url(#dot-glow)">
                            <animateMotion path="M 16 0 L 16 23" dur="1.2s" repeatCount="indefinite" />
                          </circle>
                          <circle r="2" fill="#FFA812" opacity="0.85">
                            <animateMotion path="M 16 0 L 16 23" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
                          </circle>
                          <path
                            d="M 12.5 21 L 16 25 L 19.5 21"
                            stroke="#E56A1E"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
