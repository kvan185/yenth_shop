import Link from 'next/link';

const products = [
  ['Tai nghe Aero Bass', '890.000đ', 'Chống ồn nhẹ, pin 28 giờ, phù hợp làm việc và học online.'],
  ['Bàn phím Lumi Keys', '1.250.000đ', 'Layout gọn, đèn nền tinh tế, gõ êm cho góc làm việc tại nhà.'],
  ['Đèn bàn Halo Desk', '690.000đ', 'Ánh sáng dịu, 3 chế độ màu, tiết kiệm điện và bảo vệ mắt.'],
];

export default function SampleShopOnePage() {
  return (
    <main className="sample-shop sample-shop-one">
      <header className="sample-nav">
        <Link href="/mau">YenTH Sample</Link>
        <nav>
          <a href="#san-pham">Sản phẩm</a>
          <a href="#uu-dai">Ưu đãi</a>
          <a href="#lien-he">Liên hệ</a>
        </nav>
      </header>

      <section className="sample-shop-hero">
        <div>
          <p>Modern gadget store</p>
          <h1>Góc làm việc đẹp hơn với phụ kiện công nghệ chọn lọc.</h1>
          <span>
            Mẫu website bán hàng dành cho cửa hàng phụ kiện, thiết bị làm việc, đồ công nghệ hoặc
            sản phẩm lifestyle cần trình bày chuyên nghiệp.
          </span>
          <div className="sample-actions">
            <a href="#san-pham">Xem sản phẩm</a>
            <a href="/lien-he">Chọn mẫu này</a>
          </div>
        </div>
        <aside>
          <strong>Flash sale</strong>
          <h2>-20%</h2>
          <p>Cho combo setup bàn làm việc trong tuần này.</p>
        </aside>
      </section>

      <section id="san-pham" className="sample-product-grid">
        {products.map(([name, price, desc]) => (
          <article key={name}>
            <div />
            <h2>{name}</h2>
            <strong>{price}</strong>
            <p>{desc}</p>
            <button>Thêm vào giỏ</button>
          </article>
        ))}
      </section>

      <section id="uu-dai" className="sample-band">
        <h2>Miễn phí giao hàng cho đơn từ 1.500.000đ</h2>
        <p>Website mẫu có thể thêm giỏ hàng, thanh toán, lọc sản phẩm, quản lý đơn và chat Zalo.</p>
      </section>

      <footer id="lien-he" className="sample-footer">
        <strong>TechNest Store</strong>
        <span>Hotline: 0375 266 538</span>
      </footer>
    </main>
  );
}
