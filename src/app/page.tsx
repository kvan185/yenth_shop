import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: 'Website giới thiệu',
    text: 'Trang cá nhân, hồ sơ năng lực, landing page dịch vụ hoặc trang thương hiệu có nội dung rõ ràng và dễ tạo niềm tin.',
  },
  {
    title: 'Website bán hàng',
    text: 'Gian hàng online có danh mục sản phẩm, giỏ hàng, trang liên hệ và phần quản trị cơ bản để cập nhật nội dung.',
  },
  {
    title: 'Tối ưu tìm kiếm',
    text: 'Cấu trúc SEO nền tảng, tốc độ tải tốt, nội dung theo từ khóa khách hàng hay tìm và dữ liệu chia sẻ mạng xã hội.',
  },
  {
    title: 'Chăm sóc sau bàn giao',
    text: 'Hỗ trợ chỉnh sửa, thêm tính năng, hướng dẫn quản trị và đồng hành khi website bắt đầu có khách truy cập.',
  },
];

const process = [
  ['01', 'Hiểu nhu cầu', 'Trao đổi ngành nghề, khách hàng mục tiêu, nội dung sẵn có và cách bạn muốn nhận liên hệ.'],
  ['02', 'Dựng giao diện', 'Thiết kế bố cục, màu sắc, nội dung chính và trải nghiệm trên điện thoại trước khi hoàn thiện.'],
  ['03', 'Phát triển web', 'Code website, tối ưu tốc độ, SEO cơ bản, form liên hệ, đo lường và kiểm tra lỗi hiển thị.'],
  ['04', 'Bàn giao & hỗ trợ', 'Hướng dẫn sử dụng, deploy tên miền, bàn giao mã nguồn và tiếp tục hỗ trợ khi cần nâng cấp.'],
];

const packages = [
  {
    name: 'Starter',
    price: 'Từ 2.500.000đ',
    desc: 'Phù hợp cá nhân hoặc dịch vụ mới cần một trang giới thiệu nhanh, đẹp và có form liên hệ.',
  },
  {
    name: 'Business',
    price: 'Từ 5.500.000đ',
    desc: 'Dành cho cửa hàng, công ty nhỏ hoặc thương hiệu cần nhiều trang, nội dung SEO và quản trị cơ bản.',
  },
  {
    name: 'Custom',
    price: 'Báo giá theo yêu cầu',
    desc: 'Xây tính năng riêng như đặt lịch, quản lý sản phẩm, blog, tài khoản, dashboard hoặc tích hợp hệ thống.',
  },
];

const works = [
  'Landing page dịch vụ',
  'Website bán hàng yến sào',
  'Trang cá nhân chuyên gia',
  'Blog chia sẻ kiến thức',
  'Trang doanh nghiệp nhỏ',
  'Mini CRM nội bộ',
];

