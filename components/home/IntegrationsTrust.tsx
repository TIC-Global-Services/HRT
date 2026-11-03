"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  Globe,
  FileCheck2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Orbit nodes with their fixed radial positions (in degrees)
const orbitNodes = [
  { label: "HRIS", angle: 0 },
  { label: "ATS", angle: 72 },
  { label: "PAYROLL", angle: 144 },
  { label: "SURVEYS", angle: 216 },
  { label: "LMS", angle: 288 },
];

export default function IntegrationsTrust() {
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
          animation: orbit-cw 26s linear infinite;
        }
        .animate-orbit-ccw {
          animation: orbit-ccw 26s linear infinite;
        }
      `}</style>

      <div className="px-[5%] max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* =========================================================================
              CARD 1 (LEFT): INTEGRATIONS (With Smooth Rotating Orbit)
              ========================================================================= */}
          <div className="rounded-[32px] sm:rounded-[36px] bg-[#F9F9F7] border border-neutral-200/80 p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-xs">
            {/* Header Content */}
            <div className="max-w-md">
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#E26D35] uppercase mb-3">
                INTEGRATIONS
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-[#142938] leading-[1.2] mb-3">
                Sits above the HR stack you already have.
              </h3>
              <p className="font-sans text-sm sm:text-[15px] text-slate-500 leading-relaxed">
                No new system to manage. Claripa reads the signals your tools
                already capture.
              </p>
            </div>

            {/* Rotating Orbit Graphic */}
            <div className="relative w-full h-[280px] sm:h-[320px] my-6 flex items-center justify-center select-none overflow-hidden">
              {/* Outer Dashed Orbit Circle (Rotates smoothly) */}
              <div className="relative w-[230px] h-[230px] sm:w-[260px] sm:h-[260px] rounded-full border border-dashed border-slate-300/90 flex items-center justify-center animate-orbit-cw">
                {/* 5 Orbiting Pills */}
                {orbitNodes.map((node) => {
                  // Orbit radius ~ 115px (sm: 130px)
                  const radius = 115;
                  const rad = (node.angle * Math.PI) / 180;
                  const x = radius * Math.cos(rad);
                  const y = radius * Math.sin(rad);

                  return (
                    <div
                      key={node.label}
                      className="absolute"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      {/* Counter-rotating container keeps text permanently upright and legible */}
                      <div className="animate-orbit-ccw">
                        <span className="inline-block px-3 py-1 rounded-full bg-white border border-slate-200/90 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-slate-700 shadow-xs whitespace-nowrap">
                          {node.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Core: Dark Navy Claripa Queen Badge (Stays anchored in center) */}
              <div className="absolute z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#142938] flex items-center justify-center shadow-lg border border-slate-700/50">
                <Image
                  src="/Claripa-queen.png"
                  alt="Claripa Queen"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bottom Footer Link */}
            <div className="pt-4 border-t border-slate-200/60">
              <Link
                href="/integrations"
                className="group inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-slate-700 hover:text-[#E26D35] uppercase transition-colors"
              >
                <span>SEE INTEGRATIONS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* =========================================================================
              CARD 2 (RIGHT): SECURITY & TRUST (Dark Card with 4 Feature Tiles)
              ========================================================================= */}
          <div className="rounded-[32px] sm:rounded-[36px] bg-[#142938] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-xl">
            {/* Header Content */}
            <div className="max-w-md">
              <div className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#E26D35] uppercase mb-3">
                SECURITY & TRUST
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-white leading-[1.2] mb-3">
                People data deserves enterprise-grade care.
              </h3>
            </div>

            {/* 2x2 Grid of Security Capability Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 my-8">
              {/* Tile 1: Encryption */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 hover:bg-white/[0.07] transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#E26D35]">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm font-semibold text-white">Encryption</span>
                </div>
                <p className="text-xs text-slate-300/80 leading-relaxed font-sans">
                  In transit and at rest
                </p>
              </div>

              {/* Tile 2: Role-based access */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 hover:bg-white/[0.07] transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#E26D35]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm font-semibold text-white">Role-based access</span>
                </div>
                <p className="text-xs text-slate-300/80 leading-relaxed font-sans">
                  Right insight, right person only
                </p>
              </div>

              {/* Tile 3: Data residency */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 hover:bg-white/[0.07] transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#E26D35]">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-semibold text-white">Data residency</span>
                </div>
                <p className="text-xs text-slate-300/80 leading-relaxed font-sans">
                  Regions to conform
                </p>
              </div>

              {/* Tile 4: Compliance */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-5 hover:bg-white/[0.07] transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#E26D35]">
                  <FileCheck2 className="w-4 h-4" />
                  <span className="text-sm font-semibold text-white">Compliance</span>
                </div>
                <p className="text-xs text-slate-300/80 leading-relaxed font-sans">
                  SOC2, GDPR, HIPAA ready
                </p>
              </div>
            </div>

            {/* Bottom Footer Link */}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/security"
                className="group inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-slate-300 hover:text-white uppercase transition-colors"
              >
                <span>SECURITY OVERVIEW</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

