import Link from "next/link";
import { ArrowRight, CircleHelp } from "lucide-react";
import FAQList, { FAQItem } from "@/components/shared/FAQList";
import SectionEyebrow from "@/components/shared/SectionEyebrow";

export interface PlatformFAQProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  contactText?: string;
  contactHref?: string;
  faqs?: FAQItem[];
}

const defaultPlatformFaqs: FAQItem[] = [
  {
    question: "How soon will someone respond?",
    answer:
      "Within one business day. Demo requests usually hear back sooner, with a link to pick a time.",
  },
  {
    question: "Is the demo free?",
    answer:
      "Yes. We’ll show Claripa configured around your teams, workflows and current HR stack.",
  },
  {
    question: "Can I get pricing without a demo?",
    answer:
      "Talk to our team about your organisation and we can share the next steps.",
  },
  {
    question: "Do you support organisations outside India?",
    answer: "Contact us to discuss regional availability and requirements.",
  },
];

export default function PlatformFAQ({
  eyebrow = "FAQ",
  title = "Platform questions",
  lead = "Can’t find what you’re looking for? Our team is happy to help.",
  contactText = "Talk to our team",
  contactHref = "/contact-us",
  faqs = defaultPlatformFaqs,
}: PlatformFAQProps) {
  return (
    <section className="py-16 md:py-[88px] bg-[#fbf9f5]">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] items-start gap-9 lg:gap-[60px]">
        <div>
          <SectionEyebrow>
            <CircleHelp size={13} className="inline mr-1" /> {eyebrow}
          </SectionEyebrow>
          <h2 className="m-0 text-[#254f5f] font-sora text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-[-0.055em] leading-[1.08] my-3">
            {title}
          </h2>
          <p className="m-0 text-[#62737a] font-sora text-base leading-[1.65] max-w-[640px] mb-6">
            {lead}
          </p>
          <Link
            className="inline-flex items-center gap-[7px] text-[#254f5f] font-mono text-xs uppercase no-underline hover:text-[#f8780c] transition-colors"
            href={contactHref}
          >
            {contactText} <ArrowRight size={16} />
          </Link>
        </div>
        <FAQList items={faqs} />
      </div>
    </section>
  );
}
