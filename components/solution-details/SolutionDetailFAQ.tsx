import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FaqAccordion, { FaqItem } from "@/reuseable/FaqAccordion";

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
    <section className="py-16 md:py-24 bg-[#F7F6F3]">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[440px_1fr] gap-10 lg:gap-16 items-start">
        {/* Left Header Column */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#F8780C] shadow-[0_0_8px_rgba(248,120,12,0.55)]"
            />
            <span className="font-mono text-xs font-semibold text-[#F8780C] tracking-wider uppercase">
              {eyebrow}
            </span>
          </div>

          <h2 className="font-sora text-[#002E40] text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-[-0.04em] leading-[1.12] mb-4">
            {title}
          </h2>

          <p className="font-sora text-[#62737A] text-base leading-relaxed max-w-sm mb-8">
            {lead}
          </p>

          <Link
            href={contactHref}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#002E40] text-white font-mono text-xs uppercase font-medium tracking-wider hover:bg-[#174453] transition-all hover:-translate-y-0.5 shadow-sm"
          >
            {contactText} <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Right Accordion Column using Reusable FaqAccordion */}
        <div className="w-full">
          <FaqAccordion items={faqs} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
}
