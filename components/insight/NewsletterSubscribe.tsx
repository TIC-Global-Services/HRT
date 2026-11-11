import { ArrowUpRight } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

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
  placeholder = "Add work email",
  buttonText = "Subscribe",
  action = "mailto:sales@claripa.com",
}: NewsletterSubscribeProps) {
  return (
    <section className="py-16 md:py-[88px] ]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 bg-white p-10 rounded-[30px]">
        <div>
          {/* <SectionEyebrow>{eyebrow}</SectionEyebrow> */}
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[#F8780C] rounded-full"></span>
            <span className="text-sm text-[#F8780C] font-geist tracking-tight">{eyebrow}</span>
          </p>
          <BlurText
            as="h2"
            text={title}
            delay={20}
            className="my-2.5 text-[#001F1F] font-sora text-3xl sm:text-4xl lg:text-[32px] font-normal tracking-[-0.05em]"
          />
          <BlurText
            as="p"
            text={description}
            delay={20}
            className="m-0 text-[#3E4A4F] font-sora text-base"
          />
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
