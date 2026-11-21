import type { BlogPost } from "./blogs";

export const allCaseStudies: BlogPost[] = [
  {
    id: "case-study-1",
    slug: "software-services-firm-attrition-transformation",
    blogNumber: 1,
    title: "How a 350-Person Software Services Firm Transformed Its Attrition Story",
    subtitle:
      "For this mid-sized software services firm, losing engineers with 3-5 years of tenure had become the organization's most persistent and most costly  people problem.",
    category: "CASE STUDY",
    topic: "Services",
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
    ctaCard: {
      eyebrow: "WORKFORCE INTELLIGENCE",
      title: "See where your workforce stands today",
      description:
        "Discover how Claripa unifies performance signals and predicts flight risk before it impacts your bottom line.",
      buttonText: "BOOK A DISCOVERY CALL",
      buttonHref: "/contact-us",
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "For this mid-sized software services firm, losing engineers with 3-5 years of tenure had become the organization's most persistent and most costly  people problem.",
          },
          {
            type: "paragraph",
            text: "These engineers owned client relationships, understood the codebases deeply and carried the institutional knowledge. Their departures went beyond backfilling roles - teams were stretched, project timelines slipped and client trust often had to be rebuilt",
          },
          {
            type: "paragraph",
            text: "What made the situation harder was the lack of early visibility.",
          },
          {
            type: "paragraph",
            text: "Exit conversations consistently pointed to familiar themes- limited growth visibility, feeling undervalued, better opportunities. But by the time these insights surfaced, the decision to leave had already been made.",
          },
          {
            type: "paragraph",
            text: "The signals had existed much earlier.",
          },
          {
            type: "paragraph",
            text: "The organization simply had no way to read them in time.",
          },
        ],
      },
      {
        id: "the-challenge",
        title: "The Challenge",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "Flight risk was invisible; there was no way to identify who was disengaging before they decided to leave",
              "Team health was a black box; managers relied on informal cues that were inconsistent and often too late",
              "Performance conversations happened too infrequently; high-potential employees stagnated and the window for intervention closed without anyone noticing",
            ],
          },
        ],
      },
      {
        id: "the-nexohra-engagement",
        title: "The Nexohra Engagement",
        blocks: [
          {
            type: "paragraph",
            text: "Nexohra's intelligence modules were deployed with a focused lens on the 3–5 year engineer cohort  (the population driving the attrition pattern). Within 60 days, the platform identified 20+ engineers showing early signs of risk, despite being seen as stable contributors.",
          },
          {
            type: "paragraph",
            text: "None had raised concerns formally. Without intervention, most would have remained invisible until resignation.",
          },
          {
            type: "paragraph",
            text: "For each individual, the right person received the right prompt at the right time - not a report, not a dashboard, but something actionable.",
          },
          {
            type: "comparison-table",
            table: {
              headers: ["Stakeholder", "Actionable Intelligence Delivered"],
              rows: [
                [
                  "Managers",
                  "Received timely alerts and guided prompts to initiate meaningful conversations before risk escalated",
                ],
                [
                  "HR",
                  "Received prioritized intervention signals across compensation, development dimensions",
                ],
                [
                  "Employees",
                  "Received personalized development visibility and internal growth pathways (many seeing this for the first time in their tenure)",
                ],
              ],
            },
          },
        ],
      },
      {
        id: "what-changed",
        title: "WHAT CHANGED",
        blocks: [
          {
            type: "bullet-list",
            items: [
              "Voluntary attrition in the 3–5 year cohort fell significantly (by 34%), the most significant improvement the organization had recorded",
              "Average time between meaningful performance conversations dropped from 6 months to under 3 weeks",
              "Compensation gaps were addressed proactively for multiple individuals, before any of them had initiated external conversations",
            ],
          },
          {
            type: "quote",
            quote: {
              text: "We went from finding out at the exit interview to finding out months earlier- when we could still do something about it. That shift alone changed everything.",
              author: "DIRECTOR, OPERATIONS",
            },
          },
          {
            type: "paragraph",
            text: "Attrition in experienced talent cohorts is rarely sudden. The signals are present long before a resignation arrives, that goes unaddressed. The difference between losing your best people and keeping them is often not a policy or a pay revision. It is the intelligence to see what's happening early enough to act.",
          },
        ],
      },
      {
        id: "ready-to-see-what-nexohra-surfaces-in-your-organization",
        title: "Ready to see what Nexohra surfaces in your organization?",
        blocks: [
          {
            type: "paragraph",
            text: "Speak with Our Team",
          },
        ],
      },
    ],
  },
  {
    id: "case-study-2",
    slug: "semiconductor-design-center-engineering-ramp-up",
    blogNumber: 2,
    title: "How a Semiconductor Design Center Accelerated Engineering Ramp-Up",
    subtitle:
      "A semiconductor design center was scaling rapidly, hiring 60+ specialized engineers over an 18-month period across design, verification and embedded systems roles.",
    category: "CASE STUDY",
    topic: "Semiconductor Engineering Center",
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
    ctaCard: {
      eyebrow: "WORKFORCE INTELLIGENCE",
      title: "See where your workforce stands today",
      description:
        "Discover how Claripa unifies performance signals and predicts flight risk before it impacts your bottom line.",
      buttonText: "BOOK A DISCOVERY CALL",
      buttonHref: "/contact-us",
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "A semiconductor design center was scaling rapidly, hiring 60+ specialized engineers over an 18-month period across design, verification and embedded systems roles.",
          },
          {
            type: "paragraph",
            text: "While hiring velocity increased, leadership noticed that new hires were taking longer than expected to contribute meaningfully to the engineering programs. The ramp-up cycle often extended, with significant variation across teams. Also, early attrition within the first year was higher than expected, exceeding industry benchmarks for similar talent profiles.",
          },
          {
            type: "paragraph",
            text: "Post-exit feedback consistently pointed to the same root causes- poor onboarding structure and unclear early role expectations.",
          },
        ],
      },
      {
        id: "the-challenge",
        title: "The Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "Onboarding for engineering hires was largely informal, driven by checklist, peer support and individual manager practices.",
          },
          {
            type: "paragraph",
            text: "This led to:",
          },
          {
            type: "bullet-list",
            items: [
              "Inconsistent onboarding experiences across teams",
              "Limited visibility into early-stage progress and engagement",
              "Delayed identification of integration gaps and disengagement signals",
            ],
          },
          {
            type: "paragraph",
            text: "By the time issues surfaced, both productivity delays and attrition risks had already materialized.",
          },
        ],
      },
      {
        id: "nexohra-engagement",
        title: "Nexohra Engagement",
        blocks: [
          {
            type: "paragraph",
            text: "Working closely with HR and engineering leadership, Nexohra established a structured visibility layer across the onboarding journey, giving the organization a consistent, real-time view of how new hires were progressing across teams.",
          },
          {
            type: "paragraph",
            text: "Early integration signals were surfaced well before they would have appeared through traditional channels. Within the first two to three weeks of each new hire's start date, the platform was already identifying who was integrating on track and who was showing early friction based on behavioral signals, not purely on surveys.",
          },
          {
            type: "paragraph",
            text: "The right conversations happened earlier. Role clarity gaps were addressed before they became disengagement. Managers had specific, timely context rather than generic reminders. HR had a cohort-level view of assimilation health for the first time.",
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
              "New hire attrition in the first 6 months fell by 28%",
              "Time-to-meaningful-contribution dropped by 40% (from ~5–6 months to under 3.5)",
              "3× increase in structured early check-in frequency",
            ],
          },
          {
            type: "paragraph",
            text: "For the first time, the quality of a new hire's onboarding experience was consistent across teams regardless of which manager a new hire reported to.",
          },
          {
            type: "paragraph",
            text: "In a market where specialized engineering talent is scarce and costly to replace, that consistency became a measurable business advantage.",
          },
        ],
      },
      {
        id: "explore-onboarding-intelligence-with-nexohra",
        title: "Explore Onboarding Intelligence with Nexohra",
        blocks: [
          {
            type: "paragraph",
            text: "If your organization is scaling hiring but struggling with ramp-up consistency or early attrition, we'd be glad to show you what this could look like in your context.",
          },
          {
            type: "paragraph",
            text: "Speak With Our Team",
          },
        ],
      },
    ],
  },
  {
    id: "case-study-3",
    slug: "automotive-gcc-india-performance-visibility",
    blogNumber: 3,
    title:
      "How an Automotive GCC in India Strengthened Performance Visibility Across Engineering Programs",
    subtitle:
      "An Indian Automotive GCC supported multiple global engineering programs across software, electronics and digital engineering teams.",
    category: "CASE STUDY",
    topic: "Automotive GCC",
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
    ctaCard: {
      eyebrow: "WORKFORCE INTELLIGENCE",
      title: "See where your workforce stands today",
      description:
        "Discover how Claripa unifies performance signals and predicts flight risk before it impacts your bottom line.",
      buttonText: "BOOK A DISCOVERY CALL",
      buttonHref: "/contact-us",
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "An Indian Automotive GCC supported multiple global engineering programs across software, electronics and digital engineering teams.",
          },
          {
            type: "paragraph",
            text: "The organization had strong talent and well-defined delivery expectations. However, its performance management approach had not evolved at the same pace. Performance conversations were largely periodic, driven by review cycles rather than ongoing alignment. While teams were delivering, there was limited visibility into how individual contributions were tracking against evolving business priorities.",
          },
          {
            type: "paragraph",
            text: "As the organization scaled, this gap became more visible. It began to impact both team alignment and individual engagement, with delayed recognition of high contributors and slower response to emerging performance shifts.",
          },
        ],
      },
      {
        id: "the-challenge",
        title: "The Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "Performance was being managed, but not continuously understood, and with no unified view, limiting visibility into how performance was evolving.",
          },
          {
            type: "paragraph",
            text: "This resulted in-",
          },
          {
            type: "bullet-list",
            items: [
              "Fragmented Goal Alignment: Organizational priorities did not consistently translate into team and individual goals, leading to gaps in ownership",
              "Periodic Performance Conversations: Performance conversations were anchored to review cycles, with limited structured feedback or course correction in between",
              "Limited Visibility into Performance Trends: There was no clear, ongoing view of progress, making early signs of misalignment or stagnation hard to identify",
              "Reactive Interventions: By the time performance gaps became visible, they had often already impacted delivery outcomes or team effectiveness",
            ],
          },
        ],
      },
      {
        id: "the-nexohra-engagement",
        title: "The Nexohra Engagement",
        blocks: [
          {
            type: "paragraph",
            text: "Nexohra first aligned the performance management foundation by bringing clarity to goal setting, OKRs and tracking mechanisms.",
          },
          {
            type: "paragraph",
            text: "Building on this, Performance Management Intelligence Module was deployed to create a continuous, real-time view of performance across teams. By analysing multiple workforce signals, the system surfaced patterns that would otherwise remain hidden.",
          },
          {
            type: "paragraph",
            text: "This brought into focus-",
          },
          {
            type: "bullet-list",
            items: [
              "Early signs of performance plateau in critical contributors",
              "Where goal progression was slowing or deviating across teams",
              "Misalignment between goals and role expectations",
              "Uneven performance distribution across similar roles or teams",
            ],
          },
          {
            type: "paragraph",
            text: "More importantly, these insights were not static dashboards, they translated into timely nudges, prompts and visibility cues embedded into the workflow for the key stakeholders (HR and managers), enabling faster, more informed decisions.",
          },
        ],
      },
      {
        id: "what-changed",
        title: "WHAT CHANGED",
        blocks: [
          {
            type: "paragraph",
            text: "Within the first few months of implementation, the organization saw-",
          },
          {
            type: "bullet-list",
            items: [
              "25-30% improvement in goal alignment across teams",
              "2x increase in frequency of meaningful performance conversations",
              "Significant reduction in performance-related escalations",
              "Faster identification and resolution of performance gaps",
            ],
          },
        ],
      },
      {
        id: "explore-performance-intelligence-with-nexohra",
        title: "Explore Performance Intelligence with Nexohra",
        blocks: [
          {
            type: "paragraph",
            text: "Speak with Our Team",
          },
        ],
      },
    ],
  },
];
