const services = [
  ['Tư vấn chiến lược', 'Làm rõ mục tiêu, thị trường, khách hàng và lộ trình triển khai.'],
  ['Thiết kế nhận diện', 'Bộ nhận diện, guideline, tài liệu bán hàng và hồ sơ năng lực.'],
  ['Triển khai vận hành', 'Quy trình nội bộ, dashboard theo dõi và checklist bàn giao.'],
];

const projects = [
  ['Mộc An Cafe', 'Tái định vị thương hiệu và tăng 42% lượt đặt bàn online.'],
  ['GreenPack', 'Xây dựng hồ sơ năng lực giúp đội sales gửi proposal nhanh hơn.'],
  ['HomeCare+', 'Chuẩn hóa quy trình tư vấn và kịch bản chăm sóc khách hàng.'],
];

const team = ['Minh Khoa - Strategy Lead', 'Ngọc Anh - Brand Designer', 'Thanh Huy - Operation Consultant'];

export function CompanyIntroDemo() {
  return (
    <main className="ci-demo">
      <header className="ci-header">
        <a href="#top">NovaBuild</a>
        <nav aria-label="Điều hướng doanh nghiệp">
          <a href="#nang-luc">Năng lực</a>
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#du-an">Dự án</a>
          <a href="#lien-he">Liên hệ</a>
        </nav>
      </header>

      <section id="top" className="ci-hero">
        <div>
          <span>Business consulting studio</span>
          <h1>NovaBuild giúp doanh nghiệp nhỏ trình bày năng lực rõ ràng và đáng tin.</h1>
          <p>
            Mẫu web giới thiệu doanh nghiệp dành cho công ty cần kể câu chuyện thương hiệu, trình bày dịch vụ, dự án,
            đội ngũ, khách hàng và form liên hệ B2B.
          </p>
          <div className="ci-actions">
            <a href="#lien-he">Nhận hồ sơ năng lực</a>
            <a href="#du-an">Xem dự án</a>
          </div>
        </div>
        <aside>
          <strong>12+</strong>
          <span>năm kinh nghiệm tư vấn doanh nghiệp nhỏ</span>
        </aside>
      </section>

      <section id="nang-luc" className="ci-proof">
        {[
          ['80+', 'dự án đã triển khai'],
          ['6 ngành', 'kinh nghiệm thị trường'],
          ['4 tuần', 'có bộ tài liệu đầu tiên'],
          ['92%', 'khách hàng tiếp tục hợp tác'],
        ].map(([value, label]) => (
          <article key={value}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className="ci-section ci-about">
        <div>
          <span>Về công ty</span>
          <h2>Trang giới thiệu doanh nghiệp cần trả lời nhanh: bạn là ai, làm gì, có đáng tin không.</h2>
        </div>
        <p>
          NovaBuild là studio tư vấn thương hiệu và vận hành cho doanh nghiệp nhỏ. Website mẫu này ưu tiên sự rõ ràng:
          năng lực, phương pháp làm việc, dự án tiêu biểu, đội ngũ và lời mời liên hệ.
        </p>
      </section>

      <section id="dich-vu" className="ci-section">
        <div className="ci-section-head">
          <span>Dịch vụ</span>
          <h2>Các nhóm dịch vụ được trình bày như năng lực cốt lõi.</h2>
        </div>
        <div className="ci-service-grid">
          {services.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="du-an" className="ci-section ci-projects">
        <div className="ci-section-head">
          <span>Dự án tiêu biểu</span>
          <h2>Case study ngắn giúp khách B2B thấy kinh nghiệm thực tế.</h2>
        </div>
        <div className="ci-project-grid">
          {projects.map(([name, text]) => (
            <article key={name}>
              <span>{name}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ci-section ci-team">
        <div className="ci-section-head">
          <span>Đội ngũ</span>
          <h2>Đưa con người lên trang để tăng cảm giác tin cậy.</h2>
        </div>
        <div className="ci-team-grid">
          {team.map((member) => (
            <article key={member}>
              <div>{member.slice(0, 1)}</div>
              <strong>{member}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="lien-he" className="ci-contact">
        <div>
          <span>Liên hệ B2B</span>
          <h2>Form dành cho khách muốn nhận hồ sơ năng lực hoặc đặt lịch trao đổi.</h2>
          <p>Thông tin có thể gửi về email, CRM hoặc Google Sheet để đội sales phản hồi nhanh.</p>
        </div>
        <form>
          <label>
            Tên công ty
            <input placeholder="Công ty ABC" />
          </label>
          <label>
            Số điện thoại
            <input placeholder="0375 266 538" />
          </label>
          <label>
            Nhu cầu
            <select defaultValue="profile">
              <option value="profile">Nhận hồ sơ năng lực</option>
              <option value="consult">Đặt lịch tư vấn</option>
              <option value="proposal">Yêu cầu proposal</option>
            </select>
          </label>
          <button type="button">Gửi yêu cầu</button>
        </form>
      </section>
    </main>
  );
}
