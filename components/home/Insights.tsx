"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurText from "@/reuseable/BlurText";

export interface InsightCardItem {
  id: string;
  date: string;
  category: string;
  title: string;
  href: string;
  imageSrc: string;
  ctaText: string;
}

export const insightsData: InsightCardItem[] = [
  {
    id: "hidden-cost-employee-disengagement",
    date: "MAY 14, 2025",
    category: "BLOG POST",
    title: "The Hidden Cost of \nEmployee Disengagement",
    href: "/insight/hidden-cost-employee-disengagement",
    imageSrc: "/domino_effect.png",
    ctaText: "READ THE FULL ARTICLE",
  },
  {
    id: "rethinking-performance-management-ai-era",
    date: "MAY 28, 2025",
    category: "BLOG POST",
    title: "Rethinking Performance \nManagement in the AI Era",
    href: "/insight/rethinking-performance-management-ai-era",
    imageSrc: "/insigth-2.jpg",
    ctaText: "READ THE FULL ARTICLE",
  },
];

export default function Insights() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const totalSlides = insightsData.length;

  // Auto-slide every 6 seconds, pausing on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  return (
    <section
      id="insights"
      aria-label="Insights That Move Work Forward"
      className="relative w-full bg-white py-20 sm:py-24 lg:py-28 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="px-[5%] ">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#E26D35] uppercase mb-4 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E26D35]" />
            <span>INSIGHTS</span>
          </div>

          {/* Headline */}
          <BlurText
            as="h2"
            delay={20}
            text={"Insights That Move Work\nForward"}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-normal tracking-tight text-[#142938] leading-[1.14] mb-6"
          />

          {/* Explore Blogs & Guides Pill Button */}
          <div>
            <Link
              href="/insight"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7F6F3] hover:bg-[#E5E9ED] text-[#254F5F] text-base font-mono font-semibold tracking-tight uppercase transition-colors duration-200"
            >
              <span>EXPLORE BLOGS & GUIDES</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* 2-Card Horizontal Slider */}
        <div className="relative w-full overflow-hidden">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-4 transition-all duration-500 ease-out"
          >
            {insightsData.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "group relative rounded-[28px] sm:rounded-[22px] overflow-hidden min-h-[420px] sm:min-h-[460px] lg:min-h-[400px] p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 select-none shadow-md",
                    isActive
                      ? "border-slate-400/60 shadow-xl ring-2 ring-orange-400/20"
                      : "border-slate-200/80 hover:border-slate-300 hover:shadow-lg"
                  )}
                >
                  {/* Full-Bleed Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      priority={idx === 0}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 680px"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />
                  </div>

                  {/* Top Bar: Date Pill & Category Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    {/* Date Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[16px] font-mono font-medium text-white tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>{item.date}</span>
                    </div>

                    {/* Category Tag */}
                    <div className="px-3 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/15 text-[11px] font-mono font-semibold text-white/90 uppercase tracking-widest">
                      {item.category}
                    </div>
                  </div>

                  {/* Bottom Content: Title & Action Link */}
                  <div className="relative z-10">
                    <BlurText
                      as="h3"
                      delay={20}
                      text={item.title}
                      className="font-heading text-2xl sm:text-[32px] font-medium text-white tracking-tight leading-[1.3] mb-4 group-hover:text-orange-200 transition-colors"
                    />

                    <div className="inline-flex items-center gap-1.5 text-base font-mono font-semibold tracking-wider text-white/90 group-hover:text-white uppercase transition-colors">
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#E26D35]" />
                      
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Slider Indicators */}
        <div className="flex items-center justify-center gap-3 mt-10 sm:mt-12">
          {insightsData.map((_, dotIdx) => {
            const isCurrent = activeIndex === dotIdx;
            return (
              <button
                key={dotIdx}
                type="button"
                aria-label={`Go to slide ${dotIdx + 1}`}
                onClick={() => setActiveIndex(dotIdx)}
                className={cn(
                  "relative h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none overflow-hidden",
                  isCurrent
                    ? "w-14 sm:w-16 bg-[#E26D35]"
                    : "w-10 sm:w-12 bg-[#CBD5E1] hover:bg-slate-400"
                )}
              >
                {isCurrent && !isPaused && (
                  <span className="absolute inset-0 bg-white/30 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

