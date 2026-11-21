// Blog types, shared utilities, and re-exports of Nexohra and Claripa datasets
import { allCaseStudies } from "./caseStudies";
import { allBlogsNexohra } from "./blogsNexohra";
import { allBlogsClaripa } from "./blogsClaripa";

export { allCaseStudies, allBlogsNexohra, allBlogsClaripa };

export interface BlogContentBlock {
  type: "paragraph" | "heading" | "subheading" | "bullet-list" | "comparison-table" | "quote" | "stat";
  text?: string;
  items?: string[];
  stat?: { value: string; label: string };
  quote?: { text: string; author?: string };
  table?: {
    headers: [string, string];
    rows: [string, string][];
  };
}

export interface BlogSection {
  id: string;
  title: string;
  blocks: BlogContentBlock[];
}

export interface BlogPost {
  id: string;
  slug: string;
  blogNumber: number;
  title: string;
  subtitle: string;
  category: string;
  topic: string;
  isFeatured?: boolean;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  coverImageAlt: string;
  keyTakeaways?: string[];
  statsHighlight?: {
    value: string;
    label: string;
  };
  ctaCard?: {
    eyebrow?: string;
    title: string;
    description?: string;
    buttonText: string;
    buttonHref?: string;
  };
  sections: BlogSection[];
}

// Default active dataset across the site (Claripa)
export const allBlogs: BlogPost[] = allBlogsClaripa;

export const allInsights: BlogPost[] = [...allBlogs, ...allCaseStudies];
export const allInsightsNexohra: BlogPost[] = [...allBlogsNexohra, ...allCaseStudies];
export const allInsightsClaripa: BlogPost[] = [...allBlogsClaripa, ...allCaseStudies];

// Lookup helpers supporting both variants
export function getBlogBySlug(
  slug: string,
  variant: "claripa" | "nexohra" = "nexohra"
): BlogPost | undefined {
  console.log("variantvariant",variant)
  const insights = variant === "nexohra" ? allInsightsNexohra : allInsightsClaripa;
  return insights.find((b) => b.slug === slug || b.id === slug);
}

export function getRelatedBlogs(
  currentSlug: string,
  count: number = 3,
  variant: "claripa" | "nexohra" = "nexohra"
): BlogPost[] {
  const insights = variant === "nexohra" ? allInsightsNexohra : allInsightsClaripa;
  return insights.filter((b) => b.slug !== currentSlug && b.id !== currentSlug).slice(0, count);
}
