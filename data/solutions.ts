import type { ChallengeItem } from "@/components/solution-details/TheChallenge";
import type { SolutionStepItem } from "@/components/solution-details/TheSolutionSteps";
import type { FaqItem } from "@/reuseable/FaqAccordion";

export interface SolutionDashboardRow {
  initials: string;
  title: string;
  subtitle: string;
  severity: string;
  progress: number;
  highlighted?: boolean;
}

export interface SolutionDashboardData {
  floatingBadgeTitle: string;
  floatingBadgeSubtitle: string;
  eyebrow: string;
  attentionBadge: string;
  heading: string;
  rows: SolutionDashboardRow[];
  suggestedNextStep: string;
}

export interface SolutionDetailData {
  id: string;
  slug: string;
  cardTitle: string;
  cardDescription: string;
  cardTags: string;
  featured?: boolean;
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    breadcrumb: string;
    title: string;
    description: string;
    talkText: string;
    talkHref: string;
    overviewText: string;
    overviewHref: string;
    dashboard: SolutionDashboardData;
  };
  challenge: {
    eyebrow: string;
    title: string;
    quote: string;
    items: ChallengeItem[];
  };
  solution: {
    eyebrow: string;
    title: string;
    steps: SolutionStepItem[];
  };
  poweredBy: {
    eyebrow: string;
    title: string;
    layers: {
      label: string;
      isPrimary?: boolean;
    }[];
  };
  results: {
    heading: string;
    bullets: string[];
  };
  faq: {
    eyebrow: string;
    title: string;
    lead: string;
    items: FaqItem[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonHref: string;
  };
}

