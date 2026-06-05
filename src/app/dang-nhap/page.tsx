import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập tài khoản khách hàng YenTH Shop.',
  alternates: {
    canonical: '/dang-nhap',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-copy">
          <Link href="/" className="back-link">
            YenTH.shop
          </Link>
          <p className="eyebrow">Đăng nhập</p>
          <h1>Quay lại khu vực khách hàng.</h1>
          <p>
            Mẫu đăng nhập này có thể dùng cho dashboard quản lý nội dung, theo dõi tiến độ dự án,
            hóa đơn, tài liệu bàn giao hoặc khu vực thành viên.
          </p>
        </div>
        <form className="auth-form">
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label>
            Mật khẩu
            <input type="password" name="password" placeholder="••••••••" required />
          </label>
          <div className="auth-row">
            <label className="auth-check">
              <input type="checkbox" name="remember" />
              Ghi nhớ đăng nhập
            </label>
            <a href="mailto:khanhvan18052004@gmail.com">Quên mật khẩu?</a>
          </div>
          <button type="button">Đăng nhập</button>
          <p>
            Chưa có tài khoản? <Link href="/dang-ky">Đăng ký</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
