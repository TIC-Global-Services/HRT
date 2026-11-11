"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import BlurText from "@/reuseable/BlurText";

export interface IntegrationPartner {
  id: string;
  name: string;
  iconSrc: string;
  angleDeg?: number;
  x?: number;
  y?: number;
}

// 8 core integration partners
const basePartners = [
  { id: "openai", name: "OpenAI", iconSrc: "/tools/OpenAI.png" },
  { id: "claude", name: "Claude", iconSrc: "/tools/Claude.png" },
  { id: "glean", name: "Glean", iconSrc: "/tools/Glean.png" },
  { id: "rippling", name: "Rippling", iconSrc: "/tools/Rippling.png" },
  { id: "hibob", name: "HiBob", iconSrc: "/tools/HiBob.png" },
  { id: "microsoft", name: "Microsoft 365", iconSrc: "/tools/Microsoft.png" },
  { id: "zenefits", name: "Zenefits", iconSrc: "/tools/Zenefits.png" },
  { id: "gusto", name: "Gusto", iconSrc: "/tools/Gusto.png" },
];

// 16 evenly spaced slots around the 360° circle (2 full cycles of the 8 partners)
// Slot spacing: 360 / 16 = 22.5°
const TOTAL_SLOTS = 16;
const SLOT_DEG = 360 / TOTAL_SLOTS;

// Arc geometry matching viewBox 0 0 1024 504
const CENTER_X = 518;
const CENTER_Y = 632;
const RADIUS = 362;
const VISIBLE_BOUND = 72; // Visible within [-72°, +72°] along the orange arc

