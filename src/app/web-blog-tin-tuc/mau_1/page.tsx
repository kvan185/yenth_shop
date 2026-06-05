import type { Metadata } from 'next';
import { BlogNewsDemo } from '@/components/BlogNewsDemo';

export const metadata: Metadata = {
  applicationName: 'Insight Daily',
  metadataBase: new URL('https://insightdaily.local'),
  title: {
    absolute: 'Insight Daily - Web blog / tin tức',
  },
  description:
    'Mẫu web blog / tin tức có bài nổi bật, chuyên mục, danh sách bài viết, sidebar xu hướng, newsletter và hệ thống nội dung.',
  keywords: ['Insight Daily', 'web blog', 'web tin tức', 'newsletter', 'SEO content'],
  alternates: {
    canonical: '/web-blog-tin-tuc/mau_1',
  },
  openGraph: {
    title: 'Insight Daily - Web blog / tin tức',
    description: 'Mẫu blog/tin tức có featured story, chuyên mục, bài mới, trending sidebar và newsletter.',
    url: '/',
    siteName: 'Insight Daily',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Insight Daily - Web blog / tin tức',
    description: 'Mẫu blog/tin tức có bài nổi bật, chuyên mục, bài mới và newsletter.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function BlogNewsDemoPage() {
  return <BlogNewsDemo />;
}
