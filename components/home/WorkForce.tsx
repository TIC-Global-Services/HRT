"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BlurText from "@/components/ui/BlurText";
import FlutedGlassBackground from "@/components/home/HeroBackground";
import {
  SignalVisualStage,
  type SignalVisualKind,
} from "@/components/home/workforce-signals";

export interface FeatureCardItem {
  id: SignalVisualKind;
  title: string;
  description?: string;
  href: string;
  highlighted?: boolean;
}

export const workforceContent: {
  eyebrow: string;
  headline: { line1: string; line2: string };
  description: string;
  ctaButton: { label: string; href: string };
  cards: FeatureCardItem[];
} = {
  eyebrow: "The Future of People Decisions",
  headline: {
    line1: "Spot the Signals.",
    line2: "Act with Confidence.",
  },
  description:
    "Claripa connects performance, engagement, capability, and behaviour signals to help organisations identify meaningful patterns, make informed people decisions, and take timely action.",
  ctaButton: {
    label: "EXPLORE OUR SOLUTIONS",
    href: "/solution-hub",
  },
  cards: [
    {
      id: "review",
      title: "Performance surprises at review time",
      description:
        "Workforce information is often spread across different systems and activities, making it difficult to connect performance, engagement, and capability signals into a meaningful picture.",
      href: "/solution-hub#signals",
    },
    {
      id: "goals",
      title: "Goals that lose direction",
      description:
        "When meaningful workforce signals go unnoticed, organisations may recognise emerging issues only after they begin affecting employee performance, engagement, or team outcomes.",
      href: "/solution-hub#decisions",
    },
    {
      id: "potential",
      title: "Potential that goes unnoticed",
      description:
        "Managers need a clearer understanding of employee goals, task progress, performance patterns, and development needs to identify where support or attention may be required.",
      href: "/solution-hub#context",
    },
    {
      id: "late",
      title: "Problems spotted too late",
      description:
        "Claripa aims to bring relevant workforce intelligence to decision-makers, helping them recognise emerging patterns, understand potential concerns, and take timely action.",
      href: "/solution-hub#action",
      highlighted: true,
    },
  ],
};

/* =========================================================================
   REUSABLE CARD HOVER GRADIENT BLINDS SHADER
   ========================================================================= */
