import type { Metadata } from 'next';
import { CustomFunctionDemo } from '@/components/CustomFunctionDemo';

export const metadata: Metadata = {
  applicationName: 'OpsFlow',
  metadataBase: new URL('https://opsflow.local'),
  title: {
    absolute: 'OpsFlow - Web chức năng riêng',
  },
  description:
    'Mẫu web chức năng riêng có dashboard, quản lý lead, bộ lọc trạng thái, module tùy biến, quy trình triển khai và form gửi brief chức năng.',
  keywords: ['web chức năng riêng', 'dashboard nội bộ', 'CRM mini', 'form nhiều bước', 'quản lý lead'],
  alternates: {
    canonical: '/web-chuc-nang-rieng/mau_1',
  },
  openGraph: {
    title: 'OpsFlow - Web chức năng riêng',
    description: 'Mẫu web chức năng riêng cho dashboard, CRM mini, form nhiều bước và tích hợp quy trình vận hành.',
    url: '/',
    siteName: 'OpsFlow',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'OpsFlow - Web chức năng riêng',
    description: 'Mẫu web chức năng riêng có dashboard, quản lý lead, bộ lọc trạng thái và form brief.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function CustomFunctionDemoPage() {
  return <CustomFunctionDemo />;
}
