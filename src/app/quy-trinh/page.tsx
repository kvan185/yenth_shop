import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quy trình thiết kế web',
  description:
    'Quy trình thiết kế web thực tế: audit, wireframe, build, tracking, SEO, public và bàn giao tài sản.',
  alternates: {
    canonical: '/quy-trinh',
  },
};

const steps = [
  ['01', 'Audit & brief', 'Làm rõ mục tiêu, dịch vụ chính, khách hàng, khu vực phục vụ và tài sản nội dung.'],
  ['02', 'Wireframe & copy', 'Sắp xếp hero, proof, offer, giá, cam kết, form và nội dung SEO theo hành trình đọc.'],
  ['03', 'Build & measure', 'Code giao diện, tối ưu mobile, thêm schema, sitemap, Open Graph và tracking event.'],
  ['04', 'Launch & handoff', 'Public domain, kiểm tra form/link, kết nối Search Console và bàn giao cách quản trị.'],
];

export default function ProcessPage() {
  return (
    <main className="simple-page">
      <section className="simple-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">/quy-trinh</p>
        <h1>Quy trình thiết kế web có đầu ra rõ ở từng bước.</h1>
      </section>
      <section className="simple-list-section">
        {steps.map(([number, title, text]) => (
          <article key={number}>
            <span>{number}</span>
            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
