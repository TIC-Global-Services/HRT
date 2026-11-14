"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Activity,
  Database,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import BlurText from "@/reuseable/BlurText";

export interface GettingStartedStep {
  title: string;
  description: string;
}

export interface PlatformSecurityPillar {
  title: string;
  description: string;
  icon: "protection" | "availability" | "hosting" | "access";
}

export interface GettingStartedAndSecurityProps {
  steps?: GettingStartedStep[];
  pillars?: PlatformSecurityPillar[];
}

const defaultSteps: GettingStartedStep[] = [
  {
    title: "Discover",
    description:
      "Understand the organization's performance management process, strategic priorities, reporting structure, and current workflows.",
  },
  {
    title: "Configure",
    description:
      "Configure relevant performance assessment cycles, OKR workflows, weightages, and settings based on agreed business requirements.",
  },
  {
    title: "Prepare and Validate Data",
    description:
      "Prepare employee and organizational data in the required format, validate the information, and support the agreed data-loading process.",
  },
  {
    title: "Go Live and Support",
    description:
      "Validate the configured workflows, support user onboarding, and help the organization begin using Claripa.",
  },
];

const defaultPillars: PlatformSecurityPillar[] = [
  {
    title: "Data Protection",
    description:
      "Information is protected through structured security measures implemented in the Claripa environment.",
    icon: "protection",
  },
  {
    title: "Service Availability",
    description:
      "Understand the service availability commitments applicable to your Claripa deployment.",
    icon: "availability",
  },
  {
    title: "Data Hosting and Residency",
    description:
      "Understand where Claripa data is hosted and which data residency arrangements apply to your deployment.",
    icon: "hosting",
  },
  {
    title: "Role-Based Access",
    description:
      "Claripa supports different user roles across CEO, HR, manager, and employee workflows.",
    icon: "access",
  },
];

const pillarIcons = {
  protection: ShieldCheck,
  availability: Activity,
  hosting: Database,
  access: LockKeyhole,
};

