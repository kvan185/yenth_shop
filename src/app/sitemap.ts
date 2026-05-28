import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';
import { templates } from '@/data/templates';
import { sampleSites } from '@/data/sampleSites';

const SITE_URL = 'https://yenth.shop';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-05-28');

  const staticRoutes: MetadataRoute.Sitemap = [
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
    {
      url: `${SITE_URL}/mau`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/dich-vu`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/bang-gia`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/quy-trinh`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/local-seo`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.86,
    },
    {
      url: `${SITE_URL}/lien-he`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/dang-nhap`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/dang-ky`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.45,
    },
    {
      url: `${SITE_URL}/thiet-ke-web`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));
  const templateRoutes: MetadataRoute.Sitemap = templates.map((template) => ({
    url: `${SITE_URL}/mau/${template.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.78,
  }));
  const sampleSiteRoutes: MetadataRoute.Sitemap = sampleSites.map((site) => ({
    url: `${SITE_URL}${site.href}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.76,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...templateRoutes,
    ...sampleSiteRoutes,
  ];
}
