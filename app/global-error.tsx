"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-slate-900 font-sans">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">System Error</h1>
          <p className="text-sm text-slate-600">
            A critical error occurred. Please refresh or try again.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => reset()}
              className="px-6 py-2.5 rounded-full bg-[#1C4E5B] text-white text-sm font-semibold uppercase tracking-wider shadow-sm"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

