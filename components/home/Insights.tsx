"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurText from "@/reuseable/BlurText";
import { allBlogs, allCaseStudies } from "@/data/blogs";

export interface InsightCardItem {
  id: string;
  date: string;
  category: string;
  title: string;
  href: string;
  imageSrc: string;
  ctaText: string;
}

// Map real featured blogs and case studies from data datasets
const blog1 = allBlogs.find((b) => b.slug === "hidden-cost-employee-disengagement") || allBlogs[0];
const blog2 = allBlogs.find((b) => b.slug === "rethinking-performance-management-ai-era") || allBlogs[1];
const blog3 = allBlogs.find((b) => b.slug === "onboarding-reimagined-predictive-assimilation") || allBlogs[2];

const case1 = allCaseStudies.find((c) => c.slug === "software-services-firm-attrition-transformation") || allCaseStudies[0];
const case2 = allCaseStudies.find((c) => c.slug === "semiconductor-design-center-engineering-ramp-up") || allCaseStudies[1];
const case3 = allCaseStudies.find((c) => c.slug === "automotive-gcc-india-performance-visibility") || allCaseStudies[2];

// Paired slides for Desktop: each slide contains 1 featured blog and 1 featured case study
export const insightSlides: InsightCardItem[][] = [
  // Slide 1: Attrition & Disengagement
  [
    {
      id: blog1.id,
      date: blog1.date,
      category: "BLOG POST",
      title: blog1.title,
      href: `/insight/${blog1.slug}`,
      imageSrc: blog1.image,
      ctaText: "READ THE FULL ARTICLE",
    },
    {
      id: case1.id,
      date: case1.date,
      category: "CASE STUDY",
      title: case1.title,
      href: `/insight/${case1.slug}`,
      imageSrc: case1.image,
      ctaText: "READ THE FULL CASE STUDY",
    },
  ],
  // Slide 2: AI & Performance Management
  [
    {
      id: blog2.id,
      date: blog2.date,
      category: "BLOG POST",
      title: blog2.title,
      href: `/insight/${blog2.slug}`,
      imageSrc: blog2.image,
      ctaText: "READ THE FULL ARTICLE",
    },
    {
      id: case3.id,
      date: case3.date,
      category: "CASE STUDY",
      title: case3.title,
      href: `/insight/${case3.slug}`,
      imageSrc: case3.image,
      ctaText: "READ THE FULL CASE STUDY",
    },
  ],
  // Slide 3: Onboarding & Engineering Acceleration
  [
    {
      id: blog3.id,
      date: blog3.date,
      category: "BLOG POST",
      title: blog3.title,
      href: `/insight/${blog3.slug}`,
      imageSrc: blog3.image,
      ctaText: "READ THE FULL ARTICLE",
    },
    {
      id: case2.id,
      date: case2.date,
      category: "CASE STUDY",
      title: case2.title,
      href: `/insight/${case2.slug}`,
      imageSrc: case2.image,
      ctaText: "READ THE FULL CASE STUDY",
    },
  ],
];

// 3 Mobile Cards matching exact visual specifications
export const mobileInsightCards: InsightCardItem[] = [
  {
    id: case3.id,
    date: "APR 22, 2025",
    category: "CASE STUDY",
    title: "GCC Performance Across Engineering",
    href: `/insight/${case3.slug}`,
    imageSrc: case2.image,
    ctaText: "READ THE FULL CASE STUDY",
  },
  {
    id: case2.id,
    date: case2.date,
    category: "CASE STUDY",
    title: "How a Semiconductor Design Center Accelerated Engineering Ramp-Up",
    href: `/insight/${case2.slug}`,
    imageSrc: case2.image,
    ctaText: "READ THE FULL CASE STUDY",
  },
  {
    id: case1.id,
    date: case1.date,
    category: "CASE STUDY",
    title: "Software Services Firm Attrition Transformation Story",
    href: `/insight/${case1.slug}`,
    imageSrc: case1.image,
    ctaText: "READ THE FULL CASE STUDY",
  },
];

