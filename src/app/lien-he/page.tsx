import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactConversionForm } from '@/components/ContactConversionForm';

export const metadata: Metadata = {
  title: 'Liên hệ tư vấn thiết kế web',
  description:
    'Gửi nhu cầu thiết kế web để nhận hướng triển khai, cấu trúc trang, SEO, CTA và chi phí dự kiến từ YenTH Shop.',
  alternates: {
    canonical: '/lien-he',
  },
};

export default function ContactPage() {
  return (
    <main className="simple-page">
      <section className="simple-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">/lien-he</p>
        <h1>Gửi nhu cầu thiết kế web để nhận audit miễn phí trong 24h.</h1>
      </section>
      <section className="simple-contact">
        <div>
          <h2>Thông tin liên hệ</h2>
          <p>Hotline/Zalo: 0375 266 538</p>
          <p>Email: khanhvan18052004@gmail.com</p>
        </div>
        <ContactConversionForm />
      </section>
    </main>
  );
}
