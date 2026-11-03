import React from "react";
import Link from "next/link";
import Breadcrumb from "@/reuseable/breadcrum";

export const metadata = {
  title: "Platform",
  description: "Connect workforce data with real-time AI decision intelligence.",
};

export default function PlatformPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-6">
        <Breadcrumb variant="trail" />
      </div>

      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2">
          <Breadcrumb variant="badge" text="INTELLIGENCE PLATFORM" dotColor="#1C4E5B" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          The Claripa Intelligence Platform
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Unify your HRIS, performance management, and communication signals into a single
          predictive decision engine designed for executives and people managers.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all">
          <h3 className="text-lg font-bold text-slate-900">Real-Time Signals</h3>
          <p className="mt-2 text-sm text-slate-600">
            Automated trend detection across engagement surveys, manager check-ins, and mobility data.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all">
          <h3 className="text-lg font-bold text-slate-900">AI Flight Risk Model</h3>
          <p className="mt-2 text-sm text-slate-600">
            Identify at-risk talent 60 to 90 days before resignation signals manifest.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all">
          <h3 className="text-lg font-bold text-slate-900">Actionable Playbooks</h3>
          <p className="mt-2 text-sm text-slate-600">
            Instant recommendations for managers to conduct growth conversations and realign workloads.
          </p>
        </div>
      </div>
    </main>
  );
}
