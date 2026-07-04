import { notFound } from "next/navigation";
import VocabularyApp from "../../../VocabularyApp";
import { levelDataMap, type LevelId } from "../../../../lib/vocabulary";

type LessonPageProps = {
  params: {
    lessonId: string;
  };
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

export async function generateMetadata({ params }: LessonPageProps) {
  const level = lessonMap[params.lessonId.toLowerCase()];

  return {
    title: level ? `Ôn từ vựng VSTEP ${level}` : "Ôn từ vựng VSTEP",
    description: level
      ? `Ứng dụng học từ vựng và kiểm tra trắc nghiệm VSTEP ${level}`
      : "Ứng dụng học từ vựng và kiểm tra trắc nghiệm VSTEP",
  };
}

export default async function VocabularyLessonPage({ params }: LessonPageProps) {
  const level = lessonMap[params.lessonId.toLowerCase()];

  if (!level) {
    notFound();
  }

  return <VocabularyApp level={level} vocabularyData={levelDataMap[level]} />;
}
