import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mẫu website cá nhân / portfolio',
  description:
    'Demo website cá nhân / portfolio dành cho freelancer, chuyên gia, creator hoặc người làm thương hiệu cá nhân.',
};

const skills = [
  'Tư vấn thương hiệu cá nhân',
  'Thiết kế landing page',
  'Viết nội dung chuyển đổi',
  'Tối ưu SEO nền tảng',
];

const projects = [
  {
    name: 'Rebrand chuyên gia tư vấn',
    type: 'Branding / Website',
    desc: 'Xây lại hồ sơ online, làm rõ dịch vụ chính và tăng số cuộc hẹn tư vấn từ khách tìm kiếm.',
  },
  {
    name: 'Landing page khóa học',
    type: 'Education',
    desc: 'Trang giới thiệu khóa học, lịch khai giảng, đánh giá học viên và form đăng ký nhanh.',
  },
  {
    name: 'Portfolio nhiếp ảnh gia',
    type: 'Creative',
    desc: 'Bộ sưu tập dự án, câu chuyện cá nhân và trang liên hệ cho khách đặt lịch chụp.',
  },
];

const milestones = [
  ['36+', 'Dự án hoàn thành'],
  ['4 năm', 'Kinh nghiệm freelance'],
  ['92%', 'Khách quay lại'],
];

export default function PortfolioTemplatePage() {
  return (
    <main className="pf-page">
      <header className="pf-header">
        <Link href="/" className="pf-logo">
          Linh Tran
        </Link>
        <nav aria-label="Điều hướng mẫu portfolio">
          <a href="#du-an">Dự án</a>
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#lien-he">Liên hệ</a>
        </nav>
      </header>

      <section className="pf-hero">
        <div className="pf-hero-copy">
          <p className="pf-kicker">Personal portfolio template</p>
          <h1>Xin chào, tôi là Linh, chuyên giúp thương hiệu cá nhân kể câu chuyện rõ ràng hơn.</h1>
          <p>
            Đây là mẫu website dành cho freelancer, chuyên gia tư vấn, creator hoặc người muốn có
            một hồ sơ online đẹp, đáng tin và dễ nhận liên hệ từ khách hàng mới.
          </p>
          <div className="pf-actions">
            <a href="#lien-he" className="pf-btn pf-btn-dark">
              Đặt lịch trao đổi
            </a>
            <a href="#du-an" className="pf-btn pf-btn-light">
              Xem dự án
            </a>
          </div>
        </div>
        <div className="pf-portrait-wrap">
          <Image
            src="/images/templates/portfolio-portrait.png"
            alt="Chân dung chuyên nghiệp cho mẫu website portfolio"
            fill
            priority
            className="pf-portrait"
            sizes="(max-width: 860px) 100vw, 40vw"
          />
          <div className="pf-portrait-note">
            <strong>Available for selected projects</strong>
            <span>Brand strategy, website, content direction</span>
          </div>
        </div>
      </section>

      <section className="pf-strip" aria-label="Thành tựu nổi bật">
        {milestones.map(([metric, label]) => (
          <div key={label}>
            <strong>{metric}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section id="dich-vu" className="pf-section pf-about">
        <div>
          <p className="pf-kicker">Về tôi</p>
          <h2>Tôi kết hợp chiến lược nội dung, thiết kế tinh gọn và website dễ dùng.</h2>
        </div>
        <div className="pf-about-text">
          <p>
            Khách hàng không chỉ cần biết bạn làm gì, họ cần thấy vì sao nên tin bạn. Mẫu này giúp
            trình bày câu chuyện cá nhân, năng lực, dịch vụ và lời chứng thực trong một hành trình
            đọc tự nhiên.
          </p>
          <div className="pf-skill-grid">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="du-an" className="pf-section pf-work">
        <div className="pf-section-heading">
          <p className="pf-kicker">Dự án chọn lọc</p>
          <h2>Một vài kiểu case study có thể đưa vào portfolio.</h2>
        </div>
        <div className="pf-project-grid">
          {projects.map((project) => (
            <article key={project.name} className="pf-project-card">
              <span>{project.type}</span>
              <h3>{project.name}</h3>
              <p>{project.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pf-section pf-testimonial">
        <blockquote>
          “Trang portfolio mới giúp khách hiểu tôi làm gì chỉ trong vài phút. Quan trọng hơn, họ
          liên hệ với nhu cầu rõ ràng hơn trước.”
        </blockquote>
        <div>
          <strong>Minh Anh</strong>
          <span>Founder, MA Studio</span>
        </div>
      </section>

      <section id="lien-he" className="pf-contact">
        <div>
          <p className="pf-kicker">Liên hệ</p>
          <h2>Sẵn sàng biến hồ sơ cá nhân thành một website chuyên nghiệp?</h2>
          <p>
            Bạn có thể thay toàn bộ tên, ảnh, màu sắc, dịch vụ, dự án và form liên hệ theo thương
            hiệu thật của khách.
          </p>
        </div>
        <form className="pf-form">
          <label>
            Email
            <input type="email" placeholder="hello@example.com" />
          </label>
          <label>
            Lời nhắn
            <textarea rows={4} placeholder="Tôi muốn xây portfolio cho..." />
          </label>
          <button type="button" className="pf-btn pf-btn-dark">
            Gửi yêu cầu
          </button>
        </form>
      </section>
    </main>
  );
}
