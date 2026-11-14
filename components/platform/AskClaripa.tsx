"use client";

import React, { useState } from "react";
import Image from "next/image";
import BlurText from "@/reuseable/BlurText";

export interface SuccessorItem {
  role: string;
  status: string;
  statusColor: "red" | "amber" | "green";
}

export interface AskClaripaQuery {
  question: string;
  responseTitle: string;
  items: SuccessorItem[];
  chipLabel: string;
}

export interface AskClaripaProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  featureOneTitle?: string;
  featureOneText?: string;
  featureTwoTitle?: string;
  featureTwoText?: string;
  featureThreeTitle?: string;
  featureThreeText?: string;
  className?: string;
}

const defaultQueries: AskClaripaQuery[] = [
  {
    question:
      "Help me review the alignment between our company OKRs and individual goals.",
    responseTitle:
      "Let's review organizational objectives and individual goals, identify alignment gaps, and suggest areas for further review.",
    chipLabel: "Review OKR & individual goal alignment",
    items: [
      {
        role: "Company Objective · Product Velocity",
        status: "2 gaps to review",
        statusColor: "amber",
      },
      {
        role: "Engineering Team OKRs · Linked Tasks",
        status: "On track",
        statusColor: "green",
      },
      {
        role: "Quarterly Check-ins · Individual Priorities",
        status: "Needs follow-up",
        statusColor: "red",
      },
    ],
  },
  {
    question: "Summarize team performance and check-in readiness.",
    responseTitle:
      "Illustrative performance summary prepared for upcoming manager check-ins.",
    chipLabel: "Summarize performance for check-ins",
    items: [
      {
        role: "Customer Success · Goal Progress",
        status: "Check-in due",
        statusColor: "amber",
      },
      {
        role: "Core Platform · Task Completion",
        status: "Aligned",
        statusColor: "green",
      },
      {
        role: "Operations · Goal Clarity",
        status: "Review needed",
        statusColor: "red",
      },
    ],
  },
  {
    question: "Which skill gaps need development interventions?",
    responseTitle:
      "Competency and performance signals highlight key areas for development support.",
    chipLabel: "Identify skill gaps & interventions",
    items: [
      {
        role: "Cross-Team Communication · Mid-Level",
        status: "Coaching suggested",
        statusColor: "amber",
      },
      {
        role: "Technical Leadership · Senior Track",
        status: "Skill gap flagged",
        statusColor: "red",
      },
      {
        role: "OKR Planning & Execution · Leads",
        status: "On schedule",
        statusColor: "green",
      },
    ],
  },
];

