"use client";

import Link from "next/link";
import FaqAccordion, { FaqItem } from "@/reuseable/FaqAccordion";
import BlurText from "@/reuseable/BlurText";

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
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className={`w-full bg-[#F7F6F3] py-16 sm:py-20 md:py-24 ${className}`.trim()}
    >
      <div className="w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-10 lg:gap-16 items-start">
        {/* Left Column: Heading & CTA matching image */}
        <div>
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-[#E56A1E] mb-3">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.7)]"
            />
            {eyebrow}
          </p>

          {/* Title */}
          <BlurText
            as="h2"
            delay={20}
            text={title}
            className="text-[#002e40] font-sora text-3xl sm:text-4xl md:text-[44px] font-semibold tracking-[-0.035em] leading-[1.12] mb-4"
          />

          {/* Description */}
          <BlurText
            as="p"
            delay={20}
            text={lead}
            className="text-[#5A6D75] font-sora text-sm sm:text-base leading-[1.3] max-w-[360px] mb-8"
          />

          {/* Contact Button */}
          <Link
            href={contactHref}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#254F5F] text-white font-mono text-base font-semibold tracking-tight uppercase hover:bg-[#174453] transition-all hover:-translate-y-0.5 shadow-sm"
          >
            {contactText}
          </Link>
        </div>

        {/* Right Column: Reusable FaqAccordion */}
        <div className="w-full">
          <FaqAccordion items={faqs} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
}
