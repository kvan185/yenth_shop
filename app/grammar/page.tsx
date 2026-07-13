import Link from "next/link";
import { grammarLessons } from "../../lib/grammar";

export const metadata = {
  title: "Grammar | Lộ trình ngữ pháp tiếng Anh",
  description: "Ôn ngữ pháp theo chủ điểm, ví dụ ngắn và bài tập kiểm tra nhanh.",
};

const learningFlow = [
  "Đọc quy tắc ngắn",
  "Xem 3 ví dụ đúng",
  "So sánh lỗi thường gặp",
  "Làm phần kiểm tra",
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
            <Link className="primaryButton" href="/grammar/tenses">
              Học 12 thì
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
              <strong>{grammarLessons.length}</strong>
              <span>Chủ điểm</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Phần/bài</span>
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
          {grammarLessons.map((topic, index) => (
            <Link
              className="grammarTopicCard"
              href={topic.href}
              key={topic.id}
            >
              <span>{`T${String(index + 1).padStart(2, "0")}`}</span>
              <h3>{topic.label}</h3>
              <p>{topic.description}</p>
              <strong>Học + kiểm tra</strong>
            </Link>
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
          <Link className="reviewCard" href="/grammar/comparisons">
            <strong>So sánh</strong>
            <p>Học so sánh ngang bằng, hơn và nhất bằng ví dụ mẫu.</p>
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
