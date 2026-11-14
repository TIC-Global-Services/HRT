"use client";

import React from "react";
import {
  Target,
  GitFork,
  ListChecks,
  CalendarCheck2,
  Bot,
  MessagesSquare,
  Brain,
  Puzzle,
  PieChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import BlurText from "@/reuseable/BlurText";

export interface OneConnectCard {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ElementType<{ className?: string }> | React.ReactNode;
}

export interface OneConnectProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  cards?: OneConnectCard[];
  speedSeconds?: number;
  className?: string;
}

// 9 cards extracted directly from the reference design
export const defaultOneConnectCards: OneConnectCard[] = [
  {
    id: "okr-creation",
    title: "1. AI-assisted OKR creation",
    description: "Create company OKRs from strategic objectives, with AI support.",
    icon: Target,
  },
  {
    id: "cascade-goals",
    title: "2. Cascade goals",
    description: "Cascade OKRs from the CEO through managers to employee level.",
    icon: GitFork,
  },
  {
    id: "task-creation",
    title: "3. AI-assisted task creation",
    description: "Create tasks linked to OKRs, with AI support.",
    icon: ListChecks,
  },
  {
    id: "daily-task-tracking",
    title: "4. Daily task tracking",
    description: "Track task completion day to day, with AI nudges.",
    icon: CalendarCheck2,
  },
  {
    id: "checkins-summaries",
    title: "5. AI check-ins & summaries",
    description: "Facilitate check-ins with AI-generated performance summaries.",
    icon: Bot,
  },
  {
    id: "ai-coaching",
    title: "6. AI coaching for 1:1s",
    description: "Support manager–team member conversations with an AI coach.",
    icon: MessagesSquare,
  },
  {
    id: "behavioural-assessment",
    title: "7. Behavioural assessment",
    description: "Assess behavioural competencies to support structured performance discussions.",
    icon: Brain,
  },
  {
    id: "skill-gaps",
    title: "8. Skill gaps & interventions",
    description: "Identify skill gaps and recommend required interventions with AI support.",
    icon: Puzzle,
  },
  {
    id: "role-based-dashboards",
    title: "9. Role-based dashboards",
    description: "CEO/Managers: visibility into performance, including skip-level employees. HR: a 360° organizational view.",
    icon: PieChart,
  },
];

function CardItem({ card }: { card: OneConnectCard }) {
  const renderIcon = () => {
    if (!card.icon) return null;
    if (React.isValidElement(card.icon)) {
      return card.icon;
    }
    const IconComponent = card.icon as React.ElementType;
    return <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />;
  };

  return (
    <div className="w-full rounded-[20px] sm:rounded-[24px] bg-[#FAF9F5] border border-[#ECE8DF] p-4 sm:p-5 sm:px-6 flex items-center gap-4 sm:gap-5 shadow-2xs hover:border-[#E56A1E]/40 hover:bg-[#F5F2EA] hover:shadow-xs transition-all duration-300 group">
      {/* Icon Box */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] sm:rounded-[16px] bg-white border border-[#EBE7DF] flex items-center justify-center shrink-0 text-[#E56A1E] shadow-2xs transition-transform duration-300 group-hover:scale-105">
        {renderIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-sora text-base sm:text-[16px] md:text-[17px] font-semibold text-[#E56A1E] leading-snug">
          {card.title}
        </h3>
        <p className="font-sora text-xs sm:text-sm md:text-sm font-normal text-[#5A6E78] leading-[1.2] mt-1 sm:mt-1.5">
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default function  OneConnect({
  eyebrow = "ONE CONNECTED PLATFORM",
  title = "Connect People, Align\nPerformance, Manage Tasks.",
  description = "Claripa is an AI-powered workforce intelligence platform that brings people management, performance management, and task management together. It helps organisations manage employee information, align individual and organisational goals, track performance, and connect tasks with objectives.",
  cards = defaultOneConnectCards,
  speedSeconds,
  className,
}: OneConnectProps) {
  // Ensure we have a base list of at least 4 items for a smooth vertical loop
  const baseCards = cards.length < 4 ? [...cards, ...cards, ...cards] : cards;

  // Triplicate the list to guarantee continuous, infinite vertical loop without gaps
  const trackCards = [...baseCards, ...baseCards, ...baseCards];

  // Dynamic duration calculation: ~6 seconds per card gives a comfortable, readable speed
  const calculatedSpeed = speedSeconds ?? Math.max(22, baseCards.length * 6);

  return (
    <section
      id="one-connected-platform"
      aria-label="One Connected Platform"
      className={cn(
        "relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden",
        className
      )}
    >
      {/* Self-contained CSS for smooth infinite vertical marquee motion */}
      <style>{`
        @keyframes oneconnect-marquee-up {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-33.333333%);
          }
        }
        .animate-oneconnect-up {
          animation: oneconnect-marquee-up linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-oneconnect-up {
            animation: none;
          }
        }
      `}</style>

      <div className="px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-30 items-center">
          {/* Left Column: Heading & Description */}
          <div className="flex flex-col justify-center items-center">
            {/* Eyebrow */}
            <p className="flex items-center gap-2 font-mono text-xs sm:text-base font-semibold tracking-tight uppercase text-[#E56A1E] mb-3 sm:mb-4">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[#E56A1E] shrink-0"
              />
              {eyebrow}
            </p>

            {/* Title */}
            <BlurText
              as="h2"
              delay={20}
              text={title}
              className="font-sora text-[#002E40] text-3xl sm:text-4xl md:text-[44px] lg:text-[46px] font-normal leading-[1.1] tracking-[-0.035em] mb-5 sm:mb-6 lg:text-left text-center"
            />

            {/* Description */}
            <BlurText
              as="p"
              delay={20}
              text={description}
              className="font-sora text-[#5A6E78] text-sm sm:text-lg leading-[1.3] font-normal md:max-w-xl lg:text-left text-center tracking-tight "
            />
          </div>

          {/* Right Column: Upward Vertical Marquee of Cards */}
          <div className="relative w-full max-w-[560px] mx-auto lg:mx-0 h-[480px] sm:h-[540px] md:h-[580px] lg:h-[620px] overflow-hidden select-none">
            {/* Top Fade Gradient */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-white via-white/80 to-transparent z-10"
              aria-hidden="true"
            />

            {/* Bottom Fade Gradient */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-10"
              aria-hidden="true"
            />

            {/* Scrolling Track (Bottom to Top) */}
            <div
              className="flex flex-col gap-4 will-change-transform animate-oneconnect-up hover:[animation-play-state:paused]"
              style={{
                animationDuration: `${calculatedSpeed}s`,
              }}
            >
              {trackCards.map((card, idx) => (
                <CardItem
                  key={`${card.id}-${idx}`}
                  card={card}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

