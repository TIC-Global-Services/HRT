import SolutionDetailHero from "./SolutionDetailHero";
import TheChallenge from "./TheChallenge";
import TheSolutionSteps from "./TheSolutionSteps";
import SolutionLayers from "./SolutionLayers";
import SolutionDetailInsights from "./SolutionDetailInsights";
import SolutionDetailFAQ from "./SolutionDetailFAQ";
import { defaultSolution, type SolutionDetailData } from "@/data/solutions";
import Insights from "../home/Insights";

export interface SolutionDetailContentProps {
  solution?: SolutionDetailData;
}

export default function SolutionDetailContent({
  solution = defaultSolution,
}: SolutionDetailContentProps) {
  return (
    <div className="bg-[#F7F6F3] text-[#002E40] font-sora min-h-screen">
      {/* 1. Hero Section with Dashboard Card */}
      <SolutionDetailHero
        breadcrumb={solution.hero.breadcrumb}
        title={solution.hero.title}
        description={solution.hero.description}
        talkText={solution.hero.talkText}
        talkHref={solution.hero.talkHref}
        overviewText={solution.hero.overviewText}
        overviewHref={solution.hero.overviewHref}
        dashboard={solution.hero.dashboard}
      />

      {/* 2. The Challenge Section with 3 Cards */}
      <TheChallenge
        eyebrow={solution.challenge.eyebrow}
        title={solution.challenge.title}
        quote={solution.challenge.quote}
        challenges={solution.challenge.items}
      />

      {/* 3. The Solution Steps (4 Cards 2x2 grid) */}
      <TheSolutionSteps
        eyebrow={solution.solution.eyebrow}
        title={solution.solution.title}
        steps={solution.solution.steps}
      />

      {/* 4. Powered By / The Layers Behind this Solution */}
      <SolutionLayers
        eyebrow={solution.poweredBy.eyebrow}
        title={solution.poweredBy.title}
        layers={solution.poweredBy.layers}
      />

      {/* 5. Results (350-person Software Services Firm 3x2 Grid) */}
      {/* <SolutionDetailResults /> */}

      {/* 6. Explore Insights (2 Large Cards) */}
      <Insights />

      {/* 7. FAQ Section (Using Reusable FaqAccordion) */}
      <SolutionDetailFAQ
        eyebrow={solution.faq.eyebrow}
        title={solution.faq.title}
        lead={solution.faq.lead}
        faqs={solution.faq.items}
      />
    </div>
  );
}
