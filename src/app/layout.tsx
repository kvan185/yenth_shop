import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://yenth.shop'),
  applicationName: 'YenTH Tử Vi',
  title: {
    default: 'YenTH Tử Vi - Xem tử vi cá nhân, bói tình duyên và ngày tốt',
    template: '%s | YenTH Tử Vi',
  },
  description:
    'Web tử vi cá nhân hóa: xem vận trình hôm nay, bói tình duyên, chọn ngày tốt và mở khóa báo cáo chuyên sâu.',
  keywords: [
    'tử vi',
    'xem bói',
    'xem tử vi hôm nay',
    'bói tình yêu',
    'xem ngày tốt',
    'lá số tử vi',
    'tử vi 2026',
  ],
  openGraph: {
    title: 'YenTH Tử Vi - Xem tử vi cá nhân hóa',
    description: 'Nhập ngày sinh để nhận bản đọc nhanh về tình duyên, tài lộc, sự nghiệp và ngày tốt.',
    url: '/',
    siteName: 'YenTH Tử Vi',
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
  themeColor: '#132022',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
