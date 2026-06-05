import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';
import { seoLandingPages } from '@/data/seoLandingPages';

const SITE_URL = 'https://yenth.shop';
const NOINDEX_PATH_PREFIXES = [
  '/GameMini',
  '/landing-page-dich-vu',
  '/web-ban-hang-don-gian-cho-doanh-nghiep-nho',
  '/web-blog-tin-tuc',
  '/web-chuc-nang-rieng',
  '/web-day-hoc',
  '/web-gioi-thieu-doanh-nghiep',
  '/web-gioi-thieu-san-pham',
  '/web-mang-xa-hoi',
  '/web-portfolio-ca-nhan',
  '/web-tu-van-dat-lich',
  '/dang-nhap',
  '/dang-ky',
];

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
      url: `${SITE_URL}/web-chuc-nang-rieng/mau_1`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.82,
    },
    {
      url: `${SITE_URL}/web-day-hoc/thi-thu/mau_1`,
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

  const seoClusterRoutes: MetadataRoute.Sitemap = seoLandingPages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.88,
  }));

  const indexableStaticRoutes = staticRoutes.filter((route) => {
    const path = new URL(route.url).pathname;

    return !NOINDEX_PATH_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
  });

  return [...indexableStaticRoutes, ...seoClusterRoutes, ...blogRoutes];
}
