"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

export interface WhereWeAreProps {
  badgeText?: string;
  heading?: string;
  ctaText?: string;
  noOpeningsMessage?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function WhereWeAre({
  badgeText = "CAREER",
  heading = "Shape the Future of Work with Claripa",
  ctaText = "BEGIN A CAREER WITH US",
  noOpeningsMessage = "We don’t have any openings for now.",
  imageSrc = "/team.jpg",
  imageAlt = "Claripa team together in the office",
}: WhereWeAreProps) {
  const [isOpeningsModalOpen, setIsOpeningsModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpeningsModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpeningsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpeningsModalOpen]);

  return (
    <section
      id="careers-banner"
      aria-label="Claripa team and careers"
      className="pt-8 sm:pt-10 lg:pt-12 pb-3 sm:pb-4 lg:pb-5 px-4 sm:px-6 lg:px-[5%]"
    >
      <div className="relative w-full aspect-[16/7.5] sm:aspect-[16/6.5] lg:aspect-[16/5.8] min-h-[260px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[440px] rounded-[28px] sm:rounded-[30px] md:rounded-[30px] overflow-hidden border border-[#E5EAEB] shadow-xs bg-[#EAE8E3]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 1330px) 100vw, 1330px"
          className="object-cover object-center"
        />

        {/* Subtle bottom scrim for crisp white typography */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#061A22]/85 via-[#061A22]/25 to-transparent pointer-events-none"
        />

        {/* Frosted Glass "CAREER" Badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-7 md:left-7 z-10">
          <button
            type="button"
            onClick={() => setIsOpeningsModalOpen(true)}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-mono text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase transition-all shadow-xs cursor-pointer"
          >
            {badgeText}
          </button>
        </div>

        {/* Bottom Overlay Content: Careers Heading + CTA Button */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 md:p-9 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="font-sora text-white text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight leading-[1.12] max-w-lg drop-shadow-xs">
            {heading}
          </h2>

          <button
            type="button"
            onClick={() => setIsOpeningsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 self-start sm:self-end px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#002E40] backdrop-blur-md border border-white/45 font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm cursor-pointer shrink-0"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* No Openings Notice Modal */}
      {isOpeningsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001A24]/65 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsOpeningsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="careers-notice-title"
        >
          <div
            className="relative w-full max-w-md rounded-[24px] bg-white border border-[#E5EAEB] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpeningsModalOpen(false)}
              aria-label="Close careers notice"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F7F6F3] hover:bg-[#ECE9E3] text-[#254F5F] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="inline-flex items-center gap-2 text-[#E56A1E] font-mono text-xs font-semibold tracking-wider uppercase mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E56A1E]" />
              CAREERS AT CLARIPA
            </p>
            <h3
              id="careers-notice-title"
              className="font-sora text-xl sm:text-2xl font-medium text-[#002E40] leading-snug mb-2.5"
            >
              {noOpeningsMessage}
            </h3>
            <p className="font-sora text-sm text-[#62737A] leading-relaxed mb-6">
              Thank you for your interest in joining Team Claripa. Please check back later or connect with us if you would like to stay in touch for future roles.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#1C4E5B] hover:bg-[#143B45] text-white font-mono text-xs font-medium uppercase tracking-wider transition-colors"
              >
                Contact Us
              </Link>
              <button
                type="button"
                onClick={() => setIsOpeningsModalOpen(false)}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#D5DCDD] hover:border-[#254F5F] text-[#254F5F] font-mono text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
