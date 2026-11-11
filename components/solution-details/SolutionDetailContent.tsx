import SolutionDetailHero from "./SolutionDetailHero";
import TheChallenge from "./TheChallenge";
import TheSolutionSteps from "./TheSolutionSteps";
import SolutionLayers from "./SolutionLayers";
import SolutionDetailResults from "./SolutionDetailResults";
import SolutionDetailInsights from "./SolutionDetailInsights";
import SolutionDetailFAQ from "./SolutionDetailFAQ";

export default function SolutionDetailContent() {
  return (
    <div className="bg-[#F7F6F3] text-[#002E40] font-sora min-h-screen">
      {/* 1. Hero Section with Dashboard Card */}
      <SolutionDetailHero />

      {/* 2. The Challenge Section with 3 Cards */}
      <TheChallenge />

      {/* 3. The Solution Steps (4 Cards 2x2 grid) */}
      <TheSolutionSteps />

      {/* 4. Powered By / The Layers Behind this Solution */}
      <SolutionLayers />

      {/* 5. Results (350-person Software Services Firm 3x2 Grid) */}
      {/* <SolutionDetailResults /> */}

      {/* 6. Explore Insights (2 Large Cards) */}
      <SolutionDetailInsights />

      {/* 7. FAQ Section (Using Reusable FaqAccordion) */}
      <SolutionDetailFAQ />

    
    </div>
  );
}
