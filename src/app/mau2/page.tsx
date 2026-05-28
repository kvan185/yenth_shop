import type { Metadata } from 'next';
import { Mau2Store } from '@/components/Mau2Store';

export const metadata: Metadata = {
  title: 'Mẫu 2 - Website bán hàng lifestyle',
  description:
    'Website bán hàng mẫu cho mỹ phẩm, lifestyle, handmade, quà tặng với bộ sưu tập, wishlist, giỏ hàng mini và form tư vấn.',
  alternates: {
    canonical: '/mau2',
  },
};

export default function Mau2Page() {
  return <Mau2Store />;
}
