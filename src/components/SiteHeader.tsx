'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const primaryLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/thiet-ke-web', label: 'Thiết kế web' },
  { href: '/mau', label: 'Mẫu web' },
  { href: '/bang-gia', label: 'Giá' },
  { href: '/blog', label: 'Blog' },
];

const secondaryLinks = [
  { href: '/mau1', label: 'Mẫu 1' },
  { href: '/mau2', label: 'Mẫu 2' },
  { href: '/mau3/facebook', label: 'Mẫu social' },
  { href: '/quy-trinh', label: 'Quy trình' },
  { href: '/local-seo', label: 'Local SEO' },
  { href: '/dang-nhap', label: 'Đăng nhập' },
];

const mobileLinks = [
  { href: '/', label: 'Home' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/mau', label: 'Mẫu' },
  { href: '/bang-gia', label: 'Giá' },
  { href: '/lien-he', label: 'Liên hệ' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      <header className="site-header">
        <div className="header-primary">
          <Link className="brand" href="/">
            YenTH<span>.shop</span>
          </Link>

          <input className="menu-toggle" id="site-menu-toggle" type="checkbox" aria-label="Mở menu chuyển trang" />
          <label className="menu-button" htmlFor="site-menu-toggle" aria-hidden="true">
            <span />
            <span />
            <span />
          </label>

          <div className="header-menu">
            <nav aria-label="Điều hướng chính">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  className={isActive(pathname, link.href) ? 'active' : undefined}
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                className="header-cta"
                href="/lien-he"
                data-track="header_cta_click"
                data-track-category="conversion"
              >
                Audit miễn phí
              </Link>
            </nav>

            <div className="header-secondary" aria-label="Điều hướng phụ">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  className={isActive(pathname, link.href) ? 'active' : undefined}
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <a href="tel:0375266538">0375 266 538</a>
            </div>
          </div>
        </div>
      </header>

      <nav className="mobile-switcher" aria-label="Chuyển trang nhanh">
        {mobileLinks.map((link) => (
          <Link
            key={link.href}
            className={isActive(pathname, link.href) ? 'active' : undefined}
            href={link.href}
            aria-current={isActive(pathname, link.href) ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
