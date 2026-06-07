import type { Metadata } from 'next';
import Link from 'next/link';
import { NeedPicker } from '@/components/NeedPicker';
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
  {
    title: 'Thiết kế web bán hàng',
    problem: 'Sản phẩm có nhưng khách phải hỏi đi hỏi lại giá trị, chính sách và cách mua.',
    solution: 'Dựng trang sản phẩm, lợi ích, proof, chính sách và CTA Zalo/gọi/form ở đúng điểm ra quyết định.',
    demo: '/web-ban-hang-don-gian-cho-doanh-nghiep-nho/mau_2',
  },
  {
    title: 'Thiết kế landing page',
    problem: 'Chạy quảng cáo hoặc đăng bài có lượt xem nhưng khách chưa để lại thông tin.',
    solution: 'Một trang tập trung offer, lợi ích, bảng giá, FAQ, form và tracking chuyển đổi.',
    demo: '/landing-page-dich-vu/mau_1',
  },
  {
    title: 'Thiết kế portfolio',
    problem: 'Hồ sơ, dự án và dịch vụ nằm rải rác nên thiếu cảm giác chuyên nghiệp.',
    solution: 'Gom câu chuyện, năng lực, dự án, dịch vụ và form nhận brief vào một hồ sơ online đáng tin.',
    demo: '/web-portfolio-ca-nhan/mau_1',
  },
  {
    title: 'SEO & tracking nền tảng',
    problem: 'Website đẹp nhưng khó biết khách đến từ đâu, bấm gì và Google hiểu trang ra sao.',
    solution: 'Chuẩn bị metadata, sitemap, robots, schema, Open Graph, Search Console và event tracking.',
    demo: '/local-seo',
  },
];

const technicalSignals = [
  ['Mobile first', 'Ưu tiên tốc độ đọc và nút liên hệ trên điện thoại.'],
  ['Social preview', 'Link gửi qua Zalo/Facebook có tiêu đề, mô tả và ảnh đại diện rõ.'],
  ['Search-ready', 'Có sitemap, robots, schema và cấu trúc heading dễ hiểu.'],
  ['Conversion tracking', 'Sẵn event cho form, phone, Zalo, email và CTA chính.'],
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
      <NeedPicker />
      <section className="simple-grid-section service-detail-grid">
        {services.map((item) => (
          <article key={item.title}>
            <h2>{item.title}</h2>
            <dl>
              <div>
                <dt>Vấn đề</dt>
                <dd>{item.problem}</dd>
              </div>
              <div>
                <dt>Giải pháp</dt>
                <dd>{item.solution}</dd>
              </div>
            </dl>
            <Link href={item.demo}>Xem demo liên quan</Link>
          </article>
        ))}
      </section>
      <section className="simple-grid-section technical-signal-grid">
        {technicalSignals.map(([title, text]) => (
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
