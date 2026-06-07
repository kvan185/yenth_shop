import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactConversionForm } from '@/components/ContactConversionForm';

export const metadata: Metadata = {
  title: 'Thiết kế web chuyên nghiệp cho cá nhân, cửa hàng và dịch vụ nhỏ',
  description:
    'Dịch vụ thiết kế web chuyên nghiệp: website bán hàng, landing page, portfolio, Local SEO, schema, tracking chuyển đổi và form nhận lead.',
  keywords: [
    'thiết kế web',
    'dịch vụ thiết kế web',
    'thiết kế web chuyên nghiệp',
    'thiết kế web bán hàng',
    'thiết kế web tại TP Hồ Chí Minh',
  ],
  alternates: {
    canonical: '/thiet-ke-web',
  },
  openGraph: {
    title: 'Thiết kế web chuyên nghiệp có SEO, tracking và form chuyển đổi',
    description:
      'YenTH Shop thiết kế web cho cá nhân, cửa hàng và dịch vụ nhỏ cần trang web rõ dịch vụ, đáng tin và đo được lead.',
    url: '/thiet-ke-web',
    type: 'website',
  },
};

const benefits = [
  'Bố cục rõ offer, proof và CTA ngay đầu trang',
  'Nội dung SEO nền cho từ khóa dịch vụ và khu vực phục vụ',
  'Schema, sitemap, robots.txt, Open Graph và favicon đầy đủ',
  'Tracking CTA, Zalo, phone, email và form submit',
  'Form conversion hỏi đúng nhu cầu, ngân sách và timeline',
  'Bàn giao mã nguồn, hướng dẫn quản trị và checklist public',
];

const useCases = [
  {
    title: 'Thiết kế web bán hàng',
    text: 'Phù hợp cửa hàng nhỏ cần giới thiệu sản phẩm, chính sách, hình ảnh thật, nút gọi/Zalo và nội dung đủ rõ để khách hỏi mua.',
  },
  {
    title: 'Thiết kế web dịch vụ',
    text: 'Phù hợp spa, tư vấn, lớp học, sửa chữa, studio hoặc dịch vụ địa phương cần landing page có form đặt lịch.',
  },
  {
    title: 'Thiết kế web cá nhân',
    text: 'Phù hợp freelancer, chuyên gia, creator cần portfolio đáng tin, câu chuyện rõ và CTA nhận dự án.',
  },
];

const industryPages = [
  ['Web bán yến', '/thiet-ke-web-ban-yen'],
  ['Web spa', '/thiet-ke-web-spa'],
  ['Web nha khoa', '/thiet-ke-web-nha-khoa'],
  ['Web nhà hàng', '/thiet-ke-web-nha-hang'],
  ['Web giáo viên/khóa học', '/thiet-ke-web-giao-vien-khoa-hoc'],
];

const seoSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Thiết kế web chuyên nghiệp',
  provider: {
    '@type': 'ProfessionalService',
    name: 'YenTH Shop',
    url: 'https://yenth.shop',
    telephone: '+84375266538',
  },
  areaServed: ['TP. Hồ Chí Minh', 'Bình Thạnh', 'Thủ Đức', 'Gò Vấp', 'Quận 1', 'Việt Nam'],
  serviceType: ['Thiết kế web', 'Thiết kế website bán hàng', 'Thiết kế landing page', 'Local SEO'],
  url: 'https://yenth.shop/thiet-ke-web',
};

export default function WebDesignLandingPage() {
  return (
    <main className="keyword-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }} />
      <header className="keyword-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">Thiết kế web</p>
        <h1>Thiết kế web chuyên nghiệp cho người kinh doanh nhỏ cần khách liên hệ thật.</h1>
        <p>
          YenTH Shop thiết kế web bán hàng, landing page dịch vụ và portfolio cá nhân với nền SEO,
          Local SEO, tracking chuyển đổi và form nhận lead ngay từ khi public.
        </p>
        <div className="hero-actions">
          <Link href="#tu-van" className="btn btn-primary" data-track="keyword_page_cta_click">
            Nhận audit web miễn phí
          </Link>
          <Link href="/#proof" className="btn btn-secondary">
            Xem mẫu đã dựng
          </Link>
        </div>
      </header>

      <section className="keyword-section keyword-benefits">
        <div className="redesign-heading">
          <p className="eyebrow">Khi làm web cần có gì?</p>
          <h2>Một trang web tốt phải vừa đáng tin với khách, vừa dễ hiểu với Google.</h2>
        </div>
        <div className="keyword-benefit-grid">
          {benefits.map((benefit) => (
            <article key={benefit}>
              <span>✓</span>
              <p>{benefit}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="keyword-section keyword-usecases">
        <div className="redesign-heading">
          <p className="eyebrow">Dịch vụ thiết kế web</p>
          <h2>Tập trung vào những nhóm website có khả năng tạo lead rõ nhất.</h2>
        </div>
        <div className="offer-grid">
          {useCases.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="keyword-section industry-link-lab">
        <div className="redesign-heading">
          <p className="eyebrow">Theo ngành</p>
          <h2>Chọn trang gần ngành của bạn để xem cấu trúc nội dung và SEO phù hợp hơn.</h2>
        </div>
        <div className="industry-link-grid">
          {industryPages.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="keyword-section keyword-seo-copy">
        <div>
          <p className="eyebrow">SEO cho từ khóa thiết kế web</p>
          <h2>Muốn cạnh tranh từ khóa “thiết kế web”, website cần cả nội dung, độ tin cậy và tín hiệu ngoài trang.</h2>
        </div>
        <p>
          Trang này được xây để Google hiểu YenTH Shop cung cấp dịch vụ thiết kế web cho cá nhân,
          cửa hàng và dịch vụ nhỏ. Tuy nhiên, để có cơ hội lên cao với từ khóa rộng như “thiết kế
          web”, bạn cần duy trì blog SEO, Google Business Profile, backlink chất lượng, tốc độ tốt,
          nội dung case study thật và tín hiệu thương hiệu nhất quán.
        </p>
      </section>

      <section id="tu-van" className="redesign-contact">
        <div>
          <p className="eyebrow">Tư vấn thiết kế web</p>
          <h2>Gửi nhu cầu để nhận hướng triển khai, cấu trúc trang và chi phí dự kiến.</h2>
          <p>
            Nếu bạn muốn website có cơ hội SEO tốt hơn, hãy mô tả ngành nghề, khu vực phục vụ,
            nhóm khách hàng và mục tiêu chính: bán hàng, đặt lịch hay nhận tư vấn.
          </p>
        </div>
        <ContactConversionForm />
      </section>
    </main>
  );
}
