"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FolderLock } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

// Orbit nodes with exact 72-degree equal spacing (360° / 5 = 72°) around the circle
const orbitNodes = [
  { label: "HRIS", angle: -90 },
  { label: "LMS", angle: -18 },
  { label: "SURVEYS", angle: 54 },
  { label: "PAYROLL", angle: 126 },
  { label: "ATS", angle: 198 },
];

export default function IntegrationsTrust() {
  const [radius, setRadius] = useState<number>(94);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const calculatedRadius = Math.min(98, Math.max(82, Math.round(width * 0.225)));
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
      className="relative w-full bg-white py-8 sm:py-10 lg:py-12 overflow-hidden"
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
          animation: orbit-cw 34s linear infinite;
        }
        .animate-orbit-ccw {
          animation: orbit-ccw 34s linear infinite;
        }
        .orbit-container:hover .animate-orbit-cw,
        .orbit-container:hover .animate-orbit-ccw {
          animation-play-state: paused;
        }
      `}</style>

      <div className="px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          {/* =========================================================================
              CARD 1 (LEFT): INTEGRATIONS (Light Card with Smooth Rotating Orbit)
              ========================================================================= */}
          <div className="rounded-[28px] sm:rounded-[34px] bg-[#FAF8F4] border border-[#EAE6DF] p-5 sm:p-8 lg:p-9 flex flex-col  md:justify-between shadow-xs">
            {/* Header Content */}
            <div className="md:max-w-md w-full">
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#F8780C] uppercase mb-2.5 text-center md:text-left">
                INTEGRATIONS
              </div>
              <BlurText
                as="h3"
                delay={20}
                text={"Connect Claripa with Your\nExisting Systems"}
                className="font-sora text-[28px] sm:text-2xl lg:text-[24px] hidden lg:block font-normal md:font-bold tracking-tight text-[#002E40] leading-[1.25] mb-2.5 whitespace-pre-line text-center md:text-left"
              />
              <BlurText
                as="h3"
                delay={20}
                text={"Connect Claripa with Your Existing Systems"}
                className="font-sora text-[28px] sm:text-2xl lg:text-[24px]  lg:hidden font-normal md:font-bold tracking-tight text-[#002E40] leading-[1.25] mb-2.5 whitespace-pre-line text-center md:text-left"
              />
              <BlurText
                as="p"
                delay={20}
                text="Claripa brings people, performance, and task management together to help organisations connect workforce information and make more informed decisions."
                className="font-sora text-sm sm:text-base text-[#62737A] leading-[1.2] tracking-tight text-center md:text-left"
              />
            </div>

            {/* Rotating Orbit Graphic matching the exact design */}
            <div
              ref={containerRef}
              className="orbit-container relative w-full h-[215px] sm:h-[245px] lg:h-[255px] mt-3 sm:mt-5 flex items-center justify-center select-none overflow-hidden"
            >
              {/* Outer Dashed Orbit Circle (Rotates smoothly) */}
              <div
                className="relative rounded-full border-[1.5px] border-dashed border-[#C5D0D5] flex items-center justify-center animate-orbit-cw"
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
                        <span className="inline-flex items-center justify-center px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-[#FFF4ED] text-[#2D3E47] text-[10px] sm:text-[11px] font-mono font-medium tracking-wide shadow-2xs border border-[#FBE3D4]/80 whitespace-nowrap">
                          {node.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Core: Dark Navy Claripa Queen Badge */}
              <div className="absolute z-10 w-13 h-13 sm:w-16 sm:h-16 rounded-[18px] sm:rounded-[22px] bg-[#0A2633] flex items-center justify-center shadow-[0_10px_22px_rgba(10,38,51,0.22)] transition-transform duration-300 hover:scale-105">
                <Image
                  src="/claripa-queen-transparent.png"
                  alt="Claripa Queen"
                  width={32}
                  height={64}
                  className="w-auto h-7 sm:h-10 object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* =========================================================================
              CARD 2 (RIGHT): SECURITY & TRUST (Dark Card with Security Claims Box)
              ========================================================================= */}
          <div className="rounded-[28px] sm:rounded-[34px] bg-[#254F5F] border border-[#1E4351] text-white p-6 sm:p-8 lg:p-9 flex flex-col gap-20 justify-between shadow-xl">
            {/* Header Content */}
            <div className="max-w-md">
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#FF7324] uppercase mb-2.5 text-center md:text-left">
                SECURITY & TRUST
              </div>
              <BlurText
                as="h3"
                delay={20}
                text={"Your Workforce Data\nDeserves Careful Protection"}
                className="font-sora text-xl hidden lg:block sm:text-2xl lg:text-[24px] font-bold tracking-tight text-white leading-[1.25] mb-2.5 whitespace-pre-line text-center md:text-left"
              />
              <BlurText
                as="h3"
                delay={20}
                text={"Your Workforce Data Deserves Careful Protection"}
                className="font-sora text-[28px] lg:hidden sm:text-2xl lg:text-[24px] font-normal tracking-tight text-white leading-[1.25] mb-2.5 whitespace-pre-line text-center md:text-left"
              />
              <BlurText
                as="p"
                delay={20}
                text="Claripa is designed to support organisations in managing workforce information responsibly. Details about its security controls, data handling practices, and infrastructure should be communicated based on verified product and security information."
                className="font-sora text-sm sm:text-base text-[#C5D2D8] leading-[1.3] text-center md:text-left"
              />
            </div>

            {/* Bottom Security Claims Container Box matching screenshot */}
            <div className="mt-6 sm:mt-8 rounded-[18px] sm:rounded-[22px] bg-white/[0.03] border border-[#395F6E] p-4 sm:p-5 transition-colors hover:border-[#4B7587]">
              <div className="flex justify-center md:justify-start items-center gap-2 mb-2">
                <FolderLock className="w-4 h-4 text-[#FF7324] shrink-0" strokeWidth={2} />
                <span className="font-sora text-xs sm:text-base font-semibold text-white">
                  Security claims
                </span>
              </div>
              <p className="font-sora text-xs sm:text-sm text-[#9AAEB8] leading-[1.2] m-0 text-center md:text-left">
                Ask Engineering/Security to confirm encryption, role-based access, data residency, compliance certifications and hosting details. Do not claim a control or certification unless verified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
