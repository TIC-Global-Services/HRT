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
    <section className="py-12 sm:py-16 md:py-20">
      <div className="w-[min(1200px,calc(100%-32px))] sm:w-[min(1200px,calc(100%-48px))] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-[24px] sm:rounded-[30px] border border-[#E3E8EA] shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 bg-[#F8780C] rounded-full" />
            <span className="text-xs sm:text-sm text-[#F8780C] font-mono uppercase tracking-wider font-semibold">
              {eyebrow}
            </span>
          </p>
          <BlurText
            as="h2"
            text={title}
            delay={20}
            className="my-2 text-[#001F1F] font-sora text-2xl sm:text-3xl lg:text-[32px] font-medium tracking-tight leading-[1.2]"
          />
          <BlurText
            as="p"
            text={description}
            delay={20}
            className="m-0 text-[#62737A] font-sora text-sm sm:text-base leading-relaxed"
          />
        </div>
        <form
          action={action}
          className="flex flex-col sm:flex-row w-full lg:w-[min(460px,100%)] gap-2.5 sm:gap-2"
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
            className="w-full min-h-[46px] px-4 sm:px-5 py-2.5 border border-[#dbe1e3] rounded-full bg-white text-[#002e40] text-[13px] sm:text-sm font-sora focus:border-[#254f5f] focus:outline-none placeholder-[#8B9DA6]"
          />
          <button
            type="submit"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 px-6 rounded-full bg-[#002e40] text-white font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase hover:bg-[#174453] transition-colors shrink-0 cursor-pointer w-full sm:w-auto shadow-xs"
          >
            <span>{buttonText}</span>
            <ArrowUpRight aria-hidden="true" size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}
