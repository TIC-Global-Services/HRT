"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface SolutionInsightItem {
  id: string;
  image: string;
  date: string;
  title: string;
  href: string;
}

const defaultInsights: SolutionInsightItem[] = [
  {
    id: "insight-1",
    image: "/insight-1.jpg",
    date: "APR 22, 2025",
    title: "GCC Performance Across Engineering",
    href: "/insight",
  },
  {
    id: "insight-2",
    image: "/insigth-2.jpg",
    date: "APR 22, 2025",
    title: "The Hidden Cost of Employee Disengagement",
    href: "/insight",
  },
  {
    id: "insight-3",
    image: "/insight-1.jpg",
    date: "APR 22, 2025",
    title: "GCC Performance Across Engineering",
    href: "/insight",
  },
  {
    id: "insight-4",
    image: "/insigth-2.jpg",
    date: "APR 22, 2025",
    title: "The Hidden Cost of Employee Disengagement",
    href: "/insight",
  },
];

export interface SolutionDetailInsightsProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  insights?: SolutionInsightItem[];
}

export default function SolutionDetailInsights({
  eyebrow = "EXPLORE INSIGHTS",
  title = "Insights That Move Work \nForward",
  description = "Explore the latest ideas, trends, and perspectives on workforce intelligence, employee engagement, and performance to make smarter people decisions.",
  insights = defaultInsights,
}: SolutionDetailInsightsProps) {
  // 2 cards per slide on desktop, total slides = Math.ceil(insights.length / 2)
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const totalSlides = Math.ceil(insights.length / 2);

  return (
    <section className="py-16 md:py-24 bg-[#F7F6F3]">
      <div className="px-[5%]">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#F8780C] shadow-[0_0_8px_rgba(248,120,12,0.55)]"
            />
            <span className="font-mono text-xs font-semibold text-[#F8780C] tracking-wider uppercase">
              {eyebrow}
            </span>
          </div>

          <h2 className="font-sora text-[#002E40] text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-tight whitespace-pre-line leading-[1.12] mb-4">
            {title}
          </h2>

          <p className="font-sora text-[#62737A] text-sm sm:text-lg leading-[1.3] max-w-4xl mx-auto">
            {description}
          </p>
        </div>

        {/* Slider Carousel Container */}
        <div className="relative overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {/* Render slides in pairs */}
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const pair = insights.slice(slideIndex * 2, slideIndex * 2 + 2);
              return (
                <div
                  key={`slide-${slideIndex}`}
                  className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                >
                  {pair.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group relative rounded-[24px] overflow-hidden min-h-[340px] sm:min-h-[380px] flex flex-col justify-between p-8 sm:p-10 border border-[#ECE9E3] shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,46,64,0.12)] hover:-translate-y-1"
                    >
                      {/* Background Photo */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Gradient Scrim for text readability */}
                      {/* <div className="absolute inset-0 bg-gradient-to-t from-[#002E40]/90 via-[#002E40]/35 to-transparent pointer-events-none" /> */}

                      {/* Top Date Tag with dot */}
                      <div className="relative z-10 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span className="font-mono text-xs font-medium text-white/95 uppercase tracking-wider">
                          {item.date}
                        </span>
                      </div>

                      {/* Bottom Title & Action Link */}
                      <div className="relative z-10">
                        <h3 className="font-sora text-white text-2xl sm:text-[28px] font-normal leading-snug tracking-tight mb-4 group-hover:text-[#F8780C] transition-colors">
                          {item.title}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/95 group-hover:text-white transition-colors font-medium">
                          READ THE FULL CASE STUDY <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Slider Bars (matching Image 2) */}
        <div className="flex items-center justify-center gap-3 mt-8 sm:mt-10">
          {Array.from({ length: totalSlides }).map((_, index) => {
            const isActive = index === activeSlide;
            return (
              <button
                key={`slider-dot-${index}`}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-12 sm:w-14 bg-[#F8780C]"
                    : "w-12 sm:w-14 bg-[#CBD5E1] hover:bg-[#94A3B8]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