export const allSolutions: SolutionDetailData[] = [
  {
    id: "solution-01",
    slug: "align-goals-and-improve-performance",
    cardTitle: "Align Goals and Improve Performance",
    cardDescription:
      "Connect company objectives with team and individual OKRs. Use AI-assisted goal creation and performance tracking to improve alignment and visibility.",
    cardTags: "Goal Alignment, OKRs, Performance Management",
    featured: true,
    metadata: {
      title: "Align Goals & Improve Performance",
      description:
        "Connect organizational objectives with team priorities and individual contributions. Claripa helps you create aligned goals, track performance and identify gaps before they impact business outcomes.",
    },
    hero: {
      breadcrumb: "HOME / SOLUTIONS / ALIGN GOALS AND IMPROVE PERFORMANCE",
      title: "Align every goal with the\nbigger picture.",
      description:
        "Connect organizational objectives with team priorities and individual contributions. Claripa helps you create aligned goals, track performance and identify gaps before they impact business outcomes.",
      talkText: "BOOK A DEMO",
      talkHref: "/contact-us",
      overviewText: "WATCH OVERVIEW",
      overviewHref: "#the-solution",
      dashboard: {
        floatingBadgeTitle: "24 Goals Need Attention",
        floatingBadgeSubtitle: "across aligned teams",
        eyebrow: "GOAL ALIGNMENT · ORGANIZATION-WIDE",
        attentionBadge: "24 NEED ATTENTION",
        heading: "24 Goals Need Attention",
        rows: [
          {
            initials: "01",
            title: "Organizational Goal Alignment",
            subtitle: "Company objectives vs. department targets",
            severity: "High",
            progress: 85,
            highlighted: true,
          },
          {
            initials: "DP",
            title: "Department Progress",
            subtitle: "Team OKRs trailing quarterly milestones",
            severity: "Medium",
            progress: 58,
          },
          {
            initials: "OK",
            title: "Individual OKR Tracking",
            subtitle: "Goals awaiting mid-cycle alignment check",
            severity: "Medium",
            progress: 50,
          },
        ],
        suggestedNextStep:
          "Review goals that are falling behind and realign team priorities.",
      },
    },
    challenge: {
      eyebrow: "THE CHALLENGE",
      title: "What gets in the way today?",
      quote:
        "“We set goals at the beginning of the year, but connecting everyday work to those goals is still a challenge.”",
      items: [
        {
          number: "01",
          tag: "CHALLENGE",
          title: "Goals lack alignment",
          description:
            "Individual priorities don't always connect with organizational objectives.",
        },
        {
          number: "02",
          tag: "CHALLENGE",
          title: "Progress is difficult to track",
          description:
            "Leaders lack visibility into how teams are progressing against goals.",
        },
        {
          number: "03",
          tag: "CHALLENGE",
          title: "Performance gaps surface late",
          description:
            "Misaligned goals often become visible only during performance reviews.",
        },
      ],
    },
    solution: {
      eyebrow: "THE SOLUTION",
      title: "How Claripa keeps every goal on track.",
      steps: [
        {
          id: "01",
          tag: "01 · DETECT · GOAL INTELLIGENCE",
          title: "Identify where alignment\nbreaks.",
          description:
            "Claripa connects organizational objectives, team OKRs and individual goals to identify gaps in alignment and performance.",
          bullets: [
            "Connects company, team and individual objectives.",
            "Highlights goals that need attention.",
          ],
        },
        {
          id: "02",
          tag: "02 · PREDICT · PERFORMANCE INTELLIGENCE",
          title: "Understand what could fall\nbehind.",
          description:
            "Claripa helps decision-makers identify performance patterns and potential goal delays before they affect business outcomes.",
          bullets: [
            "Identifies emerging performance gaps.",
            "Highlights objectives at risk of missing targets.",
          ],
        },
        {
          id: "03",
          tag: "03 · ACT · MANAGER INTELLIGENCE",
          title: "Turn goals into\nmeaningful action.",
          description:
            "Claripa brings relevant insights to managers and leaders so they can realign priorities and support better execution.",
          bullets: [
            "Supports AI-assisted goal creation.",
            "Enables timely follow-ups and performance conversations.",
          ],
        },
        {
          id: "04",
          tag: "04 · INTEGRATE · CONNECTED INTELLIGENCE",
          title: "Works with your existing\nHR ecosystem.",
          description:
            "Claripa connects existing HR systems to unify goal and performance insights.",
          bullets: [
            "Connects with existing HR and performance systems.",
            "Keeps organizational goals and performance insights connected.",
          ],
        },
      ],
    },
    poweredBy: {
      eyebrow: "POWERED BY",
      title: "The layers behind this solution",
      layers: [
        { label: "Core HR", isPrimary: true },
        { label: "Performance Management", isPrimary: false },
        { label: "Analytics", isPrimary: false },
        { label: "Engagement", isPrimary: false },
      ],
    },
    results: {
      heading: "What better goal alignment makes possible.",
      bullets: [
        "Improved visibility into organizational objectives.",
        "Stronger team and individual accountability.",
        "More informed performance decisions.",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions About Claripa?",
      lead: "Learn more about how Claripa connects company objectives, team OKRs, and performance tracking across your organization.",
      items: [
        {
          question: "How does Claripa help organizations align goals?",
          answer:
            "Claripa connects organizational objectives with team OKRs and individual goals in one shared view, helping leaders and teams see how everyday work supports company priorities.",
        },
        {
          question: "Can Claripa support AI-assisted OKR creation?",
          answer:
            "Yes. Claripa supports AI-assisted goal creation so managers and employees can craft clear, measurable objectives aligned with broader team and company targets.",
        },
        {
          question: "Can managers track individual and team performance?",
          answer:
            "Yes. Managers get clear visibility into team and individual goal progress, making it easier to run timely follow-ups and meaningful performance conversations.",
        },
        {
          question: "How does Claripa identify goals that need attention?",
          answer:
            "Claripa monitors alignment and performance patterns across objectives, surfacing stalled progress and goals at risk of missing targets before review cycles arrive.",
        },
      ],
    },
    finalCta: {
      eyebrow: "SEE CLARIPA IN ACTION",
      title: "Make Every Goal Count.",
      subtitle:
        "Discover how Claripa connects organizational objectives, team OKRs, and performance insights so every priority stays on track.",
      buttonText: "BOOK A DEMO",
      buttonHref: "/contact-us",
    },
  },
  {
    id: "solution-02",
    slug: "track-tasks-and-execution",
    cardTitle: "Track Tasks and Execution",
    cardDescription:
      "Connect tasks to OKRs, monitor day-to-day progress, and use AI nudges to support timely follow-ups and accountability.",
    cardTags: "Task Management, Progress Tracking, AI Nudges",
    metadata: {
      title: "Track Tasks & Execution",
      description:
        "Give teams a clearer view of execution by connecting daily tasks with organizational objectives. Claripa helps identify delays, monitor progress and support timely follow-ups.",
    },
    hero: {
      breadcrumb: "HOME / SOLUTIONS / TRACK TASKS AND EXECUTION",
      title: "Connect everyday tasks to\nmeaningful outcomes.",
      description:
        "Give teams a clearer view of execution by connecting daily tasks with organizational objectives. Claripa helps identify delays, monitor progress and support timely follow-ups.",
      talkText: "BOOK A DEMO",
      talkHref: "/contact-us",
      overviewText: "WATCH OVERVIEW",
      overviewHref: "#the-solution",
      dashboard: {
        floatingBadgeTitle: "12 Tasks Need Attention",
        floatingBadgeSubtitle: "linked to team OKRs",
        eyebrow: "EXECUTION WATCH · TEAM OVERVIEW",
        attentionBadge: "12 NEED ATTENTION",
        heading: "12 Tasks Need Attention",
        rows: [
          {
            initials: "01",
            title: "Tasks Linked to OKRs",
            subtitle: "Critical deliverables tied to quarterly objectives",
            severity: "High",
            progress: 84,
            highlighted: true,
          },
          {
            initials: "TE",
            title: "Team Execution Progress",
            subtitle: "Cross-team milestones moving slower than plan",
            severity: "Medium",
            progress: 60,
          },
          {
            initials: "DT",
            title: "Delayed Tasks",
            subtitle: "Overdue items awaiting manager follow-up",
            severity: "Medium",
            progress: 52,
          },
        ],
        suggestedNextStep:
          "Follow up on delayed tasks affecting critical team objectives.",
      },
    },
    challenge: {
      eyebrow: "THE CHALLENGE",
      title: "What gets in the way today?",
      quote:
        "“We know what needs to get done, but tracking progress across everyone takes too much effort.”",
      items: [
        {
          number: "01",
          tag: "CHALLENGE",
          title: "Tasks lack context",
          description:
            "Daily activities aren't always connected to larger business goals.",
        },
        {
          number: "02",
          tag: "CHALLENGE",
          title: "Progress is fragmented",
          description:
            "Managers struggle to understand execution across teams.",
        },
        {
          number: "03",
          tag: "CHALLENGE",
          title: "Follow-ups happen late",
          description:
            "Delays and blockers often go unnoticed until deadlines approach.",
        },
      ],
    },
    solution: {
      eyebrow: "THE SOLUTION",
      title: "How Claripa keeps execution moving.",
      steps: [
        {
          id: "01",
          tag: "01 · DETECT · TASK INTELLIGENCE",
          title: "Identify where execution\nslows down.",
          description:
            "Claripa connects tasks with relevant objectives to highlight progress gaps and areas requiring attention.",
          bullets: [
            "Links tasks with organizational and team OKRs.",
            "Identifies delayed tasks and execution gaps.",
          ],
        },
        {
          id: "02",
          tag: "02 · PREDICT · PROGRESS INTELLIGENCE",
          title: "Understand what could miss\nits deadline.",
          description:
            "Claripa helps identify emerging execution patterns and potential delays before they affect delivery.",
          bullets: [
            "Highlights tasks at risk of delay.",
            "Identifies objectives affected by execution gaps.",
          ],
        },
        {
          id: "03",
          tag: "03 · ACT · MANAGER INTELLIGENCE",
          title: "Put the right follow-up\ninto motion.",
          description:
            "Claripa supports managers with timely AI nudges and progress insights to improve accountability.",
          bullets: [
            "Delivers contextual follow-up nudges.",
            "Helps managers prioritize actions and unblock progress.",
          ],
        },
        {
          id: "04",
          tag: "04 · INTEGRATE · CONNECTED INTELLIGENCE",
          title: "Connects execution with\nyour existing ecosystem.",
          description:
            "Claripa brings task progress and goal outcomes together alongside your existing HR and performance systems.",
          bullets: [
            "Unifies task tracking with team objectives.",
            "Eliminates manual status chasing across teams.",
          ],
        },
      ],
    },
    poweredBy: {
      eyebrow: "POWERED BY",
      title: "The layers behind this solution",
      layers: [
        { label: "Core HR", isPrimary: true },
        { label: "Performance Management", isPrimary: false },
        { label: "Analytics", isPrimary: false },
        { label: "Task Management", isPrimary: false },
      ],
    },
    results: {
      heading: "What better execution makes possible.",
      bullets: [
        "Improved task visibility.",
        "Stronger accountability across teams.",
        "Better alignment between execution and objectives.",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions About Claripa?",
      lead: "Learn more about how Claripa links daily tasks to OKRs and helps teams stay accountable on execution.",
      items: [
        {
          question: "Can Claripa connect tasks with OKRs?",
          answer:
            "Yes. Claripa links daily tasks directly with organizational and team OKRs so everyone sees how everyday execution contributes to broader goals.",
        },
        {
          question: "How does Claripa track task progress?",
          answer:
            "Claripa tracks execution across teams in a unified view, highlighting completed milestones, stalled activities, and delayed tasks.",
        },
        {
          question: "Can managers receive AI-powered task nudges?",
          answer:
            "Yes. Claripa sends timely, contextual AI follow-up nudges that help managers prioritize actions and unblock team progress early.",
        },
        {
          question: "How does Claripa identify execution gaps?",
          answer:
            "By analyzing progress patterns across tasks and linked OKRs, Claripa flags tasks at risk of delay and shows which team objectives may be affected.",
        },
      ],
    },
    finalCta: {
      eyebrow: "SEE CLARIPA IN ACTION",
      title: "Bring Every Task Closer to Its Goal.",
      subtitle:
        "Discover how Claripa connects daily execution, OKR progress, and contextual nudges to keep teams aligned and accountable.",
      buttonText: "BOOK A DEMO",
      buttonHref: "/contact-us",
    },
  },
  {
    id: "solution-03",
    slug: "support-employee-development",
    cardTitle: "Support Employee Development",
    cardDescription:
      "Identify skill gaps and behavioural competency development needs to help organizations plan appropriate employee development interventions.",
    cardTags: "Skill Gap Analysis, Competencies, Development",
    metadata: {
      title: "Support Employee Development",
      description:
        "Understand employee capabilities, identify skill gaps and uncover development opportunities. Claripa helps organizations create focused development plans that support individual growth and future workforce needs.",
    },
    hero: {
      breadcrumb: "HOME / SOLUTIONS / SUPPORT EMPLOYEE DEVELOPMENT",
      title: "Build the skills your\nworkforce needs to grow.",
      description:
        "Understand employee capabilities, identify skill gaps and uncover development opportunities. Claripa helps organizations create focused development plans that support individual growth and future workforce needs.",
      talkText: "BOOK A DEMO",
      talkHref: "/contact-us",
      overviewText: "WATCH OVERVIEW",
      overviewHref: "#the-solution",
      dashboard: {
        floatingBadgeTitle: "18 Skill Gaps Identified",
        floatingBadgeSubtitle: "across key competencies",
        eyebrow: "TALENT DEVELOPMENT · SKILL INTELLIGENCE",
        attentionBadge: "18 IDENTIFIED",
        heading: "18 Skill Gaps Identified",
        rows: [
          {
            initials: "01",
            title: "Competency Overview",
            subtitle: "Skill and behavioural benchmarks across teams",
            severity: "High",
            progress: 82,
            highlighted: true,
          },
          {
            initials: "ED",
            title: "Employee Development Needs",
            subtitle: "Individual capability priorities for targeted coaching",
            severity: "Medium",
            progress: 62,
          },
          {
            initials: "RR",
            title: "Role Readiness",
            subtitle: "Preparedness for evolving role expectations",
            severity: "Medium",
            progress: 54,
          },
        ],
        suggestedNextStep:
          "Prioritize development plans for employees with critical capability gaps.",
      },
    },
    challenge: {
      eyebrow: "THE CHALLENGE",
      title: "What gets in the way today?",
      quote:
        "“We want our people to grow, but identifying exactly what they need to develop isn't always easy.”",
      items: [
        {
          number: "01",
          tag: "CHALLENGE",
          title: "Skills remain unclear",
          description:
            "Organizations lack visibility into employee capabilities.",
        },
        {
          number: "02",
          tag: "CHALLENGE",
          title: "Development lacks direction",
          description:
            "Generic training often misses individual development needs.",
        },
        {
          number: "03",
          tag: "CHALLENGE",
          title: "Future readiness is uncertain",
          description:
            "Skill gaps make it difficult to prepare employees for evolving roles.",
        },
      ],
    },
    solution: {
      eyebrow: "THE SOLUTION",
      title: "How Claripa turns potential into progress.",
      steps: [
        {
          id: "01",
          tag: "01 · DETECT · TALENT INTELLIGENCE",
          title: "Understand the capabilities\nwithin your workforce.",
          description:
            "Claripa brings together performance and competency signals to identify employee skill gaps and development needs.",
          bullets: [
            "Identifies skill and behavioural competency gaps.",
            "Highlights individual development priorities.",
          ],
        },
        {
          id: "02",
          tag: "02 · PREDICT · GROWTH INTELLIGENCE",
          title: "Understand where\ndevelopment is needed next.",
          description:
            "Claripa helps organizations identify emerging capability gaps and areas that may affect future role readiness.",
          bullets: [
            "Highlights potential development needs.",
            "Supports visibility into workforce capability gaps.",
          ],
        },
        {
          id: "03",
          tag: "03 · ACT · DEVELOPMENT INTELLIGENCE",
          title: "Turn capability gaps into\ndevelopment plans.",
          description:
            "Claripa helps HR teams and managers identify appropriate development interventions based on employee needs.",
          bullets: [
            "Supports focused development planning.",
            "Helps monitor development and improvement progress.",
          ],
        },
        {
          id: "04",
          tag: "04 · INTEGRATE · CONNECTED INTELLIGENCE",
          title: "Aligned with performance\nand role expectations.",
          description:
            "Claripa connects skill insights directly with your existing HR and performance systems.",
          bullets: [
            "Unifies competency signals with performance context.",
            "Keeps growth tracking continuous across cycles.",
          ],
        },
      ],
    },
    poweredBy: {
      eyebrow: "POWERED BY",
      title: "The layers behind this solution",
      layers: [
        { label: "Core HR", isPrimary: true },
        { label: "Talent & Development", isPrimary: false },
        { label: "Performance Management", isPrimary: false },
        { label: "Analytics", isPrimary: false },
      ],
    },
    results: {
      heading: "What focused development makes possible.",
      bullets: [
        "Better visibility into employee capabilities.",
        "More relevant development planning.",
        "Improved understanding of workforce readiness.",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions About Claripa?",
      lead: "Learn more about how Claripa surfaces skill gaps and helps build focused employee development plans.",
      items: [
        {
          question: "How does Claripa identify employee skill gaps?",
          answer:
            "Claripa combines performance and competency signals to surface individual and team skill gaps, giving HR and managers clear visibility into workforce capabilities.",
        },
        {
          question: "Can Claripa identify behavioural competency needs?",
          answer:
            "Yes. Claripa identifies both technical skill gaps and behavioural competency needs so development plans reflect the full needs of each role.",
        },
        {
          question: "Can managers use Claripa for development planning?",
          answer:
            "Yes. Managers and HR teams can review individual development priorities and plan targeted development interventions aligned with role readiness.",
        },
        {
          question: "How does Claripa support employee growth?",
          answer:
            "Claripa guides focused development plans based on real employee needs and helps monitor development and improvement progress over time.",
        },
      ],
    },
    finalCta: {
      eyebrow: "SEE CLARIPA IN ACTION",
      title: "Build Capabilities. Unlock Potential.",
      subtitle:
        "Discover how Claripa uncovers skill gaps and turns development insights into focused employee growth.",
      buttonText: "BOOK A DEMO",
      buttonHref: "/contact-us",
    },
  },
  {
    id: "solution-04",
    slug: "empower-managers",
    cardTitle: "Empower Managers",
    cardDescription:
      "Support managers with performance summaries, regular check-ins, and AI-assisted coaching to make conversations with team members more meaningful.",
    cardTags: "Manager Effectiveness, Check-ins, AI Coach",
    metadata: {
      title: "Empower Managers",
      description:
        "Help managers understand team performance, identify concerns and have more meaningful employee conversations. Claripa brings performance summaries, check-in insights and AI-assisted coaching into everyday management.",
    },
    hero: {
      breadcrumb: "HOME / SOLUTIONS / EMPOWER MANAGERS",
      title: "Give managers the clarity\nto lead better.",
      description:
        "Help managers understand team performance, identify concerns and have more meaningful employee conversations. Claripa brings performance summaries, check-in insights and AI-assisted coaching into everyday management.",
      talkText: "BOOK A DEMO",
      talkHref: "/contact-us",
      overviewText: "WATCH OVERVIEW",
      overviewHref: "#the-solution",
      dashboard: {
        floatingBadgeTitle: "6 Team Members Need Attention",
        floatingBadgeSubtitle: "early coaching signals",
        eyebrow: "MANAGER INTELLIGENCE · TEAM OVERVIEW",
        attentionBadge: "6 NEED ATTENTION",
        heading: "6 Team Members Need Attention",
        rows: [
          {
            initials: "01",
            title: "Team Health Overview",
            subtitle: "Recent shifts in team performance and engagement",
            severity: "High",
            progress: 86,
            highlighted: true,
          },
          {
            initials: "UC",
            title: "Upcoming Check-ins",
            subtitle: "1:1 conversations backed by performance summaries",
            severity: "Medium",
            progress: 60,
          },
          {
            initials: "PS",
            title: "Performance Signals",
            subtitle: "Employees showing changes in feedback or momentum",
            severity: "Medium",
            progress: 52,
          },
        ],
        suggestedNextStep:
          "Schedule a check-in with employees showing changes in engagement or performance.",
      },
    },
    challenge: {
      eyebrow: "THE CHALLENGE",
      title: "What gets in the way today?",
      quote:
        "“Our managers are stretched. They can't always tell what's happening in their teams.”",
      items: [
        {
          number: "01",
          tag: "CHALLENGE",
          title: "Team signals go unnoticed",
          description:
            "Managers struggle to identify changes in team performance and engagement.",
        },
        {
          number: "02",
          tag: "CHALLENGE",
          title: "Conversations lack context",
          description:
            "Important discussions happen without complete employee insights.",
        },
        {
          number: "03",
          tag: "CHALLENGE",
          title: "Administration takes over",
          description:
            "Routine responsibilities leave less time for meaningful leadership.",
        },
      ],
    },
    solution: {
      eyebrow: "THE SOLUTION",
      title: "How Claripa makes managers more effective.",
      steps: [
        {
          id: "01",
          tag: "01 · DETECT · TEAM INTELLIGENCE",
          title: "See what is happening\nacross your team.",
          description:
            "Claripa connects employee performance, engagement and feedback signals to help managers identify areas that need attention.",
          bullets: [
            "Highlights changes in team performance.",
            "Surfaces employees who may need support.",
          ],
        },
        {
          id: "02",
          tag: "02 · PREDICT · PEOPLE INTELLIGENCE",
          title: "Understand what your team\nmay need next.",
          description:
            "Claripa identifies emerging workforce patterns to help managers anticipate performance concerns and development needs.",
          bullets: [
            "Identifies emerging team concerns.",
            "Highlights potential employee support needs.",
          ],
        },
        {
          id: "03",
          tag: "03 · ACT · MANAGER INTELLIGENCE",
          title: "Give managers the right\nguidance at the right time.",
          description:
            "Claripa provides performance summaries, check-in insights and AI-assisted coaching to support more meaningful conversations.",
          bullets: [
            "Supports regular employee check-ins.",
            "Provides AI-assisted coaching and follow-up guidance.",
          ],
        },
        {
          id: "04",
          tag: "04 · INTEGRATE · CONNECTED INTELLIGENCE",
          title: "Built into everyday\nleadership rhythms.",
          description:
            "Claripa connects performance records, feedback, and check-in workflows so managers spend less time on admin and more time coaching.",
          bullets: [
            "Reduces manual prep ahead of 1:1 check-ins.",
            "Keeps team context unified in one place.",
          ],
        },
      ],
    },
    poweredBy: {
      eyebrow: "POWERED BY",
      title: "The layers behind this solution",
      layers: [
        { label: "Core HR", isPrimary: true },
        { label: "Engagement", isPrimary: false },
        { label: "Performance Management", isPrimary: false },
        { label: "Analytics", isPrimary: false },
      ],
    },
    results: {
      heading: "What better management makes possible.",
      bullets: [
        "More meaningful employee conversations.",
        "Improved visibility into team health.",
        "Less administrative effort for managers.",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions About Claripa?",
      lead: "Learn more about how Claripa gives managers team health visibility, check-in insights, and AI-assisted coaching.",
      items: [
        {
          question: "How does Claripa help managers understand team performance?",
          answer:
            "Claripa connects employee performance, engagement, and feedback signals in one team overview so managers quickly spot changes and areas needing support.",
        },
        {
          question: "Can Claripa support regular employee check-ins?",
          answer:
            "Yes. Claripa surfaces performance summaries and check-in insights ahead of 1:1 discussions so managers and employees have more meaningful conversations.",
        },
        {
          question: "Does Claripa provide AI-assisted coaching?",
          answer:
            "Yes. Claripa delivers AI-assisted coaching prompts and contextual follow-up guidance to help managers respond effectively to team needs.",
        },
        {
          question: "How does Claripa identify employees who need attention?",
          answer:
            "Claripa tracks emerging shifts in performance, engagement, and feedback signals, surfacing team members who may benefit from early support or a check-in.",
        },
      ],
    },
    finalCta: {
      eyebrow: "SEE CLARIPA IN ACTION",
      title: "Make Every Manager More Effective.",
      subtitle:
        "Discover how Claripa brings performance summaries, check-in insights, and AI-assisted coaching into everyday management.",
      buttonText: "BOOK A DEMO",
      buttonHref: "/contact-us",
    },
  },
  {
    id: "solution-05",
    slug: "gain-workforce-performance-insights",
    cardTitle: "Gain Workforce Performance Insights",
    cardDescription:
      "Use performance dashboards to understand progress, identify areas requiring attention, and support informed decisions across teams and the organization.",
    cardTags: "Performance Dashboards, Workforce Insights, Analytics",
    metadata: {
      title: "Gain Workforce Performance Insights",
      description:
        "Turn disconnected workforce information into meaningful insights. Claripa helps leaders understand performance trends, identify emerging concerns and make more informed organizational decisions.",
    },
    hero: {
      breadcrumb: "HOME / SOLUTIONS / GAIN WORKFORCE PERFORMANCE INSIGHTS",
      title: "See the patterns behind\nworkforce performance.",
      description:
        "Turn disconnected workforce information into meaningful insights. Claripa helps leaders understand performance trends, identify emerging concerns and make more informed organizational decisions.",
      talkText: "BOOK A DEMO",
      talkHref: "/contact-us",
      overviewText: "WATCH OVERVIEW",
      overviewHref: "#the-solution",
      dashboard: {
        floatingBadgeTitle: "8 Workforce Signals Identified",
        floatingBadgeSubtitle: "across departments",
        eyebrow: "WORKFORCE INTELLIGENCE · ORGANIZATION OVERVIEW",
        attentionBadge: "8 IDENTIFIED",
        heading: "8 Workforce Signals Identified",
        rows: [
          {
            initials: "01",
            title: "Organization Performance",
            subtitle: "Company-wide goal and performance trajectory",
            severity: "High",
            progress: 88,
            highlighted: true,
          },
          {
            initials: "DC",
            title: "Department Comparison",
            subtitle: "Performance shifts across business units",
            severity: "Medium",
            progress: 64,
          },
          {
            initials: "WT",
            title: "Emerging Workforce Trends",
            subtitle: "Early signals requiring leadership attention",
            severity: "Medium",
            progress: 55,
          },
        ],
        suggestedNextStep:
          "Review departments showing significant performance changes.",
      },
    },
    challenge: {
      eyebrow: "THE CHALLENGE",
      title: "What gets in the way today?",
      quote:
        "“We have plenty of workforce data, but getting the bigger picture is still difficult.”",
      items: [
        {
          number: "01",
          tag: "CHALLENGE",
          title: "Data stays disconnected",
          description:
            "Workforce information exists across multiple HR systems.",
        },
        {
          number: "02",
          tag: "CHALLENGE",
          title: "Patterns are difficult to see",
          description:
            "Leaders struggle to connect individual signals with organizational trends.",
        },
        {
          number: "03",
          tag: "CHALLENGE",
          title: "Decisions lack context",
          description:
            "Traditional reporting often explains what happened, not what needs attention next.",
        },
      ],
    },
    solution: {
      eyebrow: "THE SOLUTION",
      title: "How Claripa turns data into intelligence.",
      steps: [
        {
          id: "01",
          tag: "01 · DETECT · WORKFORCE INTELLIGENCE",
          title: "Bring meaningful workforce\npatterns into view.",
          description:
            "Claripa reads existing HR signals to identify performance trends and areas that need attention.",
          bullets: [
            "Connects relevant workforce information.",
            "Identifies meaningful performance patterns.",
          ],
        },
        {
          id: "02",
          tag: "02 · PREDICT · PERFORMANCE INTELLIGENCE",
          title: "Understand what the\nsignals could mean.",
          description:
            "Claripa helps decision-makers identify emerging trends and potential workforce concerns before they affect organizational outcomes.",
          bullets: [
            "Highlights emerging performance concerns.",
            "Surfaces potential workforce risks.",
          ],
        },
        {
          id: "03",
          tag: "03 · ACT · DECISION INTELLIGENCE",
          title: "Put insights into the hands\nof decision-makers.",
          description:
            "Claripa translates workforce information into actionable intelligence for leaders, HR teams and managers.",
          bullets: [
            "Provides relevant performance insights.",
            "Supports more informed workforce decisions.",
          ],
        },
        {
          id: "04",
          tag: "04 · INTEGRATE · CONNECTED INTELLIGENCE",
          title: "Unifies signals across\nyour HR stack.",
          description:
            "Claripa sits above your existing Core HR, performance, engagement, and payroll tools without replacing them.",
          bullets: [
            "Connects multi-system workforce data seamlessly.",
            "Delivers one coherent view for leadership.",
          ],
        },
      ],
    },
    poweredBy: {
      eyebrow: "POWERED BY",
      title: "The layers behind this solution",
      layers: [
        { label: "Core HR", isPrimary: true },
        { label: "Performance Management", isPrimary: false },
        { label: "Engagement", isPrimary: false },
        { label: "Payroll", isPrimary: false },
        { label: "Analytics", isPrimary: false },
      ],
    },
    results: {
      heading: "What connected workforce intelligence makes possible.",
      bullets: [
        "Better organization-wide performance visibility.",
        "More informed workforce decisions.",
        "Earlier awareness of emerging trends.",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions About Claripa?",
      lead: "Learn more about how Claripa connects HR data across systems to surface organization-wide performance trends.",
      items: [
        {
          question: "How does Claripa bring workforce data together?",
          answer:
            "Claripa reads signals from your existing HR, performance, engagement, and payroll systems to bring disconnected workforce information into one unified intelligence view.",
        },
        {
          question: "Can Claripa identify performance trends?",
          answer:
            "Yes. Claripa surfaces organization-wide performance patterns, department comparisons, and emerging workforce shifts so leaders spot changes early.",
        },
        {
          question: "What workforce insights can leaders access?",
          answer:
            "Leaders can access organization performance overviews, department comparisons, emerging workforce trends, and highlighted areas requiring attention.",
        },
        {
          question: "How does Claripa support informed decisions?",
          answer:
            "Claripa goes beyond backward-looking reports by translating workforce signals into clear context and recommended next steps for leaders and HR teams.",
        },
      ],
    },
    finalCta: {
      eyebrow: "SEE CLARIPA IN ACTION",
      title: "See Beyond Workforce Data.",
      subtitle:
        "Discover how Claripa turns disconnected HR signals into organization-wide performance intelligence.",
      buttonText: "BOOK A DEMO",
      buttonHref: "/contact-us",
    },
  },
  {
    id: "solution-06",
    slug: "improve-performance-by-development-interventions",
    cardTitle: "Improve Performance by Development Interventions",
    cardDescription:
      "Use performance and skill gap insights to identify development needs and guide appropriate interventions to support employee improvement.",
    cardTags: "Performance Improvement, Skill Gaps, Interventions",
    metadata: {
      title: "Improve Performance Through Development",
      description:
        "Understand what's affecting employee performance and identify the development support needed to improve it. Claripa connects performance signals with skill and competency insights to guide more focused interventions.",
    },
    hero: {
      breadcrumb:
        "HOME / SOLUTIONS / IMPROVE PERFORMANCE BY DEVELOPMENT INTERVENTIONS",
      title: "Turn performance gaps into\nopportunities for growth.",
      description:
        "Understand what's affecting employee performance and identify the development support needed to improve it. Claripa connects performance signals with skill and competency insights to guide more focused interventions.",
      talkText: "BOOK A DEMO",
      talkHref: "/contact-us",
      overviewText: "WATCH OVERVIEW",
      overviewHref: "#the-solution",
      dashboard: {
        floatingBadgeTitle: "14 Performance Gaps Identified",
        floatingBadgeSubtitle: "linked to skill insights",
        eyebrow: "PERFORMANCE IMPROVEMENT · DEVELOPMENT OVERVIEW",
        attentionBadge: "14 IDENTIFIED",
        heading: "14 Performance Gaps Identified",
        rows: [
          {
            initials: "01",
            title: "Employee Improvement Overview",
            subtitle: "Targeted support plans linked to performance signals",
            severity: "High",
            progress: 84,
            highlighted: true,
          },
          {
            initials: "SG",
            title: "Skill Gap Analysis",
            subtitle: "Root-cause capability needs affecting output",
            severity: "Medium",
            progress: 59,
          },
          {
            initials: "DP",
            title: "Development Progress",
            subtitle: "Tracking effectiveness of targeted interventions",
            severity: "Medium",
            progress: 52,
          },
        ],
        suggestedNextStep:
          "Review development needs and plan targeted improvement interventions.",
      },
    },
    challenge: {
      eyebrow: "THE CHALLENGE",
      title: "What gets in the way today?",
      quote:
        "“We know where performance needs improvement, but finding the right way to support each employee is difficult.”",
      items: [
        {
          number: "01",
          tag: "CHALLENGE",
          title: "Performance gaps go unexplained",
          description:
            "Identifying low performance doesn't always reveal its underlying cause.",
        },
        {
          number: "02",
          tag: "CHALLENGE",
          title: "Interventions lack direction",
          description:
            "Generic improvement plans may not address individual development needs.",
        },
        {
          number: "03",
          tag: "CHALLENGE",
          title: "Progress is difficult to measure",
          description:
            "Organizations struggle to understand whether development efforts are working.",
        },
      ],
    },
    solution: {
      eyebrow: "THE SOLUTION",
      title: "How Claripa turns performance gaps into progress.",
      steps: [
        {
          id: "01",
          tag: "01 · DETECT · PERFORMANCE INTELLIGENCE",
          title: "Identify where performance\nneeds attention.",
          description:
            "Claripa connects performance signals and competency information to highlight areas requiring improvement.",
          bullets: [
            "Identifies individual performance gaps.",
            "Highlights relevant skill and competency needs.",
          ],
        },
        {
          id: "02",
          tag: "02 · PREDICT · DEVELOPMENT INTELLIGENCE",
          title: "Understand what could affect\nfuture performance.",
          description:
            "Claripa helps organizations recognize emerging capability gaps and areas where additional development may be needed.",
          bullets: [
            "Identifies potential capability concerns.",
            "Highlights development priorities.",
          ],
        },
        {
          id: "03",
          tag: "03 · ACT · TALENT & DEVELOPMENT",
          title: "Guide the right\ndevelopment intervention.",
          description:
            "Claripa helps HR teams and managers use performance and skill insights to plan relevant employee development interventions.",
          bullets: [
            "Supports targeted development planning.",
            "Helps monitor improvement progress.",
          ],
        },
        {
          id: "04",
          tag: "04 · INTEGRATE · CONNECTED INTELLIGENCE",
          title: "Closes the loop between\nperformance and learning.",
          description:
            "Claripa keeps performance evaluations and skill development connected across your existing HR systems.",
          bullets: [
            "Connects performance signals with development tracking.",
            "Gives HR and managers shared visibility into improvement.",
          ],
        },
      ],
    },
    poweredBy: {
      eyebrow: "POWERED BY",
      title: "The layers behind this solution",
      layers: [
        { label: "Core HR", isPrimary: true },
        { label: "Performance Management", isPrimary: false },
        { label: "Talent & Development", isPrimary: false },
        { label: "Analytics", isPrimary: false },
      ],
    },
    results: {
      heading: "What focused interventions make possible.",
      bullets: [
        "Clearer understanding of performance gaps.",
        "More targeted development interventions.",
        "Better visibility into employee improvement.",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions About Claripa?",
      lead: "Learn more about how Claripa links performance signals with skill gaps to guide targeted employee development interventions.",
      items: [
        {
          question: "How does Claripa identify performance gaps?",
          answer:
            "Claripa brings together performance signals and competency information to highlight where employee output or progress needs attention.",
        },
        {
          question: "Can Claripa connect performance with skill gaps?",
          answer:
            "Yes. Claripa connects performance patterns with skill and competency insights so leaders understand the underlying capability needs behind performance gaps.",
        },
        {
          question: "How does Claripa support development interventions?",
          answer:
            "Claripa helps HR teams and managers plan targeted, employee-specific development interventions rather than relying on generic improvement plans.",
        },
        {
          question: "Can managers monitor employee improvement?",
          answer:
            "Yes. Managers and HR teams gain ongoing visibility into development milestones and employee improvement progress over time.",
        },
      ],
    },
    finalCta: {
      eyebrow: "SEE CLARIPA IN ACTION",
      title: "Turn Performance Insights Into Progress.",
      subtitle:
        "Discover how Claripa links performance signals with skill insights to guide focused employee development.",
      buttonText: "BOOK A DEMO",
      buttonHref: "/contact-us",
    },
  },
];

export const defaultSolution = allSolutions[0];

export function getSolutionBySlug(slug: string): SolutionDetailData | undefined {
  return allSolutions.find((solution) => solution.slug === slug);
}

