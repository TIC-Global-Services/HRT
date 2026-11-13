import BlurText from "@/reuseable/BlurText";

export interface SolutionOutcome {
  metricNumber: string;
  metricLabel: string;
  description: string;
  tag: string;
}

export interface SolutionOutcomesProps {
  eyebrow?: string;
  title?: string;
  disclaimer?: string;
  outcomes?: SolutionOutcome[];
}

const defaultOutcomes: SolutionOutcome[] = [
  {
    metricNumber: "100%",
    metricLabel: "Clearer Goal Alignment",
    description:
      "Connect company objectives with team and individual OKRs to improve visibility into organizational priorities.",
    tag: "Goal Alignment",
  },
  {
    metricNumber: "360°",
    metricLabel: "Better Performance Visibility",
    description:
      "Track performance progress, review outcomes, and use AI-assisted summaries to help managers identify areas that need attention.",
    tag: "Performance Management",
  },
  {
    metricNumber: "1:1",
    metricLabel: "More Meaningful Performance Conversations",
    description:
      "Support regular manager–employee check-ins with performance insights and AI-assisted coaching to encourage constructive discussions.",
    tag: "Employee Development",
  },
];

export default function SolutionOutcomes({
  eyebrow = "RESULTS",
  title = "Outcomes our clients see",
  disclaimer = "RESULTS FROM INDIVIDUAL CLIENT ENGAGEMENTS. OUTCOMES VARY BY ORGANISATION.",
  outcomes = defaultOutcomes,
}: SolutionOutcomesProps) {
  return (
    <section
      id="outcomes"
      aria-label="Client outcomes"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-[5%]"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center px-4 max-w-3xl mx-auto mb-10 sm:mb-12">
        <p className="inline-flex items-center gap-2 text-[#F8780D] font-mono text-base font-medium tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F8780D] shadow-[0_0_8px_rgba(255,107,10,0.55)]" />
          {eyebrow}
        </p>
        <BlurText
          as="h2"
          text={title}
          delay={20}
          className="mt-3 text-[#254F5F] font-sora text-3xl sm:text-4xl md:text-[46px] lg:text-[48px] font-normal tracking-tight leading-[1.1]"
        />
      </div>

      {/* Outer White Container */}
      <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-[#E9ECEF] p-4 sm:p-5 lg:p-4 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {outcomes.map((outcome) => (
            <article
              key={outcome.metricLabel}
              className="flex flex-col justify-center rounded-[22px] sm:rounded-[26px] bg-[#FBF9F7] border border-[#ECE9E3] p-7 sm:p-8 lg:p-9  transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs"
            >
              {/* Top: Metric, Title & Description */}
              <div>
                <strong className="block text-[#FF6B0A] font-sora font-light text-6xl sm:text-[68px] lg:text-[74px] tracking-tight leading-none">
                  {outcome.metricNumber}
                </strong>
                <BlurText
                  as="h3"
                  text={outcome.metricLabel}
                  delay={20}
                  className="text-[#142938] font-sora font-semibold text-lg sm:text-[19px] leading-snug mb-3"
                />
                <BlurText
                  as="p"
                  text={outcome.description}
                  delay={20}
                  className="text-[#5A6A72] font-sora text-sm sm:text-[14.5px] leading-[1.3]"
                />
              </div>

              {/* Bottom: Monospace Tag */}
              <div className="mt-2 pt-2">
                <span className="font-mono text-xs sm:text-[13px] text-[#8C9AA0] tracking-wide">
                  {outcome.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="mt-7 sm:mt-8 text-center text-[#62737A] text-[10px] sm:text-[11px] font-medium font-geist-mono tracking-wider uppercase px-4">
        {disclaimer}
      </p>
    </section>
  );
}
