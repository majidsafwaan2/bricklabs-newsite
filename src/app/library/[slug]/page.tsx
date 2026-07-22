import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/guides/GuideArticle";
import { allGuides, getGuideBySlug, getRelatedGuides } from "@/content/guides/registry";
import { siteContent } from "@/data/siteContent";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return allGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return { title: "Guide not found" };
  }

  const canonical = `${siteContent.brand.siteUrl}/library/${guide.slug}`;
  const title = `${guide.title} Build Guide`;

  return {
    title,
    description: guide.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: guide.description,
      type: "article",
      url: canonical,
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      images: [{ url: guide.heroImage, width: 1200, height: 800, alt: guide.heroAlt }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: guide.description,
      images: [guide.heroImage]
    }
  };
}

function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const canonical = `${siteContent.brand.siteUrl}/library/${guide.slug}`;
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
    image: `${siteContent.brand.siteUrl}${guide.heroImage}`,
    totalTime: `PT${guide.timeMinutes}M`,
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: String(guide.maxCost) },
    supply: guide.materials.map((material) => ({ "@type": "HowToSupply", name: `${material.quantity} ${material.item}` })),
    tool: guide.tools.map((tool) => ({ "@type": "HowToTool", name: tool })),
    step: guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.instructions.join(" "),
      image: `${siteContent.brand.siteUrl}${step.visual.src}`,
      url: `${canonical}#${step.id}`
    }))
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteContent.brand.siteUrl },
      { "@type": "ListItem", position: 2, name: "Library", item: `${siteContent.brand.siteUrl}/library` },
      { "@type": "ListItem", position: 3, name: guide.title, item: canonical }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbs) }} />
      <GuideArticle guide={guide} related={getRelatedGuides(guide.relatedSlugs)} />
    </>
  );
}
