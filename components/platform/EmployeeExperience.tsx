import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

export interface EmployeeExperienceProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  benefits?: string[];
  imageSrc?: string;
  ctaHref?: string;
  ctaText?: string;
}

const defaultBenefits = [
  "Personal Goals & Responsibilities — Understand OKRs and contributions to organizational objectives",
  "Performance & Task Visibility — View assigned tasks, progress, and performance updates",
  "Feedback & Performance Conversations — Support structured reviews and manager–employee check-ins",
  "Development Support — Identify growth needs with behavioural competency and skill gap insights",
];

export default function EmployeeExperience({
  eyebrow = "EMPLOYEE EXPERIENCE",
  title = "Clarity and Growth for Every Employee.",
  description = "Claripa helps employees understand their goals, track their responsibilities, and participate in meaningful performance conversations. By connecting individual contributions with organizational objectives, the platform supports greater clarity, accountability, and continuous development.",
  benefits = defaultBenefits,
  imageSrc = "/solution-detail/img_9.jpeg",
  ctaHref = "/solution-hub",
  ctaText = "Explore Claripa",
}: EmployeeExperienceProps) {
  return (
    <section className="px-5 py-16 sm:px-[5%] md:py-24" id="employee-experience">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr]">
        {[0, 1].map((imageIndex) => (
          <div
            aria-hidden="true"
            className={`relative min-h-[400px] overflow-hidden rounded-[24px] sm:min-h-[480px] lg:min-h-[680px] ${
              imageIndex === 1 ? "hidden md:block" : ""
            }`}
            key={imageIndex}
          >
            <Image
              alt=""
              className="object-cover object-[50%_center]"
              fill
              preload={imageIndex === 0}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              src={imageSrc}
            />
          </div>
        ))}

        <div className="flex flex-col justify-center rounded-[24px] bg-[#FFF4EC] p-7 sm:p-10 lg:p-9 xl:p-10">
          <p className="mb-3.5 sm:mb-4 flex items-center gap-2 font-mono text-xs sm:text-base font-medium uppercase tracking-tight text-[#E56A1E]">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.7)]" />
            {eyebrow}
          </p>

          <BlurText
            as="h2"
            delay={20}
            text={title}
            className="m-0 text-2xl sm:text-[32px] font-normal leading-tight tracking-tight whitespace-pre-line text-[#254F5F]"
          />

          {description && (
            <BlurText
              as="p"
              delay={20}
              text={description}
              className="mb-0 mt-4 text-sm sm:text-[15px] leading-relaxed text-[#5A6D75] font-sora"
            />
          )}

          <ul className="mb-0 mt-6 grid gap-3.5 p-0 list-none">
            {benefits.map((benefit) => (
              <li className="flex items-start gap-3 text-sm sm:text-[15px] text-[#254F5F] font-sora font-normal leading-snug tracking-tight" key={benefit}>
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center border border-[#ECE9E3] bg-white/70 rounded-full text-[#f8780c]">
                  <Check aria-hidden="true" size={12} strokeWidth={2.5} />
                </span>
                <BlurText delay={20} text={benefit} />
              </li>
            ))}
          </ul>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-start gap-3">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2.5 bg-[#254F5F] hover:bg-[#193A47] font-geist-mono uppercase text-sm sm:text-base rounded-full px-6 py-3 text-white tracking-tight transition-colors"
            >
              <span>{ctaText}</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
