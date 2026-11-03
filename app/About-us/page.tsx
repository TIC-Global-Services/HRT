import React from "react";
import Breadcrumb from "@/reuseable/breadcrum";

export const metadata = {
  title: "About Us",
  description: "Learn about the mission, leadership, and team behind Claripa AI.",
};

export default function AboutUsPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-6">
        <Breadcrumb variant="trail" />
      </div>

      <div className="max-w-3xl space-y-4">
        <Breadcrumb variant="badge" text="OUR MISSION" dotColor="#F06A25" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Empowering Leaders with Clear Signals
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          People decisions shouldn&apos;t be made on gut feelings alone. Claripa was founded to give HR and organizational leaders predictive clarity into workforce health, team alignment, and talent momentum.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-3xl font-extrabold text-[#1C4E5B]">98.4%</div>
          <div className="text-sm font-semibold text-slate-800 mt-1">Prediction Accuracy</div>
          <p className="text-xs text-slate-500 mt-1">Validated against 18-month historical turnover benchmarks.</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-3xl font-extrabold text-[#F06A25]">40+</div>
          <div className="text-sm font-semibold text-slate-800 mt-1">HRIS Integrations</div>
          <p className="text-xs text-slate-500 mt-1">Plug-and-play with Workday, BambooHR, Rippling, and Slack.</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-3xl font-extrabold text-[#1C4E5B]">100%</div>
          <div className="text-sm font-semibold text-slate-800 mt-1">Privacy First</div>
          <p className="text-xs text-slate-500 mt-1">Zero raw message exposure. Only aggregated, anonymized signals.</p>
        </div>
      </div>
    </main>
  );
}
