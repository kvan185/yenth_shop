import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTemplate, templates } from '@/data/templates';

type TemplateDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return templates.map((template) => ({
    slug: template.slug,
  }));
}

export async function generateMetadata({ params }: TemplateDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);

  if (!template) {
    return {};
  }

  return {
    title: `${template.title} - Mẫu website`,
    description: template.description,
    alternates: {
      canonical: `/mau/${template.slug}`,
    },
  };
}

export default async function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const { slug } = await params;
  const template = getTemplate(slug);

  if (!template) {
    notFound();
  }

  return (
    <main className="template-demo-page" style={{ '--template-accent': template.accent } as React.CSSProperties}>
      <section className="template-demo-hero">
        <Link href="/mau" className="back-link">
          Tất cả mẫu
        </Link>
        <p className="eyebrow">{template.category}</p>
        <h1>{template.title}</h1>
        <p>{template.description}</p>
        <div className="hero-actions">
          <Link href="/lien-he" className="btn btn-primary" data-track="template_contact_click" data-track-label={template.title}>
            Chọn mẫu này
          </Link>
          <Link href="/mau" className="btn btn-secondary">
            Xem mẫu khác
          </Link>
        </div>
      </section>

      <section className="template-demo-preview">
        <div className="template-browser">
          <div className="template-browser-bar">
            <span />
            <span />
            <span />
            <strong>{template.slug}.yenth.shop</strong>
          </div>
          <div className="template-preview-layout">
            <div className="template-preview-copy">
              <small>{template.bestFor}</small>
              <h2>{template.title} được dựng để khách hiểu nhanh và liên hệ dễ hơn.</h2>
              <p>
                Mỗi mẫu có thể đổi màu, ảnh, nội dung, form, CTA, khu vực SEO và cấu trúc section
                theo ngành nghề thật của bạn.
              </p>
              <Link href="/lien-he">Nhận tư vấn chỉnh mẫu</Link>
            </div>
            <div className="template-preview-panel">
              {template.features.map((feature) => (
                <article key={feature}>
                  <span>{feature}</span>
                  <p>Section có thể chỉnh nội dung, hình ảnh và CTA theo thương hiệu của bạn.</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="template-demo-sections">
        <article>
          <h2>Khách sẽ thấy gì?</h2>
          <p>
            Hero nói rõ dịch vụ, phần proof tạo niềm tin, khu vực lợi ích giải thích giá trị, bảng
            giá/CTA giúp khách chọn bước tiếp theo và form hỏi đúng nhu cầu.
          </p>
        </article>
        <article>
          <h2>Có thể tùy biến gì?</h2>
          <p>
            Có thể thay màu, font, ảnh, ngành nghề, danh mục, bảng giá, câu hỏi form, Local SEO,
            blog nền, tracking và social preview.
          </p>
        </article>
      </section>
    </main>
  );
}
