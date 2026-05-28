import type { Metadata } from 'next';
import { CompanyIntroDemo } from '@/components/CompanyIntroDemo';

export const metadata: Metadata = {
  applicationName: 'NovaBuild',
  metadataBase: new URL('https://novabuild.local'),
  title: {
    absolute: 'NovaBuild - Web giới thiệu doanh nghiệp',
  },
  description:
    'Mẫu web giới thiệu doanh nghiệp có hero, năng lực, dịch vụ, dự án tiêu biểu, đội ngũ và form liên hệ B2B.',
  keywords: ['NovaBuild', 'web giới thiệu doanh nghiệp', 'hồ sơ năng lực', 'dịch vụ B2B', 'case study'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NovaBuild - Web giới thiệu doanh nghiệp',
    description: 'Mẫu website công ty nhỏ với năng lực, dịch vụ, dự án, đội ngũ và form liên hệ.',
    url: '/',
    siteName: 'NovaBuild',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'NovaBuild - Web giới thiệu doanh nghiệp',
    description: 'Mẫu website công ty nhỏ với năng lực, dịch vụ, dự án, đội ngũ và form liên hệ.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function CompanyIntroDemoPage() {
  return <CompanyIntroDemo />;
}
