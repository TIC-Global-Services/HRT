"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import CaseStudyCarousel from "@/reuseable/Casestudycarosal";

export interface CaseStudyItem {
  id: string;
  category: string;
  title: string;
  href: string;
  imageSrc: string;
  stats: {
    value: string;
    label: string;
    highlighted?: boolean;
  }[];
}

// Exactly 2 case studies as specified
export const caseStudiesData: CaseStudyItem[] = [
  {
    id: "semiconductor-engineering",
    category: "SEMICONDUCTOR ENGINEERING",
    title: "How a Semiconductor Design \nCenter Accelerated Engineering Ramp-Up",
    href: "/case-studies/semiconductor-design-center",
    imageSrc: "/real-world-impact-1.jpg",
    stats: [
      {
        value: "28%",
        label: "Reduction in first-six-month attrition",
        highlighted: false,
      },
      {
        value: "40%",
        label: "Reduction in time to meaningful contribution",
        highlighted: true,
      },
    ],
  },
  {
    id: "enterprise-technology",
    category: "ENTERPRISE TECHNOLOGY",
    title:
      "How a Global Software Enterprise Retained Critical Engineering Talent Across 14 Hubs",
    href: "/case-studies/enterprise-technology-retention",
    imageSrc: "/real-world-impact-2.jpg",
    stats: [
      {
        value: "34%",
        label: "Increase in leadership bench depth",
        highlighted: false,
      },
      {
        value: "55%",
        label: "Reduction in unprompted key-talent flight risk",
        highlighted: true,
      },
    ],
  },
];

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
      ctaHref="/case-studies"
    />
  );
}
