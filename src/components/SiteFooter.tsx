'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = [
  { href: '/home', label: 'Home' },
  { href: '/danh-muc', label: 'Danh mục' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/thiet-ke-web', label: 'Thiết kế web' },
  { href: '/blog', label: 'Blog' },
  { href: '/lien-he', label: 'Liên hệ' },
  { href: '/bang-gia', label: 'Bảng giá' },
  { href: '/quy-trinh', label: 'Quy trình' },
];

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === '/' || pathname === '/home') {
    return null;
  }

  return (
    <>
      <footer className="footer">
        <div className="footer-primary">
          <strong>YenTH.shop</strong>
          <span>Website có header/footer 2 tầng, SEO nền, tracking và form conversion.</span>
        </div>
        <div className="footer-secondary" aria-label="Điều hướng footer mở rộng">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a href="mailto:khanhvan18052004@gmail.com">Email</a>
        </div>
      </footer>

      <div className="bottom-dock" aria-label="Thanh liên hệ cố định">
        <div className="bottom-dock-primary">
          <span>Audit website miễn phí trong 24h</span>
          <Link href="/lien-he" data-track="bottom_dock_form_click" data-track-category="conversion">
            Gửi nhu cầu
          </Link>
        </div>
        <div className="bottom-dock-secondary" aria-label="Liên hệ nhanh mở rộng">
          <a href="https://zalo.me/0375266538" target="_blank" rel="noreferrer" data-track="bottom_dock_zalo_click">
            Chat Zalo
          </a>
          <a href="tel:0375266538" data-track="bottom_dock_phone_click">
            Gọi nhanh
          </a>
        </div>
      </div>
    </>
  );
}
