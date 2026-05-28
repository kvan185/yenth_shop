import type { Metadata } from 'next';
import { Mau2PageHero, Mau2PostGrid, Mau2Shell } from '@/components/Mau2Website';

export const metadata: Metadata = {
  title: 'Blog',
};

export default function Mau2BlogPage() {
  return (
    <Mau2Shell>
      <Mau2PageHero
        eyebrow="Blog"
        title="Blog riêng cho kiến thức sản phẩm và SEO."
        text="Thay vì đặt bài viết ở anchor trong cùng một trang, mẫu 2 tách blog thành route riêng để khách dễ đọc và Google dễ hiểu cấu trúc site."
      />
      <section className="m2-section">
        <Mau2PostGrid />
      </section>
    </Mau2Shell>
  );
}
