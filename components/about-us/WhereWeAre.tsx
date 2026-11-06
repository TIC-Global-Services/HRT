import Image from "next/image";
import Link from "next/link";

export interface WhereWeAreProps {
  badgeText?: string;
  badgeHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function WhereWeAre({
  badgeText = "CAREER",
  badgeHref = "/careers",
  imageSrc = "/team.jpg",
  imageAlt = "Claripa team together in the office",
}: WhereWeAreProps) {
  return (
    <section
      id="careers-banner"
      aria-label="Claripa team and careers"
      className="pt-8 sm:pt-10 lg:pt-12 pb-3 sm:pb-4 lg:pb-5 px-4 sm:px-6 lg:px-[5%]"
    >
      <div className="relative w-full aspect-[16/7.5] sm:aspect-[16/6.5] lg:aspect-[16/5.8] min-h-[240px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px] rounded-[28px] sm:rounded-[30px] md:rounded-[30px] overflow-hidden border border-[#E5EAEB] shadow-xs bg-[#EAE8E3]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 1330px) 100vw, 1330px"
          className="object-cover object-center"
        />

        {/* Frosted Glass "CAREER" Badge */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-7 md:left-7 z-10">
          <Link
            href={badgeHref}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-mono text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase transition-all shadow-xs"
          >
            {badgeText}
          </Link>
        </div>
      </div>
    </section>
  );
}
