import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

export interface SecurityPillar {
  title: string;
  detail: string;
}

const defaultPillars: SecurityPillar[] = [
  { title: "Encryption", detail: "In transit and at rest" },
  { title: "Role-based access", detail: "Right insight, right person only" },
  { title: "Data residency", detail: "Regions to confirm" },
  { title: "Compliance", detail: "Enterprise-ready controls" },
];

export interface SecurityAndTrustProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  overviewText?: string;
  overviewHref?: string;
  pillars?: SecurityPillar[];
}

export default function SecurityAndTrust({
  eyebrow = "SECURITY & TRUST",
  title = "People data deserves enterprise-grade care.",
  description = "Privacy and security are part of the platform from the start.",
  overviewText = "Security overview",
  overviewHref = "/contact-us",
  pillars = defaultPillars,
}: SecurityAndTrustProps) {
  return (
    <section className="py-16 md:py-[88px] bg-[#254f5f] text-white">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] items-center gap-10 lg:gap-14">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <Link
            className="inline-flex min-h-[48px] items-center justify-center gap-2.5 px-[22px] rounded-full border border-white/28 bg-white text-[#002e40] font-mono text-[11px] font-medium tracking-[0.02em] uppercase hover:bg-[#f7f6f3] transition-all hover:-translate-y-0.5 cursor-pointer mt-4"
            href={overviewHref}
          >
            {overviewText} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pillars.map(({ title, detail }) => (
            <article
              key={title}
              className="min-h-[115px] p-[18px] border border-white/18 rounded-[16px] bg-white/5 backdrop-blur-2xs"
            >
              <LockKeyhole
                aria-hidden="true"
                size={19}
                className="float-left mr-2.5 text-[#f8780c]"
              />
              <strong className="text-[13px] font-medium font-sora block text-white">
                {title}
              </strong>
              <p className="mt-2.5 m-0 text-white/65 text-[11px] font-sora">
                {detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
