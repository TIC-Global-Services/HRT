import { ArrowUpRight } from "lucide-react";
import SectionEyebrow from "@/components/shared/SectionEyebrow";

export interface NewsletterSubscribeProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  action?: string;
}

export default function NewsletterSubscribe({
  eyebrow = "NEWSLETTER",
  title = "Get people insights in your inbox.",
  description = "Monthly. No spam. Unsubscribe anytime.",
  placeholder = "Work email address",
  buttonText = "Subscribe",
  action = "mailto:sales@claripa.com",
}: NewsletterSubscribeProps) {
  return (
    <section className="py-16 md:py-[88px] bg-[#fbf9f5]">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="my-2.5 text-[#254f5f] font-sora text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-[-0.05em]">
            {title}
          </h2>
          <p className="m-0 text-[#62737a] font-sora text-sm">{description}</p>
        </div>
        <form
          action={action}
          className="flex flex-col sm:flex-row w-[min(460px,100%)] gap-2"
          encType="text/plain"
          method="post"
        >
          <label className="sr-only" htmlFor="insights-email">
            Email address
          </label>
          <input
            id="insights-email"
            name="Email"
            placeholder={placeholder}
            required
            type="email"
            className="w-full min-h-[44px] px-4 py-2.5 border border-[#dbe1e3] rounded-full bg-white text-[#002e40] text-[13px] font-sora focus:border-[#254f5f] focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 px-6 rounded-full bg-[#002e40] text-white font-mono text-[11px] font-medium tracking-[0.02em] uppercase hover:bg-[#174453] transition-colors shrink-0 cursor-pointer"
          >
            {buttonText} <ArrowUpRight aria-hidden="true" size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}
