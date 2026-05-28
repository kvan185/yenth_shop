import type { Metadata } from 'next';
import Link from 'next/link';
import { formatVnd, mau1Products, toCategorySlug } from '@/data/mau1Shop';

export const metadata: Metadata = {
  title: 'Sản phẩm - Mẫu 1',
  description: 'Danh sách sản phẩm mẫu cho website bán hàng Mau1.',
  alternates: {
    canonical: '/mau1/products',
  },
};

export default function Mau1ProductsPage() {
  return (
    <main className="mau1-store">
      <section className="store-listing-hero">
        <p>Tất cả sản phẩm</p>
        <h1>Trang sản phẩm riêng để khách xem, lọc và vào chi tiết từng món.</h1>
        <Link href="/mau1/categories">Xem danh mục</Link>
      </section>

      <section className="store-products store-product-listing">
        {mau1Products.map((product) => (
          <article className="store-product-card" key={product.id}>
            <div className="store-product-image">
              <span>{product.badge}</span>
            </div>
            <small>
              <Link href={`/mau1/categories/${toCategorySlug(product.category)}`}>{product.category}</Link>
            </small>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div className="store-price-row">
              <strong>{formatVnd(product.price)}</strong>
              {product.oldPrice ? <del>{formatVnd(product.oldPrice)}</del> : null}
            </div>
            <div className="store-card-actions">
              <Link href={`/mau1/products/${product.id}`}>Chi tiết</Link>
              <Link href="/mau1/login">Đăng nhập mua</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