const templates = [
  {
    title: 'Website cá nhân / portfolio',
    desc: 'Mẫu dành cho freelancer, chuyên gia, creator hoặc người cần một hồ sơ online chuyên nghiệp.',
    href: '/mau/portfolio',
    tag: 'Demo mới',
  },
  {
    title: 'Landing page dịch vụ',
    desc: 'Mẫu một trang cho spa, tư vấn, lớp học, sửa chữa hoặc dịch vụ địa phương cần khách đặt lịch nhanh.',
    href: '/mau/landing-page-dich-vu',
    tag: 'Dễ chốt khách',
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/">
          YenTH<span>.shop</span>
        </Link>
        <nav aria-label="Điều hướng chính">
          <Link href="#dich-vu">Dịch vụ</Link>
          <Link href="#quy-trinh">Quy trình</Link>
          <Link href="#bang-gia">Bảng giá</Link>
          <Link href="#lien-he">Liên hệ</Link>
        </nav>
      </header>

      <section className="hero">
        <Image
          src="/images/hero-workspace.png"
          alt="Không gian làm việc thiết kế website hiện đại"
          fill
          priority
          className="hero-image"
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Thiết kế website cho người kinh doanh online</p>
          <h1>Xin chào, tôi xây dựng website giúp khách hàng tìm thấy bạn trên web.</h1>
          <p>
            Tôi là người đứng sau YenTH Shop, chuyên làm website giới thiệu, landing page,
            website bán hàng và hệ thống quản trị nhỏ cho cá nhân, cửa hàng, thương hiệu mới.
          </p>
          <div className="hero-actions">
            <Link href="#lien-he" className="btn btn-primary">
              Tư vấn dự án
            </Link>
            <Link href="#dich-vu" className="btn btn-secondary">
              Xem dịch vụ
            </Link>
          </div>
          <div className="hero-stats" aria-label="Điểm mạnh dịch vụ">
            <span>Responsive</span>
            <span>SEO nền tảng</span>
            <span>Dễ quản trị</span>
          </div>
        </div>
      </section>

      <section className="intro section">
        <div>
          <p className="eyebrow">Về tôi</p>
          <h2>Làm web không chỉ là dựng giao diện, mà là biến dịch vụ của bạn thành một điểm chạm đáng tin.</h2>
        </div>
        <p>
          Tôi tập trung vào các website thực dụng: tải nhanh, rõ nội dung, nhìn chuyên nghiệp trên
          điện thoại và có đường liên hệ đủ rõ để khách không phải đoán. Nếu bạn đang bắt đầu bán
          hàng, làm thương hiệu cá nhân hoặc cần một trang giới thiệu dịch vụ, YenTH Shop là nơi để
          bạn đặt nền móng online đầu tiên.
        </p>
      </section>

      <section id="dich-vu" className="section services">
        <div className="section-heading">
          <p className="eyebrow">Dịch vụ</p>
          <h2>Tôi có thể xây gì cho bạn?</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="quy-trinh" className="section process-section">
        <div className="section-heading">
          <p className="eyebrow">Quy trình</p>
          <h2>Làm rõ từ đầu, triển khai gọn từng bước.</h2>
        </div>
        <div className="process-list">
          {process.map(([number, title, text]) => (
            <article key={number} className="process-item">
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio section">
        <div className="portfolio-copy">
          <p className="eyebrow">Kiểu dự án phù hợp</p>
          <h2>Ưu tiên các website nhỏ đến vừa, cần ra mắt nhanh nhưng vẫn chỉn chu.</h2>
          <p>
            Mỗi dự án được xây theo mục tiêu thật: giới thiệu bản thân, lấy khách hàng tiềm năng,
            bán sản phẩm, chia sẻ kiến thức hoặc quản lý nội dung. Bạn không cần biết kỹ thuật trước,
            chỉ cần có ý tưởng và mong muốn kinh doanh rõ ràng.
          </p>
        </div>
        <div className="work-tags">
          {works.map((work) => (
            <span key={work}>{work}</span>
          ))}
        </div>
      </section>

      <section className="section template-showcase">
        <div className="section-heading">
          <p className="eyebrow">Mẫu giao diện</p>
          <h2>Khách có thể xem mẫu thật trước khi chọn hướng triển khai.</h2>
        </div>
        <div className="template-grid">
          {templates.map((template) => (
            <article className="template-card" key={template.href}>
              <span>{template.tag}</span>
              <h3>{template.title}</h3>
              <p>{template.desc}</p>
              <Link href={template.href} className="text-link">
                Xem demo
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="bang-gia" className="section pricing">
        <div className="section-heading">
          <p className="eyebrow">Gói tham khảo</p>
          <h2>Chọn mức phù hợp, rồi tinh chỉnh theo nhu cầu thật.</h2>
        </div>
        <div className="pricing-grid">
          {packages.map((item) => (
            <article className="price-card" key={item.name}>
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <p>{item.desc}</p>
              <Link href="#lien-he" className="text-link">
                Trao đổi gói này
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="lien-he" className="contact">
        <div className="contact-copy">
          <p className="eyebrow">Bắt đầu dự án</p>
          <h2>Kể tôi nghe bạn muốn website làm được điều gì.</h2>
          <p>
            Gửi mô tả ngắn về ngành nghề, số trang cần có, ngân sách dự kiến và thời gian mong muốn.
            Tôi sẽ phản hồi bằng hướng triển khai rõ ràng.
          </p>
          <div className="contact-links">
            <a href="tel:0375266538">Hotline: 0375 266 538</a>
            <a href="mailto:khanhvan18052004@gmail.com">khanhvan18052004@gmail.com</a>
            <a href="https://zalo.me/0375266538" target="_blank" rel="noreferrer">
              Chat Zalo
            </a>
          </div>
        </div>
        <form className="contact-form" action="mailto:khanhvan18052004@gmail.com" method="post" encType="text/plain">
          <label>
            Họ tên
            <input name="name" placeholder="Tên của bạn" required />
          </label>
          <label>
            Số điện thoại
            <input name="phone" placeholder="Số điện thoại hoặc Zalo" required />
          </label>
          <label>
            Nhu cầu website
            <textarea name="message" placeholder="Ví dụ: Tôi cần website giới thiệu dịch vụ spa..." rows={5} required />
          </label>
          <button className="btn btn-primary" type="submit">
            Gửi yêu cầu
          </button>
        </form>
      </section>

      <footer className="footer">
        <strong>YenTH.shop</strong>
        <span>Dịch vụ xây dựng website online cho cá nhân, cửa hàng và doanh nghiệp nhỏ.</span>
      </footer>
    </main>
  );
}
