import Image from "next/image";

export interface ValueCardItem {
  id: string;
  title: string;
  bullets: string[];
}

export interface MissionVisionProps {
  eyebrow?: string;
  title?: string;
  overviewLabel?: string;
  overviewText?: string;
  imageSrc?: string;
  missionKicker?: string;
  missionText?: string;
  visionKicker?: string;
  visionText?: string;
  values?: ValueCardItem[];
}

const defaultValues: ValueCardItem[] = [
  {
    id: "01",
    title: "Our Word, Our Work",
    bullets: [
      "What we say is what we do.",
      "We earn trust by doing what we promise. Every commitment to a client, a candidate or a colleague is one we intend to keep.",
      "We commit only to what we can deliver, and then we deliver it.",
      "We take ownership of outcomes, not just tasks.",
      "If something changes, we say so early and openly. There are no surprises.",
    ],
  },
  {
    id: "02",
    title: "Speed with Substance",
    bullets: [
      "We strive to deliver at phenomenal speed.",
      "Our clients' business doesn't wait, and neither do we. We move fast without cutting corners on quality.",
      "We respond promptly and keep work moving.",
      "We remove unnecessary steps and make decisions quickly.",
      "Fast never means careless: every deliverable still meets our standard.",
    ],
  },
  {
    id: "03",
    title: "We Hear You",
    bullets: [
      "Listening comes before advising.",
      "We take time to understand each client's business, people and culture before we recommend anything. Every voice matters, whether it's a client, a candidate or a team member.",
      "We ask before we assume.",
      "We listen to understand, not just to reply.",
      "Our solutions fit the client's context. We don't use one-size-fits-all templates.",
    ],
  },
  {
    id: "04",
    title: "Feedback Fuels Us",
    bullets: [
      "We accept your feedback.",
      "Feedback is how we get better, so we ask for it, welcome it and act on it.",
      "We seek feedback regularly instead of waiting for it.",
      "We receive it with openness, not defensiveness.",
      "We act on it and tell the person what changed as a result.",
    ],
  },
];

export default function MissionVision({
  eyebrow = "WHAT DRIVES US",
  title = "The Next Evolution of HR is\nintelligence",
  overviewLabel = "Overview",
  overviewText = "Claripa is an AI-powered workforce intelligence platform that transforms people data into meaningful insights, helping organisations understand performance, strengthen alignment, and make informed people decisions.",
  imageSrc = "/about_hero.jpg",
  missionKicker = "OUR MISSION",
  missionText = "To connect workforce data, performance signals, and AI-driven insights into a unified intelligence platform that enables organisations to improve performance, align individual contributions with business goals, and make smarter, evidence-based people decisions.",
  visionKicker = "OUR VISION",
  visionText = "To make performance intelligence the foundation of better people decisions.",
  values = defaultValues,
}: MissionVisionProps) {
  return (
    <section
      id="mission-vision"
      aria-label="What Drives Us"
      className="py-14 sm:py-18 lg:py-24 px-4 sm:px-6 lg:px-[5%]"
    >
      {/* Section Header matching Image 2 */}
      <div className="flex flex-col items-center text-center px-4 max-w-3xl mx-auto mb-12 sm:mb-16">
        <p className="inline-flex items-center gap-2 text-[#E56A1E] font-mono text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase mb-3">
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.7)]"
          />
          {eyebrow}
        </p>
        <h2 className="text-[#002E40] font-sora text-3xl sm:text-4xl md:text-[46px] font-normal tracking-[-0.035em] leading-[1.12] whitespace-pre-line">
          {title}
        </h2>
      </div>

      {/* Asymmetric 2-Column Layout matching Image 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[350px_1fr] gap-8 lg:gap-12 items-start">
        {/* Left Column: Overview Callout */}
        <div className="lg:sticky lg:top-28">
          <span className="text-[#E56A1E] font-mono text-xs sm:text-[13px] font-semibold tracking-wider uppercase mb-2.5 block">
            {overviewLabel}
          </span>
          <p className="text-[#001F1F] font-sora text-sm sm:text-xl leading-[1.3] max-w-xs m-0">
            {overviewText}
          </p>
        </div>

        {/* Right Column: Stacked Visuals (Wide Photography -> Mission/Vision -> 4 Values) */}
        <div className="space-y-6 sm:space-y-7 w-full">
          {/* Top Wide Hands Image */}
          <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-slate-100 shadow-2xs">
            <Image
              src={imageSrc}
              alt="The Next Evolution of HR is intelligence"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 950px"
            />
          </div>

          {/* Mission (Dark Petrol) & Vision (White with orange accent) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission Card */}
            <article className="rounded-[24px] sm:rounded-[28px] bg-[#1E4D5B] p-7 sm:p-10 text-white shadow-xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-xl text-[#96AAB2] tracking-tight uppercase mb-4 block">
                  {missionKicker}
                </span>
                <p className="font-sora text-xs sm:text-xl text-white tracking-tight leading-[1.3] font-normal">
                  {missionText}
                </p>
              </div>
            </article>

            {/* Vision Card */}
            <article className="rounded-[24px] sm:rounded-[28px] bg-white border border-[#E9ECEF] p-7 sm:p-9 relative overflow-hidden shadow-xs flex flex-col justify-center">
              <span className="font-mono text-xl text-[#62737A] tracking-tight uppercase mb-1 block">
                {visionKicker}
              </span>
              <p className="font-sora text-base sm:text-xl text-[#001F1F] font-normal leading-[1.2] tracking-tight m-0">
                {visionText}
              </p>
              {/* Subtle orange radiant gradient matching screenshot */}
              <div
                className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-[radial-gradient(circle,rgba(255,107,10,0.65)_0%,rgba(255,107,10,0.2)_45%,transparent_70%)] pointer-events-none"
                aria-hidden="true"
              />
            </article>
          </div>

          {/* 4 Values Cards Grid (2x2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v) => (
              <article
                key={v.id}
                className="rounded-[24px] sm:rounded-[28px] bg-white border border-[#E9ECEF] p-6 sm:p-8 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md border border-[#E5DFD7] text-[#5A6D75] font-mono text-[13px] font-semibold">
                    {v.id}
                  </span>
                  <h3 className="font-sora text-sm sm:text-xl font-semibold text-[#002E40] m-0">
                    {v.title}
                  </h3>
                </div>
                <ul className="text-xs sm:text-base text-[#5A6D75] font-sora leading-relaxed list-disc list-inside">
                  {v.bullets.map((b, bi) => (
                    <li key={bi} className="leading-relaxed">
                      <span className="-ml-1">{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
