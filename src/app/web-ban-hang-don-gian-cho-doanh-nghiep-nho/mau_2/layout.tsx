import type { Metadata } from 'next';

export const metadata: Metadata = {
  applicationName: 'YenNest',
  metadataBase: new URL('https://yennest.local'),
  title: {
    default: 'YenNest - Yến sào nguyên chất',
    template: '%s | YenNest',
  },
  description: 'Website bán hàng nhiều trang cho thương hiệu yến sào: sản phẩm, giới thiệu, blog, chứng nhận và liên hệ.',
  keywords: ['YenNest', 'yến sào', 'tổ yến', 'web bán hàng', 'doanh nghiệp nhỏ'],
  alternates: {
    canonical: '/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2',
  },
  openGraph: {
    title: 'YenNest - Yến sào nguyên chất',
    description: 'Website bán hàng nhiều trang cho thương hiệu yến sào.',
    url: '/',
    siteName: 'YenNest',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'YenNest - Yến sào nguyên chất',
    description: 'Website bán hàng nhiều trang cho thương hiệu yến sào.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function Mau2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
