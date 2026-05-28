'use client';

import { useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge: string;
  description: string;
};

const products: Product[] = [
  {
    id: 'yen-tinh-che-50g',
    name: 'Yến tinh chế 50g',
    category: 'Yến sào',
    price: 1650000,
    oldPrice: 1850000,
    badge: 'Bán chạy',
    description: 'Tổ yến tinh chế sạch lông, phù hợp dùng hằng tuần hoặc biếu tặng.',
  },
  {
    id: 'yen-chung-san',
    name: 'Yến chưng sẵn 6 hũ',
    category: 'Yến chưng',
    price: 420000,
    badge: 'Tiện lợi',
    description: 'Combo 6 hũ yến chưng đường phèn, bảo quản lạnh, dùng nhanh trong ngày bận.',
  },
  {
    id: 'set-qua-tang',
    name: 'Set quà tặng sức khỏe',
    category: 'Quà tặng',
    price: 2200000,
    badge: 'Cao cấp',
    description: 'Hộp quà yến sào sang trọng cho đối tác, gia đình hoặc dịp lễ tết.',
  },
  {
    id: 'yen-tho-100g',
    name: 'Yến thô chọn lọc 100g',
    category: 'Yến sào',
    price: 3100000,
    oldPrice: 3450000,
    badge: 'Giá tốt',
    description: 'Yến thô nguyên tổ cho khách muốn tự làm sạch và kiểm soát quy trình chế biến.',
  },
  {
    id: 'combo-gia-dinh',
    name: 'Combo gia đình 1 tháng',
    category: 'Combo',
    price: 1280000,
    badge: 'Tiết kiệm',
    description: 'Gói yến chưng và yến tinh chế dành cho gia đình 3-4 người sử dụng đều đặn.',
  },
  {
    id: 'yen-chung-khong-duong',
    name: 'Yến chưng không đường',
    category: 'Yến chưng',
    price: 480000,
    badge: 'Healthy',
    description: 'Phù hợp người ăn kiêng, người lớn tuổi hoặc khách muốn vị thanh nhẹ.',
  },
];

const categories = ['Tất cả', ...Array.from(new Set(products.map((product) => product.category)))];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

export function Mau1Store() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = activeCategory === 'Tất cả' || product.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const cartItems = products
    .filter((product) => cart[product.id])
    .map((product) => ({
      ...product,
      quantity: cart[product.id],
    }));
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Product) => {
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
          <a href="#san-pham">Sản phẩm</a>
          <a href="#gio-hang">Giỏ hàng ({cartCount})</a>
          <a href="#thanh-toan">Thanh toán</a>
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
          <strong>{formatCurrency(cartTotal || 2490000)}</strong>
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
                <strong>{formatCurrency(product.price)}</strong>
                {product.oldPrice ? <del>{formatCurrency(product.oldPrice)}</del> : null}
              </div>
              <div className="store-card-actions">
                <button type="button" onClick={() => setSelectedProduct(product)}>
                  Xem nhanh
                </button>
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
              <strong>{formatCurrency(selectedProduct.price)}</strong>
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
                  <span>{formatCurrency(item.price)}</span>
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
            <strong>{formatCurrency(cartTotal)}</strong>
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
