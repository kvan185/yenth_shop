import Link from "next/link";

export const metadata = {
  title: "Blog | Mẹo học tiếng Anh",
  description:
    "Bài viết ngắn về học từ vựng, ngữ pháp, luyện đề và duy trì thói quen tiếng Anh.",
};

const featuredPost = {
  category: "Vocabulary",
  title: "Cách học 30 từ mỗi ngày mà vẫn nhớ được sau một tuần",
  excerpt:
    "Một phiên học tốt không bắt đầu bằng danh sách dài. Hãy chia từ theo nhóm nhỏ, kiểm tra ngay và quay lại đúng các từ vừa sai.",
  readTime: "6 phút đọc",
  href: "/vocabulary/b1",
};

const posts = [
  {
    category: "Grammar",
    title: "Học 12 thì tiếng Anh theo dấu hiệu và tình huống",
    excerpt:
      "Đừng học từng thì như một bảng riêng lẻ. Ghép thì với mốc thời gian, ngữ cảnh và lỗi thường gặp sẽ dễ nhớ hơn.",
    readTime: "8 phút đọc",
    href: "/grammar/tenses",
  },
  {
    category: "Exam",
    title: "Trước khi làm đề dài, hãy làm mini test đúng cách",
    excerpt:
      "Mini test giúp phát hiện điểm yếu nhanh hơn nếu bạn ghi lại lỗi sai và quay về ôn đúng phần bị hổng.",
    readTime: "5 phút đọc",
    href: "/exams",
  },
  {
    category: "Review",
    title: "Vì sao nên ôn từ sai trong vòng 24 giờ",
    excerpt:
      "Khoảng thời gian ngay sau khi trả lời sai là lúc não còn giữ ngữ cảnh. Ôn lại sớm giúp giảm số lần quên lặp lại.",
    readTime: "4 phút đọc",
    href: "/review/weak-words",
  },
  {
    category: "Dictionary",
    title: "Tra từ không chỉ là xem nghĩa tiếng Việt",
    excerpt:
      "Một lần tra từ nên kiểm tra level, ví dụ, loại từ và cách dùng trong câu để tránh hiểu đúng nghĩa nhưng dùng sai.",
    readTime: "4 phút đọc",
    href: "/dictionary",
  },
];

export default function BlogPage() {
  return (
    <main className="blogPage">
      <section className="blogHero">
        <div className="blogHeroCopy">
          <p className="homeEyebrow">Blog</p>
          <h1>Mẹo học ngắn</h1>
          <p>Đọc một ý, mở bài luyện liên quan, rồi kiểm tra lại bằng quiz.</p>
          <div className="homeHeroActions">
            <Link className="primaryButton" href="/vocabulary">
              Bắt đầu học
            </Link>
            <Link className="secondaryButton" href="/review">
              Ôn lại lỗi sai
            </Link>
          </div>
        </div>

        <aside className="blogFeaturePanel" aria-label="Bài nổi bật">
          <span>{featuredPost.category}</span>
          <h2>{featuredPost.title}</h2>
          <p>{featuredPost.excerpt}</p>
          <div className="blogPostMeta">
            <small>{featuredPost.readTime}</small>
            <Link href={featuredPost.href}>Đọc và luyện</Link>
          </div>
        </aside>
      </section>

      <section className="blogContentSection">
        <div className="blogPostColumn">
          <div className="sectionHead">
            <span>Bài mới</span>
            <h2>Đọc ít, luyện ngay</h2>
          </div>
          <div className="blogPostList">
            {posts.map((post) => (
              <article className="blogPostCard" key={post.title}>
                <div>
                  <span>{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <div className="blogPostMeta">
                  <small>{post.readTime}</small>
                  <Link href={post.href}>Mở bài luyện</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