// Flat list for any consumer expecting insightsData
export const insightsData: InsightCardItem[] = insightSlides.flat();

export default function Insights() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const totalSlides = insightSlides.length;

  // Mobile slider state
  const mobileSliderRef = useRef<HTMLDivElement>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const [isMobilePaused, setIsMobilePaused] = useState<boolean>(false);

  // Desktop auto-slide every 6 seconds, pausing on hover
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  // Mobile auto-slide timer (every 4.5 seconds, pauses when touched)
  useEffect(() => {
    if (isMobilePaused) return;

    const interval = setInterval(() => {
      setMobileActiveIndex((prev) => {
        const next = (prev + 1) % mobileInsightCards.length;
        if (mobileSliderRef.current) {
          const slide = mobileSliderRef.current.children[next] as HTMLElement | undefined;
          if (slide) {
            const container = mobileSliderRef.current;
            // Scroll horizontally within the container ONLY without scrolling the entire window/page
            const targetLeft = slide.offsetLeft - container.offsetLeft - (container.clientWidth - slide.offsetWidth) / 2;
            container.scrollTo({
              left: Math.max(0, targetLeft),
              behavior: "smooth",
            });
          }
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isMobilePaused]);

  // Handle manual swipe/scroll on mobile
  const handleMobileScroll = useCallback(() => {
    if (!mobileSliderRef.current) return;
    const { scrollLeft, clientWidth } = mobileSliderRef.current;
    const cardEl = mobileSliderRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = cardEl ? cardEl.offsetWidth + 16 : clientWidth * 0.88;
    const currentSlide = Math.round(scrollLeft / cardWidth);
    setMobileActiveIndex(Math.min(Math.max(currentSlide, 0), mobileInsightCards.length - 1));
  }, []);

  const goToMobileSlide = (idx: number) => {
    setMobileActiveIndex(idx);
    if (mobileSliderRef.current) {
      const slide = mobileSliderRef.current.children[idx] as HTMLElement | undefined;
      if (slide) {
        const container = mobileSliderRef.current;
        const targetLeft = slide.offsetLeft - container.offsetLeft - (container.clientWidth - slide.offsetWidth) / 2;
        container.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section
      id="insights"
      aria-label="Insights That Move Work Forward"
      className="relative w-full bg-white py-20 sm:py-24 lg:py-28 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="px-[5%]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#E26D35] uppercase mb-4 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E26D35]" />
            <span>INSIGHTS</span>
          </div>

          {/* Headline */}
          <BlurText
            as="h2"
            delay={20}
            text={"Insights That\nMove Work Forward"}
            className="font-heading text-[28px] sm:text-4xl md:text-5xl lg:text-[46px] font-normal tracking-tight text-[#254F5F] leading-[1.14] mb-2 md:mb-6"
          />

          {/* Explore Blogs & Guides Pill Button (Desktop / Tablet only) */}
          <div className="hidden md:block">
            <Link
              href="/insight"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7F6F3] hover:bg-[#E5E9ED] text-[#254F5F] text-xs md:text-base font-mono font-semibold tracking-tight uppercase transition-colors duration-200"
            >
              <span>EXPLORE BLOGS & GUIDES</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Mobile View: 3-Card Auto-Changing Slider */}
        <div className="block md:hidden">
          <div
            ref={mobileSliderRef}
            onScroll={handleMobileScroll}
            onTouchStart={() => setIsMobilePaused(true)}
            onTouchEnd={() => {
              setTimeout(() => setIsMobilePaused(false), 2000);
            }}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 md:pt-2 -mx-[5%] px-[5%]"
          >
            {mobileInsightCards.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="group relative rounded-[32px] overflow-hidden h-[490px] p-6 flex flex-col justify-between shrink-0 w-[88vw] max-w-[360px] snap-center select-none shadow-md border border-slate-200/80"
              >
                {/* Full-Bleed Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    className="object-cover object-center"
                    sizes="90vw"
                  />
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 pointer-events-none" />
                </div>

                {/* Top Bar: Date Pill & Category Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  {/* Date Tag */}
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-white tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>{card.date}</span>
                  </div>

                  {/* Category Tag */}
                  <div className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold text-white uppercase tracking-widest shadow-xs">
                    {card.category}
                  </div>
                </div>

                {/* Bottom Content: Title & Action Link */}
                <div className="relative z-10 pt-16">
                  <h3 className="font-heading text-xl sm:text-2xl font-medium text-white tracking-tight leading-[1.25] mb-3">
                    {card.title}
                  </h3>

                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-tight text-white uppercase">
                    <span>{card.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Pagination Indicators (3 Pills) */}
          <div className="flex items-center justify-center gap-2 mt-6" aria-hidden="true">
            {mobileInsightCards.map((card, idx) => (
              <button
                key={card.id}
                type="button"
                onClick={() => goToMobileSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  mobileActiveIndex === idx
                    ? "w-8 bg-[#F06A25]"
                    : "w-6 bg-[#CBD3D7] hover:bg-zinc-400"
                )}
              />
            ))}
          </div>

          {/* Bottom Explore Pill Button (Mobile Only) */}
          <div className="flex items-center justify-center mt-7">
            <Link
              href="/insight"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F7F6F3] hover:bg-[#E5E9ED] text-[#254F5F] text-xs font-mono font-semibold tracking-wider uppercase transition-colors duration-200 shadow-2xs border border-zinc-200/60"
            >
              <span>EXPLORE BLOGS & GUIDES</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Desktop / Tablet View: 2-Card Horizontal Carousel Slider (Untouched) */}
        <div className="hidden md:block">
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {insightSlides.map((pair, slideIdx) => (
                <div
                  key={slideIdx}
                  className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-5"
                >
                  {pair.map((item, idx) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "group relative rounded-[28px] sm:rounded-[22px] overflow-hidden min-h-[420px] sm:min-h-[460px] lg:min-h-[420px] p-6 sm:p-8 flex flex-col justify-between border border-slate-200/80 hover:border-slate-300 hover:shadow-xl transition-all duration-300 select-none shadow-md"
                      )}
                    >
                      {/* Full-Bleed Background Image */}
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          priority={slideIdx === 0 && idx === 0}
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 680px"
                        />
                        {/* Dark gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none" />
                      </div>

                      {/* Top Bar: Date Pill & Category Badge */}
                      <div className="relative z-10 flex items-center justify-between">
                        {/* Date Tag */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[12px] sm:text-[16px] font-mono font-medium text-white tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span>{item.date}</span>
                        </div>

                        {/* Category Tag */}
                        <div className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold text-white uppercase tracking-widest shadow-xs">
                          {item.category}
                        </div>
                      </div>

                      {/* Bottom Content: Title & Action Link */}
                      <div className="relative z-10 pt-16">
                        <BlurText
                          as="h3"
                          delay={20}
                          text={item.title}
                          className="font-heading text-xl sm:text-[28px] lg:text-[30px] font-medium text-white tracking-tight leading-[1.25] mb-4 group-hover:text-orange-200 transition-colors"
                        />

                        <div className="inline-flex items-center gap-2 text-xs sm:text-base font-mono font-semibold tracking-tight text-white/90 group-hover:text-white uppercase transition-colors">
                          <span>{item.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#E26D35]" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Pagination Slider Indicators */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10 sm:mt-12" role="tablist" aria-label="Featured insights slides">
              {insightSlides.map((_, dotIdx) => {
                const isCurrent = activeSlide === dotIdx;
                return (
                  <button
                    key={dotIdx}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    onClick={() => setActiveSlide(dotIdx)}
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
          )}
        </div>
      </div>
    </section>
  );
}
