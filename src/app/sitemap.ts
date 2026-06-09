import type { MetadataRoute } from 'next';
import { seoPages } from '@/lib/businessData';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://yenth.shop';

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${base}/cong-cu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...seoPages.map((page) => ({
      url: `${base}/seo/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.82,
    })),
  ];
}
