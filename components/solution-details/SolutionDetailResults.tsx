import Image from "next/image";
import BlurText from "@/reuseable/BlurText";

export interface MetricCardData {
  type: "metric";
  value: string;
  title: string;
  subtitle: string;
  industry: string;
}

export interface QuoteCardData {
  type: "quote";
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export type ResultCardItem = MetricCardData | QuoteCardData;

export interface SolutionDetailResultsProps {
  eyebrow?: string;
  title?: string;
}

const column1Cards: ResultCardItem[] = [
  {
    type: "metric",
    value: "34%",
    title: "Lower voluntary attrition",
    subtitle: "in a critical 3–5 year engineering cohort",
    industry: "SOFTWARE SERVICES",
  },
  {
    type: "quote",
    quote:
      "Claripa is the first AI tool our whole company actually uses daily. Not just engineering — sales, ops, finance. Everyone.",
    author: "Tom Becker",
    role: "COO, Fieldwork",
    avatar: "/solution-detail/avatar-1.jpg",
  },
];

const column2Cards: ResultCardItem[] = [
  {
    type: "quote",
    quote:
      "Claripa is the first AI tool our whole company actually uses daily. Not just engineering — sales, ops, finance. Everyone.",
    author: "Tom Becker",
    role: "COO, Fieldwork",
    avatar: "/solution-detail/avatar-2.jpg",
  },
  {
    type: "metric",
    value: "2×",
    title: "More performance conversations",
    subtitle: "with 25–30% better goal alignment across teams",
    industry: "AUTOMOTIVE GCC",
  },
];

const column3Cards: ResultCardItem[] = [
  {
    type: "metric",
    value: "40%",
    title: "Faster time to contribution",
    subtitle: "in a critical 3–5 year engineering cohort",
    industry: "SEMICONDUCTOR DESIGN",
  },
  {
    type: "quote",
    quote:
      "We cut our tool stack from eleven apps to three. Claripa replaced the glue.",
    author: "Tom Becker",
    role: "COO, Fieldwork",
    avatar: "/solution-detail/avatar-1.jpg",
  },
];

function ResultCard({ card }: { card: ResultCardItem }) {
  if (card.type === "metric") {
    return (
      <div className="rounded-[24px] border border-[#ECE9E3] bg-white p-7 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[299px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#F8780C]/40 hover:shadow-[0_8px_24px_rgba(0,46,64,0.04)]">
        <div>
          <span className="block font-mono text-5xl sm:text-[56px] font-medium text-[#F8780C] tracking-tight leading-none mb-4">
            {card.value}
          </span>
          <BlurText
            as="h3"
            text={card.title}
            delay={20}
            className="font-sora text-base sm:text-lg font-semibold text-[#002E40] tracking-tight"
          />
          <BlurText
            as="p"
            text={card.subtitle}
            delay={20}
            className="font-sora text-xs sm:text-[13px] text-[#62737A] mt-1 leading-relaxed"
          />
        </div>

        <span className="block font-mono text-[10px] font-medium text-[#62737A] tracking-wider uppercase mt-6 pt-4 border-t border-[#ECE9E3]/70">
          {card.industry}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-[#ECE9E3] bg-white p-7 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[299px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#F8780C]/40 hover:shadow-[0_8px_24px_rgba(0,46,64,0.04)]">
      <div>
        <span
          aria-hidden="true"
          className="block font-serif text-3xl sm:text-4xl text-[#F8780C] leading-none mb-3 select-none"
        >
          “
        </span>
        <BlurText
          as="p"
          text={card.quote}
          delay={20}
          className="font-sora text-sm sm:text-[14.5px] text-[#002E40] leading-relaxed italic m-0"
        />
      </div>

      <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-[#ECE9E3]/70">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#ECE9E3] shrink-0 border border-[#ECE9E3]">
          <Image
            src={card.avatar}
            alt={card.author}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-sora text-sm font-semibold text-[#002E40] leading-tight m-0">
            {card.author}
          </p>
          <p className="font-sora text-xs text-[#62737A] mt-0.5 leading-tight m-0">
            {card.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SolutionDetailResults({
  eyebrow = "RESULTS",
  title = "What changed for a 350-person software services firm",
}: SolutionDetailResultsProps) {
  return (
    <section className="py-16 md:py-24 bg-[#F7F6F3]">
      <div className="px-[5%]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#F8780C] shadow-[0_0_8px_rgba(248,120,12,0.55)]"
            />
            <span className="font-mono text-xs font-semibold text-[#F8780C] tracking-wider uppercase">
              {eyebrow}
            </span>
          </div>
          <BlurText
            as="h2"
            text={title}
            delay={20}
            className="font-sora text-[#002E40] text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-[-0.04em] leading-[1.12]"
          />
        </div>

        {/* 3 Columns x 2 Rows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {column1Cards.map((card, i) => (
              <ResultCard key={`col1-${i}`} card={card} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {column2Cards.map((card, i) => (
              <ResultCard key={`col2-${i}`} card={card} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-5 sm:gap-6">
            {column3Cards.map((card, i) => (
              <ResultCard key={`col3-${i}`} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
