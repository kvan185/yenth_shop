'use client';

import { useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  category: string;
  label: string;
  price: number;
  oldPrice?: number;
  description: string;
  color: string;
};

const products: Product[] = [
  {
    id: 'yen-tinh-che',
    name: 'Yến tinh chế loại 1',
    category: 'Tổ yến',
    label: 'Bán chạy',
    price: 4290000,
    description: 'Sợi yến sạch, đều, phù hợp gia đình dùng định kỳ hoặc làm quà tặng cao cấp.',
    color: '#f8dfab',
  },
  {
    id: 'yen-tho',
    name: 'Tổ yến thô còn lông',
    category: 'Tổ yến',
    label: 'Nguyên bản',
    price: 2940000,
    description: 'Giữ trọn cấu trúc tổ, dành cho khách thích tự sơ chế và kiểm chứng chất lượng.',
    color: '#d9b36f',
  },
  {
    id: 'nuoc-yen',
    name: 'Nước yến chưng sẵn',
    category: 'Dùng liền',
    label: 'Tiện lợi',
    price: 45000,
    oldPrice: 59000,
    description: 'Lọ nhỏ dễ dùng hằng ngày, hợp cho người bận rộn, người lớn tuổi và trẻ em.',
    color: '#fff4ce',
  },
  {
    id: 'hong-yen',
    name: 'Hồng yến thượng hạng',
    category: 'Quà biếu',
    label: 'Cao cấp',
    price: 6500000,
    description: 'Dòng quà biếu sang trọng, đóng hộp đẹp, nhấn mạnh sự chỉn chu và tin cậy.',
    color: '#d9826b',
  },
];

const categories = ['Tất cả', ...Array.from(new Set(products.map((product) => product.category)))];

const articles = [
  'Cách phân biệt yến thật và yến tẩm đường',
  'Liều lượng dùng yến phù hợp cho từng độ tuổi',
  'Cách chưng yến đường phèn giữ trọn dưỡng chất',
];

const faqs = [
  ['Có thể đặt hàng qua Zalo không?', 'Có. Khách có thể bấm nút Zalo, gọi nhanh hoặc gửi form đặt hàng trên website.'],
  ['Website nhỏ có cần giỏ hàng không?', 'Có thể có giỏ hàng đơn giản để khách chọn sản phẩm, xem tổng tiền và gửi yêu cầu tư vấn.'],
  ['Mẫu này đổi ngành khác được không?', 'Được. Cấu trúc phù hợp mỹ phẩm, thực phẩm, đồ thủ công, quà tặng hoặc sản phẩm địa phương.'],
];

