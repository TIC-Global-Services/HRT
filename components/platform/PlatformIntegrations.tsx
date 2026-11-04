import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

export interface PlatformIntegrationsProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  integrations?: string[];
  ctaText?: string;
  ctaHref?: string;
}

const defaultIntegrations = [
  "HRIS",
  "ATS",
  "Payroll",
  "Surveys",
  "Collaboration",
  "SSO",
];

export default function PlatformIntegrations({
  eyebrow = "INTEGRATIONS",
  title = "Sits above the HR stack you already have.",
  description = "No new system to manage. Claripa reads the signals your tools already capture.",
  integrations = defaultIntegrations,
  ctaText = "See integrations",
  ctaHref = "/contact-us",
}: PlatformIntegrationsProps) {
  const nodePositions = [
    "top-[13%] left-[42%]",
    "top-[39%] right-0",
    "bottom-[15%] right-[20%]",
    "bottom-[15%] left-[20%]",
    "top-[39%] left-0",
  ];

  return (
    <section className="py-16 md:py-[88px]">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <div className="flex flex-wrap gap-2 my-5">
            {integrations.map((name) => (
              <span
                key={name}
                className="px-3 py-2 border border-[#e9edef] rounded-[9px] text-[#62737a] text-[11px] font-sora bg-white shadow-2xs"
              >
                {name}
              </span>
            ))}
          </div>
          <Link
            className="inline-flex items-center gap-[7px] text-[#254f5f] font-mono text-xs uppercase no-underline hover:text-[#f8780c] transition-colors mt-2"
            href={ctaHref}
          >
            {ctaText} <ArrowRight size={16} />
          </Link>
        </div>

        {/* Integration Orbit */}
        <div
          className="relative grid w-[min(370px,100%)] aspect-square mx-auto place-items-center border border-dashed border-[#d1d8d8] rounded-full before:absolute before:w-[75%] before:aspect-square before:border before:border-dashed before:border-[#d1d8d8] before:rounded-full"
          aria-hidden="true"
        >
          <span className="relative z-10 w-16 h-16 rounded-full bg-white border border-[#e9edef] grid place-items-center text-[#254f5f] font-bold text-xl shadow-[0_10px_22px_rgba(0,46,64,0.06)]">
            <span>♟</span>
          </span>
          {integrations.slice(0, 5).map((name, index) => (
            <span
              className={`absolute px-3 py-2 rounded-full bg-[#fff0e6] text-[#254f5f] font-mono text-[9px] uppercase tracking-wider font-semibold shadow-2xs ${nodePositions[index]}`}
              key={name}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
