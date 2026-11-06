export interface ChallengeItem {
  number: string;
  tag: string;
  title: string;
  description: string;
}

const defaultChallenges: ChallengeItem[] = [
  {
    number: "01",
    tag: "CHALLENGE",
    title: "Goals lack alignment",
    description: "Individual priorities don't always connect with organizational objectives.",
  },
  {
    number: "02",
    tag: "CHALLENGE",
    title: "Progress is difficult to track",
    description: "Leaders lack visibility into how teams are progressing against goals.",
  },
  {
    number: "03",
    tag: "CHALLENGE",
    title: "Performance gaps surface late",
    description: "Misaligned goals often become visible only during performance reviews.",
  },
];

export interface TheChallengeProps {
  eyebrow?: string;
  title?: string;
  quote?: string;
  challenges?: ChallengeItem[];
}

export default function TheChallenge({
  eyebrow = "THE CHALLENGE",
  title = "What gets in the way today",
  quote = "“We set goals at the beginning of the year, but connecting everyday work to those goals is still a challenge.”",
  challenges = defaultChallenges,
}: TheChallengeProps) {
  return (
    <section className="py-16 md:py-24 bg-[#F7F6F3]">
      <div className="px-[5%]">
        {/* Header Grid: Eyebrow + Title on left, Quote on right */}
        <div className="flex gap-6 lg:gap-16 items-end justify-between mb-12 lg:mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full bg-[#F8780C] shadow-[0_0_8px_rgba(248,120,12,0.55)]"
              />
              <span className="font-mono text-base font-semibold text-[#F8780C] tracking-wider uppercase">
                {eyebrow}
              </span>
            </div>
            <h2 className="font-sora text-[#254F5F] text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-tight leading-[1.12]">
              {title}
            </h2>
          </div>

          <div className="">
            <p className="font-sora text-[#62737A] max-w-md text-lg sm:text-lg font-normal leading-[1.1]">
              {quote}
            </p>
          </div>
        </div>

        {/* 3 Challenge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-4">
          {challenges.map((c) => (
            <div
              key={c.number}
              className="rounded-[24px] border border-[#ECE9E3] bg-white p-7 sm:p-8 flex flex-col justify-between min-h-[312px] transition-all duration-300 hover:border-[#F8780C]/40 hover:shadow-[0_8px_24px_rgba(0,46,64,0.04)]"
            >
              <div>
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#F7F6F3] border border-[#ECE9E3] font-sora text-xl font-semibold text-[#62737A] mb-6">
                  {c.number}
                </span>

              </div>
              <div>

                <span className="block font-mono text-sm font-semibold text-[#F8780C] tracking-wider uppercase mb-2">
                  {c.tag}
                </span>

                <h3 className="font-sora text-[#254F5F] text-2xl font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="font-sora text-base text-[#62737A] leading-[1.2] m-0 mt-3">
                  {c.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
