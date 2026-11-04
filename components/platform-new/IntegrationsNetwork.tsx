"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

export interface IntegrationPartner {
  name: string;
  shortName: string;
}

export interface IntegrationsNetworkProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  integrations?: IntegrationPartner[];
}

const defaultIntegrations: IntegrationPartner[] = [
  { name: "Workday", shortName: "W" },
  { name: "HiBob", shortName: "Hi" },
  { name: "Microsoft", shortName: "M" },
  { name: "SAP", shortName: "SAP" },
  { name: "Slack", shortName: "S" },
  { name: "Rippling", shortName: "R" },
  { name: "Oracle", shortName: "O" },
  { name: "Zoho", shortName: "Z" },
];

const positionClasses = [
  "left-[10%] top-[20%]",
  "left-[34%] top-[5%]",
  "right-[29%] top-[5%]",
  "right-[7%] top-[23%]",
  "right-[7%] bottom-[23%]",
  "right-[29%] bottom-[5%]",
  "left-[34%] bottom-[5%]",
  "left-[10%] bottom-[20%]",
];

export default function IntegrationsNetwork({
  eyebrow = "INTEGRATIONS",
  title = "Connect Claripa with the tools you already use.",
  description = "Explore opportunities to connect Claripa with your existing business systems and data sources to support a more connected performance management process.",
  integrations = defaultIntegrations,
}: IntegrationsNetworkProps) {
  const [query, setQuery] = useState("");
  const filteredIntegrations = useMemo(
    () =>
      integrations.filter((integration) =>
        integration.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [integrations, query],
  );

  return (
    <section
      aria-labelledby="integrations-title"
      className="overflow-hidden rounded-t-[32px] bg-white px-5 py-16 sm:px-8 md:py-24"
      id="integrations"
    >
      <div className="relative mx-auto max-w-7xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-20 top-24 aspect-square rounded-full border border-dashed border-[#edf0f1]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-44 mx-auto aspect-square max-w-4xl rounded-full border border-dashed border-[#edf0f1]"
        />

        <SectionHeading
          centered
          description={description}
          eyebrow={eyebrow}
          id="integrations-title"
          title={title}
        />

        <label className="relative z-10 mx-auto mt-6 flex min-h-12 max-w-sm items-center gap-3 rounded-full border border-[#dedbd6] bg-[#f7f6f3] px-5 focus-within:border-[#254f5f]">
          <Search aria-hidden="true" className="shrink-0 text-[#62737a]" size={17} />
          <input
            aria-label="Search integrations"
            className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[#254f5f] outline-none placeholder:text-[#7c8587]"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search integrations..."
            type="search"
            value={query}
          />
        </label>

        <div className="relative mx-auto mt-12 flex min-h-[380px] max-w-4xl items-center justify-center sm:mt-16 sm:min-h-[480px]">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#f8780c]"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#e9edef]"
          />
          <div className="relative z-10 flex max-w-48 flex-col items-center text-center">
            <div className="grid size-20 place-items-center rounded-[22px] bg-[#141210] shadow-[0_14px_45px_rgba(248,120,12,0.2)]">
              <Image
                alt="Claripa"
                className="size-10 object-contain"
                height={64}
                src="/claripa-center-badge.png"
                width={64}
              />
            </div>
            <p className="mb-0 mt-4 text-sm leading-relaxed text-[#62737a]">
              Build a connected performance ecosystem
            </p>
          </div>

          {filteredIntegrations.length > 0 ? (
            filteredIntegrations.slice(0, 8).map((integration, index) => (
              <span
                className={`absolute z-20 grid size-12 place-items-center rounded-2xl border border-[#f0ede8] bg-white font-mono text-sm font-semibold text-[#254f5f] shadow-[0_8px_24px_rgba(37,79,95,0.1)] sm:size-14 sm:text-base ${positionClasses[index]}`}
                key={integration.name}
                title={integration.name}
              >
                {integration.shortName}
              </span>
            ))
          ) : (
            <p
              aria-live="polite"
              className="absolute bottom-0 z-10 rounded-full bg-[#fff4ec] px-4 py-2 text-sm text-[#8b4b1f]"
            >
              No integrations match “{query}”.
            </p>
          )}
        </div>
        <p aria-live="polite" className="sr-only">
          Showing {filteredIntegrations.length} integrations.
        </p>
      </div>
    </section>
  );
}
