"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

export interface IntegrationPartner {
  id: string;
  name: string;
  iconSrc: string;
  // Angular position on circle in degrees (0° = top apex, negative = left, positive = right)
  angleDeg: number;
  // Exact (x, y) coordinates on a 1024 x 504 canvas matching media_1794209688842_519373fd.png
  x: number;
  y: number;
}

// 8 integration partners sitting on the orange dashed arc (R = 362, center = 518, 632)
// Coordinates & angles measured with sub-pixel precision from reference image
const partners: IntegrationPartner[] = [
  {
    id: "openai",
    name: "OpenAI",
    iconSrc: "/tools/OpenAI.png",
    angleDeg: -64.7,
    x: 184.3,
    y: 474.3,
  },
  {
    id: "claude",
    name: "Claude",
    iconSrc: "/tools/Claude.png",
    angleDeg: -47.4,
    x: 244.5,
    y: 380.5,
  },
  {
    id: "glean",
    name: "Glean",
    iconSrc: "/tools/Glean.png",
    angleDeg: -29.1,
    x: 340.5,
    y: 313.0,
  },
  {
    id: "rippling",
    name: "Rippling",
    iconSrc: "/tools/Rippling.png",
    angleDeg: -9.6,
    x: 457.5,
    y: 273.0,
  },
  {
    id: "hibob",
    name: "HiBob",
    iconSrc: "/tools/HiBob.png",
    angleDeg: 12.5,
    x: 596.0,
    y: 281.0,
  },
  {
    id: "microsoft",
    name: "Microsoft 365",
    iconSrc: "/tools/Microsoft.png",
    angleDeg: 31.1,
    x: 704.5,
    y: 323.0,
  },
  {
    id: "zenefits",
    name: "Zenefits",
    iconSrc: "/tools/Zenefits.png",
    angleDeg: 47.7,
    x: 787.5,
    y: 387.0,
  },
  {
    id: "gusto",
    name: "Gusto",
    iconSrc: "/tools/Gusto.png",
    angleDeg: 65.4,
    x: 863.5,
    y: 474.0,
  },
];