export const AskClaripa: React.FC<AskClaripaProps> = ({
  eyebrow = "ASK CLARIPA",
  title = "Turn Performance \nInformation into Clearer \nNext Steps.",
  description = "Claripa uses AI to support goal creation, performance understanding, and employee development. Ask Claripa for assistance in structuring OKRs, reviewing alignment, summarizing performance information, and identifying areas that may require attention.",
  featureOneTitle = "AI-Assisted Goal Setting",
  featureOneText = "Develop strategic objectives and OKRs with AI assistance, helping users structure goals and connect them with organizational priorities.",
  featureTwoTitle = "AI-Assisted Performance Summaries",
  featureTwoText = "Bring relevant performance information together to help managers prepare for check-ins, understand progress, and support constructive discussions.",
  featureThreeTitle = "Development Insights",
  featureThreeText = "Use performance and competency information to identify potential skill gaps and consider appropriate employee development interventions.",
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const activeQuery = defaultQueries[activeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // The alternative suggestion chips shown at bottom (matching screenshot)
  const otherQueries = defaultQueries.filter((_, idx) => idx !== activeIndex);

  return (
    <section className={`w-full max-w-full overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-[5%] ${className}`}>
      {/* Outer Card with Rounded Corners & Subtle Border */}
      <article
        onMouseMove={handleMouseMove}
        className="rounded-[28px] sm:rounded-[36px] bg-white border border-[#EBE8E2] p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xs"
      >
        {/* Top-Left Ambient Vertical Peach Blinds Accent matching reference screenshot 100% */}
        <div
          className="absolute -top-px -left-px w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] aspect-[320/200] pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="relative w-full h-full transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${mousePos.x * 6}px, ${mousePos.y * 5}px, 0)`,
            }}
          >
            <Image
              src="/ask-claripa-blinds-tl.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 180px, 260px"
              className="object-contain object-top-left pointer-events-none"
            />
          </div>
        </div>

        {/* Bottom-Right Vivid Claripa Orange Vertical Blinds Accent matching reference screenshot 100% */}
        <div
          className="absolute -bottom-px -right-px w-[320px] sm:w-[420px] md:w-[490px] lg:w-[560px] aspect-[680/500] pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="relative w-full h-full transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 10}px, 0)`,
            }}
          >
            <Image
              src="/ask-claripa-blinds-br.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 420px, 560px"
              className="object-contain object-bottom-right pointer-events-none"
            />
          </div>
        </div>

        {/* Ambient warm radial glow in bottom-right corner for maximum depth */}
        <div
          className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(240,106,37,0.2)_0%,rgba(240,106,37,0.06)_50%,transparent_75%)] pointer-events-none z-0 blur-xl"
          aria-hidden="true"
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10  mt-5 lg:mt-0">
          {/* Left Column: Eyebrow, Heading, Description & 2 Feature Columns */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Eyebrow Pill Tag */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[#F06A25] text-xs font-bold leading-none select-none">
                ●
              </span>
              <span className="font-mono text-xs sm:text-base font-semibold text-[#F06A25] tracking-wider uppercase">
                {eyebrow}
              </span>
            </div>

            {/* Main Headline matching 100% typography */}
            <BlurText
              as="h2"
              delay={20}
              text={title}
              className="font-sora text-[28px] sm:text-4xl lg:text-[42px] font-normal text-[#254F5F] leading-[1.1] tracking-tight mb-4 lg:block hidden"
            />
            <BlurText
              as="h2"
              delay={20}
              text={"Turn Performance Information into Clearer Next Steps."}
              className="font-sora text-[28px] sm:text-4xl lg:text-[42px] font-normal text-[#254F5F] leading-[1.1] tracking-tight mb-4 lg:hidden"
            />

            {/* Detailed Body Paragraph */}
            <BlurText
              as="p"
              delay={20}
              text={description}
              className="font-sora text-sm sm:text-lg text-[#5F7373] font-normal leading-[1.3] max-w-3xl mb-6"
            />

            {/* Three Sub-Features Grid at Bottom of Left Column */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-5 pt-1 md:pt-3">
              <div>
                <BlurText
                  as="h3"
                  delay={20}
                  text={featureOneTitle}
                  className="font-sora text-sm sm:text-base font-semibold text-[#1C3B47] mb-2"
                />
                <BlurText
                  as="p"
                  delay={20}
                  text={featureOneText}
                  className="font-sora text-xs sm:text-[13px] text-[#62737A] font-normal leading-relaxed m-0"
                />
              </div>

              <div>
                <BlurText
                  as="h3"
                  delay={20}
                  text={featureTwoTitle}
                  className="font-sora text-sm sm:text-base font-semibold text-[#1C3B47] mb-2"
                />
                <BlurText
                  as="p"
                  delay={20}
                  text={featureTwoText}
                  className="font-sora text-xs sm:text-[13px] text-[#62737A] font-normal leading-relaxed m-0"
                />
              </div>

              <div>
                <BlurText
                  as="h3"
                  delay={20}
                  text={featureThreeTitle}
                  className="font-sora text-sm sm:text-base font-semibold text-[#1C3B47] mb-2"
                />
                <BlurText
                  as="p"
                  delay={20}
                  text={featureThreeText}
                  className="font-sora text-xs sm:text-[13px] text-[#62737A] font-normal leading-relaxed m-0"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Floating "Ask Claripa" Chat Interface Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[440px] rounded-[24px] bg-white border border-[#E9ECEF] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,31,31,0.08)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_24px_60px_rgba(0,31,31,0.12)]">
              {/* Card Header: Teal Star Logo & "Ask Claripa" + Illustrative label */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-[#0D8E9B] flex items-center justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <span className="font-sora text-xs font-semibold text-[#1C3B47]">
                    Ask Claripa
                  </span>
                </div>
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-[#8C9DA3]">
                  Illustrative Demo
                </span>
              </div>

              {/* User Query Bubble (Right-Aligned Petrol Pill) */}
              <div className="flex justify-end mb-4">
                <div className="bg-[#1C434F] text-white text-[10px] sm:text-[11px] font-normal px-4 py-2 rounded-full shadow-sm max-w-[90%] text-right transition-all duration-200">
                  {activeQuery.question}
                </div>
              </div>

              {/* AI Response Container (Soft Off-White/Cream Panel) */}
              <div className="rounded-[16px] bg-[#F7F6F3] p-4 sm:p-4.5 border border-[#ECEAE4] mb-4">
                <h4 className="font-sora text-[10px] sm:text-[11px] font-bold text-[#002129] mb-3">
                  {activeQuery.responseTitle}
                </h4>

                {/* Response Item Rows */}
                <div className="space-y-2">
                  {activeQuery.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-[10px] sm:rounded-[12px] px-3.5 py-2.5 flex items-center justify-between border border-[#EAE7E0] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform duration-150 hover:-translate-y-0.5"
                    >
                      <span className="font-sora text-[8px] md:text-[10px] text-[#2B3E45] tracking-tight font-medium truncate pr-2">
                        {item.role}
                      </span>
                      <span
                        className={`font-sora text-[8px] sm:text-xs font-semibold shrink-0 ${
                          item.statusColor === "red"
                            ? "text-[#B93826]"
                            : item.statusColor === "amber"
                            ? "text-[#A86E18]"
                            : "text-[#227C4D]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggestion Chips Row (Interactivity matching the exact pills in screenshot) */}
              <div className="flex flex-wrap gap-2 pt-1">
                {otherQueries.map((q) => {
                  const targetIdx = defaultQueries.findIndex(
                    (item) => item.question === q.question
                  );
                  return (
                    <button
                      key={q.question}
                      type="button"
                      onClick={() => setActiveIndex(targetIdx)}
                      className="text-[8px] md:text-[10px] font-sora rounded-full px-3 py-1.5 border border-[#E1E5E7] bg-white text-[#62757E] tracking-tight hover:border-[#1C434F] hover:text-[#1C434F] transition-all duration-200 text-left cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.98]"
                    >
                      {q.chipLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default AskClaripa;
