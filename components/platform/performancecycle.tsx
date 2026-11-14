"use client";

import React, { useState, useEffect, useRef } from "react";
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
  angleRad: number;
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

// 7 steps arranged symmetrically around the horizontal ellipse:
// Top: Step 1 (-90°)
// Right: Step 2 (-30°), Step 3 (+18°), Step 4 (+68°)
// Left: Step 5 (+112°), Step 6 (+162°), Step 7 (+210°)
const defaultPills: CyclePillItem[] = [
  {
    id: "step-1",
    stepNumber: "1",
    title: "1. Strategic",
    subtitle: "Goal Setting",
    icon: "target",
    group: "define",
    bgClass: "bg-[#EAF2F6]",
    borderClass: "border-[#D4E3EB]",
    hoverBorderClass: "hover:border-[#A8CAD8]",
    iconColor: "text-[#104858]",
    angleRad: -Math.PI / 2, // -90 deg
  },
  {
    id: "step-2",
    stepNumber: "2",
    title: "2. OKR Alignment",
    subtitle: "& Cascading",
    icon: "network",
    group: "define",
    bgClass: "bg-[#EAF2F6]",
    borderClass: "border-[#D4E3EB]",
    hoverBorderClass: "hover:border-[#A8CAD8]",
    iconColor: "text-[#104858]",
    angleRad: -0.5236, // -30 deg
  },
  {
    id: "step-3",
    stepNumber: "3",
    title: "3. Task Planning",
    subtitle: "& Execution",
    icon: "tasks",
    group: "define",
    bgClass: "bg-[#EAF2F6]",
    borderClass: "border-[#D4E3EB]",
    hoverBorderClass: "hover:border-[#A8CAD8]",
    iconColor: "text-[#104858]",
    angleRad: 0.3142, // +18 deg
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
    angleRad: 1.1868, // +68 deg
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
    angleRad: 1.9548, // +112 deg
  },
  {
    id: "step-6",
    stepNumber: "6",
    title: "6. Feedback &",
    subtitle: "Development",
    icon: "message",
    group: "grow",
    bgClass: "bg-[#F8F6F1]",
    borderClass: "border-[#EBE5DB]",
    hoverBorderClass: "hover:border-[#D5CCC0]",
    iconColor: "text-[#5A5040]",
    angleRad: 2.8274, // +162 deg
  },
  {
    id: "step-7",
    stepNumber: "7",
    title: "7. Performance Insights",
    subtitle: "& Talent Decisions",
    icon: "users",
    group: "grow",
    bgClass: "bg-[#F8F6F1]",
    borderClass: "border-[#EBE5DB]",
    hoverBorderClass: "hover:border-[#D5CCC0]",
    iconColor: "text-[#5A5040]",
    angleRad: 3.6652, // +210 deg
  },
];

