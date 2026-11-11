"use client";

import { Search } from "lucide-react";
import FeaturedInsights, { ArticleItem } from "./FeaturedInsights";
import BlurText from "@/reuseable/BlurText";

export interface InsightsHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  query?: string;
  onQueryChange?: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  popularTags?: string[];
  onTagClick?: (tag: string) => void;
  showFeatured?: boolean;
  featuredArticles?: ArticleItem[];
}

const defaultPopularTags = ["ATTRITION", "ONBOARDING", "MANAGERS", "PEOPLE AI"];

export default function InsightsHero({
  eyebrow = "INSIGHTS",
  title = "Insights for better\npeople decisions.",
  description = "Research, guides and real stories for HR and people leaders.",
  query = "",
  onQueryChange,
  onSubmit,
  placeholder = "Search articles, reports, case studies...",
  popularTags = defaultPopularTags,
  onTagClick,
  showFeatured = true,
  featuredArticles,
}: InsightsHeroProps) {
  const handleTagClick = (tag: string) => {
    if (onTagClick) {
      onTagClick(tag);
    } else if (onQueryChange) {
      onQueryChange(tag);
    }
  };

  return (
    <section className="w-full bg-[#F7F6F3] text-[#002e40] pt-14 pb-14 md:pt-20 md:pb-20">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <span className="text-[#E56A1E] font-mono text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-center mb-3.5">
          {eyebrow}
        </span>

        {/* Title */}
        <BlurText
          as="h1"
          text={title}
          trigger="load"
          delay={20}
          className="text-[#002e40] font-sora text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal tracking-[-0.035em] leading-[1.12] text-center max-w-[760px] mx-auto whitespace-pre-line mb-3.5"
        />

        {/* Description */}
        <BlurText
          as="p"
          text={description}
          trigger="load"
          delay={20}
          className="text-[#62737a] font-sora text-sm sm:text-base md:text-[17px] leading-relaxed text-center max-w-[620px] mx-auto mb-7 md:mb-8"
        />

        {/* Search Bar */}
        <form
          className="relative w-full max-w-[640px] flex items-center bg-white rounded-full border border-[#E3E8EA] shadow-[0_2px_12px_rgba(0,0,0,0.03)] py-1.5 pl-5 pr-2 transition-all duration-200 focus-within:border-[#204958]/40 focus-within:shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit?.();
          }}
          role="search"
        >
          <Search
            aria-hidden="true"
            size={18}
            className="shrink-0 text-[#8B9DA6] mr-3"
          />
          <input
            aria-label="Search articles, reports, and case studies"
            onChange={(event) => onQueryChange?.(event.target.value)}
            placeholder={placeholder}
            type="search"
            value={query}
            className="w-full min-w-0 border-0 outline-none text-[#002e40] text-[13px] sm:text-sm font-sora placeholder-[#8B9DA6] bg-transparent"
          />
          <button
            type="submit"
            className="inline-flex min-h-[38px] items-center justify-center px-6 rounded-full bg-[#204958] text-white font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#153845] transition-colors shrink-0 shadow-xs"
          >
            SEARCH
          </button>
        </form>

        {/* Popular Tags */}
        {popularTags && popularTags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 md:mt-5 text-center">
            <span className="text-[#8B9DA6] font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-medium mr-1">
              POPULAR:
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="px-3.5 py-1 rounded-full border border-[#DCE2E5] bg-transparent hover:bg-white hover:border-[#002e40] text-[#4A5D66] hover:text-[#002e40] font-mono text-[10px] sm:text-[11px] tracking-wider uppercase transition-all duration-150 cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Featured Section (Carousel) */}
        {showFeatured && (
          <FeaturedInsights articles={featuredArticles} />
        )}
      </div>
    </section>
  );
}
