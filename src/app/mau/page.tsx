import type { Metadata } from 'next';
import Link from 'next/link';
import { sampleSites } from '@/data/sampleSites';

export const metadata: Metadata = {
  title: 'Mẫu website để khách hàng lựa chọn',
  description:
    'Thư viện mẫu website theo ngành: bán hàng, spa/dịch vụ, nhà hàng/cafe, portfolio chuyên gia và doanh nghiệp nhỏ.',
  alternates: {
    canonical: '/mau',
  },
};

export default function TemplateCatalogPage() {
  return (
    <main className="template-catalog-page">
      <section className="simple-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">/mau</p>
        <h1>Chọn một website mẫu hoàn chỉnh trước, rồi tôi tinh chỉnh theo thương hiệu của bạn.</h1>
        <p>
          Mỗi mẫu nằm ở một link riêng như một website thật. Khách chỉ cần mở mẫu, chọn kiểu gần
          nhất với nhu cầu, rồi tôi thay nội dung, màu sắc, CTA, SEO và tính năng theo ngành của họ.
        </p>
      </section>
      <section className="template-catalog-grid">
        {sampleSites.map((site) => (
          <article className="template-choice-card" key={site.href}>
            <span>{site.name} - {site.type}</span>
            <h2>{site.title}</h2>
            <p>{site.description}</p>
            <strong>Link mẫu: {site.href}</strong>
            <Link href={site.href}>Truy cập website mẫu</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
