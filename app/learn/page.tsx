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

export default function LearnPage() {
  return (
    <main className="learnPathPage">
      <section className="learnPathHero">
        <div className="learnPathHeroCopy">
          <p className="homeEyebrow">Lộ trình học</p>
          <h1>Chọn phần cần học</h1>
          <p>Bắt đầu từ level hiện tại, học theo kỹ năng và làm quiz ngắn.</p>
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
        </aside>
      </section>

      <section className="learnPathSection">
        <div className="sectionHead">
          <span>Bản đồ level</span>
          <h2>Đi từng cấp</h2>
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
          <h2>Module học</h2>
        </div>
        <div className="learnSkillGrid">
          {skills.map((skill) => (
            <Link className="learnSkillCard" href={skill.href} key={skill.title}>
              <span>{skill.code}</span>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
