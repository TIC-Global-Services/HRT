import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export interface EmployeeExperienceProps {
  eyebrow?: string;
  title?: string;
  benefits?: string[];
  imageSrc?: string;
  actionText?: string;
  actionHref?: string;
}

const defaultBenefits = [
  "Personal Goals and Responsibilities",
  "Performance and Task Visibility",
  "Feedback and Performance Conversations",
  "Development Support",
];

export default function EmployeeExperience({
  eyebrow = "EMPLOYEE EXPERIENCE",
  title = "Clarity and growth for every employee.",
  benefits = defaultBenefits,
  imageSrc = "/solution-detail/img_9.jpeg",
  actionText = "Explore Claripa",
  actionHref = "/contact-us",
}: EmployeeExperienceProps) {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 md:py-24" id="employee-experience">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr]">
        {[0, 1].map((imageIndex) => (
          <div
            aria-hidden="true"
            className={`relative min-h-[360px] overflow-hidden rounded-[24px] sm:min-h-[480px] lg:min-h-[620px] ${
              imageIndex === 1 ? "hidden md:block" : ""
            }`}
            key={imageIndex}
          >
            <Image
              alt=""
              className="object-cover object-[62%_center]"
              fill
              preload={imageIndex === 0}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              src={imageSrc}
            />
          </div>
        ))}

        <div className="flex flex-col justify-center rounded-[24px] bg-[#fff4ec] p-7 sm:p-10 lg:p-9 xl:p-10">
          <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-[#f8780c]">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#f8780c]" />
            {eyebrow}
          </p>
          <h2 className="m-0 text-3xl font-normal leading-tight tracking-[-0.04em] text-[#254f5f] sm:text-4xl">
            {title}
          </h2>
          <ul className="mb-0 mt-7 grid gap-3.5 p-0 text-sm leading-relaxed text-[#254f5f]">
            {benefits.map((benefit) => (
              <li className="flex items-start gap-3" key={benefit}>
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-[#f3d9c8] bg-white text-[#f8780c]">
                  <Check aria-hidden="true" size={12} strokeWidth={2.5} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <Link
            className="mt-9 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-[#254f5f] px-6 font-mono text-xs uppercase tracking-wide text-white transition-colors hover:bg-[#173c49] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8780c]"
            href={actionHref}
          >
            {actionText}
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