// Resting angles for the 7 directional clockwise arrows (placed at midpoints between consecutive pills)
const defaultArrows = [
  { midAngleRad: -1.0472 }, // between 1 & 2
  { midAngleRad: -0.1047 }, // between 2 & 3
  { midAngleRad: 0.7505 },  // between 3 & 4
  { midAngleRad: 1.5708 },  // between 4 & 5
  { midAngleRad: 2.3911 },  // between 5 & 6
  { midAngleRad: 3.2463 },  // between 6 & 7
  { midAngleRad: 4.1888 },  // between 7 & 1
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

  // Container dimensions observed in real-time to span 100% full width
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 1040, height: 480 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Compute dynamic full-width ellipse dimensions
  const effectiveWidth = Math.max(containerSize.width, 320);
  const effectiveHeight = Math.max(containerSize.height, 280);

  // On very small mobile screens (< 640px), apply a gentle scale factor to prevent pill overlap
  const mobileScale = effectiveWidth < 640 ? Math.max(0.55, effectiveWidth / 640) : 1;

  const centerX = effectiveWidth / 2;
  const centerY = effectiveHeight / 2;

  // Horizontal radius dynamically spans across full container width (36.5% of total width)
  const radiusX =
    effectiveWidth < 640
      ? 280 * mobileScale
      : Math.min(effectiveWidth / 2 - 120, effectiveWidth * 0.365);

  // Vertical radius comfortably spans the height (33% of total height)
  const radiusY =
    effectiveWidth < 640
      ? 130 * mobileScale
      : Math.min(effectiveHeight / 2 - 45, effectiveHeight * 0.33);

  // DOM references for 60fps hardware-accelerated transforms
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const angleOffsetRef = useRef(0);
  const isPausedRef = useRef(!isRotating || isHovered);

  useEffect(() => {
    isPausedRef.current = !isRotating || isHovered;
  }, [isRotating, isHovered]);

  // Smooth rotation animation along the true full-width ellipse
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();
    const speed = (2 * Math.PI) / 45000; // 45 seconds for a complete revolution

    const updatePositions = (offset: number) => {
      // 1. Move pills along the dynamic full-width ellipse
      pills.forEach((pill, idx) => {
        const el = pillRefs.current[idx];
        if (!el) return;
        const th = pill.angleRad + offset;
        const x = centerX + radiusX * Math.cos(th);
        const y = centerY + radiusY * Math.sin(th);
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${mobileScale})`;
      });

      // 2. Move arrows along the ellipse with exact tangent rotation
      defaultArrows.forEach((arrow, idx) => {
        const el = arrowRefs.current[idx];
        if (!el) return;
        const th = arrow.midAngleRad + offset;
        const x = centerX + radiusX * Math.cos(th);
        const y = centerY + radiusY * Math.sin(th);
        const dx = -radiusX * Math.sin(th);
        const dy = radiusY * Math.cos(th);
        const tangentDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${tangentDeg}deg) scale(${mobileScale})`;
      });
    };

    updatePositions(angleOffsetRef.current);

    const loop = (now: number) => {
      if (!isPausedRef.current) {
        const dt = now - lastTime;
        angleOffsetRef.current =
          (angleOffsetRef.current + speed * dt) % (2 * Math.PI);
        updatePositions(angleOffsetRef.current);
      }
      lastTime = now;
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [pills, centerX, centerY, radiusX, radiusY, mobileScale]);

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

  return (
    <section
      id="performance-cycle"
      aria-label="The Performance Management Process"
      className={`w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-[5%] ${className}`}
    >
      {/* Outer Card with Fluted Glass Gradient Blinds Background */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] md:rounded-[40px] bg-white border border-[#ECE8E1] shadow-[0_4px_30px_rgba(16,42,51,0.04)] overflow-hidden p-6 sm:p-10 md:p-12 lg:p-14">
        {/* Interactive WebGL Fluted Glass Shader (HeroBg) in top-left */}
        <div className="absolute -left-[20%] bottom-[50%] inset-0 pointer-events-none z-0 overflow-hidden max-w-2xl -rotate-180">
          <FlutedGlassBackground
            colorA="#FFA812"
            colorB="#FF4D0A"
            background="#FFFFFF"
            desktopSlits={12}
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
        <div className="relative z-10 flex flex-col gap-8 sm:gap-10 md:gap-12 w-full">
          {/* Top Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-10 items-start mt-5 lg:mt-0">
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
                className="font-sora text-[28px] sm:text-4xl md:text-[42px] lg:text-[46px] font-normal tracking-tight text-[#102A33] leading-[1.12]"
              />
            </div>

            {/* Header Right Paragraph */}
            <div className="lg:pt-4">
              <p className="font-sora text-sm sm:text-[14.5px] text-[#62737A] leading-[1.3] max-w-lg">
                {description}
              </p>
            </div>
          </div>

          {/* Middle Circular/Oval Loop Diagram Card - FULL WIDTH CONTAINER */}
          <div className="relative w-full rounded-[24px] sm:rounded-[28px] bg-[#F7F6F3] border border-[#EBE8E1] p-3 sm:p-5 md:p-6 overflow-hidden shadow-2xs">
            {/* Play/Pause Rotation Control */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRotating(!isRotating)}
                aria-label={isRotating ? "Pause orbit rotation" : "Start orbit rotation"}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white border border-[#E2DDD3] text-[#102A33] font-mono text-[11px] font-medium shadow-2xs transition-all duration-200 cursor-pointer"
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

            {/* ----------------- MOBILE VIEW (< 768px): Stationary Centered Hub + Bottom Orbit Marquee ----------------- */}
            <div
              className="md:hidden relative w-full overflow-hidden flex flex-col items-center justify-center pt-8 pb-5 min-h-[340px] select-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Soft Edge Gradient Fade Masks */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-12 bg-gradient-to-r from-[#F7F6F3] to-transparent z-20"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-12 bg-gradient-to-l from-[#F7F6F3] to-transparent z-20"
              />

              {/* Stationary Central Circular Hub (Double Ring matching Desktop Hub) */}
              <div className="relative mb-7 sm:mb-9 flex items-center justify-center">
                {/* Subtle Dashed Orbit Ring Background */}
                <div
                  aria-hidden="true"
                  className="absolute w-[205px] h-[205px] rounded-full border border-dashed border-[#D0D9DE] pointer-events-none"
                />

                {/* Outer soft translucent halo ring */}
                <div className="w-[165px] h-[165px] rounded-full bg-[#E8EEF1]/60 border border-[#D5E1E6]/70 flex items-center justify-center shadow-xs">
                  {/* Inner crisp white circle */}
                  <div className="w-[124px] h-[124px] rounded-full bg-white shadow-[0_10px_35px_rgba(16,42,51,0.08)] border border-[#E0E9EE] flex flex-col items-center justify-center text-center p-2.5">
                    <span className="font-sora text-[13px] sm:text-sm font-bold text-[#102A33] leading-tight block">
                      Claripa
                    </span>
                    <span className="font-sora text-[13px] sm:text-sm font-bold text-[#102A33] leading-tight block">
                      Performance
                    </span>
                    <span className="font-sora text-[13px] sm:text-sm font-bold text-[#102A33] leading-tight block">
                      Cycle
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Marquee Stream with all 7 Orbit Pills */}
              <div className="w-full overflow-hidden py-1">
                <div
                  className="flex items-center gap-3 w-max animate-marquee"
                  style={{
                    animationDuration: "30s",
                    animationPlayState: isRotating && !isHovered ? "running" : "paused",
                  }}
                >
                  {[...pills, ...pills].map((pill, idx) => {
                    const isActive = activePillId === pill.id;
                    return (
                      <React.Fragment key={`marquee-${pill.id}-${idx}`}>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => setActivePillId(isActive ? null : pill.id)}
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
                          } pl-2 pr-5 py-2.5 flex items-center gap-2.5 shadow-xs transition-all duration-200 hover:scale-105 hover:shadow-md select-none shrink-0`}
                        >
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-xs flex items-center justify-center shrink-0">
                            {renderIcon(pill.icon, pill.iconColor)}
                          </div>
                          <div className="text-left whitespace-nowrap">
                            <span className="font-sora text-xs sm:text-[13px] font-bold text-[#102A33] leading-tight block">
                              {pill.title}
                            </span>
                            <span className="font-sora text-[10.5px] sm:text-xs text-[#52646B] leading-tight block mt-0.5">
                              {pill.subtitle}
                            </span>
                          </div>
                        </div>

                        {/* Directional Flow Arrow */}
                        <div className="w-5 h-5 rounded-full bg-white border border-[#FFD9C2] text-[#E56A1E] shadow-2xs flex items-center justify-center shrink-0">
                          <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ----------------- DESKTOP & TABLET VIEW (>= 768px): Full-width Interactive Orbit Loop ----------------- */}
            <div
              ref={containerRef}
              className="hidden md:flex relative w-full overflow-hidden items-center justify-center min-h-[420px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[530px] aspect-[2/1] lg:aspect-[2.15/1] max-h-[580px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* 1. Stationary Central Circular Hub (Double Ring matching Image) */}
              <div
                className="absolute pointer-events-none z-20 flex items-center justify-center transition-transform duration-200"
                style={{
                  left: `${centerX}px`,
                  top: `${centerY}px`,
                  transform: `translate(-50%, -50%) scale(${mobileScale})`,
                }}
              >
                {/* Outer soft translucent halo ring */}
                <div className="w-[185px] sm:w-[205px] h-[185px] sm:h-[205px] rounded-full bg-[#E8EEF1]/60 border border-[#D5E1E6]/70 flex items-center justify-center shadow-xs">
                  {/* Inner crisp white circle */}
                  <div className="w-[140px] sm:w-[155px] h-[140px] sm:h-[155px] rounded-full bg-white shadow-[0_10px_35px_rgba(16,42,51,0.08)] border border-[#E0E9EE] flex flex-col items-center justify-center text-center p-3">
                    <span className="font-sora text-sm sm:text-base font-bold text-[#102A33] leading-tight block">
                      Claripa
                    </span>
                    <span className="font-sora text-sm sm:text-base font-bold text-[#102A33] leading-tight block">
                      Performance
                    </span>
                    <span className="font-sora text-sm sm:text-base font-bold text-[#102A33] leading-tight block">
                      Cycle
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Full-Width Dashed Oval / Ellipse Orbit Track */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox={`0 0 ${effectiveWidth} ${effectiveHeight}`}
              >
                <ellipse
                  cx={centerX}
                  cy={centerY}
                  rx={radiusX}
                  ry={radiusY}
                  stroke="#D0D9DE"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  fill="none"
                />
              </svg>

              {/* 3. Directional Clockwise Flow Arrows along the Full-Width Oval */}
              {defaultArrows.map((arrow, idx) => {
                const arrowX = centerX + radiusX * Math.cos(arrow.midAngleRad);
                const arrowY = centerY + radiusY * Math.sin(arrow.midAngleRad);
                const dx = -radiusX * Math.sin(arrow.midAngleRad);
                const dy = radiusY * Math.cos(arrow.midAngleRad);
                const initialTangentDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

                return (
                  <div
                    key={`arrow-${idx}`}
                    ref={(el) => {
                      arrowRefs.current[idx] = el;
                    }}
                    className="absolute w-5 h-5 rounded-full bg-white border border-[#FFD9C2] text-[#E56A1E] shadow-2xs flex items-center justify-center pointer-events-none z-10 will-change-transform"
                    style={{
                      left: 0,
                      top: 0,
                      transform: `translate3d(${arrowX}px, ${arrowY}px, 0) translate(-50%, -50%) rotate(${initialTangentDeg}deg) scale(${mobileScale})`,
                    }}
                  >
                    <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                );
              })}

              {/* 4. The 7 Pills (Spanning full width edge-to-edge) */}
              {pills.map((pill, idx) => {
                const isActive = activePillId === pill.id;
                const initialX = centerX + radiusX * Math.cos(pill.angleRad);
                const initialY = centerY + radiusY * Math.sin(pill.angleRad);

                return (
                  <div
                    key={pill.id}
                    ref={(el) => {
                      pillRefs.current[idx] = el;
                    }}
                    className="absolute z-10 will-change-transform"
                    style={{
                      left: 0,
                      top: 0,
                      transform: `translate3d(${initialX}px, ${initialY}px, 0) translate(-50%, -50%) scale(${mobileScale})`,
                    }}
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
                      } pl-2 pr-5 py-2.5 flex items-center gap-2.5 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md select-none`}
                    >
                      {/* Circular White Icon Badge */}
                      <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center shrink-0">
                        {renderIcon(pill.icon, pill.iconColor)}
                      </div>

                      {/* Two-Line Pill Typography */}
                      <div className="text-left whitespace-nowrap">
                        <span className="font-sora text-xs sm:text-[13px] font-bold text-[#142938] leading-tight block">
                          {pill.title}
                        </span>
                        <span className="font-sora text-[11px] sm:text-xs text-[#52646B] leading-tight block mt-0.5">
                          {pill.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom 3 Summary Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-[#EAE6DF] w-full">
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
                    className={`font-mono text-sm font-semibold tracking-tight uppercase ${pillar.tagColor}`}
                  >
                    {pillar.tag}
                  </span>
                </div>

                {/* Subheading */}
                <h4 className="font-sora text-sm sm:text-xl font-semibold text-[#102A33] mb-1.5">
                  {pillar.title}
                </h4>

                {/* Description */}
                <p className="font-sora text-sm sm:text-base text-[#62737A] leading-[1.2]">
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
