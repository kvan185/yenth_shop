'use client';

import { useMemo, useState } from 'react';

type Item = {
  id: string;
  name: string;
  collection: string;
  price: number;
  tone: string;
  description: string;
  mood: string;
};

const items: Item[] = [
  {
    id: 'serum-hoa-hong',
    name: 'Serum hoa hồng phục hồi',
    collection: 'Skincare',
    price: 520000,
    tone: 'Dịu nhẹ',
    description: 'Tinh chất phục hồi hàng rào da, phù hợp routine tối giản mỗi sáng.',
    mood: 'Calm skin',
  },
  {
    id: 'nen-thom-mua-ha',
    name: 'Nến thơm mùa hạ',
    collection: 'Home scent',
    price: 280000,
    tone: 'Thư giãn',
    description: 'Mùi cam chín, gỗ nhẹ và vải sạch cho góc làm việc hoặc phòng ngủ.',
    mood: 'Slow living',
  },
  {
    id: 'tui-lua-mini',
    name: 'Túi lụa mini',
    collection: 'Phụ kiện',
    price: 390000,
    tone: 'Thanh lịch',
    description: 'Túi mini dùng đi cà phê, dự tiệc nhỏ hoặc phối cùng outfit linen.',
    mood: 'Soft outfit',
  },
  {
    id: 'combo-selfcare',
    name: 'Combo self-care cuối tuần',
    collection: 'Combo',
    price: 920000,
    tone: 'Bán chạy',
    description: 'Bộ quà gồm serum, nến thơm và túi lụa, đóng gói theo phong cách boutique.',
    mood: 'Weekend set',
  },
];

const collections = ['Tất cả', ...Array.from(new Set(items.map((item) => item.collection)))];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

