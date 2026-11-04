import Link from "next/link";
import { ArrowLeft, Home, Search, Compass, Sparkles } from "lucide-react";
import { BreadcrumbBadge } from "@/reuseable/breadcrum";

export const metadata = {
  title: "404 - Page Not Found | Claripa AI",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden bg-white">
      {/* Decorative background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial from-orange-100/60 via-amber-50/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-lg mx-auto space-y-6">
        <BreadcrumbBadge
          label="PAGE NOT FOUND"
          dotColor="#F06A25"
          className="mx-auto"
        />

        <div className="relative">
          <span className="text-8xl sm:text-9xl font-black tracking-tight text-slate-100 select-none block">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Signal Lost
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
          We couldn&apos;t find the page or signal you were looking for. It might
          have been moved, renamed, or is temporarily unavailable.
        </p>

        {/* Quick links */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#1C4E5B] hover:bg-[#143B45] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-6 py-3 rounded-full shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/platform"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold tracking-wider uppercase px-6 py-3 rounded-full shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Compass className="w-4 h-4 text-[#F06A25]" />
            <span>Explore Platform</span>
          </Link>
        </div>

        {/* Suggested destinations */}
        <div className="pt-8 border-t border-slate-200/60 mt-8">
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
            Popular destinations
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600">
            <Link
              href="/solution-hub"
              className="hover:text-slate-950 underline underline-offset-4"
            >
              Solution Hub
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/insight"
              className="hover:text-slate-950 underline underline-offset-4"
            >
              Workforce Insights
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/about-us"
              className="hover:text-slate-950 underline underline-offset-4"
            >
              About Claripa
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/contact-us"
              className="hover:text-slate-950 underline underline-offset-4"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

