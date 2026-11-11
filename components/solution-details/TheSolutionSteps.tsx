import { Check } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

export interface SolutionStepItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
}

const defaultSteps: SolutionStepItem[] = [
  {
    id: "01",
    tag: "01 · DETECT · GOAL INTELLIGENCE",
    title: "Identify where alignment breaks",
    description:
      "Claripa connects organizational objectives, team OKRs and individual goals to identify gaps in alignment and performance.",
    bullets: [
      "Connects company, team and individual objectives.",
      "Highlights goals that need attention.",
    ],
  },
  {
    id: "02",
    tag: "02 · PREDICT · PERFORMANCE INTELLIGENCE",
    title: "Understand what could fall behind",
    description:
      "Claripa helps decision makers identify performance patterns and potential goal delays before they affect business outcomes.",
    bullets: [
      "Identifies emerging performance gaps.",
      "Highlights objectives at risk of missing targets.",
    ],
  },
  {
    id: "03",
    tag: "03 · ACT · MANAGER INTELLIGENCE",
    title: "Turn goals into meaningful action",
    description:
      "Claripa brings relevant insights to managers and leaders so they can realign priorities and support better execution.",
    bullets: [
      "Supports AI assisted goal creation.",
      "Enables timely follow ups and performance conversations.",
    ],
  },
  {
    id: "04",
    tag: "04 · INTEGRATE · CONNECTED INTELLIGENCE",
    title: "Works with your existing HR ecosystem",
    description:
      "Claripa connects existing HR systems to unify goal and performance insights.",
    bullets: [
      "Connects with existing HR and performance systems.",
      "Keeps organizational goals and performance insights connected.",
    ],
  },
];

export interface TheSolutionStepsProps {
  eyebrow?: string;
  title?: string;
  steps?: SolutionStepItem[];
}

export default function TheSolutionSteps({
  eyebrow = "THE PROBLEM WE SOLVE",
  title = "How Claripa keeps your best people",
  steps = defaultSteps,
}: TheSolutionStepsProps) {
  return (
    <section id="the-solution" className="py-16 md:py-24 bg-[#F7F6F3]">
      <div className="px-[5%]">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#F8780C] shadow-[0_0_8px_rgba(248,120,12,0.55)]"
            />
            <span className="font-mono text-base font-semibold text-[#F8780C] tracking-tight uppercase">
              {eyebrow}
            </span>
          </div>
          <BlurText
            as="h2"
            text={title}
            delay={20}
            className="font-sora text-[#002E40] text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-[-0.04em] leading-[1.12]"
          />
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-[28px] border border-[#ECE9E3] bg-white p-8 sm:p-10 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#F8780C]/40 hover:shadow-[0_8px_30px_rgba(0,46,64,0.05)]"
            >
              <div>
                <span className="block font-mono text-base font-semibold text-[#F8780C] uppercase tracking-wider mb-3">
                  {step.tag}
                </span>

                <BlurText
                  as="h3"
                  text={step.title}
                  delay={20}
                  className="font-sora text-[#002E40] text-[32px] font-semibold tracking-tight mb-3"
                />

                <BlurText
                  as="p"
                  text={step.description}
                  delay={20}
                  className="font-sora text-lg text-[#62737A] leading-relaxed mb-6"
                />
              </div>

              {/* Bullets */}
              <div className="pt-4 border-t border-[#ECE9E3]/70 flex flex-col gap-2.5">
                {step.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#FFF0E4] text-[#F8780C] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <BlurText
                      as="span"
                      text={bullet}
                      delay={20}
                      className="font-sora text-sm sm:text-base text-[#62737A] leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
