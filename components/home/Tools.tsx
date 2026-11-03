"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Check,
  Cloud,
  Filter,
  MessageSquare,
  LayoutGrid,
  FileText,
  Folder,
  PenTool,
  MessagesSquare,
  Rocket,
  Headphones,
  GitBranch,
  Target,
  Sparkles,
  BarChart3,
  Award,
  Users,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlatformAccordionItem {
  id: string;
  title: string;
  description: string;
  defaultOpen?: boolean;
}

export const toolsContent = {
  eyebrow: "THE PLATFORM",
  headline: {
    line1: "One platform for the",
    line2: "entire employee lifecycle",
  },
  description:
    "Claripa connects the systems, signals and intelligence behind your workforce, giving HR, managers and leaders one clearer foundation for better people decisions.",
  accordions: [
    {
      id: "overview",
      title: "Overview",
      description:
        "Unify every workforce data stream, engagement metric, and capability signal into a single real-time intelligence hub.",
    },
    {
      id: "performance-management",
      title: "Performance Management",
      description:
        "Continuous feedback, clear goal alignment, and objective reviews that foster growth rather than annual friction.",
    },
    {
      id: "performance-intelligence",
      title: "Performance Intelligence",
      description:
        "Identify emerging patterns, uncover critical gaps, assess potential risks, and understand the key drivers influencing overall performance.",
      defaultOpen: true,
    },
    {
      id: "manager-intelligence",
      title: "Manager Intelligence",
      description:
        "Equip frontline leaders with personalized guidance, proactive team alerts, and coaching prompts when they need it most.",
    },
    {
      id: "talent-development",
      title: "Talent & Development Intelligence",
      description:
        "Map competencies, identify internal mobility paths, and proactively retain high-potential performers.",
    },
  ],
};

interface OrbitIconDef {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  angle: number; // degrees
}

// Inner Orbit: 4 icons evenly distributed every 90° (0 empty side)
const innerIcons: OrbitIconDef[] = [
  { id: "chat", name: "Team Pulse", icon: MessageSquare, angle: 45 },
  { id: "grid", name: "Capability Matrix", icon: LayoutGrid, angle: 135 },
  { id: "filter", name: "Signal Filtering", icon: Filter, angle: 225 },
  { id: "cloud", name: "Cloud Sync", icon: Cloud, angle: 315 },
];

// Middle Orbit: 6 icons evenly distributed every 60° (0 empty side)
const middleIcons: OrbitIconDef[] = [
  { id: "doc", name: "Development Plans", icon: FileText, angle: 20 },
  { id: "messages", name: "Continuous Feedback", icon: MessagesSquare, angle: 80 },
  { id: "target", name: "Goal Alignment", icon: Target, angle: 140 },
  { id: "pen", name: "Performance Reviews", icon: PenTool, angle: 200 },
  { id: "folder", name: "People Records", icon: Folder, angle: 260 },
  { id: "sparkles", name: "AI Insights", icon: Sparkles, angle: 320 },
];

// Outer Orbit: 8 icons evenly distributed every 45° across the full 360° circle (0 empty side)
const outerIcons: OrbitIconDef[] = [
  { id: "headphones", name: "Employee Support", icon: Headphones, angle: 0 },
  { id: "rocket", name: "Onboarding & Ramp-up", icon: Rocket, angle: 45 },
  { id: "branch", name: "Succession & Mobility", icon: GitBranch, angle: 90 },
  { id: "analytics", name: "Workforce Analytics", icon: BarChart3, angle: 135 },
  { id: "award", name: "Recognition & Merit", icon: Award, angle: 180 },
  { id: "users", name: "Org Collaboration", icon: Users, angle: 225 },
  { id: "workplace", name: "Workplace Operations", icon: Building2, angle: 270 },
  { id: "security", name: "Compliance & Security", icon: ShieldCheck, angle: 315 },
];

