import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allInsights, getBlogBySlug } from "@/data/blogs";
import BlogViewContent from "@/components/insight/BlogViewContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allInsights.map((insight) => ({
    slug: insight.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Insight Not Found | Claripa",
    };
  }

  return {
    title: `${blog.title} | Claripa Insights`,
    description: blog.subtitle || "Workforce intelligence and research by Claripa.",
    openGraph: {
      title: blog.title,
      description: blog.subtitle,
      url: `https://claripa.ai/insight/${blog.slug}`,
      siteName: "Claripa AI",
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.subtitle,
      images: [blog.image],
    },
  };
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogViewContent blog={blog} />;
}

