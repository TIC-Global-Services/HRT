"use client";

import FeaturedInsights, {
  ArticleItem,
  defaultArticles as defaultFeaturedArticles,
} from "./FeaturedInsights";
import BlurText from "@/reuseable/BlurText";

export interface InsightsHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  showFeatured?: boolean;
  featuredArticles?: ArticleItem[];
}

export default function InsightsHero({
  eyebrow = "INSIGHTS",
  title = "Insights for better\npeople decisions.",
  description = "Research, guides and real stories for HR and people leaders.",
  showFeatured = true,
  featuredArticles = defaultFeaturedArticles,
}: InsightsHeroProps) {
  return (
    <section className="w-full bg-[#F7F6F3] text-[#002e40] pt-10 pb-8 sm:pt-14 sm:pb-12 md:pt-20 md:pb-16">
      <div className="w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))] mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <span className="text-[#E56A1E] font-mono text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-[0.14em] uppercase text-center mb-3">
          {eyebrow}
        </span>

        {/* Title */}
        <BlurText
          as="h1"
          text={title}
          trigger="load"
          delay={20}
          className="text-[#002e40] font-sora text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-normal tracking-[-0.035em] leading-[1.14] sm:leading-[1.12] text-center max-w-[760px] mx-auto whitespace-pre-line mb-3.5"
        />

        {/* Description */}
        <BlurText
          as="p"
          text={description}
          trigger="load"
          delay={20}
          className="text-[#62737a] font-sora text-sm sm:text-base md:text-[17px] leading-relaxed text-center max-w-[620px] mx-auto px-2 sm:px-0"
        />

        {/* Featured Section (Carousel) */}
        {showFeatured && (
          <FeaturedInsights articles={featuredArticles} />
        )}
      </div>
    </section>
  );
}
