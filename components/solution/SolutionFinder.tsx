"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

export const solutionFilters = [
  "By need",
  "By industry",
  "By company size",
  "By role",
] as const;

export type SolutionFilter = (typeof solutionFilters)[number];

export interface SolutionItem {
  title: string;
  description: string;
  tags: string;
  categories?: SolutionFilter[];
  slug?: string;
  featured?: boolean;
}

const defaultSolutions: SolutionItem[] = [
  {
    title: "Align Goals and Improve Performance",
    description:
      "Connect company objectives with team and individual OKRs. Use AI-assisted goal creation and performance tracking to improve alignment and visibility.",
    tags: "Goal Alignment, OKRs, Performance Management",
    slug: "/solution-details",
    featured: true,
  },
  {
    title: "Track Tasks and Execution",
    description:
      "Connect tasks to OKRs, monitor day-to-day progress, and use AI nudges to support timely follow-ups and accountability.",
    tags: "Task Management, Progress Tracking, AI Nudges",
    slug: "/solution-details",
  },
  {
    title: "Support Employee Development",
    description:
      "Identify skill gaps and behavioural competency development needs to help organizations plan appropriate employee development interventions.",
    tags: "Skill Gap Analysis, Competencies, Development",
    slug: "/solution-details",
  },
  {
    title: "Empower Managers",
    description:
      "Support managers with performance summaries, regular check-ins, and AI-assisted coaching to make conversations with team members more meaningful.",
    tags: "Manager Effectiveness, Check-ins, AI Coach",
    slug: "/solution-details",
  },
  {
    title: "Gain Workforce Performance Insights",
    description:
      "Use performance dashboards to understand progress, identify areas requiring attention, and support informed decisions across teams and the organization.",
    tags: "Performance Dashboards, Workforce Insights, Analytics",
    slug: "/solution-details",
  },
  {
    title: "Improve Performance by Development Interventions",
    description:
      "Use performance and skill gap insights to identify development needs and guide appropriate interventions to support employee improvement.",
    tags: "Performance Improvement, Skill Gaps, Interventions",
    slug: "/solution-details",
  },
];

export interface SolutionFinderProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  solutions?: SolutionItem[];
  showFilters?: boolean;
}

export default function SolutionFinder({
  eyebrow = "Find the right solution",
  title = "Built around the decisions you make every day.",
  description,
  solutions = defaultSolutions,
  showFilters = false,
}: SolutionFinderProps) {
  const [activeFilter, setActiveFilter] = useState<SolutionFilter>("By need");

  const filteredSolutions = useMemo(() => {
    if (!showFilters) return solutions;
    return solutions.filter(
      (solution) =>
        !solution.categories || solution.categories.includes(activeFilter),
    );
  }, [activeFilter, solutions, showFilters]);

  return (
    <section
      className="py-16 sm:py-20 px-[5%]"
      id="solution-finder"
    >
      <div className="flex flex-col items-center text-center px-4 max-w-2xl mx-auto mb-10 sm:mb-12">
        <p className="inline-flex items-center gap-2 text-[#ff6b0a] font-mono text-xs font-semibold tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b0a] shadow-[0_0_8px_rgba(255,107,10,0.45)]" />
          {eyebrow}
        </p>
        <BlurText
          as="h2"
          text={title}
          delay={20}
          className="mt-3 text-[#003247] text-3xl sm:text-4xl md:text-[42px] font-normal tracking-[-0.05em] leading-[1.05]"
        />
        {description && (
          <BlurText
            as="p"
            text={description}
            delay={20}
            className="mt-3 text-[#71838a] text-sm leading-relaxed"
          />
        )}
      </div>

      {/* Optional Filter Tabs (Disabled by default matching design) */}
      {showFilters && (
        <div
          aria-label="Filter solutions"
          className="flex flex-wrap justify-center gap-2 sm:gap-3 my-7 sm:my-8"
          role="group"
        >
          {solutionFilters.map((filter) => {
            const count = solutions.filter(
              (s) => !s.categories || s.categories.includes(filter),
            ).length;
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                type="button"
                className={`inline-flex min-h-[38px] items-center justify-center gap-2 px-4 rounded-full border font-mono text-[10px] font-medium tracking-wide uppercase transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b0a] ${
                  isActive
                    ? "border-[#285768] bg-[#285768] text-white"
                    : "border-[#dfe4e5] bg-transparent text-[#526972] hover:border-[#a6bac0]"
                }`}
              >
                <span>{filter}</span>
                <span className={isActive ? "text-[#ff6b0a]" : "text-[#8d999c]"}>
                  ({String(count).padStart(2, "0")})
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Solutions Cards Grid matching the exact design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 w-full">
        {filteredSolutions.map((solution, index) => {
          const isFeatured = solution.featured ?? index === 0;

          return (
            <Link
              key={`${solution.title}-${index}`}
              href={solution.slug || "/solution-details"}
              className={`group flex flex-col justify-center rounded-[22px] sm:rounded-[22px] p-7 sm:p-8 lg:p-9 min-h-[290px] sm:min-h-[310px] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b0a] ${
                isFeatured
                  ? "bg-[#FFF5ED] border border-[#FDD8C2] shadow-xs"
                  : "bg-white border border-[#E5E7EB] shadow-xs"
              }`}
            >
              {/* Top: Title & Description */}
              <div>
                <BlurText
                  as="h3"
                  text={solution.title}
                  delay={20}
                  className={`font-sora text-xl sm:text-2xl font-semibold leading-[1.2] whitespace-pre-line mb-2 transition-colors ${
                    isFeatured
                      ? "text-[#E26D35]"
                      : "text-[#142938] group-hover:text-[#E26D35]"
                  }`}
                />
                <BlurText
                  as="p"
                  text={solution.description}
                  delay={20}
                  className="font-sora text-sm sm:text-base leading-[1.2] text-[#5A6A72]"
                />
              </div>

              {/* Bottom: Tags & Explore Link */}
              <div className="mt-3 pt-2">
                <div className="font-mono text-[11px] sm:text-xs text-[#254F5F] tracking-tight mb-4">
                  {solution.tags}
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wide text-[#E26D35] uppercase group-hover:gap-2.5 transition-all">
                  <span>EXPLORE</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
