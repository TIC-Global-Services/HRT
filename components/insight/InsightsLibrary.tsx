"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { ArticleItem, defaultArticles } from "./FeaturedInsights";

export const defaultCategories = [
  "All",
  "Blogs",
  "Case Studies",
  "Reports & Guides",
  "Webinars",
  "News",
];

export const defaultTopics = [
  "All",
  "Attrition",
  "Engagement",
  "AI",
  "Analytics",
  "Onboarding",
];

export interface InsightsLibraryProps {
  eyebrow?: string;
  title?: string;
  articles?: ArticleItem[];
  searchQuery?: string;
  categories?: string[];
  topics?: string[];
}

export default function InsightsLibrary({
  eyebrow = "EXPLORE THE LIBRARY",
  title = "Research, stories and practical guides.",
  articles = defaultArticles,
  searchQuery = "",
  categories = defaultCategories,
  topics = defaultTopics,
}: InsightsLibraryProps) {
  const [category, setCategory] = useState("All");
  const [topic, setTopic] = useState("All");

  const filteredArticles = useMemo(() => {
    const searchTerm = searchQuery.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory =
        category === "All" || article.category === category;
      const matchesTopic = topic === "All" || article.topic === topic;
      const matchesSearch =
        searchTerm.length === 0 ||
        `${article.title} ${article.category} ${article.topic}`
          .toLowerCase()
          .includes(searchTerm);
      return matchesCategory && matchesTopic && matchesSearch;
    });
  }, [articles, category, searchQuery, topic]);

  return (
    <section className="py-16 md:py-[88px]">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                aria-pressed={category === item}
                className={`px-4 py-2 border rounded-full text-xs font-sora cursor-pointer transition-colors ${
                  category === item
                    ? "border-[#002e40] bg-[#002e40] text-white"
                    : "border-[#e9edef] bg-white text-[#62737a] hover:border-[#cbd6da]"
                }`}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#e9edef] rounded-full text-xs text-[#002e40] font-sora bg-white">
            <span className="text-[#62737a]">Topic:</span>
            <select
              onChange={(event) => setTopic(event.target.value)}
              value={topic}
              className="bg-transparent border-0 outline-none text-[#002e40] font-medium cursor-pointer"
            >
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                className="border border-[#e9edef] rounded-[20px] bg-white overflow-hidden flex flex-col no-underline group hover:shadow-md transition-shadow"
                key={article.title}
              >
                <Link
                  className="relative block w-full h-[190px] overflow-hidden bg-[#fbf9f5]"
                  href={article.href}
                >
                  <Image
                    alt=""
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    src={article.image}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute z-10 top-3 left-3 px-2.5 py-1.5 border border-white/35 rounded-full bg-[#002e40]/55 text-white font-mono text-[9px] uppercase tracking-wider backdrop-blur-xs">
                    {article.category}
                  </span>
                </Link>
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <p className="flex items-center gap-2 m-0 text-[#f8780c] font-mono text-[11px] font-medium tracking-[0.02em] uppercase">
                      {article.date} · {article.topic}
                    </p>
                    <h3 className="mt-3 mb-2 text-[#002e40] font-sora text-lg font-medium tracking-[-0.035em] leading-snug">
                      <Link href={article.href} className="hover:text-[#254f5f] transition-colors">
                        {article.title}
                      </Link>
                    </h3>
                  </div>
                  <Link
                    className="inline-flex items-center gap-[7px] text-[#254f5f] font-mono text-xs uppercase no-underline hover:text-[#f8780c] transition-colors mt-4"
                    href={article.href}
                  >
                    Read more <ArrowUpRight aria-hidden="true" size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="py-10 px-5 border border-dashed border-[#cbd6da] rounded-2xl text-[#62737a] text-center font-sora">
            No resources match those filters. Try another topic or search.
          </p>
        )}
      </div>
    </section>
  );
}
