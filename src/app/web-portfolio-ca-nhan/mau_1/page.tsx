import type { Metadata } from 'next';
import { PersonalPortfolioDemo } from '@/components/PersonalPortfolioDemo';

export const metadata: Metadata = {
  applicationName: 'Linh Studio',
  metadataBase: new URL('https://linhstudio.local'),
  title: {
    absolute: 'Linh Studio - Web portfolio cá nhân',
  },
  description:
    'Mẫu web portfolio cá nhân có hero, dự án nổi bật, kỹ năng, kinh nghiệm, testimonial và form liên hệ nhận brief.',
  keywords: ['Linh Studio', 'portfolio cá nhân', 'freelancer portfolio', 'case study', 'form brief'],
  alternates: {
    canonical: '/web-portfolio-ca-nhan/mau_1',
  },
  openGraph: {
    title: 'Linh Studio - Web portfolio cá nhân',
    description: 'Mẫu portfolio cá nhân cho freelancer, chuyên gia hoặc creator.',
    url: '/',
    siteName: 'Linh Studio',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Linh Studio - Web portfolio cá nhân',
    description: 'Mẫu portfolio cá nhân cho freelancer, chuyên gia hoặc creator.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function PersonalPortfolioDemoPage() {
  return <PersonalPortfolioDemo />;
}
