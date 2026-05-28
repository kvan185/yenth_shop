'use client';

import { useMemo, useState } from 'react';

type Item = {
  id: string;
  name: string;
  collection: string;
  price: number;
  tone: string;
  description: string;
};

const items: Item[] = [
  {
    id: 'serum-hoa-hong',
    name: 'Serum hoa hồng phục hồi',
    collection: 'Skincare',
    price: 520000,
    tone: 'Dịu nhẹ',
    description: 'Dành cho thương hiệu mỹ phẩm cần trình bày thành phần, công dụng và review.',
  },
  {
    id: 'nen-thom-mua-ha',
    name: 'Nến thơm mùa hạ',
    collection: 'Home scent',
    price: 280000,
    tone: 'Thư giãn',
    description: 'Phù hợp sản phẩm handmade, quà tặng hoặc lifestyle cần hình ảnh có gu.',
  },
  {
    id: 'tui-lua-mini',
    name: 'Túi lụa mini',
    collection: 'Phụ kiện',
    price: 390000,
    tone: 'Thanh lịch',
    description: 'Mẫu sản phẩm thời trang/phụ kiện có thể thêm biến thể màu và size.',
  },
  {
    id: 'combo-selfcare',
    name: 'Combo self-care cuối tuần',
    collection: 'Combo',
    price: 920000,
    tone: 'Bán chạy',
    description: 'Combo giúp tăng giá trị đơn hàng, phù hợp landing bán theo chiến dịch.',
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
        <strong>Bloom Boutique</strong>
        <nav>
          <a href="#bo-suu-tap">Bộ sưu tập</a>
          <a href="#combo">Combo</a>
          <a href="#tu-van">Tư vấn</a>
        </nav>
        <span>{wishlistCount} yêu thích</span>
      </header>

      <section className="mau2-hero">
        <div>
          <p>Beauty & lifestyle ecommerce</p>
          <h1>Cửa hàng online mềm mại cho thương hiệu có gu.</h1>
          <span>
            Mẫu 2 phù hợp mỹ phẩm, nến thơm, phụ kiện, quà tặng, thời trang nhỏ hoặc sản phẩm
            handmade cần cảm giác cao cấp và dễ đặt tư vấn.
          </span>
          <div className="sample-actions">
            <a href="#bo-suu-tap">Xem bộ sưu tập</a>
            <a href="#tu-van">Nhận tư vấn</a>
          </div>
        </div>
        <aside>
          <small>Cart preview</small>
          <strong>{formatCurrency(total || 920000)}</strong>
          <p>{cartItems.length ? `${cartItems.length} sản phẩm đã chọn` : 'Combo self-care cuối tuần'}</p>
        </aside>
      </section>

      <section id="bo-suu-tap" className="mau2-collections">
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

      <section id="combo" className="mau2-combo">
        <div>
          <p>Conversion block</p>
          <h2>Đẩy combo bán chạy để tăng giá trị đơn hàng.</h2>
          <span>
            Section này có thể biến thành flash sale, bộ sản phẩm theo mùa, quà tặng hoặc ưu đãi
            cho khách mới.
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
          <p>Lead form</p>
          <h2>Form tư vấn giúp khách chọn sản phẩm phù hợp.</h2>
        </div>
        <form>
          <input placeholder="Tên của bạn" />
          <input placeholder="Số điện thoại / Zalo" />
          <select defaultValue="">
            <option value="" disabled>
              Nhu cầu quan tâm
            </option>
            <option>Skincare</option>
            <option>Quà tặng</option>
            <option>Phụ kiện</option>
            <option>Combo bán chạy</option>
          </select>
          <button type="button">Gửi tư vấn mẫu</button>
        </form>
      </section>
    </main>
  );
}
