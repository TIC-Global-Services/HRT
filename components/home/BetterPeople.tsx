import CaseStudyCarousel from "@/components/shared/CaseStudyCarousel";
import {
  caseStudiesData,
  type CaseStudyItem,
  type CaseStudyStat,
} from "@/data/caseStudies";

export type { CaseStudyItem, CaseStudyStat };
export { caseStudiesData };

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
