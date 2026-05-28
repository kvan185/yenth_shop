'use client';

import { useState } from 'react';

const packages = [
  ['Glow Basic', '690.000đ', 'Làm sạch sâu, hút dầu, cấp ẩm và tư vấn routine tại nhà.'],
  ['Acne Care', '1.190.000đ', 'Liệu trình giảm mụn, phục hồi nền da và theo dõi sau buổi đầu.'],
  ['Bright Lift', '1.690.000đ', 'Chăm sóc sáng da, nâng cơ nhẹ và massage thư giãn 90 phút.'],
];

const steps = [
  ['01', 'Khám da', 'Chuyên viên soi da và hỏi thói quen chăm sóc hiện tại.'],
  ['02', 'Chọn liệu trình', 'Đề xuất gói phù hợp với tình trạng da và ngân sách.'],
  ['03', 'Thực hiện', 'Quy trình sạch, nhẹ, có giải thích từng bước cho khách.'],
  ['04', 'Theo dõi', 'Nhắc lịch và gửi hướng dẫn chăm sóc sau dịch vụ.'],
];

const faqs = [
  ['Một landing page dịch vụ cần gì?', 'Cần offer rõ, bằng chứng tin cậy, gói dịch vụ, quy trình, FAQ và form đặt lịch.'],
  ['Mẫu này đổi sang ngành khác được không?', 'Được. Có thể đổi sang lớp học, sửa chữa, tư vấn, studio, nha khoa hoặc dịch vụ địa phương.'],
  ['Có thể gắn Zalo và tracking không?', 'Có. CTA, form, số điện thoại và Zalo đều có thể gắn tracking để đo lead.'],
];

export function ServiceLandingDemo() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="sl-demo">
      <header className="sl-header">
        <a href="#top">GlowSkin</a>
        <nav aria-label="Điều hướng landing page">
          <a href="#goi-dich-vu">Gói dịch vụ</a>
          <a href="#quy-trinh">Quy trình</a>
          <a href="#danh-gia">Đánh giá</a>
          <a href="#dat-lich">Đặt lịch</a>
        </nav>
      </header>

      <section id="top" className="sl-hero">
        <div>
          <span>Ưu đãi soi da miễn phí trong tuần này</span>
          <h1>Landing page giúp spa nhỏ biến lượt xem thành lịch hẹn thật.</h1>
          <p>
            Mẫu này dành cho dịch vụ cần khách để lại thông tin nhanh: hero rõ offer, lợi ích, gói giá, quy trình,
            review, FAQ và form đặt lịch nằm cuối trang.
          </p>
          <div className="sl-actions">
            <a href="#dat-lich">Đặt lịch tư vấn</a>
            <a href="#goi-dich-vu">Xem gói dịch vụ</a>
          </div>
        </div>
        <aside>
          <strong>24h</strong>
          <span>phản hồi lịch hẹn</span>
          <small>Miễn phí soi da và tư vấn routine tại nhà</small>
        </aside>
      </section>

      <section className="sl-proof">
        {[
          ['4.9/5', 'đánh giá khách hàng'],
          ['1.200+', 'lượt đặt lịch'],
          ['8 năm', 'kinh nghiệm chăm sóc da'],
          ['100%', 'tư vấn rõ trước khi làm'],
        ].map(([value, text]) => (
          <article key={value}>
            <strong>{value}</strong>
            <span>{text}</span>
          </article>
        ))}
      </section>

      <section className="sl-section">
        <div className="sl-section-head">
          <span>Vấn đề thường gặp</span>
          <h2>Landing page cần chạm đúng nỗi đau trước khi giới thiệu gói.</h2>
        </div>
        <div className="sl-pain-grid">
          {['Da mụn tái lại sau nhiều lần tự xử lý', 'Không biết routine nào phù hợp', 'Sợ bị upsell dịch vụ không cần thiết'].map((item) => (
            <article key={item}>
              <h3>{item}</h3>
              <p>Phần nội dung này giúp khách thấy dịch vụ hiểu đúng tình huống của họ.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="goi-dich-vu" className="sl-section sl-packages">
        <div className="sl-section-head">
          <span>Gói dịch vụ</span>
          <h2>Gói giá rõ ràng giúp khách quyết định nhanh hơn.</h2>
        </div>
        <div className="sl-package-grid">
          {packages.map(([name, price, text]) => (
            <article key={name}>
              <span>{name}</span>
              <strong>{price}</strong>
              <p>{text}</p>
              <a href="#dat-lich">Chọn gói này</a>
            </article>
          ))}
        </div>
      </section>

      <section id="quy-trinh" className="sl-section sl-process">
        <div className="sl-section-head">
          <span>Quy trình</span>
          <h2>Khách yên tâm hơn khi biết trước từng bước.</h2>
        </div>
        <div className="sl-step-list">
          {steps.map(([number, title, text]) => (
            <article key={number}>
              <strong>{number}</strong>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="danh-gia" className="sl-section sl-reviews">
        <div className="sl-section-head">
          <span>Đánh giá</span>
          <h2>Bằng chứng xã hội được đặt trước form để tăng niềm tin.</h2>
        </div>
        <div className="sl-review-grid">
          {[
            ['Lan Anh', 'Mình được soi da kỹ, tư vấn dễ hiểu và không bị ép mua thêm gói.'],
            ['Minh Thư', 'Sau 3 buổi da dịu hơn nhiều, lịch hẹn được nhắc rất chu đáo.'],
            ['Ngọc Hân', 'Landing page rõ giá, xem xong mình đặt lịch luôn trong tối.'],
          ].map(([name, text]) => (
            <article key={name}>
              <p>{text}</p>
              <strong>{name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="sl-section sl-faq">
        <div className="sl-section-head">
          <span>FAQ</span>
          <h2>Giải đáp phản đối trước khi khách gửi form.</h2>
        </div>
        <div className="sl-faq-list">
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

      <section id="dat-lich" className="sl-contact">
        <div>
          <span>Đặt lịch</span>
          <h2>Form ngắn, hỏi đúng thông tin để đội tư vấn gọi lại nhanh.</h2>
          <p>Landing page có thể gửi lead về email, Google Sheet, Zalo OA hoặc CRM.</p>
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
            Dịch vụ quan tâm
            <select defaultValue="soi-da">
              <option value="soi-da">Soi da miễn phí</option>
              <option value="acne">Acne Care</option>
              <option value="bright">Bright Lift</option>
            </select>
          </label>
          <button type="button">Gửi lịch hẹn</button>
        </form>
      </section>
    </main>
  );
}
