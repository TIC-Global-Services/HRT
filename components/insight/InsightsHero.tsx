"use client";

import { Search } from "lucide-react";
import PageIntro from "@/components/shared/PageIntro";

export interface InsightsHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  query?: string;
  onQueryChange?: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

export default function InsightsHero({
  eyebrow = "INSIGHTS",
  title = "Insights for better people decisions.",
  description = "Explore ideas, research and real-world stories to make smarter people decisions.",
  query = "",
  onQueryChange,
  onSubmit,
  placeholder = "Search articles, reports, case studies…",
}: InsightsHeroProps) {
  return (
    <section className="w-[min(1200px,calc(100%-48px))] mx-auto flex flex-col items-center gap-7 pt-[90px] pb-[62px]">
      <PageIntro
        align="center"
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <form
        className="flex w-[min(670px,100%)] items-center gap-3 py-[7px] pr-2 pl-4 border border-[#e9edef] rounded-full bg-white text-[#62737a] shadow-xs"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.();
        }}
        role="search"
      >
        <Search aria-hidden="true" size={18} className="shrink-0 text-[#62737a]" />
        <input
          aria-label="Search articles, reports, and case studies"
          onChange={(event) => onQueryChange?.(event.target.value)}
          placeholder={placeholder}
          type="search"
          value={query}
          className="w-full min-w-0 border-0 outline-none text-[#002e40] text-[13px] font-sora bg-transparent"
        />
        <button
          type="submit"
          className="inline-flex min-h-[36px] items-center justify-center gap-1.5 px-4 rounded-full bg-[#002e40] text-white font-mono text-[10px] uppercase cursor-pointer hover:bg-[#174453] transition-colors shrink-0"
        >
          Search
        </button>
      </form>
    </section>
  );
}
