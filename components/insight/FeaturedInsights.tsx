import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

export interface ArticleItem {
  title: string;
  category: string;
  topic: string;
  date: string;
  image: string;
  href: string;
}

export const defaultArticles: ArticleItem[] = [
  {
    title: "GCC Performance Across Engineering",
    category: "Case Studies",
    topic: "Attrition",
    date: "Apr 22, 2025",
    image: "/insight-1.jpg",
    href: "/solution-details",
  },
  {
    title: "The Hidden Cost of Employee Disengagement",
    category: "Case Studies",
    topic: "Engagement",
    date: "Apr 22, 2025",
    image: "/insigth-2.jpg",
    href: "/solution-details",
  },
  {
    title: "Why Exit Interviews Come Too Late",
    category: "Blogs",
    topic: "Attrition",
    date: "May 08, 2025",
    image: "/real-world-impact-1.jpg",
    href: "/solution-hub",
  },
  {
    title: "Claripa Introduces Ask Claripa, AI for People Decisions",
    category: "News",
    topic: "AI",
    date: "May 20, 2025",
    image: "/real-world-impact-2.jpg",
    href: "/platform",
  },
  {
    title: "From Dashboards to Decisions: Making HR Data Actionable",
    category: "Blogs",
    topic: "Analytics",
    date: "Jun 11, 2025",
    image: "/insight-1.jpg",
    href: "/platform",
  },
  {
    title: "Onboarding Engineers at Scale: A 90-Day Signal Checklist",
    category: "Reports & Guides",
    topic: "Onboarding",
    date: "Jun 25, 2025",
    image: "/insigth-2.jpg",
    href: "/solution-hub",
  },
];

export interface FeaturedInsightsProps {
  eyebrow?: string;
  title?: string;
  featuredArticles?: ArticleItem[];
}

export default function FeaturedInsights({
  eyebrow = "FEATURED",
  title = "Ideas worth a closer look.",
  featuredArticles = defaultArticles.slice(0, 2),
}: FeaturedInsightsProps) {
  return (
    <section className="w-[min(1200px,calc(100%-48px))] mx-auto pb-20">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
        {featuredArticles.map((article, index) => (
          <Link
            className="relative flex flex-col justify-end min-h-[350px] p-8 md:p-10 rounded-[24px] overflow-hidden bg-[#002e40] text-white no-underline group"
            href={article.href}
            key={article.title}
          >
            <Image
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              fill
              priority={index === 0}
              sizes="(max-width: 760px) 100vw, 50vw"
              src={article.image}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#002e40] via-[#002e40]/70 to-transparent pointer-events-none" />
            <span className="relative z-10 flex items-center gap-3 text-xs text-white/70 font-mono uppercase mb-2">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.category}</span>
            </span>
            <span className="relative z-10 text-white font-sora text-xl md:text-2xl font-normal leading-snug mb-4">
              {article.title}
            </span>
            <span className="relative z-10 inline-flex items-center gap-1.5 text-[#f8780c] font-mono text-xs uppercase group-hover:underline">
              Read the full story <ArrowUpRight size={16} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
