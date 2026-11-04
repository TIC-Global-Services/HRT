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
  imageSrc = "/about/hands-joined.jpg",
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
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-[1330px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center px-4 max-w-3xl mx-auto mb-10 sm:mb-12">
        <p className="inline-flex items-center gap-2 text-[#E26D35] font-mono text-xs font-semibold tracking-wider uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E26D35] shadow-[0_0_8px_rgba(226,109,53,0.55)]" />
          {eyebrow}
        </p>
        <h2 className="text-[#142938] font-sora text-3xl sm:text-4xl md:text-[46px] font-normal tracking-tight leading-[1.1] whitespace-pre-line">
          {title}
        </h2>
      </div>

      {/* Top Block: Overview + Wide Photography */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8 sm:mb-10">
        <div>
          <span className="text-[#E26D35] font-mono text-xs font-semibold tracking-wider uppercase mb-2 block">
            {overviewLabel}
          </span>
          <p className="text-[#5A6A72] font-sora text-base sm:text-[17px] leading-relaxed max-w-lg">
            {overviewText}
          </p>
        </div>

        <div className="relative w-full aspect-[16/9] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-slate-100 shadow-xs">
          <Image
            src={imageSrc}
            alt="The Next Evolution of HR is intelligence"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 650px"
          />
        </div>
      </div>

      {/* Middle Block: Mission (Dark Teal) & Vision (White) Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 sm:mb-10">
        {/* Mission Card */}
        <article className="rounded-[28px] bg-[#1C4E5B] p-8 sm:p-10 lg:p-11 text-white shadow-xs flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-white/70 tracking-wider uppercase mb-4 block">
              {missionKicker}
            </span>
            <p className="font-sora text-sm sm:text-[15.5px] text-white/95 leading-relaxed">
              {missionText}
            </p>
          </div>
        </article>

        {/* Vision Card */}
        <article className="rounded-[28px] bg-white border border-[#E9ECEF] p-8 sm:p-10 lg:p-11 relative overflow-hidden shadow-xs flex flex-col justify-start">
          <span className="font-mono text-xs text-[#526972] tracking-wider uppercase mb-4 block">
            {visionKicker}
          </span>
          <p className="font-sora text-base sm:text-lg text-[#142938] font-medium leading-relaxed max-w-sm">
            {visionText}
          </p>
          {/* Subtle orange accent shape in bottom-right corner */}
          <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-gradient-to-tl from-[#FF6B0A]/20 via-[#FF6B0A]/5 to-transparent blur-xl pointer-events-none" />
        </article>
      </div>

      {/* Bottom Block: 4 Values Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((v) => (
          <article
            key={v.id}
            className="rounded-[24px] sm:rounded-[28px] bg-white border border-[#E9ECEF] p-7 sm:p-8 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          >
            <h3 className="font-sora text-base sm:text-[17px] font-semibold text-[#142938] mb-4 flex items-center">
              <span className="text-[#E26D35] font-mono text-xs font-semibold mr-2.5">
                {v.id}
              </span>
              <span>{v.title}</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#5A6A72] font-sora leading-relaxed list-disc list-inside">
              {v.bullets.map((b, bi) => (
                <li key={bi} className="leading-relaxed">
                  <span className="-ml-1">{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
