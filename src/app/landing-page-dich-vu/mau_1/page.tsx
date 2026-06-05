import type { Metadata } from 'next';
import { ServiceLandingDemo } from '@/components/ServiceLandingDemo';

export const metadata: Metadata = {
  applicationName: 'GlowSkin',
  metadataBase: new URL('https://glowskin.local'),
  title: {
    absolute: 'GlowSkin - Landing page dịch vụ',
  },
  description:
    'Mẫu landing page dịch vụ có offer, gói giá, quy trình, đánh giá, FAQ và form đặt lịch tư vấn.',
  keywords: ['GlowSkin', 'landing page dịch vụ', 'đặt lịch spa', 'form tư vấn', 'gói dịch vụ'],
  alternates: {
    canonical: '/landing-page-dich-vu/mau_1',
  },
  openGraph: {
    title: 'GlowSkin - Landing page dịch vụ',
    description: 'Landing page dịch vụ có offer, gói giá, quy trình, đánh giá, FAQ và form đặt lịch.',
    url: '/',
    siteName: 'GlowSkin',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'GlowSkin - Landing page dịch vụ',
    description: 'Landing page dịch vụ có gói giá, quy trình, review, FAQ và form đặt lịch.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function ServiceLandingDemoPage() {
  return <ServiceLandingDemo />;
}
