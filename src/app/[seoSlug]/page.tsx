import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeoLandingPageTemplate } from '@/components/SeoLandingPageTemplate';
import { getSeoLandingPage, seoLandingPages } from '@/data/seoLandingPages';

type SeoClusterPageProps = {
  params: Promise<{
    seoSlug: string;
  }>;
};

export function generateStaticParams() {
  return seoLandingPages.map((page) => ({
    seoSlug: page.slug,
  }));
}

export async function generateMetadata({ params }: SeoClusterPageProps): Promise<Metadata> {
  const { seoSlug } = await params;
  const page = getSeoLandingPage(seoSlug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.serviceType, ...page.areaServed],
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/${page.slug}`,
      type: 'website',
    },
  };
}

export default async function SeoClusterPage({ params }: SeoClusterPageProps) {
  const { seoSlug } = await params;
  const page = getSeoLandingPage(seoSlug);

  if (!page) {
    notFound();
  }

  return <SeoLandingPageTemplate page={page} />;
}
