"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import FlutedGlassBackground from "@/reuseable/HeroBg";
import BlurText from "@/reuseable/BlurText";

export interface TimelineMilestone {
  kicker: React.ReactNode;
  year: string;
  description?: string;
  heightDesktop: number; // in pixels
  widthDesktop: number; // in pixels
}

export interface OurStoryTimelineProps {
  eyebrow?: string;
  title?: string;
  highlightText?: string;
  milestones?: TimelineMilestone[];
}

type CardRect = { x: number; y: number; w: number; h: number };

const DEFAULT_DESKTOP_RECTS: CardRect[] = [
  { x: 0, y: 0, w: 219, h: 540 },
  { x: 235, y: 0, w: 219, h: 500 },
  { x: 470, y: 0, w: 219, h: 460 },
  { x: 705, y: 0, w: 219, h: 420 },
];

const defaultMilestones: TimelineMilestone[] = [
  {
    kicker: (
      <>
        The
        <br />
        beginning
      </>
    ),
    year: "2024",
    description:
      "HRT Consulting began its journey with a commitment to HR excellence and helping organisations build stronger, more effective workplaces.",
    heightDesktop: 540,
    widthDesktop: 219,
  },
  {
    kicker: (
      <>
        First enterprise
        <br />
        partnership
      </>
    ),
    year: "2024",
    description:
      "Claripa expanded its reach by partnering with its first enterprise, bringing workforce intelligence and AI-powered insights to organisational decision-making.",
    heightDesktop: 500,
    widthDesktop: 219,
  },
  {
    kicker: <>Platform launch</>,
    year: "2026",
    description:
      "Claripa launched as an AI-powered workforce intelligence platform, connecting people data, performance signals and insights to help organisations make better workforce decisions.",
    heightDesktop: 460,
    widthDesktop: 219,
  },
  {
    kicker: (
      <>
        Building the
        <br />
        Future
      </>
    ),
    year: "TODAY",
    description:
      "Claripa is in the process of building four intelligence engines and one operating picture. Each engine fits the same single fabric, the raw materials that 2 years from now become...",
    heightDesktop: 420,
    widthDesktop: 219,
  },
];