function CardHoverGradientBlinds() {
  return (
    <div className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
      <FlutedGlassBackground
        colorA="#FFA812"
        colorB="#FF4D0A"
        background="#FFF5ED"
        mobileSlitWidth={60}
        squeeze={1.9}
        lip={0.045}
        speed={0.9}
        mouseStrength={1}
      />
      {/* Soft bottom fade to ensure typography legibility */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#FFF5ED] via-[#FFF5ED]/85 to-transparent pointer-events-none" />
    </div>
  );
}

function WorkforceSignalCard({
  card,
  index,
}: {
  card: FeatureCardItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={card.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-[32px] border border-zinc-200/80 md:border-zinc-200/70 md:hover:border-orange-300/80 bg-[#FAF9F6] md:bg-[#F7F6F3] md:hover:bg-[#FFF5ED] p-6 sm:p-7 shadow-2xs md:hover:shadow-md md:hover:-translate-y-1 transition-all duration-500 overflow-hidden shrink-0 md:shrink w-[88vw] max-w-[360px] md:max-w-none md:w-auto h-auto min-h-[500px] md:h-[500px] snap-center"
    >
      {/* Interactive WebGL Fluted Glass Background on Hover */}
      <CardHoverGradientBlinds />

      {/* Top Animated Signal Stage (fades out gracefully on desktop hover to reveal description) */}
      <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center transition-all duration-300 md:group-hover:opacity-0 md:group-hover:scale-95 md:group-hover:pointer-events-none md:group-focus-visible:opacity-0 md:group-focus-visible:scale-95 md:group-focus-visible:pointer-events-none">
        <SignalVisualStage
          kind={card.id}
          index={index}
          isHovered={isHovered}
        />
      </div>

      {/* Bottom Content: Title, Arrow & Expandable Description on Hover */}
      <div className="relative z-10 flex flex-col pt-4 mt-auto shrink-0">
        <div className="order-1 md:order-2 flex items-center justify-between gap-3">
          <h3 className="font-heading font-sora text-[22px] sm:text-2xl font-normal tracking-[-0.03em] leading-[1.15] text-[#142938] md:group-hover:text-brand-orange transition-colors duration-300">
            {card.title}
          </h3>
          <ArrowUpRight
            className="h-6 w-6 shrink-0 text-[#6F8791] group-hover:text-brand-orange group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            strokeWidth={1.4}
          />
        </div>

        {card.description && (
          <div className="order-2 md:order-1 mt-3 md:mt-0 mb-0 md:mb-4 overflow-hidden md:max-h-0 md:group-hover:max-h-36 md:group-focus-visible:max-h-36 transition-all duration-300 ease-out">
            <p className="font-sans text-sm sm:text-base text-[#62737A] md:group-hover:text-[#142938] leading-[1.3] md:mb-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity duration-300">
              {card.description}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function Workforce() {
  const { eyebrow, headline, description, ctaButton, cards } = workforceContent;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const updateScrollState = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const cardEl = sliderRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = cardEl ? cardEl.offsetWidth + 16 : clientWidth * 0.88;
    const currentSlide = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(Math.max(currentSlide, 0), cards.length - 1));
  }, [cards.length]);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  return (
    <section
      id="solutions"
      aria-label="Claripa Workforce Signals"
      className="relative w-full bg-white py-20 sm:py-24 lg:py-28 overflow-hidden"
    >
      <div className="px-[5%]">
        {/* Section Header */}
        <div className="flex flex-col items-center lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 pb-8 sm:pb-12 text-center lg:text-left">
          {/* Left: Eyebrow + Headline */}
          <div className="max-w-2xl flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold font-geist-mono tracking-tight text-brand-orange uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(248,114,12,0.55)] shrink-0" />
              <span>{eyebrow}</span>
            </div>

            <h2 className="font-sora text-[28px] sm:text-4xl lg:text-[46px] font-normal tracking-[-0.035em] text-[#254F5F] leading-[1.12]">
              <BlurText
                as="span"
                delay={20}
                text={`${headline.line1}\n${headline.line2}`}
              />
            </h2>
          </div>

          {/* Right: Description & CTA Button */}
          <div className="flex flex-col items-center lg:items-end gap-5 max-w-lg">
            <BlurText
              as="p"
              delay={20}
              text={description}
              className="font-sora text-sm sm:text-base md:text-lg text-[#62737A] leading-[1.3] text-center lg:text-left"
            />

            <div className="flex items-center justify-center lg:justify-end w-full lg:w-auto">
              <Link
                href={ctaButton.href}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-[#F4F4F4]/70 md:bg-white px-5 py-2.5 font-geist-mono text-[10px] md:text-xs font-semibold tracking-wider uppercase text-[#142938] shadow-2xs hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-95"
              >
                <span>{ctaButton.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards: 4-Column on Desktop, 2x2 on Tablet, Slider on Mobile */}
        <div
          ref={sliderRef}
          onScroll={updateScrollState}
          className="flex md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 md:pt-2 -mx-[5%] px-[5%] md:mx-0 md:px-0"
        >
          {cards.map((card, index) => (
            <WorkforceSignalCard key={card.id} card={card} index={index} />
          ))}
        </div>

        {/* Pagination Indicator Dots (Mobile Only) */}
        <div
          className="flex items-center justify-center gap-2.5 mt-2 md:mt-7 md:hidden"
          aria-hidden="true"
        >
          {cards.map((card, idx) => (
            <button
              key={card.id}
              type="button"
              onClick={() => {
                if (!sliderRef.current) return;
                const slide = sliderRef.current.children[idx] as
                  | HTMLElement
                  | undefined;
                if (slide) {
                  slide.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                  });
                }
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === idx
                  ? "w-8 bg-brand-orange"
                  : "w-6 bg-[#CBD3D7] hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