export interface IntegrationsNetworkProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export default function IntegrationsNetwork({
  eyebrow = "INTEGRATIONS",
  title = "Connect Claripa with the\nTools You Already Use.",
  description = "Explore opportunities to connect Claripa with your existing business systems and data sources to support a more connected performance management process.",
  className = "",
}: IntegrationsNetworkProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filterMap = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const map = new Map<string, boolean>();

    partners.forEach((item) => {
      const matches = !q || item.name.toLowerCase().includes(q);
      map.set(item.id, matches);
    });

    return map;
  }, [searchQuery]);

  return (
    <section
      id="integrations"
      aria-label="Connect Claripa with the Tools You Already Use"
      className={`w-full bg-[#F7F6F3] py-10 sm:py-14 md:py-16 overflow-hidden ${className}`.trim()}
    >
      <div className="w-[min(1024px,calc(100%-32px))] sm:w-[min(1024px,calc(100%-48px))] mx-auto">
        {/*
          White Card Container:
          1024 × 504 aspect ratio on sm/md/lg screens matching reference screenshot 100%.
          On very small mobile devices, adapts with min-h to provide comfortable touch targets.
        */}
        <div className="w-full bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-[#EFECE7] shadow-xs relative overflow-hidden aspect-[1024/504] min-h-[440px] sm:min-h-[480px] md:min-h-[504px] select-none flex flex-col justify-between">
          {/*
            -------------------------------------------------------------------------
            1. Dashed Arcs SVG Overlay (Full Card Scope)
            Center: (518, 632)
            - Outer Ring 1: R = 715 (sweeps across top-left & top-right corners)
            - Middle Ring 2: R = 587 (sweeps right behind title line 1)
            - Inner Ring 3: R = 475 (sweeps between subtitle and search input)
            - Orange Track: R = 362 (apex at y = 270, connecting the 8 partner icons)
            -------------------------------------------------------------------------
          */}
          <svg
            viewBox="0 0 1024 504"
            className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Outer Gray Arc */}
            <circle
              cx="518"
              cy="632"
              r="715"
              stroke="#E5ECEE"
              strokeDasharray="6 6"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Middle Gray Arc */}
            <circle
              cx="518"
              cy="632"
              r="587"
              stroke="#DFE7E9"
              strokeDasharray="6 6"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Inner Gray Arc */}
            <circle
              cx="518"
              cy="632"
              r="475"
              stroke="#E5ECEE"
              strokeDasharray="6 6"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Orange Track Arc (spans from -65° to +65°) */}
            <path
              d="M 170 488 A 362 362 0 0 1 866 488"
              stroke="#F06A25"
              strokeDasharray="6 6"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>

          {/*
            -------------------------------------------------------------------------
            2. Header Section (Eyebrow, Title, Subtitle, Search Pill)
            Positioned with exact proportional top anchors matching the reference.
            -------------------------------------------------------------------------
          */}
          {/* Eyebrow: y ≈ 32px (6.3%) */}
          <div className="absolute top-[5%] sm:top-[6.3%] left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11.5px] font-semibold uppercase tracking-wider text-[#E56A1E] m-0">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.6)]"
              />
              {eyebrow}
            </p>
          </div>

          {/* Main Title: y ≈ 68px (13.5%) */}
          <div className="absolute top-[11.5%] sm:top-[13.5%] left-1/2 -translate-x-1/2 z-20 w-full max-w-[680px] px-4 text-center">
            <h2 className="text-[#1D4452] font-sora text-[18px] sm:text-[26px] md:text-[34px] lg:text-[38px] font-normal tracking-[-0.035em] leading-[1.16] whitespace-pre-line m-0">
              {title}
            </h2>
          </div>

          {/* Subtitle: y ≈ 146px (29.0%) */}
          <div className="absolute top-[28%] sm:top-[29.5%] left-1/2 -translate-x-1/2 z-20 w-full max-w-[650px] px-4 text-center">
            <p className="text-[#5E7373] font-sora text-[10px] sm:text-[12.5px] md:text-[13.5px] leading-relaxed m-0">
              {description}
            </p>
          </div>

          {/* Search Pill: y ≈ 210px (41.8%) */}
          <div className="absolute top-[41.5%] left-1/2 -translate-x-1/2 z-30 w-[190px] sm:w-[230px] md:w-[245px] h-[30px] sm:h-[35px] md:h-[37px]">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search integrations..."
              aria-label="Search integrations"
              className="w-full h-full rounded-full border border-[#DFDDD7] bg-[#F6F5F2] px-4 font-mono text-[10.5px] sm:text-[11.5px] md:text-[12px] text-[#1D4452] placeholder:text-[#8C989C] text-center outline-none focus:border-[#E56A1E]/60 transition-colors shadow-2xs"
            />
          </div>

          {/*
            -------------------------------------------------------------------------
            3. Central Squircle Core & Ecosystem Label
            Center: (518.5, 380) -> left: 50.63%, top: 75.40%
            -------------------------------------------------------------------------
          */}
          {/* Ambient Warm Amber Glow */}
          <div
            aria-hidden="true"
            className="absolute left-[50.63%] top-[75.40%] -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full bg-[radial-gradient(circle,rgba(248,120,12,0.24)_0%,rgba(248,120,12,0.06)_50%,transparent_72%)] pointer-events-none z-10"
          />

          {/* Center Black Squircle with Queen */}
          <div className="absolute left-[50.63%] top-[75.40%] -translate-x-1/2 -translate-y-1/2 z-20">
            <div
              className="group/core relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-[58px] lg:h-[58px] rounded-[13px] sm:rounded-[16px] md:rounded-[18px] bg-[#141210] shadow-[0_10px_28px_rgba(0,0,0,0.18)] flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
              title="Claripa Core Performance Engine"
            >
              <div className="relative w-4 h-6 sm:w-6 sm:h-8 md:w-7 md:h-10">
                <Image
                  src="/claripa-queen-transparent.png"
                  alt="Claripa Queen"
                  fill
                  priority
                  sizes="40px"
                  className="object-contain"
                />
              </div>

              {/* Core Tooltip */}
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/core:block z-50 whitespace-nowrap rounded-md bg-[#002e40] px-2.5 py-1 text-[11px] font-mono font-medium text-white shadow-lg">
                Claripa Core
              </div>
            </div>
          </div>

          {/* Text Below Squircle: y ≈ 436px (86.8%) */}
          <div className="absolute left-[50.63%] top-[86.5%] -translate-x-1/2 z-20 text-center whitespace-nowrap pointer-events-none">
            <p className="font-sora text-[9px] sm:text-[11.5px] md:text-[13px] text-[#556972] font-normal leading-snug m-0">
              Build a Connected Performance
              <br />
              Ecosystem
            </p>
          </div>

          {/*
            -------------------------------------------------------------------------
            4. The 8 Integration Partner Tiles Along the Orange Arc
            Each tile is positioned at its exact (x / 1024 * 100)%, (y / 504 * 100)%
            and rotated tangentially to the arc by angleDeg.
            -------------------------------------------------------------------------
          */}
          {partners.map((partner) => {
            const xPct = (partner.x / 1024) * 100;
            const yPct = (partner.y / 504) * 100;
            const isMatch = filterMap.get(partner.id) ?? true;

            return (
              <div
                key={partner.id}
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  transform: `translate(-50%, -50%) rotate(${partner.angleDeg}deg)`,
                }}
                className="absolute z-20"
              >
                <div
                  className={`group/tile relative w-9 h-9 sm:w-11 sm:h-11 md:w-[48px] md:h-[48px] lg:w-[52px] lg:h-[52px] rounded-[11px] sm:rounded-[13px] md:rounded-[14px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] hover:scale-115 transition-all duration-300 cursor-pointer ${
                    isMatch
                      ? "opacity-100 scale-100 ring-2 ring-transparent hover:ring-[#E56A1E]/50"
                      : "opacity-25 grayscale scale-90"
                  }`}
                  title={partner.name}
                >
                  <Image
                    src={partner.iconSrc}
                    alt={partner.name}
                    fill
                    sizes="56px"
                    className="object-contain"
                    priority
                  />

                  {/* Hover Tooltip - counter-rotated so text is always perfectly horizontal */}
                  <div
                    className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tile:block z-50 whitespace-nowrap rounded-md bg-[#002e40] px-2.5 py-1 text-[11px] font-mono font-medium text-white shadow-lg"
                    style={{
                      transform: `translate(-50%, 0) rotate(${-partner.angleDeg}deg)`,
                    }}
                  >
                    {partner.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
