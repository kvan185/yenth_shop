import Link from "next/link";

const learningModules = [
  {
    href: "/vocabulary",
    code: "VOC",
    title: "Từ vựng",
    text: "Học theo level, lật flashcard và làm quiz để ghi nhớ chủ động.",
  },
  {
    href: "/grammar",
    code: "GRA",
    title: "Ngữ pháp",
    text: "Nắm cấu trúc trọng tâm bằng ví dụ ngắn và bài kiểm tra nhanh.",
  },
  {
    href: "/learn/listening",
    code: "LIS",
    title: "Listening",
    text: "Nghe theo transcript, luyện bắt ý chính và phản xạ từng đoạn.",
  },
  {
    href: "/learn/reading",
    code: "REA",
    title: "Reading",
    text: "Đọc bài ngắn theo cấp độ, trả lời câu hỏi và học từ trong ngữ cảnh.",
  },
  {
    href: "/learn/writing",
    code: "WRI",
    title: "Writing",
    text: "Luyện dàn ý, câu mẫu và chỉnh lỗi diễn đạt từng bước.",
  },
  {
    href: "/learn/speaking",
    code: "SPE",
    title: "Speaking",
    text: "Chuẩn bị câu trả lời, luyện phát âm và mở rộng ý nói.",
  },
];

const todayTasks = [
  { label: "Ôn từ yếu", meta: "12 từ", href: "/review/weak-words" },
  { label: "Quiz nhanh", meta: "10 câu", href: "/practice/multiple-choice" },
  { label: "Tiếp tục level", meta: "A2", href: "/vocabulary/a2" },
];

const reviewCards = [
  {
    href: "/review/today",
    title: "Ôn hôm nay",
    text: "Các từ và câu hỏi nên nhắc lại trong ngày.",
  },
  {
    href: "/review/mistakes",
    title: "Sửa lỗi sai",
    text: "Xem lại những đáp án sai để tránh lặp lại.",
  },
  {
    href: "/dictionary",
    title: "Tra nhanh",
    text: "Tìm nghĩa, ví dụ và level của từ trong bộ dữ liệu.",
  },
];

