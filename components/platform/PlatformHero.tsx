import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageIntro from "@/components/shared/PageIntro";

export interface PlatformHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  tourText?: string;
  tourHref?: string;
  tags?: string[];
}

const defaultTags = ["Intelligence", "Managers", "Talent"];

export default function PlatformHero({
  eyebrow = "THE CLARIPA PLATFORM",
  title = "One intelligence layer for every people decision.",
  description = "Claripa sits above your existing HR systems, connects the signals they already capture, and turns them into clear, timely intelligence for leaders, HR and managers.",
  tourText = "Take a product tour",
  tourHref = "#product-tour",
  tags = defaultTags,
}: PlatformHeroProps) {
  return (
    <div className="flex flex-col gap-6">
      <PageIntro eyebrow={eyebrow} title={title} description={description}>
        <Link
          className="inline-flex min-h-[48px] items-center justify-center gap-2.5 px-[22px] rounded-full border border-[#002e40] bg-[#002e40] text-white font-mono text-[11px] font-medium tracking-[0.02em] uppercase hover:bg-[#174453] transition-all hover:-translate-y-0.5 cursor-pointer w-fit mt-2"
          href={tourHref}
        >
          {tourText} <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </PageIntro>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1.5 px-2.5 py-2 border border-[#e9edef] rounded-full text-[#62737a] text-[11px] font-sora bg-white shadow-xs"
          >
            <Check aria-hidden="true" size={14} className="text-[#f8780c]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
