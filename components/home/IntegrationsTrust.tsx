"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FolderLock } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

// Orbit nodes with their fixed radial positions (in degrees) matching the design
const orbitNodes = [
  { label: "HRIS", angle: -90 },
  { label: "LMS", angle: 15 },
  { label: "SURVEYS", angle: 70 },
  { label: "PAYROLL", angle: 145 },
  { label: "ATS", angle: 200 },
];

export default function IntegrationsTrust() {
  const [radius, setRadius] = useState<number>(105);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const calculatedRadius = Math.min(115, Math.max(90, Math.round(width * 0.28)));
        setRadius(calculatedRadius);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="integrations"
      aria-label="Integrations and Security"
      className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Self-contained CSS for smooth continuous orbital rotation */}
      <style>{`
        @keyframes orbit-cw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes orbit-ccw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .animate-orbit-cw {
          animation: orbit-cw 36s linear infinite;
        }
        .animate-orbit-ccw {
          animation: orbit-ccw 36s linear infinite;
        }
        .orbit-container:hover .animate-orbit-cw,
        .orbit-container:hover .animate-orbit-ccw {
          animation-play-state: paused;
        }
      `}</style>

      <div className="px-4 sm:px-6 lg:px-[5%] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* =========================================================================
              CARD 1 (LEFT): INTEGRATIONS (Light Card with Smooth Rotating Orbit)
              ========================================================================= */}
          <div className="rounded-[28px] sm:rounded-[34px] bg-[#FAF9F5] border border-[#EBE8E1] p-7 sm:p-9 lg:p-11 flex flex-col justify-between shadow-xs">
            {/* Header Content */}
            <div className="max-w-md">
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#E56A1E] uppercase mb-3">
                INTEGRATIONS
              </div>
              <BlurText
                as="h3"
                delay={20}
                text={"Connect Claripa with Your\nExisting Systems"}
                className="font-sora text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-[#102A33] leading-[1.2] mb-3.5 whitespace-pre-line"
              />
              <BlurText
                as="p"
                delay={20}
                text="Claripa brings people, performance, and task management together to help organisations connect workforce information and make more informed decisions."
                className="font-sora text-sm sm:text-[15px] text-[#62737A] leading-relaxed"
              />
            </div>

            {/* Rotating Orbit Graphic matching the exact design */}
            <div
              ref={containerRef}
              className="orbit-container relative w-full h-[260px] sm:h-[290px] md:h-[300px] mt-6 flex items-center justify-center select-none overflow-hidden"
            >
              {/* Outer Dashed Orbit Circle (Rotates smoothly) */}
              <div
                className="relative rounded-full border-[1.5px] border-dashed border-[#B8C4CC] flex items-center justify-center animate-orbit-cw"
                style={{
                  width: radius * 2,
                  height: radius * 2,
                }}
              >
                {/* 5 Orbiting Pills centered exactly on the dashed orbit line */}
                {orbitNodes.map((node) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x = radius * Math.cos(rad);
                  const y = radius * Math.sin(rad);

                  return (
                    <div
                      key={node.label}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    >
                      {/* Counter-rotating container keeps text permanently upright and legible */}
                      <div className="animate-orbit-ccw">
                        <span className="inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#FFF4EC] text-[#002E40] text-[11px] sm:text-xs font-mono font-medium tracking-wider shadow-2xs border border-[#FCDBC5]/60 whitespace-nowrap">
                          {node.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Core: Dark Navy Claripa Queen Badge (Stays anchored in center) */}
              <div className="absolute z-10 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-[20px] sm:rounded-[24px] bg-[#0E2833] flex items-center justify-center shadow-lg shadow-[#0E2833]/20 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/claripa-queen-transparent.png"
                  alt="Claripa Queen"
                  width={42}
                  height={86}
                  className="w-auto h-9 sm:h-10 md:h-11 object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
              CARD 2 (RIGHT): SECURITY & TRUST (Dark Card with Security Claims Box)
              ========================================================================= */}
          <div className="rounded-[28px] sm:rounded-[34px] bg-[#254F5F] border border-[#1E4351] text-white p-7 sm:p-9 lg:p-11 flex flex-col justify-between gap-8 shadow-xl">
            {/* Header Content */}
            <div className="max-w-md">
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#E56A1E] uppercase mb-3">
                SECURITY & TRUST
              </div>
              <BlurText
                as="h3"
                delay={20}
                text={"Your Workforce Data\nDeserves Careful Protection"}
                className="font-sora text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-white leading-[1.2] mb-3.5 whitespace-pre-line"
              />
              <BlurText
                as="p"
                delay={20}
                text="Claripa is designed to support organisations in managing workforce information responsibly. Details about its security controls, data handling practices, and infrastructure should be communicated based on verified product and security information."
                className="font-sora text-sm sm:text-[15px] text-[#C5D2D8] leading-relaxed"
              />
            </div>

            {/* Bottom Security Claims Container Box matching screenshot */}
            <div className="rounded-[22px] bg-white/[0.04] border border-white/[0.12] p-5 sm:p-6 transition-colors hover:bg-white/[0.06]">
              <div className="flex items-center gap-2.5 mb-2.5 text-[#E56A1E]">
                <FolderLock className="w-4 h-4 shrink-0 stroke-[2]" />
                <span className="font-sora text-sm sm:text-base font-semibold text-white">
                  Security claims
                </span>
              </div>
              <p className="font-sora text-xs sm:text-[13.5px] text-[#A4B5BC] leading-relaxed m-0">
                Ask Engineering/Security to confirm encryption, role-based access, data residency, compliance certifications and hosting details. Do not claim a control or certification unless verified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
