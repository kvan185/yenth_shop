import Link from "next/link";
import { grammarLessons } from "../../lib/grammar";

export const metadata = {
  title: "Grammar | Lộ trình ngữ pháp tiếng Anh",
  description: "Ôn ngữ pháp theo chủ điểm, ví dụ ngắn và bài tập kiểm tra nhanh.",
};

export default function GrammarPage() {
  return (
    <main className="grammarPage">
      <section className="grammarHero">
        <div className="learnPathHeroCopy">
          <p className="homeEyebrow">Learn / Grammar</p>
          <h1>Ngữ pháp theo chủ điểm</h1>
          <p>Chọn bài, học quy tắc ngắn rồi làm quiz ngay trong cùng trang.</p>
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
              <strong>Quiz</strong>
              <span>Luyện nhanh</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="grammarSection grammarTopicSection">
        <div className="sectionHead">
          <span>Chủ điểm</span>
          <h2>Chọn phần cần học</h2>
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
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
