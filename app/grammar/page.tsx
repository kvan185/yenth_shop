import Link from "next/link";

export const metadata = {
  title: "Grammar | Lộ trình ngữ pháp tiếng Anh",
  description: "Ôn ngữ pháp theo chủ điểm, ví dụ ngắn và bài tập kiểm tra nhanh.",
};

const grammarTopics = [
  {
    code: "T01",
    title: "Tenses",
    description: "Hiện tại, quá khứ, tương lai và cách nhận diện trong câu.",
    status: "Sắp có",
  },
  {
    code: "T02",
    title: "Sentence Structure",
    description: "Chủ ngữ, động từ, tân ngữ, bổ ngữ và trật tự câu cơ bản.",
    status: "Sắp có",
  },
  {
    code: "T03",
    title: "Modal Verbs",
    description: "Can, could, should, must và cách dùng theo mức độ chắc chắn.",
    status: "Sắp có",
  },
  {
    code: "T04",
    title: "Conditionals",
    description: "Câu điều kiện loại 0, 1, 2, 3 và tình huống sử dụng.",
    status: "Sắp có",
  },
  {
    code: "T05",
    title: "Relative Clauses",
    description: "Who, which, that, where và cách nối ý tự nhiên hơn.",
    status: "Sắp có",
  },
  {
    code: "T06",
    title: "Passive Voice",
    description: "Câu bị động trong văn nói, văn viết và bài đọc học thuật.",
    status: "Sắp có",
  },
];

const learningFlow = [
  "Đọc quy tắc ngắn",
  "Xem 3 ví dụ đúng",
  "So sánh lỗi thường gặp",
  "Làm quiz 8 câu",
  "Lưu chủ điểm cần ôn",
];

export default function GrammarPage() {
  return (
    <main className="grammarPage">
      <section className="grammarHero">
        <div className="learnPathHeroCopy">
          <p className="homeEyebrow">Learn / Grammar</p>
          <h1>Ôn ngữ pháp theo chủ điểm, học đến đâu kiểm tra đến đó.</h1>
          <p>
            Mỗi bài ngữ pháp sẽ đi từ quy tắc ngắn, ví dụ dễ hiểu, lỗi thường gặp đến
            quiz kiểm tra nhanh.
          </p>
          <div className="homeHeroActions">
            <Link className="primaryButton" href="/practice/multiple-choice">
              Làm quiz nhanh
            </Link>
            <Link className="secondaryButton" href="/learn">
              Về lộ trình
            </Link>
          </div>
        </div>

        <aside className="grammarPlanPanel" aria-label="Kế hoạch học ngữ pháp">
          <span>Đề xuất hôm nay</span>
          <h2>Tenses Basics</h2>
          <p>Ôn các thì cơ bản trước, sau đó làm quiz để phát hiện lỗi hay nhầm.</p>
          <div className="todayProgress" aria-label="Tiến độ ngữ pháp 35%">
            <span style={{ width: "35%" }} />
          </div>
          <div className="learnCurrentStats">
            <div>
              <strong>6</strong>
              <span>Chủ điểm</span>
            </div>
            <div>
              <strong>8</strong>
              <span>Câu quiz</span>
            </div>
            <div>
              <strong>35%</strong>
              <span>Tiến độ</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="grammarSection">
        <div className="sectionHead">
          <span>Chủ điểm</span>
          <h2>Học theo phần nhỏ, dễ quay lại ôn</h2>
        </div>
        <div className="grammarTopicGrid">
          {grammarTopics.map((topic) => (
            <article className="grammarTopicCard" key={topic.code}>
              <span>{topic.code}</span>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <strong>{topic.status}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="grammarSection grammarFlowSection">
        <div className="sectionHead">
          <span>Cách học</span>
          <h2>Một bài ngữ pháp nên đi theo thứ tự này</h2>
        </div>
        <ol className="learnFlowList">
          {learningFlow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="grammarSection">
        <div className="sectionHead">
          <span>Luyện thêm</span>
          <h2>Kết hợp ngữ pháp với từ vựng và quiz</h2>
        </div>
        <div className="reviewGrid">
          <Link className="reviewCard" href="/vocabulary">
            <strong>Ôn từ vựng</strong>
            <p>Nắm từ trước để ví dụ ngữ pháp dễ hiểu hơn.</p>
          </Link>
          <Link className="reviewCard" href="/practice/multiple-choice">
            <strong>Quiz trắc nghiệm</strong>
            <p>Kiểm tra phản xạ chọn cấu trúc đúng trong câu.</p>
          </Link>
          <Link className="reviewCard" href="/review/mistakes">
            <strong>Lỗi sai</strong>
            <p>Xem lại các câu sai để biết mình hay nhầm ở đâu.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
