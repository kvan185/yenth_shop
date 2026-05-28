import Link from 'next/link';

const posts = [
  ['Linh Tran', 'Vừa cập nhật portfolio mới cho khách hàng ngành spa. Giao diện mobile nhìn mượt hơn hẳn.'],
  ['Cafe Góc Nhỏ', 'Cuối tuần này có menu mới, ai ghé quán nhớ thử trà đào cam sả nhé.'],
  ['YenTH Community', 'Bạn đang cần mẫu mạng xã hội nội bộ, group học viên hay cộng đồng khách hàng?'],
];

export default function SampleSocialPage() {
  return (
    <main className="sample-social">
      <header className="social-topbar">
        <Link href="/mau">YenBook</Link>
        <input placeholder="Tìm kiếm trong mạng xã hội mẫu" />
        <nav>
          <a>Home</a>
          <a>Watch</a>
          <a>Groups</a>
        </nav>
      </header>

      <div className="social-layout">
        <aside className="social-sidebar">
          <strong>Menu</strong>
          <span>Bảng tin</span>
          <span>Bạn bè</span>
          <span>Nhóm</span>
          <span>Marketplace</span>
          <Link href="/lien-he">Chọn mẫu này</Link>
        </aside>

        <section className="social-feed">
          <div className="story-row">
            <article>Story 1</article>
            <article>Story 2</article>
            <article>Story 3</article>
          </div>
          <div className="composer">Bạn đang nghĩ gì?</div>
          {posts.map(([name, content]) => (
            <article className="social-post" key={name}>
              <div>
                <span />
                <strong>{name}</strong>
              </div>
              <p>{content}</p>
              <div className="post-actions">
                <button>Thích</button>
                <button>Bình luận</button>
                <button>Chia sẻ</button>
              </div>
            </article>
          ))}
        </section>

        <aside className="social-contacts">
          <strong>Liên hệ</strong>
          <span>Minh Anh</span>
          <span>Quốc Bảo</span>
          <span>Thanh Vy</span>
          <span>Hải Nam</span>
        </aside>
      </div>
    </main>
  );
}
