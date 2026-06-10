import type { Metadata, Viewport } from 'next';
import { primaryDomain } from '@/lib/domainConfig';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://yenth.shop'),
  applicationName: `YenTH ${primaryDomain.shortName}`,
  title: {
    default: `YenTH ${primaryDomain.shortName} - Xem tử vi cá nhân, bói tình duyên và ngày tốt`,
    template: `%s | YenTH ${primaryDomain.shortName}`,
  },
  description:
    'Web huyền học cá nhân hóa: xem vận trình hôm nay, bói tình duyên, chọn ngày tốt và mở khóa báo cáo chuyên sâu.',
  keywords: [
    'tử vi',
    'xem bói',
    'xem tử vi hôm nay',
    'bói tình yêu',
    'xem ngày tốt',
    'lá số tử vi',
    'phong thủy',
  ],
  openGraph: {
    title: `YenTH ${primaryDomain.shortName} - Xem tử vi cá nhân hóa`,
    description: 'Nhập ngày sinh để nhận bản đọc nhanh về tình duyên, tài lộc, sự nghiệp và ngày tốt.',
    url: '/',
    siteName: `YenTH ${primaryDomain.shortName}`,
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2a241d',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
