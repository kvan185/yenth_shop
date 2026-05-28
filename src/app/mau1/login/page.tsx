import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Đăng nhập - Mẫu 1',
  description: 'Trang đăng nhập mẫu cho website bán hàng Mau1.',
  alternates: {
    canonical: '/mau1/login',
  },
};

export default function Mau1LoginPage() {
  return (
    <main className="mau1-store">
      <section className="store-auth">
        <div>
          <p>Tài khoản khách hàng</p>
          <h1>Đăng nhập để xem đơn hàng, lưu địa chỉ và mua lại nhanh hơn.</h1>
          <span>
            Đây là mẫu giao diện đăng nhập cho shop. Khi triển khai thật có thể kết nối email, số
            điện thoại, Google hoặc OTP Zalo.
          </span>
          <Link href="/mau1">Quay lại cửa hàng</Link>
        </div>
        <form>
          <label>
            Email hoặc số điện thoại
            <input placeholder="khachhang@email.com" />
          </label>
          <label>
            Mật khẩu
            <input placeholder="Nhập mật khẩu" type="password" />
          </label>
          <button type="button">Đăng nhập mẫu</button>
          <small>
            Chưa có tài khoản? <Link href="/mau1/register">Đăng ký ngay</Link>
          </small>
        </form>
      </section>
    </main>
  );
}
