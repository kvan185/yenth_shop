import type { Metadata } from 'next';
import Link from 'next/link';
import { formatVnd, mau1Categories, mau1Products, toCategorySlug } from '@/data/mau1Shop';

export const metadata: Metadata = {
  title: 'Danh mục sản phẩm - Mẫu 1',
  description: 'Các danh mục sản phẩm mẫu trong website bán hàng Mau1.',
  alternates: {
    canonical: '/mau1/categories',
  },
};

export default function Mau1CategoriesPage() {
  return (
    <main className="mau1-store">
      <section className="store-listing-hero">
        <p>Danh mục sản phẩm</p>
        <h1>Chọn nhanh nhóm sản phẩm để khách không phải tự tìm mơ hồ.</h1>
        <Link href="/mau1/products">Xem tất cả sản phẩm</Link>
      </section>

      <section className="store-category-grid">
        {mau1Categories.map((category) => {
          const categoryProducts = mau1Products.filter((product) => product.category === category);
          const minPrice = Math.min(...categoryProducts.map((product) => product.price));

          return (
            <Link className="store-category-card" href={`/mau1/categories/${toCategorySlug(category)}`} key={category}>
              <small>{categoryProducts.length} sản phẩm</small>
              <h2>{category}</h2>
              <p>Giá từ {formatVnd(minPrice)}. Có trang danh mục riêng, phù hợp SEO và quảng cáo.</p>
              <span>Xem danh mục</span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
