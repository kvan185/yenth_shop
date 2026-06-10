import Link from 'next/link';
import { notFound } from 'next/navigation';
import { primaryDomain } from '@/lib/domainConfig';
import { seoPages } from '@/lib/businessData';

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

type SeoPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: SeoPageProps) {
  const { slug } = await params;
  const page = seoPages.find((item) => item.slug === slug);
  return page ? { title: page.title, description: page.description, keywords: page.keywords } : {};
}

export default async function SeoLandingPage({ params }: SeoPageProps) {
  const { slug } = await params;
  const page = seoPages.find((item) => item.slug === slug);
  if (!page) notFound();

  return (
    <main className="article-page">
      <header className="simple-header">
        <Link href="/">YenTH {primaryDomain.shortName}</Link>
        <nav>
          <Link href="/cong-cu">Công cụ</Link>
          <Link href="/">Xem cá nhân</Link>
        </nav>
      </header>
      <article className="seo-article">
        <span className="section-kicker">Landing SEO</span>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
        <h2>Nội dung nên có</h2>
        <p>Tổng quan năm, tình duyên, tài lộc, sự nghiệp, sức khỏe, tháng tốt và tháng cần chậm lại.</p>
        <h2>Từ khóa</h2>
        <div className="keyword-board light">
          {page.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
        </div>
        <Link className="button primary" href="/#xem-ngay">Xem bản cá nhân miễn phí</Link>
      </article>
    </main>
  );
}