export default function HomePage() {
  return (
    <main className="homePage">
      <section className="homeHero">
        <div className="homeHeroCopy">
          <p className="homeEyebrow">YENTH English Learning</p>
          <h1>Vào là biết hôm nay cần học gì.</h1>
          <p className="homeLead">
            Một không gian học tiếng Anh gọn cho từ vựng, quiz, flashcard, ôn lỗi sai và
            theo dõi tiến độ theo từng level.
          </p>

          <div className="homeHeroActions">
            <Link className="primaryButton" href="/vocabulary">
              Bắt đầu học ngay
            </Link>
            <Link className="secondaryButton" href="/learn">
              Xem lộ trình
            </Link>
          </div>

          <div className="homeBadges" aria-label="Thống kê học tập">
            <span>Học theo level</span>
            <span>Quiz ngắn</span>
            <span>Ôn điểm yếu</span>
          </div>
        </div>

        <aside className="todayPanel" aria-label="Nhiệm vụ học hôm nay">
          <div className="todayPanelHead">
            <span>Hôm nay</span>
            <strong>A2 Vocabulary</strong>
          </div>
          <h2>Tiếp tục bài đang học</h2>
          <p>Ôn 12 từ còn yếu, sau đó làm quiz 10 câu để chốt lại trước khi chuyển bài.</p>
          <div className="todayProgress" aria-label="Tiến độ A2 68%">
            <span style={{ width: "68%" }} />
          </div>
          <div className="todayTaskList">
            {todayTasks.map((task) => (
              <Link href={task.href} key={task.label}>
                <span>{task.label}</span>
                <strong>{task.meta}</strong>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="homeSection homeDashboard">
        <div className="sectionHead">
          <span>Trung tâm học tập</span>
          <h2>Chọn đúng việc cần làm tiếp theo</h2>
        </div>
        <div className="dashboardGrid">
          <article className="studyCard primaryStudyCard">
            <span>Tiếp tục</span>
            <h3>A2 Vocabulary Checkpoint</h3>
            <p>Hoàn thành phần ôn từ yếu trước, rồi chuyển sang bài kiểm tra nhanh.</p>
            <Link className="primaryButton" href="/vocabulary/a2">
              Mở bài A2
            </Link>
          </article>
          <article className="studyCard">
            <span>Tiến độ</span>
            <h3>68%</h3>
            <p>A2 đang học, B1 sẵn sàng mở sau khi hoàn thành checkpoint.</p>
          </article>
          <article className="studyCard">
            <span>Ôn tập</span>
            <h3>12 từ yếu</h3>
            <p>Các từ sai nhiều sẽ được ưu tiên trong phiên học hôm nay.</p>
          </article>
        </div>
      </section>

      <section className="homeSection">
        <div className="sectionHead">
          <span>Module học tập</span>
          <h2>Học theo kỹ năng, không bị lạc hướng</h2>
        </div>
        <div className="featureGrid">
          {learningModules.map((card) => (
            <Link className="featureCard" href={card.href} key={card.title}>
              <strong>
                <span aria-hidden="true">{card.code}</span>
                {card.title}
              </strong>
              <p>{card.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="homeSection learningPath">
        <div className="sectionHead">
          <span>Lộ trình</span>
          <h2>Từ nền tảng đến mục tiêu thi</h2>
        </div>
        <div className="pathLine" aria-label="A1 đến VSTEP">
          {["A1", "A2", "B1", "B2", "TOEIC", "IELTS", "VSTEP"].map((level) => (
            <span key={level}>{level}</span>
          ))}
        </div>
        <p>Mỗi cấp độ ưu tiên từ vựng, quiz ngắn và ôn lỗi sai trước khi mở bài mới.</p>
      </section>

      <section className="homeSection practicePreviewSection">
        <div className="sectionHead">
          <span>Phiên học 5 phút</span>
          <h2>Luyện nhanh trước khi rời trang</h2>
        </div>
        <div className="practicePreviewGrid">
          <div className="quizPreview">
            <p>Choose the correct answer:</p>
            <strong>I ____ to school yesterday.</strong>
            <div className="quizOptions">
              <label>
                <input type="radio" name="home-quiz" />
                <span>A. go</span>
              </label>
              <label>
                <input type="radio" name="home-quiz" defaultChecked />
                <span>B. went</span>
              </label>
              <label>
                <input type="radio" name="home-quiz" />
                <span>C. going</span>
              </label>
            </div>
            <p className="quizExplain">Đáp án đúng là “went” vì câu đang ở thì quá khứ đơn.</p>
          </div>

          <label className="flashcardPreview">
            <input type="checkbox" />
            <span className="flashcardFace flashcardFront">
              <strong>ABANDON</strong>
              <small>Click để lật thẻ</small>
            </span>
            <span className="flashcardFace flashcardBack">
              <strong>Từ bỏ</strong>
              <small>Ví dụ: Never abandon your goals.</small>
            </span>
          </label>
        </div>
      </section>

      <section className="homeSection">
        <div className="sectionHead">
          <span>Ôn tập</span>
          <h2>Đừng chỉ học mới, hãy sửa điểm yếu</h2>
        </div>
        <div className="reviewGrid">
          {reviewCards.map((card) => (
            <Link className="reviewCard" href={card.href} key={card.title}>
              <strong>{card.title}</strong>
              <p>{card.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="homeCta">
        <div>
          <span>YENTH</span>
          <h2>Bắt đầu bằng một phiên học ngắn hôm nay.</h2>
        </div>
        <Link className="primaryButton" href="/vocabulary">
          Học từ vựng ngay
        </Link>
      </section>

      <footer className="homeFooter">
        <strong>YENTH</strong>
        <nav aria-label="Footer">
          <Link href="/blog">About</Link>
          <Link href="/learn">Learning</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/collections">Resources</Link>
          <Link href="/profile">Contact</Link>
          <a href="https://facebook.com" rel="noreferrer">Facebook</a>
          <a href="https://zalo.me" rel="noreferrer">Zalo</a>
        </nav>
      </footer>
    </main>
  );
}
