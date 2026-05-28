import type { Metadata } from 'next';
import { ProductIntroDemo } from '@/components/ProductIntroDemo';

export const metadata: Metadata = {
  applicationName: 'PulseOne',
  metadataBase: new URL('https://pulseone.local'),
  title: {
    absolute: 'PulseOne - Web giới thiệu sản phẩm',
  },
  description:
    'Mẫu web giới thiệu sản phẩm với hero, gallery, lựa chọn màu, lợi ích, thông số, review, FAQ và form tư vấn.',
  keywords: ['PulseOne', 'web giới thiệu sản phẩm', 'landing product', 'thông số sản phẩm', 'form tư vấn'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PulseOne - Web giới thiệu sản phẩm',
    description: 'Mẫu web giới thiệu sản phẩm với đầy đủ lợi ích, thông số, review, FAQ và form tư vấn.',
    url: '/',
    siteName: 'PulseOne',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'PulseOne - Web giới thiệu sản phẩm',
    description: 'Mẫu web giới thiệu sản phẩm với lợi ích, thông số, review và form tư vấn.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function ProductIntroDemoPage() {
  return <ProductIntroDemo />;
}
