import Link from "next/link";
import {
  Zap,
  PhoneCall,
  Handshake,
  Briefcase,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";
import BlurText from "@/reuseable/BlurText";

export interface DirectLineItem {
  icon: LucideIcon;
  title: string;
  description: string;
  contacts: {
    label: string;
    href: string;
  }[];
  primaryHref: string;
}

const defaultDirectLines: DirectLineItem[] = [
  {
    icon: Zap,
    title: "Sales",
    description: "Plans, pricing and demos.",
    contacts: [
      { label: "sales@claripa.com", href: "mailto:sales@claripa.com" },
      { label: "+91 00000 00000", href: "tel:+910000000000" },
    ],
    primaryHref: "mailto:sales@claripa.com",
  },
  {
    icon: PhoneCall,
    title: "Support",
    description: "Help for existing clients.",
    contacts: [{ label: "support@claripa.com", href: "mailto:support@claripa.com" }],
    primaryHref: "mailto:support@claripa.com",
  },
  {
    icon: Handshake,
    title: "Partnerships",
    description: "Integrations and alliances.",
    contacts: [{ label: "partners@claripa.com", href: "mailto:partners@claripa.com" }],
    primaryHref: "mailto:partners@claripa.com",
  },
  {
    icon: Briefcase,
    title: "Careers",
    description: "Join the team.",
    contacts: [{ label: "careers@claripa.com", href: "mailto:careers@claripa.com" }],
    primaryHref: "mailto:careers@claripa.com",
  },
];

export interface DirectLinesProps {
  eyebrow?: string;
  title?: string;
  lines?: DirectLineItem[];
}

export default function DirectLines({
  eyebrow = "DIRECT LINES",
  title = "Other ways to reach us",
  lines = defaultDirectLines,
}: DirectLinesProps) {
  return (
    <section className="py-16 md:py-24 bg-[#F7F6F3]">
      <div className="px-[5%]">
        {/* Section Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#F8780C] shadow-[0_0_8px_rgba(248,120,12,0.55)]"
            />
            <span className="font-mono text-base font-semibold text-[#F8780C] tracking-wider uppercase">
              {eyebrow}
            </span>
          </div>
          <BlurText
            as="h2"
            text={title}
            delay={20}
            className="font-sora text-[#002E40] text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-[-0.04em] leading-[1.12]"
          />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {lines.map((line) => {
            const Icon = line.icon;
            return (
              <div
                key={line.title}
                className="rounded-[22px] bg-white border border-[#ECE9E3] p-6 sm:p-7 flex flex-col min-h-[230px] transition-all duration-300 hover:border-[#F8780C]/40 hover:shadow-[0_8px_24px_rgba(248,120,12,0.06)] group"
              >
                {/* Top content */}
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#FFF5EE] border border-[#FFE7D6] flex items-center justify-center text-[#F8780C] mb-5 shadow-sm transition-transform duration-200 group-hover:scale-105">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <BlurText
                    as="h3"
                    text={line.title}
                    delay={20}
                    className="font-sora text-[#002E40] text-base font-semibold tracking-tight"
                  />
                  <BlurText
                    as="p"
                    text={line.description}
                    delay={20}
                    className="font-sora text-[#62737A] text- leading-relaxed mt-1"
                  />
                </div>

                {/* Bottom details & arrow */}
                <div className="flex items-end justify-between mt-2">
                  <div className="flex flex-col gap-1 min-w-0">
                    {line.contacts.map((contact) => (
                      <Link
                        key={contact.label}
                        href={contact.href}
                        className="font-sora text-sm font-medium text-[#002E40] hover:text-[#F8780C] transition-colors truncate block"
                      >
                        {contact.label}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={line.primaryHref}
                    aria-label={`Contact ${line.title}`}
                    className="p-1 text-[#62737A] group-hover:text-[#F8780C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-2"
                  >
                    <ArrowUpRight size={19} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
