import SolutionsHero from "./SolutionsHero";
import SolutionFinder from "./SolutionFinder";
import SolutionOutcomes from "./SolutionOutcomes";
import BetterPeople from "./BetterPeople";

export default function SolutionHubContent() {
  return (
    <div className="w-full bg-[#F7F6F3] text-[#003247] font-sora">
      <SolutionsHero />
      <SolutionFinder />
      <SolutionOutcomes />
      <BetterPeople/>
    </div>
  );
}