export default function Tools() {
  const [activeId, setActiveId] = useState<string>("performance-intelligence");

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="platform"
      aria-label="Claripa Platform"
      className="relative w-full bg-white py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Self-contained CSS keyframes for 100% reliable circular rotation */}
      <style>{`
        @keyframes orbit-spin-cw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbit-spin-ccw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>

      <div className="px-[5%] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Eyebrow, Headline, Subtitle & Interactive Accordion */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider text-[#F06A25] uppercase mb-4">
              <span className="text-base leading-none font-bold">*</span>
              <span>{toolsContent.eyebrow}</span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#142938] leading-[1.14] mb-5">
              <span className="block">{toolsContent.headline.line1}</span>
              <span className="block">{toolsContent.headline.line2}</span>
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-[17px] text-zinc-600 leading-relaxed mb-6">
              {toolsContent.description}
            </p>

            {/* Accordion / Capability List */}
            <div className="flex flex-col space-y-4 pt-2">
              {toolsContent.accordions.map((item) => {
                const isOpen = activeId === item.id;
                return (
                  <div key={item.id} className="transition-all">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      className="group flex items-center gap-3 w-full text-left cursor-pointer select-none focus:outline-none"
                    >
                      {/* Checkmark icon */}
                      <span
                        className={cn(
                          "w-5 h-5 flex items-center justify-center shrink-0 transition-colors",
                          isOpen ? "text-[#F06A25]" : "text-[#F06A25] group-hover:text-orange-600"
                        )}
                      >
                        <Check className="w-4 h-4 stroke-[2.8]" />
                      </span>

                      {/* Title */}
                      <span
                        className={cn(
                          "text-base sm:text-[17px] transition-colors",
                          isOpen
                            ? "text-[#F06A25] font-semibold"
                            : "text-[#142938] font-medium hover:text-zinc-950"
                        )}
                      >
                        {item.title}
                      </span>
                    </button>

                    {/* Collapsible Content */}
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out pl-8",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-2 mb-1"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="font-sans text-sm sm:text-[15px] text-zinc-500 leading-relaxed max-w-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Orbiting Ecosystem Visualization */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <div
              className="relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-[580px] aspect-square flex items-center justify-center select-none"
              aria-label="Claripa Orbit Ecosystem"
            >
              {/* Subtle ambient warm glow behind center */}
              <div className="absolute inset-0 m-auto w-44 h-44 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

              {/* Center Squircle Brand Badge with Claripa-queen.png */}
              <div className="absolute inset-0 m-auto z-20 flex items-center justify-center w-22 h-22 sm:w-26 sm:h-26 rounded-[24px] sm:rounded-[28px] bg-[#183B46] border border-[#234B5A] shadow-xl shadow-[#183B46]/20 transition-transform duration-300 hover:scale-105 cursor-pointer">
                <div className="relative w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center">
                  <Image
                    src="/Claripa-queen.png"
                    alt="Claripa Queen"
                    width={48}
                    height={64}
                    className="w-auto h-11 sm:h-13 object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Orbit 1: Inner Ring (42% diameter) - 4 evenly spaced icons */}
              <OrbitRing
                diameterPercent={42}
                durationSeconds={26}
                clockwise={true}
                icons={innerIcons}
              />

              {/* Orbit 2: Middle Ring (70% diameter) - 6 evenly spaced icons */}
              <OrbitRing
                diameterPercent={70}
                durationSeconds={38}
                clockwise={true}
                icons={middleIcons}
              />

              {/* Orbit 3: Outer Ring (98% diameter) - 8 evenly spaced icons across all 360° */}
              <OrbitRing
                diameterPercent={98}
                durationSeconds={50}
                clockwise={true}
                icons={outerIcons}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface OrbitRingProps {
  diameterPercent: number;
  durationSeconds: number;
  clockwise?: boolean;
  icons: OrbitIconDef[];
}

function OrbitRing({
  diameterPercent,
  durationSeconds,
  clockwise = true,
  icons,
}: OrbitRingProps) {
  const ringAnimationName = clockwise ? "orbit-spin-cw" : "orbit-spin-ccw";
  const chipAnimationName = clockwise ? "orbit-spin-ccw" : "orbit-spin-cw";

  return (
    <>
      {/* 1. Stationary Dashed Circular Track (Does NOT spin, stays crisp and still) */}
      <div
        className="absolute inset-0 m-auto aspect-square rounded-full border border-dashed border-slate-200 pointer-events-none"
        style={{
          width: `${diameterPercent}%`,
          height: `${diameterPercent}%`,
        }}
        aria-hidden="true"
      />

      {/* 2. Rotating Icon Layer (Revolves smoothly along the circular track) */}
      <div
        className="absolute inset-0 m-auto aspect-square rounded-full pointer-events-none will-change-transform"
        style={{
          width: `${diameterPercent}%`,
          height: `${diameterPercent}%`,
          animation: `${ringAnimationName} ${durationSeconds}s linear infinite`,
          transformOrigin: "center center",
        }}
        aria-hidden="true"
      >
        {icons.map((item) => {
          const rad = (item.angle * Math.PI) / 180;
          const leftPercent = 50 + 50 * Math.cos(rad);
          const topPercent = 50 + 50 * Math.sin(rad);
          const IconComponent = item.icon;

          return (
            <div
              key={item.id}
              className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{
                left: `${leftPercent.toFixed(3)}%`,
                top: `${topPercent.toFixed(3)}%`,
                transformOrigin: "center center",
              }}
            >
              {/* Counter-rotating card keeps the icon upright while orbiting in circular motion */}
              <div
                className={cn(
                  "relative flex items-center justify-center",
                  "w-11 h-11 sm:w-12 sm:h-12",
                  "bg-white",
                  "border border-slate-100",
                  "shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
                  "rounded-2xl",
                  "text-[#F06A25]",
                  "transition-transform duration-200 ease-out",
                  "hover:scale-125 hover:z-30 hover:shadow-lg hover:border-orange-400/50 cursor-pointer will-change-transform"
                )}
                style={{
                  animation: `${chipAnimationName} ${durationSeconds}s linear infinite`,
                  transformOrigin: "center center",
                }}
              >
                <IconComponent className="w-5 h-5 stroke-[1.9] text-[#F06A25]" />

                {/* Tooltip on hover */}
                <div
                  role="tooltip"
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap bg-zinc-900 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-lg z-50"
                >
                  {item.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
