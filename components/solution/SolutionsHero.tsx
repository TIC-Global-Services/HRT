import Link from "next/link";
import { AlertCircle, Crown } from "lucide-react";

export interface SolutionsHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

function RetentionPreview() {
  return (
    <article className="relative min-w-0 p-5 rounded-[23px] border border-[#eee6df] bg-white/85 shadow-[0_22px_42px_rgba(28,43,48,0.09)] min-h-[220px] lg:mt-9.5 pt-6">
      <div className="font-mono text-[9px] text-[#7d8587] tracking-wider uppercase mb-7 leading-normal">
        RETAIN KEY TALENT
      </div>
      <AlertCircle
        aria-hidden="true"
        className="absolute top-5 right-4.5 p-1.5 rounded-[9px] bg-[#ff6b0a] text-white"
        size={28}
      />
      <h3 className="text-base font-semibold text-[#292b2c] tracking-[-0.03em] leading-tight">
        Flight risk detected
      </h3>
      <p className="text-xs text-[#7e898c] mt-1 leading-normal">
        Senior Engineer · 6 weeks before resignation
      </p>
      <div className="flex h-[42px] items-end gap-1 mt-5" aria-hidden="true">
        <span className="flex-1 rounded-t-[5px] rounded-b-[2px] bg-[#285768] h-[92%]" />
        <span className="flex-1 rounded-t-[5px] rounded-b-[2px] bg-[#285768] h-[85%]" />
        <span className="flex-1 rounded-t-[5px] rounded-b-[2px] bg-[#285768] h-[75%]" />
        <span className="flex-1 rounded-t-[5px] rounded-b-[2px] bg-[#f4a15f] h-[55%]" />
        <span className="flex-1 rounded-t-[5px] rounded-b-[2px] bg-[#ff6b0a] h-[38%]" />
        <span className="flex-1 rounded-t-[5px] rounded-b-[2px] bg-[#ff6b0a] h-[26%]" />
      </div>
      <div className="mt-1.5 text-[10px] text-[#7e898c]">
        Engagement signal, last 6 weeks
      </div>
    </article>
  );
}

function RampUpPreview() {
  return (
    <article className="min-w-0 p-5 rounded-[23px] border border-[#eee6df] bg-[#fffcf9] shadow-[0_22px_42px_rgba(28,43,48,0.09)] min-h-[224px] lg:-mt-9">
      <div className="font-mono text-[9px] text-[#7d8587] tracking-wider uppercase mb-3.5 leading-normal">
        ONBOARD &amp; RAMP UP
      </div>
      <h3 className="text-base font-semibold text-[#292b2c] tracking-[-0.03em] leading-tight">
        New-hire ramp-up
      </h3>
      <p className="text-xs text-[#7e898c] mt-0.5 mb-3 leading-normal">
        Cohort of 12 · week 3
      </p>
      <div className="flex items-center justify-between mt-2 text-[11px] text-[#45494a]">
        <span>On track</span>
        <strong className="text-[#4a9145] font-semibold">9</strong>
      </div>
      <div className="h-1.25 overflow-hidden rounded-full bg-[#efedea] w-full mt-1">
        <span className="block h-full rounded-full bg-[#4f9a4c] w-[76%]" />
      </div>
      <div className="flex items-center justify-between mt-2 text-[11px] text-[#45494a]">
        <span>Early friction</span>
        <strong className="text-[#e66c2c] font-semibold">3</strong>
      </div>
      <div className="h-1.25 overflow-hidden rounded-full bg-[#efedea] w-full mt-1">
        <span className="block h-full rounded-full bg-[#ff6b0a] w-[27%]" />
      </div>
      <div className="mt-3 text-[10px] font-semibold text-[#df641d]">
        Schedule role-clarity check-ins →
      </div>
    </article>
  );
}

