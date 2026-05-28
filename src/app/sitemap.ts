import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';

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
      url: `${SITE_URL}/home`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/danh-muc`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_1`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2/san-pham`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.76,
    },
    {
      url: `${SITE_URL}/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2/gioi-thieu`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${SITE_URL}/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2/blog`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${SITE_URL}/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2/chung-nhan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${SITE_URL}/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2/lien-he`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.74,
    },
    {
      url: `${SITE_URL}/web-mang-xa-hoi/facebook/mau_1`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/web-mang-xa-hoi/zalo/mau_1`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/web-gioi-thieu-san-pham/mau_1`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/landing-page-dich-vu/mau_1`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/web-gioi-thieu-doanh-nghiep/mau_1`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/web-tu-van-dat-lich/mau_1`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/web-portfolio-ca-nhan/mau_1`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/web-blog-tin-tuc/mau_1`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
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

  return [...staticRoutes, ...blogRoutes];
}
