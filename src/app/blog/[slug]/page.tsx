import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug } from '@/data/blog';

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'YenTH Shop',
      url: 'https://yenth.shop',
    },
    publisher: {
      '@type': 'Organization',
      name: 'YenTH Shop',
      url: 'https://yenth.shop',
    },
    mainEntityOfPage: `https://yenth.shop/blog/${post.slug}`,
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
        name: 'Blog SEO',
        item: 'https://yenth.shop/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://yenth.shop/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="article-shell">
        <Link href="/blog" className="back-link">
          Blog SEO
        </Link>
        <p className="eyebrow">{post.readingTime}</p>
        <h1>{post.title}</h1>
        <p className="article-lead">{post.description}</p>
        <div className="article-meta">
          <span>Cập nhật: 28/05/2026</span>
          <span>{post.keywords[0]}</span>
        </div>
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        <div className="article-cta">
          <h2>Cần một website có nền SEO ngay từ đầu?</h2>
          <p>
            Gửi nhu cầu website của bạn, tôi sẽ gợi ý cấu trúc trang, nội dung cần chuẩn bị và chi
            phí triển khai phù hợp.
          </p>
          <Link href="/#lien-he" className="btn btn-primary">
            Nhận tư vấn website miễn phí
          </Link>
        </div>
      </article>
    </main>
  );
}
