'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const primaryLinks = [
  { href: '/danh-muc', label: 'Mẫu web' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/bang-gia', label: 'Bảng giá' },
  { href: '/quy-trinh', label: 'Quy trình' },
  { href: '/blog', label: 'Blog' },
];

const secondaryLinks = [
  { href: '/thiet-ke-web', label: 'Thiết kế web' },
  { href: '/local-seo', label: 'Local SEO' },
  { href: '/thiet-ke-landing-page', label: 'Landing page' },
  { href: '/thiet-ke-web-tai-tp-ho-chi-minh', label: 'Web TP.HCM' },
  { href: '/GameMini', label: 'Lab demo' },
  { href: '/dang-nhap', label: 'Đăng nhập' },
  { href: '/dang-ky', label: 'Đăng ký' },
];

const mobileLinks = [
  { href: '/home', label: 'Home' },
  { href: '/danh-muc', label: 'Mẫu web' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/bang-gia', label: 'Bảng giá' },
  { href: '/lien-he', label: 'Liên hệ' },
];

function isActive(pathname: string, href: string) {
  if (href === '/' || href === '/home') {
    return pathname === '/' || pathname === '/home';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <>
      <header className="site-header">
        <div className="header-primary">
          <Link className="brand" href="/home">
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
                Nhận tư vấn
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
              <a href="https://zalo.me/0375266538" target="_blank" rel="noreferrer" data-track="header_zalo_click">
                Chat Zalo
              </a>
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