export function Mau2Store() {
  const [activeCollection, setActiveCollection] = useState('Tất cả');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [cart, setCart] = useState<Record<string, number>>({});

  const visibleItems = useMemo(() => {
    if (activeCollection === 'Tất cả') {
      return items;
    }

    return items.filter((item) => item.collection === activeCollection);
  }, [activeCollection]);

  const cartItems = items
    .filter((item) => cart[item.id])
    .map((item) => ({
      ...item,
      quantity: cart[item.id],
    }));
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const wishlistCount = Object.values(wishlist).filter(Boolean).length;

  const addToCart = (item: Item) => {
    setCart((current) => ({
      ...current,
      [item.id]: (current[item.id] || 0) + 1,
    }));
  };

  const toggleWishlist = (itemId: string) => {
    setWishlist((current) => ({
      ...current,
      [itemId]: !current[itemId],
    }));
  };

  return (
    <main className="mau2-store">
      <header className="mau2-nav">
        <strong>Lumi Atelier</strong>
        <nav>
          <a href="#lookbook">Lookbook</a>
          <a href="#bo-suu-tap">Shop edit</a>
          <a href="#ritual">Ritual</a>
          <a href="#tu-van">Quiz</a>
        </nav>
        <span>{wishlistCount} saved</span>
      </header>

      <section className="mau2-hero">
        <div>
          <p>Editorial boutique</p>
          <h1>Mẫu 2 dành cho thương hiệu bán cảm xúc, không chỉ bán sản phẩm.</h1>
          <span>
            Phong cách này hợp mỹ phẩm, nến thơm, phụ kiện, quà tặng hoặc thời trang boutique:
            nhiều không gian thở, nội dung kể chuyện và CTA tư vấn theo nhu cầu.
          </span>
          <div className="sample-actions">
            <a href="#lookbook">Xem lookbook</a>
            <a href="#tu-van">Làm quiz chọn quà</a>
          </div>
        </div>
        <aside>
          <small>Season edit</small>
          <strong>Soft Rituals</strong>
          <p>{cartItems.length ? `${cartItems.length} sản phẩm trong edit` : 'Gift set cho cuối tuần chậm rãi'}</p>
          <span>{formatCurrency(total || 920000)}</span>
        </aside>
      </section>

      <section id="lookbook" className="mau2-lookbook">
        <article>
          <small>Look 01</small>
          <h2>Morning reset</h2>
          <p>Serum phục hồi, túi lụa mini và mùi nến sạch cho ngày làm việc nhẹ đầu.</p>
        </article>
        <article>
          <small>Look 02</small>
          <h2>Gift corner</h2>
          <p>Combo quà tặng có câu chuyện, đóng gói đẹp và đủ lý do để khách bấm mua.</p>
        </article>
        <article>
          <small>Look 03</small>
          <h2>After dark</h2>
          <p>Landing mini cho bộ sưu tập theo mùa, dùng ảnh lớn và lời dẫn ngắn.</p>
        </article>
      </section>

      <section id="bo-suu-tap" className="mau2-collections">
        <div className="mau2-section-head">
          <p>Shop edit</p>
          <h2>Bộ sưu tập được biên tập như một tạp chí nhỏ.</h2>
        </div>
        <div className="mau2-filter">
          {collections.map((collection) => (
            <button
              className={collection === activeCollection ? 'active' : ''}
              key={collection}
              type="button"
              onClick={() => setActiveCollection(collection)}
            >
              {collection}
            </button>
          ))}
        </div>
        <div className="mau2-grid">
          {visibleItems.map((item) => (
            <article key={item.id}>
              <div className="mau2-image">
                <span>{item.tone}</span>
                <strong>{item.mood}</strong>
              </div>
              <small>{item.collection}</small>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <strong>{formatCurrency(item.price)}</strong>
              <div>
                <button type="button" onClick={() => toggleWishlist(item.id)}>
                  {wishlist[item.id] ? 'Đã thích' : 'Yêu thích'}
                </button>
                <button type="button" onClick={() => addToCart(item)}>
                  Thêm giỏ
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="ritual" className="mau2-ritual">
        <div>
          <p>Ritual finder</p>
          <h2>Khách chọn theo mood thay vì tự đọc từng sản phẩm.</h2>
        </div>
        <div className="mau2-ritual-list">
          <article>
            <span>01</span>
            <strong>Da đang mệt</strong>
            <p>Gợi ý serum phục hồi + nến thơm nhẹ để tạo routine buổi tối.</p>
          </article>
          <article>
            <span>02</span>
            <strong>Cần quà tinh tế</strong>
            <p>Gợi ý combo có thiệp, túi giấy và lựa chọn thông điệp theo dịp.</p>
          </article>
          <article>
            <span>03</span>
            <strong>Muốn phối đồ mềm</strong>
            <p>Gợi ý phụ kiện nhỏ, dễ mua kèm, phù hợp upsell trong giỏ hàng.</p>
          </article>
        </div>
      </section>

      <section id="combo" className="mau2-combo">
        <div>
          <p>Mini cart</p>
          <h2>Giỏ hàng được trình bày như một mood board đang hoàn thiện.</h2>
          <span>
            Khác Mẫu 1 ở chỗ trang này không nhấn mạnh bảng sản phẩm dày, mà dùng câu chuyện,
            mood và combo để dẫn khách chọn nhanh.
          </span>
        </div>
        <div className="mau2-cart">
          {cartItems.length ? (
            cartItems.map((item) => (
              <article key={item.id}>
                <span>{item.quantity}x</span>
                <strong>{item.name}</strong>
                <small>{formatCurrency(item.price * item.quantity)}</small>
              </article>
            ))
          ) : (
            <p>Thêm sản phẩm để xem giỏ hàng mini.</p>
          )}
          <footer>
            <span>Tổng</span>
            <strong>{formatCurrency(total)}</strong>
          </footer>
        </div>
      </section>

      <section id="tu-van" className="mau2-consult">
        <div>
          <p>Gift quiz</p>
          <h2>Form chuyển đổi theo kiểu quiz, hợp boutique và quà tặng.</h2>
        </div>
        <form>
          <input placeholder="Tên của bạn" />
          <input placeholder="Số điện thoại / Zalo" />
          <select defaultValue="">
            <option value="" disabled>
              Bạn đang chọn cho ai?
            </option>
            <option>Cho bản thân</option>
            <option>Quà sinh nhật</option>
            <option>Quà cảm ơn khách hàng</option>
            <option>Set theo mùa</option>
          </select>
          <button type="button">Nhận gợi ý mẫu</button>
        </form>
      </section>
    </main>
  );
}
