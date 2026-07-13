import Link from "next/link";

const practiceModes = [
  {
    href: "/practice/flashcards",
    code: "FLS",
    title: "Flashcards",
    description: "Lật thẻ để tự kiểm tra nghĩa, ví dụ và mức độ nhớ.",
    meta: "Nhớ từ",
    tone: "green",
  },
  {
    href: "/practice/multiple-choice",
    code: "MCQ",
    title: "Multiple Choice",
    description: "Chọn nghĩa đúng, nhận phản hồi ngay và chuyển câu nhanh.",
    meta: "Phản xạ",
    tone: "amber",
  },
  {
    href: "/practice/fill-blank",
    code: "BLK",
    title: "Fill in Blank",
    description: "Điền từ còn thiếu trong câu để luyện nhớ chủ động.",
    meta: "Ngữ cảnh",
    tone: "blue",
  },
  {
    href: "/practice/matching",
    code: "MAT",
    title: "Matching",
    description: "Ghép từ với nghĩa để rà lại các cặp dễ nhầm.",
    meta: "Ghép nghĩa",
    tone: "red",
  },
  {
    href: "/grammar/tenses?tab=test",
    code: "GRA",
    title: "Grammar Test",
    description: "Luyện câu hỏi ngữ pháp theo từng chủ điểm và mức độ.",
    meta: "Cấu trúc",
    tone: "violet",
  },
];

const routine = [
  "Làm 8-12 câu để khởi động",
  "Dừng lại khi sai cùng một kiểu 2 lần",
  "Chuyển sang Review để sửa lỗi",
  "Quay lại luyện sau 10 phút",
];

const quickStats = [
  { label: "Bài đang có", value: "5" },
  { label: "Nguồn dữ liệu", value: "Vocab + Grammar" },
  { label: "Nhịp tốt", value: "15 phút" },
];

export default function PracticePage() {
  return (
    <main className="practicePage">
      <section className="practiceHero">
        <div className="practiceHeroCopy">
          <p className="homeEyebrow">Practice</p>
          <h1>Luyện tập ngắn, có phản hồi ngay.</h1>
          <p>
            Chọn một dạng bài nhỏ, làm trong vài phút, rồi quay lại sửa đúng lỗi vừa
            sai. Đây là nơi luyện thao tác, không phải trang báo cáo năng lực.
          </p>
          <div className="homeHeroActions">
            <Link className="primaryButton" href="/practice/multiple-choice">
              Bắt đầu nhanh
            </Link>
            <Link className="secondaryButton" href="/review/today">
              Ôn hôm nay
            </Link>
          </div>
        </div>

        <aside className="practiceFocusPanel" aria-label="Phiên luyện đề xuất">
          <span>Phiên đề xuất</span>
          <h2>Multiple Choice</h2>
          <p>Làm vài câu phản xạ trước, sau đó chuyển sang flashcards nếu sai từ vựng.</p>
          <div className="practiceStatGrid">
            {quickStats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="practiceSection">
        <div className="sectionHead">
          <span>Dạng bài</span>
          <h2>Chọn cách luyện</h2>
        </div>
        <div className="practiceModeGrid">
          {practiceModes.map((mode) => (
            <Link
              className={`practiceModeCard ${mode.tone}`}
              href={mode.href}
              key={mode.href}
            >
              <span>{mode.code}</span>
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
              <strong>{mode.meta}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="practiceSection practiceRoutineSection">
        <div className="sectionHead">
          <span>Nhịp luyện</span>
          <h2>Đừng làm quá nhiều một lượt</h2>
        </div>
        <ol className="practiceRoutineList">
          {routine.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
