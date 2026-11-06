"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

export interface IntegrationPartner {
  id: string;
  name: string;
  iconSrc: string;
}

// 8 integration partners matching media_1793945267948_2837e4ea.png exactly
const basePartners: IntegrationPartner[] = [
  {
    id: "openai",
    name: "OpenAI",
    iconSrc: "/tools/OpenAI.png",
  },
  {
    id: "claude",
    name: "Claude",
    iconSrc: "/tools/Claude.png",
  },
  {
    id: "glean",
    name: "Glean",
    iconSrc: "/tools/Glean.png",
  },
  {
    id: "rippling",
    name: "Rippling",
    iconSrc: "/tools/Rippling.png",
  },
  {
    id: "hibob",
    name: "HiBob",
    iconSrc: "/tools/HiBob.png",
  },
  {
    id: "microsoft",
    name: "Microsoft 365",
    iconSrc: "/tools/Microsoft.png",
  },
  {
    id: "zenefits",
    name: "Zenefits",
    iconSrc: "/tools/Zenefits.png",
  },
  {
    id: "gusto",
    name: "Gusto",
    iconSrc: "/tools/Gusto.png",
  },
];

// 24 slots around the 360° circle (8 tools repeated 3 times = seamless continuous orbit)
// Spaced by exactly 15° each (360° / 24 = 15°).
// Initial visible top arc (angles -50° to +55°) matching image 100%:
// - Slot 21 (angle = -50°): OpenAI
// - Slot 22 (angle = -35°): Claude
// - Slot 23 (angle = -20°): Glean
// - Slot 0  (angle =  -5°): Rippling
// - Slot 1  (angle = +10°): HiBob
// - Slot 2  (angle = +25°): Microsoft 365
// - Slot 3  (angle = +40°): Zenefits
// - Slot 4  (angle = +55°): Gusto
const wheelPartners: IntegrationPartner[] = [
  basePartners[3], // Rippling (-5°)
  basePartners[4], // HiBob (+10°)
  basePartners[5], // Microsoft (+25°)
  basePartners[6], // Zenefits (+40°)
  basePartners[7], // Gusto (+55°)
  basePartners[0], // OpenAI (+70°)
  basePartners[1], // Claude (+85°)
  basePartners[2], // Glean (+100°)
  basePartners[3], // Rippling (+115°)
  basePartners[4], // HiBob (+130°)
  basePartners[5], // Microsoft (+145°)
  basePartners[6], // Zenefits (+160°)
  basePartners[7], // Gusto (+175°)
  basePartners[0], // OpenAI (+190°)
  basePartners[1], // Claude (+205°)
  basePartners[2], // Glean (+220°)
  basePartners[3], // Rippling (+235°)
  basePartners[4], // HiBob (+250°)
  basePartners[5], // Microsoft (+265°)
  basePartners[6], // Zenefits (+280°)
  basePartners[7], // Gusto (+295°)
  basePartners[0], // OpenAI (+310° / -50°)
  basePartners[1], // Claude (+325° / -35°)
  basePartners[2], // Glean (+340° / -20°)
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
  const [isPaused, setIsPaused] = useState(false);

  const filterMap = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const map = new Map<string, boolean>();

    basePartners.forEach((item) => {
      const matchesSearch = !q || item.name.toLowerCase().includes(q);
      map.set(item.id, matchesSearch);
    });

    return map;
  }, [searchQuery]);

  // Orbit radius in pixels (centered at 50%, 680px)
  const radius = 550;
  const wheelDiameter = radius * 2; // 860px

  return (
    <section
      id="integrations"
      aria-label="Connect Claripa with the Tools You Already Use"
      className={`w-full bg-[#F7F6F3] py-14 sm:py-18 md:py-10 overflow-hidden ${className}`.trim()}
    >
      <div className="px-[5%]">
        {/* Large Rounded White Card Container matching reference image exactly */}
        <div className="w-full bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-[#E5EAEB] shadow-xs px-5 pt-10  sm:px-10 sm:pt-14  md:px-14 md:pt-16  relative overflow-hidden flex flex-col items-center">
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-[#E56A1E] mb-3">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.7)]"
            />
            {eyebrow}
          </p>

          {/* Title */}
          <h2 className="text-[#002e40] font-sora text-3xl sm:text-4xl md:text-[44px] font-normal tracking-[-0.035em] leading-[1.15] text-center max-w-[700px] mx-auto whitespace-pre-line">
            {title}
          </h2>

          {/* Subtitle Description */}
          <p className="text-[#5A6D75] font-sora text-sm sm:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-6 sm:mb-4">
            {description}
          </p>

          {/* Centered Search Bar Pill matching reference image */}
          <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto z-30">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search integrations..."
              aria-label="Search integrations"
              className="w-full px-5 py-2 sm:py-2.5 rounded-full border border-[#E5E0D8] bg-[#F7F5EE]/70 text-xs font-mono text-[#002e40] placeholder:text-[#8C9DA3] outline-none focus:border-[#E56A1E]/50 text-center transition-colors shadow-2xs"
            />
          </div>

          {/* Arch & Rotating Orbit Visualization Area */}
          <div
            className="group relative w-full max-w-[1020px] h-[360px] sm:h-[420px] md:h-[460px] mx-auto overflow-hidden select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Scaled Responsive Inner Stage */}
            <div className="absolute inset-0 origin-top scale-[0.70] sm:scale-[0.85] md:scale-100 flex items-center justify-center">
              {/* Outer Dashed Gray Arc (Ring 3) */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[680px] -translate-x-1/2 -translate-y-1/2 w-[1380px] h-[1380px] rounded-full border border-dashed border-[#E5ECEE] pointer-events-none"
              />

              {/* Middle Dashed Gray Arc (Ring 2) */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[680px] -translate-x-1/2 -translate-y-1/2 w-[1120px] h-[1120px] rounded-full border border-dashed border-[#E0E8EB] pointer-events-none"
              />

              {/* Central Radial Glow behind Claripa Core */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[360px] -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(248,120,12,0.22)_0%,rgba(248,120,12,0.06)_50%,transparent_72%)] pointer-events-none z-10"
              />

              {/* Center Core: Black Squircle with Queen + Text matching screenshot */}
              <div className="absolute left-1/2 top-[325px] -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-[20px] sm:rounded-[22px] bg-[#141210] flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.18)] transition-transform duration-300 pointer-events-auto hover:scale-105">
                  <div className="relative w-7 h-10 sm:w-8 sm:h-12">
                    <Image
                      src="/claripa-queen-transparent.png"
                      alt="Claripa Queen"
                      fill
                      priority
                      sizes="40px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="mt-3 text-center font-sora text-xs sm:text-base text-[#556972] font-normal leading-snug m-0 whitespace-nowrap">
                  Build a Connected Performance
                  <br />
                  Ecosystem
                </p>
              </div>

              {/* ----------------- Rotating Orbit System ----------------- */}
              {/* Outer static centering wrapper: anchors center firmly at (50%, 680px) */}
              <div
                className="absolute left-1/2 top-[680px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                style={{
                  width: `${wheelDiameter}px`,
                  height: `${wheelDiameter}px`,
                }}
              >
                {/* Inner rotating wheel: spins around its own center without losing alignment */}
                <div
                  className="w-full h-full rounded-full border border-dashed border-[#E56A1E] relative"
                  style={{
                    animation: "orbit-spin-cw 60s linear infinite",
                    transformOrigin: "center center",
                    animationPlayState: isPaused ? "paused" : "running",
                  }}
                >
                  {wheelPartners.map((item, index) => {
                    // Position 24 items evenly spaced by 15°
                    // Offset by -5° so that:
                    // Slot 21 (OpenAI):   -50° (far left)
                    // Slot 22 (Claude):   -35°
                    // Slot 23 (Glean):    -20°
                    // Slot 0  (Rippling):  -5° (just left of apex)
                    // Slot 1  (HiBob):    +10° (just right of apex)
                    // Slot 2  (Microsoft):+25°
                    // Slot 3  (Zenefits): +40°
                    // Slot 4  (Gusto):    +55° (far right)
                    const angleDeg = index * 15 - 5;
                    const angleRad = (angleDeg * Math.PI) / 180;

                    // Exact coordinates along the circumference
                    const x = radius + radius * Math.sin(angleRad);
                    const y = radius - radius * Math.cos(angleRad);

                    const isMatch = filterMap.get(item.id) ?? true;

                    return (
                      <div
                        key={`${item.id}-${index}`}
                        style={{
                          left: `${x}px`,
                          top: `${y}px`,
                          transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`,
                        }}
                        className="absolute z-20 pointer-events-auto"
                      >
                        <div
                          className={`group/tile relative w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-[14px] overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] hover:scale-115 transition-all duration-300 cursor-pointer ${
                            isMatch
                              ? "opacity-100 scale-100 ring-2 ring-transparent hover:ring-[#E56A1E]/50"
                              : "opacity-25 grayscale scale-90"
                          }`}
                          title={item.name}
                        >
                          <Image
                            src={item.iconSrc}
                            alt={item.name}
                            fill
                            sizes="56px"
                            className="object-contain"
                            priority
                          />

                          {/* Hover Tooltip - counter-rotated so text is always readable */}
                          <div
                            className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tile:block z-50 whitespace-nowrap rounded-md bg-[#002e40] px-2.5 py-1 text-[11px] font-mono font-medium text-white shadow-lg"
                            style={{
                              transform: `translate(-50%, 0) rotate(${-angleDeg}deg)`,
                            }}
                          >
                            {item.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
