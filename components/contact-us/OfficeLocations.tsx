"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

export interface OfficeLocationItem {
  id: string;
  name: string;
  tag: string;
  address: string;
  mapHref: string;
  coords: {
    pinLeft: string;
    pinTop: string;
    pillLeft: string;
    pillTop: string;
  };
}

export interface OfficeLocationsProps {
  eyebrow?: string;
  title?: string;
  offices?: OfficeLocationItem[];
}

const defaultOffices: OfficeLocationItem[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    tag: "[HQ]",
    address: "Street address, city, country",
    mapHref: "https://maps.google.com/?q=Mumbai,+India",
    coords: {
      pinLeft: "56.5%",
      pinTop: "56%",
      pillLeft: "56.5%",
      pillTop: "47.5%",
    },
  },
];

export default function OfficeLocations({
  eyebrow = "WHERE WE ARE",
  title = "Offices and teams",
  offices = defaultOffices,
}: OfficeLocationsProps) {
  const [activeOfficeId, setActiveOfficeId] = useState<string>("chennai");

  const activeOffice =
    offices.find((o) => o.id === activeOfficeId) || offices[0];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#F7F6F3]">
      <div className="px-4 sm:px-6 lg:px-[5%]">
        {/* Outer White Card: exact geometry matching Figma design (w=1340px, h=485px, rx=30px, p=8px) */}
        <div className="rounded-[30px] border border-[#ECE9E3] bg-white p-2 lg:p-2 overflow-hidden flex flex-col lg:flex-row items-stretch lg:h-[485px] shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          {/* Left Column: Eyebrow + Title at top, Location cards at bottom */}
          <div className="flex-1 flex flex-col justify-between pt-9 sm:pt-11 lg:pt-11 pb-6 sm:pb-8 lg:pb-7 px-6 sm:px-9 lg:px-10">
            {/* Top section: Eyebrow & Title */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  aria-hidden="true"
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[#F8780C] shadow-[0_0_8px_rgba(248,120,12,0.55)]"
                />
                <span className="font-mono text-base font-medium text-[#F8780C] tracking-tight uppercase">
                  {eyebrow}
                </span>
              </div>

              <BlurText
                as="h2"
                text={title}
                delay={20}
                className="font-sora text-[#002E40] text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-tight leading-[1.12]"
              />
            </div>

            {/* Bottom section: The 2 Location cards (width=514px, height=81px, rx=20px) */}
            <div className="flex flex-col gap-2.5 w-full max-w-[514px] mt-8 lg:mt-0">
              {offices.map((office) => {
                const isActive = office.id === activeOfficeId;
                return (
                  <div
                    key={office.id}
                    onClick={() => setActiveOfficeId(office.id)}
                    className={`w-full h-[81px] rounded-[20px] bg-[#F7F6F3] border transition-all duration-200 px-5 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "border-[#ECE9E3] shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                        : "border-[#ECE9E3]/70 hover:border-[#F8780C]/40"
                    }`}
                  >
                    {/* Left: Round icon badge & Text */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                          isActive
                            ? "bg-[#F8780C] text-white shadow-[0_2px_8px_rgba(248,120,12,0.35)]"
                            : "bg-white border border-[#ECE9E3] text-[#254F5F] shadow-sm"
                        }`}
                      >
                        <MapPin size={19} strokeWidth={2} />
                      </div>

                      <div className="min-w-0">
                        <BlurText
                          as="h3"
                          text={`${office.name} ${office.tag}`}
                          delay={20}
                          className="font-sora text-[#002E40] font-semibold text-[15px] sm:text-base leading-snug tracking-tight truncate"
                        />
                        <BlurText
                          as="p"
                          text={office.address}
                          delay={20}
                          className="font-sora text-[#62737A] text-xs sm:text-[13px] mt-0.5 leading-tight truncate"
                        />
                      </div>
                    </div>

                    {/* Right: MAP ↗ Link */}
                    <Link
                      href={office.mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-xs uppercase text-[#62737A] tracking-wider font-medium flex items-center gap-1 hover:text-[#F8780C] transition-colors shrink-0 ml-3 py-1 px-1"
                    >
                      MAP <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dotted World Map (w=765px, h=470px, rx=22px) */}
          <div className="relative w-full lg:w-[765px] h-[360px] sm:h-[420px] lg:h-[470px] rounded-[22px] overflow-hidden bg-[#F0F0F0] shrink-0">
            {/* Base SVG Map */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/map_dotted.png"
              alt="Claripa Offices World Map"
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />

            {/* If Mumbai is active, overlay Mumbai pin and tooltip pill */}
            {activeOfficeId === "mumbai" && (
              <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300">
                {/* Mumbai Pin Dot */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: activeOffice.coords.pinLeft,
                    top: activeOffice.coords.pinTop,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="block w-3.5 h-3.5 rounded-full bg-[#F8780C] ring-4 ring-[#F8780C]/25 shadow-[0_0_12px_rgba(248,120,12,0.8)]"
                  />
                </div>

                {/* Mumbai HQ Pill Tooltip */}
                <div
                  className="absolute -translate-y-1/2"
                  style={{
                    left: activeOffice.coords.pillLeft,
                    top: activeOffice.coords.pillTop,
                  }}
                >
                  <div className="bg-[#254F5F] text-[#F8780C] px-3.5 h-[30px] rounded-full font-mono text-[11px] font-semibold tracking-wider flex items-center justify-center gap-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.15)] whitespace-nowrap">
                    <span>HQ</span>
                    <span className="text-[#F8780C] text-[9px]">-</span>
                    <span>{activeOffice.name}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
