"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Search, Sparkles } from "lucide-react";
import { allBlogs, allCaseStudies, type BlogPost } from "@/data/blogs";
import BlurText from "@/reuseable/BlurText";

export interface LibraryArticleItem {
  id: string;
  title: string;
  category: string;
  topic: string;
  date: string;
  image: string;
  href: string;
  cta: string;
  isAskClaripa?: boolean;
  isVideo?: boolean;
}

export const defaultCategories = [
  "ALL",
  "BLOGS",
  "CASE STUDIES",
];

export const defaultTopics = [
  "ALL",
  "ATTRITION",
  "ENGAGEMENT",
  "AI",
  "ANALYTICS",
  "ONBOARDING",
];

function mapPostToLibraryItem(
  post: BlogPost,
  category: string,
  cta: string
): LibraryArticleItem {
  return {
    id: post.slug,
    title: post.title,
    category,
    topic: post.topic.charAt(0).toUpperCase() + post.topic.slice(1).toLowerCase(),
    date: post.date,
    image: post.image,
    href: `/insight/${post.slug}`,
    cta,
  };
}

// Map all 6 official blogs and 3 product case studies to library items
export const blogLibraryArticles: LibraryArticleItem[] = allBlogs.map((b) =>
  mapPostToLibraryItem(b, "BLOGS", "READ FULL ARTICLE")
);

export const caseStudyLibraryArticles: LibraryArticleItem[] = allCaseStudies.map((cs) =>
  mapPostToLibraryItem(cs, "CASE STUDY", "READ THE FULL CASE STUDY")
);

export const defaultLibraryArticles: LibraryArticleItem[] = [
  ...blogLibraryArticles,
  ...caseStudyLibraryArticles,
];

export interface InsightsLibraryProps {
  articles?: LibraryArticleItem[];
  searchQuery?: string;
  onSearchQueryChange?: (value: string) => void;
  searchPlaceholder?: string;
  categories?: string[];
  topics?: string[];
  className?: string;
}

