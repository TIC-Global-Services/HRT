import React from "react";
import Link from "next/link";
import Breadcrumb from "@/reuseable/breadcrum";

export const metadata = {
  title: "Solution Hub",
  description: "Explore Claripa solutions for workforce health, talent retention, and leadership.",
};

export default function SolutionHubPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-6">
        <Breadcrumb variant="trail" />
      </div>

      <div className="max-w-3xl space-y-4">
        <Breadcrumb variant="badge" text="SOLUTIONS ECOSYSTEM" dotColor="#F06A25" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Workforce Solutions That Drive Outcomes
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          From early disengagement mitigation to organizational design, Claripa provides targeted
          modules for high-performing enterprises.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#F06A25]">
            Retention & Mobility
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Flight Risk Mitigation</h2>
          <p className="text-slate-600 mt-3 text-sm leading-relaxed">
            Spot sentiment dips, uneven manager 1-on-1s, and workload imbalances before they translate
            into costly attrition.
          </p>
          <Link
            href="/solution-details"
            className="inline-block mt-6 text-sm font-semibold text-[#1C4E5B] hover:underline underline-offset-4"
          >
            Explore Solution Details →
          </Link>
        </div>

        <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#1C4E5B]">
            Workforce Dynamics
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Workforce Health Index</h2>
          <p className="text-slate-600 mt-3 text-sm leading-relaxed">
            Get an aggregated, department-level pulse on burnout risks, engagement vitality, and internal mobility.
          </p>
          <Link
            href="/solution-details"
            className="inline-block mt-6 text-sm font-semibold text-[#1C4E5B] hover:underline underline-offset-4"
          >
            Explore Solution Details →
          </Link>
        </div>
      </div>
    </main>
  );
}
