'use client';

import { usePathname } from 'next/navigation';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';

const isolatedPrefixes = [
  '/web-ban-hang-don-gian-cho-doanh-nghiep-nho',
  '/web-mang-xa-hoi',
  '/web-gioi-thieu-san-pham',
  '/landing-page-dich-vu',
  '/web-gioi-thieu-doanh-nghiep',
  '/web-tu-van-dat-lich',
  '/web-portfolio-ca-nhan',
  '/web-blog-tin-tuc',
];

export function SiteChrome() {
  const pathname = usePathname();
  const isIsolatedTemplate = isolatedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (isIsolatedTemplate) {
    return null;
  }

  return (
    <>
      <SiteHeader />
      <SiteFooter />
    </>
  );
}
