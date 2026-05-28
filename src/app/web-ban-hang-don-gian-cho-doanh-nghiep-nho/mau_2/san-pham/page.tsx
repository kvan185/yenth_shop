import type { Metadata } from 'next';
import { Mau2PageHero, Mau2ProductGrid, Mau2Shell } from '@/components/Mau2Website';

export const metadata: Metadata = {
  title: 'Sản phẩm',
};

export default function Mau2ProductsPage() {
  return (
    <Mau2Shell>
      <Mau2PageHero
        eyebrow="Sản phẩm"
        title="Danh sách sản phẩm có trang riêng để khách xem và hỏi mua."
        text="Route sản phẩm độc lập giúp website dễ mở rộng thêm lọc, chi tiết sản phẩm, giỏ hàng hoặc thanh toán sau này."
      />
      <section className="m2-section">
        <Mau2ProductGrid />
      </section>
    </Mau2Shell>
  );
}