export default function GettingStartedAndSecurity({
  steps = defaultSteps,
  pillars = defaultPillars,
}: GettingStartedAndSecurityProps) {
  const stepsSliderRef = useRef<HTMLOListElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isStepsPaused, setIsStepsPaused] = useState(false);

  const pillarsSliderRef = useRef<HTMLDivElement>(null);
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [isPillarsPaused, setIsPillarsPaused] = useState(false);

  // Track steps slider scroll on mobile
  const handleStepsScroll = useCallback(() => {
    if (!stepsSliderRef.current) return;
    const { scrollLeft, clientWidth } = stepsSliderRef.current;
    const cardEl = stepsSliderRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = cardEl ? cardEl.offsetWidth + 16 : clientWidth;
    if (cardWidth <= 0) return;
    const currentSlide = Math.round(scrollLeft / cardWidth);
    setActiveStepIndex(Math.min(Math.max(currentSlide, 0), steps.length - 1));
  }, [steps.length]);

  const goToStepSlide = (idx: number) => {
    setActiveStepIndex(idx);
    const container = stepsSliderRef.current;
    if (!container) return;
    const slide = container.children[idx] as HTMLElement | undefined;
    if (slide) {
      container.scrollTo({
        left: slide.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  // Steps mobile auto-advance (only scrolls container horizontally, never scrolls window/page)
  useEffect(() => {
    if (isStepsPaused || steps.length <= 1) return;
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.innerWidth >= 640) return;
      setActiveStepIndex((prev) => {
        const next = (prev + 1) % steps.length;
        const container = stepsSliderRef.current;
        if (container) {
          const slide = container.children[next] as HTMLElement | undefined;
          if (slide) {
            container.scrollTo({
              left: slide.offsetLeft,
              behavior: "smooth",
            });
          }
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isStepsPaused, steps.length]);

  // Track pillars slider scroll on mobile
  const handlePillarsScroll = useCallback(() => {
    if (!pillarsSliderRef.current) return;
    const { scrollLeft, clientWidth } = pillarsSliderRef.current;
    const cardEl = pillarsSliderRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = cardEl ? cardEl.offsetWidth + 12 : clientWidth;
    if (cardWidth <= 0) return;
    const currentSlide = Math.round(scrollLeft / cardWidth);
    setActivePillarIndex(Math.min(Math.max(currentSlide, 0), pillars.length - 1));
  }, [pillars.length]);

  const goToPillarSlide = (idx: number) => {
    setActivePillarIndex(idx);
    const container = pillarsSliderRef.current;
    if (!container) return;
    const slide = container.children[idx] as HTMLElement | undefined;
    if (slide) {
      container.scrollTo({
        left: slide.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  // Pillars mobile auto-advance (only scrolls container horizontally, never scrolls window/page)
  useEffect(() => {
    if (isPillarsPaused || pillars.length <= 1) return;
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.innerWidth >= 640) return;
      setActivePillarIndex((prev) => {
        const next = (prev + 1) % pillars.length;
        const container = pillarsSliderRef.current;
        if (container) {
          const slide = container.children[next] as HTMLElement | undefined;
          if (slide) {
            container.scrollTo({
              left: slide.offsetLeft,
              behavior: "smooth",
            });
          }
        }
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPillarsPaused, pillars.length]);

  return (
    <>
      <section className="bg-[#F7F6F3] w-full max-w-full overflow-hidden px-[5%] py-16 sm:px-8 md:py-24" id="getting-started">
        <div className="w-full max-w-full">
          <div className="text-center max-w-5xl mx-auto">
            <p className="mb-4 flex items-center justify-center gap-2 font-mono text-center text-sm sm:text-base font-medium uppercase tracking-tight text-[#f8780c]">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#f8780c]" />
              GETTING STARTED
            </p>
            <h2 className="m-0 text-3xl font-normal leading-[1.08] tracking-tight text-[#254f5f] sm:text-4xl lg:text-[46px]">
              <BlurText delay={20} text="A Structured Path from Setup to Adoption." />
            </h2>
            <BlurText
              as="p"
              delay={20}
              text="Claripa implementation follows a structured approach to understanding organizational requirements, configuring the platform, preparing employee data, and supporting users through deployment."
              className="mb-0 mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-[1.4] sm:leading-[1.2] text-[#62737a]"
            />
          </div>

          {/* Steps: Mobile Slider / Desktop Grid */}
          <ol
            ref={stepsSliderRef}
            onScroll={handleStepsScroll}
            onTouchStart={() => setIsStepsPaused(true)}
            onTouchEnd={() => {
              setTimeout(() => setIsStepsPaused(false), 4000);
            }}
            className="mb-0 mt-8 sm:mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 pt-1 sm:grid sm:grid-cols-2 xl:grid-cols-4 sm:gap-4 sm:overflow-visible sm:pb-0 sm:pt-0 list-none p-0 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="group w-full shrink-0 snap-center sm:w-auto sm:shrink sm:snap-align-none min-h-[220px] sm:min-h-[235px] rounded-[22px] border border-[#ebe8e3] bg-white p-6 transition-all duration-200 hover:border-[#f8780c] hover:bg-[#fff4ec] hover:-translate-y-0.5 hover:shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex size-8 items-center justify-center rounded-lg font-mono text-xs bg-[#F7F6F3] text-[#f8780c] transition-colors duration-200 group-hover:bg-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-0 mt-5 text-base font-semibold text-[#002E40] transition-colors duration-200 group-hover:text-[#d95e0b]">
                    <BlurText delay={20} text={step.title} />
                  </h3>
                  <BlurText
                    as="p"
                    delay={20}
                    text={step.description}
                    className="mb-0 mt-2 text-sm sm:text-base leading-[1.4] sm:leading-[1.2] tracking-tight text-[#62737A]"
                  />
                </div>
              </li>
            ))}
          </ol>

          {/* Mobile Step Pagination Indicators */}
          <div
            className="flex sm:hidden items-center justify-center gap-2 mt-6"
            role="tablist"
            aria-label="Getting started step navigation"
          >
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={activeStepIndex === idx}
                onClick={() => goToStepSlide(idx)}
                aria-label={`Go to step ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeStepIndex === idx ? "w-8 bg-[#f8780c]" : "w-6 bg-[#CBD5D8] hover:bg-[#b4bec2]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F7F6F3] w-full max-w-full overflow-hidden px-[5%] pb-16 sm:px-8 md:pb-24" id="security-and-trust">
        <div className="rounded-[28px] border border-[#ebe8e3] bg-white p-6 sm:p-9 lg:p-10 w-full max-w-full">
          <SectionHeading
            eyebrow="SECURITY & TRUST"
            title="People Data Deserves Responsible Protection."
            description="Claripa supports performance management processes that involve employee and organizational information. Security, privacy, access permissions, and responsible data handling are central to how the platform is implemented and used."
          />

          {/* Pillars: Mobile Slider / Desktop Grid */}
          <div
            ref={pillarsSliderRef}
            onScroll={handlePillarsScroll}
            onTouchStart={() => setIsPillarsPaused(true)}
            onTouchEnd={() => {
              setTimeout(() => setIsPillarsPaused(false), 4000);
            }}
            className="mt-7 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 pt-1 sm:grid sm:grid-cols-2 xl:grid-cols-4 sm:gap-3 sm:overflow-visible sm:pb-0 sm:pt-0 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pillars.map((pillar) => {
              const Icon = pillarIcons[pillar.icon];
              return (
                <article
                  key={pillar.title}
                  className="w-full shrink-0 snap-center sm:w-auto sm:shrink sm:snap-align-none min-h-[165px] rounded-[20px] border border-[#eeeae5] bg-[#F7F6F3] p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="mb-3 grid size-10 place-items-center rounded-xl border border-[#f8d8c3] bg-[#fff7f1] text-[#f8780c]">
                      <Icon aria-hidden="true" size={19} />
                    </span>
                    <h3 className="m-0 text-base font-semibold text-[#173c49]">
                      <BlurText delay={20} text={pillar.title} />
                    </h3>
                    <BlurText
                      as="p"
                      delay={20}
                      text={pillar.description}
                      className="mb-0 mt-1.5 text-sm sm:text-base leading-[1.4] sm:leading-[1.2] text-[#718087]"
                    />
                  </div>
                </article>
              );
            })}
          </div>

          {/* Mobile Pillar Pagination Indicators */}
          <div
            className="flex sm:hidden items-center justify-center gap-2 mt-6"
            role="tablist"
            aria-label="Security pillar navigation"
          >
            {pillars.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={activePillarIndex === idx}
                onClick={() => goToPillarSlide(idx)}
                aria-label={`Go to security pillar ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activePillarIndex === idx ? "w-8 bg-[#f8780c]" : "w-6 bg-[#CBD5D8] hover:bg-[#b4bec2]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
