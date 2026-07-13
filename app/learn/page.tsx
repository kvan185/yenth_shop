import Link from "next/link";

const levels = [
  { label: "A1", status: "Nền tảng", state: "done" },
  { label: "A2", status: "Đang học", state: "active" },
  { label: "B1", status: "Sắp mở", state: "next" },
  { label: "B2", status: "Sắp mở", state: "locked" },
  { label: "TOEIC", status: "Mục tiêu", state: "goal" },
  { label: "IELTS", status: "Mục tiêu", state: "goal" },
  { label: "VSTEP", status: "Mục tiêu", state: "goal" },
];

const skills = [
  {
    href: "/vocabulary",
    code: "VOC",
    title: "Vocabulary",
    description: "Bộ từ theo level A1-C1, flashcard và quiz nhanh.",
    meta: "Đang dùng",
  },
  {
    href: "/grammar",
    code: "GRA",
    title: "Grammar",
    description: "Ôn cấu trúc trọng tâm bằng ví dụ và bài tập ngắn.",
    meta: "Sắp có",
  },
  {
    href: "/learn/listening",
    code: "LIS",
    title: "Listening",
    description: "Nghe theo transcript, luyện bắt ý chính và phản xạ.",
    meta: "Mới",
  },
  {
    href: "/learn/reading",
    code: "REA",
    title: "Reading",
    description: "Đọc hiểu theo cấp độ và học từ trong ngữ cảnh.",
    meta: "Mới",
  },
  {
    href: "/learn/writing",
    code: "WRI",
    title: "Writing",
    description: "Luyện dàn ý, câu mẫu và chỉnh lỗi diễn đạt từng bước.",
    meta: "Mới",
  },
  {
    href: "/learn/speaking",
    code: "SPE",
    title: "Speaking",
    description: "Chuẩn bị câu trả lời, luyện phát âm và mở rộng ý nói.",
    meta: "Mới",
  },
];

const studyOrder = [
  "Học từ mới theo level",
  "Làm quiz ngắn để kiểm tra",
  "Xem lại lỗi sai",
  "Ôn từ yếu trong ngày",
  "Mở bài tiếp theo",
];

export default function LearnPage() {
  return (
    <main className="learnPathPage">
      <section className="learnPathHero">
        <div className="learnPathHeroCopy">
          <p className="homeEyebrow">Lộ trình học</p>
          <h1>Chọn đường học phù hợp với mục tiêu của bạn.</h1>
          <p>
            Bắt đầu từ level hiện tại, học theo kỹ năng, làm quiz ngắn và ôn lại điểm
            yếu mỗi ngày.
          </p>
          <div className="homeHeroActions">
            <Link className="primaryButton" href="/vocabulary/a2">
              Tiếp tục A2 Vocabulary
            </Link>
            <Link className="secondaryButton" href="/vocabulary">
              Xem toàn bộ từ vựng
            </Link>
          </div>
        </div>

        <aside className="learnCurrentPanel" aria-label="Bài học đang học">
          <span>Đang học</span>
          <h2>A2 Vocabulary</h2>
          <p>Việc tiếp theo: ôn 12 từ yếu trước khi làm quiz mới.</p>
          <div className="todayProgress" aria-label="Tiến độ A2 68%">
            <span style={{ width: "68%" }} />
          </div>
          <div className="learnCurrentStats">
            <div>
              <strong>68%</strong>
              <span>Tiến độ</span>
            </div>
            <div>
              <strong>12</strong>
              <span>Từ yếu</span>
            </div>
            <div>
              <strong>10</strong>
              <span>Câu quiz</span>
            </div>
          </div>
          <Link className="primaryButton" href="/vocabulary/a2">
            Mở bài đang học
          </Link>
        </aside>
      </section>

      <section className="learnPathSection">
        <div className="sectionHead">
          <span>Bản đồ level</span>
          <h2>Đi từng cấp, không nhảy lung tung</h2>
        </div>
        <div className="learnRoadmap" aria-label="Lộ trình A1 đến mục tiêu thi">
          {levels.map((level) => (
            <article className={`learnLevelCard ${level.state}`} key={level.label}>
              <strong>{level.label}</strong>
              <span>{level.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="learnPathSection">
        <div className="sectionHead">
          <span>Kỹ năng</span>
          <h2>Chọn module học</h2>
        </div>
        <div className="learnSkillGrid">
          {skills.map((skill) => (
            <Link className="learnSkillCard" href={skill.href} key={skill.title}>
              <span>{skill.code}</span>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <strong>{skill.meta}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="learnPathSection learnFlowSection">
        <div className="sectionHead">
          <span>Thứ tự đề xuất</span>
          <h2>Một phiên học nên đi như thế nào?</h2>
        </div>
        <ol className="learnFlowList">
          {studyOrder.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="learnPathSection">
        <div className="sectionHead">
          <span>Ôn tập nhanh</span>
          <h2>Quay lại đúng phần cần sửa</h2>
        </div>
        <div className="reviewGrid">
          <Link className="reviewCard" href="/review/today">
            <strong>Ôn hôm nay</strong>
            <p>Những từ và câu hỏi nên nhắc lại trong ngày.</p>
          </Link>
          <Link className="reviewCard" href="/review/weak-words">
            <strong>Từ yếu</strong>
            <p>Ưu tiên các từ sai nhiều hoặc nhớ chưa chắc.</p>
          </Link>
          <Link className="reviewCard" href="/review/mistakes">
            <strong>Lỗi sai</strong>
            <p>Xem lại đáp án sai để tránh lặp lại trong quiz sau.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
