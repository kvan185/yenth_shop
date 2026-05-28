import type { Metadata } from 'next';
import { Mau2PageHero, Mau2Shell } from '@/components/Mau2Website';

export const metadata: Metadata = {
  title: 'Giới thiệu',
};

export default function Mau2AboutPage() {
  return (
    <Mau2Shell>
      <Mau2PageHero
        eyebrow="Giới thiệu"
        title="Câu chuyện thương hiệu được tách thành một trang riêng."
        text="Doanh nghiệp nhỏ có thể dùng trang này để kể nguồn gốc sản phẩm, quy trình tuyển chọn, đội ngũ và cam kết chất lượng."
      />
      <section className="m2-section m2-story">
        <article>
          <span>01</span>
          <h2>Nguồn yến rõ ràng</h2>
          <p>Kiểm soát từ nhà yến, sơ chế thủ công và bảo quản trong điều kiện khô thoáng.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Đóng gói chỉn chu</h2>
          <p>Thiết kế bao bì phù hợp mua dùng hằng ngày lẫn làm quà biếu sức khỏe.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Tư vấn dễ hiểu</h2>
          <p>Hướng dẫn khách chọn dòng yến, liều lượng và cách chưng phù hợp nhu cầu.</p>
        </article>
      </section>
    </Mau2Shell>
  );
}
