import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export interface SolutionDetailHeroProps {
  breadcrumb?: string;
  title?: string;
  description?: string;
  talkText?: string;
  talkHref?: string;
  overviewText?: string;
  overviewHref?: string;
  bannerSrc?: string;
}

export default function SolutionDetailHero({
  breadcrumb = "HOME / SOLUTIONS / SOLUTION DETAIL",
  title = "Align every goal with the bigger picture.",
  description = "Connect organizational objectives with team priorities and individual contributions. Claripa helps you create aligned goals, track performance and identify gaps before they impact business outcomes.",
  talkText = "BOOK A DEMO",
  talkHref = "/contact-us",
  overviewText = "WATCH OVERVIEW",
  overviewHref = "#the-solution",
  bannerSrc = "/solution_detail_banner.png",
}: SolutionDetailHeroProps) {
  return (
    <section className="pt-6 pb-14 sm:pt-10 sm:pb-20 bg-[#F7F6F3]">
      <div className="px-[5%]">
        {/* Top Breadcrumb */}
        <div className="mb-8 sm:mb-12">
          <p className="font-mono text-xs uppercase tracking-wider text-[#62737A] m-0">
            {breadcrumb}
          </p>
        </div>

        {/* Centered Heading & Lead Text */}
        <div className="max-w-4xl mx-auto text-center mb-9 sm:mb-11">
          <h1 className="font-sora text-[#002E40] text-4xl sm:text-5xl lg:text-[58px] font-normal tracking-[-0.04em] leading-[1.08] mb-5">
            {title}
          </h1>

          <p className="font-sora text-[#62737A] text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-2xl mx-auto mb-8">
            {description}
          </p>

          {/* Centered Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href={talkHref}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#1C3B47] text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#122A33] transition-all hover:-translate-y-0.5 shadow-sm"
            >
              {talkText}
            </Link>

            <a
              href={overviewHref}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white border border-[#ECE9E3] text-[#002E40] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#F7F6F3] transition-all hover:-translate-y-0.5 shadow-sm group"
            >
              <span className="w-5 h-5 rounded-full border border-[#002E40] flex items-center justify-center text-[#002E40] group-hover:border-[#F8780C] group-hover:text-[#F8780C] transition-colors">
                <Play size={9} className="fill-current ml-0.5" />
              </span>
              {overviewText}
            </a>
          </div>
        </div>

        {/* Outer Banner Card Container: 1340px wide, rounded-[32px] */}
        <div className="relative w-full rounded-[28px] sm:rounded-[32px] border border-[#ECE9E3] bg-white overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex items-center justify-center p-4 sm:p-8 lg:p-12">
          {/* Subtle warm corner glows */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FFEEDB]/50 via-[#FFF7F0]/30 to-transparent pointer-events-none rounded-full blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#FFF4EC]/40 to-transparent pointer-events-none rounded-full blur-2xl"
          />

          {/* Centered Graphic Banner from /solution_detail_banner.png */}
          <div className="relative z-10 w-full max-w-[815px] flex items-center justify-center">
            <Image
              src={bannerSrc}
              alt="Solution Detail Illustration: Retention Watch, Flight Risk Cohort, and AI Manager Action"
              width={815}
              height={440}
              priority
              className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_12px_36px_rgba(0,46,64,0.06)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
