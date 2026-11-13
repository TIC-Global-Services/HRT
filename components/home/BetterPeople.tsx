"use client";

import React from "react";
import CaseStudyCarousel, {
  type CaseStudyItem,
  type CaseStudyStat,
} from "@/reuseable/Casestudycarosal";
import { allCaseStudies } from "@/data/caseStudies";

export type { CaseStudyItem, CaseStudyStat };

// Domain categories and dual metrics mapped from each case study in data/caseStudies.ts
const caseStudyMetricsMap: Record<
  string,
  {
    category: string;
    stats: CaseStudyStat[];
  }
> = {
  "software-services-firm-attrition-transformation": {
    category: "SOFTWARE SERVICES",
    stats: [
      {
        value: "34%",
        label: "Reduction in voluntary attrition across 3–5 yr cohort",
        highlighted: true,
      },
      {
        value: "< 3 wks",
        label: "Average time between meaningful performance check-ins",
        highlighted: false,
      },
    ],
  },
  "semiconductor-design-center-engineering-ramp-up": {
    category: "SEMICONDUCTOR ENGINEERING",
    stats: [
      {
        value: "40%",
        label: "Faster time to meaningful engineering contribution",
        highlighted: true,
      },
      {
        value: "28%",
        label: "Reduction in first-six-month new-hire attrition",
        highlighted: false,
      },
    ],
  },
  "automotive-gcc-india-performance-visibility": {
    category: "AUTOMOTIVE GCC",
    stats: [
      {
        value: "25–30%",
        label: "Improvement in cross-team goal alignment",
        highlighted: true,
      },
      {
        value: "2×",
        label: "Increase in frequency of meaningful performance conversations",
        highlighted: false,
      },
    ],
  },
};

// Generated dynamically from allCaseStudies dataset
export const caseStudiesData: CaseStudyItem[] = allCaseStudies.map((study) => {
  const metrics = caseStudyMetricsMap[study.slug] || {
    category: study.topic ? `${study.topic} · CASE STUDY` : study.category,
    stats: [
      {
        value: study.statsHighlight?.value || "—",
        label: study.statsHighlight?.label || "Measurable business outcome",
        highlighted: true,
      },
      {
        value: "100%",
        label: "Visibility into team performance signals",
        highlighted: false,
      },
    ],
  };

  return {
    id: study.id,
    category: metrics.category,
    title: study.title,
    href: `/insight/${study.slug}`,
    imageSrc: study.image,
    stats: metrics.stats,
  };
});

export default function BetterPeople() {
  return (
    <CaseStudyCarousel
      items={caseStudiesData}
      sectionId="impacts"
      ariaLabel="Real World Impacts"
      eyebrow="REAL WORLD IMPACTS"
      headingLines={["Better people decisions.", "Measurable outcomes."]}
      description="Discover how organisations use workforce intelligence to identify risks earlier, improve performance visibility and make more timely decisions about their people."
      ctaLabel="READ MORE SUCCESS STUDIES"
      ctaHref="/insight"
    />
  );
}
