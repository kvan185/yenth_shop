import type { Metadata } from 'next';
import { Mau2PageHero, Mau2Shell } from '@/components/Mau2Website';

export const metadata: Metadata = {
  title: 'Liên hệ',
};

export default function Mau2ContactPage() {
  return (
    <Mau2Shell>
      <Mau2PageHero
        eyebrow="Liên hệ"
        title="Trang liên hệ riêng để khách gửi nhu cầu đặt hàng."
        text="Doanh nghiệp nhỏ có thể gom form đặt hàng, số điện thoại, Zalo, email và địa chỉ cửa hàng trong một route dễ chia sẻ."
      />
      <section className="m2-section m2-contact">
        <div>
          <h2>YenNest</h2>
          <p>Zalo: 0375 266 538</p>
          <p>Email: hello@yennest.local</p>
          <p>Địa chỉ: TP. Hồ Chí Minh</p>
        </div>
        <form>
          <label>
            Họ tên
            <input placeholder="Nguyễn Văn A" />
          </label>
          <label>
            Số điện thoại
            <input placeholder="0375 266 538" />
          </label>
          <label>
            Sản phẩm quan tâm
            <select defaultValue="yen-tinh-che">
              <option value="yen-tinh-che">Yến tinh chế</option>
              <option value="yen-tho">Tổ yến thô</option>
              <option value="nuoc-yen">Nước yến</option>
            </select>
          </label>
          <button type="button">Gửi yêu cầu</button>
        </form>
      </section>
    </Mau2Shell>
  );
}
