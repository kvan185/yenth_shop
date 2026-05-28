import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YenTH Shop - Thiết kế website chuyên nghiệp',
    short_name: 'YenTH Shop',
    description:
      'Dịch vụ thiết kế website bán hàng, landing page, portfolio và tối ưu SEO nền tảng cho cá nhân, cửa hàng, doanh nghiệp nhỏ.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fbfaf6',
    theme_color: '#073c34',
    lang: 'vi',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
