'use client';

import { useMemo, useState } from 'react';

type Post = {
  id: string;
  author: string;
  role: string;
  content: string;
  likes: number;
  comments: string[];
  tone: string;
};

const initialPosts: Post[] = [
  {
    id: 'p1',
    author: 'Mai Anh',
    role: 'Chủ shop thủ công',
    content: 'Vừa hoàn thành bộ ảnh sản phẩm mới. Mọi người góp ý giúp mình phần mô tả có đủ rõ chưa nhé.',
    likes: 128,
    comments: ['Ảnh sáng đẹp, nên thêm giá combo.', 'Mô tả rõ rồi, thêm chính sách giao hàng nữa là ổn.'],
    tone: '#dbeafe',
  },
  {
    id: 'p2',
    author: 'Cộng đồng Local Biz',
    role: 'Nhóm doanh nghiệp nhỏ',
    content: 'Tuần này nhóm có buổi chia sẻ về cách chăm sóc khách cũ bằng nội dung ngắn và ưu đãi sinh nhật.',
    likes: 86,
    comments: ['Mình đăng ký tham gia.', 'Có replay không admin?'],
    tone: '#dcfce7',
  },
  {
    id: 'p3',
    author: 'Tuấn Studio',
    role: 'Nhiếp ảnh sản phẩm',
    content: 'Case study mới: đổi bố cục ảnh cover giúp tỷ lệ hỏi giá tăng rõ sau 2 tuần chạy thử.',
    likes: 204,
    comments: ['Hay quá, chia sẻ preset đi anh.', 'Cover mới nhìn chuyên nghiệp hơn.'],
    tone: '#fee2e2',
  },
];

const stories = ['Lan Anh', 'Minh Đức', 'YenNest', 'Cafe Mộc', 'Studio K'];
const contacts = ['Huyền Trang', 'Khánh Vân', 'Nam Design', 'An Market', 'Quỳnh Spa'];
const shortcuts = ['Bảng tin', 'Bạn bè', 'Nhóm', 'Marketplace', 'Kỷ niệm', 'Đã lưu'];

export function SocialFacebookDemo() {
  const [posts, setPosts] = useState(initialPosts);
  const [draft, setDraft] = useState('');
  const [activeTab, setActiveTab] = useState('Bảng tin');

  const totalNotifications = useMemo(() => posts.reduce((sum, post) => sum + post.comments.length, 0), [posts]);

  function publishPost() {
    const content = draft.trim();

    if (!content) {
      return;
    }

    setPosts((current) => [
      {
        id: `draft-${Date.now()}`,
        author: 'Bạn',
        role: 'Thành viên mới',
        content,
        likes: 0,
        comments: [],
        tone: '#fef3c7',
      },
      ...current,
    ]);
    setDraft('');
  }

  function likePost(postId: string) {
    setPosts((current) => current.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)));
  }

  function commentPost(postId: string) {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, 'Bình luận mẫu vừa được thêm.'] } : post,
      ),
    );
  }

  return (
    <main className="fb-demo">
      <header className="fb-topbar">
        <div className="fb-brand">
          <strong>FaceSpace</strong>
          <input aria-label="Tìm kiếm" placeholder="Tìm kiếm trên FaceSpace" />
        </div>
        <nav aria-label="Điều hướng mạng xã hội">
          {['Bảng tin', 'Video', 'Nhóm', 'Cửa hàng'].map((tab) => (
            <button className={activeTab === tab ? 'active' : undefined} key={tab} type="button" onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </nav>
        <div className="fb-actions" aria-label="Tài khoản">
          <button type="button">+</button>
          <button type="button">💬</button>
          <button type="button">{totalNotifications}</button>
        </div>
      </header>

      <div className="fb-layout">
        <aside className="fb-sidebar" aria-label="Lối tắt">
          <div className="fb-profile-chip">
            <span>KV</span>
            <strong>Khánh Vân</strong>
          </div>
          {shortcuts.map((item) => (
            <button className={activeTab === item ? 'active' : undefined} key={item} type="button" onClick={() => setActiveTab(item)}>
              {item}
            </button>
          ))}
        </aside>

        <section className="fb-feed" aria-label="Bảng tin">
          <div className="fb-stories">
            {stories.map((story, index) => (
              <article key={story}>
                <span>{story.slice(0, 1)}</span>
                <strong>{story}</strong>
                <small>{index === 0 ? 'Tạo tin' : 'Tin mới'}</small>
              </article>
            ))}
          </div>

          <section className="fb-composer">
            <div>
              <span>KV</span>
              <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Bạn đang nghĩ gì?" />
            </div>
            <footer>
              <button type="button">Ảnh/video</button>
              <button type="button">Cảm xúc</button>
              <button type="button" onClick={publishPost}>
                Đăng
              </button>
            </footer>
          </section>

          {posts.map((post) => (
            <article className="fb-post" key={post.id}>
              <header>
                <span>{post.author.slice(0, 1)}</span>
                <div>
                  <strong>{post.author}</strong>
                  <small>{post.role} · vừa xong</small>
                </div>
              </header>
              <p>{post.content}</p>
              <div className="fb-post-media" style={{ background: post.tone }}>
                <strong>{post.author}</strong>
                <span>Nội dung nổi bật</span>
              </div>
              <div className="fb-post-meta">
                <span>{post.likes} lượt thích</span>
                <span>{post.comments.length} bình luận</span>
              </div>
              <footer>
                <button type="button" onClick={() => likePost(post.id)}>
                  Thích
                </button>
                <button type="button" onClick={() => commentPost(post.id)}>
                  Bình luận
                </button>
                <button type="button">Chia sẻ</button>
              </footer>
              <div className="fb-comments">
                {post.comments.map((comment, index) => (
                  <p key={`${post.id}-${index}`}>{comment}</p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <aside className="fb-rightbar" aria-label="Liên hệ và nhóm">
          <section>
            <h2>Gợi ý nhóm</h2>
            {['Kinh doanh nhỏ Việt Nam', 'Cộng đồng creator', 'Mua bán địa phương'].map((group) => (
              <article key={group}>
                <strong>{group}</strong>
                <button type="button">Tham gia</button>
              </article>
            ))}
          </section>
          <section>
            <h2>Người liên hệ</h2>
            {contacts.map((contact) => (
              <div className="fb-contact" key={contact}>
                <span>{contact.slice(0, 1)}</span>
                <strong>{contact}</strong>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </main>
  );
}
