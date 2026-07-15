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

export default function HomePage() {
  return (
    <main className="homePage">
      <section className="homeHero">
        <div className="homeHeroCopy">
          <p className="homeEyebrow">YENTH English Learning</p>
          <h1>Học tiếng Anh gọn hơn mỗi ngày.</h1>
          <p className="homeLead">
            Chọn level, học từ vựng, ôn ngữ pháp và làm quiz ngắn trong cùng một nơi.
          </p>

          <div className="homeHeroActions">
            <Link className="primaryButton" href="/vocabulary">
              Bắt đầu học ngay
            </Link>
            <Link className="secondaryButton" href="/learn">
              Xem lộ trình
            </Link>
          </div>

          <div className="homeBadges" aria-label="Trọng tâm học tập">
            <span>Level A1-C1</span>
            <span>Grammar</span>
            <span>Quiz</span>
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

      <section className="homeSection">
        <div className="sectionHead">
          <span>Module học tập</span>
          <h2>Chọn phần cần học</h2>
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
    </main>
  );
}
