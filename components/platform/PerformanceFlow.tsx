"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

export interface PlatformModule {
  label: string;
  title: string;
  description: string;
  flow: string[];
}

const defaultModules: PlatformModule[] = [
  {
    label: "Performance",
    title: "A clear line from goals to growth.",
    description:
      "Bring structure to how performance is set, tracked and reviewed, so every contribution connects to what the business needs.",
    flow: ["Goals", "KRAs", "Contributions", "Feedback", "Reviews", "Ratings"],
  },
  {
    label: "Engagement",
    title: "Understand what your people need.",
    description:
      "Bring feedback, team context and workforce trends together to help leaders respond with care.",
    flow: ["Listen", "Understand", "Prioritise", "Support", "Measure"],
  },
  {
    label: "Talent",
    title: "Make the next step easier to see.",
    description:
      "Connect skills, performance and career interests to create clearer growth and succession paths.",
    flow: ["Skills", "Potential", "Growth", "Opportunity", "Progress"],
  },
];

export interface PerformanceFlowProps {
  eyebrow?: string;
  modules?: PlatformModule[];
}

export default function PerformanceFlow({
  eyebrow = "PERFORMANCE FLOW",
  modules = defaultModules,
}: PerformanceFlowProps) {
  const [activeModule, setActiveModule] = useState(0);
  const selectedModule = modules[activeModule] || modules[0];

  return (
    <section className="py-16 md:py-[88px]">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={selectedModule.title}
            description={selectedModule.description}
          />
          <div
            className="flex flex-wrap gap-2 mt-6"
            role="tablist"
            aria-label="Platform modules"
          >
            {modules.map((item, index) => (
              <button
                aria-selected={activeModule === index}
                className={`px-3.5 py-2 border rounded-full text-[11px] font-sora cursor-pointer transition-colors ${
                  activeModule === index
                    ? "border-[#002e40] bg-[#002e40] text-white"
                    : "border-[#e9edef] bg-white text-[#62737a] hover:border-[#cbd6da]"
                }`}
                key={item.label}
                onClick={() => setActiveModule(index)}
                role="tab"
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5 sm:p-6 border border-[#e9edef] rounded-[20px] bg-[#fbf9f5]">
          <div className="flex items-center justify-between mb-4 text-[#62737a] font-mono text-[11px] uppercase">
            <span>HOW IT FITS TOGETHER</span>
            <span>
              01 / {String(selectedModule.flow.length).padStart(2, "0")}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {selectedModule.flow.map((item, index) => (
              <div
                className="flex items-center gap-3 p-3.5 border border-[#e9edef] rounded-[11px] bg-white"
                key={item}
              >
                <span className="text-[#f8780c] font-mono text-[10px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong className="flex-1 text-xs font-medium text-[#002e40] font-sora">
                  {item}
                </strong>
                <ArrowRight size={16} className="text-[#62737a]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