function formatVnd(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

export function SmallBusinessShopDemo() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [openFaq, setOpenFaq] = useState(0);

  const visibleProducts = useMemo(() => {
    if (selectedCategory === 'Tất cả') {
      return products;
    }

    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const cartItems = products
    .map((product) => ({
      ...product,
      quantity: cart[product.id] ?? 0,
    }))
    .filter((product) => product.quantity > 0);

  const total = cartItems.reduce((sum, product) => sum + product.price * product.quantity, 0);

  function addToCart(productId: string) {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  }

  function removeFromCart(productId: string) {
    setCart((current) => {
      const nextQuantity = (current[productId] ?? 0) - 1;
      const next = { ...current };

      if (nextQuantity <= 0) {
        delete next[productId];
      } else {
        next[productId] = nextQuantity;
      }

      return next;
    });
  }

  return (
    <main className="sb-shop">
      <header className="sb-nav">
        <a href="#top">YenNest</a>
        <nav aria-label="Điều hướng mẫu bán hàng">
          <a href="#san-pham">Sản phẩm</a>
          <a href="#gio-hang">Giỏ hàng</a>
          <a href="#kien-thuc">Bài viết</a>
          <a href="#lien-he">Liên hệ</a>
        </nav>
        <a className="sb-nav-cta" href="tel:0375266538">
          Gọi tư vấn
        </a>
      </header>

      <section id="top" className="sb-hero">
        <div className="sb-hero-copy">
          <span>Cam kết bồi thường 1000% nếu phát hiện hàng giả</span>
          <h1>Yến sào nguyên chất cho gia đình và quà biếu doanh nghiệp.</h1>
          <p>
            Một mẫu web bán hàng nhỏ gọn: giới thiệu sản phẩm, lọc danh mục, thêm vào giỏ, gửi yêu cầu đặt hàng,
            review khách hàng, FAQ và kênh liên hệ nhanh.
          </p>
          <div className="sb-actions">
            <a href="#san-pham">Mua ngay</a>
            <a href="#ve-chung-toi">Tìm hiểu thêm</a>
          </div>
        </div>
        <div className="sb-hero-visual" aria-label="Hộp quà yến sào cao cấp">
          <div className="sb-product-box">
            <i />
            <strong>Yến tinh chế</strong>
            <small>100g - hộp quà</small>
          </div>
          <div className="sb-badge">100% tự nhiên</div>
        </div>
      </section>

      <section className="sb-proof" aria-label="Cam kết bán hàng">
        {[
          ['100%', 'Tự nhiên, không tẩy trắng'],
          ['2-4h', 'Giao nội thành HCM'],
          ['ATTP', 'Có chứng nhận an toàn'],
          ['5.000+', 'Khách hàng đã tin dùng'],
        ].map(([value, text]) => (
          <article key={value}>
            <strong>{value}</strong>
            <span>{text}</span>
          </article>
        ))}
      </section>

      <section id="san-pham" className="sb-section sb-products">
        <div className="sb-section-head">
          <span>Sản phẩm nổi bật</span>
          <h2>Khách có thể lọc nhóm sản phẩm và thêm vào giỏ ngay trên trang.</h2>
        </div>
        <div className="sb-filter" aria-label="Lọc sản phẩm">
          {categories.map((category) => (
            <button
              className={selectedCategory === category ? 'active' : undefined}
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="sb-product-grid">
          {visibleProducts.map((product) => (
            <article key={product.id}>
              <div className="sb-product-art" style={{ background: product.color }}>
                <span>{product.label}</span>
              </div>
              <div>
                <small>{product.category}</small>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="sb-price-row">
                  <strong>{formatVnd(product.price)}</strong>
                  {product.oldPrice ? <del>{formatVnd(product.oldPrice)}</del> : null}
                </div>
                <button type="button" onClick={() => addToCart(product.id)}>
                  Thêm vào giỏ
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="gio-hang" className="sb-section sb-checkout">
        <div>
          <span>Giỏ hàng demo</span>
          <h2>Luồng mua hàng đủ dùng cho doanh nghiệp nhỏ.</h2>
          <p>
            Khách chọn sản phẩm, xem tổng tiền, sau đó gửi thông tin để shop gọi xác nhận. Đây là phiên bản nhẹ,
            dễ mở rộng thành thanh toán online hoặc quản lý đơn hàng.
          </p>
          <div className="sb-cart">
            {cartItems.length ? (
              cartItems.map((item) => (
                <article key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>
                      {formatVnd(item.price)} x {item.quantity}
                    </span>
                  </div>
                  <div>
                    <button type="button" onClick={() => removeFromCart(item.id)}>
                      -
                    </button>
                    <button type="button" onClick={() => addToCart(item.id)}>
                      +
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p>Giỏ hàng đang trống. Hãy thêm một sản phẩm để xem luồng đặt hàng.</p>
            )}
            <footer>
              <span>Tổng tạm tính</span>
              <strong>{formatVnd(total)}</strong>
            </footer>
          </div>
        </div>

        <form className="sb-order-form">
          <label>
            Họ tên
            <input placeholder="Nguyễn Văn A" />
          </label>
          <label>
            Số điện thoại
            <input placeholder="0375 266 538" />
          </label>
          <label>
            Nhu cầu
            <select defaultValue="tu-van">
              <option value="tu-van">Tư vấn sản phẩm</option>
              <option value="dat-hang">Đặt hàng ngay</option>
              <option value="qua-bieu">Mua làm quà biếu</option>
            </select>
          </label>
          <button type="button">Gửi yêu cầu</button>
        </form>
      </section>

      <section id="ve-chung-toi" className="sb-section sb-about">
        <div className="sb-about-card">
          <strong>10+ năm</strong>
          <span>Kinh nghiệm tuyển chọn và sơ chế yến</span>
        </div>
        <div>
          <span>Về thương hiệu</span>
          <h2>Một website nhỏ vẫn cần đủ niềm tin trước khi khách bấm mua.</h2>
          <p>
            Bố cục này dành cho sản phẩm có giá trị cao: trình bày nguồn gốc, quy trình sơ chế, chứng nhận, review,
            câu hỏi thường gặp và liên hệ nhanh để giảm rủi ro trước khi khách đặt hàng.
          </p>
        </div>
      </section>

      <section className="sb-section sb-reviews">
        <div className="sb-section-head">
          <span>Khách hàng nói gì</span>
          <h2>Review ngắn giúp shop nhỏ tạo cảm giác đáng tin ngay trên trang bán hàng.</h2>
        </div>
        <div className="sb-review-grid">
          {[
            ['Chị Lan Anh', 'Yến sợi dai, thơm, đóng gói sang trọng nên mình thường mua làm quà biếu.'],
            ['Anh Minh Đức', 'Nước yến tiện cho bố mẹ dùng hằng ngày, đặt qua Zalo rất nhanh.'],
            ['Cô Thu Hà', 'Tổ yến thô sạch, ít tạp chất, nhặt nhanh và ăn thấy rất thanh.'],
          ].map(([name, text]) => (
            <article key={name}>
              <p>{text}</p>
              <strong>{name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="kien-thuc" className="sb-section sb-content">
        <div>
          <span>Kiến thức sản phẩm</span>
          <h2>Blog ngắn giúp khách hiểu sản phẩm và hỗ trợ SEO.</h2>
        </div>
        <div className="sb-article-list">
          {articles.map((article) => (
            <article key={article}>
              <small>Hướng dẫn</small>
              <h3>{article}</h3>
              <a href="#lien-he">Đọc tiếp</a>
            </article>
          ))}
        </div>
      </section>

      <section className="sb-section sb-faq">
        <div className="sb-section-head">
          <span>FAQ</span>
          <h2>Những câu hỏi làm khách yên tâm trước khi mua.</h2>
        </div>
        <div className="sb-faq-list">
          {faqs.map(([question, answer], index) => (
            <article key={question}>
              <button type="button" onClick={() => setOpenFaq(index)}>
                {question}
              </button>
              {openFaq === index ? <p>{answer}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <footer id="lien-he" className="sb-footer">
        <div>
          <strong>YenNest</strong>
          <span>Website bán hàng đơn giản cho doanh nghiệp nhỏ.</span>
        </div>
        <div>
          <a href="https://zalo.me/0375266538" target="_blank" rel="noreferrer">
            Zalo
          </a>
          <a href="mailto:khanhvan18052004@gmail.com">Email</a>
          <a href="tel:0375266538">0375 266 538</a>
        </div>
      </footer>
    </main>
  );
}
