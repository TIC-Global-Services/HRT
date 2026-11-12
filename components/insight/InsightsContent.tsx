"use client";

import { useState } from "react";
import InsightsHero from "./InsightsHero";
import InsightsLibrary from "./InsightsLibrary";
import NewsletterSubscribe from "./NewsletterSubscribe";

export default function InsightsContent() {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-[#F7F6F3] text-[#002e40] font-sora min-h-screen">
      <InsightsHero />
      <InsightsLibrary searchQuery={query} onSearchQueryChange={setQuery} />
      <NewsletterSubscribe />
      {/* <div className="w-[min(1200px,calc(100%-48px))] mx-auto">
        <ImpactCTA />
      </div> */}
    </div>
  );
}
