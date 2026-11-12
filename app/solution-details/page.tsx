import SolutionDetailContent from "@/components/solution-details";
import { defaultSolution } from "@/data/solutions";

export const metadata = {
  title: defaultSolution.metadata.title,
  description: defaultSolution.metadata.description,
};

export default function SolutionDetailsPage() {
  return <SolutionDetailContent solution={defaultSolution} />;
}
