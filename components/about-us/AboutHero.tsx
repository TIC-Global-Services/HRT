import Image from "next/image";
import Link from "next/link";

export interface AboutHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc?: string;
}

export default function AboutHero({
  eyebrow = "ABOUT CLARIPA BY HRT",
  title = "Co-pilot shaping the future of\npeople intelligence",
  description = "Claripa connects goals, performance evidence and structured assessment to help leaders make more consistent, transparent and informed decisions about people.",
  ctaText = "MEET THE TEAM",
  ctaHref = "#team",
  imageSrc = "/about/hands-joined.jpg",
}: AboutHeroProps) {
  return (
    <section className="pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-[1330px] mx-auto">
      {/* Eyebrow & Main Title */}
      <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto mb-10 sm:mb-12">
        <p className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E26D35] mb-4">
          {eyebrow}
        </p>
        <h1 className="font-sora text-[#142938] text-3xl sm:text-5xl md:text-[54px] lg:text-[60px] font-normal tracking-[-0.03em] leading-[1.08] whitespace-pre-line">
          {title}
        </h1>
      </div>

      {/* Two-Column Card Container matching Image 1 */}
      <div className="rounded-[32px] sm:rounded-[36px] bg-white border border-[#E9ECEF] p-8 sm:p-12 lg:p-14 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Description + Button */}
          <div className="flex flex-col items-start justify-center">
            <p className="text-[#5A6A72] font-sora text-base sm:text-[17px] leading-relaxed mb-8 max-w-md">
              {description}
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-xs hover:border-slate-300"
            >
              {ctaText}
            </Link>
          </div>

          {/* Right Column: Collaborative Hands Photography */}
          <div className="relative w-full aspect-[4/3] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-slate-100 shadow-xs">
            <Image
              src={imageSrc}
              alt="Co-pilot shaping the future of people intelligence"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
