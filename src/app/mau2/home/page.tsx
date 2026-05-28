import Link from 'next/link';

const collections = [
  ['Bộ chăm sóc da dịu nhẹ', 'Dành cho da nhạy cảm, hình ảnh sản phẩm lớn và CTA đặt tư vấn.'],
  ['Quà tặng handmade', 'Phù hợp cửa hàng quà tặng, nến thơm, phụ kiện hoặc sản phẩm thủ công.'],
  ['Combo bán chạy', 'Khu vực tạo neo giá và tăng giá trị đơn hàng trung bình.'],
];

export default function SampleShopTwoPage() {
  return (
    <main className="sample-shop sample-shop-two">
      <header className="sample-nav light">
        <Link href="/mau">Bloom Market</Link>
        <nav>
          <a href="#bo-suu-tap">Bộ sưu tập</a>
          <a href="#cau-chuyen">Câu chuyện</a>
          <a href="#dat-hang">Đặt hàng</a>
        </nav>
      </header>

      <section className="sample-soft-hero">
        <p>Beauty & lifestyle shop</p>
        <h1>Mẫu website bán hàng nhẹ nhàng cho thương hiệu có gu.</h1>
        <span>
          Phù hợp mỹ phẩm, thời trang nhỏ, phụ kiện, đồ handmade, quà tặng hoặc cửa hàng cần hình
          ảnh mềm mại và cảm giác tin cậy.
        </span>
        <div className="sample-actions">
          <a href="#bo-suu-tap">Xem bộ sưu tập</a>
          <a href="/lien-he">Chọn mẫu này</a>
        </div>
      </section>

      <section id="bo-suu-tap" className="sample-collection-grid">
        {collections.map(([title, desc]) => (
          <article key={title}>
            <div />
            <h2>{title}</h2>
            <p>{desc}</p>
          </article>
        ))}
      </section>

      <section id="cau-chuyen" className="sample-story">
        <h2>Kể câu chuyện sản phẩm để khách thấy lý do nên mua.</h2>
        <p>
          Mẫu này ưu tiên ảnh lớn, khoảng trắng, review khách hàng, combo nổi bật và form đặt tư vấn
          nhanh qua Zalo.
        </p>
      </section>

      <footer id="dat-hang" className="sample-footer soft">
        <strong>Bloom Market</strong>
        <span>Đặt hàng qua Zalo: 0375 266 538</span>
      </footer>
    </main>
  );
}
