import Link from 'next/link';
import { monetizationItems, seoPages } from '@/lib/businessData';

export const metadata = {
  title: 'Dashboard quản trị tử vi',
};

export default function AdminPage() {
  return (
    <main className="admin-page">
      <header className="simple-header">
        <Link href="/">YenTH Tử Vi</Link>
        <nav>
          <Link href="/cong-cu">Công cụ</Link>
          <Link href="/">Trang chủ</Link>
        </nav>
      </header>
      <section className="tool-hero">
        <span className="section-kicker">Admin MVP</span>
        <h1>Dashboard doanh thu, lead và nội dung</h1>
        <p>Bản này là khung quản trị tinh gọn để mở rộng thành auth/database thật.</p>
      </section>
      <section className="metric-grid">
        <article><strong>48K</strong><span>Giá báo cáo premium</span></article>
        <article><strong>{seoPages.length}</strong><span>Landing SEO đang dùng</span></article>
        <article><strong>4</strong><span>Kênh kiếm tiền</span></article>
        <article><strong>API</strong><span>/api/leads và /api/report</span></article>
      </section>
      <section className="tool-grid">
        <article>
          <h2>Kênh doanh thu</h2>
          {monetizationItems.map(([title, text]) => <p key={title}><b>{title}:</b> {text}</p>)}
        </article>
        <article>
          <h2>Landing SEO</h2>
          {seoPages.map((page) => <p key={page.slug}><Link href={`/seo/${page.slug}`}>{page.title}</Link></p>)}
        </article>
      </section>
    </main>
  );
}
