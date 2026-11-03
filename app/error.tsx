"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { BreadcrumbBadge } from "@/reuseable/breadcrum";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden bg-white">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial from-red-100/40 via-amber-50/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-md mx-auto space-y-6">
        <BreadcrumbBadge
          label="UNEXPECTED ERROR"
          dotColor="#EF4444"
          className="mx-auto"
        />

        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
          <AlertTriangle className="w-7 h-7 stroke-[2]" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            An unexpected error occurred while processing your request. Please
            try again or return to the homepage.
          </p>
          {error?.digest && (
            <p className="mt-2 text-xs font-mono text-slate-400 bg-slate-50 py-1 px-2 rounded-md inline-block">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-[#1C4E5B] hover:bg-[#143B45] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-6 py-3 rounded-full shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold tracking-wider uppercase px-6 py-3 rounded-full shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

