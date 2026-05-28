import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mẫu landing page dịch vụ',
  description:
    'Demo landing page dịch vụ một trang dành cho spa, tư vấn, lớp học, sửa chữa hoặc dịch vụ địa phương.',
};

const benefits = [
  {
    title: 'Tư vấn đúng nhu cầu',
    desc: 'Khách chọn dịch vụ phù hợp qua nội dung ngắn gọn, dễ hiểu và có lời kêu gọi hành động rõ ràng.',
  },
  {
    title: 'Đặt lịch nhanh',
    desc: 'Form liên hệ, hotline và nút Zalo luôn dễ thấy để giảm số bước trước khi khách gửi yêu cầu.',
  },
  {
    title: 'Tăng độ tin cậy',
    desc: 'Trình bày quy trình, đánh giá khách hàng, cam kết và hình ảnh không gian dịch vụ chỉn chu.',
  },
];

const services = [
  ['Chăm sóc da chuyên sâu', 'Làm sạch, phục hồi và tư vấn lộ trình chăm sóc tại nhà.'],
  ['Massage thư giãn', 'Liệu trình giảm căng thẳng với không gian riêng tư và nhẹ nhàng.'],
  ['Tư vấn liệu trình', 'Đánh giá tình trạng hiện tại và đề xuất gói dịch vụ phù hợp.'],
];

const steps = [
  ['01', 'Gửi nhu cầu'],
  ['02', 'Tư vấn liệu trình'],
  ['03', 'Đặt lịch phù hợp'],
  ['04', 'Theo dõi sau dịch vụ'],
];

export default function ServiceLandingTemplatePage() {
  return (
    <main className="lp-page">
      <header className="lp-header">
        <Link href="/" className="lp-logo">
          Aura Spa
        </Link>
        <nav aria-label="Điều hướng landing page dịch vụ">
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#quy-trinh">Quy trình</a>
          <a href="#dat-lich">Đặt lịch</a>
        </nav>
      </header>

      <section className="lp-hero">
        <Image
          src="/images/templates/landing-spa-hero.png"
          alt="Không gian spa cao cấp cho mẫu landing page dịch vụ"
          fill
          priority
          className="lp-hero-image"
          sizes="100vw"
        />
        <div className="lp-hero-overlay" />
        <div className="lp-hero-content">
          <p className="lp-kicker">Landing page dịch vụ</p>
          <h1>Đặt lịch chăm sóc da dễ hơn với một trang giới thiệu thật rõ ràng.</h1>
          <p>
            Mẫu này phù hợp cho spa, clinic, tư vấn, khóa học hoặc dịch vụ địa phương cần khách
            hiểu nhanh lợi ích, xem bảng dịch vụ và gửi thông tin đặt lịch.
          </p>
          <div className="lp-actions">
            <a href="#dat-lich" className="lp-btn lp-btn-primary">
              Đặt lịch tư vấn
            </a>
            <a href="#dich-vu" className="lp-btn lp-btn-light">
              Xem dịch vụ
            </a>
          </div>
          <div className="lp-proof">
            <span>4.9/5 đánh giá</span>
            <span>Phản hồi trong 15 phút</span>
            <span>Lịch hẹn linh hoạt</span>
          </div>
        </div>
      </section>

      <section className="lp-benefits">
        {benefits.map((item) => (
          <article key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </article>
        ))}
      </section>

      <section id="dich-vu" className="lp-section lp-services">
        <div className="lp-section-copy">
          <p className="lp-kicker">Dịch vụ nổi bật</p>
          <h2>Một landing page tốt giúp khách chọn gói nhanh mà vẫn cảm thấy được tư vấn.</h2>
        </div>
        <div className="lp-service-list">
          {services.map(([title, desc]) => (
            <article key={title}>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <span>Từ 390.000đ</span>
            </article>
          ))}
        </div>
      </section>

      <section id="quy-trinh" className="lp-section lp-process">
        <div className="lp-section-copy">
          <p className="lp-kicker">Quy trình</p>
          <h2>Khách biết điều gì sẽ xảy ra tiếp theo, nên họ dễ để lại thông tin hơn.</h2>
        </div>
        <div className="lp-step-grid">
          {steps.map(([number, label]) => (
            <div key={number}>
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-testimonial">
        <div>
          <p className="lp-kicker">Khách hàng nói gì</p>
          <blockquote>
            “Trang mới giúp khách đặt lịch rõ hơn hẳn. Chỉ cần xem một lần là họ biết nên chọn gói
            nào và liên hệ qua Zalo ngay.”
          </blockquote>
        </div>
        <div className="lp-rating">
          <strong>127</strong>
          <span>lịch hẹn trong tháng đầu</span>
        </div>
      </section>

      <section id="dat-lich" className="lp-contact">
        <div>
          <p className="lp-kicker">Form đặt lịch</p>
          <h2>Biến người xem thành khách tiềm năng ngay trên trang.</h2>
          <p>
            Có thể thay nội dung, ngành nghề, màu sắc và form theo dịch vụ thật của khách: spa, nha
            khoa, sửa chữa, tư vấn tài chính, lớp học, studio hoặc chăm sóc thú cưng.
          </p>
        </div>
        <form className="lp-form">
          <label>
            Họ tên
            <input placeholder="Tên của bạn" />
          </label>
          <label>
            Số điện thoại
            <input placeholder="Số điện thoại / Zalo" />
          </label>
          <label>
            Dịch vụ quan tâm
            <select defaultValue="">
              <option value="" disabled>
                Chọn dịch vụ
              </option>
              <option>Chăm sóc da chuyên sâu</option>
              <option>Massage thư giãn</option>
              <option>Tư vấn liệu trình</option>
            </select>
          </label>
          <button type="button" className="lp-btn lp-btn-primary">
            Gửi thông tin
          </button>
        </form>
      </section>
    </main>
  );
}
