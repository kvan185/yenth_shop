import type { MetadataRoute } from 'next';

const SITE_URL = 'https://yenth.shop';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-05-28');

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/mau/portfolio`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/mau/landing-page-dich-vu`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
