import type { Metadata } from 'next';
import { SmallBusinessShopDemo } from '@/components/SmallBusinessShopDemo';

export const metadata: Metadata = {
  applicationName: 'YenNest',
  metadataBase: new URL('https://yennest.local'),
  title: {
    absolute: 'YenNest - Yến sào nguyên chất',
  },
  description:
    'YenNest bán yến sào nguyên chất với sản phẩm nổi bật, giỏ hàng, form đặt hàng, review, blog, FAQ và liên hệ nhanh.',
  keywords: ['YenNest', 'yến sào nguyên chất', 'tổ yến', 'nước yến', 'quà biếu sức khỏe'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'YenNest - Yến sào nguyên chất',
    description:
      'Website bán hàng nhỏ gọn cho thương hiệu yến sào: sản phẩm, giỏ hàng, đặt hàng, review, FAQ và liên hệ nhanh.',
    url: '/',
    siteName: 'YenNest',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'YenNest - Yến sào nguyên chất',
    description: 'Website bán hàng nhỏ gọn cho thương hiệu yến sào.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function SmallBusinessShopDemoPage() {
  return <SmallBusinessShopDemo />;
}
