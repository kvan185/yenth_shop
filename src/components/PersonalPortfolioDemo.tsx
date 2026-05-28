const projects = [
  ['Brand system cho Bloom Cafe', 'Thiết kế nhận diện, menu, social kit và landing page khai trương.'],
  ['Dashboard cho đội sales', 'Prototype dashboard theo dõi lead, lịch hẹn và tỷ lệ chuyển đổi.'],
  ['Website portfolio nghệ sĩ', 'Trang cá nhân kể câu chuyện, dự án, press kit và form booking.'],
];

const skills = ['Brand strategy', 'UI design', 'Webflow/Next.js', 'Copywriting', 'Design system', 'Product thinking'];

const timeline = [
  ['2026', 'Freelance designer cho thương hiệu dịch vụ nhỏ'],
  ['2024', 'Lead UI cho 12 dự án landing page và website bán hàng'],
  ['2022', 'Bắt đầu làm brand identity và social content kit'],
];

export function PersonalPortfolioDemo() {
  return (
    <main className="pfv-demo">
      <header className="pfv-header">
        <a href="#top">Linh Studio</a>
        <nav aria-label="Điều hướng portfolio">
          <a href="#du-an">Dự án</a>
          <a href="#ky-nang">Kỹ năng</a>
          <a href="#kinh-nghiem">Kinh nghiệm</a>
          <a href="#lien-he">Liên hệ</a>
        </nav>
      </header>

      <section id="top" className="pfv-hero">
        <div>
          <span>Independent brand & web designer</span>
          <h1>Tôi giúp thương hiệu nhỏ có diện mạo rõ ràng, đẹp và dễ chuyển đổi.</h1>
          <p>
            Mẫu portfolio cá nhân dành cho freelancer, chuyên gia hoặc creator cần giới thiệu câu chuyện, dịch vụ,
            dự án nổi bật, kỹ năng, kinh nghiệm và cách liên hệ chuyên nghiệp.
          </p>
          <div className="pfv-actions">
            <a href="#du-an">Xem dự án</a>
            <a href="#lien-he">Đặt lịch trao đổi</a>
          </div>
        </div>
        <aside>
          <div>LT</div>
          <strong>Linh Tran</strong>
          <span>Brand & Web Designer</span>
        </aside>
      </section>

      <section className="pfv-strip">
        {[
          ['38+', 'dự án hoàn thành'],
          ['7 ngành', 'đã từng cộng tác'],
          ['4.9/5', 'đánh giá khách hàng'],
        ].map(([value, label]) => (
          <article key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className="pfv-section pfv-about">
        <div>
          <span>Giới thiệu</span>
          <h2>Portfolio tốt không chỉ khoe việc đã làm, mà giải thích cách bạn tạo giá trị.</h2>
        </div>
        <p>
          Trang này ưu tiên câu chuyện cá nhân, chuyên môn, dự án tiêu biểu và lời mời hợp tác. Nội dung có thể đổi
          sang developer, photographer, consultant, coach hoặc creator.
        </p>
      </section>

      <section id="du-an" className="pfv-section">
        <div className="pfv-section-head">
          <span>Dự án nổi bật</span>
          <h2>Mỗi dự án là một bằng chứng năng lực ngắn gọn.</h2>
        </div>
        <div className="pfv-project-grid">
          {projects.map(([title, text]) => (
            <article key={title}>
              <span>Case study</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="ky-nang" className="pfv-section pfv-skills">
        <div className="pfv-section-head">
          <span>Kỹ năng</span>
          <h2>Cho khách biết bạn làm tốt những việc gì.</h2>
        </div>
        <div className="pfv-skill-list">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="kinh-nghiem" className="pfv-section">
        <div className="pfv-section-head">
          <span>Kinh nghiệm</span>
          <h2>Mốc thời gian giúp hồ sơ cá nhân có chiều sâu.</h2>
        </div>
        <div className="pfv-timeline">
          {timeline.map(([year, text]) => (
            <article key={year}>
              <strong>{year}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pfv-testimonial">
        <blockquote>
          “Linh không chỉ thiết kế đẹp, bạn ấy giúp chúng tôi nói rõ mình là ai và khách nên làm gì tiếp theo.”
        </blockquote>
        <strong>Mai Anh, Founder Bloom Cafe</strong>
      </section>

      <section id="lien-he" className="pfv-contact">
        <div>
          <span>Liên hệ</span>
          <h2>Sẵn sàng nhận dự án mới trong tháng này.</h2>
          <p>Form phù hợp để nhận brief, yêu cầu báo giá hoặc lịch trao đổi đầu tiên.</p>
        </div>
        <form>
          <label>
            Họ tên
            <input placeholder="Nguyễn Văn A" />
          </label>
          <label>
            Email
            <input placeholder="hello@example.com" />
          </label>
          <label>
            Dự án cần làm
            <textarea placeholder="Mô tả ngắn nhu cầu của bạn" />
          </label>
          <button type="button">Gửi brief</button>
        </form>
      </section>
    </main>
  );
}
