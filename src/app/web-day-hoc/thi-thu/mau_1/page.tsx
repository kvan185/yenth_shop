import type { Metadata } from 'next';
import { MockExamDemo } from '@/components/MockExamDemo';

export const metadata: Metadata = {
  applicationName: 'EduTest',
  metadataBase: new URL('https://edutest.local'),
  title: {
    absolute: 'EduTest - Web dạy học thi thử online',
  },
  description:
    'Mẫu web dạy học có thi thử online, danh sách đề, phòng thi trắc nghiệm, đồng hồ, chấm điểm tự động, báo cáo lớp và form tư vấn.',
  keywords: ['web dạy học', 'thi thử online', 'luyện thi online', 'chấm điểm tự động', 'quản lý lớp học'],
  alternates: {
    canonical: '/web-day-hoc/thi-thu/mau_1',
  },
  openGraph: {
    title: 'EduTest - Web dạy học thi thử online',
    description: 'Mẫu web dạy học có đề thi thử, phòng thi online, chấm điểm và báo cáo lớp.',
    url: '/',
    siteName: 'EduTest',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'EduTest - Web dạy học thi thử online',
    description: 'Mẫu web thi thử online cho giáo viên, trung tâm và lớp luyện thi.',
  },
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
  },
  manifest: null,
  verification: {},
};

export default function MockExamDemoPage() {
  return <MockExamDemo />;
}
