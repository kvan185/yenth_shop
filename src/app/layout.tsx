import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://yenth.shop'),
  title: {
    default: 'YenTH Shop - Dịch vụ xây dựng website online',
    template: '%s | YenTH Shop',
  },
  description:
    'YenTH Shop là trang giới thiệu cá nhân và dịch vụ xây dựng website online cho cá nhân, cửa hàng và doanh nghiệp nhỏ.',
  keywords: [
    'yenth.shop',
    'dịch vụ làm website',
    'thiết kế website',
    'xây dựng web online',
    'website bán hàng',
    'website giới thiệu',
  ],
  openGraph: {
    title: 'YenTH Shop - Dịch vụ xây dựng website online',
    description: 'Thiết kế website gọn, đẹp, dễ quản trị và sẵn sàng tìm khách từ Google.',
    url: 'https://yenth.shop',
    siteName: 'YenTH Shop',
    locale: 'vi_VN',
    type: 'website',
    images: ['/images/hero-workspace.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
