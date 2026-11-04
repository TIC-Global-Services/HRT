"use client";

import { useState } from "react";
import InsightsHero from "./InsightsHero";
import FeaturedInsights from "./FeaturedInsights";
import InsightsLibrary from "./InsightsLibrary";
import NewsletterSubscribe from "./NewsletterSubscribe";
import ImpactCTA from "@/components/shared/ImpactCTA";

export default function InsightsContent() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-white text-[#002e40] font-sora min-h-screen">
      <InsightsHero query={query} onQueryChange={setQuery} />
      <FeaturedInsights />
      <InsightsLibrary searchQuery={query} />
      <NewsletterSubscribe />
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto">
        <ImpactCTA />
      </div>
    </div>
  );
}
