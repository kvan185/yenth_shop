import type { Metadata } from 'next';
import { Mau2PageHero, Mau2Shell } from '@/components/Mau2Website';

export const metadata: Metadata = {
  title: 'Chứng nhận',
};

export default function Mau2CertificatePage() {
  return (
    <Mau2Shell>
      <Mau2PageHero
        eyebrow="Chứng nhận"
        title="Trang chứng nhận giúp sản phẩm giá trị cao đáng tin hơn."
        text="Mẫu này có thể trình bày chứng nhận ATTP, quy trình sơ chế, chính sách đổi trả và cam kết chất lượng ở một route riêng."
      />
      <section className="m2-section m2-certs">
        {['ATTP', 'Nguồn gốc', 'Đổi trả', 'Bồi thường'].map((item) => (
          <article key={item}>
            <strong>{item}</strong>
            <p>Khối nội dung chứng thực để khách yên tâm trước khi đặt hàng.</p>
          </article>
        ))}
      </section>
    </Mau2Shell>
  );
}
