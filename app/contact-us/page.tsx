"use client";

import React, { useState } from "react";
import Breadcrumb from "@/reuseable/breadcrum";

export default function ContactUsPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-6">
        <Breadcrumb variant="trail" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <Breadcrumb variant="badge" text="GET IN TOUCH" dotColor="#F06A25" />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Book a Demo or Speak with Our Team
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            See how Claripa connects your workforce signals in real time. We&apos;ll prepare a customized demonstration tailored to your organization size and HR technology stack.
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="text-sm">
              <span className="font-semibold text-slate-900 block">Headquarters:</span>
              <span className="text-slate-600">San Francisco, CA & Global Remote</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-slate-900 block">Inquiries:</span>
              <span className="text-slate-600">hello@claripa.ai</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-slate-900 block">Security & Compliance:</span>
              <span className="text-slate-600">security@claripa.ai</span>
            </div>
          </div>
        </div>

        {/* Demo Request Form */}
        <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Schedule Your Demo</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault?.()}>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1C4E5B]"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1C4E5B]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1C4E5B]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Company Size
              </label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1C4E5B]">
                <option>50 - 250 employees</option>
                <option>251 - 1,000 employees</option>
                <option>1,001 - 5,000 employees</option>
                <option>5,000+ employees</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-3.5 px-6 rounded-full bg-[#1C4E5B] hover:bg-[#143B45] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md transition-all cursor-pointer"
            >
              Request Demo Access
            </button>
            <p className="text-[11px] text-slate-500 text-center mt-3">
              We respect your privacy. No spam. SOC 2 Type II compliant.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
