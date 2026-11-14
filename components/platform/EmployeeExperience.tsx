import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

export interface EmployeeBenefitItem {
  id?: string;
  title: string;
  description?: string;
}

export interface EmployeeExperienceImageCard {
  id: string;
  type: "image";
  src: string;
  alt?: string;
  className?: string;
  preload?: boolean;
}

export interface EmployeeExperienceContentCard {
  id: string;
  type: "content";
  eyebrow: string;
  title: string;
  description?: string;
  benefits: (EmployeeBenefitItem | string)[];
  ctaHref: string;
  ctaText: string;
  className?: string;
}

export type EmployeeExperienceCardItem =
  | EmployeeExperienceImageCard
  | EmployeeExperienceContentCard;

export interface EmployeeExperienceProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  benefits?: (EmployeeBenefitItem | string)[];
  imageSrc?: string;
  imageSrc2?: string;
  ctaHref?: string;
  ctaText?: string;
  cards?: EmployeeExperienceCardItem[];
}

export const defaultBenefits: EmployeeBenefitItem[] = [
  {
    id: "personal-goals",
    title: "Personal Goals & Responsibilities",
    description:
      "Understand OKRs and contributions to organizational objectives",
  },
  {
    id: "performance-visibility",
    title: "Performance & Task Visibility",
    description: "View assigned tasks, progress, and performance updates",
  },
  {
    id: "feedback-conversations",
    title: "Feedback & Performance Conversations",
    description:
      "Support structured reviews and manager–employee check-ins",
  },
  {
    id: "development-support",
    title: "Development Support",
    description:
      "Identify growth needs with behavioural competency and skill gap insights",
  },
];

export const defaultCards: EmployeeExperienceCardItem[] = [
  {
    id: "employee-exp-img-1",
    type: "image",
    src: "/employee-experience-1.png",
    alt: "Employee clarity and growth on mobile",
    className:
      "relative min-h-[400px] overflow-hidden rounded-[24px] sm:min-h-[480px] lg:min-h-[20dvh]",
    preload: true,
  },
  {
    id: "employee-exp-img-2",
    type: "image",
    src: "/employee-experience-2.png",
    alt: "Employee performance tracking and task visibility",
    className:
      "relative min-h-[400px] overflow-hidden rounded-[24px] sm:min-h-[480px] lg:min-h-[20dvh] hidden lg:block",
    preload: false,
  },
  {
    id: "employee-exp-content",
    type: "content",
    eyebrow: "EMPLOYEE EXPERIENCE",
    title: "Clarity and Growth for Every Employee.",
    description:
      "Claripa helps employees understand their goals, track their responsibilities, and participate in meaningful performance conversations. By connecting individual contributions with organizational objectives, the platform supports greater clarity, accountability, and continuous development.",
    benefits: defaultBenefits,
    ctaHref: "/solution-hub",
    ctaText: "Explore Claripa",
    className:
      "flex flex-col justify-center rounded-[24px] bg-[#FFF4EC] p-7 sm:p-10 lg:p-9 xl:p-10",
  },
];

export default function EmployeeExperience({
  eyebrow,
  title,
  description,
  benefits,
  imageSrc,
  imageSrc2,
  ctaHref,
  ctaText,
  cards,
}: EmployeeExperienceProps) {
  const displayCards: EmployeeExperienceCardItem[] =
    cards || [
      {
        id: "employee-exp-img-1",
        type: "image",
        src: imageSrc || "/employee-experience-1.png",
        alt: "Employee clarity and growth on mobile",
        className:
          "relative min-h-[400px] overflow-hidden rounded-[24px] sm:min-h-[480px] lg:min-h-[20dvh]",
        preload: true,
      },
      {
        id: "employee-exp-img-2",
        type: "image",
        src: imageSrc2 || "/employee-experience-2.png",
        alt: "Employee performance tracking and task visibility",
        className:
          "relative min-h-[400px] overflow-hidden rounded-[24px] sm:min-h-[480px] lg:min-h-[20dvh] hidden lg:block",
        preload: false,
      },
      {
        id: "employee-exp-content",
        type: "content",
        eyebrow: eyebrow ?? "EMPLOYEE EXPERIENCE",
        title: title ?? "Clarity and Growth for Every Employee.",
        description:
          description ??
          "Claripa helps employees understand their goals, track their responsibilities, and participate in meaningful performance conversations. By connecting individual contributions with organizational objectives, the platform supports greater clarity, accountability, and continuous development.",
        benefits: benefits ?? defaultBenefits,
        ctaHref: ctaHref ?? "/solution-hub",
        ctaText: ctaText ?? "Explore Claripa",
        className:
          "flex flex-col justify-center rounded-[24px] bg-[#FFF4EC] p-7 sm:p-10 lg:p-9 xl:p-10",
      },
    ];

  return (
    <section className="px-5 py-16 sm:px-[5%] lg:py-24" id="employee-experience">
      <div className="grid gap-4 lg:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr]">
        {displayCards.map((card) => {
          if (card.type === "image") {
            return (
              <div
                key={card.id}
                aria-hidden="true"
                className={card.className}
              >
                <Image
                  alt={card.alt || ""}
                  className="object-cover object-[50%_center]"
                  fill
                  preload={card.preload}
                  // sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  src={card.src}
                />
              </div>
            );
          }

          return (
            <div
              key={card.id}
              className={
                card.className ||
                "flex flex-col justify-center rounded-[24px] bg-[#FFF4EC] p-7 sm:p-10 lg:p-9 xl:p-10"
              }
            >
              {/* Eyebrow */}
              <p className="mb-3.5 sm:mb-4 flex items-center gap-2 font-mono text-xs sm:text-base font-medium uppercase tracking-tight text-[#E56A1E]">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.7)]"
                />
                {card.eyebrow}
              </p>

              {/* Title */}
              <BlurText
                as="h2"
                delay={20}
                text={card.title}
                className="m-0 text-[28px] sm:text-[32px] font-normal leading-tight tracking-tight whitespace-pre-line text-[#254F5F]"
              />

              {/* Description */}
              {card.description && (
                <BlurText
                  as="p"
                  delay={20}
                  text={card.description}
                  className="mb-0 mt-4 text-sm sm:text-[15px] leading-[1.3] text-[#5A6D75] font-sora"
                />
              )}

              {/* Benefits List */}
              <ul className="mb-0 mt-6 grid gap-3.5 p-0 list-none">
                {card.benefits.map((benefit, idx) => {
                  const isObj = typeof benefit === "object";
                  const fullText = isObj
                    ? benefit.description
                      ? `${benefit.title} — ${benefit.description}`
                      : benefit.title
                    : benefit;
                  const itemKey = isObj
                    ? benefit.id || benefit.title
                    : benefit;

                  return (
                    <li
                      key={itemKey || idx}
                      className="flex items-start gap-3 text-xs sm:text-[15px] text-[#254F5F] font-sora font-normal leading-snug tracking-tight"
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center border border-[#ECE9E3] bg-white/70 rounded-full text-[#f8780c]">
                        <Check aria-hidden="true" size={12} strokeWidth={2.5} />
                      </span>
                      <BlurText delay={20} text={fullText} />
                    </li>
                  );
                })}
              </ul>

              {/* CTA Button */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-start gap-3">
                <Link
                  href={card.ctaHref}
                  className="inline-flex items-center gap-2.5 bg-[#254F5F] hover:bg-[#193A47] font-geist-mono uppercase text-xs sm:text-base rounded-full px-6 py-3 text-white tracking-tight transition-colors"
                >
                  <span>{card.ctaText}</span>
                  <ArrowUpRight
                    className="w-4 h-4"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
