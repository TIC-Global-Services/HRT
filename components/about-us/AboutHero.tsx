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
        <p className="font-mono text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#E56A1E] mb-3 sm:mb-4">
          {eyebrow}
        </p>
        <h1 className="font-sora text-[#002E40] text-3xl sm:text-5xl md:text-[54px] lg:text-[60px] font-normal tracking-[-0.035em] leading-[1.08] whitespace-pre-line">
          {title}
        </h1>
      </div>

      {/* Large White Rounded Card Container matching Image exactly */}
      <div className="w-full rounded-[28px] sm:rounded-[36px] md:rounded-[40px] bg-white border border-[#96AAB2] shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_1fr] items-stretch">
          {/* Left Column: Description + Button */}
          <div className="flex flex-col justify-center px-7 py-10 sm:px-12 sm:py-14 md:px-14 md:py-16 lg:pl-16 lg:pr-10">
            <p className="text-[#254F5F] font-sora text-base sm:text-lg md:text-[21px] leading-[1.38] font-normal mb-8 max-w-[430px]">
              {description}
            </p>
            <div>
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#D5DCDD] bg-white hover:bg-[#F7F6F3] text-[#254F5F] hover:border-[#254F5F] font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-2xs"
              >
                {ctaText}
              </Link>
            </div>
          </div>

          {/* Right Column: Anchored Bottom-Right Photo with Top-Left Curve */}
          <div className="relative w-full pt-6 sm:pt-9 lg:pt-10 flex flex-col justify-end">
            <div className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] lg:h-full min-h-[280px] lg:min-h-[350px] rounded-tl-[32px] sm:rounded-tl-[40px] md:rounded-tl-[44px] overflow-hidden bg-slate-100">
              <Image
                src={imageSrc}
                alt="Co-pilot shaping the future of people intelligence"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 650px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