export default function OurStoryTimeline({
  eyebrow = "OUR STORY",
  title = "From an idea to a platform.",
  highlightText = "Claripa continues to advance connected workforce intelligence and AI-enabled HR experiences.",
  milestones = defaultMilestones,
}: OurStoryTimelineProps) {
  const clipId = useId().replace(/:/g, "");
  const groupRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [cardRects, setCardRects] = useState<CardRect[]>(DEFAULT_DESKTOP_RECTS);

  // Measure the 4 milestone card bounds inside the 4-card container so a single
  // continuous FlutedGlassBackground spans across all 4 cards seamlessly.
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const measure = () => {
      const next: CardRect[] = [];
      for (let i = 0; i < milestones.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        next.push({
          x: el.offsetLeft,
          y: el.offsetTop,
          w: el.offsetWidth,
          h: el.offsetHeight,
        });
      }
      if (next.length > 0) setCardRects(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(group);
    cardRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [milestones.length]);

  return (
    <section
      id="our-story"
      aria-label="Our Story"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center px-4 max-w-3xl mx-auto mb-12 sm:mb-16">
        <p className="inline-flex items-center gap-2 text-[#E26D35] font-mono text-xs font-semibold tracking-wider uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E26D35] shadow-[0_0_8px_rgba(226,109,53,0.55)]" />
          {eyebrow}
        </p>
        <BlurText
          as="h2"
          delay={20}
          text={title}
          className="text-[#002E40] font-sora text-3xl sm:text-4xl md:text-[44px] font-normal tracking-tight leading-[1.15]"
        />
      </div>

      {/* 5 Cards Row - Stepped Height Architecture matching exact Figma geometry */}
      {/* Total desktop width = 219*4 + 400 + 16*4 = 1340px */}
      <div className="flex flex-nowrap overflow-x-auto lg:overflow-visible items-start justify-start lg:justify-center gap-4 pb-6 lg:pb-0 scrollbar-none snap-x snap-mandatory max-w-[1340px] mx-auto">
        {/* CARDS 1 to 4: Shared 1-Canvas Continuous Fluted Glass Background */}
        <div
          ref={groupRef}
          className="relative flex flex-nowrap items-start gap-4 shrink-0"
        >
          {/* SVG ClipPath carving the 4 rounded cards out of the single unified background */}
          <svg
            width="0"
            height="0"
            className="absolute pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                {cardRects.map((rect, idx) => (
                  <rect
                    key={idx}
                    x={rect.x}
                    y={rect.y}
                    width={rect.w}
                    height={rect.h}
                    rx={30}
                    ry={30}
                  />
                ))}
              </clipPath>
            </defs>
          </svg>

          {/* Single Unified FlutedGlassBackground (HeroBg) spanning all 4 cards */}
          <div
            className="absolute inset-0 pointer-events-none select-none z-0"
            style={{ clipPath: `url(#${clipId})` }}
          >
            <FlutedGlassBackground
              preset="timeline"
              colorA="#FFA812"
              colorB="#FF4D0A"
              background="#FFFFFF"
              desktopSlits={12.4}
              mobileSlitWidth={74}
              desktopBreakpoint={900}
              squeeze={1.9}
              lip={0.045}
              speed={0.9}
              mouseStrength={1}
            />
          </div>

          {milestones.map((milestone, idx) => {
            // Stepped heights: 540px, 500px, 460px, 420px
            const heightClasses = [
              "lg:h-[540px]",
              "lg:h-[500px]",
              "lg:h-[460px]",
              "lg:h-[420px]",
            ];

            return (
              <article
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`group relative z-10 flex-none w-[220px] sm:w-[230px] lg:w-[219px] ${heightClasses[idx]} min-h-[440px] lg:min-h-0 rounded-[30px] overflow-hidden bg-transparent border border-[#ECE9E3] shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#E26D35]/40 hover:shadow-[0_12px_32px_rgba(226,109,53,0.10)] snap-start flex flex-col justify-end`}
              >
                {/* Text Content at the Bottom */}
                <div className="relative z-10 px-[22px] pb-[26px] pointer-events-none">
                  <span className="block text-lg leading-tight font-sora font-medium text-[#254F5F]/85 mb-1">
                    {milestone.kicker}
                  </span>
                  <strong className="block text-[28px] sm:text-[32px] font-bold font-sora tracking-tight leading-none text-[#002E40] my-2">
                    {milestone.year}
                  </strong>
                  {milestone.description && (
                    <BlurText
                      as="p"
                      delay={20}
                      text={milestone.description}
                      className="text-[13px] leading-[1.45] text-[#254F5F]/90 font-sora"
                    />
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* CARD 5: Standalone Right Summary Card (width: 400px, height: 340px) */}
        <article className="group relative flex-none w-[320px] sm:w-[360px] lg:w-[400px] lg:h-[340px] h-[340px] rounded-[30px] overflow-hidden bg-white border border-[#ECE9E3] shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(226,109,53,0.08)] snap-start flex items-center justify-center p-8 sm:p-10">
          {/* Instant First-Paint Fallback Artwork matching image 100% */}
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            <Image
              src="/about/timeline-card-5-bg.webp"
              alt=""
              fill
              sizes="(max-width: 1024px) 380px, 400px"
              className="object-cover object-top"
            />
          </div>

          {/* Interactive WebGL Fluted Glass Shader Background (HeroBg) */}
          <div className="absolute inset-0 pointer-events-none select-none z-[1]">
            <FlutedGlassBackground
              textureSrc="/about/timeline-card-5-bg.webp"
              mobileSlitWidth={72}
              squeeze={1.9}
              lip={0.045}
              speed={0.9}
              mouseStrength={1}
            />
          </div>

          {/* Centered Message */}
          <div className="relative z-10 pointer-events-none">
            <p className="font-sora text-[21px] sm:text-[23px] lg:text-[24px] text-[#002E40] leading-[1.38] font-normal tracking-[-0.01em]">
              <span className="text-[#F8780C] font-semibold">Today,</span>{" "}
              <BlurText delay={20} text={highlightText} />
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
