import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface WhereWeAreProps {
  eyebrow?: string;
  title?: string;
  kicker?: string;
  officeTitle?: string;
  officeDescription?: string;
  contactText?: string;
  contactHref?: string;
}

export default function WhereWeAre({
  eyebrow = "WHERE WE ARE",
  title = "Offices and teams",
  kicker = "HQ · INDIA (CHENNAI & MUMBAI)",
  officeTitle = "Working together, wherever work happens.",
  officeDescription = "Operating across Chennai and Mumbai to support forward-thinking people teams globally.",
  contactText = "Get in touch",
  contactHref = "/contact-us",
}: WhereWeAreProps) {
  return (
    <section
      id="locations"
      aria-label="Office locations"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-[1330px] mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-[#E26D35] font-mono text-xs font-semibold tracking-wider uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E26D35] shadow-[0_0_8px_rgba(226,109,53,0.55)]" />
            {eyebrow}
          </p>
          <h2 className="text-[#142938] font-sora text-3xl sm:text-4xl font-normal tracking-tight leading-tight">
            {title}
          </h2>
        </div>

        <div className="lg:col-span-2 rounded-[28px] sm:rounded-[32px] bg-white border border-[#E9ECEF] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div>
            <span className="font-mono text-xs text-[#E26D35] font-semibold tracking-wider uppercase mb-2 block">
              {kicker}
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#142938] font-sora mb-2">
              {officeTitle}
            </h3>
            <p className="text-sm sm:text-[15px] text-[#5A6A72] font-sora max-w-lg leading-relaxed">
              {officeDescription}
            </p>
          </div>
          <Link
            href={contactHref}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#1C4E5B] hover:bg-[#143B45] text-white font-mono text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 shadow-xs"
          >
            <span>{contactText}</span>
            <ArrowUpRight aria-hidden="true" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
