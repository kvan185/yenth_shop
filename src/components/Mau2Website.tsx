import Link from 'next/link';
import { mau2Base, mau2NavLinks, mau2Posts, mau2Products } from '@/data/smallBusinessMau2';

export function Mau2Shell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="m2-site">
      <header className="m2-header">
        <Link className="m2-logo" href={mau2Base}>
          YenNest
        </Link>
        <nav aria-label="Điều hướng mẫu 2">
          {mau2NavLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <footer className="m2-footer">
        <div>
          <strong>YenNest</strong>
          <span>Yến sào nguyên chất, đóng gói chỉn chu cho gia đình và quà biếu.</span>
        </div>
        <nav aria-label="Điều hướng footer mẫu 2">
          {mau2NavLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </footer>
    </main>
  );
}

export function Mau2Hero() {
  return (
    <section className="m2-hero">
      <div>
        <span>Website bán hàng nhiều trang</span>
        <h1>Yến sào nguyên chất, trình bày gọn và dễ mua.</h1>
        <p>
          Mẫu 2 tách từng phần thành route riêng: sản phẩm, giới thiệu, blog, chứng nhận và liên hệ. Khách bấm menu
          là chuyển trang thật, phù hợp website bán hàng nhỏ cần cấu trúc rõ ràng.
        </p>
        <div className="m2-actions">
          <Link href={`${mau2Base}/san-pham`}>Xem sản phẩm</Link>
          <Link href={`${mau2Base}/lien-he`}>Đặt tư vấn</Link>
        </div>
      </div>
      <aside>
        <strong>100g</strong>
        <span>Yến tinh chế loại 1</span>
      </aside>
    </section>
  );
}

export function Mau2ProductGrid() {
  return (
    <div className="m2-grid">
      {mau2Products.map((product) => (
        <article key={product.name}>
          <div className="m2-product-visual">{product.category}</div>
          <h2>{product.name}</h2>
          <p>{product.text}</p>
          <strong>{product.price}</strong>
          <Link href={`${mau2Base}/lien-he`}>Hỏi mua</Link>
        </article>
      ))}
    </div>
  );
}

export function Mau2PostGrid() {
  return (
    <div className="m2-post-grid">
      {mau2Posts.map((post) => (
        <article key={post.title}>
          <span>{post.date}</span>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
          <Link href={`${mau2Base}/lien-he`}>Nhận tư vấn</Link>
        </article>
      ))}
    </div>
  );
}

export function Mau2PageHero({ eyebrow, title, text }: Readonly<{ eyebrow: string; title: string; text: string }>) {
  return (
    <section className="m2-page-hero">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
