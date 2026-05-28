import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bảng giá thiết kế web',
  description:
    'Bảng giá tham khảo cho dịch vụ thiết kế web: Starter, Growth và Custom tùy theo nhu cầu SEO, tracking và tính năng.',
  alternates: {
    canonical: '/bang-gia',
  },
};

const packages = [
  ['Starter', '2.900.000đ', 'Một trang giới thiệu gọn, CTA rõ, responsive và metadata cơ bản.'],
  ['Growth', '5.900.000đ', 'Website/landing page có proof, Local SEO, schema, tracking và form conversion.'],
  ['Custom', 'Từ 12.000.000đ', 'Nhiều trang, blog SEO, quản lý sản phẩm, đặt lịch hoặc tích hợp riêng.'],
];

export default function PricingPage() {
  return (
    <main className="simple-page">
      <section className="simple-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">/bang-gia</p>
        <h1>Bảng giá thiết kế web được chia theo mức độ chuyển đổi và SEO.</h1>
        <p>Gói Custom là neo giá trị, Growth là lựa chọn cân bằng nhất cho đa số dịch vụ nhỏ.</p>
      </section>
      <section className="simple-grid-section">
        {packages.map(([name, price, text]) => (
          <article key={name}>
            <h2>{name}</h2>
            <strong>{price}</strong>
            <p>{text}</p>
            <Link href="/lien-he">Trao đổi gói này</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
