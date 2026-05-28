import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatVnd, getMau1CategoryBySlug, mau1Categories, mau1Products, toCategorySlug } from '@/data/mau1Shop';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return mau1Categories.map((category) => ({
    slug: toCategorySlug(category),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getMau1CategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category} - Mẫu 1`,
    description: `Trang danh mục ${category} trong website bán hàng mẫu Mau1.`,
    alternates: {
      canonical: `/mau1/categories/${slug}`,
    },
  };
}

export default async function Mau1CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getMau1CategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = mau1Products.filter((product) => product.category === category);

  return (
    <main className="mau1-store">
      <section className="store-listing-hero">
        <p>Danh mục</p>
        <h1>{category}</h1>
        <Link href="/mau1/categories">Tất cả danh mục</Link>
      </section>

      <section className="store-products store-product-listing">
        {products.map((product) => (
          <article className="store-product-card" key={product.id}>
            <div className="store-product-image">
              <span>{product.badge}</span>
            </div>
            <small>{product.category}</small>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="store-price-row">
              <strong>{formatVnd(product.price)}</strong>
              {product.oldPrice ? <del>{formatVnd(product.oldPrice)}</del> : null}
            </div>
            <div className="store-card-actions">
              <Link href={`/mau1/products/${product.id}`}>Chi tiết</Link>
              <Link href="/mau1/login">Mua sau</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
