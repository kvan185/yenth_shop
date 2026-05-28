'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { formatVnd, mau1Categories, mau1Products, type Mau1Product } from '@/data/mau1Shop';

const categories = ['Tất cả', ...mau1Categories];

export function Mau1Store() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<Mau1Product | null>(mau1Products[0]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return mau1Products.filter((product) => {
      const matchesCategory = activeCategory === 'Tất cả' || product.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const cartItems = mau1Products
    .filter((product) => cart[product.id])
    .map((product) => ({
      ...product,
      quantity: cart[product.id],
    }));
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Mau1Product) => {
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }));
    setSelectedProduct(product);
  };

  const updateQuantity = (productId: string, nextQuantity: number) => {
    setCart((current) => {
      const nextCart = { ...current };

      if (nextQuantity <= 0) {
        delete nextCart[productId];
      } else {
        nextCart[productId] = nextQuantity;
      }

      return nextCart;
    });
  };

  return (
    <main className="mau1-store">
      <nav className="store-nav">
        <strong>YenNest Market</strong>
        <div>
          <Link href="/mau1/products">Sản phẩm</Link>
          <Link href="/mau1/categories">Danh mục</Link>
          <a href="#gio-hang">Giỏ hàng ({cartCount})</a>
          <Link href="/mau1/login">Đăng nhập</Link>
          <Link href="/mau1/register">Đăng ký</Link>
        </div>
      </nav>

      <section className="store-hero">
        <div>
          <p>Website bán hàng mẫu</p>
          <h1>Cửa hàng yến sào online có sản phẩm, giỏ hàng và form đặt mua.</h1>
          <span>
            Mẫu này dành cho cửa hàng cần bán sản phẩm thật: có lọc danh mục, tìm kiếm, chi tiết sản
            phẩm, giỏ hàng, tổng tiền và thông tin đặt mua.
          </span>
          <div className="store-hero-actions">
            <a href="#san-pham">Mua ngay</a>
            <a href="#thanh-toan">Gửi đơn hàng</a>
          </div>
        </div>
        <aside>
          <span>Đơn mẫu hôm nay</span>
          <strong>{formatVnd(cartTotal || 2490000)}</strong>
          <p>{cartCount ? `${cartCount} sản phẩm trong giỏ` : 'Combo yến sào + quà tặng sức khỏe'}</p>
        </aside>
      </section>

      <section className="store-toolbar" aria-label="Bộ lọc sản phẩm">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tìm sản phẩm yến..."
        />
        <div>
          {categories.map((category) => (
            <button
              className={category === activeCategory ? 'active' : ''}
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section id="san-pham" className="store-layout">
        <div className="store-products">
          {filteredProducts.map((product) => (
            <article className="store-product-card" key={product.id}>
              <div className="store-product-image">
                <span>{product.badge}</span>
              </div>
              <small>{product.category}</small>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="store-price-row">
                <strong>{formatVnd(product.price)}</strong>
                {product.oldPrice ? <del>{formatVnd(product.oldPrice)}</del> : null}
              </div>
              <div className="store-card-actions">
                <Link href={`/mau1/products/${product.id}`}>Chi tiết</Link>
                <button type="button" onClick={() => addToCart(product)}>
                  Thêm giỏ
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="store-side-panel">
          {selectedProduct ? (
            <>
              <span>{selectedProduct.category}</span>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <strong>{formatVnd(selectedProduct.price)}</strong>
              <Link href={`/mau1/products/${selectedProduct.id}`}>Mở trang sản phẩm</Link>
              <button type="button" onClick={() => addToCart(selectedProduct)}>
                Thêm sản phẩm này
              </button>
            </>
          ) : null}
        </aside>
      </section>

      <section id="gio-hang" className="store-cart-section">
        <div>
          <p>Giỏ hàng</p>
          <h2>Khách có thể kiểm tra đơn trước khi gửi thông tin.</h2>
        </div>
        <div className="store-cart">
          {cartItems.length ? (
            cartItems.map((item) => (
              <article key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <span>{formatVnd(item.price)}</span>
                </div>
                <div className="quantity-control">
                  <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <strong>{item.quantity}</strong>
                  <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p>Giỏ hàng đang trống. Hãy thêm một sản phẩm để xem luồng mua hàng.</p>
          )}
          <footer>
            <span>Tổng tạm tính</span>
            <strong>{formatVnd(cartTotal)}</strong>
          </footer>
        </div>
      </section>

      <section id="thanh-toan" className="store-checkout">
        <div>
          <p>Thanh toán mẫu</p>
          <h2>Form đặt mua có thể kết nối email, Google Sheet, CRM hoặc cổng thanh toán.</h2>
        </div>
        <form>
          <label>
            Họ tên
            <input placeholder="Tên người nhận" />
          </label>
          <label>
            Số điện thoại
            <input placeholder="Số điện thoại / Zalo" />
          </label>
          <label>
            Địa chỉ giao hàng
            <input placeholder="Số nhà, phường/xã, quận/huyện..." />
          </label>
          <label>
            Ghi chú
            <textarea rows={4} placeholder="Thời gian nhận hàng, yêu cầu đóng gói..." />
          </label>
          <button type="button">Gửi đơn hàng mẫu</button>
        </form>
      </section>
    </main>
  );
}
