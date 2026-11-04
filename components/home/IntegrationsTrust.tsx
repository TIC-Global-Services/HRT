"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FolderLock } from "lucide-react";

// Orbit nodes with their fixed radial positions (in degrees) matching the design
const orbitNodes = [
  { label: "HRIS", angle: -90 },
  { label: "LMS", angle: -10 },
  { label: "SURVEYS", angle: 52 },
  { label: "PAYROLL", angle: 140 },
  { label: "ATS", angle: 200 },
];

export default function IntegrationsTrust() {
  const [radius, setRadius] = useState<number>(125);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const calculatedRadius = Math.min(145, Math.max(105, Math.round(width * 0.32)));
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

      <div className="px-[10%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* =========================================================================
              CARD 1 (LEFT): INTEGRATIONS (With Smooth Rotating Orbit)
              ========================================================================= */}
          <div className="rounded-[32px] sm:rounded-[36px] bg-[#F9F9F7] border border-neutral-200/80 p-8 sm:p-10 lg:p-10 flex flex-col justify-between shadow-xs">
            {/* Header Content */}
            <div className="max-w-md">
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#E26D35] uppercase mb-3">
                INTEGRATIONS
              </div>
              <h3 className="font-heading font-sora text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-[#142938] leading-[1.2] mb-3">
                Connect Claripa with Your
                Existing Systems
              </h3>
              <p className="font-sora text-sm sm:text-[16px] text-slate-500 leading-[1.2]">
                Claripa brings people, performance, and task management together to help organisations connect workforce information and make more informed decisions.
              </p>
            </div>

            {/* Rotating Orbit Graphic matching the exact design */}
            <div
              ref={containerRef}
              className="orbit-container relative w-full h-[320px] sm:h-[360px] md:h-[380px] my-4 flex items-center justify-center select-none overflow-hidden"
            >
              {/* Outer Dashed Orbit Circle (Rotates smoothly) */}
              <div
                className="relative rounded-full border-[1.5px] border-dashed border-[#7E8B95] flex items-center justify-center animate-orbit-cw"
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
                        <span className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-[18px] sm:rounded-[22px] bg-[#FFF4EC] text-[#002E40] text-[11px] sm:text-xs font-mono font-medium tracking-wider shadow-xs whitespace-nowrap">
                          {node.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Core: Dark Navy Claripa Queen Badge (Stays anchored in center) */}
              <div className="absolute z-10 w-22 h-22 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-[#002E40] flex items-center justify-center shadow-xl shadow-[#002E40]/25 transition-transform duration-300 hover:scale-105">
                <Image
                  src="/claripa-queen-transparent.png"
                  alt="Claripa Queen"
                  width={42}
                  height={86}
                  className="w-auto h-11 sm:h-12 md:h-13 object-contain"
                  priority
                />
              </div>
            </div>

            {/* Bottom Footer Link */}
            {/* <div className="pt-4 border-t border-slate-200/60">
              <Link
                href="/integrations"
                className="group inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-slate-700 hover:text-[#E26D35] uppercase transition-colors"
              >
                <span>SEE INTEGRATIONS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div> */}
          </div>

          {/* =========================================================================
              CARD 2 (RIGHT): SECURITY & TRUST (Dark Card with 4 Feature Tiles)
              ========================================================================= */}
          <div className="rounded-[32px] sm:rounded-[36px] bg-[#254F5F] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-xl">
            {/* Header Content */}
            <div className="max-w-md">
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#E26D35] uppercase mb-3">
                SECURITY & TRUST
              </div>
              <h3 className="font-sora text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-white leading-[1.2] mb-3">
                Your Workforce Data
                Deserves Careful Protection
              </h3>
              <p className="font-sora text-sm sm:text-[16px] text-[#ECE9E3] leading-[1.2]">
                Claripa is designed to support organisations in managing workforce information responsibly. Details about its security controls, data handling practices, and infrastructure should be communicated based on verified product and security information.
              </p>
            </div>

            {/* 2x2 Grid of Security Capability Boxes */}
            <div className="">
              {/* Tile 1: Encryption */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 hover:bg-white/[0.07] transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#E26D35]">
                  <FolderLock className="w-4 h-4" />
                  <span className="text-base font-semibold text-white">Security claims</span>
                </div>
                <p className="text-sm text-[#ADB5BD] leading-relaxed font-sans">
                  Ask Engineering/Security to confirm encryption, role-based access, data residency, compliance certifications and hosting details. Do not claim a control or certification unless verified.
                </p>
              </div>

              {/* Tile 2: Role-based access */}
              {/* <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 hover:bg-white/[0.07] transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#E26D35]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm font-semibold text-white">Role-based access</span>
                </div>
                <p className="text-xs text-slate-300/80 leading-relaxed font-sans">
                  Right insight, right person only
                </p>
              </div> */}

              {/* Tile 3: Data residency */}
              {/* <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 hover:bg-white/[0.07] transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#E26D35]">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-semibold text-white">Data residency</span>
                </div>
                <p className="text-xs text-slate-300/80 leading-snug">
                  Regions to confirm
                </p>
              </div>

              {/* Tile 4: Compliance */}
              {/* <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 hover:bg-white/[0.07] transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#E26D35]">
                  <FileCheck2 className="w-4 h-4" />
                  <span className="text-sm font-semibold text-white">Compliance</span>
                </div>
                <p className="text-xs text-slate-300/80 leading-snug">
                  Enterprise-ready controls
                </p>
              </div>
            </div>

            {/* Bottom Footer Link */}
              {/* <div className="pt-4 border-t border-white/10">
              <Link
                href="/security"
                className="group inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-slate-300 hover:text-white uppercase transition-colors"
              >
                <span>SECURITY OVERVIEW</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
