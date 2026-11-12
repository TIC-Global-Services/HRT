"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { allBlogs, allCaseStudies } from "@/data/blogs";
import BlurText from "@/reuseable/BlurText";

export interface ArticleItem {
  title: string;
  category: string;
  topic: string;
  date: string;
  image: string;
  href: string;
  cta?: string;
  isFeatured?: boolean;
}

export const defaultArticles: ArticleItem[] = [...allCaseStudies, ...allBlogs]
  .map((item) => ({
    title: item.title,
    category: item.category,
    topic: item.topic.charAt(0).toUpperCase() + item.topic.slice(1).toLowerCase(),
    date: item.date,
    image: item.image,
    href: `/insight/${item.slug}`,
    cta: item.category === "CASE STUDY" ? "READ THE FULL CASE STUDY" : "READ FULL ARTICLE",
    isFeatured: item.isFeatured === true,
  }))
  .filter((item) => item.isFeatured);

export interface FeaturedInsightsProps {
  eyebrow?: string;
  articles?: ArticleItem[];
  className?: string;
}

export default function FeaturedInsights({
  eyebrow = "FEATURED",
  articles = defaultArticles,
  className = "",
}: FeaturedInsightsProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const featuredArticles = articles.filter((article) => article.isFeatured === true);

  // Group into pairs (2 articles per slide)
  const slides: ArticleItem[][] = [];
  for (let i = 0; i < featuredArticles.length; i += 2) {
    slides.push(featuredArticles.slice(i, i + 2));
  }

  const totalSlides = Math.max(slides.length, 1);
  const currentPair = slides[activeSlide] || slides[0] || [];

  return (
    <div className={`w-full max-w-[1200px] mx-auto mt-12 md:mt-16 ${className}`.trim()}>
      {/* Header bar: • FEATURED and 01 / 03 */}
      <div className="flex items-center justify-between mb-4 md:mb-5 px-1">
        <span className="inline-flex items-center gap-2 text-[#E56A1E] font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E56A1E]" aria-hidden="true" />
          {eyebrow}
        </span>
        <span className="text-[#8B9DA6] font-mono text-xs tracking-widest font-medium">
          {String(activeSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </span>
      </div>

      {/* Grid of 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {currentPair.map((article, index) => (
          <Link
            key={`${article.title}-${index}`}
            href={article.href}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] md:rounded-[30px] min-h-[380px] sm:min-h-[410px] md:min-h-[430px] p-7 sm:p-8 md:p-9 text-white no-underline shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300"
          >
            {/* Background Image */}
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority={activeSlide === 0 && index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Dark gradient overlay for optimal legibility */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none"
              aria-hidden="true"
            />

            {/* Top row: Date with white dot + Category glass pill */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="inline-flex items-center gap-2 text-white/90 font-mono text-[11px] sm:text-xs tracking-wider uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
                {article.date}
              </span>

              <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-medium shadow-xs">
                {article.category}
              </span>
            </div>

            {/* Bottom Content: Title + CTA */}
            <div className="relative z-10 flex flex-col items-start gap-3 md:gap-4 mt-auto pt-16">
              <BlurText
                as="h3"
                text={article.title}
                delay={20}
                className="text-white font-sora text-2xl sm:text-3xl md:text-[28px] font-semibold leading-[1.22] tracking-tight group-hover:text-white/95 transition-colors"
              />

              <span className="inline-flex items-center gap-2 text-white font-mono text-[11px] sm:text-xs tracking-wider uppercase font-medium group-hover:text-[#F8750C] transition-colors">
                {article.cta || "READ THE FULL CASE STUDY"}
                <span className="text-sm font-sans transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Bars Indicator */}
      {totalSlides > 1 && (
        <div className="flex items-center justify-center gap-2.5 mt-7 md:mt-8" role="tablist" aria-label="Featured slides">
          {slides.map((_, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "w-16 bg-[#E56A1E]"
                    : "w-14 bg-[#DAD9D7] hover:bg-[#BFC8CB]"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
