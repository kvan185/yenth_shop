import type { Metadata } from 'next';
import Link from 'next/link';
import { seoLandingPages } from '@/data/seoLandingPages';

export const metadata: Metadata = {
  title: 'Dịch vụ thiết kế web',
  description:
    'Các dịch vụ thiết kế web của YenTH Shop: website bán hàng, landing page dịch vụ, portfolio cá nhân và tối ưu SEO nền tảng.',
  alternates: {
    canonical: '/dich-vu',
  },
};

const services = [
  ['Thiết kế web bán hàng', 'Trang giới thiệu sản phẩm, chính sách, nút Zalo/gọi nhanh và form nhận nhu cầu.'],
  ['Thiết kế landing page', 'Một trang tập trung chuyển đổi cho spa, lớp học, tư vấn, sửa chữa, studio hoặc dịch vụ địa phương.'],
  ['Thiết kế portfolio', 'Hồ sơ cá nhân/chuyên gia có câu chuyện, dịch vụ, dự án nổi bật và form liên hệ rõ ràng.'],
  ['SEO & tracking nền tảng', 'Metadata, sitemap, robots.txt, schema, Open Graph, Search Console và event tracking.'],
];

export default function ServicesPage() {
  return (
    <main className="simple-page">
      <section className="simple-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">/dich-vu</p>
        <h1>Dịch vụ thiết kế web cho người kinh doanh nhỏ cần khách liên hệ thật.</h1>
        <p>Chọn đúng loại website trước, rồi mới tối ưu nội dung, CTA, Local SEO và tracking.</p>
      </section>
      <section className="simple-grid-section">
        {services.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="simple-grid-section seo-cluster-list">
        {seoLandingPages.map((page) => (
          <article key={page.slug}>
            <span>{page.eyebrow}</span>
            <h2>{page.title}</h2>
            <p>{page.description}</p>
            <Link href={`/${page.slug}`}>Xem trang dịch vụ</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
