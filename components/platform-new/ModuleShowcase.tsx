"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export interface PlatformShowcaseModule {
  label: string;
  category: string;
  title: string;
  description: string;
  benefits: string[];
  flow: string[];
  progress: { label: string; value: string; width: string }[];
}

const defaultModules: PlatformShowcaseModule[] = [
  {
    label: "People",
    category: "Core HR",
    title: "A connected foundation for every employee.",
    description:
      "Maintain employee information and organizational structures to establish the foundation for goal alignment, performance management, and employee accountability.",
    benefits: [
      "Employee information management",
      "Organizational and reporting structures",
      "Employee data import through a predefined Excel format",
    ],
    flow: ["Goals", "KRAs", "Contributions", "Feedback", "Reviews", "Ratings"],
    progress: [
      { label: "Ship platform v2", value: "80%", width: "w-4/5" },
      { label: "Improve client retention", value: "62%", width: "w-3/5" },
      { label: "Reduce release defects", value: "38%", width: "w-2/5" },
    ],
  },
  {
    label: "Performance",
    category: "Payroll",
    title: "Make performance visible and actionable.",
    description:
      "Connect strategy, company, team, and individual outcomes. Support performance reviews and build stronger behavioural conversations with AI-assisted insights.",
    benefits: [
      "AI-assisted OKRs and goal alignment",
      "Configurable performance review cycles",
      "Performance reviews and ratings",
    ],
    flow: ["Objectives", "Check-ins", "Feedback", "Reviews", "Growth"],
    progress: [
      { label: "Team goals aligned", value: "74%", width: "w-3/4" },
      { label: "Quarterly reviews", value: "88%", width: "w-4/5" },
      { label: "Growth plans active", value: "56%", width: "w-1/2" },
    ],
  },
  {
    label: "Tasks",
    category: "Execution",
    title: "Turn shared priorities into daily progress.",
    description:
      "Give teams a clear path from business priorities to the work that moves them forward, with meaningful ownership and progress signals.",
    benefits: [
      "Clear ownership for every priority",
      "Visible progress across teams",
      "Work connected to measurable outcomes",
    ],
    flow: ["Priorities", "Owners", "Milestones", "Progress", "Outcomes"],
    progress: [
      { label: "Milestones completed", value: "72%", width: "w-3/4" },
      { label: "Work on schedule", value: "64%", width: "w-3/5" },
      { label: "Goals at risk", value: "21%", width: "w-1/5" },
    ],
  },
];

export interface ModuleShowcaseProps {
  modules?: PlatformShowcaseModule[];
}

export default function ModuleShowcase({
  modules = defaultModules,
}: ModuleShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeModule = modules[activeIndex] ?? modules[0];

  if (!activeModule) return null;

  return (
    <section
      aria-label="Platform modules"
      className="overflow-hidden bg-[#f7f6f3] px-5 py-16 sm:px-8 md:py-24"
      id="platform-modules"
    >
      <div className="mx-auto max-w-7xl">
        <div
          aria-live="polite"
          className="grid overflow-hidden rounded-[28px] border border-[#e8e4de] bg-white shadow-[0_18px_60px_rgba(37,79,95,0.08)] lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="flex flex-col p-6 sm:p-10 lg:p-12">
            <p className="m-0 font-mono text-xs uppercase tracking-wide text-[#f8780c]">
              {activeModule.category}
            </p>
            <div className="mt-12 max-w-xl">
              <h2 className="m-0 text-3xl font-semibold tracking-[-0.04em] text-[#254f5f] sm:text-4xl">
                {activeModule.label}
              </h2>
              <p className="mb-0 mt-4 text-lg leading-relaxed text-[#62737a]">
                {activeModule.description}
              </p>
            </div>

            <ul className="mb-0 mt-7 grid gap-3 p-0 text-sm text-[#173c49]">
              {activeModule.benefits.map((benefit) => (
                <li className="flex items-start gap-3" key={benefit}>
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-[#f4d8c6] bg-[#fff7f1] text-[#f8780c]">
                    <Check aria-hidden="true" size={12} strokeWidth={2.5} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div
              aria-label="Choose platform module"
              className="mt-auto flex flex-wrap gap-2 pt-10"
              role="tablist"
            >
              {modules.map((module, index) => (
                <button
                  aria-selected={activeIndex === index}
                  aria-controls="platform-module-panel"
                  id={`platform-module-tab-${index}`}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8780c] ${
                    activeIndex === index
                      ? "border-[#254f5f] bg-[#254f5f] text-white"
                      : "border-[#dfe5e6] bg-white text-[#62737a] hover:border-[#254f5f]"
                  }`}
                  key={module.label}
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  type="button"
                >
                  {module.label}
                </button>
              ))}
            </div>
          </div>

          <div
            aria-labelledby={`platform-module-tab-${activeIndex}`}
            className="flex items-center bg-[#fbf9f6] p-5 sm:p-8 lg:p-10"
            id="platform-module-panel"
            role="tabpanel"
          >
            <div className="w-full rounded-[22px] border border-[#ebe6e0] bg-white p-5 shadow-sm sm:p-6">
              <p className="mb-4 mt-0 font-mono text-[10px] uppercase tracking-wide text-[#62737a]">
                {activeModule.label} flow
              </p>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {activeModule.flow.map((step, index) => (
                  <span className="contents" key={step}>
                    <span
                      className={`rounded-full px-3 py-2 text-xs ${
                        index === activeModule.flow.length - 1
                          ? "bg-[#fff0e6] text-[#c85716]"
                          : "bg-[#eef4f5] text-[#254f5f]"
                      }`}
                    >
                      {step}
                    </span>
                    {index < activeModule.flow.length - 1 ? (
                      <ArrowRight
                        aria-hidden="true"
                        className="text-[#9eaaad]"
                        size={14}
                      />
                    ) : null}
                  </span>
                ))}
              </div>
              <div className="space-y-5">
                {activeModule.progress.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex justify-between gap-3 text-xs text-[#303c40]">
                      <span>{item.label}</span>
                      <span className="text-[#62737a]">{item.value}</span>
                    </div>
                    <div
                      aria-label={`${item.label}: ${item.value}`}
                      className="h-1.5 rounded-full bg-[#edf1f1]"
                      role="img"
                    >
                      <span
                        className={`block h-full rounded-full bg-[#254f5f] ${item.width}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
