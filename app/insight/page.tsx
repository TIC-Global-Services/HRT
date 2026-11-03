import React from "react";
import Link from "next/link";
import Breadcrumb from "@/reuseable/breadcrum";

export const metadata = {
  title: "Insights & Benchmarks",
  description: "Workforce research, whitepapers, and data-backed intelligence for people leaders.",
};

export default function InsightPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-6">
        <Breadcrumb variant="trail" />
      </div>

      <div className="max-w-3xl space-y-4">
        <Breadcrumb variant="badge" text="RESEARCH & BENCHMARKS" dotColor="#F06A25" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Workforce Insights & Trends
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Proprietary data, benchmarks, and tactical guides on modern people decisions.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <article className="p-8 rounded-3xl border border-slate-200 bg-white hover:shadow-xl transition-all">
          <span className="text-xs font-semibold text-[#F06A25] uppercase tracking-wider">Report</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">The 2026 People Decisions Index</h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Analysis of 500k+ performance indicators and why proactive sentiment detection is replacing annual reviews.
          </p>
        </article>
        <article className="p-8 rounded-3xl border border-slate-200 bg-white hover:shadow-xl transition-all">
          <span className="text-xs font-semibold text-[#1C4E5B] uppercase tracking-wider">Case Study</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Reducing Tech Turnover by 34%</h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            How a 4,000-person enterprise deployed Claripa early warning signals to retain critical engineering talent.
          </p>
        </article>
      </div>
    </main>
  );
}
