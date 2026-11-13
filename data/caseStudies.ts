import type { BlogPost } from "./blogs";

export const allCaseStudies: BlogPost[] = [
  {
    id: "case-study-1",
    slug: "software-services-firm-attrition-transformation",
    blogNumber: 7,
    title: "How a 350-Person Software Services Firm Transformed Its Attrition Story",
    subtitle:
      "A 350-person software services organization was losing experienced engineers with 3–5 years of tenure—talent that owned client relationships, understood codebases, and carried critical institutional knowledge. Claripa surfaced flight risk months before resignations arrived and reduced voluntary attrition in that cohort by 34%.",
    category: "CASE STUDY",
    topic: "ATTRITION",
    isFeatured: true,
    date: "MARCH 12, 2026",
    readTime: "5 min read",
    author: {
      name: "Claripa Customer Intelligence",
      role: "Enterprise Delivery & Workforce Strategy",
      avatar: "/team.jpg",
    },
    image: "/case-study-1.png",
    coverImageAlt:
      "Software services leadership and engineering team collaborating in a modern office",
    statsHighlight: {
      value: "34%",
      label: "Reduction in voluntary attrition across the 3–5 year engineering cohort",
    },
    keyTakeaways: [
      "Identified 20+ experienced engineers showing early flight-risk signals within 60 days—none of whom had raised formal concerns.",
      "Reduced voluntary attrition in the 3–5 year cohort by 34%, the most significant improvement the organization had recorded.",
      "Shortened average time between meaningful performance conversations from 6 months to under 3 weeks.",
      "Addressed compensation gaps proactively for multiple contributors before any initiated external interviews.",
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "A 350-person software services firm was losing experienced engineers with 3–5 years of tenure—the exact cohort that owned client relationships, understood complex codebases, and carried institutional knowledge across delivery accounts.",
          },
          {
            type: "paragraph",
            text: "Every departure stretched delivery teams, slipped project timelines, and eroded client trust. Yet leadership lacked early visibility into why stability was slipping. By the time exit conversations took place, departing engineers cited limited growth visibility, feeling undervalued, and better external opportunities—feedback that arrived only after decisions were already finalized.",
          },
        ],
      },
      {
        id: "the-challenge",
        title: "The Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "Without continuous workforce intelligence, retention efforts stayed reactive:",
          },
          {
            type: "bullet-list",
            items: [
              "Flight risk was invisible: There was no systematic way to identify who was disengaging before they decided to leave.",
              "Team health was a black box: Managers relied on informal cues that were inconsistent across accounts and often recognized too late.",
              "Performance conversations happened too infrequently: High-potential engineers stagnated while the window for effective intervention closed unnoticed.",
            ],
          },
        ],
      },
      {
        id: "the-claripa-engagement",
        title: "The Claripa Engagement",
        blocks: [
          {
            type: "paragraph",
            text: "The firm deployed Claripa intelligence modules centered on its 3–5 year engineering cohort. Within 60 days, the platform identified more than 20 engineers showing early signs of disengagement and flight risk—despite being viewed internally as stable contributors with zero formal complaints on record.",
          },
          {
            type: "paragraph",
            text: "Rather than leaving insights trapped in static dashboards, Claripa routed targeted, role-specific guidance directly to the people positioned to act:",
          },
          {
            type: "comparison-table",
            table: {
              headers: ["Stakeholder", "Actionable Intelligence Delivered"],
              rows: [
                [
                  "Engineering Managers",
                  "Received timely risk alerts and guided conversation prompts to initiate meaningful check-ins before frustration escalated.",
                ],
                [
                  "HR & People Partners",
                  "Received prioritized intervention signals spanning compensation positioning and career development gaps.",
                ],
                [
                  "Engineers",
                  "Received personalized development visibility and clear internal growth pathways—many for the first time in their tenure.",
                ],
              ],
            },
          },
        ],
      },
      {
        id: "what-changed",
        title: "What Changed",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "Voluntary attrition in the 3–5 year cohort fell by 34%—the largest retention improvement the organization had ever recorded.",
              "Average time between meaningful performance conversations dropped from 6 months to under 3 weeks.",
              "Compensation gaps were surfaced and addressed proactively for multiple key contributors before any external conversations began.",
            ],
          },
          {
            type: "quote",
            quote: {
              text: "We went from finding out at the exit interview to finding out months earlier—when we could still do something about it. That shift alone changed everything.",
              author: "Director, Operations",
            },
          },
          {
            type: "paragraph",
            text: "Attrition in experienced talent cohorts is rarely sudden; the signals are present long before a resignation arrives. The difference lies in having the intelligence to see what is happening early enough to act.",
          },
        ],
      },
    ],
  },
  {
    id: "case-study-2",
    slug: "semiconductor-design-center-engineering-ramp-up",
    blogNumber: 8,
    title: "How a Semiconductor Design Center Accelerated Engineering Ramp-Up",
    subtitle:
      "Hiring 60+ specialized engineers over 18 months across design, verification, and embedded systems exposed inconsistent onboarding and elevated early attrition. Claripa introduced a structured visibility layer that reduced time-to-meaningful-contribution by 40% and cut 6-month attrition by 28%.",
    category: "CASE STUDY",
    topic: "ONBOARDING",
    isFeatured: true,
    date: "MARCH 04, 2026",
    readTime: "5 min read",
    author: {
      name: "Claripa Customer Intelligence",
      role: "Enterprise Delivery & Workforce Strategy",
      avatar: "/team.jpg",
    },
    image: "/case-study-2.png",
    coverImageAlt:
      "Engineer holding a semiconductor processor above an engineering test board",
    statsHighlight: {
      value: "40%",
      label: "Faster time-to-meaningful-contribution (from ~5–6 months down to under 3.5)",
    },
    keyTakeaways: [
      "Cut new-hire attrition in the first 6 months by 28% across design, verification, and embedded systems teams.",
      "Dropped time-to-meaningful-contribution by 40%, accelerating ramp-up from ~5–6 months to under 3.5 months.",
      "Delivered a 3× increase in structured early check-in frequency between hiring managers and new engineers.",
      "Replaced informal, manager-dependent habits with consistent onboarding visibility across every engineering group.",
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "A rapidly scaling semiconductor engineering center hired more than 60 specialized engineers over an 18-month window across silicon design, verification, and embedded systems roles.",
          },
          {
            type: "paragraph",
            text: "Despite hiring strong technical talent, new engineers were taking significantly longer than expected to become productive contributors, ramp-up timelines varied sharply across teams, and first-year attrition exceeded industry benchmarks. Post-exit feedback consistently pointed to weak onboarding structure and unclear early role expectations.",
          },
        ],
      },
      {
        id: "the-challenge",
        title: "The Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "Onboarding had grown organically around basic checklists, ad-hoc peer support, and individual manager habits, creating three compounding operational gaps:",
          },
          {
            type: "bullet-list",
            items: [
              "Inconsistent onboarding experiences across design, verification, and embedded systems teams.",
              "Limited visibility into early-stage progression and day-to-day new-hire engagement.",
              "Delayed identification of team integration gaps and early disengagement signals.",
            ],
          },
        ],
      },
      {
        id: "the-claripa-engagement",
        title: "The Claripa Engagement",
        blocks: [
          {
            type: "paragraph",
            text: "Working alongside HR and engineering leadership, Claripa established a structured visibility layer spanning the entire onboarding journey—giving stakeholders a consistent, real-time view of new-hire progression.",
          },
          {
            type: "paragraph",
            text: "Within the first 2–3 weeks of joining, Claripa surfaced early integration friction and role-clarity gaps derived from behavioral signals rather than waiting on periodic surveys alone:",
          },
          {
            type: "comparison-table",
            table: {
              headers: ["Capability", "Operational Impact"],
              rows: [
                [
                  "Early Signal Detection (Weeks 2–3)",
                  "Surfaced subtle integration bottlenecks and role-expectation gaps early while interventions were lightweight.",
                ],
                [
                  "Context-Rich Manager Prompts",
                  "Equipped engineering managers with specific context for structured check-ins instead of generic checklist reviews.",
                ],
                [
                  "Cohort-Level Assimilation View",
                  "Gave HR a unified health view across incoming engineering cohorts to spot systemic team variance immediately.",
                ],
              ],
            },
          },
        ],
      },
      {
        id: "what-changed",
        title: "What Changed",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "New-hire attrition in the first 6 months fell by 28%.",
              "Time-to-meaningful-contribution dropped by 40%, moving from approximately 5–6 months to under 3.5 months.",
              "Structured early check-in frequency increased 3× across engineering managers.",
              "Onboarding quality became consistent across teams regardless of individual manager style.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "case-study-3",
    slug: "automotive-gcc-india-performance-visibility",
    blogNumber: 9,
    title:
      "How an Automotive GCC in India Strengthened Performance Visibility Across Engineering Programs",
    subtitle:
      "Supporting global software, electronics, and digital engineering programs outpaced annual review-cycle performance management. Claripa aligned goal setting and continuous performance intelligence—driving 25–30% stronger goal alignment and 2× more meaningful performance conversations.",
    category: "CASE STUDY",
    topic: "ANALYTICS",
    isFeatured: true,
    date: "FEBRUARY 24, 2026",
    readTime: "6 min read",
    author: {
      name: "Claripa Customer Intelligence",
      role: "Enterprise Delivery & Workforce Strategy",
      avatar: "/team.jpg",
    },
    image: "/case-study-3.png",
    coverImageAlt:
      "Engineering leaders aligning global program priorities and performance metrics on a team board",
    statsHighlight: {
      value: "25–30%",
      label: "Improvement in cross-team goal alignment with 2× more performance conversations",
    },
    keyTakeaways: [
      "Improved cross-team goal alignment by 25–30% across software, electronics, and digital engineering groups.",
      "Doubled (2×) the frequency of meaningful performance conversations beyond formal review cycles.",
      "Significantly reduced performance-related escalations by surfacing slowing goal progression early.",
      "Embedded real-time OKR visibility, plateau detection, and workflow nudges for HR and engineering managers.",
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "An Automotive Global Capability Center (GCC) in India supported multiple global engineering programs spanning software, electronics, and digital engineering teams. While technical talent and global delivery expectations were high, performance management practices had not evolved at the same pace.",
          },
          {
            type: "paragraph",
            text: "Processes remained periodic and anchored to formal review cycles, leaving leadership with limited visibility into how individual contributions tracked against shifting program priorities—delaying recognition of high contributors and slowing intervention when performance drifted.",
          },
        ],
      },
      {
        id: "the-challenge",
        title: "The Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "Performance was being administered on a schedule rather than continuously understood, leaving the organization without a unified operational view:",
          },
          {
            type: "bullet-list",
            items: [
              "Fragmented Goal Alignment: Organizational priorities did not consistently cascade into team and individual goals, creating ownership gaps across global programs.",
              "Periodic Performance Conversations: Feedback remained tied to scheduled review windows with minimal structured course correction in between.",
              "Limited Visibility into Performance Trends: Without an ongoing view of progress, early signs of misalignment or stagnation went unnoticed.",
              "Reactive Interventions: By the time performance gaps surfaced formally, they had often already affected delivery timelines or team effectiveness.",
            ],
          },
        ],
      },
      {
        id: "the-claripa-engagement",
        title: "The Claripa Engagement",
        blocks: [
          {
            type: "paragraph",
            text: "The GCC partnered with Claripa to align its performance foundation—connecting goal setting, OKRs, and tracking mechanisms—and deployed Claripa's Performance Management Intelligence Module to establish a continuous, real-time view across engineering teams.",
          },
          {
            type: "paragraph",
            text: "The module continuously surfaced four critical operational signals across comparable engineering groups:",
          },
          {
            type: "bullet-list",
            items: [
              "Early signs of performance plateau among critical contributors.",
              "Programs and teams where goal progression was slowing or deviating from targets.",
              "Misalignment between assigned goals and evolving role expectations.",
              "Uneven performance distribution across similar engineering roles and teams.",
            ],
          },
          {
            type: "paragraph",
            text: "Instead of forcing managers to hunt through spreadsheets, these signals were translated into timely nudges, conversation prompts, and visibility cues embedded directly into everyday workflows for both HR and engineering leadership.",
          },
        ],
      },
      {
        id: "what-changed",
        title: "What Changed",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "25–30% improvement in goal alignment across software, electronics, and digital engineering teams.",
              "2× increase in the frequency of meaningful performance conversations throughout the year.",
              "Significant reduction in performance-related delivery escalations.",
              "Faster identification and resolution of performance gaps before program outcomes were impacted.",
            ],
          },
        ],
      },
    ],
  },
];

