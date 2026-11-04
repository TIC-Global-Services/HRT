export interface StatItem {
  number: string;
  label: string;
}

export interface AboutImpactProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  {
    number: "50+",
    label: "Years of Founders HR Expertise",
  },
  {
    number: "03+",
    label: "Years of HR Consulting Expertise",
  },
  {
    number: "30+",
    label: "Clients Served",
  },
];

export default function AboutImpact({ stats = defaultStats }: AboutImpactProps) {
  return (
    <section
      id="about-impact"
      aria-label="Impact Stats"
      className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-[1330px] mx-auto"
    >
      {/* Outer White Card Container matching Image 4 */}
      <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-[#E9ECEF] p-4 sm:p-5 lg:p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <article
              key={`${stat.label}-${index}`}
              className="rounded-[22px] sm:rounded-[26px] bg-[#FAF9F7] border border-[#ECE9E3] p-8 sm:p-10 text-center flex flex-col items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs"
            >
              <strong className="block text-[#FF6B0A] font-sora font-light text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-none mb-3.5">
                {stat.number}
              </strong>
              <span className="font-sora text-xs sm:text-sm font-semibold text-[#142938] tracking-tight">
                {stat.label}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
