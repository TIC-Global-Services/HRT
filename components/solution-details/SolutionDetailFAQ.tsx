import FaqSection from "@/components/shared/FaqSection";
import type { FaqItem } from "@/components/ui/FaqAccordion";

export type { FaqItem as FAQItem };

export interface SolutionDetailFAQProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  contactText?: string;
  contactHref?: string;
  faqs?: FaqItem[];
}

const defaultDetailFaqs: FaqItem[] = [
  {
    question: "How does Claripa help organizations manage performance?",
    answer:
      "Claripa connects organizational objectives, company and individual OKRs, tasks, performance reviews, check ins, and development insights in one platform. AI assistance supports goal creation and performance understanding.",
  },
  {
    question: "Can Claripa help create and align OKRs?",
    answer:
      "Yes, Claripa aligns organizational, departmental, and personal OKRs with clear milestones, ownership tracking, and AI-guided progress indicators.",
  },
  {
    question: "Can Claripa track tasks linked to OKRs?",
    answer:
      "Yes, day-to-day team tasks can be mapped directly to strategic OKRs, providing leadership and managers with visibility into real-time execution.",
  },
  {
    question: "Does Claripa support performance reviews and check-ins?",
    answer:
      "Claripa provides continuous feedback loops, scheduled 1:1 check-in templates, manager coaching prompts, and automated review summaries.",
  },
  {
    question: "Can Claripa identify employee skill gaps?",
    answer:
      "Yes, workforce intelligence surfaces emerging competency and behavioural gaps, helping organizations plan timely employee development interventions.",
  },
];

export default function SolutionDetailFAQ({
  eyebrow = "FAQ",
  title = "Questions About Claripa?",
  lead = "Learn more about Claripa’s performance management capabilities and how the platform can support your organization.",
  contactText = "TALK TO OUR TEAM",
  contactHref = "/contact-us",
  faqs = defaultDetailFaqs,
}: SolutionDetailFAQProps) {
  return (
    <FaqSection
      id="solution-faq"
      eyebrow={eyebrow}
      title={title}
      lead={lead}
      contactText={contactText}
      contactHref={contactHref}
      showContactArrow
      faqs={faqs}
    />
  );
}
