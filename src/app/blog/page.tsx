import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog SEO thiết kế website',
  description:
    'Kiến thức về thiết kế website bán hàng, landing page, Local SEO và cách tối ưu website cho cá nhân, cửa hàng, doanh nghiệp nhỏ.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <main className="blog-page">
      <header className="blog-hero">
        <Link href="/" className="back-link">
          YenTH.shop
        </Link>
        <p className="eyebrow">Blog SEO</p>
        <h1>Kiến thức làm website giúp khách tìm thấy và tin bạn nhanh hơn.</h1>
        <p>
          Các bài viết tập trung vào thiết kế website bán hàng, landing page, Local SEO và cách
          chuẩn bị nội dung trước khi đưa thương hiệu lên Google.
        </p>
      </header>

      <section className="blog-list section">
        {blogPosts.map((post) => (
          <article className="blog-card" key={post.slug}>
            <span>{post.readingTime}</span>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <Link className="text-link" href={`/blog/${post.slug}`}>
              Đọc bài viết
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
