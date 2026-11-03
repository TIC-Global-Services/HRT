"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  avatarInitials: string;
}

const column1Testimonials: Testimonial[] = [
  {
    id: "col1-1",
    quote:
      "Claripa is the first AI tool our whole company actually uses daily. Not just engineering — sales, ops, finance. Everyone.",
    author: "Tom Becker",
    role: "COO",
    company: "Fieldwork",
    avatarInitials: "TB",
  },
  {
    id: "col1-2",
    quote:
      "We cut our tool stack from eleven apps to three. Claripa replaced the glue.",
    author: "Elena Rostova",
    role: "Head of Operations",
    company: "Vektor Cloud",
    avatarInitials: "ER",
  },
  {
    id: "col1-3",
    quote:
      "Onboarding new engineering cohorts went from 6 months down to 7 weeks with predictive readiness tracking.",
    author: "Marcus Vance",
    role: "VP Engineering",
    company: "Apex Systems",
    avatarInitials: "MV",
  },
  {
    id: "col1-4",
    quote:
      "The clarity across distributed global hubs is unmatched. We spot retention flight risks months before exit interviews.",
    author: "Aisha Patel",
    role: "Chief People Officer",
    company: "Luminary AI",
    avatarInitials: "AP",
  },
];

const column2Testimonials: Testimonial[] = [
  {
    id: "col2-1",
    quote:
      "It feels like we hired ten brilliant interns who never sleep and never drop the ball.",
    author: "Sarah Jenkins",
    role: "VP People & Talent",
    company: "ScaleOps",
    avatarInitials: "SJ",
  },
  {
    id: "col2-2",
    quote:
      "Claripa transformed our quarterly review dread into proactive, weekly coaching moments.",
    author: "David Kim",
    role: "Director of HR",
    company: "HyperScale Tech",
    avatarInitials: "DK",
  },
  {
    id: "col2-3",
    quote:
      "Claripa is the first AI tool our whole company actually uses daily. Not just engineering — sales, ops, finance. Everyone.",
    author: "Rachel Morgan",
    role: "COO",
    company: "Syncpoint Labs",
    avatarInitials: "RM",
  },
  {
    id: "col2-4",
    quote:
      "The executive dashboards give our leadership team workforce visibility we never thought possible.",
    author: "Julian Chen",
    role: "Chief Strategy Officer",
    company: "Nexis Global",
    avatarInitials: "JC",
  },
];

const column3Testimonials: Testimonial[] = [
  {
    id: "col3-1",
    quote:
      "We cut our tool stack from eleven apps to three. Claripa replaced the glue.",
    author: "Tom Becker",
    role: "COO",
    company: "Fieldwork",
    avatarInitials: "TB",
  },
  {
    id: "col3-2",
    quote:
      "Claripa is the first AI tool our whole company actually uses daily. Not just engineering — sales, ops, finance. Everyone.",
    author: "Michael Chang",
    role: "Head of Talent",
    company: "Altus Digital",
    avatarInitials: "MC",
  },
  {
    id: "col3-3",
    quote:
      "Spotting burnout signals early helped us retain four of our highest-impact principal engineers this year.",
    author: "Samantha Ward",
    role: "VP People Operations",
    company: "Cognitive Works",
    avatarInitials: "SW",
  },
  {
    id: "col3-4",
    quote:
      "No manual spreadsheets or disconnected survey pings. Everything flows naturally into one actionable canvas.",
    author: "Lucas Meyer",
    role: "Managing Director",
    company: "Strata Global",
    avatarInitials: "LM",
  },
];

interface ColumnProps {
  items: Testimonial[];
  direction: "up" | "down";
  speedSeconds?: number;
}

function MarqueeColumn({ items, direction, speedSeconds = 42 }: ColumnProps) {
  // Duplicate array 3 times to guarantee a continuous, infinite vertical scroll without blank spaces
  const trackItems = [...items, ...items, ...items];

  return (
    <div className="relative flex-1 h-[680px] overflow-hidden select-none">
      <div
        className={cn(
          "flex flex-col gap-5 will-change-transform hover:[animation-play-state:paused]",
          direction === "up" ? "animate-marquee-up" : "animate-marquee-down"
        )}
        style={{
          animationDuration: `${speedSeconds}s`,
        }}
      >
        {trackItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="rounded-[24px] bg-[#F9F9F7] border border-neutral-200/70 p-6 sm:p-7 shadow-xs hover:border-orange-200/80 hover:shadow-md transition-all duration-300"
          >
            {/* Orange Quote Mark */}
            <div className="text-[#E26D35] text-2xl font-serif font-bold leading-none mb-3 select-none">
              “
            </div>

            {/* Quote Body */}
            <p className="text-[#142938] text-[14px] sm:text-[15px] font-sans leading-relaxed mb-6 font-normal">
              {item.quote}
            </p>

            {/* Author Row */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300/80 flex items-center justify-center text-xs font-semibold text-slate-700 shrink-0">
                {item.avatarInitials}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-[13px] font-bold text-[#142938] leading-tight">
                  {item.author}
                </span>
                <span className="text-[11px] text-slate-500 font-sans leading-tight mt-0.5">
                  {item.role}, {item.company}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustedByTeams() {
  return (
    <section
      id="testimonials"
      aria-label="Trusted by Teams. Proven Through Impact"
      className="relative w-full bg-white py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      {/* Self-contained CSS for smooth infinite vertical marquee motion */}
      <style>{`
        @keyframes marquee-up {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }
        @keyframes marquee-down {
          0% {
            transform: translateY(-33.333%);
          }
          100% {
            transform: translateY(0%);
          }
        }
        .animate-marquee-up {
          animation: marquee-up linear infinite;
        }
        .animate-marquee-down {
          animation: marquee-down linear infinite;
        }
      `}</style>

      <div className="px-[5%] max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#E26D35] uppercase mb-4 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E26D35]" />
            <span>TESTIMONIALS</span>
          </div>

          {/* Headline */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-medium tracking-tight text-[#142938] leading-[1.14]">
            Trusted by Teams.
            <span className="block">Proven Through Impact</span>
          </h2>
        </div>

        {/* 3-Column Vertical Marquee with Smooth Fade Gradients */}
        <div className="relative w-full overflow-hidden">
          {/* Top & Bottom Smooth Gradient Masks so cards fade seamlessly */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

          {/* The 3 Columns: Col 1 UP, Col 2 DOWN, Col 3 UP */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Column 1: Moves Bottom to Top */}
            <MarqueeColumn items={column1Testimonials} direction="up" speedSeconds={38} />

            {/* Column 2: Moves Top to Bottom */}
            <MarqueeColumn items={column2Testimonials} direction="down" speedSeconds={42} />

            {/* Column 3: Moves Bottom to Top */}
            <div className="hidden lg:block">
              <MarqueeColumn items={column3Testimonials} direction="up" speedSeconds={36} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

