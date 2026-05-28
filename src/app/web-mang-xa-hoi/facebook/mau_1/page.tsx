import type { Metadata } from 'next';
import { SocialFacebookDemo } from '@/components/SocialFacebookDemo';

export const metadata: Metadata = {
  applicationName: 'FaceSpace',
  metadataBase: new URL('https://facespace.local'),
  title: {
    absolute: 'FaceSpace - Mẫu web mạng xã hội',
  },
  description:
    'Mẫu web mạng xã hội kiểu Facebook với bảng tin, stories, đăng bài, like, bình luận, nhóm, liên hệ và sidebar.',
  keywords: ['FaceSpace', 'mạng xã hội', 'bảng tin', 'nhóm cộng đồng', 'web social'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FaceSpace - Mẫu web mạng xã hội',
    description: 'Mẫu web mạng xã hội với feed, stories, đăng bài, like, bình luận, nhóm và chat.',
    url: '/',
    siteName: 'FaceSpace',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'FaceSpace - Mẫu web mạng xã hội',
    description: 'Mẫu web mạng xã hội với feed, stories, đăng bài, like, bình luận, nhóm và chat.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function SocialFacebookDemoPage() {
  return <SocialFacebookDemo />;
}
