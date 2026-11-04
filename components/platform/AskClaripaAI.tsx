import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Database,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

export interface AskClaripaAIProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  features?: string[];
  ctaText?: string;
  ctaHref?: string;
}

const defaultFeatures = [
  "AI assistant for people decisions",
  "See what others miss",
  "Smart automation for repeatable work",
];

export default function AskClaripaAI({
  eyebrow = "ASK CLARIPA",
  title = "See the signal before the outcome with Claripa.",
  description = "Ask a question in plain language. Claripa connects the workforce context and helps you understand what to do next.",
  features = defaultFeatures,
  ctaText = "Explore Ask Claripa",
  ctaHref = "/contact-us",
}: AskClaripaAIProps) {
  return (
    <section className="py-16 md:py-[88px] bg-[#fbf9f5]">
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24">
        {/* Orbital visualization */}
        <div
          className="relative grid w-[min(380px,100%)] aspect-square mx-auto place-items-center border border-dashed border-[#d1d8d8] rounded-full before:absolute before:w-[68%] before:aspect-square before:border before:border-dashed before:border-[#d1d8d8] before:rounded-full after:absolute after:w-[38%] after:aspect-square after:border after:border-dashed after:border-[#d1d8d8] after:rounded-full"
          aria-hidden="true"
        >
          <span className="relative z-10 w-16 h-16 rounded-full bg-white border border-[#e9edef] grid place-items-center text-[#f8780c] shadow-[0_12px_28px_rgba(0,46,64,0.08)]">
            <Sparkles size={26} />
          </span>
          <span className="absolute z-20 grid w-12 h-12 place-items-center border border-[#e9edef] rounded-2xl bg-white text-[#f8780c] shadow-[0_10px_22px_rgba(0,46,64,0.08)] top-[9%] left-[45%]">
            <Users size={20} />
          </span>
          <span className="absolute z-20 grid w-12 h-12 place-items-center border border-[#e9edef] rounded-2xl bg-white text-[#f8780c] shadow-[0_10px_22px_rgba(0,46,64,0.08)] top-[31%] right-[2%]">
            <BarChart3 size={20} />
          </span>
          <span className="absolute z-20 grid w-12 h-12 place-items-center border border-[#e9edef] rounded-2xl bg-white text-[#f8780c] shadow-[0_10px_22px_rgba(0,46,64,0.08)] right-[17%] bottom-[10%]">
            <Database size={20} />
          </span>
          <span className="absolute z-20 grid w-12 h-12 place-items-center border border-[#e9edef] rounded-2xl bg-white text-[#f8780c] shadow-[0_10px_22px_rgba(0,46,64,0.08)] bottom-[20%] left-[4%]">
            <MessageCircle size={20} />
          </span>
        </div>

        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <div className="grid gap-2.5 my-6">
            {features.map((feature) => (
              <p
                key={feature}
                className="flex items-center gap-2.5 m-0 text-sm font-sora text-[#002e40]"
              >
                <Check size={16} className="text-[#f8780c] shrink-0" />
                {feature}
              </p>
            ))}
          </div>
          <Link
            className="inline-flex items-center gap-[7px] text-[#254f5f] font-mono text-xs uppercase no-underline hover:text-[#f8780c] transition-colors"
            href={ctaHref}
          >
            {ctaText} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
