"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

export interface CaseStudyItem {
  id: string;
  category: string;
  title: string;
  href: string;
  imageSrc: string;
  stats: {
    value: string;
    label: string;
    highlighted?: boolean;
  }[];
}

// Exactly 2 case studies as specified
export const caseStudiesData: CaseStudyItem[] = [
  {
    id: "semiconductor-engineering",
    category: "SEMICONDUCTOR ENGINEERING",
    title: "How a Semiconductor Design \nCenter Accelerated Engineering Ramp-Up",
    href: "/case-studies/semiconductor-design-center",
    imageSrc: "/real-world-impact-1.jpg",
    stats: [
      {
        value: "28%",
        label: "Reduction in first-six-month attrition",
        highlighted: false,
      },
      {
        value: "40%",
        label: "Reduction in time to meaningful contribution",
        highlighted: true,
      },
    ],
  },
  {
    id: "enterprise-technology",
    category: "ENTERPRISE TECHNOLOGY",
    title:
      "How a Global Software Enterprise Retained Critical Engineering Talent Across 14 Hubs",
    href: "/case-studies/enterprise-technology-retention",
    imageSrc: "/real-world-impact-2.jpg",
    stats: [
      {
        value: "34%",
        label: "Increase in leadership bench depth",
        highlighted: false,
      },
      {
        value: "55%",
        label: "Reduction in unprompted key-talent flight risk",
        highlighted: true,
      },
    ],
  },
];

export default function BetterPeople() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [maxOffset, setMaxOffset] = useState<number>(0);
  const [stepWidth, setStepWidth] = useState<number>(0);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const lastIndex = caseStudiesData.length - 1;

  // Dynamically calculate exact slide offset for the peeking card track
  useEffect(() => {
    const updateOffset = () => {
      if (firstCardRef.current) {
        const cardWidth = firstCardRef.current.offsetWidth;
        const gap = window.innerWidth >= 640 ? 28 : 20;
        const leftPadding = window.innerWidth * 0.05;
        const rightPadding = window.innerWidth * 0.05;
        const totalContentWidth =
          leftPadding +
          cardWidth * caseStudiesData.length +
          gap * (caseStudiesData.length - 1);
        const calculatedOffset = Math.max(
          0,
          totalContentWidth - (window.innerWidth - rightPadding)
        );
        setMaxOffset(calculatedOffset);
        setStepWidth(cardWidth + gap);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (caseStudiesData.length < 2) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev >= lastIndex ? 0 : prev + 1));
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentIndex, lastIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setCurrentIndex((prev) => Math.min(prev + 1, lastIndex));
    } else if (diff < -50) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    touchStartXRef.current = null;
  };

  const translateX = Math.min(currentIndex * stepWidth, maxOffset);

  return (
    <section
      id="impacts"
      aria-label="Real World Impacts"
      className="relative w-full bg-[#F7F6F3] py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Centered Header Section */}
      <div className="px-[5%] mb-10 sm:mb-12 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center justify-center gap-2 text-[11px] sm:text-base font-geist-mono font-medium tracking-tight text-[#F06A25] uppercase mb-3.5">
          <span
            aria-hidden="true"
            className="inline-block w-1.5 h-1.5 rounded-full bg-[#F06A25] shadow-[0_0_8px_2px_rgba(240,106,37,0.45)]"
          />
          <span>REAL WORLD IMPACTS</span>
        </div>

        {/* Headline */}
        <BlurText
          as="h2"
          delay={20}
          text={"Better people decisions.\nMeasurable outcomes."}
          className="font-sora text-3xl sm:text-4xl lg:text-[46px] font-sora font-normal tracking-[-0.03em] text-[#254F5F] leading-[1.14] mb-6"
        />

        {/* Centered CTA Pill */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#ECE8E2] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#F06A25]/40 text-[#142938] text-base font-mono font-medium tracking-[0.04em] uppercase transition-all duration-200 hover:-translate-y-0.5"
        >
          <span>READ MORE SUCCESS STUDIES</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#62737A]" />
        </Link>
      </div>

      {/* Card Carousel Track */}
      <div
        className="w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex pl-[5%] gap-5 sm:gap-7 transition-transform duration-600 ease-out"
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {caseStudiesData.map((study, idx) => {
            const isFirst = idx === 0;
            const isCardActive = idx === currentIndex;

            return (
              <div
                key={study.id}
                ref={isFirst ? firstCardRef : undefined}
                onClick={() => {
                  if (!isCardActive) {
                    setCurrentIndex(idx);
                  }
                }}
                className={`relative shrink-0 rounded-[24px] sm:rounded-[28px] overflow-hidden border select-none w-[86vw] sm:w-[80vw] lg:w-[76vw] h-[460px] sm:h-[500px] lg:h-[520px] flex items-stretch justify-end p-3 sm:p-4 lg:p-3 transition-all duration-300 ease-out ${
                  isCardActive
                    ? "border-[#E3DDD5] shadow-[0_14px_40px_rgba(0,30,45,0.08)] opacity-100"
                    : "border-[#E8E4DD] opacity-80 cursor-pointer hover:opacity-100"
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={study.imageSrc}
                    alt={study.title}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1100px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent sm:hidden" />
                </div>

                {/* Inset White Content Card */}
                <div className="relative z-10 bg-[#FAF9F7]/95 backdrop-blur-sm sm:bg-[#FAF9F7] rounded-[20px] sm:rounded-[22px] p-6 sm:p-8 lg:p-9 shadow-sm border border-[#F0ECE6] w-full sm:w-[420px] lg:w-[460px] h-full flex flex-col justify-between">
                  <div>
                    <div className="text-[10.5px] sm:text-[11px] font-mono font-medium tracking-[0.06em] text-[#78888F] uppercase">
                      {study.category}
                    </div>
                  </div>

                  <div>
                    <BlurText
                      as="h3"
                      delay={20}
                      text={study.title}
                      className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[#0F313F] font-sora leading-[1.28] mb-4"
                    />

                    <Link
                      href={study.href}
                      onClick={(e) => e.stopPropagation()}
                      className="group inline-flex items-center gap-1.5 text-base font-mono font-medium tracking-tight text-[#254F5F] hover:text-[#F06A25] uppercase transition-colors duration-200"
                    >
                      <span>READ THE FULL CASE STUDY</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>

                  {/* Bottom Stats */}
                  <div className="grid grid-cols-2 gap-5 pt-5">
                    {study.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="flex flex-col">
                        <span
                          className={`text-3xl sm:text-[42px] font-sora font-normal tracking-tight mb-1 leading-none ${
                            stat.highlighted
                              ? "text-[#F06A25]"
                              : "text-[#62737A]"
                          }`}
                        >
                          {stat.value}
                        </span>
                        <span className="text-[11.5px] sm:text-sm font-sora text-[#62737A] leading-[1.35]">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Pagination Bars */}
      <div className="flex items-center justify-center gap-2.5 mt-7 sm:mt-8 px-[5%]">
        {caseStudiesData.map((_, dotIdx) => {
          const isCurrent = currentIndex === dotIdx;
          return (
            <button
              key={dotIdx}
              type="button"
              aria-label={`Go to case study ${dotIdx + 1}`}
              onClick={() => setCurrentIndex(dotIdx)}
              className={`h-[3.5px] rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                isCurrent
                  ? "w-12 sm:w-14 bg-[#F06A25]"
                  : "w-12 sm:w-14 bg-[#CBD2D6] hover:bg-[#AEB8BD]"
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
