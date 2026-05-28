const categories = ['Kinh doanh', 'Công nghệ', 'Marketing', 'Đời sống', 'Góc nhìn'];

const posts = [
  ['5 cách doanh nghiệp nhỏ xây kênh nội dung bền vững', 'Marketing', '8 phút đọc'],
  ['AI đang thay đổi quy trình chăm sóc khách hàng ra sao?', 'Công nghệ', '6 phút đọc'],
  ['Case study: tăng 32% lead từ một cụm bài SEO địa phương', 'Kinh doanh', '10 phút đọc'],
  ['Làm newsletter ít nhưng đều: lịch biên tập 4 tuần', 'Góc nhìn', '5 phút đọc'],
];

const trending = [
  'Checklist tối ưu bài viết trước khi đăng',
  'Mẫu lịch nội dung cho thương hiệu dịch vụ',
  'Cách đặt CTA trong bài blog không gây khó chịu',
  'Nên viết bài dài hay bài ngắn cho SEO?',
];

export function BlogNewsDemo() {
  return (
    <main className="bn-demo">
      <header className="bn-header">
        <a href="#top">Insight Daily</a>
        <nav aria-label="Điều hướng blog">
          {categories.map((category) => (
            <a href="#bai-viet" key={category}>
              {category}
            </a>
          ))}
        </nav>
      </header>

      <section id="top" className="bn-hero">
        <article>
          <span>Featured story</span>
          <h1>Blog tốt biến kiến thức thành lượt truy cập, niềm tin và khách hàng tiềm năng.</h1>
          <p>
            Mẫu web blog / tin tức dành cho doanh nghiệp cần xuất bản bài viết SEO, chuyên mục, bài nổi bật, tin mới,
            sidebar xu hướng và form nhận bản tin.
          </p>
          <a href="#bai-viet">Đọc bài mới</a>
        </article>
        <aside>
          <strong>Tuần này</strong>
          <p>12 bài viết mới, 4 chuyên mục, 1 newsletter gửi sáng thứ Hai.</p>
        </aside>
      </section>

      <section className="bn-categories">
        {categories.map((category) => (
          <article key={category}>
            <strong>{category}</strong>
            <span>Chuyên mục</span>
          </article>
        ))}
      </section>

      <section id="bai-viet" className="bn-layout">
        <div>
          <div className="bn-section-head">
            <span>Bài viết mới</span>
            <h2>Dòng bài mới được thiết kế để người đọc quét nhanh và chọn bài phù hợp.</h2>
          </div>
          <div className="bn-post-list">
            {posts.map(([title, category, time]) => (
              <article key={title}>
                <div>{category.slice(0, 1)}</div>
                <section>
                  <span>{category} · {time}</span>
                  <h3>{title}</h3>
                  <p>Tóm tắt ngắn giúp người đọc hiểu nhanh giá trị của bài trước khi mở trang chi tiết.</p>
                </section>
              </article>
            ))}
          </div>
        </div>

        <aside className="bn-sidebar">
          <section>
            <h2>Đang được đọc</h2>
            {trending.map((item, index) => (
              <article key={item}>
                <strong>0{index + 1}</strong>
                <p>{item}</p>
              </article>
            ))}
          </section>
          <section className="bn-newsletter">
            <h2>Nhận bản tin</h2>
            <p>Mỗi tuần một email ngắn về nội dung, SEO và tăng trưởng.</p>
            <input placeholder="Email của bạn" />
            <button type="button">Đăng ký</button>
          </section>
        </aside>
      </section>

      <section className="bn-editorial">
        <div>
          <span>Editorial system</span>
          <h2>Website blog cần có hệ thống nội dung, không chỉ một danh sách bài viết.</h2>
        </div>
        <div className="bn-editorial-grid">
          {['Chuyên mục rõ', 'Bài nổi bật', 'SEO metadata', 'CTA cuối bài'].map((item) => (
            <article key={item}>
              <h3>{item}</h3>
              <p>Khối này có thể mở rộng thành trang chuyên mục, tag, tác giả hoặc bài viết chi tiết.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
