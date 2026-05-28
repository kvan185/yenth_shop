'use client';

import { useState } from 'react';

const colors = [
  { name: 'Graphite', value: '#343a40' },
  { name: 'Sage', value: '#7c9a82' },
  { name: 'Cream', value: '#e7d7b9' },
];

const specs = [
  ['Pin', '14 ngày dùng tiêu chuẩn'],
  ['Cảm biến', 'Nhịp tim, SpO2, giấc ngủ'],
  ['Chống nước', '5ATM'],
  ['Kết nối', 'Bluetooth 5.3'],
];

const benefits = [
  ['Theo dõi sức khỏe', 'Đo nhịp tim, giấc ngủ và vận động để người dùng hiểu cơ thể mỗi ngày.'],
  ['Thiết kế nhẹ', 'Khung mỏng, dây mềm, dễ đeo cả ngày mà không tạo cảm giác cồng kềnh.'],
  ['Thông báo nhanh', 'Nhận cuộc gọi, tin nhắn và nhắc việc ngay trên cổ tay.'],
  ['Dễ bán online', 'Trang có đủ thông số, lợi ích, review, FAQ và CTA để khách hỏi mua.'],
];

const faqs = [
  ['Có phù hợp làm landing page sản phẩm mới không?', 'Có. Mẫu này tập trung một sản phẩm, phù hợp chạy quảng cáo hoặc gửi khách xem nhanh.'],
  ['Có thể đổi sang mỹ phẩm, đồ gia dụng hoặc khóa học không?', 'Có. Phần hero, gallery, thông số và FAQ có thể thay bằng nội dung của bất kỳ sản phẩm nào.'],
  ['Có thêm nút mua hàng được không?', 'Có thể thêm giỏ hàng, thanh toán, Zalo, form nhận lead hoặc kết nối CRM.'],
];

export function ProductIntroDemo() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="pi-demo">
      <header className="pi-header">
        <a href="#top">PulseOne</a>
        <nav aria-label="Điều hướng sản phẩm">
          <a href="#loi-ich">Lợi ích</a>
          <a href="#thong-so">Thông số</a>
          <a href="#danh-gia">Đánh giá</a>
          <a href="#tu-van">Tư vấn</a>
        </nav>
      </header>

      <section id="top" className="pi-hero">
        <div>
          <span>Đồng hồ sức khỏe thông minh</span>
          <h1>PulseOne giúp bạn theo dõi sức khỏe và lịch trình trong một thiết kế tối giản.</h1>
          <p>
            Đây là mẫu web giới thiệu sản phẩm dành cho doanh nghiệp cần bán một sản phẩm chủ lực: đủ hình ảnh,
            thông số, lợi ích, review, FAQ và form tư vấn.
          </p>
          <div className="pi-actions">
            <a href="#tu-van">Nhận tư vấn</a>
            <a href="#thong-so">Xem thông số</a>
          </div>
        </div>
        <aside className="pi-watch" style={{ '--watch-color': selectedColor.value } as React.CSSProperties}>
          <div className="pi-watch-face">
            <strong>08:30</strong>
            <span>72 bpm</span>
          </div>
        </aside>
      </section>

      <section className="pi-color-panel">
        <div>
          <span>Màu đang chọn</span>
          <strong>{selectedColor.name}</strong>
        </div>
        <div className="pi-swatches" aria-label="Chọn màu sản phẩm">
          {colors.map((color) => (
            <button
              aria-label={color.name}
              className={selectedColor.name === color.name ? 'active' : undefined}
              key={color.name}
              style={{ background: color.value }}
              type="button"
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </section>

      <section id="loi-ich" className="pi-section">
        <div className="pi-section-head">
          <span>Lợi ích</span>
          <h2>Tập trung vào lý do khách nên quan tâm trước khi họ xem giá.</h2>
        </div>
        <div className="pi-benefit-grid">
          {benefits.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="thong-so" className="pi-section pi-specs">
        <div>
          <span>Thông số</span>
          <h2>Thông tin kỹ thuật được trình bày ngắn, dễ so sánh.</h2>
          <p>Mẫu này phù hợp sản phẩm công nghệ, mỹ phẩm, đồ gia dụng, thực phẩm chức năng hoặc sản phẩm mới ra mắt.</p>
        </div>
        <div className="pi-spec-list">
          {specs.map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="danh-gia" className="pi-section pi-reviews">
        <div className="pi-section-head">
          <span>Đánh giá</span>
          <h2>Review giúp sản phẩm mới giảm cảm giác rủi ro.</h2>
        </div>
        <div className="pi-review-grid">
          {[
            ['Minh Anh', 'Pin lâu, đeo nhẹ và giao diện rất dễ hiểu cho người mới dùng.'],
            ['Quốc Huy', 'Mình thích phần theo dõi giấc ngủ và nhắc vận động trong ngày.'],
            ['Thanh Trúc', 'Trang giới thiệu rõ, xem xong là biết sản phẩm có hợp mình không.'],
          ].map(([name, text]) => (
            <article key={name}>
              <p>{text}</p>
              <strong>{name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="pi-section pi-faq">
        <div className="pi-section-head">
          <span>FAQ</span>
          <h2>Giải đáp câu hỏi trước khi khách để lại thông tin.</h2>
        </div>
        <div className="pi-faq-list">
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

      <section id="tu-van" className="pi-contact">
        <div>
          <span>Lead form</span>
          <h2>Khách quan tâm có thể gửi nhu cầu ngay trên trang giới thiệu sản phẩm.</h2>
          <p>Form này có thể nối về email, Google Sheet, CRM hoặc Zalo OA tùy mô hình bán hàng.</p>
        </div>
        <form>
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
              <option value="bao-gia">Nhận báo giá</option>
              <option value="dai-ly">Hỏi chính sách đại lý</option>
            </select>
          </label>
          <button type="button">Gửi thông tin</button>
        </form>
      </section>
    </main>
  );
}
