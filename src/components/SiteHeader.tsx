import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-primary">
        <Link className="brand" href="/">
          YenTH<span>.shop</span>
        </Link>
        <nav aria-label="Điều hướng chính">
          <Link href="/dich-vu">Dịch vụ</Link>
          <Link href="/thiet-ke-web">Thiết kế web</Link>
          <Link href="/mau">Mẫu web</Link>
          <Link href="/bang-gia">Giá</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/dang-nhap">Đăng nhập</Link>
          <Link className="header-cta" href="/lien-he" data-track="header_cta_click" data-track-category="conversion">
            Audit miễn phí
          </Link>
        </nav>
      </div>
      <div className="header-secondary" aria-label="Điều hướng phụ">
        <Link href="/quy-trinh">Quy trình</Link>
        <Link href="/local-seo">Local SEO</Link>
        <Link href="/mau/portfolio">Portfolio cũ</Link>
        <a href="tel:0375266538">0375 266 538</a>
      </div>
    </header>
  );
}
