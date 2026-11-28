import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import BlurText from "@/components/ui/BlurText";
import SectionEyebrow from "@/components/shared/SectionEyebrow";

export interface FaqSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  lead: string;
  faqs: FaqItem[];
  contactText?: string;
  contactHref?: string;
  showContactArrow?: boolean;
  className?: string;
}

export default function FaqSection({
  id = "faq",
  eyebrow = "FAQ",
  title,
  lead,
  faqs,
  contactText,
  contactHref,
  showContactArrow = false,
  className = "",
}: FaqSectionProps) {
  return (
    <section
      id={id}
      aria-label="Frequently Asked Questions"
      className={`w-full max-w-full overflow-hidden bg-surface-warm py-16 sm:py-20 md:py-24 ${className}`.trim()}
    >
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[440px_1fr] gap-10 lg:gap-16 items-center md:items-start">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <SectionEyebrow showDot className="mb-3">
            {eyebrow}
          </SectionEyebrow>

          <BlurText
            as="h2"
            delay={20}
            text={title}
            className="text-brand-navy font-sora text-[28px] sm:text-4xl lg:text-[46px] font-normal tracking-[-0.035em] leading-[1.12] mb-4 whitespace-pre-line text-center lg:text-left"
          />

          <BlurText
            as="p"
            delay={20}
            text={lead}
            className="text-text-muted font-sora text-sm sm:text-base md:text-lg leading-[1.3] max-w-xl lg:max-w-[360px] mb-8 text-center lg:text-left"
          />

          {contactText && contactHref ? (
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-teal text-white font-geist-mono text-xs sm:text-sm font-medium tracking-tight uppercase hover:bg-brand-teal-hover transition-all hover:-translate-y-0.5 shadow-sm"
            >
              {contactText}
              {showContactArrow ? <ArrowUpRight size={15} aria-hidden="true" /> : null}
            </Link>
          ) : null}
        </div>

        <div className="w-full max-w-3xl mx-auto lg:max-w-none">
          <FaqAccordion items={faqs} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
}
