import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  formatVnd,
  getMau1ProductById,
  mau1Products,
  toCategorySlug,
} from '@/data/mau1Shop';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return mau1Products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getMau1ProductById(id);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} - Mẫu 1`,
    description: product.description,
    alternates: {
      canonical: `/mau1/products/${product.id}`,
    },
  };
}

export default async function Mau1ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getMau1ProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = mau1Products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  return (
    <main className="mau1-store">
      <section className="store-detail">
        <div className="store-detail-image">
          <span>{product.badge}</span>
        </div>
        <div>
          <Link className="store-back-link" href={`/mau1/categories/${toCategorySlug(product.category)}`}>
            {product.category}
          </Link>
          <h1>{product.name}</h1>
          <p>{product.detail}</p>
          <div className="store-price-row">
            <strong>{formatVnd(product.price)}</strong>
            {product.oldPrice ? <del>{formatVnd(product.oldPrice)}</del> : null}
          </div>
          <ul className="store-detail-points">
            <li>Còn {product.stock} sản phẩm trong kho mẫu</li>
            <li>Giao hàng nội thành trong ngày</li>
            <li>Đổi trả nếu sản phẩm không đúng mô tả</li>
          </ul>
          <div className="store-hero-actions">
            <Link href="/mau1/login">Đăng nhập để mua</Link>
            <Link href="/mau1/products">Xem sản phẩm khác</Link>
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="store-related">
          <p>Cùng danh mục</p>
          <h2>Sản phẩm liên quan</h2>
          <div className="store-products">
            {relatedProducts.map((item) => (
              <article className="store-product-card" key={item.id}>
                <div className="store-product-image">
                  <span>{item.badge}</span>
                </div>
                <small>{item.category}</small>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="store-price-row">
                  <strong>{formatVnd(item.price)}</strong>
                </div>
                <div className="store-card-actions">
                  <Link href={`/mau1/products/${item.id}`}>Chi tiết</Link>
                  <Link href="/mau1">Về shop</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
