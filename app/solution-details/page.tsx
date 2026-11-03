import React from "react";
import Link from "next/link";
import Breadcrumb from "@/reuseable/breadcrum";

export const metadata = {
  title: "Solution Details",
  description: "In-depth look at Claripa flight risk mitigation and talent intelligence workflows.",
};

export default function SolutionDetailsPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-6">
        <Breadcrumb
          variant="trail"
          items={[
            { label: "Home", href: "/" },
            { label: "Solutions", href: "/solution-hub" },
            { label: "Flight Risk Mitigation" },
          ]}
        />
      </div>

      <div className="max-w-3xl space-y-4">
        <Breadcrumb variant="badge" text="DEEP DIVE" dotColor="#F06A25" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Flight Risk Mitigation Workflows
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          How Claripa connects subtle signals like sentiment shifts, milestone anniversaries, and communication drop-offs to prevent critical attrition.
        </p>
      </div>

      <div className="mt-12 p-8 rounded-3xl bg-slate-50 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Recommended Next Step</h3>
        <p className="text-slate-600 text-sm max-w-xl">
          Schedule a tailored walkthrough of the Claripa dashboard with your team&apos;s specific workforce parameters.
        </p>
        <Link
          href="/contact-us"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-[#1C4E5B] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-xs hover:bg-[#143B45]"
        >
          Book a Live Demo
        </Link>
      </div>
    </main>
  );
}
