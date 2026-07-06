import Link from "next/link";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/learn", label: "Lộ trình" },
  { href: "/vocabulary", label: "Từ vựng" },
  { href: "/grammar", label: "Ngữ pháp" },
  { href: "/exams", label: "Đề thi" },
  { href: "/manager", label: "Manager" },
  { href: "/blog", label: "Blog" },
];

type SiteHeaderProps = {
  compact?: boolean;
};

export default function SiteHeader({ compact = false }: SiteHeaderProps) {
  return (
    <header className={`siteHeader ${compact ? "siteHeaderCompact" : ""}`}>
      <div className="siteHeaderInner">
        <div className="siteHeaderTop">
          <Link className="siteBrand" href="/">
            <span>Y</span>
            YENTH
          </Link>

          <div className="siteHeaderActions">
            <Link className="siteLoginLink" href="/login">
              Đăng nhập
            </Link>
          </div>
        </div>

        <nav className="siteNav" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
