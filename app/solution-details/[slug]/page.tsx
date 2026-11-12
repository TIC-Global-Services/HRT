import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionDetailContent from "@/components/solution-details";
import { allSolutions, getSolutionBySlug } from "@/data/solutions";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allSolutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: "Solution Not Found",
    };
  }

  return {
    title: solution.metadata.title,
    description: solution.metadata.description,
    openGraph: {
      title: `${solution.metadata.title} | Claripa AI`,
      description: solution.metadata.description,
      url: `https://claripa.ai/solution-details/${solution.slug}`,
      siteName: "Claripa AI",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${solution.metadata.title} | Claripa AI`,
      description: solution.metadata.description,
    },
  };
}

export default async function SolutionDetailBySlugPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return <SolutionDetailContent solution={solution} />;
}