export default function InsightsLibrary({
  articles = defaultLibraryArticles,
  searchQuery,
  onSearchQueryChange,
  searchPlaceholder = "Search articles, case studies...",
  categories = defaultCategories,
  topics = defaultTopics,
  className = "",
}: InsightsLibraryProps) {
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedTopic, setSelectedTopic] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(9);

  const activeSearchQuery = searchQuery ?? internalSearchQuery;
  const handleSearchChange = (value: string) => {
    if (onSearchQueryChange) {
      onSearchQueryChange(value);
    } else {
      setInternalSearchQuery(value);
    }
  };

  const filteredArticles = useMemo(() => {
    const query = activeSearchQuery.trim().toLowerCase();

    return articles.filter((article) => {
      // Category filter matching
      const matchesCategory = (() => {
        if (selectedCategory === "ALL") return true;
        const cat = article.category.toUpperCase();
        if (selectedCategory === "CASE STUDIES") return cat.includes("CASE");
        if (selectedCategory === "BLOGS") return cat.includes("BLOG");
        return cat === selectedCategory;
      })();

      // Topic filter matching
      const matchesTopic = (() => {
        if (selectedTopic === "ALL") return true;
        return article.topic.toUpperCase() === selectedTopic.toUpperCase();
      })();

      // Search query filter matching
      const matchesSearch = (() => {
        if (!query) return true;
        const searchTarget = `${article.title} ${article.category} ${article.topic}`.toLowerCase();
        return searchTarget.includes(query);
      })();

      return matchesCategory && matchesTopic && matchesSearch;
    });
  }, [articles, activeSearchQuery, selectedCategory, selectedTopic]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <section className={`w-full py-10 md:py-14 ${className}`.trim()}>
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <form
          className="relative w-full max-w-[640px] mx-auto mb-6 md:mb-8 flex items-center bg-white rounded-full border border-[#E3E8EA] shadow-[0_2px_12px_rgba(0,0,0,0.03)] py-1.5 pl-5 pr-2 transition-all duration-200 focus-within:border-[#204958]/40 focus-within:shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
          onSubmit={(event) => event.preventDefault()}
          role="search"
        >
          <Search
            aria-hidden="true"
            size={18}
            className="shrink-0 text-[#8B9DA6] mr-3"
          />
          <input
            aria-label="Search articles and case studies"
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            type="search"
            value={activeSearchQuery}
            className="w-full min-w-0 border-0 outline-none text-[#002e40] text-[13px] sm:text-sm font-sora placeholder-[#8B9DA6] bg-transparent"
          />
          <button
            type="submit"
            className="inline-flex min-h-[38px] items-center justify-center px-6 rounded-full bg-[#204958] text-white font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#153845] transition-colors shrink-0 shadow-xs"
          >
            SEARCH
          </button>
        </form>

        {/* Floating Filter Bar */}
        <div className="w-full bg-white rounded-full border border-[#E3E8EA] shadow-[0_2px_12px_rgba(0,0,0,0.03)] px-2.5 py-1.5 sm:px-3 sm:py-2 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 mb-8 md:mb-10">
          {/* Category Tabs */}
          <div
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full md:w-auto py-1 no-scrollbar"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-sm font-semibold tracking-tight uppercase transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-[#204958] text-white shadow-xs"
                      : "text-[#62737A] hover:text-[#002e40] bg-transparent"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Topic Dropdown */}
          <div className="relative shrink-0 self-end md:self-auto pr-1">
            <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E3E8EA] text-[#62737A] font-mono text-[10px] sm:text-xs font-medium tracking-tight uppercase bg-transparent cursor-pointer hover:border-[#CBD6DA] transition-colors">
              <span>TOPIC:</span>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="bg-transparent border-0 outline-none text-[#002e40] font-semibold cursor-pointer uppercase tracking-wider"
              >
                {topics.map((t) => (
                  <option key={t} value={t} className="text-[#002e40] bg-white">
                    {t}
                  </option>
                ))}
              </select>
              {/* <ChevronDown size={14} className="text-[#8B9DA6]" aria-hidden="true" /> */}
            </label>
          </div>
        </div>

        {/* 3-Column Card Grid */}
        {displayedArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {displayedArticles.map((article, idx) => (
              <Link
                key={`${article.id}-${idx}`}
                href={article.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] md:rounded-[26px] min-h-[380px] sm:min-h-[420px] p-6 sm:p-7 text-white no-underline shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                {/* Background Image / Solid Color */}
                {article.isAskClaripa ? (
                  <div
                    className="absolute inset-0 bg-[#1D404E] pointer-events-none"
                    aria-hidden="true"
                  />
                ) : (
                  <>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 object-left"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 pointer-events-none"
                      aria-hidden="true"
                    />
                  </>
                )}

                {/* Top Row: Date + Category Glass Badge */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="inline-flex items-center gap-2 text-white/90 font-mono text-[11px] tracking-wider uppercase font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
                    {article.date}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono text-[10px] tracking-wider uppercase font-medium shadow-xs">
                    {article.category}
                  </span>
                </div>

                {/* Center Badge for Special Cards */}
                {article.isAskClaripa && (
                  <div className="relative z-10 my-auto flex justify-center py-6">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#002e40] font-sora font-semibold text-sm shadow-md transition-transform duration-300 group-hover:scale-105">
                      <Sparkles size={16} className="text-[#002e40]" aria-hidden="true" />
                      <span>Ask Claripa</span>
                    </div>
                  </div>
                )}

                {article.isVideo && (
                  <div className="relative z-10 my-auto flex justify-start py-6">
                    <div className="w-11 h-11 rounded-full bg-white text-[#002e40] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play size={16} fill="currentColor" className="ml-0.5 text-[#002e40]" aria-hidden="true" />
                    </div>
                  </div>
                )}

                {/* Bottom Content: Title + CTA */}
                <div className="relative z-10 flex flex-col items-start gap-3 mt-auto pt-6">
                  <BlurText
                    as="h3"
                    text={article.title}
                    delay={20}
                    className="text-white font-sora text-xl sm:text-[28px] font-medium leading-[1.2] tracking-tight group-hover:text-white/95 transition-colors"
                  />

                  <span className="inline-flex items-center gap-2 text-white font-mono text-base tracking-tight uppercase font-medium group-hover:text-[#F8750C] transition-colors">
                    {article.cta}
                    <span className="text-sm font-sans transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 px-6 border border-dashed border-[#CBD6DA] rounded-3xl text-center bg-white/50">
            <p className="text-[#62737A] font-sora text-base m-0">
              No resources match those filters. Try selecting another topic or category.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {filteredArticles.length > visibleCount && (
          <div className="flex justify-center mt-12 md:mt-16">
            <button
              type="button"
              onClick={handleLoadMore}
              className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#62737A] hover:text-[#002e40] transition-colors cursor-pointer py-2 px-6"
            >
              LOAD MORE
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
