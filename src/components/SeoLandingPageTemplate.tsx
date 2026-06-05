import Link from 'next/link';
import type { SeoLandingPage } from '@/data/seoLandingPages';
import { ContactConversionForm } from '@/components/ContactConversionForm';

type SeoLandingPageTemplateProps = {
  page: SeoLandingPage;
};

export function SeoLandingPageTemplate({ page }: SeoLandingPageTemplateProps) {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.description,
    provider: {
      '@type': 'ProfessionalService',
      name: 'YenTH Shop',
      url: 'https://yenth.shop',
      telephone: '+84375266538',
      email: 'khanhvan18052004@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '105 Ung Văn Khiêm',
        addressLocality: 'Bình Thạnh',
        addressRegion: 'TP. Hồ Chí Minh',
        addressCountry: 'VN',
      },
    },
    areaServed: page.areaServed,
    serviceType: page.serviceType,
    url: `https://yenth.shop/${page.slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: 'https://yenth.shop',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.title,
        item: `https://yenth.shop/${page.slug}`,
      },
    ],
  };

  return (
    <main className="keyword-page seo-cluster-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="keyword-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.h1}</h1>
        <p>{page.lead}</p>
        <div className="hero-actions">
          <Link href="#tu-van" className="btn btn-primary" data-track="seo_cluster_cta_click" data-track-category="conversion">
            Nhận audit miễn phí
          </Link>
          <Link href="/bang-gia" className="btn btn-secondary">
            Xem gói giá
          </Link>
        </div>
      </header>

      <section className="keyword-section keyword-usecases">
        <div className="redesign-heading">
          <p className="eyebrow">Ý định tìm kiếm</p>
          <h2>Trang này được viết cho nhóm khách đang tìm {page.primaryKeyword} và cần ra quyết định nhanh hơn.</h2>
        </div>
        <div className="offer-grid">
          {page.useCases.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="keyword-section seo-proof-block">
        <div>
          <p className="eyebrow">SEO & trust</p>
          <h2>Không chỉ dựng giao diện, trang cần đủ tín hiệu để khách và Google hiểu cùng một câu chuyện.</h2>
        </div>
        <div className="seo-proof-grid">
          {['Metadata và canonical đúng trang', 'Schema Service, FAQ và Breadcrumb', 'CTA Zalo, phone, form có tracking', 'Nội dung theo dịch vụ, khu vực và câu hỏi thật'].map((item) => (
            <article key={item}>
              <span>✓</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="keyword-section faq-section">
        <div className="redesign-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Câu hỏi khách thường cần trả lời trước khi để lại thông tin.</h2>
        </div>
        <div className="faq-grid">
          {page.faqs.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="tu-van" className="redesign-contact">
        <div>
          <p className="eyebrow">Tư vấn triển khai</p>
          <h2>Gửi nhu cầu để nhận cấu trúc trang, hướng SEO và chi phí dự kiến.</h2>
          <p>
            Hãy mô tả ngành nghề, khu vực phục vụ, nhóm khách hàng và mục tiêu chính. Phần còn lại tôi sẽ gợi ý theo
            landing page, website bán hàng hoặc website nhiều trang.
          </p>
        </div>
        <ContactConversionForm />
      </section>
    </main>
  );
}
