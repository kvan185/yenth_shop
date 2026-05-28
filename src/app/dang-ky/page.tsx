import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Đăng ký tài khoản khách hàng YenTH Shop.',
  alternates: {
    canonical: '/dang-ky',
  },
};

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-copy">
          <Link href="/" className="back-link">
            YenTH.shop
          </Link>
          <p className="eyebrow">Đăng ký</p>
          <h1>Tạo tài khoản để lưu nhu cầu và theo dõi dự án.</h1>
          <p>
            Đây là mẫu đăng ký để khách hình dung website có thể mở rộng thành hệ thống tài khoản,
            quản lý brief, trạng thái thanh toán và tài liệu bàn giao.
          </p>
        </div>
        <form className="auth-form">
          <label>
            Họ tên
            <input name="name" placeholder="Tên của bạn" required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            Số điện thoại / Zalo
            <input name="phone" placeholder="0375..." inputMode="tel" required />
          </label>
          <label>
            Mật khẩu
            <input type="password" name="password" placeholder="Tối thiểu 8 ký tự" required />
          </label>
          <button type="button">Tạo tài khoản</button>
          <p>
            Đã có tài khoản? <Link href="/dang-nhap">Đăng nhập</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
