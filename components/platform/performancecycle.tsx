"use client";

import React, { useState } from "react";
import {
  Target,
  GitFork,
  ClipboardCheck,
  CalendarDays,
  BarChart3,
  MessageSquare,
  Users,
  ArrowRight,
  Play,
  Pause,
} from "lucide-react";
import FlutedGlassBackground from "@/reuseable/HeroBg";
import BlurText from "@/reuseable/BlurText";

export interface CyclePillItem {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  icon: "target" | "network" | "tasks" | "calendar" | "chart" | "message" | "users";
  group: "define" | "track" | "grow";
  bgClass: string;
  borderClass: string;
  hoverBorderClass: string;
  iconColor: string;
  angleDeg: number;
}

export interface SummaryPillar {
  id: string;
  tag: string;
  tagColor: string;
  dotColor: string;
  dotGlow?: boolean;
  title: string;
  description: string;
}

export interface PerformanceCycleProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  pills?: CyclePillItem[];
  pillars?: SummaryPillar[];
  className?: string;
}

const defaultPills: CyclePillItem[] = [
  {
    id: "step-1",
    stepNumber: "1",
    title: "1. Strategic",
    subtitle: "Goal Setting",
    icon: "target",
    group: "define",
    bgClass: "bg-[#EBF3F6]",
    borderClass: "border-[#D6E5EC]",
    hoverBorderClass: "hover:border-[#A8CAD8]",
    iconColor: "text-[#104858]",
    angleDeg: -90, // Top center
  },
  {
    id: "step-2",
    stepNumber: "2",
    title: "2. OKR Alignment",
    subtitle: "& Cascading",
    icon: "network",
    group: "define",
    bgClass: "bg-[#EBF3F6]",
    borderClass: "border-[#D6E5EC]",
    hoverBorderClass: "hover:border-[#A8CAD8]",
    iconColor: "text-[#104858]",
    angleDeg: -38.57, // Top right
  },
  {
    id: "step-3",
    stepNumber: "3",
    title: "3. Task Planning",
    subtitle: "& Execution",
    icon: "tasks",
    group: "define",
    bgClass: "bg-[#EBF3F6]",
    borderClass: "border-[#D6E5EC]",
    hoverBorderClass: "hover:border-[#A8CAD8]",
    iconColor: "text-[#104858]",
    angleDeg: 12.86, // Mid right
  },
  {
    id: "step-4",
    stepNumber: "4",
    title: "4. Continuous",
    subtitle: "Tracking & Check-ins",
    icon: "calendar",
    group: "track",
    bgClass: "bg-[#FEEFE3]",
    borderClass: "border-[#FCDBC5]",
    hoverBorderClass: "hover:border-[#F8BA93]",
    iconColor: "text-[#E56A1E]",
    angleDeg: 64.29, // Bottom right
  },
  {
    id: "step-5",
    stepNumber: "5",
    title: "5. Performance",
    subtitle: "Assessment",
    icon: "chart",
    group: "track",
    bgClass: "bg-[#FEEFE3]",
    borderClass: "border-[#FCDBC5]",
    hoverBorderClass: "hover:border-[#F8BA93]",
    iconColor: "text-[#E56A1E]",
    angleDeg: 115.71, // Bottom left
  },
  {
    id: "step-6",
    stepNumber: "6",
    title: "6. Feedback &",
    subtitle: "Development",
    icon: "message",
    group: "grow",
    bgClass: "bg-[#F7F5F0]",
    borderClass: "border-[#EBE6DC]",
    hoverBorderClass: "hover:border-[#D5CCC0]",
    iconColor: "text-[#5A5040]",
    angleDeg: 167.14, // Mid left
  },
  {
    id: "step-7",
    stepNumber: "7",
    title: "7. Performance Insights",
    subtitle: "& Talent Decisions",
    icon: "users",
    group: "grow",
    bgClass: "bg-[#F7F5F0]",
    borderClass: "border-[#EBE6DC]",
    hoverBorderClass: "hover:border-[#D5CCC0]",
    iconColor: "text-[#5A5040]",
    angleDeg: 218.57, // Top left
  },
];

const defaultPillars: SummaryPillar[] = [
  {
    id: "define",
    tag: "01 · DEFINE",
    tagColor: "text-[#62737A]",
    dotColor: "bg-[#62737A]",
    title: "Set direction",
    description: "Strategic goals are set, cascaded as OKRs and broken into planned tasks.",
  },
  {
    id: "track",
    tag: "02 · TRACK",
    tagColor: "text-[#E56A1E]",
    dotColor: "bg-[#E56A1E]",
    dotGlow: true,
    title: "Stay on course",
    description: "Continuous check-ins and assessments keep progress visible, not just at review time.",
  },
  {
    id: "grow",
    tag: "03 · GROW",
    tagColor: "text-[#102A33]",
    dotColor: "bg-[#102A33]",
    title: "Act on insight",
    description: "Feedback, development and performance insights feed better talent decisions.",
  },
];