function PerformancePreview() {
  return (
    <article className="min-w-0 p-5 rounded-[23px] border border-[#eee6df] bg-[#fffaf5] shadow-[0_22px_42px_rgba(28,43,48,0.09)] min-h-[217px] lg:mt-14">
      <div className="font-mono text-[9px] text-[#7d8587] tracking-wider uppercase mb-4 leading-normal">
        CONTINUOUS PERFORMANCE
      </div>
      <h3 className="text-base font-semibold text-[#292b2c] tracking-[-0.03em] leading-tight">
        Goal alignment
      </h3>
      <div className="mt-1.5 text-[40px] font-normal text-[#263638] tracking-[-0.06em] leading-tight flex items-baseline gap-2">
        82% <span className="text-[11px] font-semibold text-[#4e8d42] tracking-normal">↑ 27%</span>
      </div>
      <svg
        aria-label="Goal alignment trending upward"
        className="w-full h-12 mt-3.5 block overflow-visible"
        preserveAspectRatio="none"
        role="img"
        viewBox="0 0 220 54"
      >
        <polyline
          fill="none"
          points="0,43 38,39 76,42 115,29 154,24 190,11 220,4"
          stroke="#ff6b0a"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </article>
  );
}

function SuccessionPreview() {
  return (
    <article className="min-w-0 p-5 rounded-[23px] border border-[#345b60] bg-[#355a5d] text-white shadow-[0_22px_42px_rgba(28,43,48,0.09)] min-h-[198px] lg:-mt-2.5">
      <div className="font-mono text-[9px] text-[#f39963] tracking-wider uppercase mb-4 leading-normal">
        GROW &amp; PLAN SUCCESSION
      </div>
      <div className="flex items-center gap-3 mt-4">
        <span className="w-11 h-11 shrink-0 rounded-[13px] bg-[#241a12] text-[#ff6b0a] flex items-center justify-center">
          <Crown aria-hidden="true" size={22} />
        </span>
        <div>
          <h3 className="text-base font-semibold text-white tracking-[-0.03em] leading-tight">
            Ready to step up
          </h3>
          <p className="text-xs text-[#c0cbcb] mt-0.5 leading-normal">
            Analyst → Team Lead
          </p>
        </div>
      </div>
      <p className="mt-4 p-3 rounded-[13px] bg-white/10 text-[#d3dddd] text-[11px] leading-relaxed">
        3 succession-ready people in Engineering this quarter.
      </p>
    </article>
  );
}

export default function SolutionsHero({
  eyebrow = "Solutions",
  title = "Intelligence for the people decisions that matter most.",
  description = "Losing key people, slow ramp-up, performance you can’t see in time. Claripa reads the signals your HR systems already capture and puts them in front of the people who can act.",
  ctaText = "Book a demo",
  ctaHref = "/contact-us",
}: SolutionsHeroProps) {
  return (
    <section className="pt-10 sm:pt-12 pb-0">
      <div className="flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <p className="inline-flex items-center gap-2 text-[#ff6b0a] font-mono text-lg font-semibold tracking-wide">
          {/* <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b0a] shadow-[0_0_8px_rgba(255,107,10,0.45)]" /> */}
          {eyebrow}
        </p>
        <h1 className="max-w-[860px] my-2.5 text-[#003247] text-3xl sm:text-5xl md:text-[58px] lg:text-[62px] font-normal tracking-[-0.05em] leading-[1.02]">
          {title}
        </h1>
        <p className="max-w-[820px] text-[#71838a] text-sm sm:text-base font-normal font-sora leading-[1.2]">
          {description}
        </p>
        <Link
          className="inline-flex min-h-[50px] items-center justify-center gap-2 mt-6 px-7 rounded-full bg-[#285768] hover:bg-[#1d4655] text-white font-mono text-xs tracking-tight uppercase transition-all duration-200 hover:-translate-y-0.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b0a] focus-visible:ring-offset-2"
          href={ctaHref}
        >
          {ctaText}
        </Link>
      </div>

      <div
        aria-label="Examples of workforce insights"
        className="mt-9 mx-4 sm:mx-6 lg:mx-auto max-w-[1330px] min-h-[436px] flex items-center justify-center p-6 sm:p-10 lg:px-14 overflow-hidden rounded-[28px] border border-[#b7cdd2] bg-gradient-to-r from-white via-[#fffaf5] to-[#fff0e4]"
        role="group"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 w-full max-w-[1112px] items-center">
          <RetentionPreview />
          <RampUpPreview />
          <PerformancePreview />
          <SuccessionPreview />
        </div>
      </div>
    </section>
  );
}
