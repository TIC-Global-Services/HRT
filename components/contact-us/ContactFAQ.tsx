import FaqAccordion, { FaqItem } from "@/reuseable/FaqAccordion";
import BlurText from "@/reuseable/BlurText";

export type { FaqItem as FAQItem };

export interface ContactFAQProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  faqs?: FaqItem[];
}

export const defaultContactFaqs: FaqItem[] = [
  {
    question: "How soon will someone respond?",
    answer: "Within one business day. Demo requests usually hear back sooner, with a link to pick a time.",
  },
  {
    question: "Is the demo free?",
    answer: "Yes. A personalised walkthrough is a chance to see how Claripa fits your organisation and existing HR stack.",
  },
  {
    question: "Can I get pricing without a demo?",
    answer: "Contact our team with your organisation size and requirements and we can point you in the right direction.",
  },
  {
    question: "Do you support organisations outside India?",
    answer: "Our team can discuss regional availability and data residency requirements for your organisation.",
  },
  {
    question: "How do I reach support as an existing client?",
    answer: "Email sales@claripa.com and our team will connect you to the right support contact.",
  },
];

export default function ContactFAQ({
  eyebrow = "FAQ",
  title = "Before you \nreach out",
  lead = "Quick answers to what people usually ask first.",
  faqs = defaultContactFaqs,
}: ContactFAQProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#F7F6F3]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[440px_1fr] gap-8 sm:gap-10 lg:gap-16 items-start">
        {/* Left header column */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-2.5 sm:mb-3">
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#F8780C] shadow-[0_0_8px_rgba(248,120,12,0.55)]"
            />
            <span className="font-mono text-xs font-semibold text-[#F8780C] tracking-wider uppercase">
              {eyebrow}
            </span>
          </div>

          <BlurText
            as="h2"
            text={title}
            delay={20}
            className="font-sora text-[#002E40] text-[28px] sm:text-3xl md:text-4xl lg:text-[46px] font-normal tracking-[-0.04em] leading-[1.12] mb-3 sm:mb-4 whitespace-pre-line text-center lg:text-left"
          />

          <BlurText
            as="p"
            text={lead}
            delay={20}
            className="font-sora text-[#62737A] text-base sm:text-lg leading-[1.2] max-w-xs lg:max-w-xs text-center lg:text-left"
          />
        </div>

        {/* Right accordion column */}
        <div className="w-full max-w-3xl mx-auto lg:max-w-none">
          <FaqAccordion items={faqs} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
}
