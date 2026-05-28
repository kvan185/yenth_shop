import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Local SEO cho website dịch vụ',
  description:
    'Local SEO cho website dịch vụ tại TP. Hồ Chí Minh: NAP, schema, khu vực phục vụ, sitemap, Search Console và nội dung địa phương.',
  alternates: {
    canonical: '/local-seo',
  },
};

const areas = ['Bình Thạnh', 'Thủ Đức', 'Gò Vấp', 'Quận 1', 'TP. Hồ Chí Minh', 'Online toàn quốc'];

export default function LocalSeoPage() {
  return (
    <main className="simple-page">
      <section className="simple-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">/local-seo</p>
        <h1>Local SEO giúp Google hiểu bạn phục vụ khu vực nào và dịch vụ gì.</h1>
        <p>YenTH Shop tối ưu NAP, schema, sitemap, robots, Search Console và nội dung khu vực.</p>
      </section>
      <section className="simple-tags">
        {areas.map((area) => (
          <span key={area}>{area}</span>
        ))}
      </section>
    </main>
  );
}