export const partners: IntegrationPartner[] = basePartners.map((p, i) => ({
  ...p,
  angleDeg: -67.5 + i * 19.2,
  x: CENTER_X + RADIUS * Math.sin(((-67.5 + i * 19.2) * Math.PI) / 180),
  y: CENTER_Y - RADIUS * Math.cos(((-67.5 + i * 19.2) * Math.PI) / 180),
}));

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

  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isPausedRef = useRef(false);
  const angleOffsetRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const filterMap = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const map = new Map<string, boolean>();

    basePartners.forEach((item) => {
      const matches = !q || item.name.toLowerCase().includes(q);
      map.set(item.id, matches);
    });

    return map;
  }, [searchQuery]);

  // Construct 16 revolving partner tiles
  const revolvingItems = useMemo(() => {
    return Array.from({ length: TOTAL_SLOTS }, (_, i) => {
      const partner = basePartners[i % basePartners.length];
      const initialSlotAngle = (i * SLOT_DEG - 67.5) % 360;
      return {
        ...partner,
        slotIndex: i,
        uniqueKey: `${partner.id}-${i}`,
        initialSlotAngle,
      };
    });
  }, []);

  // Continuous rotation from left to right along the orange arc
  useEffect(() => {
    const SPEED = 0.008; // degrees per millisecond (~45s per full rotation)

    const animate = (currentTime: number) => {
      if (lastTimeRef.current !== 0 && !isPausedRef.current) {
        const delta = currentTime - lastTimeRef.current;
        angleOffsetRef.current = (angleOffsetRef.current + delta * SPEED) % 360;

        revolvingItems.forEach((item, index) => {
          const el = tileRefs.current[index];
          if (!el) return;

          // Compute angle in range [-180°, 180°]
          let angle = (item.initialSlotAngle + angleOffsetRef.current) % 360;
          if (angle > 180) angle -= 360;
          if (angle < -180) angle += 360;

          // Check visibility on the top arc
          const isVisible = angle >= -VISIBLE_BOUND && angle <= VISIBLE_BOUND;

          if (!isVisible) {
            el.style.opacity = "0";
            el.style.pointerEvents = "none";
            return;
          }

          const rad = (angle * Math.PI) / 180;
          const x = CENTER_X + RADIUS * Math.sin(rad);
          const y = CENTER_Y - RADIUS * Math.cos(rad);

          const xPct = (x / 1024) * 100;
          const yPct = (y / 504) * 100;

          // Soft edge fade at the entry (left) and exit (right) boundaries
          const edgeDist = VISIBLE_BOUND - Math.abs(angle);
          const edgeFade = Math.min(1, Math.max(0, edgeDist / 7));

          el.style.left = `${xPct}%`;
          el.style.top = `${yPct}%`;
          el.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
          el.style.opacity = `${edgeFade}`;
          el.style.pointerEvents = "auto";
          el.style.setProperty("--tile-rot", `${angle}deg`);
        });
      }

      lastTimeRef.current = currentTime;
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [revolvingItems]);

  return (
    <section
      id="integrations"
      aria-label="Connect Claripa with the Tools You Already Use"
      className={`w-full bg-[#F7F6F3] py-10 sm:py-14 md:py-16 overflow-hidden ${className}`.trim()}
    >
      <div className="px-[5%]">
        {/* White Card Container */}
        <div
          className="w-full bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-[#EFECE7] shadow-xs relative overflow-hidden aspect-[1024/504] min-h-[440px] sm:min-h-[480px] md:min-h-[504px] select-none flex flex-col justify-between"
        >
          {/*
            1. Dashed Arcs SVG Overlay (Full Card Scope)
            Center: (518, 632)
            - Outer Ring 1: R = 715
            - Middle Ring 2: R = 587
            - Inner Ring 3: R = 475
            - Orange Track: R = 362
          */}
          <svg
            viewBox="0 0 1024 504"
            className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Outer Gray Arc */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="715"
              stroke="#E5ECEE"
              strokeDasharray="6 6"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Middle Gray Arc */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="587"
              stroke="#DFE7E9"
              strokeDasharray="6 6"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Inner Gray Arc */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="475"
              stroke="#E5ECEE"
              strokeDasharray="6 6"
              strokeWidth="1.2"
              fill="none"
            />

            {/* Orange Track Arc (aligned directly with rotating partner icons) */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r={RADIUS}
              stroke="#F06A25"
              strokeDasharray="6 6"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>

          {/* 2. Header Section (Eyebrow, Title, Subtitle, Search Pill) */}
          <div className="absolute top-[5%] sm:top-[6.3%] left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11.5px] font-semibold uppercase tracking-wider text-[#E56A1E] m-0">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.6)]"
              />
              {eyebrow}
            </p>
          </div>

          {/* Main Title */}
          <div className="absolute top-[11.5%] sm:top-[13.5%] left-1/2 -translate-x-1/2 z-20 w-full max-w-[680px] px-4 text-center">
            <BlurText
              as="h2"
              delay={20}
              text={title}
              className="text-[#1D4452] font-sora text-[18px] sm:text-[26px] md:text-[34px] lg:text-[38px] font-normal tracking-[-0.035em] leading-[1.16] m-0"
            />
          </div>

          {/* Subtitle */}
          <div className="absolute top-[28%] sm:top-[29.5%] left-1/2 -translate-x-1/2 z-20 w-full max-w-[650px] px-4 text-center">
            <BlurText
              as="p"
              delay={20}
              text={description}
              className="text-[#5E7373] font-sora text-[10px] sm:text-[12.5px] md:text-[13.5px] leading-relaxed m-0"
            />
          </div>

          {/* Search Pill */}
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

          {/* 3. Central Squircle Core & Ecosystem Label */}
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

          {/* Text Below Squircle */}
          <div className="absolute left-[50.63%] top-[86.5%] -translate-x-1/2 z-20 text-center whitespace-nowrap pointer-events-none">
            <p className="font-sora text-[9px] sm:text-[11.5px] md:text-[13px] text-[#556972] font-normal leading-snug m-0">
              Build a Connected Performance
              <br />
              Ecosystem
            </p>
          </div>

          {/*
            4. Rotating Partner Tiles Along the Orange Arc (Left to Right)
            Rendered with exact SSR positions, continuously advanced via requestAnimationFrame.
          */}
          {revolvingItems.map((item, index) => {
            const isMatch = filterMap.get(item.id) ?? true;

            // SSR initial coordinates for pre-rendering
            const initialAngle = item.initialSlotAngle;
            const isInitiallyVisible = initialAngle >= -VISIBLE_BOUND && initialAngle <= VISIBLE_BOUND;
            const rad = (initialAngle * Math.PI) / 180;
            const initX = CENTER_X + RADIUS * Math.sin(rad);
            const initY = CENTER_Y - RADIUS * Math.cos(rad);
            const initXPct = (initX / 1024) * 100;
            const initYPct = (initY / 504) * 100;
            const initFade = isInitiallyVisible ? Math.min(1, (VISIBLE_BOUND - Math.abs(initialAngle)) / 7) : 0;

            return (
              <div
                key={item.uniqueKey}
                ref={(el) => {
                  tileRefs.current[index] = el;
                }}
                style={{
                  left: `${initXPct}%`,
                  top: `${initYPct}%`,
                  transform: `translate(-50%, -50%) rotate(${initialAngle}deg)`,
                  opacity: initFade,
                  pointerEvents: isInitiallyVisible ? "auto" : "none",
                }}
                className="absolute z-20 will-change-transform"
              >
                <div
                  onMouseEnter={() => {
                    isPausedRef.current = true;
                  }}
                  onMouseLeave={() => {
                    isPausedRef.current = false;
                  }}
                  className={`group/tile relative w-9 h-9 sm:w-11 sm:h-11 md:w-[48px] md:h-[48px] lg:w-[52px] lg:h-[52px] rounded-[11px] sm:rounded-[13px] md:rounded-[14px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] hover:scale-115 transition-all duration-300 cursor-pointer ${
                    isMatch
                      ? "scale-100 ring-2 ring-transparent hover:ring-[#E56A1E]/50"
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
                    priority={index < 8}
                  />

                  {/* Hover Tooltip - counter-rotated so text is always perfectly horizontal */}
                  <div
                    className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden group-hover/tile:block z-50 whitespace-nowrap rounded-md bg-[#002e40] px-2.5 py-1 text-[11px] font-mono font-medium text-white shadow-lg"
                    style={{
                      transform: "translate(-50%, 0) rotate(calc(-1 * var(--tile-rot, 0deg)))",
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
    </section>
  );
}
