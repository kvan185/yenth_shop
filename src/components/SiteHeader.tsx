'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const primaryLinks = [
  { href: '/home', label: 'Home' },
  { href: '/danh-muc', label: 'Danh mục' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/thiet-ke-web', label: 'Thiết kế web' },
  { href: '/thiet-ke-website-ban-hang', label: 'Web bán hàng' },
  { href: '/GameMini', label: 'GameMini' },
  { href: '/blog', label: 'Blog' },
];

const secondaryLinks = [
  { href: '/lien-he', label: 'Liên hệ' },
  { href: '/bang-gia', label: 'Bảng giá' },
  { href: '/quy-trinh', label: 'Quy trình' },
  { href: '/local-seo', label: 'Local SEO' },
  { href: '/thiet-ke-landing-page', label: 'Landing page' },
  { href: '/thiet-ke-web-tai-tp-ho-chi-minh', label: 'Web TP.HCM' },
  { href: '/dang-nhap', label: 'Đăng nhập' },
  { href: '/dang-ky', label: 'Đăng ký' },
];

const mobileLinks = [
  { href: '/home', label: 'Home' },
  { href: '/danh-muc', label: 'Danh mục' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/thiet-ke-web', label: 'Thiết kế web' },
  { href: '/GameMini', label: 'GameMini' },
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
