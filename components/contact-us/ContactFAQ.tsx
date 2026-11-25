import FaqSection from "@/components/shared/FaqSection";
import type { FaqItem } from "@/components/ui/FaqAccordion";

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
    answer:
      "Within one business day. Demo requests usually hear back sooner, with a link to pick a time.",
  },
  {
    question: "Is the demo free?",
    answer:
      "Yes. A personalised walkthrough is a chance to see how Claripa fits your organisation and existing HR stack.",
  },
  {
    question: "Can I get pricing without a demo?",
    answer:
      "Contact our team with your organisation size and requirements and we can point you in the right direction.",
  },
  {
    question: "Do you support organisations outside India?",
    answer:
      "Our team can discuss regional availability and data residency requirements for your organisation.",
  },
  {
    question: "How do I reach support as an existing client?",
    answer:
      "Email sales@claripa.com and our team will connect you to the right support contact.",
  },
];

export default function ContactFAQ({
  eyebrow = "FAQ",
  title = "Before you \nreach out",
  lead = "Quick answers to what people usually ask first.",
  faqs = defaultContactFaqs,
}: ContactFAQProps) {
  return (
    <FaqSection
      id="contact-faq"
      eyebrow={eyebrow}
      title={title}
      lead={lead}
      faqs={faqs}
    />
  );
}
