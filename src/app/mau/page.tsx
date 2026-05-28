import type { Metadata } from 'next';
import Link from 'next/link';
import { templates } from '@/data/templates';

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
        <h1>Chọn mẫu website theo ngành trước, rồi tinh chỉnh theo thương hiệu của bạn.</h1>
        <p>
          Khách không cần mô tả mơ hồ. Hãy chọn một mẫu gần với nhu cầu nhất, tôi sẽ thay nội dung,
          màu sắc, CTA, SEO và form theo dịch vụ thật của bạn.
        </p>
      </section>
      <section className="template-catalog-grid">
        {templates.map((template) => (
          <article className="template-choice-card" key={template.slug} style={{ borderTopColor: template.accent }}>
            <span>{template.category}</span>
            <h2>{template.title}</h2>
            <p>{template.description}</p>
            <strong>Phù hợp: {template.bestFor}</strong>
            <div>
              {template.features.map((feature) => (
                <small key={feature}>{feature}</small>
              ))}
            </div>
            <Link href={`/mau/${template.slug}`}>Xem mẫu này</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