export default function PerformanceCycle({
  eyebrow = "PERFORMANCE CYCLE",
  title = "The Performance Management Process",
  description = "Performance management works best as one continuous loop, not a yearly event. Claripa connects every stage, from strategic goals to talent decisions, so each step feeds the next.",
  pills = defaultPills,
  pillars = defaultPillars,
  className = "",
}: PerformanceCycleProps) {
  const [isRotating, setIsRotating] = useState(true);
  const [activePillId, setActivePillId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Orbit radius in pixels
  const orbitRadius = 216;

  const renderIcon = (icon: CyclePillItem["icon"], colorClass: string) => {
    switch (icon) {
      case "target":
        return <Target className={`w-3.5 h-3.5 ${colorClass}`} />;
      case "network":
        return <GitFork className={`w-3.5 h-3.5 ${colorClass}`} />;
      case "tasks":
        return <ClipboardCheck className={`w-3.5 h-3.5 ${colorClass}`} />;
      case "calendar":
        return <CalendarDays className={`w-3.5 h-3.5 ${colorClass}`} />;
      case "chart":
        return <BarChart3 className={`w-3.5 h-3.5 ${colorClass}`} />;
      case "message":
        return <MessageSquare className={`w-3.5 h-3.5 ${colorClass}`} />;
      case "users":
        return <Users className={`w-3.5 h-3.5 ${colorClass}`} />;
      default:
        return <Target className={`w-3.5 h-3.5 ${colorClass}`} />;
    }
  };

  const isPaused = !isRotating || isHovered;

  return (
    <section
      id="performance-cycle"
      aria-label="The Performance Management Process"
      className={`w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-[5%] ${className}`}
    >
      {/* Dynamic Keyframe Animations for Synchronized Pill Orbit */}
      <style>{`
        @keyframes orbit-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes counter-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .anim-orbit {
          animation: orbit-spin 45s linear infinite;
        }
        .anim-counter {
          animation: counter-spin 45s linear infinite;
        }
        .anim-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Outer Card with Fluted Glass Gradient Blinds Background */}
      <div className="relative w-full max-w-[1280px] mx-auto rounded-[28px] sm:rounded-[36px] md:rounded-[40px] bg-white border border-[#ECE8E1] shadow-[0_4px_30px_rgba(16,42,51,0.04)] overflow-hidden p-6 sm:p-10 md:p-12 lg:p-14">
        {/* Interactive WebGL Fluted Glass Shader (HeroBg) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <FlutedGlassBackground
            colorA="#FFA812"
            colorB="#FF4D0A"
            background="#FFFFFF"
            desktopSlits={18}
            mobileSlitWidth={65}
            squeeze={1.9}
            lip={0.045}
            speed={0.65}
            mouseStrength={0.5}
          />
          {/* Subtle center fade preserving crisp readability */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.92)_25%,rgba(255,255,255,0.45)_65%,transparent_100%)] pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Inner Content Container */}
        <div className="relative z-10 flex flex-col gap-8 sm:gap-10 md:gap-12">
          {/* Top Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-10 items-start">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.65)]" />
                <span className="font-mono text-xs sm:text-[13px] font-semibold text-[#E56A1E] tracking-wider uppercase">
                  {eyebrow}
                </span>
              </div>

              {/* Main Heading */}
              <BlurText
                as="h2"
                delay={20}
                text={title}
                className="font-sora text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-normal tracking-tight text-[#102A33] leading-[1.12]"
              />
            </div>

            {/* Header Right Paragraph */}
            <div className="lg:pt-4">
              <p className="font-sora text-sm sm:text-[14.5px] text-[#62737A] leading-relaxed max-w-lg">
                {description}
              </p>
            </div>
          </div>

          {/* Middle Circular Loop Diagram Card */}
          <div className="relative rounded-[24px] sm:rounded-[28px] bg-[#F7F6F3] border border-[#EBE8E1] p-4 sm:p-6 md:p-8 overflow-hidden shadow-2xs">
            {/* Play/Pause Rotation Control */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRotating(!isRotating)}
                aria-label={isRotating ? "Pause orbit rotation" : "Start orbit rotation"}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#E2DDD3] text-[#102A33] font-mono text-[11px] font-medium shadow-2xs transition-all duration-200 cursor-pointer"
              >
                {isRotating ? (
                  <>
                    <Pause className="w-3 h-3 text-[#E56A1E]" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-[#E56A1E] fill-current" />
                    <span>Rotate</span>
                  </>
                )}
              </button>
            </div>

            {/* Responsive Centered Rotating Orbit Display */}
            <div
              className="relative w-full overflow-hidden flex items-center justify-center min-h-[320px] sm:min-h-[440px] md:min-h-[520px] lg:min-h-[560px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Scaled viewport container for mobile and tablets */}
              <div className="relative w-[640px] h-[560px] shrink-0 scale-[0.52] sm:scale-[0.72] md:scale-[0.88] lg:scale-100 origin-center transition-transform duration-300">
                {/* 1. Stationary Central Hub (Does NOT rotate) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                  {/* Outer translucent halo ring */}
                  <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#E8EEF1]/60 border border-[#D5E1E6]/70 flex items-center justify-center">
                    {/* Inner white hub */}
                    <div className="w-32 h-32 sm:w-38 sm:h-38 rounded-full bg-white shadow-[0_10px_35px_rgba(16,42,51,0.08)] border border-[#E2EAEF] flex flex-col items-center justify-center text-center p-3">
                      <span className="font-sora text-sm sm:text-[15px] font-bold text-[#102A33] leading-tight block">
                        Claripa
                      </span>
                      <span className="font-sora text-sm sm:text-[15px] font-bold text-[#102A33] leading-tight block">
                        Performance
                      </span>
                      <span className="font-sora text-sm sm:text-[15px] font-bold text-[#102A33] leading-tight block">
                        Cycle
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Rotating Orbit Container: rotates clockwise */}
                <div
                  className={`absolute inset-0 anim-orbit ${
                    isPaused ? "anim-paused" : ""
                  }`}
                >
                  {/* Dashed circular orbit track */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 640 560"
                  >
                    <circle
                      cx="320"
                      cy="280"
                      r={orbitRadius}
                      stroke="#D0D9DE"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                      fill="none"
                    />
                  </svg>

                  {/* Directional Clockwise Flow Arrows between pills */}
                  {pills.map((pill, idx) => {
                    const nextPill = pills[(idx + 1) % pills.length];
                    // Midpoint angle between current pill and next pill
                    const midAngleDeg = (pill.angleDeg + nextPill.angleDeg) / 2 + (nextPill.angleDeg < pill.angleDeg ? 180 : 0);
                    const midAngleRad = (midAngleDeg * Math.PI) / 180;
                    const arrowX = 320 + orbitRadius * Math.cos(midAngleRad);
                    const arrowY = 280 + orbitRadius * Math.sin(midAngleRad);
                    const tangentAngle = midAngleDeg + 90;

                    return (
                      <div
                        key={`arrow-${pill.id}`}
                        className="absolute w-5 h-5 rounded-full bg-white border border-[#FFD9C2] text-[#E56A1E] shadow-2xs flex items-center justify-center pointer-events-none z-10"
                        style={{
                          left: `${arrowX}px`,
                          top: `${arrowY}px`,
                          transform: `translate(-50%, -50%) rotate(${tangentAngle}deg)`,
                        }}
                      >
                        <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                      </div>
                    );
                  })}

                  {/* 7 Rotating Pills */}
                  {pills.map((pill) => {
                    const angleRad = (pill.angleDeg * Math.PI) / 180;
                    const pillX = 320 + orbitRadius * Math.cos(angleRad);
                    const pillY = 280 + orbitRadius * Math.sin(angleRad);
                    const isActive = activePillId === pill.id;

                    return (
                      <div
                        key={pill.id}
                        className="absolute z-10"
                        style={{
                          left: `${pillX}px`,
                          top: `${pillY}px`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {/* Counter-rotating wrapper: keeps text and icon perfectly upright */}
                        <div
                          className={`anim-counter ${
                            isPaused ? "anim-paused" : ""
                          }`}
                        >
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                              setActivePillId(isActive ? null : pill.id)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setActivePillId(isActive ? null : pill.id);
                              }
                            }}
                            className={`group cursor-pointer rounded-full ${
                              pill.bgClass
                            } border ${
                              isActive
                                ? "border-[#E56A1E] ring-2 ring-[#E56A1E]/30 scale-105"
                                : `${pill.borderClass} ${pill.hoverBorderClass}`
                            } pl-1.5 pr-4 py-1.5 flex items-center gap-2.5 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md select-none`}
                          >
                            {/* White Icon Bubble */}
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-2xs flex items-center justify-center shrink-0">
                              {renderIcon(pill.icon, pill.iconColor)}
                            </div>

                            {/* Pill Text */}
                            <div className="text-left whitespace-nowrap">
                              <span className="font-sora text-[11px] sm:text-xs font-semibold text-[#142938] leading-tight block">
                                {pill.title}
                              </span>
                              <span className="font-sora text-[10px] sm:text-[11px] text-[#4F6168] leading-tight block">
                                {pill.subtitle}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 3 Summary Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-[#EAE6DF]">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="flex flex-col items-start transition-opacity duration-200"
              >
                {/* Tag Pill with Color Dot */}
                <div className="inline-flex items-center gap-2 mb-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${pillar.dotColor} ${
                      pillar.dotGlow
                        ? "shadow-[0_0_6px_rgba(229,106,30,0.65)]"
                        : ""
                    }`}
                  />
                  <span
                    className={`font-mono text-xs font-semibold tracking-wider uppercase ${pillar.tagColor}`}
                  >
                    {pillar.tag}
                  </span>
                </div>

                {/* Subheading */}
                <h4 className="font-sora text-sm sm:text-base font-bold text-[#102A33] mb-1.5">
                  {pillar.title}
                </h4>

                {/* Description */}
                <p className="font-sora text-xs sm:text-[13px] text-[#62737A] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
