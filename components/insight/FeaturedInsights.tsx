"use client";

import { useRef, useState } from "react";
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
  const [activeMobileSlide, setActiveMobileSlide] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const featuredArticles = articles.filter((article) => article.isFeatured === true);

  // Group into pairs for tablet / desktop (2 articles per slide)
  const slides: ArticleItem[][] = [];
  for (let i = 0; i < featuredArticles.length; i += 2) {
    slides.push(featuredArticles.slice(i, i + 2));
  }

  const totalSlides = Math.max(slides.length, 1);
  const currentPair = slides[activeSlide] || slides[0] || [];

  // Tablet touch swipe handler
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setActiveSlide((prev) => Math.min(prev + 1, totalSlides - 1));
    } else if (diff < -50) {
      setActiveSlide((prev) => Math.max(prev - 1, 0));
    }
    touchStartXRef.current = null;
  };

  // Mobile horizontal scroll listener to update active index
  const handleMobileScroll = () => {
    if (!mobileTrackRef.current) return;
    const container = mobileTrackRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0]?.clientWidth || 300;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveMobileSlide(Math.max(0, Math.min(index, featuredArticles.length - 1)));
  };

  const goToMobileSlide = (index: number) => {
    setActiveMobileSlide(index);
    if (!mobileTrackRef.current) return;
    const container = mobileTrackRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      const targetLeft =
        card.offsetLeft -
        container.offsetLeft -
        (container.clientWidth - card.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`w-full max-w-[1200px] mx-auto mt-8 sm:mt-12 md:mt-16 ${className}`.trim()}>
      {/* Header bar: • FEATURED and Counter */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-4 md:mb-5 px-1">
        <span className="inline-flex items-center gap-2 text-[#E56A1E] font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E56A1E]" aria-hidden="true" />
          {eyebrow}
        </span>

        {/* Mobile counter: 01 / 06 */}
        <span className="md:hidden text-[#8B9DA6] font-mono text-xs tracking-widest font-medium">
          {String(activeMobileSlide + 1).padStart(2, "0")} / {String(featuredArticles.length).padStart(2, "0")}
        </span>

        {/* Desktop & Tablet counter: 01 / 03 */}
        <span className="hidden md:inline-block text-[#8B9DA6] font-mono text-xs tracking-widest font-medium">
          {String(activeSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </span>
      </div>

      {/* Mobile View: Horizontal Snap Carousel */}
      <div className="block md:hidden w-full">
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6"
        >
          {featuredArticles.map((article, index) => (
            <Link
              key={`${article.title}-${index}`}
              href={article.href}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] min-h-[380px] sm:min-h-[400px] w-[86vw] max-w-[340px] p-6 sm:p-7 text-white no-underline shadow-[0_4px_24px_rgba(0,0,0,0.06)] shrink-0 snap-center select-none"
            >
              {/* Background Image */}
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority={index === 0}
                sizes="86vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30 pointer-events-none"
                aria-hidden="true"
              />

              {/* Top row: Date with white dot + Category glass pill */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <span className="inline-flex items-center gap-1.5 text-white/90 font-mono text-[11px] tracking-wider uppercase font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
                  {article.date}
                </span>

                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono text-[10px] tracking-wider uppercase font-medium shadow-xs">
                  {article.category}
                </span>
              </div>

              {/* Bottom Content: Title + CTA */}
              <div className="relative z-10 flex flex-col items-start gap-3 mt-auto pt-10">
                <BlurText
                  as="h3"
                  text={article.title}
                  delay={20}
                  className="text-white font-sora text-xl sm:text-2xl font-semibold leading-[1.24] tracking-tight group-hover:text-white/95 transition-colors"
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

        {/* Mobile Pagination Indicators */}
        {featuredArticles.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-5" role="tablist" aria-label="Featured mobile slides">
            {featuredArticles.map((_, idx) => {
              const isActive = activeMobileSlide === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => goToMobileSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-7 bg-[#E56A1E]"
                      : "w-2 bg-[#DAD9D7] hover:bg-[#BFC8CB]"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop & Tablet View: 2-Card Paired Grid */}
      <div
        className="hidden md:grid md:grid-cols-2 gap-5 lg:gap-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {currentPair.map((article, index) => (
          <Link
            key={`${article.title}-${index}`}
            href={article.href}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] lg:rounded-[30px] min-h-[380px] md:min-h-[400px] lg:min-h-[430px] p-6 sm:p-7 md:p-8 lg:p-9 text-white no-underline shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300"
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
            <div className="relative z-10 flex flex-col items-start gap-3 md:gap-4 mt-auto pt-14 md:pt-16">
              <BlurText
                as="h3"
                text={article.title}
                delay={20}
                className="text-white font-sora text-xl sm:text-2xl md:text-[24px] lg:text-[28px] font-semibold leading-[1.22] tracking-tight group-hover:text-white/95 transition-colors"
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

      {/* Desktop & Tablet Pagination Bars Indicator */}
      {totalSlides > 1 && (
        <div className="hidden md:flex items-center justify-center gap-2.5 mt-7 md:mt-8" role="tablist" aria-label="Featured slides">
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
                    ? "w-14 lg:w-16 bg-[#E56A1E]"
                    : "w-10 lg:w-14 bg-[#DAD9D7] hover:bg-[#BFC8CB]"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
