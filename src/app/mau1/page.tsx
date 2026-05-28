import type { Metadata } from 'next';
import { Mau1Store } from '@/components/Mau1Store';

export const metadata: Metadata = {
  title: 'Mẫu 1 - Website bán hàng đầy đủ chức năng',
  description:
    'Website bán hàng mẫu có tìm kiếm, lọc danh mục, xem nhanh sản phẩm, giỏ hàng, tổng tiền và form đặt mua.',
  alternates: {
    canonical: '/mau1',
  },
};

export default function Mau1Page() {
  return <Mau1Store />;
}
