import FaqSection from "@/components/shared/FaqSection";
import type { FaqItem } from "@/components/ui/FaqAccordion";

export type { FaqItem };

export interface PlatformFaqProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  contactText?: string;
  contactHref?: string;
  faqs?: FaqItem[];
  className?: string;
}

const defaultPlatformFaqs: FaqItem[] = [
  {
    question: "How does Claripa help organizations manage performance?",
    answer:
      "Claripa connects organizational objectives, company and individual OKRs, tasks, performance reviews, check-ins, and development insights in one platform. AI assistance supports goal creation and performance understanding.",
  },
  {
    question: "Can Claripa help create and align OKRs?",
    answer:
      "Yes. Claripa supports AI-assisted OKR creation and cascading, helping organizations connect strategic objectives with company, team, and individual goals.",
  },
  {
    question: "Can Claripa track tasks linked to OKRs?",
    answer:
      "Claripa supports task creation linked to OKRs and day-to-day task progress tracking. AI nudges can support timely follow-ups and accountability.",
  },
  {
    question: "Does Claripa support performance reviews and check-ins?",
    answer:
      "Yes. Claripa supports configurable performance assessment cycles, performance reviews, check-ins, and AI-assisted performance summaries.",
  },
  {
    question: "Can Claripa identify employee skill gaps?",
    answer:
      "Claripa supports behavioural competency assessment and skill gap analysis to help identify development needs and guide appropriate interventions.",
  },
  {
    question: "Can Claripa integrate with our existing HRMS or business systems?",
    answer:
      "Integration requirements can be evaluated based on your existing systems, available data, and technical requirements. Specific integrations and their availability can be discussed with the Claripa team.",
  },
  {
    question: "How long does Claripa implementation take?",
    answer:
      "The implementation timeline depends on the organization's requirements, configuration, data readiness, and integration needs. Contact the Claripa team to discuss the expected timeline for your organization.",
  },
  {
    question: "How can we see Claripa in action?",
    answer:
      "Book a personalised demonstration to explore Claripa's workflows, understand its capabilities, and discuss your organization's performance management requirements.",
  },
];

export default function PlatformFaq({
  eyebrow = "PLATFORM QUESTIONS",
  title = "Questions\nAbout Claripa?",
  lead = "Learn more about Claripa's performance management capabilities and how the platform can support your organization.",
  contactText = "TALK TO OUR TEAM",
  contactHref = "/contact-us",
  faqs = defaultPlatformFaqs,
  className = "",
}: PlatformFaqProps) {
  return (
    <FaqSection
      id="faq"
      eyebrow={eyebrow}
      title={title}
      lead={lead}
      contactText={contactText}
      contactHref={contactHref}
      faqs={faqs}
      className={className}
    />
  );
}
