import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

export interface OfficesAndTeamsProps {
  eyebrow?: string;
  title?: string;
  locationLabel?: string;
  address?: string;
  mapHref?: string;
}

export default function DottedWorldMap({
  eyebrow = "OFFICES AND TEAMS",
  title = "Let’s Transform\nPerformance Together",
  locationLabel = "MAP",
  address = "6th Floor, WeWork Lightbridge, Saki Vihar Rd, Tunga Village, Chandivali, Powai, Mumbai, \nMaharashtra 400072",
  mapHref = "https://maps.google.com/?q=WeWork+Lightbridge+Saki+Vihar+Road+Mumbai",
}: OfficesAndTeamsProps) {
  return (
    <section
      id="locations"
      aria-label="Office locations"
      className="pt-3 sm:pt-4 lg:pt-5 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-[5%]"
    >
      <div className="w-full rounded-[28px] sm:rounded-[30px] md:rounded-[30px] bg-white border border-[#E5EAEB] p-5 sm:p-7 md:p-8 lg:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] xl:grid-cols-[1fr_1.42fr] gap-6 lg:gap-8 xl:gap-10 items-stretch">
          {/* Left Column: Eyebrow, Heading & Address Card */}
          <div className="flex flex-col justify-between h-full min-h-[280px] sm:min-h-[320px] lg:min-h-full py-1 sm:py-2 pl-1 sm:pl-2">
            <div>
              {/* Eyebrow */}
              <p className="flex items-center gap-2 font-mono text-xs sm:text-base font-medium tracking-[0.78px] uppercase text-[#F8780D] mb-3 sm:mb-4">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-[#F8780D] shrink-0"
                />
                {eyebrow}
              </p>

              {/* Title */}
              <BlurText
                as="h2"
                delay={20}
                text={title}
                className="font-sora text-[#254F5F] text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-normal tracking-tight leading-[1.12]"
              />
            </div>

            {/* Address Pill Box */}
            <div className="flex items-center justify-between gap-3 sm:gap-4 rounded-[18px] sm:rounded-[22px] bg-[#F7F6F3] border border-[#E8E6DF] p-3.5 sm:p-4 md:p-4.5 mt-8 lg:mt-auto">
              <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                <div
                  aria-hidden="true"
                  className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-[#E56A1E] text-white flex items-center justify-center shrink-0 shadow-xs"
                >
                  <MapPin size={18} className="stroke-white stroke-[2.2]" />
                </div>
                <BlurText
                  as="p"
                  delay={20}
                  text={address}
                  className="text-[#102A33] font-sora text-[11px] sm:text-xs md:text-base font-medium tracking-tight leading-[1.2] max-w-[330px]"
                />
              </div>

              <Link
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Mumbai office in Google Maps"
                className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[#254F5F] hover:text-[#E56A1E] transition-colors shrink-0 flex items-start gap-1 self-start sm:self-start pt-1 sm:pt-0"
              >
                <span>{locationLabel}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Dotted World Map Graphic */}
          <div className="relative w-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#F0F0F0] flex items-center justify-center min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]">
            <Image
              src="/offices_map_full.svg"
              alt="Claripa office locations map across the world, highlighting Chennai HQ"
              width={765}
              height={470}
              priority
              className="w-full h-auto object-contain select-none"
            />
            {/* Subtle animated beacon at Chennai location */}
            <div
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{ left: "60%", top: "60.5%" }}
              aria-hidden="true"
            >
              <span className="absolute -inset-2 rounded-full bg-[#E56A1E]/35 animate-ping" />
              <span className="relative block w-2 h-2 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.8)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Re-export as OfficesAndTeams for backward compatibility
export { DottedWorldMap as OfficesAndTeams };
