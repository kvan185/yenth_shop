import type { MetadataRoute } from 'next';

const SITE_URL = 'https://yenth.shop';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/GameMini/',
          '/dang-nhap',
          '/dang-ky',
          '/landing-page-dich-vu/',
          '/web-ban-hang-don-gian-cho-doanh-nghiep-nho/',
          '/web-blog-tin-tuc/',
          '/web-chuc-nang-rieng/',
          '/web-day-hoc/',
          '/web-gioi-thieu-doanh-nghiep/',
          '/web-gioi-thieu-san-pham/',
          '/web-mang-xa-hoi/',
          '/web-portfolio-ca-nhan/',
          '/web-tu-van-dat-lich/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
