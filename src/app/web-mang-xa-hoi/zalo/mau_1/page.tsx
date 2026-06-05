import type { Metadata } from 'next';
import { SocialZaloDemo } from '@/components/SocialZaloDemo';

export const metadata: Metadata = {
  applicationName: 'ZaloWork',
  metadataBase: new URL('https://zalowork.local'),
  title: {
    absolute: 'ZaloWork - Mẫu web chat kiểu Zalo',
  },
  description:
    'Mẫu web chat kiểu Zalo với danh sách hội thoại, khung tin nhắn, gửi nhanh, danh bạ, nhóm, cuộc gọi và thông tin khách hàng.',
  keywords: ['ZaloWork', 'mẫu chat', 'web nhắn tin', 'danh bạ', 'nhóm chat', 'CRM chat'],
  alternates: {
    canonical: '/web-mang-xa-hoi/zalo/mau_1',
  },
  openGraph: {
    title: 'ZaloWork - Mẫu web chat kiểu Zalo',
    description: 'Mẫu web chat với hội thoại, gửi tin, gọi, nhóm, danh bạ và ghi chú khách hàng.',
    url: '/',
    siteName: 'ZaloWork',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'ZaloWork - Mẫu web chat kiểu Zalo',
    description: 'Mẫu web chat với hội thoại, gửi tin, gọi, nhóm, danh bạ và ghi chú khách hàng.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function SocialZaloDemoPage() {
  return <SocialZaloDemo />;
}
