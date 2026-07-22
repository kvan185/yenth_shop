import Link from "next/link";
import { notFound } from "next/navigation";
import { phraseDataMap, phraseLevelConfig } from "../../../lib/phrases";
import type { LevelId } from "../../../lib/vocabulary";

type PhraseLessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

const lessonMap: Record<string, LevelId> = {
  a1: "A1",
  a2: "A2",
  b1: "B1",
  b2: "B2",
  c1: "C1",
};

export function generateStaticParams() {
  return Object.keys(lessonMap).map((lessonId) => ({ lessonId }));
}

export async function generateMetadata({ params }: PhraseLessonPageProps) {
  const { lessonId } = await params;
  const level = lessonMap[lessonId.toLowerCase()];

  return {
    title: level ? `Cụm từ tiếng Anh ${level}` : "Cụm từ tiếng Anh",
    description: level
      ? `Danh sách cụm từ tiếng Anh ${level} kèm nghĩa và ví dụ`
      : "Danh sách cụm từ tiếng Anh kèm nghĩa và ví dụ",
  };
}

export default async function PhraseLessonPage({
  params,
}: PhraseLessonPageProps) {
  const { lessonId } = await params;
  const level = lessonMap[lessonId.toLowerCase()];

  if (!level) {
    notFound();
  }

  const phrases = phraseDataMap[level];

  return (
    <main className="phraseStudyPage">
      <section className="phraseStudyHeader">
        <div>
          <Link href="/phrases" className="testBackLink">
            ← Cụm từ
          </Link>
          <span>{phrases.length.toLocaleString("vi-VN")} cụm</span>
          <h1>Cụm từ {level}</h1>
        </div>
        <nav className="phraseLevelNav" aria-label="Chọn cấp độ cụm từ">
          {phraseLevelConfig.map((item) => (
            <Link
              className={item.id === level ? "active" : ""}
              href={item.href}
              key={item.id}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="phraseGrid" aria-label={`Danh sách cụm từ ${level}`}>
        {phrases.map((phrase) => (
          <article className="phraseCard" key={`${phrase["từ"]}-${phrase["nghĩa"]}`}>
            <div className="phraseCardHead">
              <span>{phrase["loại từ"]}</span>
              <h2>{phrase["từ"]}</h2>
            </div>
            <p>{phrase["nghĩa"]}</p>
            <dl>
              <div>
                <dt>Ví dụ</dt>
                <dd>{phrase["ví dụ"]}</dd>
              </div>
              <div>
                <dt>Nghĩa ví dụ</dt>
                <dd>{phrase["nghĩa ví dụ"]}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </main>
  );
}
