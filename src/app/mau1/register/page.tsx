import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Đăng ký - Mẫu 1',
  description: 'Trang đăng ký tài khoản mẫu cho website bán hàng Mau1.',
  alternates: {
    canonical: '/mau1/register',
  },
};

export default function Mau1RegisterPage() {
  return (
    <main className="mau1-store">
      <section className="store-auth">
        <div>
          <p>Tạo tài khoản</p>
          <h1>Đăng ký để nhận ưu đãi thành viên và theo dõi lịch sử mua hàng.</h1>
          <span>
            Mẫu này phù hợp cho shop muốn có tài khoản khách hàng, điểm thưởng, mã giảm giá và mua
            lại đơn cũ.
          </span>
          <Link href="/mau1">Xem sản phẩm</Link>
        </div>
        <form>
          <label>
            Họ tên
            <input placeholder="Nguyễn Minh Anh" />
          </label>
          <label>
            Số điện thoại
            <input placeholder="Số điện thoại / Zalo" />
          </label>
          <label>
            Email
            <input placeholder="khachhang@email.com" />
          </label>
          <label>
            Mật khẩu
            <input placeholder="Tạo mật khẩu" type="password" />
          </label>
          <button type="button">Tạo tài khoản mẫu</button>
          <small>
            Đã có tài khoản? <Link href="/mau1/login">Đăng nhập</Link>
          </small>
        </form>
      </section>
    </main>
  );
}
