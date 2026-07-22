import Link from "next/link";
import { phraseLevelConfig } from "../../lib/phrases";

export const metadata = {
  title: "Cụm từ | YENTH",
  description: "Ôn cụm từ tiếng Anh theo cấp độ.",
};

const levelNotes: Record<string, string> = {
  A1: "Cụm giao tiếp và sinh hoạt cơ bản.",
  A2: "Cụm động từ, tính từ và giới từ thường gặp.",
  B1: "Cụm dùng cho học tập, công việc và mô tả ý kiến.",
  B2: "Collocation và phrasal verb cho diễn đạt tự nhiên hơn.",
  C1: "Cụm học thuật và diễn đạt nâng cao.",
};

export default function PhraseIndexPage() {
  const totalPhrases = phraseLevelConfig.reduce(
    (total, level) => total + level.phrases,
    0,
  );

  return (
    <main className="vocabIndexPage">
      <section className="vocabIndexSection vocabIndexMainSection">
        <div className="vocabIndexToolbar">
          <div className="sectionHead">
            <span>{totalPhrases.toLocaleString("vi-VN")} cụm</span>
            <h2>Chọn level cụm từ</h2>
          </div>
          <div className="homeHeroActions">
            <Link className="primaryButton" href="/phrases/b1">
              Mở B1
            </Link>
            <Link className="secondaryButton" href="/vocabulary">
              Từ vựng
            </Link>
          </div>
        </div>

        <div className="vocabLevelGrid">
          {phraseLevelConfig.map((level) => (
            <article
              className={`vocabLevelCard ${level.id === "B1" ? "active" : ""}`}
              key={level.id}
            >
              <div>
                <span>Cụm từ</span>
                <h3>{level.label}</h3>
              </div>
              <p>{levelNotes[level.id]}</p>
              <div className="vocabLevelMeta">
                <strong>{level.phrases.toLocaleString("vi-VN")}</strong>
                <span>cụm</span>
              </div>
              <div className="vocabLevelActions">
                <Link className="primaryButton" href={level.href}>
                  Mở level
                </Link>
                <Link className="secondaryButton" href={level.href}>
                  Xem cụm
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
