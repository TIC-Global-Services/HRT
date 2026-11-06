import Image from "next/image";
import { Check } from "lucide-react";

export interface EmployeeExperienceProps {
  eyebrow?: string;
  title?: string;
  benefits?: string[];
  imageSrc?: string;
  appStoreHref?: string;
  googlePlayHref?: string;
}

const defaultBenefits = [
  "Personalised growth paths",
  "Self-service leave, payslips, requests",
  "Feedback, recognition and surveys",
  "Chat-based HR helpdesk",
];

function AppleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function GooglePlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#00E676" />
      <path
        d="M47 38.1c-4.8 8.4-7.5 18.7-7.5 30.7v374.4c0 12 2.7 22.3 7.5 30.7l232.7-238-232.7-197.8z"
        fill="#00C3FF"
      />
      <path d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z" fill="#FF3A44" />
      <path
        d="M447.1 234.8l-61.7-35.4-60.1 60.1 60.1 60.1 61.7-35.4c17.5-10 27.9-28.5 27.9-49.7s-10.4-39.7-27.9-49.7z"
        fill="#FFC107"
      />
    </svg>
  );
}

export default function EmployeeExperience({
  eyebrow = "EMPLOYEE EXPERIENCE",
  title = "Clarity and growth for every employee.",
  benefits = defaultBenefits,
  imageSrc = "/solution-detail/img_9.jpeg",
  appStoreHref = "#",
  googlePlayHref = "#",
}: EmployeeExperienceProps) {
  return (
    <section className="px-5 py-16 sm:px-[5%] md:py-24" id="employee-experience">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr]">
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

        <div className="flex flex-col justify-center rounded-[24px] bg-[#FFF4EC] p-7 sm:p-10 lg:p-9 xl:p-10">
          <p className="mb-3.5 sm:mb-4 flex items-center gap-2 font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#E56A1E]">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#E56A1E] shadow-[0_0_8px_rgba(229,106,30,0.7)]" />
            {eyebrow}
          </p>

          <h2 className="m-0 text-[32px] sm:text-4xl font-semibold leading-tight tracking-[-0.035em] text-[#002e40]">
            {title}
          </h2>

          <ul className="mb-0 mt-7 grid gap-3.5 p-0 list-none">
            {benefits.map((benefit) => (
              <li className="flex items-center gap-3 text-sm sm:text-base text-[#002e40] font-sora font-medium" key={benefit}>
                <span className="grid size-5 shrink-0 place-items-center rounded-full border border-[#f3d9c8] bg-white text-[#f8780c]">
                  <Check aria-hidden="true" size={12} strokeWidth={2.5} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          {/* Download on App Store & Google Play Badges */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3">
            {/* Apple App Store */}
            <a
              href={appStoreHref}
              aria-label="Download on the App Store"
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white border border-[#E2E6E8] text-[#002e40] shadow-xs hover:border-[#002e40]/40 hover:-translate-y-0.5 transition-all text-left no-underline cursor-pointer"
            >
              <AppleIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-[#002e40] shrink-0" />
              <div className="flex flex-col">
                <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-wider text-[#62737A] leading-tight font-medium">
                  Download on the
                </span>
                <span className="font-sora text-xs sm:text-[13px] font-semibold text-[#002e40] leading-tight">
                  App Store
                </span>
              </div>
            </a>

            {/* Google Play */}
            <a
              href={googlePlayHref}
              aria-label="Get it on Google Play"
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white border border-[#E2E6E8] text-[#002e40] shadow-xs hover:border-[#002e40]/40 hover:-translate-y-0.5 transition-all text-left no-underline cursor-pointer"
            >
              <GooglePlayIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <div className="flex flex-col">
                <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-wider text-[#62737A] leading-tight font-medium">
                  GET IT ON
                </span>
                <span className="font-sora text-xs sm:text-[13px] font-semibold text-[#002e40] leading-tight">
                  Google Play
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
