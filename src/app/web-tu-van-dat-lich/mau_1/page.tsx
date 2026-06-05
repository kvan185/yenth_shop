import type { Metadata } from 'next';
import { BookingConsultDemo } from '@/components/BookingConsultDemo';

export const metadata: Metadata = {
  applicationName: 'ClarityCall',
  metadataBase: new URL('https://claritycall.local'),
  title: {
    absolute: 'ClarityCall - Web tư vấn / đặt lịch',
  },
  description:
    'Mẫu web tư vấn và đặt lịch có chọn dịch vụ, chọn khung giờ, chuyên gia, brief, form xác nhận và FAQ.',
  keywords: ['ClarityCall', 'web đặt lịch', 'tư vấn online', 'booking form', 'chọn khung giờ'],
  alternates: {
    canonical: '/web-tu-van-dat-lich/mau_1',
  },
  openGraph: {
    title: 'ClarityCall - Web tư vấn / đặt lịch',
    description: 'Mẫu web đặt lịch với chọn dịch vụ, khung giờ, chuyên gia, brief và form xác nhận.',
    url: '/',
    siteName: 'ClarityCall',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'ClarityCall - Web tư vấn / đặt lịch',
    description: 'Mẫu web đặt lịch với chọn dịch vụ, khung giờ, chuyên gia và form xác nhận.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function BookingConsultDemoPage() {
  return <BookingConsultDemo />;
}
